// COMPONENTES
function Box({ title, boxType, children }) {
    // Você precisará estilizar 'box-container' e as classes (blue-dark, etc.) no seu CSS
    const className = `box-container ${boxType}`;
    return (
        <div className={className}>
            <h3>{title}</h3>
            <div className="box-content">
                {children}
            </div>
        </div>
    );
}

function UserActions() {
    const [dropdownAberto, setDropdownAberto] = React.useState(null);
    const dropdownRef = React.useRef(null);

    const handleAbrirNotificações = () => setDropdownAberto('notifications-button');
    const handleAbrirPerfil = () => setDropdownAberto('profile-button');

    const handleFecharDropdown = () => setDropdownAberto(null);

    React.useEffect(() => {
        function handleClickFora(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownAberto(null);
            }
        }

        if (dropdownAberto) {
            document.addEventListener('mousedown', handleClickFora);
        } else {
            document.removeEventListener('mousedown', handleClickFora);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickFora);
        };
    }, [dropdownAberto]);

    return (
        <React.Fragment>
            <div className="header-user-actions">
                <button onClick={handleAbrirNotificações} className="icon-button" aria-label="Notificações">
                    <i className="bi bi-bell"></i>
                </button>
                <button onClick={handleAbrirPerfil} className="icon-button" aria-label="Perfil">
                    <i className="bi bi-person-circle"></i>
                </button>
            </div>

            {dropdownAberto === 'notifications-button' && (
                <div ref={dropdownRef} className="dropdown-content">
                    <h1 className="notification-text"><strong>Notificações</strong></h1>
                    <p className="notification-warning">Você não possui novas notificações.</p>
                    <button onClick={handleFecharDropdown} className="close-dropdown">Fechar</button>
                </div>
            )}

            {dropdownAberto === 'profile-button' && (
                <div ref={dropdownRef} className="dropdown-content" id="profile-dropdown">
                    <a href="PerfilEmpresaPage.html" className="settings-link"><i className="bi bi-person-badge"></i>Perfil</a>
                    <a href="#" className="settings-link"><i className="bi bi-gear"></i> Configurações</a>
                    <a href="IntroducedPage.html"><i className="bi bi-box-arrow-left"></i> Sair</a>
                    <button onClick={handleFecharDropdown} className="close-dropdown">Fechar</button>
                </div>
            )}

        </React.Fragment>
    );
}

function DashboardEmpresa() {
    const handleNewsPanel = () => console.log('Abrir painel de Notícias');

    return (
        <div className="dashboard-container">

            <div className="dashboard-card card-vagas">
                <h2>Vagas publicadas</h2>
            </div>

            <div className="dashboard-column-stacked">
                <div className="dashboard-card card-insights">
                    <h2>Insights</h2>
                </div>
                <div className="dashboard-card card-placeholder">
                    <h2>PLACEHOLDER</h2>
                </div>
            </div>

            <div className="dashboard-card card-noticias">
                <h2>Notícias publicadas</h2>

               <div className="third-box" onClick={handleNewsPanel}>
                    <Box boxType="blue-royal">
                        <button className="box-button">Publique uma notícia</button>
                    </Box>
                </div>
            </div>

        </div>
    );
}


ReactDOM.createRoot(document.getElementById('react-userActions')).render(<UserActions />);
ReactDOM.createRoot(document.getElementById('root')).render(<DashboardEmpresa />);
