exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.uuid("id").primary();
      table.string("username").notNullable().unique();
      table.string("email").notNullable().unique();
      table.string("password").notNullable();
      table.string("avatar");
    })
    .createTable("items", (table) => {
      table.uuid("id").primary();
      table.string("item_name").notNullable();
      table.integer("quantity").notNullable();
      table.decimal("price", 8, 2).notNullable();
      table.date("expiry_date");
      table.string("description");
      table.string("images");
      table.string("status").notNullable().defaultTo("In stock");
      table.string("category").notNullable();
      table
        .uuid("user_id")
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("shopping_carts", (table) => {
      table.increments("id").primary();
      table
        .uuid("user_id")
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .uuid("item_id")
        .references("items.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.integer("quantity").unsigned().defaultTo(1);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable("shopping_carts")
    .dropTable("items")
    .dropTable("users");
};
