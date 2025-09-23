const fs = require('fs')
const path = require('path')

console.log('🔍 Checking Supabase configuration...\n')

// Check if .env.local exists and has Supabase config
const envPath = path.join(__dirname, '.env.local')
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8')
  
  console.log('📁 Found .env.local file')
  
  // Check for Supabase variables
  const hasSupabaseUrl = envContent.includes('NEXT_PUBLIC_SUPABASE_URL=')
  const hasSupabaseAnonKey = envContent.includes('NEXT_PUBLIC_SUPABASE_ANON_KEY=')
  const hasSupabaseServiceKey = envContent.includes('SUPABASE_SERVICE_ROLE_KEY=')
  
  console.log(`✅ Supabase URL configured: ${hasSupabaseUrl}`)
  console.log(`✅ Supabase Anon Key configured: ${hasSupabaseAnonKey}`)
  console.log(`✅ Supabase Service Key configured: ${hasSupabaseServiceKey}`)
  
  if (hasSupabaseUrl && hasSupabaseAnonKey && hasSupabaseServiceKey) {
    console.log('\n🎉 Supabase appears to be fully configured!')
    console.log('🚀 You can test the application now.')
  } else {
    console.log('\n⚠️  Supabase configuration is incomplete.')
    console.log('📝 You need to update .env.local with your Supabase credentials.')
  }
} else {
  console.log('❌ No .env.local file found')
}

// Check for database schema
const schemaPath = path.join(__dirname, 'supabase-schema.sql')
if (fs.existsSync(schemaPath)) {
  console.log('\n✅ Found supabase-schema.sql - Database schema is ready!')
} else {
  console.log('\n❌ No supabase-schema.sql found')
}

console.log('\n📋 Next steps:')
console.log('1. If you have existing Supabase credentials, update .env.local')
console.log('2. If not, create a new Supabase project at https://supabase.com')
console.log('3. Run the SQL from supabase-schema.sql in your Supabase SQL editor')
console.log('4. Copy your project URL and keys to .env.local')
console.log('5. Test the application!')
