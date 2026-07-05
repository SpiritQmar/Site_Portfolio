import '../styles/layout.css';

function TopNav() {
    return (
        <div className="topnav">
            <div className="logo">LOGO</div>
            <div className="nav-links">
                <a className="nav-item" href="/">Главная</a>
                <a className="nav-item" href="/projects">Проекты</a>
                <a className="nav-item" href="/certificates">Сертификаты</a>
                <a className="nav-item" href="/stack">Стек</a>
                <a className="nav-item" href="/education">Образование</a>
            </div>
        </div>
    );
}

export default TopNav;