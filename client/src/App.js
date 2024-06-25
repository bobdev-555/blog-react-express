import Header from "./components/Header"
import { Routes, Route } from "react-router-dom"
import Blogs from './pages/Blogs'
import SignOption from "./pages/SignOption";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blogs />} />
          <Route path="/sign" element={<SignOption />} />
        </Routes>
    </div>
  );
}

export default App;
