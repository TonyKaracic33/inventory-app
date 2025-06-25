<template>
  <v-dialog v-model="internalDialog" max-width="600px" persistent>
    <v-card>
      <v-card-title>Edit Product</v-card-title>
      <v-card-text>
        <v-form ref="form" @submit.prevent="submitForm">
          <v-text-field
            v-model="form.name"
            label="Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.manufacturer"
            label="Manufacturer"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.origin"
            label="Origin"
            required
          ></v-text-field>
          <v-text-field
            v-model.number="form.quantity"
            label="Quantity"
            type="number"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="secondary" @click="cancel">Cancel</v-btn>
        <v-btn color="primary" @click="submitForm">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "EditProductDialog",
  props: {
    product: {
      type: Object,
      default: null,
    },
    modelValue: {
      // controls dialog open/close state from parent
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue", "save", "cancel"],
  data() {
    return {
      form: {
        id: null,
        name: "",
        manufacturer: "",
        origin: "",
        quantity: 0,
      },
      internalDialog: this.modelValue,
    };
  },
  watch: {
    modelValue(newVal) {
      this.internalDialog = newVal;
    },
    internalDialog(newVal) {
      this.$emit("update:modelValue", newVal);
      if (!newVal) {
        this.cancel(); // if dialog is closed externally, emit cancel
      }
    },
    product: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.form = { ...newVal };
        } else {
          this.resetForm();
        }
      },
    },
  },
  methods: {
    resetForm() {
      this.form = {
        id: null,
        name: "",
        manufacturer: "",
        origin: "",
        quantity: 0,
      };
    },
    submitForm() {
      // Simple validation example, add more if needed
      if (
        !this.form.name ||
        !this.form.manufacturer ||
        !this.form.origin ||
        this.form.quantity < 0
      ) {
        alert("Please fill in all fields correctly.");
        return;
      }
      this.$emit("save", { ...this.form });
      this.internalDialog = false; // close dialog
    },
    cancel() {
      this.$emit("cancel");
      this.internalDialog = false;
    },
  },
};
</script>
