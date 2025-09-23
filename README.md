# ProjectPAL - Student Success Platform

A comprehensive full-stack web application designed specifically for final-year students to help with projects, assignments, flashcards, resume building, viva preparation, and interview questions.

## 🚀 Features

### Core Functionality
- **Projects**: Generate topics, abstracts, reports, PPT slides, and future enhancements
- **Assignments**: Essay generator, lab reports, case studies, coding help, plagiarism rewriter
- **Flashcards**: Convert text/notes/reports into Q&A flashcards with export options
- **Resume & CV**: Generate resume bullet points, ATS-friendly resumes, LinkedIn summaries
- **Viva & Interview Prep**: Viva Q&A, HR + Technical interview questions, elevator pitch scripts
- **Extras**: Acknowledgement generator, certificate text, research paper summarizer

### Payment Tiers
- **Free Tier**: 1 abstract + 3 flashcards + 3 resume points + sample viva Qs
- **Pro Tier (₹499)**: Unlock Reports, PPT, Resume, Viva Qs, Assignments
- **Premium Tier (₹999)**: Full access with unlimited exports

### Payment System
- Direct QR payment integration (GPay/UPI)
- Transaction ID verification
- Session-based feature unlocking

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Radix UI** for accessible components

### Export Capabilities
- **PDF**: Reports, flashcards, resumes
- **Word**: Documents and reports
- **PowerPoint**: Presentation slides
- **CSV**: Flashcard data

## 📁 Project Structure

```
ProjectPAL/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Dashboard.tsx    # Main tabbed interface
│   │   ├── Header.tsx       # App header with user info
│   │   └── PaymentModal.tsx # Payment and upgrade modal
│   ├── pages/               # Tab content components
│   │   ├── ProjectsTab.tsx  # Project generation tools
│   │   ├── AssignmentsTab.tsx
│   │   ├── FlashcardsTab.tsx
│   │   ├── ResumeTab.tsx
│   │   ├── VivaTab.tsx
│   │   └── ExtrasTab.tsx
│   ├── contexts/            # React context providers
│   │   └── AppContext.tsx   # User state and payment management
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/               # Utility functions
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # App entry point
│   └── index.css            # Global styles
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ProjectPAL
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
npm run preview
```

## 🎯 Usage

### Free Features
1. **Abstract Generation**: Enter project details and generate professional abstracts
2. **Flashcard Creation**: Convert any text into Q&A flashcards
3. **Basic Resume Points**: Generate 3 resume bullet points

### Pro Features (₹499)
- Full project reports with all sections
- PowerPoint presentation generation
- Complete resume builder with ATS optimization
- Assignment generators (essays, lab reports, case studies)
- Viva and interview question generation
- Unlimited flashcards

### Premium Features (₹999)
- Everything in Pro
- Unlimited exports
- Priority support
- Advanced templates

## 💳 Payment Integration

The app uses a simple QR-based payment system:

1. **QR Code Display**: Shows static GPay QR code
2. **Transaction ID Entry**: Users enter their payment transaction ID
3. **Manual Verification**: Admin verifies payments and unlocks features
4. **Session Storage**: Features remain unlocked for the session

## 🔧 Development

### Adding New Features
1. Create component in appropriate directory
2. Add to Dashboard tabs if needed
3. Implement payment tier restrictions
4. Add export functionality if required

### Payment Integration
- Update `AppContext.tsx` for payment logic
- Modify `PaymentModal.tsx` for UI changes
- Add backend verification for production

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For support and questions, please contact the development team.

---

**ProjectPAL** - Empowering students to succeed in their academic journey! 🎓
