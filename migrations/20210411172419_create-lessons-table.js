exports.up = function(knex) {
  return knex.schema
    .createTable('lessons', tbl => {
      tbl.increments();  // 'id' field
      tbl.text('name', 128).notNullable()
      tbl.timestamps(true, true)
  })
  .createTable('messsages', tbl => {
      tbl.increments()  // 'id' field
      tbl.string('sender')
        .notNullable()
        .index();
      tbl.text('text').notNullable();
      tbl.timestamps(true, true);
      
      // Foreign key to 'lessons' table
      tbl.integer('lesson_id')
        .unsigned()
        .references('id')
        .inTable('lessons')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('messages').dropTableIfExists('lessons');
};

