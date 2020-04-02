
exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('services').del()
    .then(() => {
      // Inserts seed entries
      return knex('services').insert([
        {
          'id': 1,
          'description': 'Setup router for site-to-site VPN',
          'engineer': 'Bob Ross',
          'hours': 2,
          'materials': 'router, cables',
          'customer_id': 3,
          'material_cost': 150
        }, {
          'id': 2,
          'description': 'Printer jammed',
          'engineer': 'Joe Bloggs',
          'hours': 1,
          'materials': 'none',
          'customer_id': 1,
          'material_cost': 0
        }, {
          'id': 3,
          'description': 'Computer will not boot',
          'engineer': 'Joe Bloggs',
          'hours': 2,
          'materials': 'new hard drive',
          'customer_id': 1,
          'material_cost': 200
        }, {
          'id': 4,
          'description': 'Migrate server',
          'engineer': 'Bob Ross',
          'hours': 6,
          'materials': 'HP Proliant GL720 server',
          'customer_id': 2,
          'material_cost': 5000
        }
      ])
    })
}
