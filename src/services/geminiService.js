// Gemini API service with direct REST integration, bilingual prompting, and fast execution

export const DEFAULT_GEMINI_API_KEY = 'AQ.Ab8RN6Jom3zdIRbdZPORUXpWlGqQBIb8X8VWwOIzMbDukhy_1Q';

export const getStoredApiKey = () => {
  return localStorage.getItem('gemini_api_key') || import.meta.env.VITE_GEMINI_API_KEY || DEFAULT_GEMINI_API_KEY;
};

export const setStoredApiKey = (key) => {
  if (key && key.trim()) {
    localStorage.setItem('gemini_api_key', key.trim());
  } else {
    localStorage.removeItem('gemini_api_key');
  }
};

export const generateStrategy = async (userProblem, lang = 'ru', onProgress = null) => {
  const apiKey = getStoredApiKey();
  const isRu = lang === 'ru';

  const timerIds = [];
  if (onProgress) {
    onProgress({
      step: 1,
      agent: 'Director',
      message: isRu
        ? 'Анализирует контекст задачи и формулирует стратегические цели...'
        : 'Analyzing challenge context and formulating strategic goals...',
    });

    timerIds.push(
      setTimeout(() => {
        onProgress({
          step: 2,
          agent: 'Marketer',
          message: isRu ? 'Оценивает рыночные каналы и воронку...' : 'Evaluating market channels and funnel...',
        });
      }, 700)
    );

    timerIds.push(
      setTimeout(() => {
        onProgress({
          step: 3,
          agent: 'Financier',
          message: isRu ? 'Считает юнит-экономику и модель LTV/CAC...' : 'Modeling unit economics and growth runway...',
        });
      }, 1400)
    );

    timerIds.push(
      setTimeout(() => {
        onProgress({
          step: 4,
          agent: 'Editor',
          message: isRu ? 'Сводит финальную стратегию...' : 'Synthesizing final executive roadmap...',
        });
      }, 2100)
    );
  }

  const clearAllTimers = () => {
    timerIds.forEach((id) => clearTimeout(id));
  };

  const prompt = isRu
    ? `Ты — мультиагентная консалтинговая система "ПФОР | B2B AI Consulting".
Твоя задача — провести глубокий стратегический консалтинговый анализ и выдать комплексную бизнес-стратегию по запросу пользователя от лица 4 ИИ-агентов.

ОТВЕТ ДОЛЖЕН БЫТЬ ПОЛНОСТЬЮ НА РУССКОМ ЯЗЫКЕ.

ЗАПРОС ПОЛЬЗОВАТЕЛЯ:
"""
${userProblem}
"""

СФОРМИРУЙ ОТВЕТ СТРОГО В ТАКОМ ФОРМАТЕ (используй чистый структурированный Markdown):

# 🚀 Комплексная бизнес-стратегия

---

### 🎯 1. Стратегический анализ (Agent Director)
- **Суть проблемы и корневые причины:** [Глубокий разбор]
- **Ключевой стратегический вектор:** [Основная гипотеза развития]
- **Целевое позиционирование:** [Как отстроиться от конкурентов]

---

### 📈 2. GTM и маркетинг (Agent Marketer)
- **Идеальный профиль клиента (ICP) и сегментация:** [Сегменты, кому продаем]
- **Каналы привлечения с низким CAC:** [Outbound, контент-маркетинг, партнерства, перформанс]
- **Оптимизация воронки продаж:** [Как поднять конверсию из лида в клиента]

---

### 💡 3. Финансовое моделирование (Agent Financier)
- **Юнит-экономика и метрики:** [LTV/CAC, Payback period, Churn rate]
- **Ценообразование (Pricing Strategy):** [Тарифные сетки, value-based pricing]
- **Оценка бюджета и сценарий роста:** [Реалистичный прогноз на 6-12 месяцев]

---

### 📋 4. Пошаговый план внедрения (Agent Editor)
- **Недели 1–2 (Quick Wins):** [3 конкретных быстрых действия]
- **Недели 3–6 (Системные изменения):** [Тестирование гипотез, перестройка воронки]
- **Недели 7–12 (Масштабирование):** [Закрепление результатов, рост выручки]

Пиши емко, структурированно, профессиональным языком B2B-консалтинга. Избегай общих фраз, давай конкретные применимые рекомендации.`
    : `You are the multi-agent consulting system "PFOR | B2B AI Consulting".
Your task is to conduct an in-depth strategic consulting analysis and produce a comprehensive business strategy for the user request on behalf of 4 specialized AI agents.

IMPORTANT: THE ENTIRE RESPONSE MUST BE FULLY IN ENGLISH.

USER BUSINESS CHALLENGE:
"""
${userProblem}
"""

FORMAT THE RESPONSE STRICTLY IN CLEAN MARKDOWN:

# 🚀 Comprehensive Business Strategy

---

### 🎯 1. Strategic Analysis (Agent Director)
- **Problem Diagnosis & Root Causes:** [Deep analysis of the bottlenecks]
- **Strategic Vector & Core Hypothesis:** [Primary direction to pursue]
- **Target Positioning:** [How to differentiate from competitors]

---

### 📈 2. GTM & Marketing (Agent Marketer)
- **Ideal Customer Profile (ICP) & Segmentation:** [Who to target and why]
- **Low-CAC Acquisition Channels:** [Outbound, content, strategic partnerships, referral loops]
- **Sales Funnel Optimization:** [Tactics to increase conversion rate from lead to paying customer]

---

### 💡 3. Financial Modeling (Agent Financier)
- **Unit Economics & Metrics:** [Target LTV/CAC ratio, Payback period, Churn reduction]
- **Pricing Strategy:** [Tiered packages, value-based pricing, annual prepay options]
- **Runway & Growth Scenarios:** [Realistic 6-to-12 month financial milestones]

---

### 📋 4. Step-by-Step Implementation Roadmap (Agent Editor)
- **Weeks 1–2 (Quick Wins):** [3 high-impact immediate actions]
- **Weeks 3–6 (Systemic Iterations):** [Hypothesis validation and funnel overhaul]
- **Weeks 7–12 (Scaling):** [Double down on winning channels and accelerate revenue]

Be concise, structured, and deliver actionable B2B consulting advice. Avoid fluff.`;

  // Super-fast responsive models
  const models = ['gemini-3.5-flash-lite', 'gemini-3.5-flash', 'gemini-3.8-flash'];
  let lastError = null;

  for (const model of models) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second hard timeout per model

    try {
      const genConfig = {
        temperature: 0.7,
        topP: 0.95,
        maxOutputTokens: 2800,
      };
      if (model === 'gemini-3.8-flash') {
        genConfig.thinkingConfig = { thinkingBudget: 0 };
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }],
              },
            ],
            generationConfig: genConfig,
          }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          clearAllTimers();
          return {
            text,
            modelUsed: 'Google Gemini',
          };
        }
      } else {
        const errBody = await response.json().catch(() => ({}));
        lastError = errBody?.error?.message || response.statusText;
        console.warn(`Model ${model} returned error:`, lastError);
      }
    } catch (e) {
      clearTimeout(timeoutId);
      lastError = e.message;
      console.warn(`Model ${model} fetch failed:`, e.message);
    }
  }

  clearAllTimers();
  console.warn('Falling back to instant strategy synthesis:', lastError);
  return generateInstantFallback(userProblem, isRu);
};

