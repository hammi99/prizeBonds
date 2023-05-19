const 
    functions = require('firebase-functions'),
    firebase  = require('firebase-admin'),
    scraper   = require('./utils/scraper')

const
    app = firebase.initializeApp(),
    fs  = app.firestore(),
    db  = app.database()

// TODO
// implement scraping logic for https://savings.gov.pk/latest/results.php
// figure out why axios is throwing errors
// implement authentication
// create basic UI
// integrate user bond data

// test function
exports.test = 
functions.https.onRequest(async (req,res) => {
// functions.firestore.document('draws/draws').onUpdate((change,context) => {
    let urls1 = await scraper.getDrawUrls()
    let urls2 = await db.ref('drawPagesUrls').get()
        urls2 = new   Set(Object.values(urls2.val()))

    let urls  = urls1.filter(e => !urls2.has(e))

    urls.map(e => db.ref('drawPagesUrls').push(e))

    res.send('executed') 
})

// // schedule function runs every month scrapes links to new draws
// exports.scrapeDrawLinks = functions.pubsub.schedule('14,15,16,17,18 of month 00:00').onRun(async context => {
//     await scraper
//     .getDrawUrls()
//     .then(e => ft.set({
//         urls: firebase.firestore.FieldValue.arrayUnion(...e)
//     }))
// })

// // runs everytime new urls are scraped, populates ft with draw data
// exports.scrapeDrawPages = functions.database.ref('drawPageUrls').onUpdate(async (change,context) => {
//     let x 
//     x = change.before.val()
//     x = new Set(x)
//     x = change.after.val().filter(e => !x.has(e))
//     x = x.map(scraper.scrapeDrawPage)
//     x = await Promise.all(x)
//     x = x.map(e => {
//         ft.collection('draws').add(e)
//     })
//     x = await Promise.all(x)
// })