# Product Inventory Dashboard

A simple single-page inventory management app built with Vue 3 and Pinia.

## Tech Stack

- Vue 3 (Composition API)
- Pinia (state management)
- Vite (build tool)
- Plain CSS (no UI library)

## Setup & Run

```bash
# Install dependencies
npm install

# Install pinia
npm install pinia

# Run development server
npm run dev
```

Then open http://localhost:5173 in your browser.

## Features

- View all products in a table (name, category, price, stock)
- Add new products using the form with validation
- Search products by name (case-insensitive)
- Filter by category using a dropdown
- Toggle to show in-stock products only
- Sort by price ascending or descending
- Edit stock levels inline directly in the table
- Remove products with the Remove button
- Low stock highlighted in yellow (3 or fewer)
- Out of stock highlighted in red (0)
- Data persists to localStorage so it survives page refresh
- Loading state shown while initial data loads

## Project Structure

```
src/
├── components/
│   ├── Filters.vue       # Search, category dropdown, in-stock toggle, sort button
│   ├── ProductForm.vue   # Add product form with validation
│   └── ProductTable.vue  # Product table with inline stock editing
├── stores/
│   └── productStore.js   # All state, actions, and getters (Pinia)
├── App.vue               # Root component, loads data, renders layout
├── main.js               # App entry point, registers Pinia
└── style.css             # Global styles
```

## Design Decisions

**Why did I choose Pinia?**
Pinia is the official state management library for Vue 3. I used it so all the product data, filters, and sorting logic live in one place rather than being scattered across components. Components stay thin so they can mainly just display data and call store actions.

**Why is it important to keep components thin?**
Each component only does one thing. ProductTable displays products. ProductForm handles adding. Filters handles filtering. This makes the code easier to read and maintain.

**I decided to use localStorage because**
A real app would use a backend API. But this project is mostly frontend, so the localStorage lets the data survive page refreshes so you don't lose products every time you reload.

**Why a computed getter for filtering?**
The filteredProducts getter in the store automatically recalculates whenever the search query, category, in-stock toggle, or sort order changes. This means components never need to manually make updates, Vue's reactivity handles it.

**Validation**
The form checks that name is not empty, price is greater than 0, and stock is 0 or more. Error messages appear below each field if any of these validation were to fail.

## What I Learned

Coming from React and Redux, this project helped me deepen my understanding 
of Vue's reactivity system. Computed properties were particularly interesting,                                     in React I was used to manually managing derived state with useMemo or 
Redux selectors, but seeing how Vue's computed values automatically track 
their dependencies and recalculate felt more intuitive. This also helped me 
better understand v-model and how two-way binding works under the hood. 
Overall, building this in under 24 hours with a framework I had never used 
before was a valuable experience in learning by doing and transferring 
concepts across frameworks.

## Unite Test

**Test 1 — addProduct:**

We create a fresh store
We call addProduct with a product object
We check that products now has 1 item
We check the name is correct
We check price converted from string "999" to number 999
We check stock converted from string "10" to number 10


**Test 2 — removeProduct:**

We create a fresh store
We add a product first so we have something to remove
We grab its ID
We call removeProduct with that ID
We check the store is now empty