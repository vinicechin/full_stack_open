require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const Person = require('./models/person');

const app = express();
app.use(express.static('app'));
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

morgan.token('body', req => {
  return JSON.stringify(req.body);
})

app.get('/api/persons', (_, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get('/api/info', (_, response) => {
  Person.find({})
    .then((persons) => {
      const count = persons.length;
      const timestamp = new Date();
      response.end(`<p>Phonebook has info for ${count} people</p><p>${timestamp.toString()}</p>`);
    });
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body;

  Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end();
      }

      person.name = name;
      person.number = number;

      return person.save()
        .then((updatedPerson) => {
          response.json(updatedPerson);
        })
        .catch(error => next(error));
    })
    .catch(error => next(error));
})

app.post('/api/persons', (request, response, next) => {
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

  person.save()
    .then(savedPerson => {
      response.json(savedPerson);
    })
    .catch((err) => {
      next(err);
    });
});

const unknownEndpoint = (_, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
}
app.use(unknownEndpoint);

const errorHandler = (error, _, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
