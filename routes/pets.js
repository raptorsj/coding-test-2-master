const express = require('express');
const Joi = require('@hapi/joi');

const Pets = require('../models/pets');
const { validateBody } = require('../middlewares/route');

const router = express.Router();

router.post(
  '/',
  validateBody(Joi.object().keys({
    name: Joi.string().required().description('Pet name'),
    colour: Joi.string().required().description('Pet colour'),
    age: Joi.number().integer().required().description('Pet age')
  }),
  {
    stripUnknown: true,
  }),
  async (req, res, next) => {
    try {
      const pet= new Pets(req.body);
      
      await pet.save();
      res.status(200).json(pet);
    } catch (e) {
      next(e);
    }
  }
).get(
    '/',
      async (req, res, next) => {
      try {
          
       const petsDetails =  await Pets.find({});
        res.status(200).json(petsDetails);
      } catch (e) {
        next(e);
      }
    }
  ).delete(
    '/',
    validateBody(Joi.object().keys({
        name: Joi.string().required().description('Pet name'),
        }),
    {
      stripUnknown: true,
    }),
    async (req, res, next) => {
      try {   
       await Pets.deleteOne({name:req.body.name})
       .then(resp=>{
        res.json({"message":"deleted successfully"});
       })
       .catch(err =>{
         console.log(err);
         res.send(err);
       });
      } catch (e) {
        next(e);
      }
    }
  );

module.exports = router;