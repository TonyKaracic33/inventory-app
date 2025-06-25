<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title>Inventory App</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn text to="/">Home</v-btn>
    <v-btn text to="/products">Products</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>
