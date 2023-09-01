const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0", // Use the appropriate version (3.0.0 for Swagger 3.0)
    info: {
      title: "E-commerce-API",
      version: "1.0.0",
      description: "Ecommerce-API",
    },
    servers:[
        {
            url: "https://e-commerce-api-with-node-js.onrender.com/"
        }
    ]
  },
  apis: ["./routes/**/*.js", "./controllers/**/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
