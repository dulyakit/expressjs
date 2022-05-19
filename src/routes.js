import express from 'express'
import productController from './controllers/product'
// import usersController from './controllers/users'
import districtController from './controllers/district'
import provinceController from './controllers/province'
import geographiesController from './controllers/geographies'
import validator from './request'
import { cacheWithRedis } from './redis'

const onlyStatus200 = (req, res) => res.statusCode === 200


const router = express.Router()

router
  .get('/province', provinceController.getAllProvince)
  .get('/province/:ID', provinceController.getProvinceByID)
  .delete('/province/:ID', validator.getByID, provinceController.deleteProvinceByID)
  .post('/province', provinceController.createProvince)
  .put('/province/:ID', provinceController.updateProvinceByID)
  .get('/testag', provinceController.getTest)

  .get('/geo', geographiesController.getAllGeographies)

  .get('/district', districtController.getAllDistrict)


  .get('/products', productController.getAllProduct)
  .get('/test', productController.getAllProduct)
  // .get('/products', cacheWithRedis('0.1 minutes', onlyStatus200), productController.getAllProduct)
  .get('/products/:ID', validator.getByID, cacheWithRedis('1 minutes', onlyStatus200), productController.getProductByID)
  .post('/products', validator.create, productController.createProduct)
  .put('/products/:ID', validator.updateByID, productController.updateProductByID)
  .delete('/products/:ID', productController.deleteProductByID)

export default router
