import { useState } from 'react'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import {
  BarChart2, FileText, Zap, Briefcase, Lightbulb, CheckCircle, Copy, Check,
  Menu, X, ChevronRight, FolderOpen, Calendar, Search, Receipt, Presentation
} from 'lucide-react'

// ─── Colors ──────────────────────────────────────────────────────────────────
const C = { orange: '#E85D2C', green: '#2D5F3B', cream: '#FFF8F3', gold: '#C4942A', text: '#2C2C2C' }

// ─── Data ────────────────────────────────────────────────────────────────────
const campaignData = [
  { name: 'Día Madre\nIG', campana: 'Día de la Madre 2025', plataforma: 'Instagram', inversion: 850000, impresiones: 2400000, clicks: 48000, conversiones: 1920, cpa: 443 },
  { name: 'Día Madre\nMeta', campana: 'Día de la Madre 2025', plataforma: 'Meta Ads', inversion: 620000, impresiones: 1800000, clicks: 32400, conversiones: 1134, cpa: 547 },
  { name: 'Ekos\nTikTok', campana: 'Línea Ekos Lanzamiento', plataforma: 'TikTok', inversion: 420000, impresiones: 3200000, clicks: 96000, conversiones: 2880, cpa: 146 },
  { name: 'Ekos\nIG', campana: 'Línea Ekos Lanzamiento', plataforma: 'Instagram', inversion: 380000, impresiones: 1600000, clicks: 40000, conversiones: 1400, cpa: 271 },
  { name: 'UNA\nGoogle', campana: 'Natura UNA Relanzamiento', plataforma: 'Google Ads', inversion: 540000, impresiones: 980000, clicks: 29400, conversiones: 882, cpa: 612 },
  { name: 'UNA\nYT', campana: 'Natura UNA Relanzamiento', plataforma: 'YouTube', inversion: 310000, impresiones: 1500000, clicks: 22500, conversiones: 450, cpa: 689 },
  { name: 'Consul.\nMeta', campana: 'Consultoras Digitales Q1', plataforma: 'Meta Ads', inversion: 290000, impresiones: 2100000, clicks: 63000, conversiones: 3150, cpa: 92 },
  { name: 'Consul.\nIG', campana: 'Consultoras Digitales Q1', plataforma: 'Instagram', inversion: 260000, impresiones: 1400000, clicks: 42000, conversiones: 2520, cpa: 103 },
  { name: 'App\nGoogle', campana: 'TodoNatura App Push', plataforma: 'Google Ads', inversion: 180000, impresiones: 450000, clicks: 13500, conversiones: 675, cpa: 267 },
  { name: 'App\nIG', campana: 'TodoNatura App Push', plataforma: 'Instagram', inversion: 150000, impresiones: 800000, clicks: 24000, conversiones: 1200, cpa: 125 },
]
const minCPA = Math.min(...campaignData.map(d => d.cpa))
const maxCPA = Math.max(...campaignData.map(d => d.cpa))

const weeklyData = [
  { week: 'Feb 24–Mar 2', instagram: 795000, meta: 1490000, google: 480000 },
  { week: 'Mar 3–9', instagram: 820000, meta: 1380000, google: 502000 },
  { week: 'Mar 10–16', instagram: 890000, meta: 1450000, google: 520000 },
  { week: 'Mar 17–23', instagram: 945000, meta: 1410000, google: 555000 },
]

const modules = [
  { id: 1, icon: BarChart2, label: 'Analizar Campañas', desc: 'Analizá datos de campañas digitales con IA' },
  { id: 2, icon: FileText, label: 'Crear Contenido', desc: 'Generá calendarios editoriales y copies' },
  { id: 3, icon: BarChart2, label: 'Reportes Automáticos', desc: 'Transformá métricas en reportes ejecutivos' },
  { id: 4, icon: Briefcase, label: 'Briefs Creativos', desc: 'Armá briefs completos para tu agencia' },
  { id: 5, icon: Zap, label: 'Automatización Cowork', desc: 'Automatizá tareas repetitivas con Cowork' },
  { id: 6, icon: FileText, label: 'Business Case', desc: 'Armá la propuesta para Natura' },
]

