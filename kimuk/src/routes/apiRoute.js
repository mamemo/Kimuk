const express = require('express');
const router = express.Router();

const create = require('../controllers/createController');
const fill = require('../controllers/fillController');
const admin = require('../controllers/adminController');

//Routes for create functions
//router.get('/create/', create.getAll);

//Routes for fill functions
//router.get('/fill/', fill.getAll);

//Routes for admin functions
//router.get('/admin/', admin.getAllTypes);

module.exports = router;