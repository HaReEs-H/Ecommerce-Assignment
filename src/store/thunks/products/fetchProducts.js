import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const response = await axios.get('http://localhost:3005/products')
  return response.data
})

const fetchProductsByFilter = createAsyncThunk(
  'products/fetch/filters',
  async ({ filter, sort }) => {
    //filter={"category":["smartphone","laptops"]}
    //sort={_sort="price",_order:"desc"}
    //pagination={_page=1,_limit=10}   _page=1&_limit=10
    //ToDo: On server we will support multiple values
    let queryString = ''
    for (let key in filter) {
      const categoryValues = filter[key]
      if (categoryValues.length > 0) {
        const lastCategoryValue = categoryValues[categoryValues.length - 1]
        queryString += `${key}=${lastCategoryValue}&`
      }
    }
    for (let key in sort) {
      queryString += `${key}=${sort[key]}&`
    }
    // for (let key in pagination) {
    //   queryString += `${key}=${pagination[key]}&`
    // }
    // queryString += `limit=${pagination._limit}`
    const response = await axios.get(
      'http://localhost:3005/products?' + queryString
    )
    const data = response.data
    /*
    we can get total from network-->request-->header tab
    but this api is not working properly so i am giving
    55 as constant value for totalItems in pagination
    if we are getting total we can add in that object
    const total = await response.headers.get('X-Total-Count')*/
    return { data }
  }
)

const fetchProductById = createAsyncThunk('products/fetch/id', async (id) => {
  const response = await axios.get('http://localhost:3005/products/' + id)
  return response.data
})

// const fetchBrands = createAsyncThunk('brands/fetch', async () => {
//   const response = await axios.get('http://localhost:3005/brands')
//   return response.data
// })

const fetchCategories = createAsyncThunk('categories/fetch', async () => {
  console.log('Fetching categories...')
  const response = await axios.get('http://localhost:3005/categories')
  console.log('API Response', response.data)
  return response.data
})

export {
  fetchProductById,
  fetchProducts,
  fetchProductsByFilter,
  /*fetchBrands,*/
  fetchCategories,
}
