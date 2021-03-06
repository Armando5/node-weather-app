const express = require('express')
const hbs= require('hbs')
const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectorypath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectorypath))

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About me',
        name: 'Armando'
    })
})

app.get('' , (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Armando'
    })
})  

app.get('/help', (req,res) => {
    res.render('help',{
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Armando'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:' You must provide an address '
        })
    }

    geocode(req.query.address, (error, {latitude, longitude,location} = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/yourweather', (req, res) => {
    forecast(req.query.latitude, req.query.longitude, (error, forecastData) => {
        if (error) {
            return res.send({error})
        }

        res.send({
            forecast: forecastData
        })
    })
})

app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage : 'Help article not found',
        title: '404 ', 
        name: 'Armando'
    })
})

app.get('*', (req, res) => {
    res.render('404' , {
        errorMessage : 'Page not found',
        title: 'Error',
        name: 'Armando'
    })
})

app.listen(port, () => {
    console.log('Server is listening on port ' + port)
})