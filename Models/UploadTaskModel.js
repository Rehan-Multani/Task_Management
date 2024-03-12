const mongoose = require("mongoose");

const department = mongoose.Schema({

    title: {
        type: String
    },
    description: {
        type: String
    },
    descriptionFile: {
        type: String
    },
    taskTime: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId
    }
},
    {
        timestamps: true,
    }
)
module.exports = mongoose.model("uploadtasks", department);
