import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProductStore = defineStore('products', () => {

    // STATE

  const products = ref([]) // STATE
  const loading = ref(false) // STATE
  const searchQuery = ref('') // STATE
  const selectedCategory = ref('All') // STATE
  const inStockOnly = ref(false) // STATE
  const sortOrder = ref('asc') // state

  // ACTIONS
  async function loadInitialData() {  //changes products and loading
    loading.value = true
    await new Promise(resolve => setTimeout(resolve, 1000))

    const saved = localStorage.getItem('products')
    if (saved) {
      products.value = JSON.parse(saved)
    } else {
      products.value = [
        { id: 1, name: 'Laptop', category: 'Electronics', price: 999, stock: 10 },
        { id: 2, name: 'Mouse', category: 'Electronics', price: 25, stock: 3 },
        { id: 3, name: 'Desk', category: 'Furniture', price: 400, stock: 0 },
        { id: 4, name: 'Notebook', category: 'Stationery', price: 5, stock: 100 },
      ]
    }
    loading.value = false
  }

  function addProduct(product) {  //adds to products array
    products.value.push({
      id: Date.now(),
      name: product.name,
      category: product.category,
      price: parseFloat(product.price),
      stock: parseInt(product.stock),
    })
    save()
  }

  function updateStock(id, newStock) {  //changes one product's stock
    const product = products.value.find(p => p.id === id)
    if (product) {
      product.stock = parseInt(newStock)
      save()
    }
  }

  function removeProduct(id) {   //removes from products array
    products.value = products.value.filter(p => p.id !== id)
    save()
  }

  function save() {  //saves to localStorage 
    localStorage.setItem('products', JSON.stringify(products.value))
  }

  const categories = computed(() => {  // getter
    const cats = products.value.map(p => p.category)
    const unique = [...new Set(cats)]
    return ['All', ...unique]
  })

  const filteredProducts = computed(() => { //getter
    let list = [...products.value]

    if (selectedCategory.value !== 'All') {
      list = list.filter(p => p.category === selectedCategory.value)
    }

    if (inStockOnly.value) {
      list = list.filter(p => p.stock > 0)
    }

    if (searchQuery.value) {
      list = list.filter(p =>
        p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    }

    list.sort((a, b) =>
      sortOrder.value === 'asc' ? a.price - b.price : b.price - a.price
    )

    return list
  })

  return {
    products,
    loading,
    searchQuery,
    selectedCategory,
    inStockOnly,
    sortOrder,
    categories,
    filteredProducts,
    loadInitialData,
    addProduct,
    updateStock,
    removeProduct,
  }
})