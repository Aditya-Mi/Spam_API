
const Report = require("./../models/reportModel")
const Spam = require("./../models/spamModel")



exports.addReport = async (req, res) => {
    try {
        const data = await Report.findOne({ "number": req.body.number }, { _id: 0, report: 1 });
        console.log(data)
        var response
        if (data == null) {
            reportCreated = await Report.create(req.body)
            response = reportCreated

        }
        else {
            report = data.report
            if (report < 2) {
                updated = await Report.findOneAndUpdate({ "number": req.body.number }, { $inc: { "report": 1 } }, {
                    new: true,
                    runValidators: true
                })
                response = updated;
            }
            else {
                const spam = await Spam.findOne({ "number": req.body.number })
                if (spam == null) {
                    added = await Spam.create(req.body)
                    response = added
                }
                else {
                    const incReport = await Spam.findOneAndUpdate({ "number": req.body.number }, { $inc: { "report": 1 } }, {
                        new: true,
                        runValidators: true
                    })
                    response = incReport
                }
            }
        }
        res.status(200).json({
            status: "Success",
            number: response.number,
            report: response.report
        }
        )



    } catch (err) {
        console.log(err)
    }
}
exports.getSpam = async (req, res) => {
    try {
        const spam = await Spam.find({}, { "_id": 0, "__v": 0 })
        res.status(200).json({
            status: "Success",
            data: spam
        })
    }
    catch (err) {
        res.status(400).json({
            status: "Fail",
            message: err
        })
    }
}

exports.checkSpam = async (req, res) => {
    try {
        const spam = await Spam.findOne({ "number": req.params.number })
        var message
        var data
        if (spam == null) {
            message = "Not Found",
                data = null
        }
        else {
            data = spam.report
            message = "Found"
        }
        res.status(200).json({
            status: "Success",
            message: message,
            report: data
        })
    }
    catch (err) {
        res.status(400).json({
            status: "Fail",
            message: err
        })
    }
}
exports.getReport = async (req, res) => {
    try {
        const spam = await Report.find({}, { "_id": 0, "__v": 0 })
        res.status(200).json({
            status: "Success",
            data: spam
        })
    }
    catch (err) {
        res.status(400).json({
            status: "Fail",
            message: err
        })
    }
}
