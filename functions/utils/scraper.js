const 
axios   = require('axios'),
cheerio = require('cheerio'),
parser  = require('./parser')


class Scraper {
    
    rootUrl = 'https://savings.gov.pk/download-draws/'

    async scrapeDenominationsListingPage(){
        const {data} = await axios.get(this.rootUrl);
        const $      = cheerio.load(data);
        return $('option')
            .toArray()
            .map   (e => $(e).attr('value') )
            .filter(e => e != '')
    }
    async scrapeDrawsListingPage(url){
        // sample page https://savings.gov.pk/rs-100-draws/
        const {data} = await axios.get(url);
        const $      = cheerio.load(data);
        return $('table > tbody > tr > td > a')
            .toArray()
            .map(e => $(e).attr('href') )
    }
    async scrapeDrawPage(url){
        // sample page https://savings.gov.pk/wp-content/uploads/2017/03/15-02-2013Rs.100.txt
        const d = await axios.get(url);
        const s = cheerio.load(d.data)('body').html();
        return {
            date        : parser.parseDate(s),
            location    : parser.parseLocation(s),
            drawNo      : parser.numberAfter(s,'draw no'),
            denomination: parser.numberAfter(s,'draw of'),
            prizes: {
                first   : parser.numberAfter(s, 'first prize'),
                second  : parser.numberAfter(s,'second prize'),
                third   : parser.numberAfter(s, 'third prize'),
            },
            winners: {
                first : parser.bondIdsBetween(s, 'first prize','second prize'),
                second: parser.bondIdsBetween(s,'second prize','-----'),
                third : parser.bondIdsBetween(s, '-----','$'),
            },
        }
    }
}
// export default new Scraper()
module.exports = new Scraper()