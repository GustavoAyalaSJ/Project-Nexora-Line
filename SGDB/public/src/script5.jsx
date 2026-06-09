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

function PerfilEmpresa() {
    const [editandoSobre, setEditandoSobre] = React.useState(false);
    const [editandoRedes, setEditandoRedes] = React.useState(false);
    const [empresa, setEmpresa] = React.useState(() => {
        const saved = localStorage.getItem('nexoraEmpresaPerfil');
        return saved ? JSON.parse(saved) : {
            nome: 'Nome da Empresa',
            cnpj: '00.000.000/0001-00',
            email: 'empresa@email.com',
            telefone: '(00) 00000-0000',
            site: 'https://www.empresa.com',
            sobre: 'Descrição sobre a empresa...',
            localizacao: 'São Paulo, SP',
            funcionarios: '50-100',
            linkedin: 'https://linkedin.com/company/empresa',
            instagram: 'https://instagram.com/empresa',
            facebook: 'https://facebook.com/empresa',
            twitter: 'https://twitter.com/empresa'
        };
    });

    const [formData, setFormData] = React.useState(empresa);

    const salvarPerfil = () => {
        setEmpresa(formData);
        localStorage.setItem('nexoraEmpresaPerfil', JSON.stringify(formData));
        setEditandoSobre(false);
        setEditandoRedes(false);
        alert('Perfil atualizado com sucesso!');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="empresa-perfil-container">
            <div className="perfil-header">
                <div className="perfil-avatar">
                    <i className="bi bi-building"></i>
                </div>
                <div className="perfil-info">
                    <h2>{empresa.nome}</h2>
                    <p>{empresa.localizacao}</p>
                </div>
            </div>

            <div className="perfil-grid">
                <section className="perfil-card">
                    <div className="card-header">
                        <h3><i className="bi bi-info-circle"></i> Informações Gerais</h3>
                        <button 
                            onClick={() => {
                                setFormData(empresa);
                                setEditandoSobre(!editandoSobre);
                            }}
                            className="btn-editar"
                        >
                            <i className="bi bi-pencil"></i> {editandoSobre ? 'Cancelar' : 'Editar'}
                        </button>
                    </div>
                    <div className="card-content">
                        {editandoSobre ? (
                            <>
                                <div className="form-group">
                                    <label>Nome da Empresa:</label>
                                    <input type="text" name="nome" value={formData.nome} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label>CNPJ:</label>
                                    <input type="text" name="cnpj" value={formData.cnpj} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label>Telefone:</label>
                                    <input type="tel" name="telefone" value={formData.telefone} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label>Site:</label>
                                    <input type="url" name="site" value={formData.site} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label>Localização:</label>
                                    <input type="text" name="localizacao" value={formData.localizacao} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label>Número de Funcionários:</label>
                                    <select name="funcionarios" value={formData.funcionarios} onChange={handleInputChange}>
                                        <option>1-10</option>
                                        <option>11-50</option>
                                        <option>50-100</option>
                                        <option>100-500</option>
                                        <option>500+</option>
                                    </select>
                                </div>
                                <button onClick={salvarPerfil} className="btn-salvar">Salvar Alterações</button>
                            </>
                        ) : (
                            <>
                                <p><strong>CNPJ:</strong> {empresa.cnpj}</p>
                                <p><strong>Email:</strong> {empresa.email}</p>
                                <p><strong>Telefone:</strong> {empresa.telefone}</p>
                                <p><strong>Site:</strong> <a href={empresa.site} target="_blank" rel="noopener noreferrer">{empresa.site}</a></p>
                                <p><strong>Localização:</strong> {empresa.localizacao}</p>
                                <p><strong>Funcionários:</strong> {empresa.funcionarios}</p>
                            </>
                        )}
                    </div>
                </section>

                <section className="perfil-card">
                    <div className="card-header">
                        <h3><i className="bi bi-chat-quote"></i> Sobre a Empresa</h3>
                        <button 
                            onClick={() => setEditandoSobre(!editandoSobre)}
                            className="btn-editar"
                        >
                            <i className="bi bi-pencil"></i> Editar
                        </button>
                    </div>
                    <div className="card-content">
                        {editandoSobre ? (
                            <>
                                <textarea 
                                    name="sobre" 
                                    value={formData.sobre} 
                                    onChange={handleInputChange}
                                    placeholder="Descrição sobre a empresa..."
                                    rows="6"
                                />
                                <button onClick={salvarPerfil} className="btn-salvar">Salvar Alterações</button>
                            </>
                        ) : (
                            <p>{empresa.sobre}</p>
                        )}
                    </div>
                </section>

                <section className="perfil-card">
                    <div className="card-header">
                        <h3><i className="bi bi-share"></i> Redes Sociais</h3>
                        <button 
                            onClick={() => {
                                setFormData(empresa);
                                setEditandoRedes(!editandoRedes);
                            }}
                            className="btn-editar"
                        >
                            <i className="bi bi-pencil"></i> {editandoRedes ? 'Cancelar' : 'Editar'}
                        </button>
                    </div>
                    <div className="card-content">
                        {editandoRedes ? (
                            <>
                                <div className="form-group">
                                    <label>LinkedIn:</label>
                                    <input type="url" name="linkedin" value={formData.linkedin} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label>Instagram:</label>
                                    <input type="url" name="instagram" value={formData.instagram} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label>Facebook:</label>
                                    <input type="url" name="facebook" value={formData.facebook} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label>Twitter:</label>
                                    <input type="url" name="twitter" value={formData.twitter} onChange={handleInputChange} />
                                </div>
                                <button onClick={salvarPerfil} className="btn-salvar">Salvar Alterações</button>
                            </>
                        ) : (
                            <div className="redes-list">
                                {empresa.linkedin && (
                                    <a href={empresa.linkedin} target="_blank" rel="noopener noreferrer" className="rede-link">
                                        <i className="bi bi-linkedin"></i> LinkedIn
                                    </a>
                                )}
                                {empresa.instagram && (
                                    <a href={empresa.instagram} target="_blank" rel="noopener noreferrer" className="rede-link">
                                        <i className="bi bi-instagram"></i> Instagram
                                    </a>
                                )}
                                {empresa.facebook && (
                                    <a href={empresa.facebook} target="_blank" rel="noopener noreferrer" className="rede-link">
                                        <i className="bi bi-facebook"></i> Facebook
                                    </a>
                                )}
                                {empresa.twitter && (
                                    <a href={empresa.twitter} target="_blank" rel="noopener noreferrer" className="rede-link">
                                        <i className="bi bi-twitter-x"></i> Twitter
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('react-userActions')).render(<UserActions />);
ReactDOM.createRoot(document.getElementById('react-profile&profile-customization')).render(<PerfilEmpresa />);