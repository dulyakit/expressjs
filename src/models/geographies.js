import Geographies from './schemas/geographies'

const create = (data, options) => Geographies.create(data, options)

const deleteOne = (query) => Geographies.deleteOne(query)

const find = (query, fields = {}, options = {}) => Geographies.find(query, fields, options).lean()

const findOne = (query, fields = {}, options = {}) => Geographies.findOne(query, fields, options).lean()

const findOneAndUpdate = (query, data) => Geographies.findOneAndUpdate(query, data, { upsert: true }).exec()

const aggregate = (query) => Geographies.aggregate(query).exec()


export default {
    create,
    deleteOne,
    find,
    findOne,
    findOneAndUpdate,
    aggregate
}
