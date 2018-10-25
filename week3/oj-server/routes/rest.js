const express = require('express'); 
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const problemService = require('../services/problemService')

const nodeRestClient = require('node-rest-client').Client;
// for server to call the RESTful API
const restClient = new nodeRestClient()


// Python Flask server listen on port 5000 by default
EXECUTOR_SERVER_URL = 'http://localhost:5000/build_and_run';
// reigster a method
restClient.registerMethod('build_and_run', EXECUTOR_SERVER_URL, 'POST');


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

// modify a problem
router.put('/problems', jsonParser, (req, res) => {
  problemService.modifyProblem(req.body)
    .then(problem => {
      res.json(problem);
    }, error => {
      res.status(400).send('Failed to update problem');
    });
})

// this build_and_run was requeted from oj-client, req = request from oj-client
// res = response to oj-client
router.post('/build_and_run', jsonParser, (req, res) => {
  const code = req.body.code;
  const lang = req.body.lang;

  console.log('lang: ', lang, 'code: ', code);

  // this build_and_run is an API on executor
  restClient.methods.build_and_run(
  {
    data: {code: code, lang: lang},
    headers: {'Content-Type': 'application/json'}
  },
  // data and response are from the executor
  (data, response) => {
    const text = `Build output: ${data['build']}, execute output: ${data['run']}`;
    // we packaged the result from executor, and send back to oj-client
    res.json(text);
  })
});

// module is ES5 syntax.
module.exports = router;