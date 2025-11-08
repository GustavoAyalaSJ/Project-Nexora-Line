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

function VagaPublicadaCard({ vaga, onSelectVaga, isSelected, onRemove }) {
    const className = `vaga-card ${isSelected ? 'selected' : ''}`;
    const statusClass = `status-${vaga.status.toLowerCase()}`;

    const handleRemoverClick = (e) => {
        e.stopPropagation();
        const confirmacao = window.confirm(`Deseja realmente remover a vaga: "${vaga.title}"?`);
        if (confirmacao) onRemove(vaga.id);
    };

    return (
        <article className={className} onClick={() => onSelectVaga(vaga.id)}>
            <h3>{vaga.title}</h3>
            <p className={statusClass}>Status: <strong>{vaga.status}</strong></p>
            <div className="card-footer">
                <span>Ativa há {vaga.daysActive} dias</span>
                <span>Candidatos: {vaga.applicants}</span>
            </div>

            <button
                type="button"
                className="delete-vaga-btn"
                onClick={handleRemoverClick}
            >
                <i className="bi bi-trash"></i>
            </button>
        </article>
    );
}

function DisplayVaga({ vaga }) {
    if (!vaga) {
        return (
            <div className="vaga-display-placeholder">
                <h2>DISPLAY DE VAGA</h2>
                <p>Selecione uma vaga para visualizar ou clique em "Criar Vaga".</p>
            </div>
        );
    }
    return (
        <div className="vaga-display-detalhes">
            <h2>{vaga.title}</h2>
            <p>Detalhes completos da vaga ID: {vaga.id}</p>
            <button className="edit-vaga-button"><i className="bi bi-pencil"></i> Editar Vaga</button>
        </div>
    );
}

const getStoredVagas = () => {
    try {
        const stored = localStorage.getItem('nexoraVagas');
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error("Erro ao carregar vagas do localStorage:", error);
        return [];
    }
};

const saveVagasToStorage = (vagas) => {
    try {
        localStorage.setItem('nexoraVagas', JSON.stringify(vagas));
    } catch (error) {
        console.error("Erro ao salvar vagas no localStorage:", error);
    }
};

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.getElementById("logoPreview");
            const dataURL = e.target.result;

            img.src = dataURL;

            localStorage.setItem('companyLogoDataURL', dataURL);
        };
        reader.readAsDataURL(file);
    }
}

(function loadSavedLogo() {
    const savedLogo = localStorage.getItem('companyLogoDataURL');
    const logoPreview = document.getElementById("logoPreview");

    if (savedLogo && logoPreview) {
        logoPreview.src = savedLogo;
    }
})();



