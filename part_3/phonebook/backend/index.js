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

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

app.get('/api/persons', (_, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  })
});

app.get('/api/info', (_, response) => {
  const count = persons.length;
  const timestamp = new Date();
  response.end(`<p>Phonebook has info for ${count} people</p><p>${timestamp.toString()}</p>`);
});

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  const person = persons.find(person => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  persons = persons.filter(person => person.id !== id);

  response.status(204).end();
});

function generateId(max) {
  const ids = persons.map(p => p.id);

  let newId;
  while (!newId || ids.includes(newId)) {
    newId = String(Math.floor(Math.random() * max));
  }

  return String(newId);
}

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
  if (persons.map(p => p.name.toLowerCase()).includes(body.name.toLowerCase())) {
    return response.status(400).json({ 
      error: 'name must be unique'
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(100000000),
  }

  persons = persons.concat(person);

  response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
