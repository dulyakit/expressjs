import DistrictModel from '../models/district'
import {
  NOT_FOUND_DATA,
  ERROR_CREATION,
  ERROR_UPDATED
} from '../constants/errors/unsuccess'
import {
  SUCCESS_CREATED,
  SUCCESS_UPDATED
} from '../constants/success'

const createDistrict = async (req, res) => {
  const { name_th, name_en, geography_id } = req.body
  try {
    await DistrictModel.create({ name_th, name_en, geography_id })
    res.status(201).json(SUCCESS_CREATED)
  } catch (error) {
    throw ERROR_CREATION
  }
}

const deleteDistrictByID = async (req, res) => {
  const { ID } = req.params
  const result = await DistrictModel.deleteOne({ _id: ID })

  res.status(200).json(result)
}

const getAllDistrict = async (req, res) => {
  const pipeline = [
    {
      '$lookup': {
        'from': 'provinces',
        'localField': 'province_id',
        'foreignField': 'id',
        'as': 'province'
      }
    },
    {
      '$lookup': {
        'from': 'geographies',
        'localField': 'province.geography_id',
        'foreignField': 'id',
        'as': 'geographies'
      },
    }, {
      '$limit': 10
    }

  ]
  const result = await DistrictModel.aggregate(pipeline)
  if (!result) {
    throw NOT_FOUND_DATA
  }
  res.status(200).json(result)
}

const getDistrictByID = async (req, res) => {
  console.log(req.params);
  const { ID } = req.params
  const result = await DistrictModel.findOne({ _id: ID })
  // console.log('result:', result);
  if (!result) {
    throw NOT_FOUND_DATA
  }
  res.status(200).json(result)
}

const updateDistrictByID = async (req, res) => {
  const { ID } = req.params
  const { name_th, name_en, geography_id } = req.body
  try {
    await DistrictModel.findOneAndUpdate({ _id: ID }, { name_th, name_en, geography_id })
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
  const result = await DistrictModel.aggregate(pipeline)
  if (!result) {
    throw NOT_FOUND_DATA
  }
  res.status(200).json(result)
}

export default {
  createDistrict,
  deleteDistrictByID,
  getAllDistrict,
  getDistrictByID,
  updateDistrictByID,
  getTest
}
