# Schrute Client

A modern task management application built with Next.js, featuring AI integration and Telegram notifications.

## Features

- Task management with drag-and-drop functionality
- AI-powered task assistance
- Telegram integration for notifications
- Modern UI with Tailwind CSS and shadcn/ui components
- Type-safe development with TypeScript
- State management with Zustand
- Form handling with React Hook Form and Zod validation
- API integration with Appwrite

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
├── services/         # API and external service integrations
│   ├── ai/          # OpenAI integration
│   ├── task/        # Task management
│   └── telegram/    # Telegram bot integration
└── types/           # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
