import { NextApiRequest, NextApiResponse } from 'next'
import { generateReport } from '@/lib/openai'
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { title, domain, technologies, userId, projectId } = req.body

    if (!title || !userId) {
      return res.status(400).json({ error: 'Title and userId are required' })
    }

    // Generate report using OpenAI
    const report = await generateReport({ title, domain, technologies })

    // Update or create project in database only if Supabase is configured
    if (isSupabaseConfigured() && supabaseAdmin) {
      try {
        const { data, error } = await supabaseAdmin
          .from('projects')
          .upsert({
            id: projectId,
            user_id: userId,
            title,
            domain,
            technologies,
            report,
            updated_at: new Date().toISOString()
          })
          .select()
          .single()

        if (error) {
          console.error('Database error:', error)
          // Continue without database save
        } else {
          projectId = data.id
        }
      } catch (dbError) {
        console.error('Database connection error:', dbError)
        // Continue without database save
      }
    } else {
      console.warn('Supabase not configured, skipping database save')
    }

    res.status(200).json({
      success: true,
      report,
      projectId
    })
  } catch (error) {
    console.error('API error:', error)
    res.status(500).json({ error: 'Failed to generate report' })
  }
}
