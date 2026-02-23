# CONTEXTO DE DISEÑO - GLACI Smart Cities

## 🎯 IDENTIDAD DEL PROYECTO

**Nombre:** GLACI (Grupo Global de Ciudades Inteligentes)  
**Propósito:** Consorcio estratégico especializado en la estructuración y ejecución de proyectos de Ciudades y Territorios Inteligentes  
**Enfoque:** Transformar complejidad urbana en proyectos estructurados, financiables y ejecutables

---

## 🎨 SISTEMA DE DISEÑO

### Paleta de Colores
```css
--color-title: #00ffff          /* Azul cian brillante - Acentos y títulos */
--color-text: #ffffff           /* Blanco - Texto principal */
--color-text2: #d5d5d5          /* Gris claro - Texto secundario */
--color-blue: #000c2e           /* Azul oscuro profundo */
--color-bg-1: #000c2e           /* Fondo principal - Azul marino oscuro */
--color-bg-2: #011377           /* Fondo secundario - Azul más intenso */
--color-bg-light-gradient: #000459  /* Gradiente claro */
--color-bg-dropdown: rgba(0, 3, 68, 0.6)  /* Fondo dropdown con transparencia */
--color-world: #009bdd          /* Azul mundo */
```

### Tipografía
- **Títulos (h1, h2):** Google Sans - Transmite modernidad y profesionalismo
- **Texto (h3-h6, p, span, li, a, button, input, textarea):** Inter - Legibilidad y claridad

### Tamaños de Texto
- **Títulos principales:** 32px móvil / 45px desktop
- **Subtítulos:** 24px - 32px
- **Texto normal:** 16px - 20px
- **Texto pequeño:** 12px - 14px

---

## 🏗️ ARQUITECTURA VISUAL

### Estructura de Layout
- **Contenedor máximo:** max-w-6xl (1152px)
- **Espaciado vertical:** py-12 (48px)
- **Espaciado horizontal:** px-6 (24px)
- **Gap entre secciones:** gap-6 a gap-20 según contexto

### Efectos Visuales

#### Glass Effect (Glassmorphism)
```css
background-color: rgba(255, 255, 255, 0.06);
border-top: 1px solid rgba(255, 255, 255, 0.25);
border-bottom: 1px solid rgba(255, 255, 255, 0.25);
backdrop-filter: blur(5px);
```

#### Bordes y Decoraciones
- Bordes redondeados: `rounded-md`, `rounded-lg`, `rounded-full`
- Bordes especiales: `rounded-br-4xl rounded-tl-4xl` (esquinas opuestas)
- Líneas de acento: Barras horizontales de 2/3 del ancho en color cian

---

## 📐 COMPONENTES PRINCIPALES

### 1. Hero Section
- **Fondo:** Video con overlay oscuro (opacity-75)
- **Logo:** Centrado, tamaño adaptativo (w-80 lg:w-125)
- **Texto principal:** 2xl centrado con animación fade-down
- **Gradiente inferior:** Transición suave de transparente a fondo sólido

### 2. Navbar
- **Posición:** Fixed top con backdrop blur
- **Estructura:** Logo izquierda, navegación derecha
- **Dropdown:** Menú desplegable con glassmorphism
- **Mobile:** Menú hamburguesa con overlay full-screen

### 3. Cards de Contenido
- **Estilo:** Glass effect con bordes sutiles
- **Hover:** Elevación con `-translate-y-2`
- **Decoración:** Línea inferior cian centrada (w-2/3)
- **Padding:** p-5 a p-6

### 4. Diagrama Hexagonal (Áreas de Impacto)
- **Desktop:** SVG interactivo con 6 nodos en hexágono
- **Nodos:** Círculos con animación de parpadeo
- **Hover:** Expansión del nodo + tooltip con información
- **Mobile:** Grid de botones con glassmorphism

