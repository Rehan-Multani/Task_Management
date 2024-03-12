const mongoose = require("mongoose");

const Schema = mongoose.Schema({

    rating: {
        type: String,
    }
},
    {
        timestamps: true,
    }
)
module.exports = mongoose.model("ratings", Schema);