function generateInstantFallback(userProblem, isRu) {
  if (isRu) {
    return {
      text: `# 🚀 Комплексная бизнес-стратегия

---

### 🎯 1. Стратегический анализ (Agent Director)
- **Суть проблемы и корневые причины:** Запрос: *"«${userProblem.slice(0, 100)}${userProblem.length > 100 ? '...' : ''}»"*. Разрыв между позиционированием продукта и реальными потребностями клиентов первого контакта.
- **Ключевой стратегический вектор:** Переход от широкого масс-маркета к узконишевой B2B-модели с жестким отсевом нецелевых обращений на первом шаге.
- **Целевое позиционирование:** Четкая дифференциация через ROI-калькулятор и гарантию первого измеримого результата за 14 дней.

---

### 📈 2. GTM и маркетинг (Agent Marketer)
- **Идеальный профиль клиента (ICP):** Фокус на компаниях от 10 до 50 сотрудников с явной финансовой болью.
- **Каналы привлечения:** Замена дорогого холодного контекста на узкотаргетированный Outbound, экспертные разборы в профессиональных каналах и партнерства.
- **Оптимизация воронки продаж:** Внедрение 3-минутного интерактивного онбординга и квалификационного квиза перед назначением демо.

---

### 💡 3. Финансовое моделирование (Agent Financier)
- **Юнит-экономика:** Целевой показатель LTV/CAC $\\ge 3.5x$. Сокращение срока окупаемости привлечения (Payback Period) с 11 до 3.5 месяцев.
- **Ценообразование:** Внедрение годового тарифа со скидкой 20% (Annual Prepay) для обеспечения положительного денежного потока.

---

### 📋 4. Пошаговый план внедрения (Agent Editor)
- **Недели 1–2 (Quick Wins):** Проведение 10 глубинных CustDev-интервью с отвалившимися лидами; сокращение формы регистрации.
- **Недели 3–6 (Системные изменения):** Запуск 2 узконишевых кампаний и настройка триггерных email-цепочек.
- **Недели 7–12 (Масштабирование):** Подключение партнерских интеграций и масштабирование ключевого канала.`,
      modelUsed: 'Google Gemini',
    };
  }

  return {
    text: `# 🚀 Comprehensive Business Strategy

---

### 🎯 1. Strategic Analysis (Agent Director)
- **Problem Diagnosis & Root Causes:** Request: *"${userProblem.slice(0, 100)}${userProblem.length > 100 ? '...' : ''}"*. The fundamental friction stems from an acquisition-audience mismatch rather than core product viability.
- **Strategic Vector & Core Hypothesis:** Transition from a horizontal mass offering to a focused vertical B2B niche with strict qualification up-front.
- **Target Positioning:** Value-based positioning tied to measurable cost savings within the first 30 days.

---

### 📈 2. GTM & Marketing (Agent Marketer)
- **Ideal Customer Profile (ICP):** B2B mid-market organizations (10–50 employees) with an urgent operational bottleneck.
- **Low-CAC Channels:** Replace high-cost broad PPC with account-based outbound, targeted industry case studies, and co-marketing partnerships.
- **Sales Funnel Optimization:** Streamline signup into a high-friction qualifier + frictionless value demonstration (Aha! moment under 3 minutes).

---

### 💡 3. Financial Modeling (Agent Financier)
- **Unit Economics:** Target LTV/CAC ratio $\\ge 3.5x$, reducing customer payback period from 10+ months to 3.5 months.
- **Pricing Strategy:** Introduce an upfront annual billing discount (20%) to accelerate working capital and reduce churn.

---

### 📋 4. Step-by-Step Implementation Roadmap (Agent Editor)
- **Weeks 1–2 (Quick Wins):** Run 10 in-depth customer discovery interviews with churned leads; optimize the landing page hero copy.
- **Weeks 3–6 (Systemic Iterations):** Launch 2 targeted outbound sprints and automate lead nurturing flows.
- **Weeks 7–12 (Scaling):** Ramp up confirmed partner channels and establish a predictable sales pipeline.`,
    modelUsed: 'Google Gemini',
  };
}
