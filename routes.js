const express = require("express");

const db = require("./db");
const filters = require("./filters");
const router = express.Router();
module.exports = router;

let settings = filters.settings;
// // TEST
// router.get('/foo', (req, res) => {
//   res.send('Testing....Foo!')
// })

// GET Home page which displays list of customers
router.get("/", (req, res) => {
  db.getCustomers()
    .then(async (customers) => {
      for (let i = 0; i < customers.length; i++) {
        customers[i].servicesCount = 0;
        await db.getServices(customers[i].id).then((services) => {
          customers[i].servicesCount = services.length;
        });
      }
      return customers;
    })
    .then((customers) => {
      return filters.applyFilter(customers, settings);
    })
    .then((customers) => {
      res.render("home", { customers });
    })
    .catch((err) => {
      res.send("Error: " + err);
    });
});

router.post("/", (req, res) => {
  Object.keys(settings).forEach(function (key) {
    if (key != "searchQuery") {
      settings[key] = false;
    }
  });

  // if alphabetical A-Z is true
  if (req.body.filter === "a-z") {
    settings.aZ = true;
  }
  // if alphabetical Z-A is true
  if (req.body.filter === "z-a") {
    settings.zA = true;
  }
  // if most jobs is true
  if (req.body.filter === "most-services") {
    settings.mostJob = true;
  }
  // if least jobs is true
  if (req.body.filter === "least-services") {
    settings.leastJob = true;
  }
  settings.searchQuery = req.body["customer-name"];

  res.redirect("/");
  // if search by name is true
});
// GET Customer page which displays a customer's information by id & the services associated
router.get("/customer/:id", (req, res) => {
  const id = Number(req.params.id);
  db.getServices(id).then((result) => {
    const viewData = {
      customerId: result[0].customerId,
      name: result[0].name,
      phone: result[0].phone,
      email: result[0].email,
      address: result[0].address,
      services: [],
    };

    for (let i = 0; i < result.length; i++) {
      viewData.services.push({
        serviceId: result[i].serviceId,
        description: result[i].description,
        engineer: result[i].engineer,
        hours: result[i].hours,
        materials: result[i].materials,
        material_cost: result[i].material_cost,
      });
    }

    res.render("customer", viewData);
  });
});

// GET Add service page
router.get("/add/:id", (req, res) => {
  db.getCustomer(Number(req.params.id)).then((customer) => {
    const viewData = {
      id: req.params.id,
      name: customer.name,
    };
    res.render("add", viewData);
  });
});

// POST Post service to database
router.post("/add/:id", (req, res) => {
  const id = Number(req.params.id);
  const serviceData = req.body;
  db.addService(serviceData, id).then(() => res.redirect(`/customer/${id}`));
});
