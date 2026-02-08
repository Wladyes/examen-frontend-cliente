import { Router } from "express";
import { AppDataSource } from "../app";
import { Usuario } from "../entities/Usuario";

const router = Router();

// GET /usuarios - Obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const usuarioRepo = AppDataSource.getRepository(Usuario);
    const usuarios = await usuarioRepo.find();
    res.json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
});

// GET /usuarios/:id - Obtener un usuario por ID
router.get("/:id", async (req, res) => {
  try {
    const usuarioRepo = AppDataSource.getRepository(Usuario);
    const usuario = await usuarioRepo.findOneBy({ id: req.params.id });
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    res.status(500).json({ message: "Error al obtener usuario" });
  }
});

// POST /usuarios - Crear un usuario
router.post("/", async (req, res) => {
  try {
    const usuarioRepo = AppDataSource.getRepository(Usuario);
    const nuevoUsuario = usuarioRepo.create(req.body);
    const resultado = await usuarioRepo.save(nuevoUsuario);
    res.status(201).json(resultado);
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ message: "Error al crear usuario" });
  }
});

export default router;
