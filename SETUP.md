# ProjectPAL Setup Guide

## Prerequisites

- Node.js 18+ installed
- OpenAI API key
- Supabase account (free tier available)

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Create a `.env.local` file in the root directory:

```bash
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### 3. Supabase Database Setup

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Run this SQL in your Supabase SQL editor:

```sql
-- Users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  subscription VARCHAR(50) DEFAULT 'free',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  title VARCHAR(500) NOT NULL,
  domain VARCHAR(255),
  technologies TEXT,
  abstract TEXT,
  report TEXT,
  ppt_slides JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Payments table
CREATE TABLE payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  transaction_id VARCHAR(255) UNIQUE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  tier VARCHAR(50) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
```

3. Get your Supabase credentials from Project Settings > API
4. Update your `.env.local` file with the credentials

### 4. Run the Application
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Features

- **AI-Powered Content Generation**: Generate abstracts, reports, and presentations
- **Professional UI**: Modern, responsive design with premium features
- **Payment Integration**: Pro and Premium subscription tiers
- **User Management**: Secure authentication and project storage
- **Export Options**: Multiple format support for generated content

## Production Deployment

### Environment Variables for Production
Set these in your deployment platform:

- `OPENAI_API_KEY`: Your OpenAI API key
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key
- `NODE_ENV`: Set to `production`

### Build and Deploy
```bash
npm run build
npm start
```

## Troubleshooting

### Common Issues

1. **OpenAI API Errors**: Ensure your API key is valid and has sufficient credits
2. **Supabase Connection Issues**: Verify your database credentials and network access
3. **Build Errors**: Check that all environment variables are set correctly

### Support

For issues and questions, please check the project documentation or create an issue in the repository.
