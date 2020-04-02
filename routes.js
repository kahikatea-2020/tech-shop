const express = require('express')

const db = require('./db')

const router = express.Router()

module.exports = router

router.get('/', (req, res) => {
  db.getUsers()
    .then(users => {
      res.render('home', users)
    })
    .catch(err => {
      res.send('Error: ' + err.message)
    })
})

// // TEST
// router.get('/foo', (req, res) => {
//   res.send('Testing....Foo!')
// })

// // Add customer page
// router.get('/add', (req, res) => {
//   res.render('add')
// })

// // Post Data to Database
// router.post('/add', (req, res) => {
//   const customerData = req.body
//   db.addCust(customerData)

//     .then(result => {
//       const viewData = {
//         busName: customerData.busname,
//         name: customerData.name,
//         email: customerData.email,
//         phone: customerData.phone,
//         address: customerData.address,
//         description: customerData.description,
//         customer_id: result[0]
//       }
//       db.addIncident(viewData).then(res.redirect('/'))
//     })
// })

// router.get('/', (req, res) => {
//   db.getUsers()
//     .then(users => {
//       res.render('index', { users: users })
//     })
//     .catch(err => {
//       res.status(500).send('DATABASE ERROR: ' + err.message)
//     })
// })

// router.get('/incidents/:id', (req, res) => {
//   const id = Number(req.params.id)
//   db.getIncidents(id)
//     .then(incidents => {
//       const data = {
//         description: description
//       }
//       res.render('blogs', data)
//     })
// })
