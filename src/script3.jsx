function UserActions() {
    const [dropdownAberto, setDropdownAberto] = React.useState(null);
    const dropdownRef = React.useRef(null);

    const handleAbrirNotificações = () => setDropdownAberto('notifications-button');
    const handleAbrirPerfil = () => setDropdownAberto('profile-button');

    const handleFecharDropdown = () => setDropdownAberto(null);

    //DROPDOWN HEADER
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
                    <a href="PerfilUserPage.html" className="settings-link"><i className="bi bi-person-badge"></i>Perfil</a>
                    <a href="#" className="settings-link"><i className="bi bi-gear"></i> Configurações</a>
                    <a href="IntroducedPage.html"><i className="bi bi-box-arrow-left"></i> Sair</a>
                    <button onClick={handleFecharDropdown} className="close-dropdown">Fechar</button>
                </div>
            )}
        </React.Fragment>
    );
}

const ESTADOS_DATA = [
    { nome: "Acre", sigla: "AC", municipios: ["Rio Branco", "Cruzeiro do Sul"] },
    { nome: "Alagoas", sigla: "AL", municipios: ["Maceió", "Arapiraca"] },
    { nome: "Amapá", sigla: "AP", municipios: ["Macapá", "Santana", "Laranjal do Jari"] },
    { nome: "Amazonas", sigla: "AM", municipios: ["Manaus", "Parintins", "Itacoatiara"] },
    { nome: "Bahia", sigla: "BA", municipios: ["Salvador", "Feira de Santana", "Vitória da Conquista"] },
    { nome: "Ceará", sigla: "CE", municipios: ["Fortaleza", "Caucaia", "Juazeiro do Norte"] },
    { nome: "Distrito Federal", sigla: "DF", municipios: ["Brasília"] },
    { nome: "Espirito Santo", sigla: "ES", municipios: ["Vitória", "Vila Velha", "Serra"] },
    { nome: "Goiás", sigla: "GO", municipios: ["Goiânia", "Aparecida de Goiânia", "Anápolis"] },
    { nome: "Maranhão", sigla: "MA", municipios: ["São Luíz", "Imperatriz"] },
    { nome: "Mato Grosso", sigla: "MT", municipios: ["Cuiabá", "Várzea Grande", "Rondonópolis"] },
    { nome: "Mato Grosso do Sul", sigla: "MS", municipios: ["Campo Grande", "Dourados", "Três Lagoas"] },
    { nome: "Minas Gerais", sigla: "MG", municipios: ["Belo Horizonte", "Uberlândia", "Contagem", "Juiz de Fora", "Betim", "Uberaba", "Montes Claros"] },
    { nome: "Pará", sigla: "PA", municipios: ["Belém", "Ananindeua", "Santarém"] },
    { nome: "Paraíba", sigla: "PB", municipios: ["João Pessoa", "Campina Grande"] },
    { nome: "Paraná", sigla: "PR", municipios: ["Curitiba", "Londrina", "Maringá"] },
    { nome: "Pernambuco", sigla: "PE", municipios: ["Recife", "Caruaru", "Jaboatão dos Guararapes", "Olinda", "Petrolina"] },
    { nome: "Piauí", sigla: "PI", municipios: ["Teresina", "Paranaíba", "Picos"] },
    { nome: "Rio de Janeiro", sigla: "RJ", municipios: ["Rio de Janeiro (Capital)", "Niterói", "Duque de Caixas", "Nova Iguaçu", "São Gonçalo"] },
    { nome: "Rio Grande do Norte", sigla: "RN", municipios: ["Natal", "Mossoró", "Parnamirim"] },
    { nome: "Rio Grande do Sul", sigla: "RS", municipios: ["Porto Alegre", "Caxias do Sul", "Canoas", "Pelotas", "Santa Maria"] },
    { nome: "Rondônia", sigla: "RO", municipios: ["Porto Velho", "Ji-Paraná", "Arqieuemes"] },
    { nome: "Roraima", sigla: "RR", municipios: ["Boa Vista"] },
    { nome: "Santa Catarina", sigla: "SC", municipios: ["Florianópolis", "Jonville", "Bluemenau"] },
    { nome: "São Paulo", sigla: "SP", municipios: ["São Paulo (Capital)", "Guarulhos", "Campinas", "São Bernardo do Campo", "Santo André", "Ribeirão Preto", "São José dos Campos", "Sorocaba"] },
    { nome: "Sergipe", sigla: "SE", municipios: ["Aracaju", "Nossa Senhora do Socorro"] },
    { nome: "Tocantins", sigla: "TO", municipios: ["Palmas", "Araguaína"] }
];

