const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')

const handlers = require('./lib/handlers')

const app = express()

//Configure Handlebars view engine
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}))

app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))

app.use(express.static(__dirname + 'public'))

app.get('/', handlers.home)

// handlers for browser-based form submission
app.get('/newsletter-signup', handlers.newsletterSignup)
app.post('/newsletter-signup/process', handlers.newsletterSignupProcess)
app.get('/newsletter-signup/thank-you', handlers.newsletterSignupThankYou)

// handlers for fetch/JSON form submission
app.get('/newsletter', handlers.newsletter)
app.post('/api/newsletter-signup', handlers.api.newsletterSignup)

app.get('about', handlers.home)

//custom 404 page
app.use(handlers.notFound)

//custom 500 page
app.use(handlers.serverError)

//Enable app to be required as a module
if(require.main === module) {
    app.listen(port, () => {
      console.log( `Express started on http://localhost:${port}` +
        '; press Ctrl-C to terminate.' )
    })
  } else {
    module.exports = app
  }
  