### 5. Tarjetas 3D (Work Section)
- **Efecto:** Perspectiva 3D con rotación inicial
- **Hover:** Normalización a 0deg con sombra aumentada
- **Decoración:** Cuadrados cian en esquinas opuestas
- **Bordes:** 2px border cian con esquinas redondeadas especiales

---

## 🎭 ANIMACIONES Y TRANSICIONES

### AOS (Animate On Scroll)
- **fade-up:** Aparición desde abajo
- **fade-down:** Aparición desde arriba
- **fade-in:** Aparición con opacidad
- **fade-left/right:** Aparición lateral
- **zoom-in:** Zoom desde centro
- **Duración estándar:** 1000ms
- **Delays:** 200ms, 800ms, 1600ms para secuencias

### Transiciones CSS
- **Hover states:** duration-300 a duration-500
- **Transform:** translate, scale, rotate
- **Opacity:** Transiciones suaves para tooltips y overlays

### Animaciones Personalizadas
```css
/* Parpadeo de nodos */
@keyframes blink {
  50% { opacity: 0.3; }
}

/* Brillo de edificios */
@keyframes blinkGlow {
  0% { opacity: 1; }
  50% { opacity: 0.4; filter: brightness(1.35); }
  100% { opacity: 1; }
}
```

---

## 🌟 ELEMENTOS DISTINTIVOS

### 1. Prefijo "+" en Títulos
- Color cian antes de cada título principal
- Marca visual consistente en toda la página

### 2. Líneas Decorativas
- Barras horizontales cian de 2/3 del ancho
- Posicionadas en la parte inferior de cards
- Efecto de subrayado elegante

### 3. Iconografía
- **Ubicación:** `/icons/` con subcarpetas por categoría
- **Formato:** SVG para escalabilidad
- **Uso:** Áreas de impacto, servicios, redes sociales

### 4. Fondo Estrellado
- Componente Stars.astro
- Posición fija con z-index negativo
- Efecto de profundidad espacial

---

## 📱 RESPONSIVE DESIGN

### Breakpoints
- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px
- **Large Desktop:** > 1280px (2xl)

### Adaptaciones Clave
- **Navbar:** Hamburger menu en mobile
- **Hero:** Logo y texto centrados en mobile
- **Diagrama:** SVG en desktop, grid en mobile
- **Cards:** Stack vertical en mobile, horizontal en desktop
- **Texto:** Tamaños reducidos en mobile (32px → 45px)

---

## 🎯 ÁREAS DE IMPACTO (6 Pilares)

1. **Gobernanza Inteligente** - Gobierno Digital y Transparencia
2. **Economía Inteligente** - Financiación y Modelos de Negocio
3. **Movilidad e Infraestructuras Inteligentes** - Conectividad y Transporte
4. **Medio Ambiente Inteligente** - Sostenibilidad y ESG
5. **Hábitat y Servicios Inteligentes** - Seguridad y Calidad de Vida
6. **Sociedad Inteligente** - Inclusión Digital

---

## 🔧 TECNOLOGÍAS Y HERRAMIENTAS

### Stack Técnico
- **Framework:** Astro 5.16.6
- **Estilos:** Tailwind CSS 4.1.18
- **Animaciones:** AOS (Animate On Scroll) 2.3.4
- **Lenguaje:** TypeScript 5.9.3
- **i18n:** Sistema multiidioma (ES, EN, FR, ZH, DE)

### Estructura de Archivos
```
src/
├── components/     # Componentes reutilizables
├── layouts/        # Layout principal
├── pages/          # Páginas por idioma
├── i18n/           # Traducciones
├── styles/         # Estilos globales
└── public/         # Assets estáticos
```

---

## 🎨 PRINCIPIOS DE DISEÑO

### 1. Minimalismo Tecnológico
- Espacios en blanco generosos
- Elementos esenciales sin saturación
- Jerarquía visual clara

### 2. Glassmorphism
- Transparencias sutiles
- Blur effects para profundidad
- Bordes luminosos

### 3. Profundidad Espacial
- Fondo estrellado
- Gradientes oscuros
- Sombras y elevaciones

