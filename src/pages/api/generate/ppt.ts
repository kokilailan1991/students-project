import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { title, domain, technologies, userId, projectId } = req.body

    if (!title || !userId) {
      return res.status(400).json({ error: 'Title and userId are required' })
    }

    // Generate presentation slides (demo version)
    const slides = generateDemoSlides({ title, domain, technologies })

    res.status(200).json({
      success: true,
      slides,
      projectId: projectId || `proj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    })
  } catch (error) {
    console.error('API error:', error)
    res.status(500).json({ error: 'Failed to generate presentation' })
  }
}

function generateDemoSlides({ title, domain, technologies }: {
  title: string
  domain?: string
  technologies?: string
}): Array<{ title: string; content: string }> {
  const domainText = domain || 'technology'
  const techText = technologies || 'modern web technologies'
  
  return [
    {
      title: "Introduction",
      content: `Welcome to ${title}\n\n• A comprehensive solution in ${domainText}\n• Leveraging advanced ${techText}\n• Designed for modern challenges\n• Focused on user experience and performance`
    },
    {
      title: "Problem Statement",
      content: `Current Challenges in ${domainText}\n\n• Lack of integrated solutions\n• Performance limitations\n• User experience gaps\n• Scalability concerns\n• Security vulnerabilities\n\nOur solution addresses these critical issues`
    },
    {
      title: "Solution Overview",
      content: `${title} - Key Features\n\n• Advanced ${techText} implementation\n• Scalable architecture design\n• User-friendly interface\n• Real-time data processing\n• Comprehensive security measures\n• Cross-platform compatibility`
    },
    {
      title: "Technical Architecture",
      content: `System Architecture\n\n• Frontend: Modern web technologies\n• Backend: Robust server infrastructure\n• Database: Efficient data management\n• APIs: RESTful service integration\n• Security: Multi-layer protection\n• Monitoring: Real-time analytics`
    },
    {
      title: "Implementation Details",
      content: `Development Approach\n\n• Agile methodology\n• Continuous integration\n• Automated testing\n• Performance optimization\n• Code quality standards\n• Documentation and maintenance`
    },
    {
      title: "Results & Benefits",
      content: `Expected Outcomes\n\n• Improved performance metrics\n• Enhanced user satisfaction\n• Reduced operational costs\n• Increased system reliability\n• Better scalability\n• Future-ready architecture`
    },
    {
      title: "Future Roadmap",
      content: `Next Steps\n\n• Machine learning integration\n• Mobile application development\n• Advanced analytics features\n• Third-party integrations\n• Performance optimizations\n• User feedback implementation`
    },
    {
      title: "Conclusion",
      content: `${title} represents a significant advancement in ${domainText}\n\n• Comprehensive solution for modern challenges\n• Built with cutting-edge ${techText}\n• Focused on user experience and performance\n• Ready for production deployment\n\nThank you for your attention!`
    }
  ]
}