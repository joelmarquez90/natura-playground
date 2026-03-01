import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";
import {
  BarChart3, PenTool, FileText, Lightbulb, Settings, Briefcase,
  Copy, Check, ChevronRight, Menu, X, Clock, Sparkles,
  FolderOpen, FileSpreadsheet, Calendar, Mail, Presentation,
  Search, ArrowRight, BookOpen, TrendingUp
} from "lucide-react";

const CAMPAIGNS = [
  { campana: "Día de la Madre", plataforma: "Instagram", inversion: 850000, impresiones: 2400000, clicks: 48000, conversiones: 1920, cpa: 443 },
  { campana: "Día de la Madre", plataforma: "Meta Ads", inversion: 620000, impresiones: 1800000, clicks: 32400, conversiones: 1134, cpa: 547 },
  { campana: "Ekos Lanzamiento", plataforma: "TikTok", inversion: 420000, impresiones: 3200000, clicks: 96000, conversiones: 2880, cpa: 146 },
  { campana: "Ekos Lanzamiento", plataforma: "Instagram", inversion: 380000, impresiones: 1600000, clicks: 40000, conversiones: 1400, cpa: 271 },
  { campana: "Aroa UNA", plataforma: "Google Ads", inversion: 540000, impresiones: 980000, clicks: 29400, conversiones: 882, cpa: 612 },
  { campana: "Aroa UNA", plataforma: "YouTube", inversion: 310000, impresiones: 1500000, clicks: 22500, conversiones: 450, cpa: 689 },
  { campana: "Consultoras Q1", plataforma: "Meta Ads", inversion: 290000, impresiones: 2100000, clicks: 63000, conversiones: 3150, cpa: 92 },
  { campana: "Consultoras Q1", plataforma: "Instagram", inversion: 260000, impresiones: 1400000, clicks: 42000, conversiones: 2520, cpa: 103 },
  { campana: "App Push", plataforma: "Google Ads", inversion: 180000, impresiones: 450000, clicks: 13500, conversiones: 675, cpa: 267 },
  { campana: "App Push", plataforma: "Instagram", inversion: 150000, impresiones: 800000, clicks: 24000, conversiones: 1200, cpa: 125 },
];

const WEEKLY_TREND = [
  { semana: "Sem 1", instagram: 720000, meta: 1580000, google: 480000 },
  { semana: "Sem 2", instagram: 790000, meta: 1500000, google: 510000 },
  { semana: "Sem 3", instagram: 830000, meta: 1490000, google: 505000 },
  { semana: "Sem 4", instagram: 890000, meta: 1450000, google: 520000 },
];

const CHART_DATA = CAMPAIGNS.map(c => ({
  name: `${c.campana.split(" ")[0]} (${c.plataforma.substring(0, 4)})`,
  CPA: c.cpa,
  fill: c.cpa < 200 ? "#2D5F3B" : c.cpa < 400 ? "#C4942A" : "#E85D2C"
}));

const MODULES = [
  { id: 1, icon: BarChart3, title: "Analizar Campañas", short: "Campañas" },
  { id: 2, icon: PenTool, title: "Crear Contenido", short: "Contenido" },
  { id: 3, icon: FileText, title: "Reportes Automáticos", short: "Reportes" },
  { id: 4, icon: Lightbulb, title: "Briefs Creativos", short: "Briefs" },
  { id: 5, icon: Settings, title: "Automatización Cowork", short: "Cowork" },
  { id: 6, icon: Briefcase, title: "Business Case", short: "Propuesta" },
];

const COWORK_CASES = [
  { icon: FolderOpen, title: "Organizar archivos de campaña", desc: "200 archivos mezclados de la campaña Día de la Madre. Cowork los clasifica por tipo (creativos, reportes, briefs) y los renombra con nomenclatura estándar.", time: "~2hs/semana" },
  { icon: FileSpreadsheet, title: "Generar reportes desde Excel", desc: "Le das acceso a tu carpeta de reportes y un Excel con datos de medios. Genera un Word formateado con gráficos, listo para enviar.", time: "~3hs/semana" },
  { icon: Calendar, title: "Monitoreo semanal programado", desc: "Con /schedule programás que todos los lunes a las 8am Cowork lea tus métricas actualizadas y genere un resumen.", time: "~1hs/semana" },
  { icon: Mail, title: "Procesar facturas de proveedores", desc: "Cowork lee PDFs de facturas de medios, extrae montos y fechas, y arma una planilla consolidada para Finanzas.", time: "~2hs/semana" },
  { icon: Presentation, title: "Preparar presentaciones", desc: "Le pasás datos en Excel + brief. Cowork genera un .pptx con estructura, datos y diseño base listo para refinar.", time: "~3hs/semana" },
  { icon: Search, title: "Auditoría de contenido", desc: "Cowork revisa todos los copies de una carpeta y genera un reporte con inconsistencias de tono y sugerencias de mejora.", time: "~1hs/semana" },
];

