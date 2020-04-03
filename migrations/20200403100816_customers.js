exports.up = (knex) => {
  return knex.schema.createTable('customers', table => {
    table.increments('id').primary()
    table.string('name')
    table.string('phone')
    table.string('email')
    table.string('address')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('customers')
}
