const
app = firebase.initializeApp({
    apiKey            : 'AIzaSyDeChjtq5aYYdSd013HDS_E6fK9lmu_3Bs'  ,
    authDomain        : 'prizebonds-fdd55.firebaseapp.com'         ,
    projectId         : 'prizebonds-fdd55'                         ,
    storageBucket     : 'prizebonds-fdd55.appspot.com'             ,
    messagingSenderId : '639410372392'                             ,
    appId             : '1:639410372392:web:d2b2236aea19215e525a1d'
}),
auth = app.auth(),
db   = app.firestore()

// console.log('inside appjs');
// console.log(test);
// db.doc('test/1').get().then(data => console.log(data.data()))
let x = db.doc('draws/draws').get()
console.log(x)
// console.dir(db);