// ─── Shared ───────────────────────────────────────────────────────────────────
function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
      style={{ background: copied ? "#dcfce7" : "#FFF8F3", color: copied ? "#166534" : "#C4942A", border: "1px solid", borderColor: copied ? "#86efac" : "#E8E0D8" }}>
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? "Copiado" : "Copiar"}
    </button>
  );
}

function PromptCard({ prompt, index }) {
  return (
    <div className="rounded-xl p-4 mb-3 transition-all duration-200" style={{ background: "#FFF8F3", border: "1px solid #E8E0D8" }}>
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1">
          <span className="text-xs font-bold uppercase tracking-wide" style={{ color: "#E85D2C" }}>Prompt {index + 1}</span>
          <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "#2C2C2C", fontFamily: "monospace" }}>{prompt}</p>
        </div>
        <CopyButton text={prompt} />
      </div>
    </div>
  );
}

function InsightBox({ text }) {
  return (
    <div className="rounded-xl p-4 my-4 flex gap-3 items-start" style={{ background: "#EDF7EF", border: "1px solid #C3E6CB" }}>
      <Sparkles size={20} className="flex-shrink-0 mt-0.5" style={{ color: "#2D5F3B" }} />
      <div>
        <span className="text-xs font-bold uppercase tracking-wide" style={{ color: "#2D5F3B" }}>¿Qué hace Claude aquí?</span>
        <p className="mt-1 text-sm leading-relaxed" style={{ color: "#2C2C2C" }}>{text}</p>
      </div>
    </div>
  );
}

function TabBar({ tabs, active, onSelect }) {
  return (
    <div className="flex gap-2 mb-4">
      {tabs.map(t => (
        <button key={t.id} onClick={() => onSelect(t.id)}
          className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
          style={{ background: active === t.id ? "#E85D2C" : "#FFF8F3", color: active === t.id ? "#fff" : "#666", border: "1px solid", borderColor: active === t.id ? "#E85D2C" : "#E8E0D8" }}>
          {t.label}
        </button>
      ))}
    </div>
  );
}

