const express = require("express");
const cors = require("cors");
const productsRouter = require("./routes/products");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Swagger setup
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Products API",
    version: "1.0.0",
    description: "API documentation for Products",
  },
  servers: [
    {
      url: `http://localhost:${PORT}`,
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"], // Path to your API docs
};

const swaggerSpec = swaggerJsdoc(options);

// Routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/products", productsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
