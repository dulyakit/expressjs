import GeographiesModel from '../models/geographies'
import {
  NOT_FOUND_DATA,
  ERROR_CREATION,
  ERROR_UPDATED
} from '../constants/errors/unsuccess'
import {
  SUCCESS_CREATED,
  SUCCESS_UPDATED
} from '../constants/success'

const createGeographies = async (req, res) => {
  const { name_th, name_en, geography_id } = req.body
  try {
    await GeographiesModel.create({ name_th, name_en, geography_id })
    res.status(201).json(SUCCESS_CREATED)
  } catch (error) {
    throw ERROR_CREATION
  }
}

const deleteGeographiesByID = async (req, res) => {
  const { ID } = req.params
  const result = await GeographiesModel.deleteOne({ _id: ID })

  res.status(200).json(result)
}

const getAllGeographies = async (req, res) => {
  // const result = await GeographiesModel.find({})
  // console.log(result);
  const pipeline = [
    {
      '$lookup': {
        'from': 'provinces',
        'localField': 'id',
        'foreignField': 'geography_id',
        'as': 'result'
      }
    }
  ]
  const result = await GeographiesModel.aggregate(pipeline)
  if (!result) {
    throw NOT_FOUND_DATA
  }
  res.status(200).json(result)
}

const getGeographiesByID = async (req, res) => {
  console.log(req.params);
  const { ID } = req.params
  const result = await GeographiesModel.findOne({ _id: ID })
  // console.log('result:', result);
  if (!result) {
    throw NOT_FOUND_DATA
  }
  res.status(200).json(result)
}

const updateGeographiesByID = async (req, res) => {
  const { ID } = req.params
  const { name_th, name_en, geography_id } = req.body
  try {
    await GeographiesModel.findOneAndUpdate({ _id: ID }, { name_th, name_en, geography_id })
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
  const result = await GeographiesModel.aggregate(pipeline)
  if (!result) {
    throw NOT_FOUND_DATA
  }
  res.status(200).json(result)
}

export default {
  createGeographies,
  deleteGeographiesByID,
  getAllGeographies,
  getGeographiesByID,
  updateGeographiesByID,
  getTest
}
