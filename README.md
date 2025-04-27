# ManagemateAI

A modern task management application built with Next.js, featuring AI integration and Telegram notifications.

## Features

- Task management with drag-and-drop functionality
- AI-powered task assistance and suggestions
- Telegram integration for notifications
- Modern UI with Tailwind CSS and shadcn/ui components
- Type-safe development with TypeScript
- State management with Zustand
- Form handling with React Hook Form and Zod validation
- API integration with Appwrite
- Custom hooks for reusable logic
- Utility functions for common operations
- Data models for type-safe data handling
- Service layer for external integrations
- AI-powered PRD document processing (.docx) for automated task creation

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (built on Radix UI)
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod
- **API Client**: Appwrite
- **AI Integration**: OpenAI
- **Messaging**: Telegram
- **Data Fetching**: TanStack Query
- **Routing**: Next.js App Router
- **Development Tools**: ESLint, TypeScript

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- Yarn or npm
- Telegram Bot Token
- OpenAI API Key
- Appwrite Project Configuration

### Environment Setup

1. Copy the environment variables:

```bash
cp .env.example .env.local
```

2. Update the `.env.local` file with your API keys and configuration:

```
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
OPENAI_API_KEY=your_openai_api_key
APPWRITE_ENDPOINT=your_appwrite_endpoint
APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APP_URL=your_app_url
```

### Installation

1. Install dependencies:

```bash
yarn install
# or
npm install
```

2. Run the development server:

```bash
yarn dev
# or
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn build:verify` - Verify build with linting

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # Reusable UI components
├── hooks/           # Custom React hooks
├── lib/             # Library configurations and utilities
├── models/          # Data models and type definitions
├── services/        # API and external service integrations
│   ├── ai/         # OpenAI integration
│   ├── task/       # Task management
│   └── telegram/   # Telegram bot integration
├── store/           # Zustand state management
└── utils/           # Utility functions and helpers
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
