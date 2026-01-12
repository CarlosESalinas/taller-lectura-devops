# Docker Setup

Guía completa para trabajar con Docker en el proyecto.

## Prerequisitos

- Docker 20.10+
- Docker Compose 2.0+

Verificar instalación:
```bash
docker --version
docker-compose --version
```

## uild de la imagen
```bash
# Build manual
docker build -t taller-lectura:latest .

# Build con docker-compose
docker-compose build
```

## Ejecutar container

### Opción A: Docker run
```bash
docker run -d \
  -p 8080:80 \
  --name taller-lectura \
  taller-lectura:latest
```

### Opción B: Docker Compose (recomendado)
```bash
docker-compose up -d
```

## Comandos útiles

### Ver containers corriendo
```bash
docker ps
```

### Ver logs
```bash
docker logs taller-lectura
docker-compose logs -f
```

### Entrar al container
```bash
docker exec -it taller-lectura sh
```

### Detener container
```bash
docker stop taller-lectura
docker-compose down
```

### Limpiar todo
```bash
docker-compose down -v
docker rmi taller-lectura:latest
```

## Troubleshooting

### Puerto 8080 ocupado
```bash
# Cambiar puerto en docker-compose.yml
ports:
  - "8081:80"  # En lugar de 8080
```

### Cambios no se reflejan
```bash
# Rebuild forzado
docker-compose up -d --build
```

### Ver tamaño de imagen
```bash
docker images taller-lectura
```

## Arquitectura
```
Dockerfile (multi-stage)
├─ Stage 1: Builder (node:24-alpine)
│  └─ Verificar dependencias
└─ Stage 2: Production (nginx:alpine)
   ├─ Copiar archivos estáticos
   ├─ Configuración nginx optimizada
   └─ Imagen final ~45MB
```

## Acceso

- Local: http://localhost:8080
- Healthcheck: http://localhost:8080/

## Security

- Corre como usuario no-root
- Security headers configurados
- Archivos sensibles excluidos (.dockerignore)
- Solo archivos necesarios en imagen final
