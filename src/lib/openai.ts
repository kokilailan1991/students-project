import OpenAI from 'openai'

// Use fallback for development
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'your-openai-key',
})

export async function generateAbstract(projectData: {
  title: string
  domain?: string
  technologies?: string
}): Promise<string> {
  try {
    // For development, return mock data if no API key
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your-openai-key') {
      return `This project presents a comprehensive solution for ${projectData.title} in the domain of ${projectData.domain || 'technology'}. The system utilizes modern technologies including ${projectData.technologies || 'web technologies'} to deliver an efficient and scalable solution. The project addresses key challenges in the field and provides innovative approaches to problem-solving through advanced algorithms and user-friendly interfaces.`
    }

    const prompt = `You are an AI academic project generator for students. Generate a professional, academic-quality project abstract.

Project Details:
Title: ${projectData.title}
Domain: ${projectData.domain || 'Technology'}
Technologies: ${projectData.technologies || 'Modern web technologies'}

The abstract must be:
- Exactly 150-200 words
- Written in formal academic language
- Include clear problem statement, methodology, and expected outcomes
- Follow standard academic abstract structure
- Use technical terminology appropriate for the domain
- Be suitable for university submission and publication
- Include keywords relevant to the field
- Demonstrate innovation and contribution to the field
- Never leave sections blank
- Use full paragraphs, not bullet points
- Insert the provided Title, Domain, and Technologies naturally
- Keep tone academic but student-friendly
- Be export-ready for PDF/Word/PPT

Structure the abstract with:
1. Problem statement and motivation
2. Proposed solution and methodology
3. Key technologies and approaches
4. Expected outcomes and contributions

Abstract:`

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
      temperature: 0.7,
    })

    return completion.choices[0].message.content || 'Failed to generate abstract'
  } catch (error) {
    console.error('OpenAI API error:', error)
    // Return mock data for development
    return `This project presents a comprehensive solution for ${projectData.title} in the domain of ${projectData.domain || 'technology'}. The system utilizes modern technologies including ${projectData.technologies || 'web technologies'} to deliver an efficient and scalable solution. The project addresses key challenges in the field and provides innovative approaches to problem-solving through advanced algorithms and user-friendly interfaces.`
  }
}

export async function generateReport(projectData: {
  title: string
  domain?: string
  technologies?: string
}): Promise<string> {
  try {
    // For development, return mock data if no API key
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your-openai-key') {
      return `# ${projectData.title}\n\n## Abstract\n\nThis project presents a comprehensive solution for ${projectData.title} in the domain of ${projectData.domain || 'technology'}.\n\n## Introduction\n\n## Literature Review\n\n## Methodology\n\n## Implementation\n\n## Results\n\n## Conclusion\n\n## References`
    }

    const prompt = `You are an AI academic project generator for students. 
Always output a complete academic report with detailed content in every section.

Project Details:
Title: ${projectData.title}
Domain: ${projectData.domain || 'Technology'}
Technologies: ${projectData.technologies || 'Modern web technologies'}

Sections to include:
1. Abstract (150–200 words, must summarize problem, methods, and outcomes)
2. Introduction (≥200 words, background, objectives, significance)
3. Literature Review (≥300 words, discuss 3–5 prior works, cite academically)
4. Methodology (≥250 words, explain tools, frameworks, algorithms)
5. Implementation (≥250 words, describe design, stack, architecture)
6. Results & Discussion (≥200 words, expected outcomes, evaluation)
7. Conclusion (≥150 words, key points and future scope)
8. References (at least 5, APA/IEEE style)

Rules:
- Never leave any section blank.
- Each section must be full paragraphs, not bullet points.
- Always insert user-provided Title, Domain, and Tools naturally.
- Keep tone academic but student-friendly.
- Output must be export-ready for PDF/Word/PPT.
- Use markdown formatting with proper headings.
- Include specific technical details relevant to the domain and technologies mentioned.
- Ensure content is suitable for university submission and academic standards.`

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 2000,
      temperature: 0.7,
    })

    return completion.choices[0].message.content || 'Failed to generate report'
  } catch (error) {
    console.error('OpenAI API error:', error)
    // Return mock data for development
    return `# ${projectData.title}\n\n## Abstract\n\nThis project presents a comprehensive solution for ${projectData.title} in the domain of ${projectData.domain || 'technology'}.\n\n## Introduction\n\n## Literature Review\n\n## Methodology\n\n## Implementation\n\n## Results\n\n## Conclusion\n\n## References`
  }
}

