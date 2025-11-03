# AI Websites

A modern, professional Next.js application built with TypeScript and Tailwind CSS. This project provides a clean, organized foundation for building scalable web applications.

## 🚀 Tech Stack

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS v4** - Utility-first CSS framework
- **ESLint** - Code linting and quality

## 📁 Project Structure

```
aiwebsites/
├── src/
│   ├── app/              # Next.js App Router pages and layouts
│   │   ├── layout.tsx    # Root layout component
│   │   ├── page.tsx      # Home page
│   │   └── globals.css   # Global styles and Tailwind imports
│   ├── components/       # Reusable React components
│   │   ├── ui/          # UI component library
│   │   │   └── Button.tsx
│   │   └── index.ts     # Component exports
│   ├── lib/             # Utility functions and helpers
│   │   └── utils.ts     # Common utilities (e.g., cn for className merging)
│   ├── types/           # TypeScript type definitions
│   │   └── index.ts     # Global types
│   ├── hooks/           # Custom React hooks
│   └── utils/           # Additional utility functions
├── public/              # Static assets
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── next.config.ts       # Next.js configuration
└── README.md            # This file
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Styling with Tailwind CSS

This project uses Tailwind CSS v4 with the new CSS-based configuration. Tailwind is configured in `src/app/globals.css`:

```css
@import "tailwindcss";
```

You can customize your theme directly in the CSS file using CSS variables and the `@theme` directive.

## 🧩 Using Components

Components are organized in `src/components/`. Import them using the `@/` alias:

```tsx
import { Button } from "@/components/ui/Button";
```

## 🛠️ Utilities

### Class Name Merging

Use the `cn` utility function to merge Tailwind classes:

```tsx
import { cn } from "@/lib/utils";

<div className={cn("base-class", condition && "conditional-class")} />;
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 🤝 Contributing

This is a professional foundation project. Feel free to extend it with:

- Additional UI components
- Custom hooks
- API routes
- Database integration
- Authentication
- And more!

## 📄 License

This project is private and proprietary.