function DataTable({ data, columns }) {
  return (
    <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid #E8E0D8" }}>
      <table className="w-full text-sm">
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i} className="px-3 py-2.5 text-left text-xs font-bold uppercase tracking-wide whitespace-nowrap"
                style={{ background: "#E85D2C", color: "#fff" }}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#FFF8F3" }}>
              {columns.map((col, j) => (
                <td key={j} className="px-3 py-2 whitespace-nowrap" style={{ color: "#2C2C2C" }}>
                  {col.format ? col.format(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Module 1 ─────────────────────────────────────────────────────────────────
function Module1() {
  const [tab, setTab] = useState("data");
  const tabs = [{ id: "data", label: "Datos" }, { id: "chart", label: "Gráfico" }, { id: "prompts", label: "Prompts" }];
  const columns = [
    { key: "campana", label: "Campaña" },
    { key: "plataforma", label: "Plataforma" },
    { key: "inversion", label: "Inversión", format: v => `$${(v / 1000).toFixed(0)}K` },
    { key: "impresiones", label: "Impresiones", format: v => `${(v / 1000000).toFixed(1)}M` },
    { key: "clicks", label: "Clicks", format: v => v.toLocaleString("es-AR") },
    { key: "conversiones", label: "Conv.", format: v => v.toLocaleString("es-AR") },
    { key: "cpa", label: "CPA", format: (v) => <span style={{ color: v < 200 ? "#2D5F3B" : v < 400 ? "#C4942A" : "#E85D2C", fontWeight: 700 }}>${v}</span> },
  ];
  const prompts = [
    "Analizá esta tabla de campañas de la marca. ¿Cuál tiene el mejor CPA? ¿Dónde debería reasignar presupuesto el próximo trimestre?",
    "Haceme un resumen ejecutivo de 3 párrafos para presentarle a mi directora de marketing, destacando los insights más importantes.",
    "Compará el rendimiento por plataforma (Instagram vs Meta Ads vs TikTok vs Google Ads). ¿En cuál conviene duplicar inversión?",
  ];
  return (
    <div>
      <p className="text-sm mb-4 leading-relaxed" style={{ color: "#666" }}>Recibís un reporte de performance de campaña. En vez de analizarlo manualmente, le pasás los datos a Claude y obtenés insights accionables al instante.</p>
      <TabBar tabs={tabs} active={tab} onSelect={setTab} />
      {tab === "data" && <DataTable data={CAMPAIGNS} columns={columns} />}
      {tab === "chart" && (
        <div className="rounded-xl p-4" style={{ background: "#fff", border: "1px solid #E8E0D8" }}>
          <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: "#999" }}>CPA por campaña (menor = mejor)</p>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={CHART_DATA} layout="vertical" margin={{ left: 10, right: 20 }}>
              <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={v => `$${v}`} />
              <YAxis type="category" dataKey="name" width={145} tick={{ fontSize: 10 }} />
              <Tooltip formatter={v => [`$${v} ARS`, "CPA"]} contentStyle={{ borderRadius: 8, border: "1px solid #E8E0D8" }} />
              <Bar dataKey="CPA" radius={[0, 6, 6, 0]} fill="#E85D2C" />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-3 text-xs" style={{ color: "#999" }}>
            <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-sm" style={{ background: "#2D5F3B" }} /> &lt;$200 Excelente</span>
            <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-sm" style={{ background: "#C4942A" }} /> $200–400 Bueno</span>
            <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-sm" style={{ background: "#E85D2C" }} /> &gt;$400 Mejorable</span>
          </div>
        </div>
      )}
      {tab === "prompts" && (
        <div>
          {prompts.map((p, i) => <PromptCard key={i} prompt={p} index={i} />)}
          <InsightBox text="Claude puede analizar CSVs completos, identificar las campañas más rentables, detectar anomalías y redactar resúmenes ejecutivos listos para enviar. Lo que antes te llevaba 2 horas, lo hacés en minutos." />
        </div>
      )}
    </div>
  );
}

// ─── Module 2 ─────────────────────────────────────────────────────────────────
function Module2() {
  const brief = `Marca: Aroa Cosméticos Argentina
Objetivo: Engagement + awareness de línea sustentable
Mes: Abril 2026
Plataforma: Instagram (Feed + Stories + Reels)
Tono: Cálido, empoderado, eco-consciente
Línea destacada: Aroa Botanics (ingredientes naturales, packaging reciclable)

Fechas clave:
  - 7/4: Día Mundial de la Salud
  - 22/4: Día de la Tierra
  - 28/4: Día de la Seguridad en el Trabajo

Frecuencia: 5 posts/semana (3 feed, 1 reel, 1 story interactiva)
KPIs target: ER >3.5%, alcance >150K/post, saves >2%`;
  const prompts = [
    "Con este brief, generame un calendario completo de abril con copy para cada post, formato (feed/reel/story), hashtags y horario sugerido de publicación.",
    "Escribime 5 copies para Reels de Aroa Botanics que hablen de sustentabilidad sin sonar corporativo. Tono cercano, voseo, que genere saves.",
    "Adaptame este calendario para TikTok manteniendo el mismo mensaje pero ajustando el tono y el formato al algoritmo de TikTok.",
  ];
  return (
    <div>
      <p className="text-sm mb-4 leading-relaxed" style={{ color: "#666" }}>Necesitás armar un calendario de contenidos para Instagram. En vez de empezar de cero, le das el brief a Claude y te devuelve el calendario completo.</p>
      <div className="rounded-xl p-4 mb-4" style={{ background: "#FFF8F3", border: "1px solid #E8E0D8" }}>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold uppercase tracking-wide" style={{ color: "#E85D2C" }}>Brief de ejemplo — copialo a Claude</span>
          <CopyButton text={brief} />
        </div>
        <pre className="text-xs leading-relaxed whitespace-pre-wrap" style={{ color: "#2C2C2C", fontFamily: "monospace" }}>{brief}</pre>
      </div>
      {prompts.map((p, i) => <PromptCard key={i} prompt={p} index={i} />)}
      <InsightBox text="Claude genera calendarios editoriales completos con copy, hashtags y horarios sugeridos. Adapta el tono por plataforma y mantiene coherencia de marca en todos los formatos." />
    </div>
  );
}

// ─── Module 3 ─────────────────────────────────────────────────────────────────
function Module3() {
  const [tab, setTab] = useState("data");
  const tabs = [{ id: "data", label: "Datos" }, { id: "trend", label: "Tendencia" }, { id: "prompts", label: "Prompts" }];
  const weeklyData = `Semana: 10-16 Marzo 2026 | Budget: $1.200.000 | Ejecutado: $1.087.500 (90.6%)

Instagram: 890K imp (+12%), ER 4.2% ✅, 12.4K clicks, CPC $38
Meta Ads: 1.45M imp (-3% ⚠️), CTR 1.8%, 2.175 conv, CPA $210, ROAS 4.2x
Google Ads: 520K imp, CTR 2.9%, 1.508 conv, CPA $185 ✅, ROAS 5.1x

Top 3 piezas:
1. Reel "Ritual Ekos" → 45K views, 8.2% ER
2. Carrusel "Ingredientes Amazónicos" → 28K alcance, 5.1% ER
3. Story Quiz "¿Qué Ekos sos?" → 12K respuestas`;
  const prompts = [
    "Con estos datos de la semana, armame un reporte ejecutivo para mi directora de marketing. Incluí highlights, alertas y 3 recomendaciones para la semana siguiente.",
    "Identificá las 3 métricas más preocupantes de esta semana y proponé acciones correctivas concretas para cada una.",
    "Convertí este reporte en un mail profesional de 5 líneas para el equipo de medios, con subject line incluido.",
  ];
  return (
    <div>
      <p className="text-sm mb-4 leading-relaxed" style={{ color: "#666" }}>Cada lunes tenés que enviar el reporte semanal de medios. Claude lo transforma en formato ejecutivo listo para enviar.</p>
      <TabBar tabs={tabs} active={tab} onSelect={setTab} />
      {tab === "data" && (
        <div className="rounded-xl p-4" style={{ background: "#FFF8F3", border: "1px solid #E8E0D8" }}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold uppercase tracking-wide" style={{ color: "#E85D2C" }}>Datos de la semana</span>
            <CopyButton text={weeklyData} />
          </div>
          <pre className="text-xs leading-relaxed whitespace-pre-wrap" style={{ color: "#2C2C2C", fontFamily: "monospace" }}>{weeklyData}</pre>
        </div>
      )}
      {tab === "trend" && (
        <div className="rounded-xl p-4" style={{ background: "#fff", border: "1px solid #E8E0D8" }}>
          <p className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: "#999" }}>Evolución de impresiones por plataforma</p>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={WEEKLY_TREND}>
              <XAxis dataKey="semana" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `${(v / 1000000).toFixed(1)}M`} />
              <Tooltip formatter={v => [v.toLocaleString("es-AR"), ""]} contentStyle={{ borderRadius: 8, border: "1px solid #E8E0D8" }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="instagram" name="Instagram" stroke="#E85D2C" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="meta" name="Meta Ads" stroke="#2D5F3B" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="google" name="Google Ads" stroke="#C4942A" strokeWidth={2.5} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
      {tab === "prompts" && (
        <div>
          {prompts.map((p, i) => <PromptCard key={i} prompt={p} index={i} />)}
          <InsightBox text="Claude transforma datos crudos en reportes ejecutivos con formato profesional, detecta anomalías, compara con benchmarks y redacta recomendaciones listas para enviar a tu directora." />
        </div>
      )}
    </div>
  );
}

// ─── Module 4 ─────────────────────────────────────────────────────────────────
function Module4() {
  const briefData = `Producto: Aroa Bloom — nueva línea de body splash
Objetivo: Lanzamiento Q2 2026, target 15.000 unidades primer mes
Target: Mujeres 25–40, urbanas, NSE BC1, valoran autocuidado diario
Insight: "Los pequeños rituales de cuidado personal son mi momento de reconexión conmigo misma"
Presupuesto de medios: ARS 3.500.000
Mix sugerido: 40% Instagram, 25% TikTok, 20% Meta Ads, 15% Influencers

Benchmarks beauty:
  - CTR promedio IG: 1.2%
  - CPA promedio: ARS 380
  - ER promedio IG: 2.8%

Entregables: KV principal, 3 adaptaciones IG, 2 scripts Reel, 1 guión TikTok
Deadline: 15 abril 2026`;
  const prompts = [
    "Con esta información, armame un brief creativo completo y profesional para enviarle a la agencia. Seguí el formato estándar del sector.",
    "Generame 5 conceptos creativos para esta campaña de Aroa Bloom body splash. Cada concepto con nombre, tagline y descripción de la idea visual.",
    "Distribuí el presupuesto de $3.500.000 ARS en un media plan semanal por plataforma y formato. Justificá cada decisión.",
  ];
  return (
    <div>
      <p className="text-sm mb-4 leading-relaxed" style={{ color: "#666" }}>Necesitás crear un brief para tu agencia creativa. Claude lo estructura de forma profesional en segundos.</p>
      <div className="rounded-xl p-4 mb-4" style={{ background: "#FFF8F3", border: "1px solid #E8E0D8" }}>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold uppercase tracking-wide" style={{ color: "#E85D2C" }}>Brief de campaña — Aroa Bloom</span>
          <CopyButton text={briefData} />
        </div>
        <pre className="text-xs leading-relaxed whitespace-pre-wrap" style={{ color: "#2C2C2C", fontFamily: "monospace" }}>{briefData}</pre>
      </div>
      {prompts.map((p, i) => <PromptCard key={i} prompt={p} index={i} />)}
      <InsightBox text="Claude estructura briefs creativos profesionales, genera múltiples conceptos con naming y taglines, y arma media plans detallados. Le das el contexto, él hace el trabajo pesado." />
    </div>
  );
}

// ─── Module 5 ─────────────────────────────────────────────────────────────────
function Module5() {
  return (
    <div>
      <p className="text-sm mb-4 leading-relaxed" style={{ color: "#666" }}>Claude Cowork es la versión de escritorio que puede operar archivos, carpetas y programas en tu computadora de forma autónoma.</p>
      <div className="rounded-xl p-4 mb-4 flex gap-3 items-start" style={{ background: "#EDF7EF", border: "1px solid #C3E6CB" }}>
        <BookOpen size={18} className="flex-shrink-0 mt-0.5" style={{ color: "#2D5F3B" }} />
        <div className="text-sm" style={{ color: "#2C2C2C" }}>
          <strong>¿Qué es Cowork?</strong> Es la app de escritorio de Claude que puede leer y modificar archivos, organizar carpetas y ejecutar tareas programadas en tu computadora — sin que vos hagas nada.
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {COWORK_CASES.map((c, i) => {
          const Icon = c.icon;
          return (
            <div key={i} className="rounded-xl p-4 transition-all duration-200 hover:shadow-md" style={{ background: "#fff", border: "1px solid #E8E0D8" }}>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#FFF8F3" }}>
                  <Icon size={20} style={{ color: "#E85D2C" }} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-sm" style={{ color: "#2C2C2C" }}>{c.title}</h4>
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ml-2 shrink-0" style={{ background: "#FFF8F3", color: "#C4942A" }}>
                      <Clock size={11} /> {c.time}
                    </span>
                  </div>
                  <p className="text-xs mt-1.5 leading-relaxed" style={{ color: "#666" }}>{c.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 rounded-xl p-4" style={{ background: "#FFF8F3", border: "1px solid #E8E0D8" }}>
        <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: "#E85D2C" }}>Ahorro total estimado</p>
        <p className="text-3xl font-bold" style={{ color: "#2D5F3B" }}>~12hs/semana</p>
        <p className="text-xs mt-1" style={{ color: "#999" }}>Basado en los 6 casos de uso combinados. Eso es 1.5 días laborales recuperados cada semana.</p>
      </div>
    </div>
  );
}

// ─── Module 6 ─────────────────────────────────────────────────────────────────
const INITIAL_PROPOSAL = `PROPUESTA: Implementación de Claude AI en Comunicación y Marketing

PARA: [Nombre Directora de Marketing]
DE: [Tu nombre], Coordinadora de Medios
FECHA: Marzo 2026

1. RESUMEN EJECUTIVO
Claude es el asistente de IA de Anthropic, diseñado con los más altos
estándares de seguridad empresarial. Propongo implementar licencias Team
para nuestro equipo de marketing (5-10 personas) para automatizar tareas
repetitivas y potenciar la productividad.

2. PROBLEMA ACTUAL
- Armado de reportes semanales: ~4 horas/semana
- Creación de briefs creativos: ~3 horas cada uno
- Análisis de campañas: ~5 horas/semana
- Generación de contenido: ~6 horas/semana
- Organización de archivos: ~2 horas/semana
Total en tareas automatizables: ~20 horas/semana por persona

3. SOLUCIÓN PROPUESTA
Plan Team de Claude ($25 USD/usuario/mes)
- 5 licencias iniciales para el equipo de medios
- Incluye: Claude Chat, Claude Code, Cowork, Projects compartidos
- Seguridad: SOC 2 Type II, datos NO usados para entrenar el modelo
- Panel de admin con control de uso por usuario
- Compatible con Google Workspace (Drive, Gmail)

4. ROI ESTIMADO
- Horas ahorradas: ~20 hs/semana × 4 semanas = 80 hs/mes
- Costo hora equipo (estimado): ARS 8.000/hora
- Valor del tiempo recuperado: ARS 640.000/mes
- Inversión mensual (5 usuarios): ~ARS 125.000/mes
- ROI: 5.1x

5. PLAN DE IMPLEMENTACIÓN
Mes 1: Piloto con 3 usuarios (yo + 2 del equipo)
Mes 2: Evaluación de resultados y ajuste de workflows
Mes 3: Expansión a equipo completo

6. MÉTRICAS DE ÉXITO
- Reducción de tiempo en reportes: objetivo -60%
- Velocidad de creación de briefs: objetivo -50%
- Satisfacción del equipo: encuesta mensual
- Calidad de outputs: evaluación por directora

7. SEGURIDAD Y COMPLIANCE
- Claude Team NO usa conversaciones para entrenar modelos
- Estándares SOC 2 Type II
- Admin controla accesos, uso y presupuesto
- Compatible con políticas de datos corporativas`;

function Module6() {
  const [proposal, setProposal] = useState(INITIAL_PROPOSAL);
  const prompt = "Tomá este template de business case y personalizalo con los datos reales de tu empresa. Hacelo más persuasivo, agregá datos reales del equipo y una sección de riesgos y mitigación.";
  return (
    <div>
      <p className="text-sm mb-4 leading-relaxed" style={{ color: "#666" }}>Este template está listo para personalizar. Editalo directamente acá o copiáselo a Claude para que lo mejore.</p>
      <div className="rounded-xl overflow-hidden mb-4" style={{ border: "1px solid #E8E0D8" }}>
        <div className="px-4 py-2.5 flex justify-between items-center" style={{ background: "#E85D2C" }}>
          <span className="text-xs font-bold uppercase tracking-wide text-white">Propuesta editable</span>
          <CopyButton text={proposal} />
        </div>
        <textarea
          value={proposal}
          onChange={e => setProposal(e.target.value)}
          className="w-full p-4 text-xs leading-relaxed resize-y focus:outline-none"
          style={{ minHeight: 380, fontFamily: "monospace", color: "#2C2C2C", background: "#fff" }}
          rows={28}
        />
      </div>
      <PromptCard prompt={prompt} index={0} />
      <div className="mt-4 rounded-xl p-4" style={{ background: "#EDF7EF", border: "1px solid #C3E6CB" }}>
        <div className="flex gap-3 items-start">
          <TrendingUp size={20} className="flex-shrink-0 mt-0.5" style={{ color: "#2D5F3B" }} />
          <div className="flex-1">
            <span className="text-xs font-bold uppercase tracking-wide" style={{ color: "#2D5F3B" }}>Planes disponibles</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
              {[
                { plan: "Team Standard", price: "$25/usuario/mes", feat: "Chat + Projects + API" },
                { plan: "Team Premium", price: "$125/usuario/mes", feat: "Todo Standard + Claude Code + Cowork" },
                { plan: "Enterprise", price: "Precio custom", feat: "SSO, SCIM, Audit logs, 500K contexto" },
              ].map((p, i) => (
                <div key={i} className="rounded-lg p-3" style={{ background: "#fff", border: "1px solid #C3E6CB" }}>
                  <p className="font-bold text-sm" style={{ color: "#2D5F3B" }}>{p.plan}</p>
                  <p className="text-base font-bold mt-1" style={{ color: "#2C2C2C" }}>{p.price}</p>
                  <p className="text-xs mt-1" style={{ color: "#666" }}>{p.feat}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
const MODULE_COMPONENTS = { 1: Module1, 2: Module2, 3: Module3, 4: Module4, 5: Module5, 6: Module6 };

export default function App() {
  const [activeModule, setActiveModule] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [visited, setVisited] = useState(new Set([1]));

  const handleModuleChange = (id) => {
    setActiveModule(id);
    setVisited(prev => new Set([...prev, id]));
    setSidebarOpen(false);
  };

  const ActiveComponent = MODULE_COMPONENTS[activeModule];
  const activeModuleData = MODULES.find(m => m.id === activeModule);
  const progress = Math.round((visited.size / MODULES.length) * 100);

  return (
    <div className="min-h-screen flex" style={{ background: "#FAF6F1", fontFamily: "'Inter', system-ui, sans-serif", color: "#2C2C2C" }}>
      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed md:static z-40 top-0 left-0 h-full w-72 flex-shrink-0 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        style={{ background: "#1A1A1A" }}>
        <div className="p-5 pb-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-base font-bold text-white tracking-tight">Claude para Marketing</h1>
              <p className="text-xs mt-0.5" style={{ color: "#E85D2C" }}>Playground Interactivo · Marketing</p>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden text-white p-1"><X size={18} /></button>
          </div>
          <div className="mt-4 mb-1 flex justify-between items-center">
            <span className="text-xs" style={{ color: "#999" }}>Progreso</span>
            <span className="text-xs font-bold" style={{ color: "#E85D2C" }}>{progress}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full" style={{ background: "#333" }}>
            <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: "#E85D2C" }} />
          </div>
        </div>
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {MODULES.map(m => {
            const Icon = m.icon;
            const isActive = activeModule === m.id;
            const isVisited = visited.has(m.id);
            return (
              <button key={m.id} onClick={() => handleModuleChange(m.id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all"
                style={{ background: isActive ? "#E85D2C" : "transparent", color: isActive ? "#fff" : "#ccc" }}>
                <Icon size={18} />
                <span className="text-sm font-medium flex-1">{m.short}</span>
                {isVisited && !isActive && <Check size={14} style={{ color: "#2D5F3B" }} />}
                {isActive && <ChevronRight size={14} />}
              </button>
            );
          })}
        </nav>
        <div className="p-4 mx-3 mb-3 rounded-xl" style={{ background: "#2A2A2A" }}>
          <p className="text-xs font-bold text-white mb-1">¿Lista para probar?</p>
          <p className="text-xs mb-2" style={{ color: "#999" }}>Copiá cualquier prompt y pegalo en Claude para ver la magia.</p>
          <a href="https://claude.ai" target="_blank" rel="noopener noreferrer"
            className="mt-2 flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all hover:opacity-90"
            style={{ background: "#E85D2C", color: "#fff" }}>
            Abrir Claude <ArrowRight size={12} />
          </a>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">
        <header className="sticky top-0 z-20 px-4 md:px-8 py-4 flex items-center gap-4 border-b"
          style={{ background: "#FAF6F1", borderColor: "#E8E0D8" }}>
          <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 rounded-lg" style={{ background: "#FFF8F3" }}>
            <Menu size={20} style={{ color: "#2C2C2C" }} />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ background: "#E85D2C" }}>Módulo {activeModule}</span>
              <h2 className="text-base font-bold" style={{ color: "#2C2C2C" }}>{activeModuleData?.title}</h2>
            </div>
          </div>
          {activeModule < 6 && (
            <button onClick={() => handleModuleChange(activeModule + 1)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
              style={{ background: "#E85D2C", color: "#fff" }}>
              Siguiente <ChevronRight size={16} />
            </button>
          )}
        </header>
        <div className="p-4 md:p-8 max-w-3xl">
          <ActiveComponent />
        </div>
      </main>
    </div>
  );
}
