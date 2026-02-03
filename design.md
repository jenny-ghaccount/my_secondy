# Design Spec

## Brand & Visual Direction
- Style: Elegant, editorial, minimalist — inspired by high-end art direction
- Base color: Warm beige/cream (#E8E4DF)
- Atmosphere: Sophisticated, calm, refined; "gallery" feel
- Background: Solid warm beige with organic morphing shape accent
- Accents: Frosted glass cards, subtle borders, no harsh shadows

## Layout
- Header: Stacked logo (EURO/WEATHER) left, circular menu button right
- Hero: Artistic typographic composition with mixed styles ("the BEAUTY of WEATHER")
- Weather Card: Elegant glassmorphism card with serif typography
- Footer: Minimal with wave symbol and data attribution

## Components
- City Selector:
  - Minimalist underline input with serif italic placeholder
  - Circular arrow button for submission
  - Clear label in uppercase sans-serif
- Forecast Card:
  - Frosted glass background with backdrop blur
  - Serif typography for city name and temperature
  - Clean grid layout for weather details
  - Loading skeleton and error states
- CTA Button:
  - Circular with thin border
  - Inverts on hover (dark fill, light text)
  - Arrow icon as label

## Decorative Elements
- Organic Shape: Centered morphing blob with gradient, slowly animating border-radius
- Circles: Two decorative outlined circles on the right side with subtle pulse
- Clouds: Minimal, frosted glass style clouds with blur effect
- Easter Egg: On cloud hover, subtle rain animation (respects prefers-reduced-motion)

## Typography
- Serif: Cormorant Garamond (headings, hero, temperatures, inputs)
- Sans-serif: DM Sans (labels, body, UI elements)
- Hero sizes: clamp(3rem, 10vw, 8rem) for dramatic scaling
- Mixed styles: Uppercase titles paired with italic accents
- Weights: 400/500 for elegant, light feel

## Color Tokens
- Background: #E8E4DF (warm beige)
- Background Warm: #DDD8D2 (slightly darker)
- Text: #1A1A1A (near black)
- Text Light: #4A4A4A (dark gray)
- Muted: #8A8A8A (medium gray)
- Surface: rgba(255, 255, 255, 0.7) (frosted glass)
- Accent Light: #C4B8A8 (warm taupe)
- Error: #8B4049 (muted burgundy)

## Motion
- Organic shape morph: 20s loop, fluid border-radius animation
- Circle pulse: 8s loop, subtle scale and opacity
- Cloud float: 25-30s loop, gentle movement
- Rain: 0.8s particle drop, subtle gray color
- All animations honor prefers-reduced-motion

## Accessibility
- Contrast AA compliant
- Labels for all inputs/buttons
- Keyboard navigation with visible focus rings
- Skip link for main content
- aria-live for weather results
- Decorative elements are aria-hidden

## Responsive Behavior
- Mobile-first with fluid typography (clamp)
- Hero stacks vertically on small screens
- Weather card details stack on mobile
- Decorative circles hidden on mobile
- Organic shape scales down
- Clouds reduce in size and opacity

## Icons
- Minimal emoji-based weather icons with slight desaturation (grayscale filter)
- Arrow for submit button
- Wave symbol for footer decoration

## Tone
- Refined, artistic, trustworthy
- Elegant italic taglines
- Minimal, purposeful copy
