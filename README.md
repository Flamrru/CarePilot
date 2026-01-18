# CarePilot - Spital zuhause

> Hospital at Home Platform for KSBL (Kantonsspital Baselland)

CarePilot is an interactive mockup demonstrating a comprehensive Hospital at Home solution. Built with Next.js 14, it showcases how healthcare professionals, patients, and family members can collaborate in home-based care delivery.

## Features

### Staff Dashboard
- **Daily Overview**: Patient status, alerts, and route summary
- **Patient Management**: List and map views with filtering
- **Route Planning**: Optimized daily routes with timeline view
- **AI Features**: Context-aware hints, ambient scribe, smart actions (simulated)
- **Notifications**: Priority-based alert management

### Patient App (Elderly-friendly)
- Large text and touch targets for accessibility
- Uber-style care team arrival tracking
- Diagnosis-specific daily questionnaires
- Medication tracking with confirmation
- Simple messaging with quick replies

### Family Portal
- Patient status overview
- Recent updates feed
- Communication with care team

## Demo Mode

Press `Ctrl+Shift+D` (or `Cmd+Shift+D` on Mac) anywhere to open the demo control panel:
- Trigger demo scenarios (critical alerts, new patients, etc.)
- Switch between light/dark themes
- Reset all data to initial state

Visit `/demo` for the full demo control panel.

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd CarePilot

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Mapbox GL JS token for maps | Optional* |

*Maps will show a placeholder if no token is provided.

## Deployment to Vercel

### Option 1: Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# For production deployment
vercel --prod
```

### Option 2: Git Integration

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository at [vercel.com/new](https://vercel.com/new)
3. Vercel will automatically detect Next.js and configure the build
4. Add environment variables in Vercel dashboard (Settings → Environment Variables)
5. Deploy!

### Environment Variables on Vercel

In your Vercel project settings, add:
- `NEXT_PUBLIC_MAPBOX_TOKEN` - Your Mapbox access token (optional)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── staff/             # Staff dashboard interface
│   ├── patient/           # Patient mobile interface
│   ├── family/            # Family portal
│   └── demo/              # Demo control panel
├── components/            # Reusable components
│   ├── demo/             # Demo mode components
│   ├── staff/            # Staff-specific components
│   ├── patient/          # Patient-specific components
│   └── family/           # Family-specific components
├── data/                  # Mock data (5 patients)
├── stores/                # Zustand state management
└── types/                 # TypeScript type definitions
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: Zustand
- **Maps**: Mapbox GL JS (optional)
- **Charts**: Recharts

## Mock Data

The app includes 5 simulated patients in the Laufental region:
1. **Hans Gerber** - Herzinsuffizienz (Heart failure)
2. **Maria Meier** - Pneumonie (Pneumonia)
3. **Peter Schmidt** - Post-OP Hüft-TEP (Hip replacement)
4. **Elisabeth Brunner** - Palliativ (Palliative care)
5. **Franz Huber** - COPD

All data is mock/simulated - no real patient information is used.

## License

Proprietary - KSBL/CarePilot

---

Built with care for KSBL by the CarePilot team.
