function UserActions() {
    const [dropdownAberto, setDropdownAberto] = React.useState(null);
    const dropdownRef = React.useRef(null);

    const handleAbrirNotificacoes = () => setDropdownAberto("notifications-button");
    const handleAbrirPerfil = () => setDropdownAberto("profile-button");
    const handleFecharDropdown = () => setDropdownAberto(null);

    React.useEffect(() => {
        function handleClickFora(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownAberto(null);
            }
        }

        if (dropdownAberto) {
            document.addEventListener("mousedown", handleClickFora);
        } else {
            document.removeEventListener("mousedown", handleClickFora);
        }

        return () => document.removeEventListener("mousedown", handleClickFora);
    }, [dropdownAberto]);

    return (
        <>
            <div className="header-user-actions">
                <button onClick={handleAbrirNotificacoes} className="icon-button" aria-label="Notificações">
                    <i className="bi bi-bell"></i>
                </button>
                <button onClick={handleAbrirPerfil} className="icon-button" aria-label="Perfil">
                    <i className="bi bi-person-circle"></i>
                </button>
            </div>

            {dropdownAberto === "notifications-button" && (
                <div ref={dropdownRef} className="dropdown-content">
                    <h1 className="notification-text">
                        <strong>Notificações</strong>
                    </h1>
                    <p className="notification-warning">Você não possui novas notificações.</p>
                    <button onClick={handleFecharDropdown} className="close-dropdown">
                        Fechar
                    </button>
                </div>
            )}

            {dropdownAberto === "profile-button" && (
                <div ref={dropdownRef} className="dropdown-content" id="profile-dropdown">
                    <a href="PerfilUserPage.html" className="settings-link">
                        <i className="bi bi-person-badge"></i> Perfil
                    </a>
                    <a href="#" className="settings-link">
                        <i className="bi bi-gear"></i> Configurações
                    </a>
                    <a href="IntroducedPage.html">
                        <i className="bi bi-box-arrow-left"></i> Sair
                    </a>
                    <button onClick={handleFecharDropdown} className="close-dropdown">
                        Fechar
                    </button>
                </div>
            )}
        </>
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
    { nome: "Espírito Santo", sigla: "ES", municipios: ["Vitória", "Vila Velha", "Serra"] },
    { nome: "Goiás", sigla: "GO", municipios: ["Goiânia", "Aparecida de Goiânia", "Anápolis"] },
    { nome: "Maranhão", sigla: "MA", municipios: ["São Luís", "Imperatriz"] },
    { nome: "Mato Grosso", sigla: "MT", municipios: ["Cuiabá", "Várzea Grande", "Rondonópolis"] },
    { nome: "Mato Grosso do Sul", sigla: "MS", municipios: ["Campo Grande", "Dourados", "Três Lagoas"] },
    { nome: "Minas Gerais", sigla: "MG", municipios: ["Belo Horizonte", "Uberlândia", "Contagem"] },
    { nome: "Pará", sigla: "PA", municipios: ["Belém", "Ananindeua", "Santarém"] },
    { nome: "Paraíba", sigla: "PB", municipios: ["João Pessoa", "Campina Grande"] },
    { nome: "Paraná", sigla: "PR", municipios: ["Curitiba", "Londrina", "Maringá"] },
    { nome: "Pernambuco", sigla: "PE", municipios: ["Recife", "Caruaru", "Olinda"] },
    { nome: "Piauí", sigla: "PI", municipios: ["Teresina", "Parnaíba", "Picos"] },
    { nome: "Rio de Janeiro", sigla: "RJ", municipios: ["Rio de Janeiro", "Niterói", "Duque de Caxias"] },
    { nome: "Rio Grande do Norte", sigla: "RN", municipios: ["Natal", "Mossoró", "Parnamirim"] },
    { nome: "Rio Grande do Sul", sigla: "RS", municipios: ["Porto Alegre", "Caxias do Sul", "Pelotas"] },
    { nome: "Rondônia", sigla: "RO", municipios: ["Porto Velho", "Ji-Paraná", "Ariquemes"] },
    { nome: "Roraima", sigla: "RR", municipios: ["Boa Vista"] },
    { nome: "Santa Catarina", sigla: "SC", municipios: ["Florianópolis", "Joinville", "Blumenau"] },
    { nome: "São Paulo", sigla: "SP", municipios: ["São Paulo", "Campinas", "Santos"] },
    { nome: "Sergipe", sigla: "SE", municipios: ["Aracaju", "Nossa Senhora do Socorro"] },
    { nome: "Tocantins", sigla: "TO", municipios: ["Palmas", "Araguaína"] }
];

