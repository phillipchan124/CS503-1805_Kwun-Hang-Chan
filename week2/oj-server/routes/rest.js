const express = require('express'); // import express package
const router = express.Router(); // import router
// bussiness logic put in  service
// router helps us to find which service we need
const problemService = require('../services/problemService');
const bodyParser = require('body-parser');
// since the http request body is json format, we use
// josn parser to parse the body
const jsonParser = bodyParser.json();
// GET all problems
router.get('/problems', function(req, res) {
  // also can use arrow function (req, res) => {}
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
    .then(problem => { res.json(problem); }, // resolve
          error => { res.status(400).send('Problem name already exists!') ;} // reject
          ) })

// module is ES5 syntax.
module.exports = router;