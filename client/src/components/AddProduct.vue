<template>
  <v-container>
    <v-form @submit.prevent="addProduct">
      <v-text-field v-model="name" label="Name" required></v-text-field>

      <v-text-field
        v-model="manufacturer"
        label="Manufacturer"
        required
      ></v-text-field>

      <v-text-field v-model="origin" label="Origin" required></v-text-field>

      <v-text-field
        v-model.number="quantity"
        label="Quantity"
        type="number"
        required
        min="0"
      ></v-text-field>

      <v-btn type="submit" color="primary">Add Product</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AddProduct',
  data() {
    return {
      name: '',
      manufacturer: '',
      origin: '',
      quantity: 0,
    };
  },
  methods: {
    async addProduct() {
      try {
        const newProduct = {
          name: this.name,
          manufacturer: this.manufacturer,
          origin: this.origin,
          quantity: this.quantity,
        };
        await axios.post('http://localhost:3000/api/products', newProduct);
        this.$emit('product-added');
        this.name = '';
        this.manufacturer = '';
        this.origin = '';
        this.quantity = 0;
      } catch (error) {
        console.error('Failed to add product:', error);
      }
    },
  },
};
</script>
