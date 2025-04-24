import express from "express";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import userRouter from "./routes/users.js";

const app = express();
const PORT = 8000;

app.use(cors());

// Swagger-dokumentations inställningar, för att generera en api-dokumentation
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "My Swagger API",
      description: "Learning API documentation with Swagger",
      version: "1.0.0",
    },
    tags: [
      {
        name: "users",
        description: "Operations relaterade till användare",
      },
    ],
    servers: [
      {
        url: "http://localhost:8000",
        description: "Local dev server",
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "Användarens unika id",
              example: 1,
            },
            name: {
              type: "string",
              description: "Användarens namn",
              example: "Kajsa",
            },
          },
        },
        UserResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Bekräftelsemeddelande",
            },
            user: {
              $ref: "#/components/schemas/User",
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());

// route middleware för user
app.use("/users", userRouter);

app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");

  res.send(swaggerDocs);
});

app.listen(PORT, () => {
  console.log("servern körs på : http://localhost:8000");
});
