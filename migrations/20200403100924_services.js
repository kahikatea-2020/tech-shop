
exports.up = (knex) => {
  return knex.schema.createTable('services', table => {
    table.increments('id').primary()
    table.string('description')
    table.string('engineer')
    table.integer('hours')
    table.string('materials')
    table.integer('customer_id').references('customers.id')
    table.integer('material_cost')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('services')
}
