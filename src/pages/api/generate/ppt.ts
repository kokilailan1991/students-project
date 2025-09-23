import { NextApiRequest, NextApiResponse } from 'next'
import { generatePPT } from '@/lib/openai'
import { supabaseAdmin } from '@/lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { title, domain, technologies, userId, projectId } = req.body

    if (!title || !userId) {
      return res.status(400).json({ error: 'Title and userId are required' })
    }

    // Generate PPT slides using OpenAI
    const slides = await generatePPT({ title, domain, technologies })

    // Update or create project in database
    const { data, error } = await supabaseAdmin
      .from('projects')
      .upsert({
        id: projectId,
        user_id: userId,
        title,
        domain,
        technologies,
        ppt_slides: slides,
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return res.status(500).json({ error: 'Failed to save project' })
    }

    res.status(200).json({
      success: true,
      slides,
      projectId: data.id
    })
  } catch (error) {
    console.error('API error:', error)
    res.status(500).json({ error: 'Failed to generate PPT slides' })
  }
}
