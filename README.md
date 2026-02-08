# Examen Final - Microservicios

## Descripción
Este repositorio contiene el cliente frontend para el examen de microservicios.
El estudiante debe crear el backend que responda a las peticiones del frontend.

---

## Instrucciones para el estudiante

### 1. Clonar este repositorio
```bash
git clone https://github.com/Wladyes/examen-frontend-cliente.git
cd examen-frontend-cliente

2. Crear tu microservicio
Debes crear una carpeta llamada backend-microservicio/ con tu código.
3. Endpoints requeridos
Tu microservicio DEBE implementar estos endpoints:
MétodoRutaDescripción
GET/usuariosRetornar lista de usuarios
GET/productosRetornar lista de productos
POST/simulacionesCrear una simulación

Export as CSV
4. Estructura esperada del backend
text


backend-microservicio/
├── src/
├── Dockerfile
├── package.json
└── ...
5. Ejecutar con Docker
bash


docker-compose up --build
6. Verificar funcionamiento
Frontend: http://localhost:3001
Backend: http://localhost:3000
Credenciales de la Base de Datos
Estas credenciales ya están configuradas en docker-compose.yml:
VariableValor
DB_HOSTdatabase
DB_PORT3306
DB_USERroot
DB_PASSWORDpassword123
DB_NAMEexamen_db

Export as CSV
Criterios de evaluación
El frontend debe cargar usuarios correctamente
El frontend debe cargar productos correctamente
El frontend debe crear simulaciones correctamente
El backend debe conectarse a la base de datos MySQL
