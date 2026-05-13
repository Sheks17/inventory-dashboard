<template>
  <div class="app">
    <h1>Product Inventory Dashboard</h1>
    <Filters />
    <div class="layout">
      <ProductTable />
      <ProductForm />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useProductStore } from './stores/productStore'
import Filters from './components/Filters.vue'
import ProductTable from './components/ProductTable.vue'
import ProductForm from './components/ProductForm.vue'

const store = useProductStore()
onMounted(() => store.loadInitialData())
</script>