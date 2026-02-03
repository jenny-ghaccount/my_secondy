# Requirements

## Functional
- User can select a city in Europe
- On submit, show today’s forecast in Celsius for the selected city
- Display: temperature (°C), condition, high/low, wind speed, humidity, city name
- Soft cloud background; cloud hover triggers brief rain animation

## Data Source (Free, No Key)
- Open‑Meteo APIs (CORS-friendly)
  - Geocoding: https://geocoding-api.open-meteo.com/v1/search?name={city}&count=5&language=en
  - Forecast: https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true&hourly=relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min&timezone=auto

## Non-Functional
- Accessibility: WCAG 2.1 AA
- Performance: Lighthouse ≥ 90
- Responsive: 360px–1200px+
- Browser: Latest Chrome, Firefox, Safari, Edge
- Security: No secrets in client
- Privacy: No tracking; minimal network calls

## UX
- Clear CTA: “Get forecast”
- Keyboard-friendly city input and submit
- Loading and error states
- Local date/time for city

## Europe Filter
- Restrict geocoding results to Europe via country code allowlist

## Visual Tokens
- Colors: Primary #2563EB; Text #1F2937; Muted #6B7280; Surface #FFFFFF; Subsurface #F1F5F9
- Radius: 12px; Shadow: soft
- Font: Inter or system UI

## Error Handling
- City not found: “City not found. Try another in Europe.”
- Forecast fails: “Couldn’t load forecast. Please try again.”
- Offline: “You appear to be offline.”

## Out of Scope (MVP)
- Multi-day forecast beyond today
- Accounts/auth
- Server-side rendering