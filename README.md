# excellenceMongoDB
mongoDB api queries

// description of api's

post request to --  /api/candidate will add another user the data can be sent in json format {"name":"give_name_here" , "email":"give_email_here"}

path request to -- /api/:candidate/scores will update the score of candidate// replace candidate name with the name of the candidate , data can be given in json format 
scores: {
      round_1: req.body.round_1,
      round_2: req.body.round_2,
      round_3: req.body.round_3
    }
    
 post request to --  /api/max  will give the candidate name with the highest score as well .
