# Chat Interface Project Setup

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn

## Installation Steps

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies
   ```bash
   npm install
   # or if you use yarn
   yarn
   ```

3. Start the development server
   ```bash
   npm run dev
   # or if you use yarn
   yarn dev
   ```

4. Browser will open automatically
   - The application will open at http://localhost:5173
   - If it doesn't open automatically, click the link in the terminal

## Project Structure

- `/src/components/chat` - Contains all chat interface components
- `/src/components/ui` - Contains UI components from shadcn/ui
- `/src/lib` - Utility functions and services

## Environment Variables

If you plan to connect to Supabase later, you'll need to create a `.env` file with:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
