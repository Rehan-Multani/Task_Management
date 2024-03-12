const mongoose = require("mongoose");

const department = mongoose.Schema({

    category: {
        type: String,
    },
    image: {
        type: String,
    },

},
    {
        timestamps: true,
    },
)
module.exports = mongoose.model("catogorys", department);
