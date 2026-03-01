# TASK: Build Natura Playground React App

Build a complete interactive playground app for Florencia (Marketing Coordinator at Natura Cosméticos) to learn Claude AI.

## Project setup already done:
- Vite + React project at ~/Projects/natura-playground/
- recharts and lucide-react already installed
- Do NOT install any other packages

## Files to create/modify:
1. `index.html` — add Tailwind CDN Play script in <head>
2. `src/App.jsx` — full single-component app (export default)
3. `src/index.css` — minimal reset only

## index.html changes:
Add to <head>:
```html
<script src="https://cdn.tailwindcss.com"></script>
<title>Playground IA — Natura Cosméticos</title>
```

## Brand Colors:
- Primary (orange): #E85D2C
- Secondary (green): #2D5F3B
- Background (cream): #FFF8F3
- Text: #2C2C2C
- Accent (gold): #C4942A

## App Structure:
- Sticky header with title + overall progress bar
- Left sidebar with 6 module nav items (collapses to hamburger on mobile <768px)
- Main content area showing selected module
- Smooth transitions between modules

## State (all in React state, NO localStorage/sessionStorage):
- activeModule: number (1-6)
- sidebarOpen: boolean (default true on desktop, false on mobile)
- visited: Set of visited module numbers (for progress indicator)
- copiedPrompt: string or null (for copy feedback)

## ⚠️ CRITICAL RULES:
- NO <form> elements anywhere — use divs and onClick handlers
- NO localStorage/sessionStorage
- NO external fetches
- All data hardcoded in the component
- Tailwind utility classes only (they work via CDN script)
- Export default the main component

## Shared Components (define as const inside App.jsx):

