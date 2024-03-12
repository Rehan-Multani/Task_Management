const mongoose = require("mongoose");

const department = mongoose.Schema({

    title: {
        type: String
    },
    category: {
        type: String
    },
    subCategory: {
        type: String
    },
    price: {
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
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
    }
},
    {
        timestamps: true,
    }
)
module.exports = mongoose.model("tasks", department);
