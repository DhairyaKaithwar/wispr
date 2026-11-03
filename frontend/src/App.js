import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Whisper from "@/pages/Whisper";
import Story from "@/pages/Story";
import { useParams } from "react-router-dom";

const StoryRoute = () => <Story key={useParams().id} />;
import { Nav } from "@/components/Nav";
import { ThemeCord } from "@/components/ThemeCord";
import { useSmoothScroll } from "@/lib/smoothScroll";

function App() {
  useSmoothScroll();
  return (
    <BrowserRouter>
      <div className="grain" aria-hidden="true" />
      <Nav />
      <ThemeCord />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/whisper" element={<Whisper />} />
        <Route path="/museum-of-failures/:id" element={<StoryRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
