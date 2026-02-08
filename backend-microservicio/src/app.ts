import "reflect-metadata";
import express from "express";
import cors from "cors";
import { DataSource } from "typeorm";
import { Usuario } from "./entities/Usuario";
import { Producto } from "./entities/Producto";
import { Simulacion } from "./entities/Simulacion";
import usuarioRoutes from "./routes/usuarioRoutes";
import productoRoutes from "./routes/productoRoutes";
import simulacionRoutes from "./routes/simulacionRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Configuración de la base de datos
export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password123",
  database: process.env.DB_NAME || "examen_db",
  entities: [Usuario, Producto, Simulacion],
  synchronize: true,
  logging: true,
});

// Rutas
app.use("/usuarios", usuarioRoutes);
app.use("/productos", productoRoutes);
app.use("/simulaciones", simulacionRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ message: "Backend funcionando correctamente" });
});

// Inicializar base de datos y servidor
AppDataSource.initialize()
  .then(async () => {
    console.log("Base de datos conectada");
    
    // Insertar datos iniciales si no existen
    const usuarioRepo = AppDataSource.getRepository(Usuario);
    const productoRepo = AppDataSource.getRepository(Producto);
    
    const countUsuarios = await usuarioRepo.count();
    if (countUsuarios === 0) {
      await usuarioRepo.save([
        { nombre: "Juan Pérez", email: "juan@email.com", capital_disponible: 5000 },
        { nombre: "María García", email: "maria@email.com", capital_disponible: 8000 },
        { nombre: "Carlos López", email: "carlos@email.com", capital_disponible: 3000 }
      ]);
      console.log("Usuarios iniciales creados");
    }
    
    const countProductos = await productoRepo.count();
    if (countProductos === 0) {
      await productoRepo.save([
        { nombre: "Fondo Tech", costo: 1000, porcentaje_retorno: 8.5 },
        { nombre: "Fondo Inmobiliario", costo: 2000, porcentaje_retorno: 6.0 },
        { nombre: "Fondo Crypto", costo: 500, porcentaje_retorno: 15.0 }
      ]);
      console.log("Productos iniciales creados");
    }
    
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al conectar la base de datos:", error);
  });
