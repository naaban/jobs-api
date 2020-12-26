/**
 * @author Padmanaban
 * @email nabanharish@gmail.com
 * @create date 2020-12-26 19:23:48
 * @modify date 2020-12-27 01:35:27
 * @desc [description]
 */
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title: String,
    description: String,
    image: String

})


const Job = mongoose.model('jobs', schema)

async function getJobs(skip, limit) {
    return await Job.find().skip(skip).limit(limit).sort({ _id: -1 })
}

async function createJob(job) {
    return await Job.create(job)
}


async function deleteJobById(id) {
    return await Job.findOneAndRemove({ _id: id })
}


async function updateJobById(job, id) {
    return await Job.findByIdAndUpdate(id, job)
}

const JobModel = {
    getJobs,
    createJob,
    deleteJobById,
    updateJobById
}

module.exports = JobModel