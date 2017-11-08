'use strict';

const { Router } = require('express');
const router = Router();

const { getCharityVols, viewCharity, updateCharityVol, postEvent, updateEvent, deleteEvent, postEventTime, addEventVolunteer, deleteEventTime, getCharityEvents, getAllCharities, getUserCharities, removeCharityFromUser, addCharityToUser, getUsersEvents, addVolToEvent, getUserDetails, deleteUser, editUser, deleteVolFromEvent, getEventDetails } = require('../controllers/userCtrl');

//CHARITY
// router.get('/charity/:id', getCharityVols);
// router.patch('/charity/:id', updateCharityVol);
router.post('/user-details/event', postEvent, getUserDetails);
router.put('/user-details/event', updateEvent);
router.delete('/user-details/event', deleteEvent);
router.post('/user-details/time', postEventTime, getUserDetails);
// router.delete('/charity/:id', deleteEventTime);
// router.get('/charity/:id', getCharityEvents);

//VOLUNTEER
router.get('/charities', getAllCharities);
router.get('/charity-view/:id', viewCharity)
// router.get('/volunteer/:id', getUserCharities);
router.post('/charity-view', addCharityToUser);
// router.get('/volunteer/:id', getUsersEvents);
router.post('/charity-view/time', addEventVolunteer);//approval??

//BOTH
router.get('/user-details', getUserDetails);
router.delete('/user-details', deleteUser);
router.put('/user-details', editUser);
// router.delete('/charity/:id', deleteVolFromEvent);
// router.delete('/charity/:id', removeCharityFromUser);
// router.get('/charity/:id', getEventDetails);//including volunteers but only show these in the charity's view
// router.get('/charity/:id', getVolDetails);

module.exports = router;