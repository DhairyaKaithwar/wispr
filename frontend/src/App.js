import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Whisper from "@/pages/Whisper";
import { Nav } from "@/components/Nav";
import { useSmoothScroll } from "@/lib/smoothScroll";

function App() {
  useSmoothScroll();
  return (
    <BrowserRouter>
      <div className="grain" aria-hidden="true" />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/whisper" element={<Whisper />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
