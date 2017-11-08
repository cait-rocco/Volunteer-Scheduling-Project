'use strict'

//CHARITIES
// updateCharityVol
// updateEvent
// deleteEvent
// deleteEventTime

//BOTH
// deleteVolFromEvent
// removeCharityFromUser

// ?
// getEventDetails //including volunteers but only show these in the charity's view
// getVolDetails

module.exports.getUserDetails = (req, res, next) => {
    const { User, CharityEvent, EventTimes } = req.app.get('models');
    User.findAll(
      {
        include: [{
          all: true
        }]
        ,
        where: {
            id: req.session.passport.user.id
        }
      }) 
    .then( (user) => {
        console.log("user", user)
        let entity = user[0].dataValues
        EventTimes.findAll()
        .then( (eventTimes) => {
            CharityEvent.findAll()
            .then((event1) => {
                User.findAll()
                .then((volunteer) => {
                    res.render('user-details', { entity, eventTimes, event1, volunteer });
                })
            })
        });
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

  module.exports.postEventTime = (req, res, next) => {
    const { EventTimes } = req.app.get('models');
    EventTimes.create({
        charity_event_id: req.body.eventId,
        time: req.body.time,
        position: req.body.position,
        vols_needed: req.body.vols_needed
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
    const { User, CharityEvent, EventTimes } = req.app.get('models');
    User.findAll(
      {
        include: [{
          model: EventTimes, where: {charity_event_id: 5},
        }],
        include: [{
            all: true
        }],
        where: {
            id: req.params.id,
        }
      }) 
    .then( (user) => {
        let entity = user[0].dataValues
        EventTimes.findAll()
        .then( (eventTimes) => {
            res.render('charity-view', { entity, eventTimes });
        });
    })
    .catch( (err) => {
      next(err); 
    });
  };

module.exports.addCharityToUser = (req, res, next) => {
    const { User } = req.app.get('models');
    User.findById(req.session.passport.user.id)
        .then((volunteer)=>{
            return volunteer.addVolunteer(req.body.charity_id)
        })
        .then((data)=>{
            res.redirect(`/user-details`);
        })
        .catch( (err) => {
            res.status(500).json(err)
        });
}

module.exports.addEventVolunteer = (req, res, next) => {
    const { EventTimes } = req.app.get('models');
    EventTimes.findById(req.body.timeId)
        .then((volunteer)=>{
            return volunteer.addTimes(req.session.passport.user.id)
        })
        .then((data)=>{
            res.redirect(`/user-details`);
        })
        .catch( (err) => {
            res.status(500).json(err)
        });
}

module.exports.editUser = (req, res, next) => {
    const { User } = req.app.get('models');
    User.update({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        first_name: req.body.first_name,
        last_name:  req.body.last_name,
        phone: req.body.phone,
        street_address: req.body.street_address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        phone: req.body.phone,
        donation_link: req.body.donation_link,
        description: req.body.description,
        picture: req.body.picture,
    }, {where:{id: req.session.passport.user.id}}).then(function(user){
      res.status(200).send();
      res.redirect(`/user-details`);
    })
    .catch( (err) => {
      next(err);
    });
  };

  module.exports.updateEvent = (req, res, next) => {
    const { CharityEvent } = req.app.get('models');
    CharityEvent.update({
        name: req.body.name,
        date: req.body.date,
        street_address: req.body.street_address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        description: req.body.description
    }, {where:{id: req.body.id}}).then(function(event){
    //   res.status(200).send();
      res.redirect(`/user-details`);
    })
    .catch( (err) => {
      next(err);
    });
  };

  module.exports.deleteEvent = (req, res, next) => {
    const { CharityEvent } = req.app.get('models');
    CharityEvent.destroy({
      where: {
        id: req.body.id,
      }
    })
    .then((result) => {
      res.redirect('/user-details');
    })
  }

  module.exports.deleteUser = (req, res, next) => {
    const { User } = req.app.get('models');
    User.destroy({
      where: {
        id: req.session.passport.user.id,
      }
    })
    .then((result) => {
      res.redirect('/');
    })
  }