const path = require('path')
const express = require('express')
const hbs = require('hbs') 
const { url } = require('inspector')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define path for express config
const publicdirpath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialpath = path.join(__dirname, '../templates/partials')
//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialpath)

//setup static directoryto serve
app.use(express.static(publicdirpath))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather app',
        name: 'Mit',
    })

})

app.get('/about',(req,res) =>{
    res.render('about',{
        title:'About',
        name:'Mit'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title:'help',
        name:'Mit',
        message:'this is our help page'
    })
})

app.get('/weather', (req,res) =>{   
    if(!req.query.address){  
        return res.send({
            error:'No address'
        })

    }
    
        geocode(req.query.address,(error,{latitude,longitude,location} ={})=>{
            if(error){
                return res.send({error})
            }
            forecast(latitude, longitude,(error, forecastdata)=>{
                if(error){
                    return res.send({error})
                }
            res.send({
                forecast:forecastdata,
                location,
                address:req.query.address,
            })
            })
        })
})

app.get('/products',(req,res) =>{
    if(!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res) =>{
    res.render('404',{
        title:'404',
        name:'Mit',
        msg:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name: 'Mit',
        msg:'Page not found',
    })
})

app.listen(3000 , ()=>{
    console.log('server is up on port 3000')
})

