const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

/*now we need two file names __dirname and __filename and we will use node core module path here
//learn about path
//For basic tut we will create three sites
//app.com
//app.com/help
//app.com/about
//Cutomize the server we will use app.use()*/

//Define Paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

/*Now to setup handlebars -(handlebars is for dynamic templating accross different html files), we will use hbs
//for setting up hbs we will use app.set('key', 'value')
//hbs expect to have all the files inside a folder named 'views'*/

//Setting up Handlebars engine 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setting static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App', 
        name: 'JD'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Juan_Deag', 
        name: 'JD'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'JD'
    })
})
//Now By using the static call Node will find the match for the express server in the whole file
//Since by static call, we have included the route for the basic localhost call then app.get will not work for empty call
//Same thing goes for help and about since the use is accessing the whole static public folder

app.get('/weather', (req, res) => { 
    if(!req.query.address){
        return res.send({
            name: 'JD',
            message: 'Please enter a correct address',
            title: 'Wrong Weather'
        })
    }
    else{
        geocode(req.query.address, (error, {latitude, longitude, places} = {}) => {
            if(error){
                return res.send({
                    error
                })
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send({
                        error
                    })
                }

                res.send({
                    name: 'JD',
                    title: req.query.address,
                    forecast: forecastData,
                    places,
                    address: req.query.address
                })
            })
        
        })
    }
    // res.send({
    //     place: 'Lucknow',
    //     forecast: 'Fog out here',
    //     address: req.query.address
    // })
})

app.get('/help/*', (req, res) => {
    res.render('err', {
        title: 'Help Page',
        name: 'JD',
        message: 'Help page not found'
    })
})

app.get('*', (req, res) => {
    res.render('err', {
        title: '404 Page',
        name: 'JD',
        message: 'Wrong Page bitch'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})