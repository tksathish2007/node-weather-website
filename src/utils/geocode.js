const request = require('request')

const geocode = (address, cBack) => {

    // console.log('======================')
    // console.log('GeoCode Info')
    // console.log('======================')

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoidGtzYXRoaXNoIiwiYSI6ImNraXJuZXZzYzBjMzAyd3NjeXduOG1rdHIifQ.72oXQ-xDr60BpBdusMbxQg'
    
    console.log(url)
    request(
        { url : url, json:true },
        (error, response) => {
            if(error) {
                // console.log('Error Code - '+error.code)
                cBack({
                    error : error.code
                })
            }
            else if(response.body.message) {
                // console.log(response.body.message)
                cBack({
                    error : response.body.message
                })
            }
            else {
                // const data = JSON.parse(response.body)
                const data = response.body.features
                // console.log(data)

                if(data.length==0) {
                    // console.log('No Result Found...')
                    cBack({
                        error : 'No Result Found...'
                    })
                } else {            
                    // console.log('--------------------------------------')
                    console.log('No of Results  :'+data.length)

                    // data.forEach((loc, i) => {
                        // console.log( i+1 +' || --------------------')
                        // console.log('Location : '+loc.place_name)
                        // console.log('Latitude : '+loc.geometry.coordinates[0])
                        // console.log('Longitude : '+loc.geometry.coordinates[1])

                        // console.log('Longitude : '+loc.geometry.coordinates[1])
                    // })

                    cBack(data)
                }
            }
        }
    )
}

module.exports = geocode