import React, { useEffect, useState } from 'react'
import { Field, Form, Formik, useFormik } from 'formik'
import axios from 'axios'
const AddProduct = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  useEffect(() => {
    axios.get('https://northwind.vercel.app/api/products').then((res) => {
      setProducts(res.data)
    })
  }, [])
  useEffect(() => {
    axios
      .get('https://northwind.vercel.app/api/categories')
      .then((res) => setCategories(res.data))
  })
  const formik = useFormik({
    initialValues: {
      categoryId: '',
      name: '',
      unitPrice: '',
      unitsInStock: '',
      discount: '',
      quantityPerUnit: '',
    },
    onSubmit: async (values) => {
      axios
        .post('https://northwind.vercel.app/api/products', values)
        .then((res) => console.log(res))
    },
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <select name="categoryId" id="categoryId" onChange={formik.handleChange}>
        {categories.map((category) => {
          return (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          )
        })}
      </select>
      <label htmlFor="firstName">Name</label>
      <input
        id="name"
        name="name"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      <label htmlFor="unitPrice">unit Price</label>
      <input
        id="unitPrice"
        name="unitPrice"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.unitPrice}
      />
      <label htmlFor="unitPrice">Units in Stock</label>
      <input
        id="unitsInStock"
        name="unitsInStock"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.unitsInStock}
      />
      <label htmlFor="unitPrice">Discount</label>
      <input
        id="discount"
        name="discount"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.discount}
      />
      <label htmlFor="unitPrice">quantityPerUnit</label>
      <input
        id="quantityPerUnit"
        name="quantityPerUnit"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.quantityPerUnit}
      />
      <button type="submit">Submit</button>
    </form>
  )
}

export default AddProduct