function DetalhesVaga({ vaga, onAbrirModalContato }) {

    const savedLogoSrc = localStorage.getItem('companyLogoDataURL');
    const logoToDisplay = savedLogoSrc || vaga?.logo;

    if (!vaga) {
        return (
            <aside className="detalhes-container placeholder">
                <h2>MAIS INFORMAÇÕES</h2>
                <div className="detalhes-empresa">
                    <img src={savedLogoSrc} alt="Logo da Empresa" className="detalhes-logo" />
                    ) : (
                    <div className="detalhes-logo logo-placeholder">LOGO</div>
                    )
                    <h3>NOME DA EMPRESA</h3>
                </div>
                <div className="detalhes-info">
                    <strong>DIRIGENTE DA PROPOSTA</strong>
                    <p>NOME DO DIRIGENTE</p>
                    <strong>NOME DA VAGA</strong>
                    <p>PERÍODO</p>
                    <p>TIPO DE SERVIÇO</p>
                </div>
            </aside>
        );
    }

    return (
        <aside className="detalhes-container">
            <h2>MAIS INFORMAÇÕES</h2>
            <div className="detalhes-empresa">
                <img
                    src={logoToDisplay || ''}
                    alt={`Logo ${vaga.company}`}
                    className="detalhes-logo"
                />
                <h3>{vaga.company}</h3>
            </div>
            <div className="detalhes-info">
                <strong>DIRIGENTE DA PROPOSTA</strong>
                <p>{vaga.dirigente || "Não informado"}</p>
                <strong>{vaga.title}</strong>
                <p>{vaga.period}</p>
                <p>{vaga.serviceType}</p>
                <strong>DETALHES:</strong>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
            </div>

            <button onClick={onAbrirModalContato} className="contato-button">
                ENTRAR EM CONTATO
            </button>
        </aside>
    );
}

function CardVaga({ vaga, estaAtiva, aoClicar }) {
    const className = `card-vaga ${estaAtiva ? 'active' : ''}`;

    const getFavoritos = () => JSON.parse(localStorage.getItem('nexoraFavoritos') || '[]');

    const [isFavorito, setIsFavorito] = React.useState(() => {
        const favoritos = getFavoritos();
        return favoritos.some(fav => fav.id === vaga.id);
    });

    const handleFavoritoClick = (e) => {
        e.stopPropagation();

        const favoritos = getFavoritos();
        let novosFavoritos;

        if (isFavorito) {
            novosFavoritos = favoritos.filter(fav => fav.id !== vaga.id);
        } else {
            const vagaInfo = {
                id: vaga.id,
                title: vaga.title,
                company: vaga.company,
                logo: vaga.logo,
                city: vaga.city,
                state: vaga.state
            };
            novosFavoritos = [vagaInfo, ...favoritos];
        }

        localStorage.setItem('nexoraFavoritos', JSON.stringify(novosFavoritos));

        setIsFavorito(!isFavorito);
    };

    return (
        <article className={className} onClick={aoClicar}>
            <h3>{vaga.title}</h3>
            <p className="empresa">{vaga.company}</p>
            <p className="local">{vaga.city} - {vaga.state}</p>
            <div className="info-rodape">
                <span>{vaga.period}</span>
                <span>{vaga.serviceType}</span>
            </div>
            <button className="favorite-btn" onClick={handleFavoritoClick}>
                <i className={isFavorito ? "bi bi-heart-fill" : "bi bi-heart"}></i>
            </button>
        </article>
    );
}

const loadVagasFromStorage = () => {
    try {
        const stored = localStorage.getItem('nexoraVagas');
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error("Erro ao carregar vagas na PaginaDeVagas:", error);
        return [];
    }
};

