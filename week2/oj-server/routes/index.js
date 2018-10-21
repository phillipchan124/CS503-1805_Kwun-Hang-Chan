const express = require('express');
const router = express.Router();
const path = require('path');

// If the url does not handled by router on the server side, 
// then the server send index.html from the public folder
router.get('/', (req, res) => {
        res.sendFile('index.html', { root: path.join(__dirname, '../../public/')});
});

module.exports = router;