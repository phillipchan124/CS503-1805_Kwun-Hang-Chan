const express = require('express'); 
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const problemService = require('../services/problemService')


// GET all problems
router.get('/problems', function(req, res) {
  // Since getProblems will access database to get problems
  // it is IO, and it returns a Promise.
  problemService.getProblems()
    .then(problems => res.json(problems));
});

// get single problem
router.get('/problems/:id', (req, res) => {
  const id = req.params.id; // get problem id
  // +id: convert string to int
  problemService.getProblem(+id)
        .then(problem => res.json(problem));
})

// add a problem
router.post('/problems', jsonParser, (req, res) => {
	problemService.addProblem(req.body)
	    .then(
	    // resolve
        problem => {
                res.json(problem);
        },
        // reject
        error => {
                res.status(400).send('Problem name already exists!');
        })
})



// module is ES5 syntax.
module.exports = router;