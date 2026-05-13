<template>
  <div class="form-card">
    <h2>Add Product</h2>

    <div class="field">
      <label>Name</label>
      <input v-model="name" type="text" placeholder="Product name" />
      <span class="error" v-if="errors.name">{{ errors.name }}</span>
    </div>

    <div class="field">
      <label>Category</label>
      <input v-model="category" type="text" placeholder="e.g. Electronics" />
    </div>

    <div class="field">
      <label>Price</label>
      <input v-model="price" type="number" placeholder="0" />
      <span class="error" v-if="errors.price">{{ errors.price }}</span>
    </div>

    <div class="field">
      <label>Stock</label>
      <input v-model="stock" type="number" placeholder="0" />
      <span class="error" v-if="errors.stock">{{ errors.stock }}</span>
    </div>

    <button @click="submit">Add Product</button>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useProductStore } from '../stores/productStore'

const store = useProductStore()

const name = ref('')
const category = ref('')
const price = ref('')
const stock = ref('')
const errors = reactive({ name: '', price: '', stock: '' })

function submit() {
  errors.name = ''
  errors.price = ''
  errors.stock = ''

  let valid = true

  if (!name.value.trim()) {
    errors.name = 'Name is required'
    valid = false
  }

  if (!price.value || parseFloat(price.value) <= 0) {
    errors.price = 'Price must be greater than 0'
    valid = false
  }

  if (stock.value === '' || parseInt(stock.value) < 0) {
    errors.stock = 'Stock must be 0 or more'
    valid = false
  }

  if (!valid) return

  store.addProduct({
    name: name.value,
    category: category.value || 'General',
    price: price.value,
    stock: stock.value,
  })

  name.value = ''
  category.value = ''
  price.value = ''
  stock.value = ''
}
</script>