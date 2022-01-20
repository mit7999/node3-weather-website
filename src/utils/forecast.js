const request = require('request')

const forecast = (latitide, longitude, callback)=> {
    const url = 'http://api.weatherstack.com/current?access_key=95e6ff3fb373a4989809801022ab06f8&query=' + latitide +','+ longitude 

    request({url, json: true}, (error, {body}) =>{
        if(error) {
            callback('Unable to connect to weather service', undefined)
        }
        else if(body.error){
            callback('unable to find location', undefined)
        }
        else {
            callback(undefined, body.current.weather_descriptions [0] + '.It is currently ' + body.current.temperature)
        }
    }) 


}
module.exports = forecast