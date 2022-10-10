const express = require('express');
const { carModel } = require('../Scheema/CarScheema');
const crypto = require('crypto')

const carrouter = express.Router();

carrouter.get('/cars',async(req,res)=>{
    try {
      const page = parseInt(req.query.page);
      const total = page*5;
      const data = await carModel.find().limit(total)
      const totalcars = await carModel.find();
      res.send({data,totalcars:totalcars.length})
    } catch (error) {
        res.status(500).send({
            status:"erroer",
            Response:"sonthing internal wrong"
        })
    }
})
carrouter.get('/car/:id',async(req,res)=>{
    try {
      const id = req.params.id;
      const data = await carModel.findById(id);
      res.send(data)
    } catch (error) {
        res.status(500).send({
            status:"erroer",
            Response:"sonthing internal wrong"
        })
    }
})
carrouter.get('/cars/LtoHByPrice',async(req,res)=>{
    try {
      const page = parseInt(req.query.page);
      const total = page*5;
      const data = await carModel.find().limit(total).sort({price:1})
      const totalcars = await carModel.find();
      res.send({data,totalcars:totalcars.length})
    } catch (error) {
        res.status(500).send({
            status:"erroer",
            Response:"sonthing internal wrong"
        })
    }
})
carrouter.get('/cars/HtoLByPrice',async(req,res)=>{
    try {
      const page = parseInt(req.query.page);
      const total = page*5;
      const data = await carModel.find().limit(total).sort({price:-1})
      const totalcars = await carModel.find();
      res.send({data,totalcars:totalcars.length})
    } catch (error) {
        res.status(500).send({
            status:"erroer",
            Response:"sonthing internal wrong"
        })
    }
})
module.exports = {carrouter}