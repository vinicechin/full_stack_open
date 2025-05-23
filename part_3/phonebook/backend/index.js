require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const Person = require('./models/person');

const app = express();
app.use(express.static('app'));
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

morgan.token('body', req => {
  return JSON.stringify(req.body)
})

app.get('/api/persons', (_, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  })
});

app.get('/api/info', (_, response) => {
  Person.find({}).then((persons) => {
    const count = persons.length;
    const timestamp = new Date();
    response.end(`<p>Phonebook has info for ${count} people</p><p>${timestamp.toString()}</p>`);
  })
});

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person);
  }).catch(() => {
    response.status(404).end();
  });
});

// app.delete('/api/persons/:id', (request, response) => {
//   const id = request.params.id;
//   persons = persons.filter(person => person.id !== id);

//   response.status(204).end();
// });

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name is missing' 
    });
  }
  if (!body.number) {
    return response.status(400).json({ 
      error: 'number is missing' 
    });
  }
  // if (persons.map(p => p.name.toLowerCase()).includes(body.name.toLowerCase())) {
  //   return response.status(400).json({ 
  //     error: 'name must be unique'
  //   });
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then(savedPerson => {
    response.json(savedPerson)
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
