const express = require('express');
const Router = express.Router();

/**
 * Input Validation
 */
const Joi = require('joi');

const genres = [
    {id: 1, name: "Action" },
    {id: 2, name: "Horror" },
    {id: 3, name: "thiller" },
];


/**
 * [GET]
 */
Router.get('/', (req, res) => {
    return res.send(genres);
});


/**
 * [GET:id]
 */
Router.get('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with this id is not found!!!');

    return res.send(genre);
});


/**
 * [POST]
 */
Router.post('/', (req, res) => {
    const {error} = validateInput(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body
    };

    genres.push(genre);

    return res.send(genre);
});


/**
 * 
 * @[PUT:id]
 */
Router.put('/:id', (req, res) => {
    //validate the input first
    const {error} = validateInput(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //find the requested genre
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with this id is not found!!!');

    genre.name = req.body.name;

    return res.send(genre);
});


/**
 * 
 * [Delete:id]
 */
Router.delete('/:id', (req, res) => {
    const genre = genres.find( c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with this id is not found!!!');

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    return res.send(genre);
})


/**
 * 
 * Input validation using Joi npm package
 */
function validateInput(inputBody){
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
    });

    return schema.validate(inputBody);
}


module.exports = Router;
