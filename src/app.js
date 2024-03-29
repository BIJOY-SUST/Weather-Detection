const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


// index page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'BIJOY'
    })
})

// about page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'BIJOY'
    })
})

// help page
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'BIJOY'
    })
})

// weather page
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide a address!'
        })
    }
    geocode(req.query.address,(error,{latitude,Longtitude,location} = {})=>{
        if (error){
            return res.send({error})
        }        
        // console.log(data)
        forecast(latitude,Longtitude ,(error,forecastData)=>{
            if (error){
                return res.send({error})
            }         
            res.send({
                forecast : forecastData, 
                location,
                address: req.query.address
            })    
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        res.send({
            error : 'You must provide a search term!'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

// app.com
// app.com/help
// app.com/about
app.get('/about/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'BIJOY',
        errorMessage: 'About article not found.'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'BIJOY',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'BIJOY',
        errorMessage: ' Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})