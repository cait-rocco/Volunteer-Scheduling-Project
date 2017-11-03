'use strict'


//CHARITIES
// getCharityVols*
// updateCharityVol
// updateEvent
// deleteEvent
// addEventTime*
// deleteEventTime

//VOLUNTEERS

// getUserCharities*
// getUsersEvents*
// addVolToEvent

//BOTH
// deleteUser
// editUser
// deleteVolFromEvent
// removeCharityFromUser

// ?
// getEventDetails //including volunteers but only show these in the charity's view
// getVolDetails

module.exports.getUserDetails = (req, res, next) => {
    const { User, CharityEvent, CharityVolunteer, EventVolunteer } = req.app.get('models');
    User.findAll(
      {
        include: [{
          all: true
        }],
        where: {
            id: req.session.passport.user.id
        }
      }) 
    .then( (user) => {
        let entity = user[0].dataValues
        res.render('user-details', {entity, 
            CharityEvent: entity.CharityEvents, 
            CharityVolunteer: entity.CharityVolunteers, 
            EventVolunteer: entity.EventVolunteers});
    })
    .catch( (err) => {
      next(err); 
    });
  };

  module.exports.postEvent = (req, res, next) => {
    const { CharityEvent } = req.app.get('models');
    CharityEvent.create({
        charity_id: req.session.passport.user.id,
        name: req.body.name,
        description: req.body.description,
        date: req.body.date,
        street_address: req.body.street_address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
    })
    .then( (result) => {
        next();
    })
    .catch( (err) => {
        res.status(500).json(err)
    })
  };

  module.exports.getAllCharities = (req, res, next) => {
    const {User} = req.app.get('models');
    if (req.query.search === undefined || req.query.search === null){//if no search terms, get all
        User.findAll({
            where: {
                user_type: true
            }
          }) 
        .then((nonprofits) => {
            res.render('charities', {nonprofits});
        })
        .catch( (err) => {
          next(err);
        });
    }
    else {//if search terms entered, filter down by term entered in search bar
        User.findAll({Where: {search: req.query.search, user_type: true}})
        .then( (nonprofits) => {
            console.log("nonprofits?", nonprofits);
            let list = nonprofits.filter( (charity) => {
                let name = charity.dataValues.name.toLowerCase();//toLowerCase makes sure the terms match accurately
                let searchName = req.query.search.toLowerCase();
                if(name.includes(`${searchName}`)) { //string method .includes
                return charity.dataValues;
                }
          });
          res.render('charities', {list});
        });
    }
  };

  module.exports.viewCharity = (req, res, next) => {
    const { User, CharityEvent } = req.app.get('models');
    User.findAll(
      {
        include: [{
          all: true
        }],
        where: {
            id: req.params.id
        }
      }) 
    .then( (user) => {
        let entity = user[0].dataValues
        res.render('charity-view', {entity, 
            CharityEvent: entity.CharityEvents});
    })
    .catch( (err) => {
      next(err); 
    });
  };

module.exports.addCharityToUser = (req, res, next) => {
    console.log("id?", req.body.charity_id);
    const { User } = req.app.get('models');
    User.findById(req.session.passport.user.id)
        .then((volunteer)=>{
            console.log("volunteer", volunteer);
            return volunteer.addVolunteer(req.body.charity_id)
        })
        .then((data)=>{
            res.redirect(`/user-details`);
        })
        .catch( (err) => {
            res.status(500).json(err)
        });
}