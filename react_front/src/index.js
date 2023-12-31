import "./CSS/index.css";
import Home from "./pages/Home.js";
import ResultScreen from "./pages/Result.js";
import { createRoot } from 'react-dom/client';
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

const root = createRoot(document.getElementById("root"));
root.render(
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="result" element={<ResultScreen />} />
          </Routes>
        </div>
      </BrowserRouter>
);
