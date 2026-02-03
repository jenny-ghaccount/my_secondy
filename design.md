# Design Spec

## Brand & Visual Direction
- Base color: Blue (primary: #2563EB, deep: #1E3A8A)
- Atmosphere: Soft, airy, calm; “sky” feel
- Background: Subtle gradient sky with layered soft cloud shapes (CSS/SVG), low contrast
- Accents: White cards, soft shadows, rounded corners

## Layout
- Header: Site title/logo (text)
- Hero: Headline, short subhead, city selector (Europe), “Get forecast” CTA
- Weather Card: Today’s forecast in Celsius (temp, condition icon, high/low, wind, humidity)
- Footer: Minimal links/copyright

## Components
- City Selector:
  - Text input + datalist suggestions (Europe cities via geocoding API)
  - Clear label; keyboard-friendly
- Forecast Card:
  - Location name, date (local), condition icon, temperature °C
  - Secondary metrics (wind, humidity, high/low)
  - Loading and error states
- CTA Button:
  - Prominent primary blue, high contrast, clear focus ring

## Clouds & Easter Egg
- Clouds: Soft white shapes using CSS with subtle float animation
- Easter Egg: On cloud hover, brief rain animation over that cloud (2–3 seconds), respects `prefers-reduced-motion`
- Decorative only; not focusable by keyboard

## Typography
- Font: Inter or system UI stack
- Sizes: 16px base; scale up in hero; readable line-length
- Weights: 400/600/700

## Color Tokens
- Primary: #2563EB, Contrast: #FFFFFF
- Text: #1F2937, Muted: #6B7280
- Surface: #FFFFFF, Subsurface: #F1F5F9

## Motion
- Cloud float: 20–40s loop, very subtle
- Rain: particle drop animation, limited count, 2–3s then cleanup
- Honor `prefers-reduced-motion`

## Accessibility
- Contrast AA
- Labels for inputs/buttons
- Keyboard navigation
- Skip link; `aria-live` for results
- Clouds are `aria-hidden`

## Responsive Behavior
- Mobile-first single-column on small screens
- Weather card scales; typography adjusts
- Clouds adapt to viewport without obstructing content

## Icons
- Minimal inline icons for conditions (sun, cloud, rain, fog, snow, thunder)

## Tone
- Friendly, clear, trustworthy; concise copy