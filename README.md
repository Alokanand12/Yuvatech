# PAIMANA - Project Intelligence & Risk Management

PAIMANA is an advanced project management and risk intelligence dashboard built with React and Vite. It provides powerful features like a global AI Assistant integration, real-time risk intelligence analytics, early warning systems, and detailed project tracking interfaces.

## 🚀 Key Features

- **Global AI Assistant:** Integrated AI chatbot available across all pages to assist with project queries and analysis.
- **Risk Intelligence:** Visual analytics and risk assessment tools to monitor overall project health using Recharts.
- **Early Warnings System:** Automated alerts, indicators, and filtering for potential project bottlenecks.
- **Project Tracking:** Comprehensive dashboards and detailed project views for individual project management.
- **Modern UI:** Built with React and Lucide Icons for a clean, responsive, and seamless user experience.

## 🛠️ Technology Stack

- **Frontend Framework:** React 18 (built with Vite)
- **Routing:** React Router v6
- **Icons:** Lucide React
- **Charts:** Recharts
- **State Management & Context:** React Context API (`AIChatContext`)

## 💻 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and npm installed on your machine.

### Installation

1. Clone the repository (from the Yuvatech remote where it is hosted):
   ```bash
   git clone https://github.com/Alokanand12/Yuvatech.git
   ```

2. Navigate to the project directory:
   ```bash
   cd PAIMANA
   ```
   *(Note: Adjust the directory name if cloned into a different folder)*

3. Install the required dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

Start the Vite development server:
```bash
npm run dev
```

The application will be available in your browser at `http://localhost:3000` (or whichever port Vite allocates).

## 📁 Project Structure

- `src/components/`: Reusable UI components (Header, Navigation, RiskBadge, GlobalAIChatbot, etc.)
- `src/pages/`: Main application routes (Dashboard, Projects, RiskIntelligence, EarlyWarnings, AIAssistant)
- `src/context/`: React Context providers (e.g., for global AI Chat state)
- `src/data/`: Demo and mock data for projects
- `src/utils/`: Helper functions and logic engines
