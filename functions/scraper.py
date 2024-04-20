import bs4
import requests
import itertools as it
import datetime as dt

class Scraper:
    rootUrl = 'https://savings.gov.pk/latest/results.php'

    @classmethod
    def getDenominations(cls):
        response = requests.get(url= cls.rootUrl)
        soup     = bs4.BeautifulSoup(response.text, 'html.parser')

        xs = soup.select('select[id="country"] > option')
        xs = map   (lambda x: {'id': x.attrs['value'], 'name': x.get_text()}, xs)
        xs = filter(lambda x: x['id'] != ''                                 , xs)
        xs = list(xs)
        
        return xs

    @classmethod
    def getDraws(cls, denomination):
        response = requests.post(
            url= cls.rootUrl, 
            data= {
                'country'       : denomination['id'],
                'state'         : 'all',
                'range_from'    : '000000',
                'range_to'      : '001000',         # TODO change this to 999999 when deploying
                'pb_number_list': '',
                'btnsearch'     : 'Search',
        })
        soup = bs4.BeautifulSoup(response.text, 'html.parser')
        
        xs = soup.select('div[class="divTableRow"]')
        xs = map   (lambda x: x.select('div[class="divTableCell"]'), xs)
        xs = filter(lambda x: len(x) == 6                          , xs)
        xs = it.islice(xs , 1, None)
        xs = map(cls.extractDraw                                                      , xs)
        xs = map(lambda x: {**x, 'bond': {**x['bond'], 'denomination': denomination}} , xs)
        xs = map(cls.deSerializeDraw                                                  , xs)
        xs = list(xs)

        # TODO also add value to the bond denomination
        return xs

    @classmethod
    def extractDraw(cls, cell: bs4.element.Tag):
        return {
            'category'  : cell[0].string,
            'price'     : cell[2].string,
            'location'  : cell[3].string,
            'number'    : cell[4].string,
            'date'      : cell[5].string,
            'bond'      : {
                'denomination': None,
                'number'      : cell[1].string,
            }
        }

    @classmethod
    def deSerializeDraw(cls, draw):
        try:
            return {
                'category'  : str(draw['category']),
                'price'     : int(draw['price'   ].replace(' ', '').replace(',', '')),
                'location'  : str(draw['location']),
                'number'    : str(draw['number'  ]),
                'date'      : dt.datetime.strptime(draw['date'].strip(), '%d %B, %Y'),
                'bond'      : {
                    'number'      : str(draw['bond']['number']),
                    'denomination': draw['bond']['denomination'],
                }
            }
        except Exception as e:
            print(e)
            print(draw)



# if __name__ == '__main__':
#     for denomination in Scraper.getDenominationIds():
#         draws = Scraper.getDraws(denomination)
#         # print(*draws, sep= '\n')
