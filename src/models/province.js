import Province from './schemas/province'

const create = (data, options) => Province.create(data, options)

const deleteOne = (query) => Province.deleteOne(query)

const find = (query, fields = {}, options = {}) => Province.find(query, fields, options).lean()

const findOne = (query, fields = {}, options = {}) => Province.findOne(query, fields, options).lean()

const findOneAndUpdate = (query, data) => Province.findOneAndUpdate(query, data, { upsert: true }).exec()

// const aggregate = (query, fields = {}, options = {}) => Province.aggregate(query, fields, options).lean()
const aggregate = (query) => Province.aggregate(query).exec()


export default {
    create,
    deleteOne,
    find,
    findOne,
    findOneAndUpdate,
    aggregate
}
