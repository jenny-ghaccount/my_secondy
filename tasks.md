# Implementation Tasks

## 1) Setup
- Create: index.html, styles.css, script.js, assets/
- Add semantic structure: header, main, footer, skip link

## 2) Background & Clouds
- Implement gradient sky in CSS
- Add 3–5 layered cloud divs positioned behind content
- Subtle float animation; gate with `prefers-reduced-motion`
- Hover-triggered rain on each cloud with JS; auto cleanup

## 3) City Selection (Europe)
- Text input with datalist suggestions
- Use Open‑Meteo Geocoding API (no key) to fill suggestions
- Filter results to Europe country codes
- Store last results to resolve selected city

## 4) Weather Widget
- On submit:
  - Resolve city to lat/lon
  - Fetch today’s forecast in Celsius via Open‑Meteo (current_weather + daily + hourly humidity)
  - Render: temp, condition, high/low, wind, humidity
- Loading spinner/skeleton
- Error messages

## 5) Accessibility & UX
- Labels, helper text
- Keyboard operable
- Visible focus ring
- `aria-live="polite"` for status/result updates

## 6) Performance
- Vanilla JS; no heavy libs
- Limit DOM nodes for rain particles
- Defer JS; efficient CSS

## 7) QA
- Test on Chrome, Firefox, Safari, Edge
- Check `prefers-reduced-motion`
- Validate AA contrast
- Verify Europe filter and Celsius units

## 8) Deployment
- Static hosting (GitHub Pages/Netlify/Vercel)
- README with usage notes

## 9) Optional
- Keyboard navigable suggestions list
- Recent cities (localStorage)
- Additional metrics (precipitation probability)