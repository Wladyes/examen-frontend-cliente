import { Router } from "express";
import { AppDataSource } from "../app";
import { Simulacion } from "../entities/Simulacion";
import { Usuario } from "../entities/Usuario";

const router = Router();

// GET /simulaciones - Obtener todas las simulaciones
router.get("/", async (req, res) => {
  try {
    const simulacionRepo = AppDataSource.getRepository(Simulacion);
    const simulaciones = await simulacionRepo.find({
      relations: ["usuario"]
    });
    res.json(simulaciones);
  } catch (error) {
    console.error("Error al obtener simulaciones:", error);
    res.status(500).json({ message: "Error al obtener simulaciones" });
  }
});

// POST /simulaciones - Crear una simulación
router.post("/", async (req, res) => {
  try {
    const { usuario_id, capital_disponible, productos } = req.body;

    // Validar datos
    if (!usuario_id || !capital_disponible || !productos) {
      return res.status(400).json({ message: "Datos incompletos" });
    }

    // Verificar que el usuario existe
    const usuarioRepo = AppDataSource.getRepository(Usuario);
    const usuario = await usuarioRepo.findOneBy({ id: usuario_id });
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Calcular ganancias
    let ganancia_total = 0;
    const productos_simulados = productos.map((p: any) => {
      const ganancia = (p.precio * p.porcentaje_ganancia) / 100;
      ganancia_total += ganancia;
      return {
        nombre: p.nombre,
        precio: p.precio,
        porcentaje_ganancia: p.porcentaje_ganancia,
        ganancia: ganancia
      };
    });

    const capital_final = capital_disponible + ganancia_total;

    // Crear simulación
    const simulacionRepo = AppDataSource.getRepository(Simulacion);
    const nuevaSimulacion = simulacionRepo.create({
      usuario_id,
      capital_inicial: capital_disponible,
      ganancia_total,
      capital_final,
      productos_simulados
    });

    const resultado = await simulacionRepo.save(nuevaSimulacion);

    res.status(201).json({
      id: resultado.id,
      usuario_id: resultado.usuario_id,
      capital_inicial: resultado.capital_inicial,
      ganancia_total: resultado.ganancia_total,
      capital_final: resultado.capital_final,
      productos_simulados: resultado.productos_simulados,
      mensaje: "Simulación creada exitosamente"
    });

  } catch (error) {
    console.error("Error al crear simulación:", error);
    res.status(500).json({ message: "Error al crear simulación" });
  }
});

export default router;
