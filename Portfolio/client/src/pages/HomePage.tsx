import TopNav from '../components/layout/TopNav';
import Sidebar from '../components/layout/Sidebar';
import CenterPanel from '../components/layout/CenterPanel';
import Footer from '../components/layout/Footer';
import { Shadertoy } from 'react-shadertoy';

interface HomePageProps {
    webglDisabled?: boolean;
}

function HomePage({ webglDisabled = false }: HomePageProps) {
    return (
        <div className="layout">
            {!webglDisabled ? (
                <Shadertoy
                    fragmentShader="/assets/shaders/background.glsl"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: -1
                    }}
                />
            ) : (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: -1,
                    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)'
                }} />
            )}

            <TopNav />
            <div className="middle">
                <Sidebar />
                <CenterPanel />
            </div>
            <Footer />
        </div>
    );
}

export default HomePage;