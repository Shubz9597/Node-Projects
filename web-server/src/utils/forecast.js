const request = require('postman-request')

const forecast = (lat, lon, callback) =>{
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=66b2b420f693b4c24d51ba9f9316ce60&units=metric`
    request({ url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to Weather Services.', undefined)
        }
        else if(body.error){
            callback('Unable to find the location. Try another search!', undefined)
        }
        else{
            callback(undefined, 'Weather description: '+body.weather[0].description+'. It is currently '+ (body.main.temp)+ ' Celcius and it feels like '+ (body.main.feels_like)+' Celcius')
        }
    })
}


module.exports = forecast