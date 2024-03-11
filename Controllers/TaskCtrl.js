const db = require('../Models/TaskModel');

const getpaginate = async (req, res) => {
    const data = await db.find()
    res.json(data)
}
const Getdata = async (req, resp) => {
    try {
        const result = await db.find({ _id: req.params.id })
        resp.send(result)
    } catch (error) {
        resp.status(404).json(error.message)

    }
}
const Postdata = async (req, res) => {

    const data = await db.findOne({ companyId: req.body.companyId })
    if (data) {
        res.json("This comapany Id alraeday Use")
    } else {
        if (req.uploadedImageUrl) {
          img = req.uploadedImageUrl;
        }
        const img = req.uploadedImageUrl
        const newUser = await db.create(
            {
                descriptionFile: img,
                ...req.body
            }
        );

        res.json(newUser);
    }
};
const Putdata = async (req, res) => {
    try {
        const img = req.uploadedImageUrl
        let result = await db.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    descriptionFile: img,
                    ...req.body
                }
            })
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json(error.message)
    }
}
const DeleteData = async (req, res) => {
    try {
        let result = await db.deleteOne({ _id: req.params.id },
            {
                $set: req.body
            })
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json(error.message)
    }
}

module.exports = { getpaginate, Getdata, Postdata, Putdata, DeleteData };