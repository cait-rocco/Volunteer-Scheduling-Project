'use strict'

//CHARITIES
// updateCharityVol

//BOTH
// deleteVolFromEvent
// removeCharityFromUser

// ?
// getEventVolunteers //including volunteers but only show these in the charity's view
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
        let entity = user[0].dataValues
        EventTimes.findAll()
        .then( (eventTimes) => {
            CharityEvent.findAll()
            .then((event1) => {
                User.findAll()
                .then((volunteer) => {
                    getUserTimes(req, next)
                        .then((UT) => {
                            let userTimes = UT[0]
                            getNonprofitName(req, next)
                                .then((NN) =>{
                                    let nonprofitName = NN[0]
                                    getVolName(req, next)
                                        .then((VN) => {
                                            let volName = VN[0]
                                            console.log("volname", volName)
                                            res.render('user-details', { entity, eventTimes, event1, volunteer, userTimes, nonprofitName, volName });
                                        })
                                })
                        })
                })
            })
        });
    })
    .catch( (err) => {
      next(err); 
    });
  };

  const getUserTimes = (req, next) => {
    const { sequelize } = req.app.get("models");
    return sequelize.query(
      `SELECT * FROM "EventVolunteers"
      LEFT JOIN "Users"
      ON "Users".id = "EventVolunteers".volunteer_id
      LEFT JOIN "EventTimes"
      ON "EventTimes".id = "EventVolunteers".event_time_id
      LEFT JOIN "CharityEvents"
      ON "CharityEvents".id = "EventTimes".charity_event_id
      WHERE "Users".id =${req.session.passport.user.id}`
    );
  };

  const getNonprofitName = (req, next) => {
    const { sequelize } = req.app.get("models");
    return sequelize.query(
      `SELECT * FROM "CharityEvents"
      LEFT JOIN "Users"
      ON "CharityEvents".charity_id = "Users".id`
    );
  };

  const getVolName = (req, next) => {
    const { sequelize } = req.app.get("models");
    return sequelize.query(
      `SELECT "EventVolunteers".id AS "event_vol_id", "EventVolunteers".event_time_id, "EventVolunteers".volunteer_id, "EventTimes".charity_event_id, "EventTimes".time, "EventTimes".position, "Users".first_name, "Users".last_name, "Users".id FROM "EventTimes"
      LEFT JOIN "EventVolunteers"
      ON "EventVolunteers".event_time_id = "EventTimes".id
      LEFT JOIN "Users"
      ON "EventVolunteers".volunteer_id = "Users".id`
    );
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
      res.status(200).send();
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
        id: req.body.eventId,
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
        id: req.body.userId,
      }
    })
    .then((result) => {
      res.redirect('/');
    })
  }

  module.exports.deleteEventTime = (req, res, next) => {
    const { EventTimes } = req.app.get('models');
    EventTimes.destroy({
      where: {
        id: req.body.timeId,
      }
    })
    .then((result) => {
      res.redirect('/user-details');
    })
  }

  module.exports.deleteEventVol = (req, res, next) => {
    const { EventVolunteer } = req.app.get('models');
    EventVolunteer.destroy({
      where: {
        id: req.body.eventVolId,
      }
    })
    .then((result) => {
      res.redirect('/user-details');
    })
  }