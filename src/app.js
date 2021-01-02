const express = require('express')
const path = require('path')
const hbs = require('hbs')

const weather = require('./utils/weather')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

const pubicDir = path.join(__dirname, '../public')
const viewDir = path.join(__dirname, '../templates/views')
const partialDir = path.join(__dirname, '../templates/partial')

app.use(express.static(pubicDir))
app.set('view engine', 'hbs')
app.set('views', viewDir)
hbs.registerPartials(partialDir)

app.get('', (req, res) => {
    res.render('index', {
        // icon : 'https://www.iconpacks.net/icons/1/free-home-icon-189-thumb.png',
        icon : 'https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png',
        name : 'TK Sathish',
        title : 'Weather',
        content : "Weather Page" 
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        icon : 'https://reformbiologics.com/wp-content/uploads/2017/03/about-us-icon.png',
        name : 'TK Sathish',
        title : 'About US',
        content : "About Page" 
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        icon : 'https://img.icons8.com/ios/452/connectivity-and-help.png',
        name : 'TK Sathish',
        title : 'Help',
        content : "Help Page" 
    })
})

app.get('/weather', (req, res) => {
    const search = req.query.search

    if(!search) {
        return res.send({
            'error' : 'search term is required'
        })
    }
    
    geocode(search, (resultData) => {
        if(resultData.error) return res.send(resultData)

        // console.log(resultData)

        weather(search, resultData, (resultJson) => {
            if(resultJson.error) return res.send(resultJson)
            return res.send(resultJson)
        })
    })


    // console.log(result)

    // res.send({
    //     'result'    : result || '...',
    //     'search'    : search,
    //     'location'  : 'Loading...',
    //     'weather'   : 'Loading...',
    // })
})

app.get('/products', (req, res) => {
    res.send({
        'products' : [],
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        icon : 'https://cdn3.iconfinder.com/data/icons/hosting-glyphs/60/error__attack__dos_404_-512.png',
        name : 'TK Sathish',
        title : 'Page Not Found',
        content : "404 - Page Not Found" 
    })
})

app.listen(port, () => {
    console.log('server is up on port '+port)
})


// =============================== //

// app.get('/', (req, res) => {
//     console.log('Home Page')
//     res.send(
//         '<h1>Home Page</h1>' +
//         '<p>dirname : '+ __dirname +'</p>'+        
//         '<p>filename : '+ __filename +'</p>'
//     )
// })

// app.get('/help', (req, res) => {
//     console.log('Help Page')
//     res.send('Help....')
// })

// app.get('/about', (req, res) => {
//     console.log('about Page')
//     // res.send('about....')
//     res.send([{
//         name: 'TK Sathish',
//         age: 23,
//         role: 'Software Developer'
//     },
//     {
//         Test: '123'
//     }])
// })