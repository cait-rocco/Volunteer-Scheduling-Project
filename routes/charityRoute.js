'use strict';

const { Router } = require('express');
const router = Router();

const { deleteCharity, editCharity, getCharityVols, updateCharityVol, addEvent, updateEvent, deleteEvent, addEventTime, deleteEventTime, getCharityDetails, getCharityEvents } = require('../controllers/charityCtrl');
const{ deleteVolFromEvent, removeCharityFromUser, getEventDetails, getVolDetails } = require('../controllers/sharedCtrl');

router.delete('/charity/:id', deleteCharity);
router.put('/charity/:id', editCharity);
router.get('/charity/:id', getCharityVols);
router.patch('/charity/:id', updateCharityVol);
router.post('/charity/:id', addEvent);
router.put('/charity/:id', updateEvent);
router.delete('/charity/:id', deleteEvent);
router.post('/charity/:id', addEventTime);
router.delete('/charity/:id', deleteEventTime);
router.get('/charity/:id', getCharityDetails);
router.get('/charity/:id', getCharityEvents);

//BOTH
router.delete('/charity/:id', deleteVolFromEvent);
router.delete('/charity/:id', removeCharityFromUser);
router.get('/charity/:id', getEventDetails);//including volunteers but only show these in the charity's view
router.get('/charity/:id', getVolDetails);

module.exports = router;