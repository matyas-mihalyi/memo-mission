import { useState } from "react";
import "./App.css";
import { Cards } from "./Cards";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* Header */}
      {/* -- Logo */}
      {/* -- Stats */}
      {/* ---- Timer */}
      {/* ---- Matches */}
      {/* ---- Mistakes */}
      {/* -- Options */}
      {/* ---- Reset */}
      {/* ---- Settings */}
      {/* Cards */}
      <Cards />
      {/* -- Card */}
      {/* */}
    </>
  );
}

export default App;
