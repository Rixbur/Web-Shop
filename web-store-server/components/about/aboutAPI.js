const express = require('express');
const about = require('./about.json');

const router = express.Router();

router.get('/', getAbout);

async function getAbout(req, res) {
    res.status(200).json(about);
};


module.exports = router;