### PromptCard({ text, index })
- White card with left orange border (#E85D2C), rounded
- Prompt text in monospace font, gray background
- "Copiar" button (top right), shows "✓ Copiado" for 2 seconds
- Uses navigator.clipboard.writeText(text)

### InsightBox({ children })
- Rounded card with light green background (#E8F5E9 or similar)
- Lightbulb icon (lucide-react: Lightbulb) in forest green
- "¿Qué hace Claude aquí?" as title
- Children as body text

### SectionTabs({ tabs, active, onSelect })
- Orange underline tab switcher
- tabs: array of { id, label }

---

## MODULE 1: "Analizar Campañas"

### Campaign Data (hardcoded):
```
Campaña | Plataforma | Inversión_ARS | Impresiones | Clicks | Conversiones | CPA_ARS
Día de la Madre 2025 | Instagram | 850000 | 2400000 | 48000 | 1920 | 443
Día de la Madre 2025 | Meta Ads | 620000 | 1800000 | 32400 | 1134 | 547
Línea Ekos Lanzamiento | TikTok | 420000 | 3200000 | 96000 | 2880 | 146
Línea Ekos Lanzamiento | Instagram | 380000 | 1600000 | 40000 | 1400 | 271
Natura UNA Relanzamiento | Google Ads | 540000 | 980000 | 29400 | 882 | 612
Natura UNA Relanzamiento | YouTube | 310000 | 1500000 | 22500 | 450 | 689
Consultoras Digitales Q1 | Meta Ads | 290000 | 2100000 | 63000 | 3150 | 92
Consultoras Digitales Q1 | Instagram | 260000 | 1400000 | 42000 | 2520 | 103
TodoNatura App Push | Google Ads | 180000 | 450000 | 13500 | 675 | 267
TodoNatura App Push | Instagram | 150000 | 800000 | 24000 | 1200 | 125
```

### Views (tabs): Tabla | Gráfico | Prompts

**Tabla view:**
- Responsive table with sticky header (orange bg, white text)
- Alternating row colors (white / #FFF8F3)
- Format numbers with thousands separators
- CPA column: highlight lowest in green, highest in red

**Gráfico view:**
- Recharts BarChart
- X axis: short label (campana + plataforma, abbreviated)
- Y axis: CPA_ARS
- Bar fill: #E85D2C, bar stroke: #C4942A
- Tooltip showing full campaign name + CPA
- ResponsiveContainer width="100%" height={350}

**Prompts view:**
3 PromptCards with these texts:
1. "Analizá esta tabla de campañas. ¿Cuál tiene el mejor CPA? ¿Dónde debería reasignar presupuesto?"
2. "Haceme un resumen ejecutivo de 3 párrafos para presentarle a mi directora de marketing"
3. "Compará el rendimiento por plataforma. ¿En cuál conviene duplicar inversión el próximo trimestre?"

Then InsightBox: "Claude puede analizar tablas CSV, identificar outliers, comparar métricas entre plataformas y redactar resúmenes ejecutivos listos para presentar. Lo que antes te llevaba 2 horas, ahora lo hacés en minutos."

---

## MODULE 2: "Crear Contenido"

Single view (no tabs needed).

**Brief Template** — white card, editable-looking (readonly textarea or styled pre):
```
Marca: Natura Cosméticos Argentina
Objetivo: Engagement + awareness de línea sustentable
Mes: Abril 2026
Plataforma: Instagram (Feed + Stories + Reels)
Tono: Cálido, empoderado, eco-consciente
Línea destacada: Natura Ekos (ingredientes amazónicos, packaging reciclable)

Fechas clave:
- 7/4: Día Mundial de la Salud
- 22/4: Día de la Tierra
- 28/4: Día de la Seguridad en el Trabajo

Frecuencia: 5 posts/semana (3 feed, 1 reel, 1 story interactiva)
KPIs target: ER >3.5%, alcance >150K/post, saves >2%
```

**3 PromptCards:**
1. "Con este brief, generame un calendario completo de abril con copy para cada post, formato (feed/reel/story), hashtags y horario sugerido de publicación"
2. "Escribime 5 copies para Reels de Natura Ekos que hablen de sustentabilidad sin sonar corporativo"
3. "Adaptame este calendario para TikTok manteniendo el mismo mensaje pero ajustando el tono"

**InsightBox:** "Claude genera calendarios editoriales completos, adapta el tono por plataforma, sugiere hashtags con research de tendencias, y mantiene coherencia de marca en todos los formatos."

---

## MODULE 3: "Reportes Automáticos"

### Weekly metrics data (4 weeks, for LineChart):
```javascript
const weeklyData = [
  { week: 'Feb 24 - Mar 2', instagram: 795000, meta: 1490000, google: 480000 },
  { week: 'Mar 3-9', instagram: 820000, meta: 1380000, google: 502000 },
  { week: 'Mar 10-16', instagram: 890000, meta: 1450000, google: 520000 },
  { week: 'Mar 17-23', instagram: 945000, meta: 1410000, google: 555000 },
]
```

### Views (tabs): Métricas | Gráfico | Prompts

**Métricas view:** Display the weekly data in clean stat cards:
- Budget: $1.200.000 total / $1.087.500 ejecutado (90.6%)
- Instagram stats (impresiones, alcance, ER 4.2%, clicks, CPC)
- Meta Ads stats (impresiones, CTR, conversiones, CPA, ROAS 4.2x)
- Google Ads stats (impresiones, CTR, conversiones, CPA ARS 185, ROAS 5.1x)
- Top 3 piezas section
- Color the ER green (>benchmark) and negative deltas in red

**Gráfico view:**
- Recharts LineChart with 4 weeks of data
- 3 lines: Instagram (orange #E85D2C), Meta (blue #1877F2), Google (#34A853)
- Legend, tooltip, grid
- ResponsiveContainer width="100%" height={300}

**Prompts view:**
3 PromptCards:
1. "Con estos datos, armame un reporte semanal en formato ejecutivo para mi directora. Incluí highlights, alertas, y recomendaciones para la semana siguiente"
2. "Identificá las 3 métricas más preocupantes y proponé acciones correctivas"
3. "Convertí este reporte en un mail profesional de 5 líneas para el equipo de medios"

**InsightBox:** "Claude transforma datos crudos en reportes ejecutivos profesionales en segundos. Puede detectar anomalías, comparar con benchmarks y redactar recomendaciones accionables."

---

## MODULE 4: "Briefs Creativos"

Single view.

**Brief data card:**
```
Producto: Natura Tododia - nueva línea de body splash
Objetivo: Lanzamiento Q2 2026, target 15.000 unidades primer mes
Target: Mujeres 25-40, urbanas, NSE BC1, valoran autocuidado diario
Insight: "Los pequeños rituales de cuidado personal son mi momento de reconexión conmigo misma"
Presupuesto de medios: ARS 3.500.000
Mix de medios: 40% Instagram, 25% TikTok, 20% Meta Ads, 15% Influencers
Benchmarks:
  - CTR promedio beauty IG: 1.2%
  - CPA promedio beauty: ARS 380
  - ER promedio beauty IG: 2.8%
Entregables: KV principal, 3 adaptaciones IG, 2 scripts Reel, 1 guión TikTok
Deadline: 15 abril 2026
```

Show as styled info cards (not a table). Use icons from lucide-react.

**3 PromptCards:**
1. "Con esta información, armame un brief creativo completo y profesional para enviarle a la agencia"
2. "Generame 5 conceptos creativos para esta campaña con nombre, tagline y descripción de la idea visual"
3. "Estimame un media plan detallado distribuyendo el presupuesto por plataforma, formato y semana"

**InsightBox:** "Claude puede generar briefs completos, conceptos creativos con nombre y tagline, y media plans detallados. Le das el contexto, él hace el trabajo pesado."

---

## MODULE 5: "Automatización con Cowork"

Static visual guide — NO prompts (as specified in PRD).

Show 6 cards in a 2-column grid (1-column on mobile):

| Icon | Title | Description | Time badge |
|------|-------|-------------|------------|
| FolderOpen | Organizar archivos de campaña | "Tengo una carpeta con 200 archivos de la campaña Día de la Madre mezclados. Cowork los clasifica por tipo (creativos, reportes, briefs, contratos) y los renombra con nomenclatura estándar." | Ahorra ~2hs/semana |
| FileSpreadsheet | Generar reportes desde Excel | "Le doy a Cowork acceso a mi carpeta de reportes y un Excel con datos de medios. Me genera un Word formateado con gráficos, listo para enviar." | Ahorra ~3hs/semana |
| Calendar | Monitoreo semanal programado | "Programo una tarea con /schedule para que todos los lunes a las 8am Cowork lea mis archivos de métricas actualizados y me genere un resumen de la semana." | Ahorra ~1hs/semana |
| Receipt | Procesar facturas de proveedores | "Cowork lee PDFs de facturas de medios, extrae montos y fechas, y arma una planilla consolidada para Finanzas." | Ahorra ~2hs/semana |
| Presentation | Preparar presentaciones | "Le paso mis datos en un Excel y un brief. Cowork me genera un .pptx con la estructura, datos y diseño base listo para refinar." | Ahorra ~3hs/semana |
| Search | Auditoría de contenido | "Cowork revisa todos los copies de una carpeta y me genera un reporte con inconsistencias de tono, errores, y sugerencias de mejora." | Ahorra ~1hs/semana |

Each card:
- White background, subtle shadow
- Hover: slight scale up (transition-transform)
- Icon in orange circle
- Gold badge at bottom "⏱ Ahorra ~Xhs/semana"

At the bottom: InsightBox explaining Claude Cowork for task automation.

---

## MODULE 6: "Business Case para Natura"

**Editable textarea** (NOT inside <form>) with the business case template. Use a <textarea> element directly.

Style the textarea: full width, min-height 500px, font-mono text-sm, border rounded, padding.

Pre-fill with:
```
PROPUESTA: Implementación de Claude AI en el equipo de Comunicación y Marketing

PARA: [Nombre Directora de Marketing]
DE: Florencia [Apellido], Coordinadora de Medios
FECHA: Marzo 2026

1. RESUMEN EJECUTIVO
Claude es el asistente de IA de Anthropic, diseñado con los más altos estándares de seguridad y privacidad empresarial. Propongo implementar licencias Team para nuestro equipo de marketing (5-10 personas) para automatizar tareas repetitivas y potenciar nuestra productividad.

2. PROBLEMA ACTUAL
- Armado de reportes semanales: ~4 horas/semana
- Creación de briefs creativos: ~3 horas cada uno
- Análisis de campañas: ~5 horas/semana
- Generación de contenido: ~6 horas/semana
- Organización de archivos: ~2 horas/semana
Total estimado en tareas automatizables: ~20 horas/semana

3. SOLUCIÓN PROPUESTA
Plan Team de Claude ($25 USD/usuario/mes = ~$25.000 ARS/usuario/mes)
- 5 licencias iniciales: ~$125.000 ARS/mes
- Incluye: Claude Chat, Claude Code, Cowork, Projects compartidos
- Seguridad: SOC 2 Type II, datos no usados para entrenar el modelo
- Admin panel con control de uso por usuario

4. ROI ESTIMADO
- Horas ahorradas: ~20 hs/semana × 4 semanas = 80 hs/mes
- Costo hora equipo (estimado): ARS 8.000/hora
- Valor del tiempo recuperado: ARS 640.000/mes
- Inversión mensual: ARS 125.000/mes
- ROI: 5.1x

5. PLAN DE IMPLEMENTACIÓN
Mes 1: Piloto con 3 usuarios (Florencia + 2 del equipo)
Mes 2: Evaluación de resultados y ajuste de workflows
Mes 3: Expansión a equipo completo (5-10 usuarios)

6. MÉTRICAS DE ÉXITO
- Reducción de tiempo en reportes: objetivo -60%
- Velocidad de creación de briefs: objetivo -50%
- Satisfacción del equipo con herramientas: encuesta mensual
- Calidad de outputs: evaluación cualitativa por directora

7. SEGURIDAD Y COMPLIANCE
- Claude Team no usa conversaciones para entrenar modelos
- Datos procesados bajo estándares SOC 2 Type II
- Admin puede controlar accesos, uso y presupuesto
- Compatible con políticas de datos corporativas
```

**1 PromptCard below:**
"Tomá este template y personalizalo con datos reales de mi equipo. Hacelo más persuasivo y agregale una sección de riesgos y mitigación."

**InsightBox:** "Con este template como punto de partida, Claude puede personalizar el business case con los números reales de tu equipo, agregar secciones de análisis de riesgo y adaptarlo al estilo de tu empresa."

---

## Sidebar Navigation:

```
🌿 Natura IA Playground     [hamburger on mobile]
─────────────────────────
● Módulo 1  Analizar Campañas      [checkmark if visited]
● Módulo 2  Crear Contenido        [checkmark if visited]
● Módulo 3  Reportes Automáticos   [checkmark if visited]
● Módulo 4  Briefs Creativos       [checkmark if visited]
● Módulo 5  Automatización Cowork  [checkmark if visited]
● Módulo 6  Business Case          [checkmark if visited]
─────────────────────────
Progress: X/6 módulos
[orange progress bar]
```

Active module: orange background, white text
Inactive: hover with light cream background
Visited modules: show ✓ checkmark in green

## Header:
- "Natura IA Playground" title with 🌿 emoji
- Subtitle: "Aprendé a usar Claude en tu trabajo de marketing"
- Right side: "X de 6 módulos explorados" + progress bar

## Module Header (for each module):
- Module number badge (orange)
- Module title large
- One-line description

## Finishing touches:
- CSS transitions on sidebar open/close (translate-x)
- Module content fade-in on change (opacity transition)
- Mobile: sidebar overlays content when open (fixed positioning)
- Overall clean, professional look matching Natura brand

---

## After building, run:
```
git add -A && git commit -m "feat: Natura AI playground - 6 módulos completos" && git push
openclaw system event --text "Done: Natura Playground built and committed" --mode now
```