function PaginaDeVagas() {
    const [vagas, setVagas] = React.useState(loadVagasFromStorage);

    React.useEffect(() => {
        setVagas(loadVagasFromStorage());
        const handleStorageChange = (e) => {
            if (e.key === 'nexoraVagas') {
                setVagas(loadVagasFromStorage());
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);


    const [filtros, setFiltros] = React.useState({
        estado: 'todos',
        municipio: 'todos',
        nivel: 'todos'
    });

    const [vagaSelecionadaId, setVagaSelecionadaId] = React.useState(null);


    const [modalContatoAberto, setModalContatoAberto] = React.useState(false);


    const municipiosParaFiltro = React.useMemo(() => {
        if (filtros.estado === 'todos') return [];
        const estadoObj = ESTADOS_DATA.find(e => e.sigla === filtros.estado);
        return estadoObj ? estadoObj.municipios : [];
    }, [filtros.estado]);


    const vagasFiltradas = React.useMemo(() => {
        return vagas.filter(vaga => {
            const passaEstado = filtros.estado === 'todos' || vaga.state === filtros.estado;
            const passaMunicipio = filtros.municipio === 'todos' || vaga.city === filtros.municipio;
            const passaNivel = filtros.nivel === 'todos' || vaga.level === filtros.nivel;
            return passaEstado && passaMunicipio && passaNivel;
        });
    }, [vagas, filtros]);

    const vagaAtiva = React.useMemo(() => {
        if (vagaSelecionadaId) {
            return vagas.find(v => v.id === vagaSelecionadaId);
        }
        if (vagasFiltradas.length > 0) {
            return vagasFiltradas[0];
        }
        return null;
    }, [vagaSelecionadaId, vagasFiltradas, vagas]);

    function handleFiltroChange(e) {
        const { name, value } = e.target;
        setFiltros(filtrosAnteriores => {
            const novosFiltros = {
                ...filtrosAnteriores,
                [name]: value
            };
            if (name === 'estado') {
                novosFiltros.municipio = 'todos';
            }
            return novosFiltros;
        });
        setVagaSelecionadaId(null);
    }

    function handleSelecionarVaga(id) {
        setVagaSelecionadaId(id);
    }


    const handleAbrirContato = () => setModalContatoAberto(true);
    const handleFecharContato = () => setModalContatoAberto(false);

    return (
        <React.Fragment>

            <div className="vagas-pagina-container">

                <nav className="filtros-container">
                    <select name="estado" value={filtros.estado} onChange={handleFiltroChange}>
                        <option value="todos">Selecione um Estado</option>
                        {ESTADOS_DATA.map(e => (
                            <option key={e.sigla} value={e.sigla}>{e.nome}</option>
                        ))}
                    </select>

                    <select name="municipio" value={filtros.municipio} onChange={handleFiltroChange} disabled={filtros.estado === 'todos'}>
                        <option value="todos">Selecione um Município</option>
                        {municipiosParaFiltro.map(m => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>

                    <select name="nivel" value={filtros.nivel} onChange={handleFiltroChange}>
                        <option value="todos">Selecione um Nível</option>
                        <option value="junior">Júnior</option>
                        <option value="pleno">Pleno</option>
                        <option value="senior">Sênior</option>
                    </select>
                </nav>

                <main className="vagas-conteudo-principal">

                    <section className="lista-vagas-container">
                        {vagasFiltradas.length > 0 ? (
                            vagasFiltradas.map(vaga => (
                                <CardVaga
                                    key={vaga.id}
                                    vaga={vaga}
                                    estaAtiva={vagaAtiva && vaga.id === vagaAtiva.id}
                                    aoClicar={() => handleSelecionarVaga(vaga.id)}
                                />
                            ))
                        ) : (
                            <p className="sem-vagas-aviso">Nenhuma vaga disponível para estes filtros.</p>
                        )}
                    </section>

                    <DetalhesVaga
                        vaga={vagaAtiva}
                        onAbrirModalContato={handleAbrirContato}
                    />

                </main>
            </div>


            {modalContatoAberto && (
                <div id="contatoModal" className="modal">
                    <div className="modal-content">
                        <button onClick={handleFecharContato} style={{ float: 'right' }}>X</button>
                        <h2>Contato</h2>
                        <p>Placeholder</p>
                    </div>
                </div>
            )}

        </React.Fragment>
    );
}

function FooterComModals() {
    //'null' para definir que o modal não irá abrir;
    const [modalAberto, setModalAberto] = React.useState(null);

    //'termos e perguntas' os modals que serão abertos;
    const handleAbrirAjuda = () => { setModalAberto('ajuda'); };
    const handleAbrirFeedback = () => { setModalAberto('feedback'); };
    const handleAbrirTermos = () => { setModalAberto('termos'); };
    const handleFecharModal = () => { setModalAberto(null); };

    return (
        <React.Fragment>
            <footer className="rodape">
                <div className="rodape-links">
                    <button onClick={handleAbrirAjuda} className="link-button">Ajuda</button>
                    <span className="separador">|</span>
                    <button onClick={handleAbrirFeedback} className="link-button">Feedback</button>
                    <span className="separador">|</span>
                    <button onClick={handleAbrirTermos} className="link-button">Termos e Privacidade</button>
                </div>
            </footer>

            {modalAberto === 'termos' && (
                <div id="TermosModal" className="modal">
                    <div className="modal-content">
                        <button onClick={handleFecharModal} style={{ float: 'right' }}>X</button>
                        <h2 className="informações-text">Termos e Serviços</h2>
                        <p className="informações">PLACEHOLDER</p>
                    </div>
                </div>
            )}

            {modalAberto === 'ajuda' && (
                <div id="AjudaModal" className="modal">
                    <div className="modal-content">
                        <button onClick={handleFecharModal} style={{ float: 'right' }}>X</button>
                        <h2>Selecione o tipo de problema que necessita de <span className="destacar">ajuda</span> abaixo:</h2>
                        <div className="button-group">
                            PLACEHOLDER
                        </div>
                    </div>
                </div>
            )}


            {modalAberto === 'feedback' && (
                <div id="FeedbackModal" className="modal">
                    <div className="modal-content">
                        <button onClick={handleFecharModal} style={{ float: 'right' }}>X</button>
                        <h2>Envie o seu Feedback sobre o site</h2>
                        <form>
                            <label>Nome:</label>
                            <input type="text" placeholder="Informe seu nome completo" />
                            <label>Email:</label>
                            <input type="email" placeholder="Informe seu email" />
                            <label>Feedback: </label>
                            <textarea rows="5" maxLength="500"></textarea>
                            <button type="submit">Enviar</button>
                            <button type="reset">Limpar</button>
                        </form>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
}

// RENDERIZAÇÃO 
ReactDOM.createRoot(document.getElementById('react-userActions')).render(<UserActions />);
ReactDOM.createRoot(document.getElementById('react-footer-e-modals')).render(<FooterComModals />);
ReactDOM.createRoot(document.getElementById('root-vagas')).render(<PaginaDeVagas />);