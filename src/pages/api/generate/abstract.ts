import { NextApiRequest, NextApiResponse } from 'next'
import { generateAbstract } from '@/lib/openai'
import { supabaseAdmin } from '@/lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { title, domain, technologies, userId } = req.body

    if (!title || !userId) {
      return res.status(400).json({ error: 'Title and userId are required' })
    }

    // Generate abstract using OpenAI
    const abstract = await generateAbstract({ title, domain, technologies })

    // Save to database
    const { data, error } = await supabaseAdmin
      .from('projects')
      .insert({
        user_id: userId,
        title,
        domain,
        technologies,
        abstract,
        created_at: new Date().toISOString(),
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
      abstract,
      projectId: data.id
    })
  } catch (error) {
    console.error('API error:', error)
    res.status(500).json({ error: 'Failed to generate abstract' })
  }
}