function DetalhesVaga({ vaga, onAbrirModalContato, interesseMap, setInteresseMap }) {
    const savedLogoSrc = localStorage.getItem("companyLogoDataURL");
    const logoToDisplay = savedLogoSrc || vaga?.logo;
    const temInteresse = !!interesseMap[vaga?.id];

    const handleInteresseClick = () => {
        if (vaga && vaga.id) {
            setInteresseMap((prev) => ({ ...prev, [vaga.id]: true }));
        }
    };

    if (!vaga) {
        return (
            <aside className="detalhes-container placeholder">
                <h2>MAIS INFORMAÇÕES</h2>
                <div className="detalhes-empresa">
                    <div className="detalhes-logo logo-placeholder">LOGO</div>
                    <h3>NOME DA EMPRESA</h3>
                </div>
            </aside>
        );
    }

    return (
        <aside className="detalhes-container">
            <h2>MAIS INFORMAÇÕES</h2>
            <div className="detalhes-empresa">
                <img src={logoToDisplay || ""} alt={`Logo ${vaga.company}`} className="detalhes-logo" />
                <h3>{vaga.company}</h3>
            </div>
            <div className="detalhes-info">
                <strong>DIRIGENTE DA PROPOSTA</strong>
                <p>{vaga.dirigente || "Não informado"}</p>
                <strong>{vaga.title}</strong>
                <p>{vaga.period}</p>
                <p>{vaga.serviceType}</p>
            </div>
            {!temInteresse && (
                <button className="interesse-button" onClick={handleInteresseClick}>
                    <i className="bi bi-check-circle"></i> ESTOU INTERESSADO
                </button>
            )}
            <button
                onClick={onAbrirModalContato}
                className="contato-button"
                disabled={!temInteresse}
                title={!temInteresse ? "Clique em 'Estou Interessado' para desbloquear" : "Entrar em contato"}
            >
                ENTRAR EM CONTATO
            </button>
        </aside>
    );
}

function CardVaga({ vaga, estaAtiva, aoClicar }) {
    const className = `card-vaga ${estaAtiva ? "active" : ""}`;
    const getFavoritos = () => JSON.parse(localStorage.getItem("nexoraFavoritos") || "[]");

    const [isFavorito, setIsFavorito] = React.useState(() => {
        const favoritos = getFavoritos();
        return favoritos.some((fav) => fav.id === vaga.id);
    });

    const handleFavoritoClick = (e) => {
        e.stopPropagation();
        const favoritos = getFavoritos();
        let novosFavoritos;

        if (isFavorito) {
            novosFavoritos = favoritos.filter((fav) => fav.id !== vaga.id);
        } else {
            novosFavoritos = [{ ...vaga }, ...favoritos];
        }

        localStorage.setItem("nexoraFavoritos", JSON.stringify(novosFavoritos));
        setIsFavorito(!isFavorito);
    };

    return (
        <article className={className} onClick={aoClicar}>
            <h3>{vaga.title}</h3>
            <p className="empresa">{vaga.company}</p>
            <p className="local">
                {vaga.city} - {vaga.state}
            </p>
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
        const stored = localStorage.getItem("nexoraVagas");
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error("Erro ao carregar vagas:", error);
        return [];
    }
};

