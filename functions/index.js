const functions = require('firebase-functions')
const admin     = require('firebase-admin')


module.exports = {
    greet: functions.https.onRequest(
    function(req,res){
        res.send('hello from functions')
    })
}
