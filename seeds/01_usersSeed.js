const { v4: uuid } = require("uuid");

exports.seed = async function (knex) {
  await knex("users").del();
  await knex("users").insert([
    {
      id: "2922c286-16cd-4d43-ab98-c79f698aeab0",
      username: "Albus",
      email: "albus@mail.com",
      password: "1234abcd",
      avatar: "albus.jpeg",
    },
    {
      id: "5bf7bd6c-2b16-4129-bddc-9d37ff8539e9",
      username: "Bellatrix",
      email: "bellatrix@mail.com",
      password: "1234abcd",
      avatar: "bellatrix.jpeg",
    },
    {
      id: "bfc9bea7-66f1-44e9-879b-4d363a888eb4",
      username: "Cedric",
      email: "cedric@mail.com",
      password: "1234abcd",
      avatar: "cedric.webp",
    },
  ]);
};
