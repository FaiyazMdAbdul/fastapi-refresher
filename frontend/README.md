# Product Management Frontend

A modern React + TypeScript frontend application for managing products, built with Vite, shadcn/ui, and Tailwind CSS.

## Features

- **Product Listing**: View all products in a responsive grid layout
- **Search & Filter**: Search products by name or description with real-time filtering
- **Create Products**: Add new products with form validation
- **Edit Products**: Update existing product information
- **Delete Products**: Remove products with confirmation dialog
- **Dark/Light Mode**: Toggle between themes with persistent preference
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **State Management**:
  - React Query (TanStack Query) for server state
  - Zustand for client state (theme)
- **Form Handling**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: Sonner

## Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher
- FastAPI backend running on `http://localhost:8000`

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.development
```

4. Update environment variables if needed:
```env
VITE_API_BASE_URL=http://localhost:8000
```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Build

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── api/                  # API client and endpoints
│   │   ├── client.ts        # Axios instance
│   │   └── products.ts      # Product API functions
│   ├── components/           # React components
│   │   ├── ui/              # shadcn/ui components
│   │   ├── common/          # Shared components
│   │   ├── layout/          # Layout components
│   │   └── products/        # Product-specific components
│   ├── hooks/               # Custom React hooks
│   │   ├── useProducts.ts   # React Query hooks
│   │   └── useDebounce.ts   # Debounce hook
│   ├── lib/                 # Utilities
│   │   ├── utils.ts         # Helper functions
│   │   └── validators.ts    # Zod schemas
│   ├── store/               # Zustand stores
│   │   └── themeStore.ts    # Theme state
│   ├── types/               # TypeScript types
│   │   └── product.ts       # Product interfaces
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── public/                   # Static assets
├── .env.development         # Development environment variables
├── components.json          # shadcn/ui configuration
├── tailwind.config.js       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
└── package.json             # Dependencies
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Integration

The frontend communicates with a FastAPI backend. Ensure the backend is running before starting the frontend.

### Endpoints Used

- `GET /products` - Fetch all products
- `GET /product/{id}` - Fetch single product
- `POST /product` - Create new product
- `PUT /product` - Update existing product
- `DELETE /product/{id}` - Delete product

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API URL | `http://localhost:8000` |

## Features in Detail

### Form Validation

All forms use Zod schemas that match the backend Pydantic models:
- Name: Required, minimum 1 character
- Price: Required, must be greater than 0
- Description: Required
- Quantity: Required, must be >= 0
- Image: Required, must be a valid URL

### Theme Persistence

Theme preference is stored in localStorage and automatically applied on app load.

### Search & Filter

Product search uses client-side filtering with debouncing (300ms) for optimal performance.

### Error Handling

- Toast notifications for all CRUD operations
- Error states in UI components
- Graceful image fallbacks

## Contributing

1. Follow the existing code style
2. Use TypeScript for type safety
3. Write clean, maintainable code
4. Test thoroughly before committing

## License

MIT
