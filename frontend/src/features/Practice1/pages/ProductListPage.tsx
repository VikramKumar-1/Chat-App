import { useEffect, useState } from "react"
import { Loader, Select, TextInput } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import ProductCard from "../components/ProductCard"
import { getAllProducts, getCategories } from "../services/productService"
import type {Product} from "../types/Product"

const ProductListPage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [filtered, setFiltered] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const data = await getAllProducts()
      const cat = await getCategories()
      setProducts(data)
      setFiltered(data)
      setCategories(cat)
    } catch (error: unknown){
     console.error("Product fetch error:", error)
      notifications.show({
        title: "Error",
        message: "Failed to load products",
        color: "red",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let temp = [...products]

    if (search) {
      temp = temp.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (category) {
      temp = temp.filter((p) => p.category === category)
    }

    setFiltered(temp)
  }, [search, category, products])

  if (loading) return <Loader className="flex justify-center mt-20" />

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Product Listing</h1>

      <div className="flex gap-4 mb-6">
        <TextInput
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />

        <Select
          placeholder="Filter by category"
          data={categories}
          value={category}
          onChange={setCategory}
          clearable
        />
      </div>

      <div className="grid grid-cols-4 gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default ProductListPage