const fmt = n => n.toLocaleString('es-AR')

// ─── Shared Components ───────────────────────────────────────────────────────
function PromptCard({ text, index }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="border rounded-xl overflow-hidden mb-3" style={{ borderLeftWidth: 4, borderLeftColor: C.orange, borderColor: '#e5e7eb' }}>
      <div className="flex items-start justify-between gap-3 p-4 bg-white">
        <div className="flex gap-3 items-start flex-1">
          <span className="text-xs font-bold px-2 py-1 rounded-full text-white shrink-0 mt-0.5" style={{ background: C.orange }}>{index}</span>
          <p className="font-mono text-sm text-gray-700 leading-relaxed">{text}</p>
        </div>
        <button onClick={copy} className="shrink-0 flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg font-semibold transition-all"
          style={{ background: copied ? '#dcfce7' : '#fef3c7', color: copied ? '#166534' : C.gold }}>
          {copied ? <><Check size={12} /> Copiado</> : <><Copy size={12} /> Copiar</>}
        </button>
      </div>
    </div>
  )
}

function InsightBox({ children }) {
  return (
    <div className="rounded-2xl p-5 flex gap-4 mt-6" style={{ background: '#e8f5e9', borderLeft: `4px solid ${C.green}` }}>
      <Lightbulb size={22} className="shrink-0 mt-0.5" style={{ color: C.green }} />
      <div>
        <p className="font-bold text-sm mb-1" style={{ color: C.green }}>¿Qué hace Claude aquí?</p>
        <p className="text-sm text-gray-700 leading-relaxed">{children}</p>
      </div>
    </div>
  )
}

function SectionTabs({ tabs, active, onSelect }) {
  return (
    <div className="flex gap-1 border-b mb-6" style={{ borderColor: '#e5e7eb' }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onSelect(t.id)}
          className="px-4 py-2.5 text-sm font-semibold transition-all"
          style={{
            color: active === t.id ? C.orange : '#6b7280',
            borderBottom: active === t.id ? `2px solid ${C.orange}` : '2px solid transparent',
            marginBottom: -1
          }}>
          {t.label}
        </button>
      ))}
    </div>
  )
}

function ModuleHeader({ num, title, desc }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{ background: C.orange }}>
          Módulo {num}
        </span>
      </div>
      <h2 className="text-2xl font-extrabold mb-1" style={{ color: C.text }}>{title}</h2>
      <p className="text-gray-500 text-sm">{desc}</p>
    </div>
  )
}

