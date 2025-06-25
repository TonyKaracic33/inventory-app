<template>
  <v-container class="pa-6" fluid>
    <!-- Search and Add Product Controls -->
    <v-row class="mb-6" align="center" justify="space-between">
      <!-- Search bar aligned left -->
      <v-col cols="12" md="7">
        <v-text-field
          v-model="search"
          label="Search products"
          clearable
          prepend-inner-icon="mdi-magnify"
          dense
          outlined
          hide-details
          placeholder="Search by name, manufacturer..."
        />
      </v-col>

      <!-- Add/Hide button aligned right -->
      <v-col cols="12" md="4" class="text-md-right mt-4 mt-md-0">
        <v-btn
          :color="showAddForm ? 'error' : 'success'"
          rounded
          elevation="3"
          @click="showAddForm = !showAddForm"
        >
          <v-icon left>
            {{ showAddForm ? "mdi-close" : "mdi-plus" }}
          </v-icon>
          {{ showAddForm ? "Hide Form" : "Add Product" }}
        </v-btn>
      </v-col>
    </v-row>

    <!-- Add Product Form with slide transition -->
    <v-expand-transition>
      <div v-show="showAddForm" class="mb-8">
        <add-product @product-added="handleProductAdded" />
      </div>
    </v-expand-transition>

    <!-- Edit Product Dialog -->
    <edit-product-dialog
      v-model="editDialog"
      :product="editedProduct"
      @save="handleProductUpdated"
      @cancel="handleEditCancel"
    />

    <!-- Products Table -->
    <v-data-table
      :headers="headers"
      :items="products"
      :search="search"
      :items-per-page="5"
      class="elevation-3"
      dense
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Product List</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              color="primary"
              class="me-2"
              @click="editProduct(item)"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </template>
          <span>Edit</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              color="error"
              @click="deleteProduct(item.id)"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
          <span>Delete</span>
        </v-tooltip>
      </template>
    </v-data-table>

    <!-- Snackbar for feedback -->
    <v-snackbar
      v-model="snackbar"
      :timeout="3000"
      rounded
      elevation="4"
      vertical
      top
    >
      {{ snackbarMessage }}
      <template #action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { getProducts, deleteProductById, updateProduct } from "../api/api";
import AddProduct from "../components/AddProduct.vue";
import EditProductDialog from "../components/EditProductDialog.vue";

export default {
  name: "ProductList",
  components: { EditProductDialog, AddProduct },
  data() {
    return {
      search: "",
      products: [],
      snackbar: false,
      snackbarMessage: "",
      showAddForm: false,
      editedProduct: null,
      editDialog: false,
      headers: [
        { text: "ID", value: "id" },
        { text: "Name", value: "name" },
        { text: "Manufacturer", value: "manufacturer" },
        { text: "Origin", value: "origin" },
        { text: "Quantity", value: "quantity" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        this.products = await getProducts();
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    async deleteProduct(id) {
      if (!confirm("Are you sure you want to delete this product?")) return;
      try {
        await deleteProductById(id);
        this.snackbarMessage = "Product deleted successfully";
        this.snackbar = true;
        this.fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    },
    editProduct(item) {
      this.editedProduct = { ...item };
      this.editDialog = true;
    },
    handleProductAdded() {
      this.fetchProducts();
      this.showAddForm = false;
      this.snackbarMessage = "Product added successfully";
      this.snackbar = true;
    },
    async handleProductUpdated(updatedProduct) {
      await updateProduct(updatedProduct);
      this.fetchProducts();
      this.editDialog = false;
      this.snackbarMessage = "Product updated successfully";
      this.snackbar = true;
    },
    handleEditCancel() {
      this.editDialog = false;
      this.editedProduct = null;
    },
  },
};
</script>

<style scoped>
.me-2 {
  margin-right: 8px;
}
</style>
