# ProjectPAL Deployment Guide

This guide will help you deploy ProjectPAL to Render with Supabase backend and OpenAI API integration.

## Prerequisites

1. **Supabase Account**: Create a new project at [supabase.com](https://supabase.com)
2. **OpenAI Account**: Get API key from [platform.openai.com](https://platform.openai.com)
3. **Render Account**: Sign up at [render.com](https://render.com)
4. **GitHub Repository**: Push your code to GitHub

## Step 1: Supabase Setup

### 1.1 Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note down your project URL and API keys

### 1.2 Set up Database Schema
1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the SQL commands from `supabase-schema.sql` to create all tables and policies

### 1.3 Configure Authentication
1. Go to Authentication > Settings in your Supabase dashboard
2. Enable email authentication
3. Configure your site URL (will be your Render app URL)

### 1.4 Get API Keys
1. Go to Settings > API in your Supabase dashboard
2. Copy the following:
   - Project URL
   - Anon public key
   - Service role key (keep this secret!)

## Step 2: OpenAI Setup

1. Go to [platform.openai.com](https://platform.openai.com)
2. Create an API key
3. Add some credits to your account (minimum $5 recommended)

## Step 3: Deploy to Render

### 3.1 Connect GitHub Repository
1. Go to [render.com](https://render.com) and sign in
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Select the ProjectPAL repository

### 3.2 Configure Build Settings
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Environment**: `Node`

### 3.3 Set Environment Variables
In the Render dashboard, add these environment variables:

```
NODE_ENV=production
OPENAI_API_KEY=your_openai_api_key_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
ADMIN_EMAIL=admin@projectpal.com
```

### 3.4 Deploy
1. Click "Create Web Service"
2. Render will automatically build and deploy your application
3. Wait for deployment to complete (usually 5-10 minutes)

## Step 4: Configure Custom Domain (Optional)

1. In your Render dashboard, go to your service settings
2. Add your custom domain
3. Update your Supabase authentication settings with the new domain

## Step 5: Test Deployment

### 5.1 Health Check
Visit `https://your-app-name.onrender.com/api/health` to verify the API is working.

### 5.2 Test Features
1. Open your deployed application
2. Try generating an abstract (free feature)
3. Test the payment flow
4. Verify data is being saved to Supabase

## Step 6: Production Monitoring

### 6.1 Render Logs
- Monitor your application logs in the Render dashboard
- Set up alerts for errors

### 6.2 Supabase Monitoring
- Check your Supabase dashboard for database usage
- Monitor API calls and storage usage

### 6.3 OpenAI Usage
- Monitor your OpenAI API usage and costs
- Set up usage alerts

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Environment (production) | Yes |
| `OPENAI_API_KEY` | OpenAI API key for content generation | Yes |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes |
| `ADMIN_EMAIL` | Admin email for notifications | Yes |

## Troubleshooting

### Common Issues

1. **Build Fails**
   - Check that all dependencies are in package.json
   - Verify Node.js version compatibility

2. **API Errors**
   - Check environment variables are set correctly
   - Verify Supabase and OpenAI API keys are valid

3. **Database Connection Issues**
   - Verify Supabase URL and keys
   - Check RLS policies are set correctly

4. **OpenAI API Errors**
   - Verify API key is correct
   - Check you have sufficient credits
   - Monitor rate limits

### Support

- Check Render logs for deployment issues
- Check Supabase logs for database issues
- Check OpenAI dashboard for API issues

## Security Considerations

1. **Never commit API keys** to your repository
2. **Use environment variables** for all sensitive data
3. **Enable RLS** in Supabase for data protection
4. **Monitor usage** to prevent unexpected costs
5. **Regular backups** of your Supabase database

## Scaling

As your application grows:

1. **Upgrade Render plan** for better performance
2. **Add caching** for frequently accessed data
3. **Implement rate limiting** for API endpoints
4. **Monitor costs** and optimize OpenAI usage
5. **Add CDN** for static assets

## Maintenance

1. **Regular updates** of dependencies
2. **Monitor logs** for errors
3. **Backup database** regularly
4. **Update API keys** when needed
5. **Monitor costs** and usage

---

Your ProjectPAL application should now be live and ready for students to use! 🎓
