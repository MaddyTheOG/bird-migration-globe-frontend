import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import About from "./pages/About";
import Art from "./pages/Art";
import Conservation from "./pages/Conservation";
import Habitats from "./pages/Habitats";

function App() {
  return (
    <Router>
      <NavBar />
      <div style={{ paddingTop: "4rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/art" element={<Art />} />
          <Route path="/conservation" element={<Conservation />} />
          <Route path="/habitats" element={<Habitats />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
