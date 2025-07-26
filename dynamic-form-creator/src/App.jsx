// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DynamicForm from "./components/DynamicForm";
import formSchema from "./formSchema.json";
import HomePage from "./pages/Home";

export default function App() {
  return (
    <Router>
      <Routes>
      
        <Route path="/" element={<HomePage />} />

       
        <Route
          path="/builder"
          element={
            <div
              className="min-h-screen bg-cover bg-center p-6"
              style={{ backgroundImage: "url('/bg.jpg')" }}
            >
              <div className="max-w-3xl mx-auto bg-white bg-opacity-90 shadow-lg rounded-xl p-6 sm:p-8 backdrop-blur-sm">
              
                <DynamicForm schema={formSchema} />
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
