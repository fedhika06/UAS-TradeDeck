import { useEffect, useState } from 'react'
import { fetchProducts, fetchCategories } from '../api/products.js'

export function useProducts({ search, category, sort } = {}) {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function load() {
      setIsLoading(true)
      setError(null)
      try {
        const [productData, categoryData] = await Promise.all([
          fetchProducts({ q: search || undefined, category: category || undefined, sort: sort || undefined }),
          fetchCategories(),
        ])
        if (isMounted) {
          setProducts(productData)
          setCategories(categoryData)
        }
      } catch (err) {
        if (isMounted) setError(err)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    load()
    return () => {
      isMounted = false
    }
  }, [search, category, sort])

  return { products, categories, isLoading, error }
}