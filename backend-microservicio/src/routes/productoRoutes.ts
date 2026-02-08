import { Router } from "express";
import { AppDataSource } from "../app";
import { Producto } from "../entities/Producto";

const router = Router();

// GET /productos - Obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const productoRepo = AppDataSource.getRepository(Producto);
    const productos = await productoRepo.find();
    res.json(productos);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ message: "Error al obtener productos" });
  }
});

// GET /productos/:id - Obtener un producto por ID
router.get("/:id", async (req, res) => {
  try {
    const productoRepo = AppDataSource.getRepository(Producto);
    const producto = await productoRepo.findOneBy({ id: req.params.id });
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(producto);
  } catch (error) {
    console.error("Error al obtener producto:", error);
    res.status(500).json({ message: "Error al obtener producto" });
  }
});

// POST /productos - Crear un producto
router.post("/", async (req, res) => {
  try {
    const productoRepo = AppDataSource.getRepository(Producto);
    const nuevoProducto = productoRepo.create(req.body);
    const resultado = await productoRepo.save(nuevoProducto);
    res.status(201).json(resultado);
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ message: "Error al crear producto" });
  }
});

export default router;
