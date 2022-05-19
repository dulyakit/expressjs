import District from './schemas/district'

const create = (data, options) => District.create(data, options)

const deleteOne = (query) => District.deleteOne(query)

const find = (query, fields = {}, options = {}) => District.find(query, fields, options).lean()

const findOne = (query, fields = {}, options = {}) => District.findOne(query, fields, options).lean()

const findOneAndUpdate = (query, data) => District.findOneAndUpdate(query, data, { upsert: true }).exec()

const aggregate = (query) => District.aggregate(query).exec()


export default {
    create,
    deleteOne,
    find,
    findOne,
    findOneAndUpdate,
    aggregate
}
