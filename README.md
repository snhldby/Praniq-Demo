# PRANIQ - Your Journey to Inner Peace

A mental wellness application built with React, TypeScript, and Tailwind CSS that helps users manage stress through guided breathing exercises, meditation, and mindfulness techniques.

## Features

- **Personalized Profile**: Collect user information for customized experience
- **Thought Assessment**: Identify personal, physical, academic, and social stressors
- **Emotion Tracking**: Select from a comprehensive list of emotions
- **Behavior Recognition**: Track behavioral patterns
- **Stress Level Evaluation**: Rate current stress levels
- **Location-Based Recommendations**: Get techniques suitable for your environment
- **Multiple Wellness Techniques**:
  - Breathwork (Deep Breathing, Kapalbhati, Alternate Nostril)
  - Meditation (Om Chanting, So-Ham, Micro Meditation)
  - Movement (Mini Sun-Salutation, Chair Yoga, Shavasana)
  - Grounding (Trataka, 5-4-3-2-1 Grounding, Self-Soothing)
  - Therapeutic (Laughter Therapy, Mindful Water)
  - Cognitive (Affirmations, Gratitude)
- **Built-in Timer**: Practice techniques with guided timers
- **Positive Affirmations**: Receive encouraging messages after completing exercises

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone or download this repository
2. Install dependencies:

```bash
npm install
```

### Running the Application

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

Build the application:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
Praniq/
├── src/
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # React entry point
│   └── index.css         # Global styles with Tailwind directives
├── praniq-demo.tsx       # Main PRANIQ component
├── index.html            # HTML entry point
├── package.json          # Project dependencies
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── postcss.config.js     # PostCSS configuration
```

## Usage

1. **Begin Your Journey**: Click the welcome button to start
2. **Create Profile**: Enter your name, age, and gender
3. **Select Thoughts**: Choose what's on your mind from various categories
4. **Pick Emotions**: Select emotions you're currently experiencing
5. **Identify Behaviors**: Check behaviors you've noticed recently
6. **Rate Stress Level**: Choose your current stress level (1-5)
7. **Set Location**: Select where you are (Home, School, Social Settings)
8. **Choose Technique**: Browse and select from various wellness techniques
9. **Practice**: Use the built-in timer to practice your chosen technique
10. **Complete**: Receive a positive affirmation and choose to try another technique or start fresh

## License

This project is open source and available for educational and wellness purposes.

## Support

For issues or questions, please create an issue in the repository.
