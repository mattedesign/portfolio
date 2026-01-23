# Matthew Sparks - Interactive Portfolio

A modern, AI-powered portfolio website showcasing 18+ years of experience bridging Executive Strategy and AI Architecture.

## Features

- **Dark/Light Theme Toggle** - Adaptive design that works in both modes
- **Claude-Powered Role Fit Analyzer** - Paste any job description to get AI-powered fit analysis
- **Interactive Career Timeline** - Three-era progression from Leadership → Enterprise → AI Architecture
- **Project Case Studies** - Expandable narratives for key projects (Fr8, Figmant, Triumph, Epicor)
- **Responsive Design** - Works beautifully on mobile, tablet, and desktop

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect repo to [Vercel](https://vercel.com)
3. Deploy automatically

### Netlify
1. Push to GitHub
2. Connect repo to [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`

### Static Hosting
The `dist/` folder contains static files that can be hosted anywhere:
- GitHub Pages
- AWS S3 + CloudFront
- Any static file server

## Claude API Integration

The Role Fit Analyzer supports two modes:

1. **Demo Mode** (default) - Uses intelligent mock analysis based on job description keywords
2. **Live Mode** - Connect your Anthropic API key for real Claude-powered analysis

To enable live analysis:
1. Click "Add API Key" in the analyzer
2. Enter your Anthropic API key (sk-ant-...)
3. The analyzer will use Claude to provide personalized fit analysis

**Note:** The API key is only used client-side and is never stored.

## Customization

### Update Your Information
Edit the `CANDIDATE_PROFILE` and `CAREER_TIMELINE` objects in `src/App.jsx`:

```javascript
const CANDIDATE_PROFILE = {
  name: "Your Name",
  email: "your@email.com",
  // ... other details
};
```

### Update Projects
Modify the `PROJECTS` array to showcase your own work.

### Colors & Styling
- Primary color: Emerald (`#10b981`)
- Tailwind config: `tailwind.config.js`
- Custom styles: `src/index.css`

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Anthropic API** - Claude integration for role analysis

## License

MIT - Feel free to use this as a template for your own portfolio!
