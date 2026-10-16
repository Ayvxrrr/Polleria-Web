# Pollería El Toñito

Web de la pollería en El Pedregal, Manchay, con React, Vite, TypeScript y transiciones con Motion.

## Ejecutar

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Secciones

| Archivo | Sección |
| --- | --- |
| `index.html` | Inicio |
| `carta.html` | Carta con búsqueda, categorías y orden por precio |
| `promociones.html` | Combos y promociones |
| `parrillas.html` | Parrillas y piqueos |
| `ubicacion.html` | Dirección, Google Maps y consultas frecuentes |

Cada sección tiene una entrada HTML propia y se puede abrir directamente. Los enlaces internos usan History API: cambian la URL y el contenido sin recargar el documento. Atrás, adelante y enlaces con Ctrl/Cmd funcionan normalmente. Los HTML comparten los mismos componentes, estilos y lógica; no hay cinco copias independientes del diseño.

El carrito guarda únicamente identificadores y cantidades en `localStorage`. Los datos personales del formulario y la conversación no se guardan allí. Los pedidos se confirman con el local por WhatsApp; la web no procesa pagos ni registra pedidos en un sistema de ventas.

## Activar el asistente IA

**No pongas tu API key en el HTML, en React, en una variable `VITE_*`, en Git ni en un mensaje del chat.** La clave solo se utiliza en el servidor.

### En Netlify — recomendado para producción

