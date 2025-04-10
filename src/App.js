// App.js
import React from "react";
import BirthdayFlowerPot from "./Components/BirthdayFlowerPlot";
import "./index.css"; // Ensure global Tailwind CSS is imported

export default function App() {
  return (
    // Added flex and centering classes
    <div className="h-screen w-screen flex items-center justify-center bg-black">
      <BirthdayFlowerPot />
    </div>
  );
}
