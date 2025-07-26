import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-6 text-center">
      <h1 className="text-5xl font-bold text-blue-800 mb-4">Welcome to the Form Builder </h1>
      <p className="text-gray-700 mb-8 max-w-xl">
        Create customizable forms using JSON Schema, rendered live in the browser.
      </p>
      <Button
        type="primary"
        size="large"
        className="bg-blue-600 hover:bg-blue-700"
        onClick={() => navigate("/builder")}
      >
        Start Building →
      </Button>
    </div>

  );
};

export default Home;
