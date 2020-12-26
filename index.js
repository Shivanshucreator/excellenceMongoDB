const express = require('express');
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = 3000

app.use(bodyParser.urlencoded({extended : true}));

// connection to mongoose
mongoose.connect('mongodb://localhost:27017/CandidatesDB', {useNewUrlParser: true, useUnifiedTopology: true});

// schemas

const testSchema = new mongoose.Schema({
  round_1 :{
    type: Number
  },
  round_2 :{
  type: Number
  } ,
  round_3 : {
    type: Number
  }
})
const Scores = mongoose.model("Score" , testSchema);

const candidateSchema = new mongoose.Schema({
  name : {
    type :String
  },
  email : {
    type : String
  }
    ,
  scores : [testSchema]
})
const Candidate = mongoose.model("Candidate" , candidateSchema);


/// routes

app.post("/api/candidate" , (req,res)=>{
  const data = new Candidate ({
    name:  req.body.name,
    email: req.body.email,
    scores: {
      round_1: req.body.round_1,
      round_2: req.body.round_2,
      round_3: req.body.round_3
    }
  });
  data.save();
  console.log(data);
  res.send("the candidate has been saved");
})

app.patch("/api/:candidate/scores" , (req,res)=>{
  console.log(req.body)
  Candidate.updateOne({ name: req.params.candidate } , {$set: {scores : req.body} } , err=>{
    if(err){
    res.send("something went wrong , could not update the database . Please try again")
    } else {
      res.send("the information has been updated");
    }
  })
})

app.post("/api/max" , (req,res)=>{
Candidate.aggregate([{$group:{_id:"$name" , maxTotal:{$max: {$max:["$scores.round_1" , "$scores.round_2","$scores.round_3"]}}}} ,{"$sort" : {"maxTotal": -1}} , {"$limit" : 1} ] ,(err , _id)=>{
  if(err){
    console.log(err);
  }
   res.send(_id[0]._id)
})
})

app.post("/api/avg" , (req,res)=>{
//  please let me know the exact query I am not able to understand what is required avg score per round for all candidates means avg score of per candidate for 3 rounds or avg score of per round for each candidate , Please let me know and I will code this ahead accordingly

})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