export async function generatePPT(projectData: {
  title: string
  domain?: string
  technologies?: string
}): Promise<Array<{ title: string; content: string }>> {
  try {
    // For development, return mock data if no API key
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your-openai-key') {
      return [
        { title: 'Introduction', content: 'Project overview and objectives' },
        { title: 'Problem Statement', content: 'Current challenges and limitations' },
        { title: 'Solution', content: 'Proposed approach and methodology' },
        { title: 'Implementation', content: 'Technical details and architecture' },
        { title: 'Results', content: 'Key findings and outcomes' },
        { title: 'Conclusion', content: 'Summary and future work' }
      ]
    }

    const prompt = `Generate PowerPoint slides for the following project:

Title: ${projectData.title}
Domain: ${projectData.domain || 'Technology'}
Technologies: ${projectData.technologies || 'Modern web technologies'}

Create 6 slides with the following structure:
1. Introduction (project overview and objectives)
2. Problem Statement (current challenges and limitations)
3. Solution (proposed approach and methodology)
4. Implementation (technical details and architecture)
5. Results (key findings and outcomes)
6. Conclusion (summary and future work)

Return as JSON array with title and content for each slide.`

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1500,
      temperature: 0.7,
    })

    const content = completion.choices[0].message.content || '[]'
    return JSON.parse(content)
  } catch (error) {
    console.error('OpenAI API error:', error)
    // Return mock data for development
    return [
      { title: 'Introduction', content: 'Project overview and objectives' },
      { title: 'Problem Statement', content: 'Current challenges and limitations' },
      { title: 'Solution', content: 'Proposed approach and methodology' },
      { title: 'Implementation', content: 'Technical details and architecture' },
      { title: 'Results', content: 'Key findings and outcomes' },
      { title: 'Conclusion', content: 'Summary and future work' }
    ]
  }
}

export async function generateFlashcards(text: string, category: string = 'General'): Promise<Array<{
  question: string
  answer: string
  category: string
}>> {
  try {
    // For development, return mock data if no API key
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your-openai-key') {
      return [
        {
          question: 'What is the main purpose of this project?',
          answer: 'The main purpose is to create an efficient solution for the given problem.',
          category: category
        },
        {
          question: 'Which technologies are used?',
          answer: 'The project uses modern web technologies and frameworks.',
          category: category
        },
        {
          question: 'What are the key features?',
          answer: 'Key features include user authentication, data management, and reporting.',
          category: category
        }
      ]
    }

    const prompt = `Convert the following text into educational flashcards:

Text: ${text}
Category: ${category}

Generate 5-8 flashcards with:
- Clear, concise questions
- Detailed, accurate answers
- Appropriate difficulty level

Return as JSON array with question, answer, and category for each flashcard.`

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
      temperature: 0.7,
    })

    const content = completion.choices[0].message.content || '[]'
    return JSON.parse(content)
  } catch (error) {
    console.error('OpenAI API error:', error)
    // Return mock data for development
    return [
      {
        question: 'What is the main purpose of this project?',
        answer: 'The main purpose is to create an efficient solution for the given problem.',
        category: category
      },
      {
        question: 'Which technologies are used?',
        answer: 'The project uses modern web technologies and frameworks.',
        category: category
      },
      {
        question: 'What are the key features?',
        answer: 'Key features include user authentication, data management, and reporting.',
        category: category
      }
    ]
  }
}