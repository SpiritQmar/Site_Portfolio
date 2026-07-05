import TopNav from '../components/layout/TopNav';
import Sidebar from '../components/layout/Sidebar';
import CenterPanel from '../components/layout/CenterPanel';
import Footer from '../components/layout/Footer';

function Projects() {
    return (
        <div className="layout">
            <TopNav />
            <div className="middle">
                <Sidebar />
                <CenterPanel />
            </div>
            <Footer />
        </div>
    );
}

export default Projects;