/**
 * @author Padmanaban
 * @email nabanharish@gmail.com
 * @create date 2020-12-26 19:23:37
 * @modify date 2020-12-27 01:36:22
 * @desc [description]
 */
const JobModel = require("../models/job.model");
const { SuccessResponse, FailureResponse } = require("../utils/response");
var debug = require('debug')('job-portal-api:server');

async function getJobs(req, res) {

    try {
        let { page_number, limit } = req.body


        let skip = 0


        if (isNaN(Number(page_number))) {
            page_number = 1
        }

        if (isNaN(Number(limit))) {
            limit = 25
        }

        if (page_number < 2) {
            skip = 0
        }
        else {
            skip = limit * (Number(page_number) - 1)
        }

        console.log("SKP<LIMI", limit, skip)


        let jobs = await JobModel.getJobs(skip, limit)


        if (jobs.length) {
            res.send(SuccessResponse("Jobs fetched !!", jobs))
        }
        else {
            res.send(FailureResponse("Jobs not found !!"))
        }
    }
    catch (err) {
        debug(err)
        res.send(FailureResponse("Failed to get jobs !! Something went wrong !!"))
    }
}



async function createJob(req, res) {

    try {

        let job = await JobModel.createJob(req.body)


        if (job.id) {
            res.send(SuccessResponse("Job created !"))
        }
        else {
            res.send(FailureResponse("Failed to create job !!"))
        }
    }
    catch (err) {
        debug(err)
        res.send(FailureResponse("Failed to create job !! Something went wrong !!"))
    }
}




async function updateJobById(req, res) {

    try {

        if (!req.params.job_id) {
            res.send(FailureResponse("Job id is required !!"))
        }

        let job = await JobModel.updateJobById(req.body, req.params.job_id)


        if (job) {
            res.send(SuccessResponse("Job updated !"))
        }
        else {
            res.send(FailureResponse("Failed to update job !!"))
        }
    }
    catch (err) {
        debug(err)
        res.send(FailureResponse("Failed to update job !! Something went wrong !!"))
    }
}




async function deleteJobById(req, res) {

    try {

        if (!req.params.job_id) {
            res.send(FailureResponse("Job id is required !!"))
        }


        let job = await JobModel.deleteJobById(req.params.job_id)

        

        if (job.id) {
            res.send(SuccessResponse("Job deleted !"))
        }
        else {
            res.send(FailureResponse("Failed to delete job !!"))
        }
    }
    catch (err) {
        debug(err)
        res.send(FailureResponse("Failed to delete job !! Something went wrong !!"))
    }
}
const JobController = {
    getJobs,
    createJob,
    updateJobById,
    deleteJobById
}


module.exports = JobController