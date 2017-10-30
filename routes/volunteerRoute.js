'use strict';

const { Router } = require('express');
const router = Router();

const { deleteVolunteer, editVolunteer, getAllCharities, getUserCharities, removeCharityFromUser, addCharityToUser, getUsersEvents, addVolToEvent } = require('../controllers/volunteerCtrl');
const{ deleteVolFromEvent, removeCharityFromUser, getEventDetails, getVolDetails } = require('../controllers/sharedCtrl');

router.delete('/volunteer/:id', deleteVolunteer);
router.put('/volunteer/:id', editVolunteer);
router.get('/charities', getAllCharities);
router.get('/volunteer/:id', getUserCharities);
router.delete('/volunteer/:id', removeCharityFromUser);
router.post('/charity/:id', addCharityToUser);
router.get('/volunteer/:id', getUsersEvents);
router.patch('/charity/:id', addVolToEvent);//approval??

router.delete('/volunteer/:id', deleteVolFromEvent);
router.delete('/volunteer/:id', removeCharityFromUser);
router.get('/volunteer/:id', getEventDetails);//including volunteers but only show these in the charity's view
router.get('/volunteer/:id', getVolDetails);

module.exports = router;