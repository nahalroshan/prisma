const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

app.use(express.json());

// CRUD -> Create, Read, Update
app.get("/", async (req, res) => {
  const allUsers = await prisma.user.findMany();
  res.json(allUsers);
});

app.post("/", async (req, res) => {
  const newUser = await prisma.user.create({ data: req.body });
  res.json(newUser);
});

app.put("/:id", async (req, res) => {
  const id = req.params.id;
  const newAge = req.body.age;
  const newUser = await prisma.user.update({
    where: { id: parseInt(id) },
    data: { age: newAge },
  });
  res.json(newUser);
});

app.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const deletedUser = await prisma.user.delete({ where: { id: parseInt(id) } });
  res.json(deletedUser);
});
app.delete("/", async (req, res) => {
    const id = req.params.id;
  
    const deletedUser = await prisma.user.deleteMany();
    res.json(deletedUser);
  });
  
app.get("/:id", async (req, res) => {
    const id = req.params.id;
  
    const deletedUser = await prisma.user.findMany({ where: { id: parseInt(id) } });
    res.json(deletedUser);
  });
app.listen(3001, () => console.log(`Server running port ${3001}`));