// ─── Module 1: Analizar Campañas ─────────────────────────────────────────────
function Module1() {
  const [tab, setTab] = useState('tabla')
  const tabs = [{ id: 'tabla', label: '📊 Tabla' }, { id: 'grafico', label: '📈 Gráfico' }, { id: 'prompts', label: '💬 Prompts' }]
  return (
    <div>
      <ModuleHeader num={1} title="Analizar Campañas" desc="Analizá performance de campañas digitales y obtené insights accionables con IA." />
      <SectionTabs tabs={tabs} active={tab} onSelect={setTab} />

      {tab === 'tabla' && (
        <div className="overflow-x-auto rounded-xl border" style={{ borderColor: '#e5e7eb' }}>
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr style={{ background: C.orange }}>
                {['Campaña', 'Plataforma', 'Inversión', 'Impresiones', 'Clicks', 'Conversiones', 'CPA'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-white font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {campaignData.map((r, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : C.cream }}>
                  <td className="px-4 py-2.5 font-medium">{r.campana}</td>
                  <td className="px-4 py-2.5 text-gray-600">{r.plataforma}</td>
                  <td className="px-4 py-2.5 text-gray-600">${fmt(r.inversion)}</td>
                  <td className="px-4 py-2.5 text-gray-600">{fmt(r.impresiones)}</td>
                  <td className="px-4 py-2.5 text-gray-600">{fmt(r.clicks)}</td>
                  <td className="px-4 py-2.5 text-gray-600">{fmt(r.conversiones)}</td>
                  <td className="px-4 py-2.5 font-bold" style={{ color: r.cpa === minCPA ? '#166534' : r.cpa === maxCPA ? '#dc2626' : C.text }}>
                    ${fmt(r.cpa)}
                    {r.cpa === minCPA && <span className="ml-1 text-xs">✓</span>}
                    {r.cpa === maxCPA && <span className="ml-1 text-xs">▲</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'grafico' && (
        <div className="bg-white rounded-2xl p-6 border" style={{ borderColor: '#e5e7eb' }}>
          <h3 className="font-bold mb-4 text-gray-700">CPA por Campaña y Plataforma (ARS)</h3>
          <ResponsiveContainer width="100%" height={360}>
            <BarChart data={campaignData} margin={{ top: 5, right: 10, left: 10, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-30} textAnchor="end" interval={0} />
              <YAxis tickFormatter={v => `$${v}`} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => [`$${fmt(v)}`, 'CPA']} labelFormatter={(l, p) => p[0]?.payload?.campana + ' — ' + p[0]?.payload?.plataforma} />
              <Bar dataKey="cpa" fill={C.orange} stroke={C.gold} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-400 mt-2 text-center">CPA más bajo = mejor rendimiento. Consultoras Digitales Q1 lidera.</p>
        </div>
      )}

      {tab === 'prompts' && (
        <div>
          <p className="text-sm text-gray-500 mb-4">Copiá estos prompts y pegálos en Claude junto con la tabla:</p>
          {[
            'Analizá esta tabla de campañas. ¿Cuál tiene el mejor CPA? ¿Dónde debería reasignar presupuesto?',
            'Haceme un resumen ejecutivo de 3 párrafos para presentarle a mi directora de marketing',
            'Compará el rendimiento por plataforma. ¿En cuál conviene duplicar inversión el próximo trimestre?'
          ].map((t, i) => <PromptCard key={i} text={t} index={i + 1} />)}
          <InsightBox>Claude puede analizar tablas CSV, identificar outliers, comparar métricas entre plataformas y redactar resúmenes ejecutivos listos para presentar. Lo que antes te llevaba 2 horas, ahora lo hacés en minutos.</InsightBox>
        </div>
      )}
    </div>
  )
}

// ─── Module 2: Crear Contenido ───────────────────────────────────────────────
const briefContenido = `Marca: Natura Cosméticos Argentina
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
KPIs target: ER >3.5%, alcance >150K/post, saves >2%`

function Module2() {
  return (
    <div>
      <ModuleHeader num={2} title="Crear Contenido" desc="Generá calendarios editoriales, copies y adaptaciones por plataforma." />
      <div className="bg-white rounded-2xl p-5 border mb-6 font-mono text-sm whitespace-pre-line leading-relaxed" style={{ borderColor: '#e5e7eb', color: C.text }}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-sans font-semibold px-2 py-0.5 rounded-full text-white" style={{ background: C.green }}>Brief de ejemplo</span>
        </div>
        {briefContenido}
      </div>
      <p className="text-sm text-gray-500 mb-3">Usá este brief como contexto al abrir Claude:</p>
      {[
        'Con este brief, generame un calendario completo de abril con copy para cada post, formato (feed/reel/story), hashtags y horario sugerido de publicación',
        'Escribime 5 copies para Reels de Natura Ekos que hablen de sustentabilidad sin sonar corporativo',
        'Adaptame este calendario para TikTok manteniendo el mismo mensaje pero ajustando el tono'
      ].map((t, i) => <PromptCard key={i} text={t} index={i + 1} />)}
      <InsightBox>Claude genera calendarios editoriales completos, adapta el tono por plataforma, sugiere hashtags con research de tendencias y mantiene coherencia de marca en todos los formatos.</InsightBox>
    </div>
  )
}

// ─── Module 3: Reportes Automáticos ─────────────────────────────────────────
function StatCard({ label, value, sub, color }) {
  return (
    <div className="bg-white rounded-xl p-4 border" style={{ borderColor: '#e5e7eb' }}>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-2xl font-extrabold" style={{ color: color || C.text }}>{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  )
}

function Module3() {
  const [tab, setTab] = useState('metricas')
  const tabs = [{ id: 'metricas', label: '📊 Métricas' }, { id: 'grafico', label: '📈 Gráfico' }, { id: 'prompts', label: '💬 Prompts' }]
  return (
    <div>
      <ModuleHeader num={3} title="Reportes Automáticos" desc="Transformá datos de medios en reportes ejecutivos en segundos." />
      <SectionTabs tabs={tabs} active={tab} onSelect={setTab} />

      {tab === 'metricas' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <StatCard label="Budget total" value="$1.200.000" sub="ARS semana" />
            <StatCard label="Budget ejecutado" value="$1.087.500" sub="90.6% del total" color={C.green} />
            <StatCard label="Semana" value="Mar 10–16" sub="2026" />
          </div>
          <div className="bg-white rounded-2xl p-5 border" style={{ borderColor: '#e5e7eb' }}>
            <h3 className="font-bold mb-3 flex items-center gap-2" style={{ color: C.orange }}>📱 Instagram</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <StatCard label="Impresiones" value="890K" sub="+12% vs ant." color={C.green} />
              <StatCard label="Alcance" value="340K" />
              <StatCard label="Engagement Rate" value="4.2%" sub="bench: 3.5%" color={C.green} />
              <StatCard label="CPC" value="$38 ARS" />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 border" style={{ borderColor: '#e5e7eb' }}>
            <h3 className="font-bold mb-3" style={{ color: '#1877F2' }}>📘 Meta Ads</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <StatCard label="Impresiones" value="1.45M" sub="-3% vs ant." color="#dc2626" />
              <StatCard label="CTR" value="1.8%" />
              <StatCard label="CPA" value="$210 ARS" />
              <StatCard label="ROAS" value="4.2x" color={C.green} />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 border" style={{ borderColor: '#e5e7eb' }}>
            <h3 className="font-bold mb-3" style={{ color: '#34A853' }}>🔍 Google Ads</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <StatCard label="Impresiones" value="520K" />
              <StatCard label="CTR" value="2.9%" />
              <StatCard label="CPA" value="$185 ARS" color={C.green} />
              <StatCard label="ROAS" value="5.1x" color={C.green} />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 border" style={{ borderColor: '#e5e7eb' }}>
            <h3 className="font-bold mb-3">🏆 Top 3 piezas</h3>
            {[
              { n: 1, t: 'Reel "Ritual Ekos"', m: '45K views — ER 8.2%' },
              { n: 2, t: 'Carrusel "Ingredientes Amazónicos"', m: '28K alcance — ER 5.1%' },
              { n: 3, t: 'Story Quiz "¿Qué Ekos sos?"', m: '12K respuestas' },
            ].map(p => (
              <div key={p.n} className="flex items-center gap-3 py-2 border-b last:border-0" style={{ borderColor: '#f3f4f6' }}>
                <span className="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center shrink-0" style={{ background: C.gold }}>{p.n}</span>
                <div>
                  <p className="font-semibold text-sm">{p.t}</p>
                  <p className="text-xs text-gray-500">{p.m}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'grafico' && (
        <div className="bg-white rounded-2xl p-6 border" style={{ borderColor: '#e5e7eb' }}>
          <h3 className="font-bold mb-4 text-gray-700">Evolución de Impresiones por Plataforma (4 semanas)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={v => `${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => [fmt(v), '']} />
              <Legend />
              <Line type="monotone" dataKey="instagram" stroke={C.orange} strokeWidth={2.5} dot={{ r: 4 }} name="Instagram" />
              <Line type="monotone" dataKey="meta" stroke="#1877F2" strokeWidth={2.5} dot={{ r: 4 }} name="Meta Ads" />
              <Line type="monotone" dataKey="google" stroke="#34A853" strokeWidth={2.5} dot={{ r: 4 }} name="Google Ads" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {tab === 'prompts' && (
        <div>
          {[
            'Con estos datos, armame un reporte semanal en formato ejecutivo para mi directora. Incluí highlights, alertas, y recomendaciones para la semana siguiente',
            'Identificá las 3 métricas más preocupantes y proponé acciones correctivas',
            'Convertí este reporte en un mail profesional de 5 líneas para el equipo de medios'
          ].map((t, i) => <PromptCard key={i} text={t} index={i + 1} />)}
          <InsightBox>Claude transforma datos crudos en reportes ejecutivos en segundos. Detecta anomalías, compara con benchmarks y redacta recomendaciones accionables listas para enviar a tu directora.</InsightBox>
        </div>
      )}
    </div>
  )
}

// ─── Module 4: Briefs Creativos ──────────────────────────────────────────────
function InfoRow({ label, value }) {
  return (
    <div className="flex gap-2 py-2.5 border-b text-sm" style={{ borderColor: '#f3f4f6' }}>
      <span className="font-semibold text-gray-500 w-36 shrink-0">{label}</span>
      <span style={{ color: C.text }}>{value}</span>
    </div>
  )
}

function Module4() {
  return (
    <div>
      <ModuleHeader num={4} title="Briefs Creativos" desc="Generá briefs completos para tu agencia con contexto estratégico." />
      <div className="bg-white rounded-2xl p-6 border mb-6" style={{ borderColor: '#e5e7eb' }}>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-white" style={{ background: C.gold }}>Brief de campaña</span>
        </div>
        <InfoRow label="Producto" value="Natura Tododia — nueva línea de body splash" />
        <InfoRow label="Objetivo" value="Lanzamiento Q2 2026, target 15.000 unidades primer mes" />
        <InfoRow label="Target" value="Mujeres 25–40, urbanas, NSE BC1, valoran autocuidado diario" />
        <InfoRow label="Insight" value='"Los pequeños rituales de cuidado son mi momento de reconexión conmigo misma"' />
        <InfoRow label="Presupuesto" value="ARS 3.500.000" />
        <InfoRow label="Mix de medios" value="40% Instagram · 25% TikTok · 20% Meta Ads · 15% Influencers" />
        <InfoRow label="Deadline" value="15 abril 2026" />
        <div className="mt-4 pt-3">
          <p className="text-xs font-semibold text-gray-500 mb-2">Benchmarks categoría:</p>
          <div className="flex flex-wrap gap-2">
            {['CTR IG: 1.2%', 'CPA beauty: $380', 'ER beauty IG: 2.8%'].map(b => (
              <span key={b} className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">{b}</span>
            ))}
          </div>
        </div>
      </div>
      {[
        'Con esta información, armame un brief creativo completo y profesional para enviarle a la agencia',
        'Generame 5 conceptos creativos para esta campaña con nombre, tagline y descripción de la idea visual',
        'Estimame un media plan detallado distribuyendo el presupuesto por plataforma, formato y semana'
      ].map((t, i) => <PromptCard key={i} text={t} index={i + 1} />)}
      <InsightBox>Claude puede generar briefs completos, conceptos creativos con nombre y tagline, y media plans detallados. Le das el contexto estratégico, él hace el trabajo pesado.</InsightBox>
    </div>
  )
}

// ─── Module 5: Automatización Cowork ─────────────────────────────────────────
const coworkCards = [
  { icon: FolderOpen, title: 'Organizar archivos de campaña', desc: 'Tengo 200 archivos de la campaña Día de la Madre mezclados. Cowork los clasifica por tipo (creativos, reportes, briefs) y los renombra con nomenclatura estándar.', time: '~2hs/semana' },
  { icon: FileText, title: 'Generar reportes desde Excel', desc: 'Le doy a Cowork acceso a mi carpeta de reportes y un Excel con datos de medios. Me genera un Word formateado con gráficos, listo para enviar.', time: '~3hs/semana' },
  { icon: Calendar, title: 'Monitoreo semanal programado', desc: 'Programo una tarea con /schedule para que los lunes a las 8am Cowork lea mis archivos de métricas actualizados y genere un resumen.', time: '~1hs/semana' },
  { icon: Receipt, title: 'Procesar facturas de proveedores', desc: 'Cowork lee PDFs de facturas de medios, extrae montos y fechas, y arma una planilla consolidada para Finanzas.', time: '~2hs/semana' },
  { icon: Presentation, title: 'Preparar presentaciones', desc: 'Le paso mis datos en un Excel y un brief. Cowork genera un .pptx con estructura, datos y diseño base listo para refinar.', time: '~3hs/semana' },
  { icon: Search, title: 'Auditoría de contenido', desc: 'Cowork revisa todos los copies de una carpeta y genera un reporte con inconsistencias de tono, errores y sugerencias de mejora.', time: '~1hs/semana' },
]

function Module5() {
  return (
    <div>
      <ModuleHeader num={5} title="Automatización con Cowork" desc="Casos de uso concretos para automatizar tu trabajo diario." />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {coworkCards.map((card, i) => {
          const Icon = card.icon
          return (
            <div key={i} className="bg-white rounded-2xl p-5 border hover:shadow-md transition-all hover:-translate-y-0.5 flex flex-col" style={{ borderColor: '#e5e7eb' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: '#fef3e2' }}>
                <Icon size={20} style={{ color: C.orange }} />
              </div>
              <p className="font-bold text-sm mb-2" style={{ color: C.text }}>{card.title}</p>
              <p className="text-xs text-gray-500 leading-relaxed flex-1">{card.desc}</p>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold" style={{ color: C.gold }}>
                <span>⏱</span>
                <span>Ahorra {card.time}</span>
              </div>
            </div>
          )
        })}
      </div>
      <InsightBox>Claude Cowork puede operar en tu computadora de forma autónoma: leer archivos, organizar carpetas, generar documentos y ejecutar tareas programadas. Es como tener un asistente digital que trabaja mientras vos te enfocás en lo estratégico.</InsightBox>
    </div>
  )
}

// ─── Module 6: Business Case ──────────────────────────────────────────────────
const businessCaseTemplate = `PROPUESTA: Implementación de Claude AI en Comunicación y Marketing

PARA: [Nombre Directora de Marketing]
DE: Florencia [Apellido], Coordinadora de Medios
FECHA: Marzo 2026

1. RESUMEN EJECUTIVO
Claude es el asistente de IA de Anthropic, diseñado con los más altos
estándares de seguridad empresarial. Propongo implementar licencias Team
para nuestro equipo de marketing (5-10 personas) para automatizar tareas
repetitivas y potenciar la productividad.

2. PROBLEMA ACTUAL
- Reportes semanales: ~4 horas/semana
- Creación de briefs creativos: ~3 horas cada uno
- Análisis de campañas: ~5 horas/semana
- Generación de contenido: ~6 horas/semana
- Organización de archivos: ~2 horas/semana
Total tareas automatizables: ~20 horas/semana

3. SOLUCIÓN PROPUESTA
Plan Team de Claude ($25 USD/usuario/mes ≈ $25.000 ARS/usuario/mes)
- 5 licencias iniciales: ~$125.000 ARS/mes
- Incluye: Claude Chat, Claude Code, Cowork, Projects compartidos
- Seguridad: SOC 2 Type II, datos no usados para entrenar modelos
- Admin panel con control de uso por usuario

4. ROI ESTIMADO
- Horas ahorradas: 20hs/semana × 4 = 80hs/mes
- Costo hora equipo: ARS 8.000/hora
- Valor recuperado: ARS 640.000/mes
- Inversión mensual: ARS 125.000
- ROI: 5.1x 🚀

5. PLAN DE IMPLEMENTACIÓN
Mes 1: Piloto con 3 usuarios (Florencia + 2 del equipo)
Mes 2: Evaluación de resultados y ajuste de workflows
Mes 3: Expansión a equipo completo (5-10 usuarios)

6. MÉTRICAS DE ÉXITO
- Reducción de tiempo en reportes: objetivo -60%
- Velocidad de creación de briefs: objetivo -50%
- Satisfacción del equipo: encuesta mensual
- Calidad de outputs: evaluación cualitativa directora

7. SEGURIDAD Y COMPLIANCE
- Claude Team no usa conversaciones para entrenar modelos
- Datos bajo estándares SOC 2 Type II
- Admin controla accesos, uso y presupuesto
- Compatible con políticas de datos corporativas`

function Module6() {
  const [text, setText] = useState(businessCaseTemplate)
  return (
    <div>
      <ModuleHeader num={6} title="Business Case para Natura" desc="Template listo para personalizar y presentarle a tu directora." />
      <div className="bg-white rounded-2xl p-5 border mb-4" style={{ borderColor: '#e5e7eb' }}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-white" style={{ background: C.green }}>Editable — personalizalo con tus datos</span>
          <button onClick={() => { navigator.clipboard.writeText(text) }} className="text-xs px-3 py-1 rounded-lg font-semibold flex items-center gap-1" style={{ color: C.gold, background: '#fef3c7' }}>
            <Copy size={11} /> Copiar todo
          </button>
        </div>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          className="w-full font-mono text-xs leading-relaxed resize-none outline-none"
          style={{ minHeight: 480, color: C.text }}
          rows={32}
        />
      </div>
      <PromptCard text="Tomá este template y personalizalo con datos reales de mi equipo. Hacelo más persuasivo y agregale una sección de riesgos y mitigación." index={1} />
      <InsightBox>Con este template como punto de partida, Claude puede personalizar el business case con los números reales de tu equipo, agregar análisis de riesgo y adaptarlo al estilo de comunicación de Natura.</InsightBox>
    </div>
  )
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function NaturaPlayground() {
  const [activeModule, setActiveModule] = useState(1)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [visited, setVisited] = useState(new Set([1]))

  const selectModule = (id) => {
    setActiveModule(id)
    setVisited(prev => new Set([...prev, id]))
    if (window.innerWidth < 768) setSidebarOpen(false)
  }

  const progress = visited.size
  const ModuleComponent = [Module1, Module2, Module3, Module4, Module5, Module6][activeModule - 1]

  return (
    <div className="min-h-screen flex flex-col" style={{ background: C.cream, color: C.text, fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <header className="sticky top-0 z-30 border-b bg-white px-4 py-3 flex items-center gap-3" style={{ borderColor: '#e5e7eb' }}>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 rounded-lg hover:bg-gray-100 md:hidden">
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌿</span>
            <span className="font-extrabold text-base" style={{ color: C.text }}>Natura IA Playground</span>
          </div>
          <p className="text-xs text-gray-400 hidden sm:block">Aprendé a usar Claude en tu trabajo de marketing</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold" style={{ color: C.orange }}>{progress} de 6 módulos</p>
            <div className="w-28 h-1.5 rounded-full bg-gray-200 mt-1">
              <div className="h-1.5 rounded-full transition-all" style={{ width: `${(progress / 6) * 100}%`, background: C.orange }} />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative">
        {/* Sidebar overlay for mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/30 z-20 md:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed md:sticky top-0 md:top-[57px] h-full md:h-[calc(100vh-57px)]
          z-20 md:z-auto
          w-64 bg-white border-r flex flex-col transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `} style={{ borderColor: '#e5e7eb' }}>
          <div className="p-4 border-b" style={{ borderColor: '#f3f4f6' }}>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Módulos</p>
          </div>
          <nav className="flex-1 overflow-y-auto p-2">
            {modules.map(m => {
              const Icon = m.icon
              const isActive = activeModule === m.id
              const isVisited = visited.has(m.id)
              return (
                <button key={m.id} onClick={() => selectModule(m.id)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 text-left transition-all"
                  style={{
                    background: isActive ? C.orange : 'transparent',
                    color: isActive ? '#fff' : C.text,
                  }}>
                  <span className="text-xs font-bold w-5 shrink-0" style={{ color: isActive ? '#fff' : C.orange }}>
                    {m.id < 10 ? `0${m.id}` : m.id}
                  </span>
                  <span className="text-sm font-semibold flex-1">{m.label}</span>
                  {isVisited && !isActive && <CheckCircle size={14} style={{ color: C.green }} />}
                  {isActive && <ChevronRight size={14} />}
                </button>
              )
            })}
          </nav>
          <div className="p-4 border-t" style={{ borderColor: '#f3f4f6' }}>
            <p className="text-xs text-gray-400 mb-1">{progress}/6 módulos completados</p>
            <div className="w-full h-2 rounded-full bg-gray-100">
              <div className="h-2 rounded-full transition-all" style={{ width: `${(progress / 6) * 100}%`, background: C.green }} />
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto min-w-0">
          <div className="max-w-3xl mx-auto">
            <ModuleComponent />
          </div>
        </main>
      </div>
    </div>
  )
}