### 4. Interactividad Sutil
- Hover states suaves
- Transiciones fluidas
- Feedback visual inmediato

### 5. Consistencia Visual
- Prefijo "+" en títulos
- Color cian como acento único
- Líneas decorativas uniformes

---

## 📊 CONTENIDO Y MENSAJERÍA

### Tono de Comunicación
- **Profesional:** Lenguaje técnico pero accesible
- **Visionario:** Enfoque en transformación urbana
- **Concreto:** Soluciones tangibles y medibles
- **Colaborativo:** Énfasis en consorcio y alianzas

### Estructura de Contenido
1. **Hero:** Propuesta de valor principal
2. **Challenge:** Problema que se resuelve
3. **GLACI:** Quiénes somos y metodología
4. **Áreas de Impacto:** 6 pilares con detalle
5. **Metodología:** Proceso de trabajo
6. **Work:** Colaboradores y credenciales

---

## 🌐 INTERNACIONALIZACIÓN

### Idiomas Soportados
- **Español (ES):** Idioma base activo
- **Inglés (EN):** Preparado
- **Francés (FR):** Preparado
- **Chino (ZH):** Preparado
- **Alemán (DE):** Preparado

### Sistema i18n
- Archivos JSON por idioma
- Rutas dinámicas: `[lang]/`
- Selector de idioma en navbar
- Traducciones completas de UI y contenido

---

## 🎬 EXPERIENCIA DE USUARIO

### Flujo de Navegación
1. **Landing:** Video hero con mensaje principal
2. **Exploración:** Scroll suave con animaciones
3. **Profundización:** Áreas de impacto interactivas
4. **Conversión:** CTAs estratégicos (información, conversación)
5. **Contacto:** Formulario de registro

### Interacciones Clave
- **Hover en diagrama:** Tooltip con detalles
- **Click en áreas:** Navegación a páginas específicas
- **Scroll:** Animaciones progresivas
- **Mobile menu:** Overlay full-screen

---

## 🚀 OPTIMIZACIONES

### Performance
- Lazy loading de imágenes
- Video con poster fallback
- Componentes Astro (SSG)
- CSS optimizado con Tailwind

### Accesibilidad
- Contraste alto (texto blanco sobre azul oscuro)
- Tamaños de texto legibles
- Navegación por teclado
- Alt text en imágenes

### SEO
- Meta descriptions
- Títulos descriptivos
- Estructura semántica HTML
- URLs amigables

---

## 📝 NOTAS DE IMPLEMENTACIÓN

### Convenciones de Código
- Componentes en PascalCase
- Clases Tailwind inline
- Animaciones AOS con data attributes
- i18n con destructuring

### Mejores Prácticas
- Componentes reutilizables
- Separación de concerns
- Responsive-first approach
- Animaciones con propósito

---

## 🎯 PROMPT DE DISEÑO PARA IA

**Contexto:** Sitio web para GLACI, consorcio de ciudades inteligentes con enfoque profesional y tecnológico.

**Estilo Visual:**
- Paleta oscura espacial (azul marino #000c2e) con acentos cian brillante (#00ffff)
- Glassmorphism con transparencias y blur effects
- Tipografía: Google Sans (títulos) + Inter (cuerpo)
- Animaciones suaves con AOS
- Elementos 3D sutiles (perspectiva en cards)

**Componentes Clave:**
- Hero con video de fondo y overlay
- Navbar fixed con glassmorphism
- Diagrama hexagonal interactivo (6 nodos)
- Cards con glass effect y líneas decorativas cian
- Tarjetas 3D con rotación en hover
- Fondo estrellado fijo

**Principios:**
- Minimalismo tecnológico
- Profundidad espacial
- Interactividad sutil
- Consistencia visual (prefijo "+", líneas cian)
- Responsive con mobile-first

**Tono:** Profesional, visionario, concreto, colaborativo

**Objetivo:** Transmitir innovación, confianza y capacidad técnica en desarrollo urbano inteligente.
