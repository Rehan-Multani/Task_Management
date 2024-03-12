const mongoose = require("mongoose");

const Schema = mongoose.Schema({

    name: {
        type: String,
    },
    subcategory: {
        type: String,
    }

},
    {
        timestamps: true,
    }
)
module.exports = mongoose.model("subcatogorys", Schema);