function PaginaDeVagas() {
    const [vagas, setVagas] = React.useState(loadVagasFromStorage);

    React.useEffect(() => {
        setVagas(loadVagasFromStorage());
        const handleStorageChange = (e) => {
            if (e.key === "nexoraVagas") {
                setVagas(loadVagasFromStorage());
            }
        };
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const [filtros, setFiltros] = React.useState({
        estado: "todos",
        municipio: "todos",
        nivel: "todos",
    });

    const [vagaSelecionadaId, setVagaSelecionadaId] = React.useState(null);
    const [modalContatoAberto, setModalContatoAberto] = React.useState(false);
    const [interesseMap, setInteresseMap] = React.useState({});

    const municipiosParaFiltro = React.useMemo(() => {
        if (filtros.estado === "todos") return [];
        const estadoObj = ESTADOS_DATA.find((e) => e.sigla === filtros.estado);
        return estadoObj ? estadoObj.municipios : [];
    }, [filtros.estado]);

    const vagasFiltradas = React.useMemo(() => {
        return vagas.filter((vaga) => {
            const passaEstado = filtros.estado === "todos" || vaga.state === filtros.estado;
            const passaMunicipio = filtros.municipio === "todos" || vaga.city === filtros.municipio;
            const passaNivel = filtros.nivel === "todos" || vaga.level === filtros.nivel;
            return passaEstado && passaMunicipio && passaNivel;
        });
    }, [vagas, filtros]);

    const vagaAtiva = React.useMemo(() => {
        if (vagaSelecionadaId) return vagas.find((v) => v.id === vagaSelecionadaId);
        return vagasFiltradas[0] || null;
    }, [vagaSelecionadaId, vagasFiltradas, vagas]);

    function handleFiltroChange(e) {
        const { name, value } = e.target;
        setFiltros((prev) => {
            const novos = { ...prev, [name]: value };
            if (name === "estado") novos.municipio = "todos";
            return novos;
        });
        setVagaSelecionadaId(null);
    }

    return (
        <>
            <div className="vagas-pagina-container">
                <nav className="filtros-container">
                    <select name="estado" value={filtros.estado} onChange={handleFiltroChange}>
                        <option value="todos">Selecione um Estado</option>
                        {ESTADOS_DATA.map((e) => (
                            <option key={e.sigla} value={e.sigla}>
                                {e.nome}
                            </option>
                        ))}
                    </select>

                    <select
                        name="municipio"
                        value={filtros.municipio}
                        onChange={handleFiltroChange}
                        disabled={filtros.estado === "todos"}
                    >
                        <option value="todos">Selecione um Município</option>
                        {municipiosParaFiltro.map((m) => (
                            <option key={m} value={m}>
                                {m}
                            </option>
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
                            vagasFiltradas.map((vaga) => (
                                <CardVaga
                                    key={vaga.id}
                                    vaga={vaga}
                                    estaAtiva={vagaAtiva && vaga.id === vagaAtiva.id}
                                    aoClicar={() => setVagaSelecionadaId(vaga.id)}
                                />
                            ))
                        ) : (
                            <p className="sem-vagas-aviso">Nenhuma vaga disponível.</p>
                        )}
                    </section>

                    <DetalhesVaga
                        vaga={vagaAtiva}
                        onAbrirModalContato={() => setModalContatoAberto(true)}
                        interesseMap={interesseMap}
                        setInteresseMap={setInteresseMap}
                    />
                </main>
            </div>

            {modalContatoAberto && (
                <div id="contatoModal" className="modal">
                    <div className="modal-content">
                        <button onClick={() => setModalContatoAberto(false)} style={{ float: "right" }}>
                            X
                        </button>
                        <h2>Contato</h2>
                        {vagaAtiva ? (
                            <div className="contato-info">
                                <p>
                                    <strong>LinkedIn:</strong>{" "}
                                    <a href={vagaAtiva.linkedin} target="_blank" rel="noopener noreferrer">
                                        {vagaAtiva.linkedin || "Não informado"}
                                    </a>
                                </p>
                                <p>
                                    <strong>Email:</strong>{" "}
                                    <a href={`mailto:${vagaAtiva.email}`}>{vagaAtiva.email || "Não informado"}</a>
                                </p>
                                <p>
                                    <strong>Telefone:</strong> {vagaAtiva.phone || "Não informado"}
                                </p>
                            </div>
                        ) : (
                            <p>Erro ao carregar informações de contato.</p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

function FooterComModals() {
    const [modalAberto, setModalAberto] = React.useState(null);
    const fechar = () => setModalAberto(null);

    return (
        <>
            <footer className="rodape">
                <div className="rodape-links">
                    <button onClick={() => setModalAberto("ajuda")} className="link-button">
                        Ajuda
                    </button>
                    <span className="separador">|</span>
                    <button onClick={() => setModalAberto("feedback")} className="link-button">
                        Feedback
                    </button>
                    <span className="separador">|</span>
                    <button onClick={() => setModalAberto("termos")} className="link-button">
                        Termos e Privacidade
                    </button>
                </div>
            </footer>

            {modalAberto && (
                <div className="modal">
                    <div className="modal-content">
                        <button onClick={fechar} style={{ float: "right" }}>
                            X
                        </button>

                        {modalAberto === "termos" && (
                            <>
                                <h2>Termos e Serviços</h2>
                                <p>PLACEHOLDER DE TERMOS.</p>
                            </>
                        )}

                        {modalAberto === "ajuda" && (
                            <>
                                <h2>Ajuda</h2>
                                <p>Selecione o tipo de problema para suporte.</p>
                            </>
                        )}

                        {modalAberto === "feedback" && (
                            <>
                                <h2>Envie seu Feedback</h2>
                                <form>
                                    <label>Nome:</label>
                                    <input type="text" placeholder="Seu nome completo" />
                                    <label>Email:</label>
                                    <input type="email" placeholder="Seu email" />
                                    <label>Feedback:</label>
                                    <textarea rows="5" maxLength="500"></textarea>
                                    <button type="submit">Enviar</button>
                                    <button type="reset">Limpar</button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

ReactDOM.createRoot(document.getElementById("react-userActions")).render(<UserActions />);
ReactDOM.createRoot(document.getElementById("react-footer-e-modals")).render(<FooterComModals />);
ReactDOM.createRoot(document.getElementById("root-vagas")).render(<PaginaDeVagas />);