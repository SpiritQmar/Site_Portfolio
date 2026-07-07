import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Certificates from "./pages/Certificates";
import Projects from "./pages/Projects";
import Stack from "./pages/Stack";
import Education from "./pages/Education";
import WebGLCheck from './components/WebGLCheck';

function App() {
    return (
        <WebGLCheck>
            {(props) => (
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HomePage webglDisabled={props.webglDisabled} />} />
                        <Route path="/certificates" element={<Certificates/>}/>
                        <Route path="/projects" element={<Projects/>}/>
                        <Route path="/stack" element={<Stack/>}/>
                        <Route path="/education" element={<Education/>}/>
                    </Routes>
                </BrowserRouter>
            )}
        </WebGLCheck>
    );
}

export default App;