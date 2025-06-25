<template>
  <v-container>
    <!-- Add Product Form -->
    <add-product @product-added="fetchProducts" />

    <!-- Search Bar -->
    <v-text-field
      v-model="search"
      label="Search products"
      class="my-5"
      clearable
      prepend-inner-icon="mdi-magnify"
    ></v-text-field>

    <!-- Products Table -->
    <v-data-table
      :headers="headers"
      :items="products"
      :search="search"
      :items-per-page="5"
      class="elevation-2"
      dense
    >
      <template v-slot:item.actions="{ item }">
        <v-icon small class="me-2" color="blue" @click="editProduct(item)">
          mdi-pencil
        </v-icon>
        <v-icon small color="red" @click="deleteProduct(item.id)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>

    <!-- Snackbar for feedback -->
    <v-snackbar v-model="snackbar" :timeout="3000">
      {{ snackbarMessage }}
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from 'axios';
import AddProduct from './AddProduct.vue';

export default {
  name: 'ProductList',
  components: { AddProduct },
  data() {
    return {
      search: '',
      products: [],
      snackbar: false,
      snackbarMessage: '',
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Name', value: 'name' },
        { text: 'Manufacturer', value: 'manufacturer' },
        { text: 'Origin', value: 'origin' },
        { text: 'Quantity', value: 'quantity' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3000/api/products');
        this.products = response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    async deleteProduct(id) {
      if (!confirm('Are you sure you want to delete this product?')) return;
      try {
        await axios.delete(`http://localhost:3000/api/products/${id}`);
        this.snackbarMessage = 'Product deleted successfully';
        this.snackbar = true;
        this.fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    },
    editProduct(item) {
      // You can implement an edit dialog later
      alert(`Edit product: ${item.name}`);
    },
  },
};
</script>
