const mongoose = require("mongoose");
const faker = require("faker");
require("dotenv").config(); 

const User = require("../models/User.model");
const Property = require("../models/Property.model");


require("../config/db.config");
mongoose.connection.once("open", () => {
  console.info(
    `*** Connected to the database ${mongoose.connection.db.databaseName} ***`
  );

  mongoose.connection.db
    .dropDatabase()
    .then(() => console.log("Database clear"))
    .then(() => {
      const users = [];

      for (let index = 0; index < 10; index++) {
        users.push({
          email: faker.internet.email(),
          password: "Hola1234",
          name: faker.name.findName(),
          image: faker.internet.avatar(),
        });
      }

      return User.create(users);
    })
    .then((users) => {
      console.log(`${users.length} users created`);

      const properties = [];
      const houseTypes = ["house", "apartment"];

      for (let index = 0; index < 20; index++) {
        properties.push({
          title: `House  in ${faker.address.state()} `,
          description: faker.lorem.sentence(),
          images:faker.image.image(),
          owner: users[Math.floor(index / 2)]._id,
          "availableDates.from": faker.date.past(),
          "availableDates.to": faker.date.future(),
          location: `${faker.address.streetAddress()}, ${faker.address.city()}`,
          houseType: houseTypes[Math.floor(Math.random() * 2)],
          amenities: {
            tv: `${Math.random() < 0.5}`,
            wifi: `${Math.random() < 0.5}`,
            equippedKitchen: `${Math.random() < 0.5}`,
            livingRoom: `${Math.random() < 0.5}`,
            dinningRoom: `${Math.random() < 0.5}`,
            workArea: `${Math.random() < 0.5}`,
            courtyard: `${Math.random() < 0.5}`,
            jacuzzi: `${Math.random() < 0.5}`,
            pool: `${Math.random() < 0.5}`,
            washingMachine: `${Math.random() < 0.5}`,
            parking: `${Math.random() < 0.5}`,
            gym: `${Math.random() < 0.5}`,
          },
          rules: {
            smokersWelcome: `${Math.random() < 0.5}`,
            petsWelcome: `${Math.random() < 0.5}`,
            childrenWelcome: `${Math.random() < 0.5}`,
          },
        });
      }

      return Property.create(properties);
    })
    .then((property) => {
      console.log(`${property.length} property created`);
    })
    .then(() => console.info(`- All data created!`))
    .catch((error) => console.error(error))
    .finally(() => process.exit(0));
});
