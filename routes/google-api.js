const express = require('express');
const router = express.Router();

router.get('/google-api', (req, res, next) => {
    res.render('google-api');
});

module.exports = router;