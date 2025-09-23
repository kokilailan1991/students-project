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

    const prompt = `Generate a professional, academic-quality project abstract for the following project:

Title: ${projectData.title}
Domain: ${projectData.domain || 'Technology'}
Technologies: ${projectData.technologies || 'Modern web technologies'}

The abstract must be:
- 150-200 words exactly
- Written in formal academic language
- Include clear problem statement, methodology, and expected outcomes
- Follow standard academic abstract structure
- Use technical terminology appropriate for the domain
- Be suitable for university submission and publication
- Include keywords relevant to the field
- Demonstrate innovation and contribution to the field

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

    const prompt = `Generate a comprehensive, professional project report for the following project:

Title: ${projectData.title}
Domain: ${projectData.domain || 'Technology'}
Technologies: ${projectData.technologies || 'Modern web technologies'}

Create a detailed academic report with the following structure:

1. **Abstract** (150-200 words)
   - Problem statement, methodology, key findings, and conclusions

2. **Introduction** (300-400 words)
   - Background and motivation
   - Problem statement and research questions
   - Objectives and scope
   - Report organization

3. **Literature Review** (400-500 words)
   - Related work in the domain
   - Current state of technology
   - Gaps in existing solutions
   - Theoretical framework

4. **Methodology** (500-600 words)
   - System architecture and design
   - Technology stack justification
   - Implementation approach
   - Development methodology
   - Testing and validation strategy

5. **Implementation** (400-500 words)
   - Detailed technical implementation
   - Key features and modules
   - User interface design
   - Database design (if applicable)
   - Integration details

6. **Results and Analysis** (300-400 words)
   - System performance metrics
   - User testing results
   - Comparison with existing solutions
   - Limitations and challenges

7. **Conclusion and Future Work** (200-300 words)
   - Summary of achievements
   - Contributions to the field
   - Future enhancements
   - Recommendations

8. **References** (10-15 academic sources)
   - Recent papers and publications
   - Technical documentation
   - Industry reports

Use formal academic writing style, include technical details, and ensure the content is suitable for university submission. Format as markdown with proper headings and subheadings.`

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