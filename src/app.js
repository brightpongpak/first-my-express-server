import express from "express";
import Prisma from "@prisma/client";


const app = express();
const prisma = new Prisma.PrismaClient();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/stock/:id", async (req, res, next) => {
  try {
    var result = await prisma.stock.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

app.post("/stock", async (req, res, next) => {
  var data = req.body;
  console.log(data);
  try {
    await prisma.stock.create({
      data: data,
    });
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

app.put('/stock/:id', async (req, res, next) => {
  var data = req.body;
  try {
    await prisma.stock.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        name: data?.name || undefined,
        amount: data?.amount || undefined,
        detail: data?.detail || undefined,
      },
    });
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
});

app.delete('/stock/:id', async (req, res, next) => {
  try {
    await prisma.stock.delete({
      where: {
        id: parseInt(req.params.id)
      }
    })
    res.end()
  } catch (error) {
    next(error)
  }
})

app.use((error, req, res, next) => {
  console.log(error.message);
  res.status(500).json(error.message);
});

app.listen(3000, console.log("server is launcing on port 3000."));
