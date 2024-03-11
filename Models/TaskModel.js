const mongoose = require("mongoose");

const department = mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    subCategory: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    descriptionFile: {
        type: String,
    },
    taskTime: {
        type: String,
        required: true,
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
    }
},
    {
        timestamps: true,
    },
)
module.exports = mongoose.model("tasks", department);
