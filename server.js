//MayanWolfe VOD at 3:00 pm on 6/12/2022: Let's Make Changes to MongoDB Using the DOM! #100Devs (after Class 41 on 6/9/22)

//REQUIRED DEPENDENCIES - 1:15:00
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()


//DECLARED DB VARIABLES(Hide credentials)
let db,
    dbConnectionStr = process.env.DB_STRING
    dbName = "startrekapii"


// CONNECT TO MONGO DB    
MongoClient.connect(dbConnectionStr)
    .then(client => {
        console.log(`Connected to the ${dbName} database.`)
        db = client.db(dbName)
    })

    
//SET MIDDLEWARE
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())


//CRUD  METHODS - 1:21:00
app.get('/', (request, response) => {
    db.collection('alien-info').find().toArray() // 1:25:00 , 1:45:00
    .then(data => {
        let nameList = data.map(item => item.speciesName)
        console.log(nameList)
        response.render('index.ejs', {info: nameList})
    })
    .catch(error => console.log(error))
})


app.post('/api', (request, response) => {  // 2:00:00
    console.log('Post Heard')
    db.collection('alien-info').insertOne(
        request.body
    )
    .then(result => {
        console.log(result)
        response.redirect('/')
    })
})

app.put('/updateEntry', (request, response) => { //2:47:00
    console.log(request.body)
    Object.keys(request.body).forEach(key => {
        if ( request.body[key] === null || request.body[key] === undefined || request.body[key] === "") {
            delete request.body[key]
        }
    })
    console.log(request.body)
    db.collection('alien-info').findOneAndUpdate(
        {name: request.body.name},
        {
            $set: request.body
        }
    )
    .then(result => {
        console.log(result)
        response.json('Successful update fetch')
    })
    .catch(error => console.log(error))
})


app.delete('/deleteEntry', (request, response) => { //3:44:00
    db.collection('alien-info').deleteOne(
        {name: request.body.name},
    )
    .then(result => {
        console.log('Entry Deleted')
        response.json('Entry Deleted')
    })
    .catch(error => console.log(error))
})

//SET UP LOCALHOST ON PORT
app.listen(process.env.PORT || PORT, () => {
      console.log(`The server is active!!!`)
})