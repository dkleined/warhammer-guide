# Warhammer 40,000 11th Edition Guide

A comprehensive step-by-step guide for playing Warhammer 40,000 11th Edition, built with Next.js and daisyUI.

## Features

- **Step-by-Step Guide**: Walk through every phase of the game with detailed instructions
- **Phase Progress Indicator**: Visual progress through Command → Movement → Shooting → Charge → Fight
- **Dice Roller**: Built-in dice roller for charges, advances, battle-shock, and more
- **CP Tracker**: Track Command Points for both players
- **Wound Calculator**: Quick S vs T wound roll calculator
- **Quick Reference**: Context-aware stratagems and rules reference
- **Faction Support**: General rules + World Eaters specific tips
- **Mobile Optimized**: Responsive design with floating tools button on mobile
- **PWA Ready**: Install as an app on your phone
- **Dark/Light Theme**: Toggle between themes

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/warhammer-guide)

1. Push this repo to GitHub
2. Import to Vercel
3. Deploy (no environment variables needed)

## Tech Stack

- **Next.js 15** - React framework
- **Tailwind CSS 3** - Utility-first CSS
- **daisyUI 4** - Tailwind component library
- **TypeScript** - Type safety

## Adding More Factions

To add faction-specific tips, edit `src/lib/data.ts`:

1. Add a new `TIPS_YOUR_FACTION` object following the `TIPS_WORLD_EATERS` pattern
2. Update `getTipsFor()` function to include your faction
3. Add the faction option to the selector in `WarhammerGuide.tsx`

## License

This is a fan-made tool. Warhammer 40,000 is a trademark of Games Workshop Ltd.
"# warhammer-guide" 
