import React, { useEffect } from 'react'
import Container from '../components/layout/Container'
import ProductView from '../components/products/ProductView'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductById } from '../redux/slices/productSlice'

export default function ProductViewPage() {
  const { currentProduct } = useSelector((state) => state.products)
  // console.log(currentProduct)
  const dispatch = useDispatch()
  const { productId } = useParams()

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId))
    }
  }, [productId, dispatch])

  return (
    <Container>
      <ProductView currentProduct={currentProduct} />
    </Container>
  )
}
