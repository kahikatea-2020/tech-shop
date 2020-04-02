const express = require('express')

const db = require('./db')

const router = express.Router()

module.exports = router

// // TEST
// router.get('/foo', (req, res) => {
//   res.send('Testing....Foo!')
// })

// GET Home page which displays list of customers
router.get('/', (req, res) => {
  db.getCustomers()
    .then(customers => {
      res.render('home', customers)
    })
    .catch(err => {
      res.send('Error: ' + err.message)
    })
})

// GET Customer page which displays a customer's information by id & the services associated
router.get('/customer/:id', (req, res) => {
  const id = Number(req.params.id)
  db.getServices(id)
    .then(result => {
      const viewData = {
        customerId: result.customerId,
        name: result.name,
        phone: result.phone,
        email: result.email,
        address: result.address,
        serviceId: result.serviceId,
        description: result.description,
        engineer: result.engineer,
        hours: result.hours,
        materials: result.materials,
        material_cost: result.material_cost
      }
      res.render('customer', viewData)
    })
    .catch(err => {
      res.send('Error: ' + err.message)
    })
})

// GET Add service page
router.get('add/:id', (req, res) => {
  res.render('add')
    .catch(err => {
      res.send('Error: ' + err.message)
    })
})

// POST Post service to database
router.post('/add/:id', (req, res) => {
  const id = Number(req.params.id)
  const serviceData = req.body
  db.addService(serviceData, id)
    .then(() => res.redirect('customer/:id'))
    .catch(err => {
      res.send('Error: ' + err.message)
    })
})

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
