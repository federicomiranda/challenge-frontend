# Real-Time Analytics Dashboard

![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue) ![React](https://img.shields.io/badge/React-18.3-blue) ![Tests](https://img.shields.io/badge/tests-35%20passing-green) ![Build](https://img.shields.io/badge/build-passing-green)

Dashboard de métricas en tiempo real construido con React 18, TypeScript, y arquitectura escalable. Polling automático cada 5 segundos, visualización multi-escala, y manejo de errores.


## 🚀 Quick Start

```bash
# Instalar dependencias
npm install

# Desarrollo (requiere API corriendo en :4000)
npm run dev

# Tests
npm run test

# Build producción
npm run build
```


## 🎯 Tech Stack & Trade-offs

| Tecnología | Por qué
|------------|--------|
| **TanStack Query v5** | Polling automático, cache inteligente, offline support, retry logic |
| **Recharts 2.15** | Componentes React nativos, composable, TypeScript first |
| **date-fns 3** | Tree-shakeable, inmutable, moderno |
| **Vitest** | Integración nativa Vite, más rápido |
| **Tailwind CSS** | Utility-first, purge en build, DX |

## 🏗️ Arquitectura

### Separación en Capas

```
┌─────────────────────────────────────┐
│   UI Layer (components/)            │  ← Presentación pura, props tipadas
├─────────────────────────────────────┤
│   Hooks Layer (hooks/)              │  ← Lógica de negocio, state management
├─────────────────────────────────────┤
│   Utils Layer (utils/)              │  ← Pure functions, testables
├─────────────────────────────────────┤
│   API Layer (api/)                  │  ← Fetch, QueryClient, endpoints
└─────────────────────────────────────┘
```

**Beneficios:**
- Testabilidad
- Reusabilidad
- Separación de responsabilidades

### Decisiones Arquitecturales Clave

**1. TypeScript Strict**
- Prevención de bugs
- Documentación implícita

**2. Atomic Design Minimalista**
- Solo componentes reutilizados 2 veces o más

**3. 3 Gráficos Separados por Escala**
```
[Users Chart]    [Revenue Chart]
[       Churn Rate Chart       ]
```

## 🧪 Testing Strategy

**Enfoque: Pragmático, no exhaustivo**

### Qué Testeamos (35 tests)

| Capa | Coverage | Justificación |
|------|----------|---------------|
| **Utils** | 100% | Pure functions, críticas, fácil testear |
| **Hooks** | Core | useMetricsAnalytics (lógica condicional) |
| **Components** | Selectivo | KPICard (conditional rendering), Card (variants) |

### Qué NO Testeamos

- ❌ **Recharts internals** → Tested por la librería
- ❌ **Componentes sin lógica** → Badge, LoadingSpinner
- ❌ **Integration E2E** → Dashboard simple

**Target:** 60-70% coverage, balance entre confianza y maintainability.

**Trade-off consciente:** 100% coverage requiere mockar Recharts extensivamente.

## 📈 Preparación para Escalar

### Escenario 1: Crecimiento en el volúmen de datos

**Hoy:** 20 puntos por gráfico

**Si crece:**
1. **TanStack Virtual** para virtualizar lista de puntos
2. **Limitar ventana temporal** (últimos n puntos con botón "ver más")
3. **Lazy loading** de gráficos con `React.lazy()` + Suspense

### Escenario 2: Performance degrada

**Ya implementado:**
- React.memo en componentes estáticos
- useMemo en cálculos costosos
- TanStack Query cache (evita re-fetches)

**Próximas optimizaciones:**
1. **Bundle analysis** → `vite-plugin-bundle-analyzer`
2. **Code splitting** por feature
3. **Service Worker** para offline real (hoy: solo cache TanStack Query)
4. **CDN** para assets estáticos

**Principio:** No over-optimize anticipadamente. Medir primero, optimizar después.

## 🔄 Flujo de Datos

```
API (/metrics?count=20)
   ↓
TanStack Query (polling cada 5s)
   ↓
useMetrics hook (fetching + cache)
   ↓
useMetricsAnalytics (procesamiento)
   ↓
DashboardLayout (orchestration)
   ↓
Components (KPICard, Charts)
```

**Offline Handling:**
1. TanStack Query detecta error → `isError: true`
2. DashboardLayout muestra `<OfflineBanner />`
3. Cache mantiene últimos datos conocidos
4. Retry automático con backoff exponencial

---

## 💡 Decisiones Técnicas Destacadas

### 1. ¿Por qué 3 gráficos separados?

**Problema:** En gráfico único, churn rate (0-0.15) era una línea plana invisible junto a revenue (0-10,000).

**Alternativas consideradas:**
- Normalizar 0-100% (pierde valores absolutos)
- Multiplicar churn × 100 (engañoso)

### 2. ¿Por qué memo selectivo vs memo everywhere?

**Componentes que SÍ cambian cada 5s:** Charts (memo = overhead)
**Componentes que NO cambian:** Card, Badge (memo = ahorro)

---

## ♿ Accesibilidad

### Accesibilidad
- ✅ `aria-label` en KPICards
- ✅ `role="region"` en métricas
- ✅ `role="alert"` en banners
- ✅ Semantic HTML (h1, h2, h3, section)

## 🤔 Preguntas para Discutir

1. **¿Por qué Recharts sobre Chart.js?** → Trade-off bundle vs DX
2. **¿60% coverage es suficiente?** → Depende qué testeamos
3. **¿Cómo escalaría a 50 dashboards?** → Router + code split
4. **¿Por qué NO Redux/Zustand?** → TanStack Query suficiente para server state
5. **¿Implementarías SSR/SSG?** → No, dashboard requiere client-side real-time
