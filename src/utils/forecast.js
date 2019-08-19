const request = require('request')

const forecast = (latitude,longitude,callback) =>{

    const url = 'https://api.darksky.net/forecast/85c5e2b4cff81a8df1d5d39e891e587f/' + latitude + ',' + longitude

    request({ url, json:true }, (error,{body})=>{

        if (error){
            callback('Unable to connect to weather services',undefined)
        }else if(body.error){
            callback('Unable to find location.', undefined)
        }else{
            // callback(undefined,{
            //     summary : body.daily.data[0].summary,
            //     temperature : body.currently.temperature,
            //     precipProbability : body.currently.precipProbability 
            // })
            callback(undefined,body.daily.data[0].summary +'It is currently '+ body.currently.temperature +' degress out. There is a '+ body.currently.precipProbability + '% chance of rain.')
            // console.log(response.body.daily.data[0].summary +'It is currently '+ response.body.currently.temperature +' degress out. There is a '+ response.body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast