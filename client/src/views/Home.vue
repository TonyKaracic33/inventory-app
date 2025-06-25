<template>
  <div class="home-container">
    <h1>Welcome to my Inventory App</h1>
    <!-- Here add your personal info -->
    <p>
      Name: John Doe <br />
      Number: 123456789 <br />
      College ID: ABC123456 <br />
    </p>
    <p>This app helps you manage your inventory efficiently.</p>
    <router-link to="/products">
      <v-btn color="primary">Go to Products</v-btn>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style scoped>
.home-container {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  padding: 2rem;
}
</style>
