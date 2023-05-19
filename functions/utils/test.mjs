import axios from 'axios'
import cheerio from 'cheerio'
import querystring from 'node:querystring'


let data = await 
axios.post(
    'https://savings.gov.pk/latest/results.php', 
    querystring.stringify({
        country       : '1',
        state         : 'all',
        range_from    : '000000',
        range_to      : '000100',
        pb_number_list: '',
        btnsearch     : 'Search'
    })
)
.then(r => r.data)


// fetch('https://savings.gov.pk/latest/results.php', {
//     method: 'POST',
//     body:   (() => {
//         let data
//         data = new FormData()
//         data.append('country'       ,'1'     )
//         data.append('state'         ,'all'   )
//         data.append('range_from'    ,'000000')
//         data.append('range_to'      ,'000100')
//         data.append('pb_number_list',''      )
//         data.append('btnsearch'     ,'Search')
//         return data
//     })()
// })
// .then(r => r.text())


.then(s => cheerio.load(s))
.then($ => 
    $('.divTableRow')
    .splice(1)
    .map(e => $(e).children().toArray().map(e => $(e).text()))
    .map(e => { return {
        position    : e[0],
        bondNumber  : e[1],
        denomination: e[2],
        location    : e[3],
        drawNumber  : e[4],
        drawDate    : e[5]
    }})
)

console.log(data)