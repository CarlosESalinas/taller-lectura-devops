# ==========================================
# STAGE 1: Build (si tuviéramos build process)
# ==========================================
FROM node:24-alpine AS builder

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependencias (solo para verificar)
RUN npm ci --only=production

# Copiar código fuente
COPY src/ ./src/

# ==========================================
# STAGE 2: Production con nginx
# ==========================================
FROM nginx:alpine

# Metadata
LABEL maintainer="Carlos E. Salinas <carlosesalinasdiaz@gmail.com>"
LABEL description="Taller de Lectura y Expresión Artística - Sitio web estático"
LABEL version="1.0.0"

# Copiar archivos estáticos desde builder
COPY --from=builder /app/src/ /usr/share/nginx/html/

# Copiar configuración personalizada de nginx
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto 80
EXPOSE 80

# Nginx corre en foreground por defecto
CMD ["nginx", "-g", "daemon off;"]