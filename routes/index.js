'use strict';

const { Router } = require('express');
const router = Router();

router.get('/', (req, res, next) => {
    res.render('index', { });
});

// pipe all other requests through the route modules
router.use(require('./charityRoute'));
router.use(require('./volunteerRoute'));
router.use(require('./authRoute'));

module.exports = router;