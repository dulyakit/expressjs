import mongoose from 'mongoose'

const customValidators = {
  isObjectID: (param) => mongoose.Types.ObjectId.isValid(parseInt(param)),
  // isObjectID: (param) => mongoose.Types.ObjectId.isValid(param),
}

export default customValidators
