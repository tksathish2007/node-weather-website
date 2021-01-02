console.log('App.js file loaded...')

const searchFrom = document.querySelector('form')
const searchInput = document.querySelector('input')

let errorSpan         = document.querySelector('p#error span')
let locationSpan      = document.querySelector('p#location span')
let weatherSpan       = document.querySelector('p#weather span')
let temperatureSpan   = document.querySelector('p#temperature span')

const resetData = () => {    
    errorSpan.textContent           = '-'
    locationSpan.textContent        = '-'
    weatherSpan.textContent         = '-'
    temperatureSpan.textContent     = '-'
}
resetData()

searchFrom.addEventListener('submit', (e)=> {
    e.preventDefault()
    resetData()
    
    const search = searchInput.value 
    if(!search.trim()) {
        errorSpan.textContent = 'Please enter location'
        return false;
    }
    console.log(search)

    const url = encodeURI('http://localhost:3000/weather?search='+search)
    fetch(url)
        .then((res) => {
            res.json().then((data)=>{
                if(data.error) {
                    console.info(data.error)
                    errorSpan.textContent = data.error
                } else {
                    console.info(data)
                    locationSpan.textContent    = data.location
                    weatherSpan.textContent     = data.weather
                    temperatureSpan.textContent = data.temperature
                }
            })
        });
})



// const url = 'http://puzzle.mead.io/puzzle'
// fetch(url)
//     .then((res) => {
//         res.json().then((data)=>{
//             console.info(data)
//         })
//     });
    