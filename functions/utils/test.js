const 
functions = require('firebase-functions'),
// scraper = require('./scraper'),
firebase  = require('firebase-admin')
// scraper   = require('./utils/scraper')
// try {
//     scraper
//     .scrapeDenominationsListingPage()
//     .then(console.log)
// } 
// catch (err) {
//     console.log(err)
// }

// scraper
// .scrapeDenominationsListingPage()
// .then(e => e.map(scraper.scrapeDrawsListingPage))
// .then(e => Promise.all(e))
// .then(e => [].concat(...e))
// .then(console.log)

console.log(firebase.functions)