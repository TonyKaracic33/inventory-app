<template>
  <v-container class="home-container" fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" md="6" lg="4">
        <v-card class="pa-6" elevation="4">
          <v-row justify="center">
            <v-avatar size="100">
              <v-img
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt="Antonio Karačić"
              />
            </v-avatar>
          </v-row>

          <v-card-title class="headline font-weight-bold text-center mt-4">
            Welcome to My Inventory App
          </v-card-title>

          <v-card-text class="text-center">
            <v-list dense>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="subtitle-1 font-weight-medium"
                    >Name:</v-list-item-title
                  >
                </v-list-item-content>
                <v-list-item-content class="text-right">
                  Antonio Karačić
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="subtitle-1 font-weight-medium"
                    >Number:</v-list-item-title
                  >
                </v-list-item-content>
                <v-list-item-content class="text-right">
                  123456789
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="subtitle-1 font-weight-medium"
                    >College ID:</v-list-item-title
                  >
                </v-list-item-content>
                <v-list-item-content class="text-right">
                  ABC123456
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <p class="mt-4">
              This app helps you manage your inventory efficiently.
            </p>
          </v-card-text>

          <v-card-actions class="justify-center">
            <router-link to="/products">
              <v-btn color="primary" large>Go to Products</v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
.home-container {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
