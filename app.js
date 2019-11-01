const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Recipe = require('./models/recipe');

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://anapluss:12345@cluster0-bmtdw.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connection to MongoAtlas was successful');
  })
  .catch((error) => {
    console.log('Connection to MongoAtlas was unsuccessful');
    console.log(error);
  });


app.post('/api/recipes', (req, res, next) => {
  
  const recipe = new Recipe({
    name: req.body.name,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price
  });

  recipe.save()
    .then(() => {
      res.status(201).json({ message: 'recipe created successfully' });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
  
});

app.get('/api/recipes/:id', (req, res, next) => {

  Recipe.findOne({
    _id: req.params.id
  })
    .then((recipe) => {
      res.status(200).json(recipe);
    })
    .catch((error) => {
      res.status(404).json({ error: error });
    });
});

app.put('/api/recipes/:id', (req, res, next) => {
  const recipe = new Recipe({
    _id: req.params.id,
    name: req.body.name,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price
  });

  Recipe.updateOne({ _id: req.params.id }, recipe)
    .then(() => {
      res.status(201).json({ message: 'recipe updated successfully' });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});

app.delete('/api/recipes/:id', (req, res, next) => {

  Recipe.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({ message: 'recipe deleted successfully' });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});

app.use('/api/recipes', (req, res, next) => {
  
  Recipe.find()
    .then((recipes) => {
      res.status(200).json(recipes);
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});

module.exports = app;