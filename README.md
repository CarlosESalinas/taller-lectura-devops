# Taller de Lectura y Expresión Artística

![CI Pipeline](https://github.com/CarlosESalinas/taller-lectura-devops/workflows/CI%20Pipeline/badge.svg)
![Tests](https://img.shields.io/badge/tests-passing-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-80%25-green)
![Node](https://img.shields.io/badge/node-24.x-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

Proyecto DevOps completo: Sitio web del Taller de Lectura con TDD, CI/CD, Docker y deployment en GCP.

## Features

- ✅ **TDD (Test-Driven Development)** - 19 tests unitarios
- ✅ **SOLID Principles** - Arquitectura limpia
- ✅ **CI/CD** - GitHub Actions + Jenkins
- ✅ **Responsive Design** - Mobile, tablet, desktop
- ✅ **Componentes JavaScript** - Carousel, DownloadCounter, GoogleDriveDownloader
- ✅ **Persistent Storage** - localStorage para contador
- ✅ **Google Drive Integration** - Descarga directa de archivos

## 📦 Tech Stack

### Frontend
- HTML5 semántico
- CSS3 con variables y animaciones
- Vanilla JavaScript (ES6+)
- Google Fonts (Fredoka, Poppins)

### Testing
- Jest - Framework de testing
- @testing-library/dom - Testing utilities
- ESLint - Linting
- Prettier - Code formatting

### DevOps
- GitHub Actions - CI Pipeline
- Jenkins - CD Pipeline
- Docker - Containerización
- GCP - Cloud deployment

## Estructura del Proyecto
```
taller-lectura-devops/
├── .github/
│   └── workflows/
│       └── ci.yml          # GitHub Actions CI Pipeline
├── src/
│   ├── index.html          # Página principal
│   ├── css/
│   │   └── styles.css      # Estilos con paleta púrpura/cyan
│   ├── js/
│   │   ├── app.js          # Punto de entrada
│   │   ├── carousel.js     # Carrusel horizontal
│   │   ├── downloadCounter.js  # Contador persistente
│   │   └── googleDriveDownloader.js  # Integración Drive
│   └── images/             # Dibujos de los niños
├── tests/
│   └── unit/               # Tests unitarios (19 tests)
├── docker/                 # Configuración Docker
├── Jenkinsfile            # Pipeline de Jenkins
├── package.json
└── jest.config.js
```

## Testing
```bash
# Ejecutar todos los tests
npm test

# Tests en modo watch (TDD)
npm run test:watch

# Coverage report
npm run test:coverage

# Linting
npm run lint

# Format code
npm run format
```

**Tests actuales: 19/19 passing ✅**
- DownloadCounter: 6 tests
- Carousel: 8 tests
- GoogleDriveDownloader: 5 tests

## Desarrollo Local
```bash
# Instalar dependencias
npm install

# Servir aplicación localmente
npm run serve

# Abrir navegador en http://localhost:3000
```

## Docker
```bash
# Build image
docker build -t taller-lectura .

# Run container
docker run -p 8080:80 taller-lectura

# Abrir navegador en http://localhost:8080
```

## CI/CD Pipeline

### GitHub Actions (CI)
Ejecuta automáticamente en cada Pull Request:
1. ✅ Linting (ESLint)
2. ✅ Tests unitarios (Jest)
3. ✅ Build verification
4. ✅ Security audit (npm audit)

### Jenkins (CD)
Pipeline de deployment:
1. Build Docker image
2. Push to GCP Container Registry
3. Deploy to Staging
4. Smoke tests
5. Deploy to Production

## Deployment

**Staging:** https://staging-taller-lectura.example.com  
**Production:** https://taller-lectura.example.com

## Autor

**Carlos E. Salinas**
- Email: carlosesalinasdiaz@gmail.com
- GitHub: [@CarlosESalinas](https://github.com/CarlosESalinas)
- LinkedIn: [Carlos Salinas](https://linkedin.com/in/carlosesalinasdíaz/)

## Licencia

MIT License - ver [LICENSE](LICENSE) para más detalles

## Agradecimientos

- Programa de Derechos Humanos - UNAM
- Taller de Lectura y Expresión Artística
- Niñas y niños participantes del taller
