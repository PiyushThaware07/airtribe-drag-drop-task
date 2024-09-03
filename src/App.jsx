import "./App.css";
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Container from "./components/Container";
import Editable from './components/Editable';


export default function App() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-6xl h-full mx-auto py-10">
        <Routes>
          <Route path="/editable" element={<Editable />} />
          <Route path="/" element={<Container />} />
        </Routes>
      </div>
    </main>
  )
}