function FormularioCriacaoVaga({ onCancel, onPublicar }) {
    const [estadoSelecionado, setEstadoSelecionado] = React.useState('');
    const [municipios, setMunicipios] = React.useState([]);
    const [formData, setFormData] = React.useState({
        title: '',
        company: '',
        dirigente: '',
        period: '',
        state: '',
        city: '',
        level: '',
        serviceType: '',
        details: '',
        phone: '',
        email: '',
        linkedin: ''
    });

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEstadoChange = (e) => {
        const sigla = e.target.value;
        setEstadoSelecionado(sigla);
        setFormData(prev => ({ ...prev, state: sigla, city: '' }));

        const estadoObj = ESTADOS_DATA.find(e => e.sigla === sigla);
        setMunicipios(estadoObj ? estadoObj.municipios : []);
    };

    const handlePublicar = (e) => {
        e.preventDefault();

        if (!formData.title || !formData.company || !formData.state) {
            alert('Por favor, preencha o Título, Empresa e Estado.');
            return;
        }

        onPublicar(formData);
    }

    return (
        <div className="form-vaga-container">
            <h2 className="titulo-form">CRIAR NOVA VAGA</h2>
            <form onSubmit={handlePublicar}>
                <div className="form-content-box">

                    <div className="form-header-group">
                        <div className="logo-upload-group">
                            <img
                                id="logoPreview"
                                className="logo-preview-box"
                                alt="Logo preview"
                                src=""
                            />
                            <input
                                type="file"
                                accept="image/*"
                                id="logoInput"
                                style={{ display: "none" }}
                                onChange={handleImageUpload}
                            />
                            <button
                                type="button"
                                className="upload-button"
                                onClick={() => document.getElementById("logoInput").click()}
                            >
                                <i className="bi bi-cloud-arrow-up"></i> UPLOAD
                            </button>
                        </div>


                        <div className="input-group-columns">
                            <label>Título da Vaga</label>
                            <input name="title" value={formData.title} onChange={handleFormChange} type="text" placeholder="Ex: Desenvolvedor Front-end Pleno" className="input-title" required />

                            <label>Nome da Empresa</label>
                            <input name="company" value={formData.company} onChange={handleFormChange} type="text" placeholder="Nome da sua empresa" required />

                            <label>Dirigente da Proposta</label>
                            <input name="dirigente" value={formData.dirigente} onChange={handleFormChange} type="text" placeholder="Ex: Diretor de RH" />
                        </div>
                    </div>

                    <h3 className="section-title">INFORMAÇÕES SOBRE SUA VAGA</h3>
                    <div className="vaga-info-group">
                        <div className="info-item">
                            <label>PERÍODO</label>
                            <input name="period" value={formData.period} onChange={handleFormChange} type="text" placeholder="Ex: Tempo Integral" />
                        </div>

                        <div className="info-item">
                            <label>Estado situado(a)</label>
                            <select name="state" value={formData.state} onChange={handleEstadoChange} required>
                                <option value="">Selecione</option>
                                {ESTADOS_DATA.map(e => (
                                    <option key={e.sigla} value={e.sigla}>{e.nome}</option>
                                ))}
                            </select>
                        </div>

                        <div className="info-item">
                            <label>Município situado(a)</label>
                            <select name="city" value={formData.city} onChange={handleFormChange} disabled={!estadoSelecionado} required>
                                <option value="">Selecione</option>
                                {municipios.map(m => (
                                    <option key={m} value={m}>{m}</option>
                                ))}
                            </select>
                        </div>

                        <div className="info-item">
                            <label>TIPO PROFISSIONAL</label>
                            <select name="level" value={formData.level} onChange={handleFormChange}>
                                <option value="">Selecione</option>
                                <option value="junior">Júnior</option>
                                <option value="pleno">Pleno</option>
                                <option value="senior">Sênior</option>
                            </select>
                        </div>

                        <div className="info-item">
                            <label>TIPO DE TRABALHO</label>
                            <select name="serviceType" value={formData.serviceType} onChange={handleFormChange}>
                                <option value="">Selecione</option>
                                <option value="remoto">Remoto</option>
                                <option value="hibrido">Híbrido</option>
                                <option value="presencial">Presencial</option>
                            </select>
                        </div>
                    </div>

                    <h3 className="section-title">DETALHES</h3>
                    <textarea name="details" value={formData.details} onChange={handleFormChange} rows="6" placeholder="Descreva os requisitos, responsabilidades e benefícios da vaga."></textarea>

                    <h3 className="section-title">CONTATO:</h3>
                    <div className="contact-group">
                        <input name="phone" value={formData.phone} onChange={handleFormChange} type="tel" placeholder="Telefone" />
                        <input name="email" value={formData.email} onChange={handleFormChange} type="email" placeholder="Email de Contato" />
                        <input name="linkedin" value={formData.linkedin} onChange={handleFormChange} type="url" placeholder="Link do LinkedIn" />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="button-publicar">PUBLICAR VAGA</button>
                        <button type="button" onClick={onCancel} className="button-cancelar">CANCELAR</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

function GerenciamentoVagas() {
    const [vagas, setVagas] = useState([]);
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [localizacao, setLocalizacao] = useState("");
    const [editando, setEditando] = useState(null);

    useEffect(() => {
        const vagasSalvas = JSON.parse(localStorage.getItem("nexoraVagas")) || [];
        setVagas(vagasSalvas);
    }, []);

    const atualizarLocalStorage = (vagasAtualizadas) => {
        localStorage.setItem("nexoraVagas", JSON.stringify(vagasAtualizadas));
        setVagas(vagasAtualizadas);

        window.dispatchEvent(new Event("storage"));
    };

    const salvarVaga = (e) => {
        e.preventDefault();

        if (editando !== null) {
            const vagasAtualizadas = vagas.map((vaga, index) =>
                index === editando ? { titulo, descricao, localizacao } : vaga
            );
            atualizarLocalStorage(vagasAtualizadas);
            setEditando(null);
        } else {
            const novaVaga = { titulo, descricao, localizacao };
            const vagasAtualizadas = [...vagas, novaVaga];
            atualizarLocalStorage(vagasAtualizadas);
        }

        setTitulo("");
        setDescricao("");
        setLocalizacao("");
    };

    const removerVaga = (index) => {
        const vagasAtualizadas = vagas.filter((_, i) => i !== index);
        atualizarLocalStorage(vagasAtualizadas);
    };

    const editarVaga = (index) => {
        const vaga = vagas[index];
        setTitulo(vaga.titulo);
        setDescricao(vaga.descricao);
        setLocalizacao(vaga.localizacao);
        setEditando(index);
    };

    return (
        <div className="gerenciamento-container">
            <h2>Gerenciamento de Vagas</h2>

            <form onSubmit={salvarVaga} className="form-vagas">
                <input
                    type="text"
                    placeholder="Título da vaga"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Descrição da vaga"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Localização"
                    value={localizacao}
                    onChange={(e) => setLocalizacao(e.target.value)}
                    required
                />
                <button type="submit">
                    {editando !== null ? "Atualizar Vaga" : "Adicionar Vaga"}
                </button>
            </form>

            <ul className="lista-vagas">
                {vagas.map((vaga, index) => (
                    <li key={index} className="vaga-item">
                        <h3>{vaga.titulo}</h3>
                        <p>{vaga.descricao}</p>
                        <p><strong>Local:</strong> {vaga.localizacao}</p>
                        <div className="botoes">
                            <button onClick={() => editarVaga(index)}>Editar</button>
                            <button onClick={() => removerVaga(index)}>Remover</button>
                        </div>
                    </li>
                ))}
            </ul>
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

ReactDOM.createRoot(document.getElementById('root')).render(<GerenciamentoVagas />);
ReactDOM.createRoot(document.getElementById('react-userActions')).render(<UserActions />);