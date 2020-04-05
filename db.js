const environment = process.env.NODE_ENV || "development";
const config = require("./knexfile")[environment];
const connection = require("knex")(config);

module.exports = {
  addCustomer,
  addService,
  getServices,
  getCustomers,
  getCustomer,
};

function addService(serviceData, id, db = connection) {
  return db("services").insert({
    description: serviceData.description,
    hours: serviceData.hours,
    materials: serviceData.materials,
    material_cost: serviceData.material_cost,
    customer_id: id,
  });
}

function getServices(id, db = connection) {
  return db("customers")
    .join("services", "customers.id", "services.customer_id")
    .where("customers.id", id)
    .select(
      "customers.id as customerId",
      "customers.name",
      "customers.phone",
      "customers.email",
      "customers.address",
      "services.id as serviceId",
      "services.description",
      "services.engineer",
      "services.hours",
      "services.materials",
      "services.material_cost"
    );
}

function getCustomers(db = connection) {
  return db("customers").select();
}

function getCustomer(id, db = connection) {
  return db("customers").where("id", id).first();
}

function addCustomer(custData, db = connection) {
  return db("customers").insert({
    busName: custData.busname,
    name: custData.name,
    email: custData.email,
    phone: custData.phone,
    address: custData.address,
    description: custData.description,
    customer_id: custData.custId,
  });
}
