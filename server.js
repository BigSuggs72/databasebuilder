//MayanWolfe VOD at 3:00 pm on 6/12/2022: Let's Make Changes to MongoDB Using the DOM! #100Devs

const { response } = require('express')
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
require('dotenv').config()


//DECLARED DB VARIABLES
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


//CRUD  METHODS
app.get('/', (request, response) => {
    db.collection('alien-info').find().toArray() // 1:45:00
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

app.put('/updateEntry', (request, response) => { //2:45:00
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
app.listen(process.env.port || PORT, () => {
      console.log(`The server is active on port ${PORT}!!!`)
})