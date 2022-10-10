const expess = require('express');
const { Hotalmodel } = require('../Scheema/HotalScheema.js');
const HotalRouter = expess.Router();

HotalRouter.get('/hotals',async(req,res)=>{
    try {
        let data = await Hotalmodel.find();
        res.send(data)
      } catch (error) {
          res.status(500).send({
              status:"erroer",
              Response:"sonthing internal wrong"
          })
      }
})
HotalRouter.get('/hotal/hToLByPice',async(req,res)=>{
    try {
        let data = await Hotalmodel.find().sort({price:-1});
        res.send(data)
      } catch (error) {
          res.status(500).send({
              status:"erroer",
              Response:"sonthing internal wrong"
          })
      }
})
HotalRouter.post('/hotalByrating',async(req,res)=>{
    try {
        let {ratings,Min,Max} = req.body;
        if(Min>=0&&Max>0){
            let data = await Hotalmodel.find({starRating:{$in:[...ratings]},price:{$gte:Min,$lte:Max}}).sort({price:1});
            res.send(data)
        }
        else{
            let data = await Hotalmodel.find({starRating:{$in:[...ratings]}});
            res.send(data)
        }
      } catch (error) {
          res.status(500).send({
              status:"erroer",
              Response:"sonthing internal wrong"
          })
      }
})
HotalRouter.get('/hotal/hToLByrating',async(req,res)=>{
    try {
        let data = await Hotalmodel.find().sort({starRating:-1});
        res.send(data)
      } catch (error) {
          res.status(500).send({
              status:"erroer",
              Response:"sonthing internal wrong"
          })
      }
})
HotalRouter.post('/hotal/GetHotalByprice',async(req,res)=>{
    try {
        let {Min,Max} = req.body
        let data = await Hotalmodel.find({price:{$gte:Min,$lte:Max}}).sort({price:1});
        res.send(data)
      } catch (error) {
          res.status(500).send({
              status:"erroer",
              Response:"sonthing internal wrong"
          })
      }
})
HotalRouter.get('/hotal/LTohByPice',async(req,res)=>{
    try {
        let data = await Hotalmodel.find().sort({price:1});
        res.send(data)
      } catch (error) {
          res.status(500).send({
              status:"erroer",
              Response:"sonthing internal wrong"
          })
      }
})
HotalRouter.get('/hotals/:id',async(req,res)=>{
    try {
        let id = req.params.id;
        let data = await Hotalmodel.findById(id);
        res.send(data)
      } catch (error) {
          res.status(500).send({
              status:"erroer",
              Response:"sonthing internal wrong"
          })
      }
})

module.exports = {HotalRouter}