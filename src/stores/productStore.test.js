import { setActivePinia, createPinia } from 'pinia'
import { beforeEach, describe, test, expect } from 'vitest'
import { useProductStore } from './productStore'

// This runs before each test — gives us a fresh store every time
beforeEach(() => {
  setActivePinia(createPinia())
})

// ─ TEST 1 ─
describe('addProduct', () => {
  test('adds a new product to the store', () => {
    //set up the store
    const store = useProductStore()

    // adds product so we can test
    store.addProduct({
      name: 'Test Laptop',
      category: 'Electronics',
      price: '999',
      stock: '10',
    })

    // check the result
    expect(store.products.length).toBe(1)
    expect(store.products[0].name).toBe('Test Laptop')
    expect(store.products[0].price).toBe(999)
    expect(store.products[0].stock).toBe(10)
  })
})

// ─ TEST 2 ─
describe('removeProduct', () => {
  test('removes a product from the store by id', () => {
    // add a product first so we have something to remove
    const store = useProductStore()
    store.addProduct({
      name: 'Test Mouse',
      category: 'Electronics',
      price: '25',
      stock: '5',
    })

    // Make sure it was added
    expect(store.products.length).toBe(1)

    // Get the ID of the product we just added
    const productId = store.products[0].id

    // Actiio — remove it
    store.removeProduct(productId)

    //  store should be empty at this point
    expect(store.products.length).toBe(0)
  })
})