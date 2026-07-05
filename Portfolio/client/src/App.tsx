import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Certificates from "./pages/Certificates.tsx";
import Projects from "./pages/Projects.tsx";
import Stack from "./pages/Stack.tsx";
import Education from "./pages/Education.tsx";

function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/certificates" element={<Certificates/>}/>
            <Route path="/projects" element={<Projects/>}/>
            <Route path="/stack" element={<Stack/>}/>
            <Route path="/education" element={<Education/>}/>


        </Routes>
      </BrowserRouter>
  );
}

export default App;