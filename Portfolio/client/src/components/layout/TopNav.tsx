import '../styles/layout.css';

function TopNav() {
    return (
        <div className="topnav">
            <div className="logo">@SPQDSXX</div>
            <div className="nav-links">
                <a className="nav-item" href="/">Портфолио</a>
                <a className="nav-item" href="/">Подробнее</a>
                <a className="nav-item" href="/certificates">Контакты</a>
                <a className="nav-item" href="/stack">К </a>
                <a className="nav-item" href="/education"></a>
            </div>
            <div className="topnav-right">
                <a className="right-icon right-right" href="https://telegram.me/SPQDSXX" target="_blank" rel="noopener noreferrer">
                    <img src="/assets/images/icons/telegram_icon.webp" alt="Avatar" className="social-icon" />
                </a>
                <a className="right-icon right-right" href="https://discord.com/users/ascendestination" target="_blank" rel="noopener noreferrer">
                    <img src="/assets/images/icons/discord_icon.png" alt="Avatar" className="social-icon" />

                </a>
                <a className="right-icon battlepass" href="https://github.com/SpiritQmar" target="_blank" rel="noopener noreferrer">
                    <img src="/assets/images/icons/github_icon.png" alt="Avatar" className="social-icon" />

                </a>
                <div className="right-icon exit"></div>
            </div>
        </div>
    );
}

export default TopNav;