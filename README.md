# Euro Weather - European Weather Forecast

A simple, accessible weather forecast app for European cities. Built with vanilla HTML, CSS, and JavaScript.

![Euro Weather Preview](preview.png)

## Features

- 🌍 **European Cities** - Search and get forecasts for cities across Europe
- 🌡️ **Current Weather** - Temperature, conditions, high/low, wind speed, humidity
- ☁️ **Beautiful UI** - Sky gradient background with animated floating clouds
- 🌧️ **Easter Egg** - Hover over clouds to trigger a rain animation
- ♿ **Accessible** - WCAG 2.1 AA compliant with keyboard navigation
- 📱 **Responsive** - Works on mobile (360px) to desktop (1200px+)
- 🔒 **Privacy-Focused** - No tracking, no API keys required

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox, animations
- **JavaScript** - Vanilla ES6+, no dependencies
- **API** - [Open-Meteo](https://open-meteo.com/) (free, no key required)

## Getting Started

### Local Development

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd my_secondy
   ```

2. Open `index.html` in your browser, or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve
   ```

3. Visit `http://localhost:8000`

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project" and import your repository
4. Vercel will auto-detect it as a static site
5. Click "Deploy"

That's it! No build configuration needed.

### Deploy to GitHub Pages

1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Select "Deploy from a branch"
4. Choose `main` branch and `/ (root)` folder
5. Save and wait for deployment

## Project Structure

```
my_secondy/
├── index.html      # Main HTML file
├── styles.css      # All styles
├── script.js       # Application logic
├── README.md       # This file
├── design.md       # Design specifications
├── requirements.md # Feature requirements
└── tasks.md        # Implementation tasks
```

## API Reference

This app uses the free [Open-Meteo API](https://open-meteo.com/):

- **Geocoding**: `https://geocoding-api.open-meteo.com/v1/search`
- **Forecast**: `https://api.open-meteo.com/v1/forecast`

No API key required. CORS-friendly.

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## Accessibility

- Skip link for keyboard users
- Proper heading hierarchy
- Form labels and ARIA attributes
- Focus indicators
- `aria-live` regions for dynamic content
- Respects `prefers-reduced-motion`

## License

MIT License - feel free to use this for your own projects!

## Credits

- Weather data by [Open-Meteo](https://open-meteo.com/)
- Font: [Inter](https://rsms.me/inter/)