1. Importa el proyecto en Netlify desde su repositorio. `netlify.toml` configura la compilación, la carpeta `dist` y las funciones.
2. En **Project configuration → Environment variables**, crea `GEMINI_API_KEY` con tu clave de [Google AI Studio](https://aistudio.google.com/apikey). Debe estar disponible para **Functions** en el contexto de producción.
3. Opcionalmente configura `GEMINI_MODEL`. Por defecto se usa `gemini-2.5-flash`.
4. Realiza un nuevo despliegue después de configurar las variables.

La función `netlify/functions/assistant.ts` atiende `/api/assistant`. La clave nunca se envía al navegador. Las funciones deben desplegarse junto con la web: subir únicamente `dist` mediante arrastrar y soltar no instala el servidor del asistente.

La función limita las consultas por IP y dominio a 12 por minuto en Netlify. Configura también cuotas y alertas de consumo en Google: el límite de la web no sustituye un control de gastos del proveedor.

### En tu computadora

Copia `.env.example` a `.env.local`:

```bat
copy .env.example .env.local
```

Edita `.env.local`:

```dotenv
GEMINI_API_KEY=tu_clave_real
GEMINI_MODEL=gemini-2.5-flash
```

Reinicia `npm run dev`. Vite incluye un endpoint de desarrollo que ejecuta la misma lógica del asistente en el servidor. `.env.local` está excluido de Git. `npm run preview` previsualiza solo los archivos estáticos y no ejecuta la API.

### Qué sabe y qué no hace

- Usa la carta de `src/data/menu.ts` y las reglas de `server/restaurant-knowledge.ts`.
- Responde sobre platos, precios, horarios, dirección, recomendaciones, delivery y cómo pedir.
- No confirma inventario, pedidos, reservas, pagos, alérgenos ni costos de reparto desconocidos; deriva esas consultas al local.
- Sin API key, funciona un **modo guía identificado como «sin IA»**, con respuestas predefinidas. No se presenta como una conexión real a Gemini.
- Con IA activada, las consultas y parte del historial reciente se envían a Google Gemini. La interfaz avisa al usuario y recomienda no compartir información personal.

## Editar la información

- Carta, precios y datos del local: `src/data/menu.ts`.
- Rutas y metadatos de navegación: `src/data/routes.ts` y los cinco HTML.
- Diseño y puntos de adaptación: `src/index.css`. Escala de letras, contraste y adaptación para lectura: `src/typography.css`.
- Fotos, logo e iconos: `public/`.

El único teléfono publicado es **928 067 861**. La dirección es **Av. Victor Malasquez Mz. B-14, lote 7-B, sector El Pedregal, Huertos de Manchay, Pachacámac, Lima**. El delivery se cotiza y confirma por WhatsApp. El precio por táper es S/ 1.50, pero las cartas no especifican cuántos envases lleva cada plato: los envases sin confirmar y el envío no se incluyen en el total estimado.

## Carta cotejada con las imágenes

Se transcribieron **83 opciones** de las cartas y afiches aportados: 12 combos y promociones, 4 pollos, 2 mostritos, 15 parrillas/saltados/especialidades, 3 porciones, 2 ensaladas, 20 platos de chifa, 19 bebidas y 6 licores/sangrías. Los vasos y jarras se registran por separado; cuando una línea permite varios sabores al mismo precio, se conserva esa elección y se solicita indicarla en las notas del pedido.

La comparación corrigió los nombres y acompañamientos, eliminó descuentos tachados y cantidades de personas no documentados, y añadió los platos que faltaban. Se retiraron fotografías de pollos o parrillas que aparecían como imágenes de café, gaseosas y licores. Los productos sin fotografía utilizan un icono de su categoría en lugar de una foto incorrecta.

Los afiches confirman la **Clásica Irresistible a S/ 72** y el **Familiar 3 a S/ 78**. El frozen de maracuyá con mango en jarra cuesta **S/ 19**, no S/ 17. La jarra de sangría cuesta **S/ 28** y la Sangría de la Casa que incluye botella de Borgoña cuesta **S/ 40**: son opciones diferentes.

Las condiciones de cortesía son contradictorias: la carta general señala lunes a sábado y la de chifa lunes a viernes. No se promete ninguna cortesía automáticamente; la web y el asistente indican confirmarla con el local. Las cartas también piden consultar precios: esta transcripción comprueba lo que aparece en las imágenes, no garantiza disponibilidad o vigencia actuales.

`src/data/menu.test.ts` contrasta los 83 precios y las secciones de chifa para evitar regresiones. Las pruebas y la configuración de Netlify se conservan porque sí se utilizan. `node_modules` es necesario para ejecutar el proyecto; no es una carpeta sobrante. `dist` y `test-results` son resultados regenerables, no código fuente.

## Reseñas en Google Maps

En el inicio, ubicación y pie de página hay enlaces para **dejar una reseña** en la ficha verificada de El Toñito. Google abre su propio formulario y puede pedir inicio de sesión. La web no publica opiniones, no solicita una cantidad de estrellas ni inventa valoraciones. El enlace se configura en `RESTAURANT_INFO.reviewUrl`.

## Imágenes locales

La carta usa únicamente archivos locales de `public/images/`. No hay generador de imágenes ni se necesita una API key para las fotos. Los platos pendientes de fotografía muestran un icono de su categoría.

Para añadir una imagen, guarda el archivo en esa carpeta y asigna su ruta en el plato correspondiente de `src/data/menu.ts`. Por ejemplo: `image: '/images/chaufa-pollo.webp'`. Se recomiendan archivos WebP o JPEG optimizados. Al desplegar, las imágenes viajan junto con la web.

Puedes proporcionar la imagen e indicar el plato al que corresponde para incorporarla al proyecto. El asistente de texto mantiene su configuración independiente.

## Verificar

```bash
npm run lint
npm test
npm run build
npm run test:e2e
```

Las pruebas de navegador usan Chrome instalado en el equipo. Para servidores sin Chrome, instala Chromium con `npx playwright install chromium` y cambia `channel: 'chrome'` en `playwright.config.ts`. Cubren los cinco HTML, seis tamaños de pantalla, navegación sin recarga, historial, filtros, carrito y asistente en modo guía. La llamada real a Gemini requiere una clave y cuota válidas; las pruebas automáticas no generan consumo.
