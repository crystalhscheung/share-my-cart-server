exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.uuid("id").primary();
      table.string("username").notNullable().unique();
      table.string("email").notNullable().unique();
      table.string("password").notNullable();
      table.string("location");
      table.string("avatar");
      table.json("items_posted");
      table.json("shopping_cart");
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
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("items").dropTable("users");
};
