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
      res.render('home', { customers })
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
        customerId: id,
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
})

// GET Add service page
router.get('/add/:id', (req, res) => {
  db.getCustomer(Number(req.params.id))
    .then((customer) => {
      const viewData = {
        id: req.params.id,
        name: customer.name
      }
      res.render('add', viewData)
    })
})

// POST Post service to database
router.post('/add/:id', (req, res) => {
  const id = Number(req.params.id)
  const serviceData = req.body
  db.addService(serviceData, id)
    .then(() => res.redirect(`/customer/${id}`))
})
