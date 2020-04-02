exports.seed = (knex) => {
    // Deletes ALL existing entries
    return knex('customers').del()
      .then(() => {
        // Inserts seed entries
        return knex('customers').insert([
          {
            "id": 1,
            "name": "Wholesale Meats",
            "phone": 09-256-1111,
            "email": "sales@wholesalemeats.com",
            "address": "3 Anzac Drive, Otahuhu, Auckland"
          }, {
            "id": 2,
            "name": "Hodgkins Law",
            "phone": 09-111-4378,
            "email": "admin@hl.co.nz",
            "address": "27 View Road, Mt Eden, Auckland"
          }, {
            "id": 3,
            "name": "Watchdog Alarms",
            "phone": 09-558-6222,
            "email": "admin@watchdog.co.nz",
            "address": "1 Saville Road, Manukau, Auckland"
          }, {
          "id": 4,
          "name": "Jones Associates",
          "phone": 09-111-4378,
          "email": "admin@ja.com",
            "address": "33 Curis Cescent, Auckland CBD, Auckland"
          }, {
            "id": 5,
            "name": "Jones Associates",
            "phone": 09-998-2458,
            "email": "admin@ja.com",
            "address": "50 Carbine Drive, Mt Wellington, Auckland"
          }, {
            "id": 6,
            "name": "Everest Glass",
            "phone": 09-332-5678,
            "email": "sales@everest.com",
            "address": "16 Selwyn St, Northcote, Auckland"
          }
        ])
      })
  }
  