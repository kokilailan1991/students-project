import { NextApiRequest, NextApiResponse } from 'next'
import { generateFlashcards } from '@/lib/openai'
import { supabaseAdmin } from '@/lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { text, category, userId } = req.body

    if (!text || !userId) {
      return res.status(400).json({ error: 'Text and userId are required' })
    }

    // Generate flashcards using OpenAI
    const flashcards = await generateFlashcards(text, category)

    // Save flashcards to database
    const flashcardData = flashcards.map(flashcard => ({
      user_id: userId,
      question: flashcard.question,
      answer: flashcard.answer,
      category: flashcard.category || category,
      difficulty: 'medium' as const,
      created_at: new Date().toISOString()
    }))

    const { data, error } = await supabaseAdmin
      .from('flashcards')
      .insert(flashcardData)
      .select()

    if (error) {
      console.error('Database error:', error)
      return res.status(500).json({ error: 'Failed to save flashcards' })
    }

    res.status(200).json({
      success: true,
      flashcards: data
    })
  } catch (error) {
    console.error('API error:', error)
    res.status(500).json({ error: 'Failed to generate flashcards' })
  }
}
