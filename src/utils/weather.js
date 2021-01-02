const request = require('request')
const accessKey = 'd520e34a2fa7d4425ad6ebeeaddea332'

const weather = (query, resultData, cBack) => {

    // console.log('======================')
    // console.log('Weather Info')
    // console.log('======================')
    
    const url = encodeURI('http://api.weatherstack.com/current?access_key='+accessKey+'&query='+resultData[0].place_name)

    console.log(url)

    request(
        { url :url, json:true },
        (error, response) => {
            // console.log(response)

            if(!error) {
                // const data = JSON.parse(response.body)
                const data = response.body
                
                console.log('query = '+data.request.query)
                console.log('location = '+data.location.name)
                console.log('weather = '+data.current.weather_descriptions)
                console.log('temperature = '+data.current.temperature)

                cBack({
                    'location' : resultData[0].place_name,
                    'weather' : data.current.weather_descriptions[0],
                    'temperature' : data.current.temperature,
                    // 'resultData' : data
                })
            } else {
                // console.log("API is not working. Please try again...")
                cBack({
                    error : "API is not working. Please try again..."
                })
            }
        }
    )
}

// ------------------ //

// let weatherJson = {
//     "request": {
//       "type": "City",
//       "query": "Madurai, India",
//       "language": "en",
//       "unit": "m"
//     },
//     "location": {
//       "name": "Madurai",
//       "country": "India",
//       "region": "Tamil Nadu",
//       "lat": "9.933",
//       "lon": "78.117",
//       "timezone_id": "Asia/Kolkata",
//       "localtime": "2020-12-16 21:37",
//       "localtime_epoch": 1608154620,
//       "utc_offset": "5.50"
//     },
//     "current": {
//       "observation_time": "04:07 PM",
//       "temperature": 24,
//       "weather_code": 119,
//       "weather_icons": [
//         "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0003_white_cloud.png"
//       ],
//       "weather_descriptions": [
//         "Cloudy"
//       ],
//       "wind_speed": 11,
//       "wind_degree": 18,
//       "wind_dir": "NNE",
//       "pressure": 1011,
//       "precip": 0.1,
//       "humidity": 88,
//       "cloudcover": 67,
//       "feelslike": 26,
//       "uv_index": 1,
//       "visibility": 7,
//       "is_day": "no"
//     }
// }
// console.log(weatherJson)

module.exports = weather