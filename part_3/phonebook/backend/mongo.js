// mongodb+srv://<db_username>:<db_password>@cluster0.ynadrwb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give at least a password");
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://phonebook:${password}@cluster0.ynadrwb.mongodb.net/Phonebook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});
const Person = mongoose.model("Person", personSchema);

if (process.argv.length == 5) {
  // save contact
  const name = process.argv[3];
  const number = process.argv[4];
  const person = new Person({ name, number });

  person.save()
    .finally(() => {      
      console.log(`Added ${name} number (${number}) to phonebook.`);
      mongoose.connection.close();
    });
} else {
  // retrieve list
  Person.find({})
    .then((result) => {
      console.log("Phonebook:")
      result.forEach((person) => {
        console.log(`${person.name} ${person.number}`);
      });
    })
    .finally(() => mongoose.connection.close());
}
