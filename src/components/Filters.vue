<template>
  <div class="filters">

    <input
      v-model="store.searchQuery"
      type="text"
      placeholder="Search by name..."
    />

    <select v-model="store.selectedCategory">
      <option v-for="cat in store.categories" :key="cat">{{ cat }}</option>
    </select>

    <label>
      <input type="checkbox" v-model="store.inStockOnly" />
      In stock only
    </label>

    <button @click="toggleSort">
      Price {{ store.sortOrder === 'asc' ? '↑ Low to High' : '↓ High to Low' }}
    </button>

  </div>
</template>

<script setup>
import { useProductStore } from '../stores/productStore'

const store = useProductStore()

function toggleSort() {
  store.sortOrder = store.sortOrder === 'asc' ? 'desc' : 'asc'
}
</script>