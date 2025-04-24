import express from "express";

const router = express.Router();

let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Korven" },
  { id: 3, name: "Stefan" },
];

// Swagger info: GET / behöver vi dokumentera

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - users
 *     summary: Hämta alla användare
 *     description: Returnerar en lista med alla användare
 *     responses:
 *       200:
 *         description: Lyckad hämtning av alla användare
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Användarens unika id
 *                   name:
 *                     type: string
 *                     description: Användarens namn
 */

router.get("/", (req, res) => {
  res.status(200).json(users);
});

// Swagger info: POST / behöver vi dokumentera

/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - users
 *     summary: Skapa en ny användare
 *     description: Skapar en ny användare
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Användare skapad
 *         content:
 *           application/json:
 *            schema:
 *               $ref: '#/components/schemas/UserResponse'
 */

router.post("/", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Namn krävs" });
  }

  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name,
  };

  users.push(newUser);

  res.status(201).json({ message: "Användare skapad", user: newUser });
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags:
 *       - users
 *     summary: Ta bort en användare
 *     description: Raderar en användare med angivet ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID på användaren som ska tas bort
 *     responses:
 *       200:
 *         description: Användare borttagen
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Användare borttagen
 */
router.delete("/:id", (req, res) => {
  const userId = parseInt(req.params.id);

  const index = users.findIndex((user) => user.id === userId);

  if (index === -1) {
    return res.status(404).json({ message: "Användare hittades inte" });
  }

  users.splice(index, 1);

  res.status(200).json({ message: "Användare borttagen" });
});

export default router;
