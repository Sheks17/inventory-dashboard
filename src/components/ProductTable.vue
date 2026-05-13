<template>
  <div class="table-wrapper">

    <p v-if="store.loading" class="message">Loading products...</p>

    <p v-else-if="store.filteredProducts.length === 0" class="message">
      No products found.
    </p>

    <table v-else>
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="product in store.filteredProducts"
          :key="product.id"
          :class="{
            'low-stock': product.stock > 0 && product.stock <= 3,
            'out-of-stock': product.stock === 0
          }"
        >
          <td>{{ product.name }}</td>
          <td>{{ product.category }}</td>
          <td>${{ product.price.toFixed(2) }}</td>
          <td>
            <input
              type="number"
              :value="product.stock"
              min="0"
              class="stock-input"
              @change="e => store.updateStock(product.id, e.target.value)"
            />
          </td>
          <td>
            <button @click="store.removeProduct(product.id)">Remove</button>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script setup>
import { useProductStore } from '../stores/productStore'
const store = useProductStore()
</script>