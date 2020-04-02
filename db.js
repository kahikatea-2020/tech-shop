const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

module.exports = {
  addCustomer,
  addService,
  getServices,
  getCustomers,
  getCustomer,
  getPost

}

function addCustomer (custData, db = connection) {
  return db('customers').insert({
    busName: custData.busname,
    name: custData.name,
    email: custData.email,
    phone: custData.phone,
    address: custData.address,
    description: custData.description,
    cust_id: custData.custId

  })
}

function addService (serviceData, id, db = connection) {
  return db('services').insert({
    description: serviceData.description,
    status: serviceData.status,
    hours: serviceData.hours,
    materials: serviceData.materials,
    user_id: id
  })
}

function getServices (id, db = connection) {
  return db('customers')
    .join('services', 'customers.id', 'user_id')
    .where('customers.id', id)
    .select('customers.id as customerId', 'customers.name', 'customers.phone', 'customers.email', 'customers.address', 'services.id as serviceId', 'services.description', 'services.engineer', 'services.hours', 'services.materials', 'services.material_cost')
}

function getCustomers (db = connection) {
  return db('customers').select()
}

function getCustomer (id, db = connection) {
  return db('customers').where('id', id).first()
}

function getPost (id, db = connection) {
  return db('services')
    .where('incident.id', id).first()
    .select()
}
