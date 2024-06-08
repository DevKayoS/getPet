

const mongoose = require('../db/conn')
const {Schema} = mongoose

const Pet = mongoose.model(
  'Pet',
  new Schema ({ 
    name: {
      type: String,
      require: true
    },
    age: {
      type: Number,
      require: true
    },
    weight: {
      type: Number,
      require: true
    },
    coat: {
      type: String
    },
    images: {
      type: Array,
      required: true
    },
    available: {
      type: Boolean,
    },
    user: Object,
    adopter: Object
  },
{timestamps: true}
)
)

module.exports =  Pet