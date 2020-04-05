let settings = {
  aZ: false,
  zA: false,
  mostJob: false,
  leastJob: false,
  searchQuery: "",
};

module.exports = {
  settings,
  applyFilter,
  forwardA,
  backwardA,
  mostJob,
  leastJob,
};

function applyFilter(customers, settings) {
  // if alphabetical A-Z is true
  let searchQuery = settings.searchQuery;
  if (settings.aZ === true) {
    return forwardA(customers, searchQuery);
  }
  // if alphabetical Z-A is true
  if (settings.zA === true) {
    return backwardA(customers, searchQuery);
  }
  // if most jobs is true
  if (settings.mostJob === true) {
    return mostJob(customers, searchQuery);
  }
  // if least jobs is true
  if (settings.leastJob === true) {
    return leastJob(customers, searchQuery);
  }

  return customers;
}

function forwardA(customers, searchQuery) {
  if (searchQuery.length > 0) {
    customers = searchFilter(customers, searchQuery);
  }

  let customerNames = customers.map((customer) => {
    return customer.name;
  });

  customerNames.sort();

  let filteredCustomers = [];
  for (let i = 0; i < customerNames.length; i++) {
    for (let j = 0; j < customers.length; j++) {
      if (customers[j].name === customerNames[i]) {
        filteredCustomers.push(customers[j]);
        j = customers.length;
      }
    }
  }

  return filteredCustomers;
}

function backwardA(customers, searchQuery) {
  if (searchQuery.length > 0) {
    customers = searchFilter(customers, searchQuery);
  }

  let customerNames = customers.map((customer) => {
    return customer.name;
  });

  customerNames.sort();
  customerNames.reverse();

  console.log(customerNames);

  let filteredCustomers = [];
  for (let i = 0; i < customerNames.length; i++) {
    for (let j = 0; j < customers.length; j++) {
      if (customers[j].name === customerNames[i]) {
        filteredCustomers.push(customers[j]);
        j = customers.length;
      }
    }
  }

  return filteredCustomers;
}
function mostJob(customers, searchQuery) {
  if (searchQuery.length > 0) {
    customers = searchFilter(customers, searchQuery);
  }

  return customers;
}
function leastJob(customers, searchQuery) {
  if (searchQuery.length > 0) {
    customers = searchFilter(customers, searchQuery);
  }

  return customers;
}

function searchFilter(customers, searchQuery) {
  return customers.filter((customer) => {
    if (customer.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return true;
    }
  });
}
