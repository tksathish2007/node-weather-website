console.log('App.js file loaded')

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

const updateError = (txt = '') => {    
    errorSpan.textContent = txt
}

searchFrom.addEventListener('submit', (e)=> {
    e.preventDefault()
    resetData()
    updateError('Loading...')
    
    const search = searchInput.value 
    if(!search.trim()) {        
        updateError('Please enter location')
        return false;
    }
    console.log(search)

    const url = encodeURI('/weather?search='+search)
    fetch(url)
        .then((res) => {
            res.json().then((data)=>{
                if(data.error) {
                    console.info(data.error)
                    updateError(data.error)
                } else {
                    console.info(data)
                    updateError('-')
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
    