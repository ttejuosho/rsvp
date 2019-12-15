const express = require('express');
const rsvpRoutes = express.Router();
const mailer = require("./mailer");
let RSVP = require('./rsvpModel');

rsvpRoutes.route('/new').post(function(req,res){
    let rsvp = new RSVP(req.body);
    rsvp.save().then(function(rsvp){
        res.status(200).json({'rsvp': 'New RSVP added successfully'});
    }).catch(err => {
        res.status(400).send('unable to save to database');
    });
})

rsvpRoutes.route('/').get((req,res) => {
    RSVP.find((err, rsvps) =>{
        if(err){
            console.log(err)
        } else {
            res.json(rsvps);
        }
    });
});

rsvpRoutes.route('/edit/:id').get((req,res) => {
    let id = req.params.id;
    RSVP.findById(id, (err, rsvp) => {
        res.json(rsvp);
    });
});

rsvpRoutes.route('/data').get((req,res) => {
    let chartArray = [];
    let numberOfYeses = 0;
    let numberOfNos = 0;
    let numberOfUndecided = 0;
    RSVP.find((err, rsvps)=>{
        if (err){
            console.log(err);
        } else {
            for (var i = 0; i < rsvps.length; i++){
                if (rsvps[i].Attending === "Yes"){
                    numberOfYeses++;
                } else if (rsvps[i].Attending === "No"){
                    numberOfNos++;
                } else {
                    numberOfUndecided++;
                }
            }
        }
        chartArray.push(numberOfYeses);
        chartArray.push(numberOfNos);
        chartArray.push(numberOfUndecided);
        res.json(chartArray);
    });
})

rsvpRoutes.route('/update/:id').post((req,res) => {
    RSVP.findById(req.params.id, (err,rsvp) => {
        if(!rsvp){
            res.status(404).send('rsvp doesnt exist');
        } else {
            rsvp.Name = req.body.Name;
            rsvp.Email = req.body.Email;
            rsvp.Phone = req.body.Phone;
            rsvp.Attending = req.body.Attending;
            rsvp.Guests = req.body.Guests;

            rsvp.save().then( rsvp => {
                res.json('RSVP Updated');
            }).catch(err => {
                res.status(400).send('unable to update the database');
            });
        }
    });
});

rsvpRoutes.route('/delete/:id').get((req,res) => {
    RSVP.findByIdAndRemove({
        _id: req.params.id
    }, (err, rsvp) => {
        if(err){
            res.json(err);
        } else {
            res.json('RSVP Deleted')
        }
    });
});

rsvpRoutes.route('/sendrsvp').post((req,res) => {
    res.set('Content-Type', "application/json");
    //Send Email here
    const { userName, email } = req.body;
    const locals = { userName };
    const messageInfo = {
      email,
      fromEmail: "ttejuosho@outlook.com",
      fromName: "Tejuosho Family",
      subject: "Aliyah is 3 !!"
    };
    mailer.sendOne("droids", messageInfo, locals);

    res.send('{"message":"Email sent."}');
});

module.exports = rsvpRoutes;