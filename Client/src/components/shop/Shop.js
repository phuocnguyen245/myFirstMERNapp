import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
const Shop = () => {
  const params = useParams()
  const [shop, getShop] = useState({})
  const { id } = params
  useEffect(() => {
    const getData = async () => {
      const fetch = await axios.get(`http://localhost:5000/api/product/${id}`)
      const data = await fetch.data
      getShop(data)
    }
    getData()
  }, [id])
  console.log(shop);
  return (
    <div>
      Shop
    </div>
  )
}

export default Shop
