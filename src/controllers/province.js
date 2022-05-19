import provinceModel from '../models/province'
import {
  NOT_FOUND_DATA,
  ERROR_CREATION,
  ERROR_UPDATED
} from '../constants/errors/unsuccess'
import {
  SUCCESS_CREATED,
  SUCCESS_UPDATED
} from '../constants/success'

const createProvince = async (req, res) => {
  const { name_th, name_en, geography_id } = req.body
  try {
    await provinceModel.create({ name_th, name_en, geography_id })
    res.status(201).json(SUCCESS_CREATED)
  } catch (error) {
    throw ERROR_CREATION
  }
}

const deleteProvinceByID = async (req, res) => {
  const { ID } = req.params
  const result = await provinceModel.deleteOne({ _id: ID })

  res.status(200).json(result)
}

const getAllProvince = async (req, res) => {
  // const result = await provinceModel.find({})
  // console.log(result);
  const pipeline = [
    {
      '$lookup': {
        'from': 'geographies',
        'localField': 'geography_id',
        'foreignField': 'id',
        'as': 'result'
      }
    }
  ]
  const result = await provinceModel.aggregate(pipeline)
  if (!result) {
    throw NOT_FOUND_DATA
  }
  res.status(200).json(result)
}

const getProvinceByID = async (req, res) => {
  console.log(req.params);
  const { ID } = req.params
  const result = await provinceModel.findOne({ _id: ID })
  // console.log('result:', result);
  if (!result) {
    throw NOT_FOUND_DATA
  }
  res.status(200).json(result)
}

const updateProvinceByID = async (req, res) => {
  const { ID } = req.params
  const { name_th, name_en, geography_id } = req.body
  try {
    await provinceModel.findOneAndUpdate({ _id: ID }, { name_th, name_en, geography_id })
    res.status(201).json(SUCCESS_UPDATED)
  } catch (error) {
    throw ERROR_UPDATED
  }
}

const getTest = async (req, res) => {
  const pipeline = [
    {
      '$match': {
        'geography_id': '1'
      }
    }, {
      '$group': {
        '_id': '$name_th',
        'fieldN': {
          '$avg': '$id'
        }
      }
    }, {
      '$limit': 5
    }
  ]
  const result = await provinceModel.aggregate(pipeline)
  if (!result) {
    throw NOT_FOUND_DATA
  }
  res.status(200).json(result)
}

export default {
  createProvince,
  deleteProvinceByID,
  getAllProvince,
  getProvinceByID,
  updateProvinceByID,
  getTest
}
