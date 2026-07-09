# GenAI Product Catalog

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Gemini AI](https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)

A modern, full-stack **MERN (MongoDB, Express, React, Node.js)** application that leverages the power of **Google Gemini AI** to automatically generate marketing content, SEO descriptions, and social media posts for your products. 

Designed for e-commerce store owners, marketers, and product managers, this app takes basic product details (and an optional image) and uses LLM capabilities to write compelling copy instantly.

---

## Key Features

- **AI-Powered Content Generation:** Automatically generates SEO descriptions, Instagram captions, LinkedIn posts, and relevant hashtags using Google Gemini AI.
- **Multimodal AI Support:** Upload a product image alongside text details to give the AI more context for generating accurate descriptions.
- **Fast & Modern Frontend:** Built with React, Vite, and styled beautifully using Tailwind CSS and Lucide React icons.
- **Robust Backend API:** Powered by Node.js and Express with robust TypeScript support, MongoDB integration via Mongoose, and Multer for memory-storage image uploads.
- **Responsive UI:** Fully responsive design that works seamlessly across desktop and mobile devices.

---

## Tech Stack

### Frontend
- **Framework:** React 19 + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **Icons:** Lucide React
- **HTTP Client:** Axios

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB & Mongoose
- **AI Integration:** `@google/generative-ai` (Google Gemini)
- **File Uploads:** Multer (Memory Storage)
- **Environment Management:** dotenv

---

## Project Structure

```bash
GenAI_Product-catalog/
├── backend/                  # Node.js + Express Backend
│   ├── src/                  
│   │   ├── models/           # Mongoose Data Models (Product)
│   │   ├── routes/           # Express API Routes (contentRoutes)
│   │   ├── services/         # AI Service (Gemini Integration)
│   │   └── server.ts         # Backend Entry Point
│   ├── .env                  # Backend Environment Variables
│   └── package.json          
└── frontend/                 # React + Vite Frontend
    ├── src/                  
    │   ├── components/       # Reusable React Components
    │   ├── pages/            # Page Views
    │   ├── services/         # API Integration Layer
    │   ├── App.tsx           # Main App Component
    │   └── main.tsx          # Frontend Entry Point
    └── package.json          
```

---

## Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/en/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (Local instance or MongoDB Atlas URI)
- A **Google Gemini API Key** (Get one from [Google AI Studio](https://aistudio.google.com/))

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd GenAI_Product-catalog
```

### 2. Backend Setup

Open a terminal and navigate to the backend directory:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` root and configure the following variables:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/genai_catalog  # Or your MongoDB Atlas connection string
GEMINI_API_KEY=your_google_gemini_api_key_here
```

Start the backend development server:

```bash
npm run dev
```
*(The backend should now be running on `http://localhost:5000`)*

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` root if needed for Vite (e.g., `VITE_API_URL`), though by default it may be configured to proxy or point to localhost:5000.

Start the frontend development server:

```bash
npm run dev
```
*(The frontend should now be accessible via the Vite localhost URL, typically `http://localhost:5173`)*

---

## API Endpoints (Backend)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/products` | Retrieve all saved products (sorted by newest). |
| `GET` | `/api/products/:id` | Retrieve details for a specific product by ID. |
| `POST` | `/api/generate-content` | Accepts `multipart/form-data`. Generates AI marketing content based on product details & image, then saves it to DB. |
| `DELETE` | `/api/products/:id` | Delete a product by ID. |

### Payload for `/api/generate-content` (FormData)
- `title` (String, Required)
- `description` (String)
- `material` (String)
- `color` (String)
- `weight` (String)
- `features` (String/JSON Array)
- `image` (File, Optional)

---

## Contributing

Contributions are always welcome! 
1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## License

This project is licensed under the **ISC License**.
