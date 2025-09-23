import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { title, domain, technologies, userId } = req.body

    if (!title || !userId) {
      return res.status(400).json({ error: 'Title and userId are required' })
    }

    // Generate professional abstract (demo version)
    const abstract = generateDemoAbstract({ title, domain, technologies })

    // Generate a unique project ID
    const projectId = `proj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    res.status(200).json({
      success: true,
      abstract,
      projectId
    })
  } catch (error) {
    console.error('API error:', error)
    res.status(500).json({ error: 'Failed to generate abstract' })
  }
}

function generateDemoAbstract({ title, domain, technologies }: {
  title: string
  domain?: string
  technologies?: string
}): string {
  const domainText = domain || 'technology'
  const techText = technologies || 'modern web technologies'
  
  return `This project presents a comprehensive solution for "${title}" in the domain of ${domainText}. The system utilizes advanced ${techText} to deliver an efficient and scalable solution that addresses key challenges in the field.

The proposed solution incorporates innovative approaches to problem-solving through cutting-edge algorithms, user-friendly interfaces, and robust system architecture. The project demonstrates significant potential for real-world application and contributes to the advancement of ${domainText} through its novel methodology and implementation strategies.

Key features include intelligent data processing, seamless user experience, and comprehensive system integration. The project aims to provide measurable improvements in efficiency, accuracy, and user satisfaction while maintaining high standards of security and reliability.

Expected outcomes include enhanced system performance, improved user engagement, and valuable insights for future development in the ${domainText} domain. This project represents a significant contribution to the field and demonstrates the practical application of modern technological solutions.`
}
