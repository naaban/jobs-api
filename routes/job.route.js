/**
 * @author Padmanaban
 * @email nabanharish@gmail.com
 * @create date 2020-12-26 19:23:55
 * @modify date 2020-12-27 01:26:20
 * @desc [description]
 */
var express = require('express');
const JobController = require('../controllers/job.controller');
const { Role } = require('../utils/constants');
const Authenticate = require('../utils/authenticate');
const Upload = require('../utils/multer');

var router = express.Router();

/* GET users listing. */
router.post('/', Authenticate.authenticate, Authenticate.authorize(Role.Admin), Upload.single('image'), JobController.createJob)
router.post('/filter', Authenticate.authenticate, JobController.getJobs)
router.put('/:job_id', Authenticate.authenticate, Authenticate.authorize(Role.Admin), Upload.single('image'), JobController.updateJobById)
router.delete('/:job_id', Authenticate.authenticate, Authenticate.authorize(Role.Admin), JobController.deleteJobById)



module.exports = router;
