# Mascula Cargo Frontend

This is a [Next.js](https://nextjs.org) project bootstrapped with Next.js 15 and React 19.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## Project Structure

```
mascula-cargo-front/
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout component
│   │   ├── page.tsx         # Home page
│   │   └── page.module.css  # Page-specific styles
│   └── assets/              # Static assets (images, icons, etc.)
├── public/                  # Public static files
├── next.config.ts           # Next.js configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Project dependencies

```

## Available Scripts

- `npm run dev` - Starts the development server on port 3000
- `npm run build` - Creates an optimized production build
- `npm start` - Starts the production server (run after build)
- `npm run lint` - Runs ESLint to check for code issues

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Next.js App Router](https://nextjs.org/docs/app) - learn about the App Router architecture.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
