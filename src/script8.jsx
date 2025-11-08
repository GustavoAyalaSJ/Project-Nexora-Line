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
            <p>Empresa: {vaga.company}</p>
            <p>Dirigente: {vaga.dirigente || 'Não informado'}</p>
            <p>Período: {vaga.period || 'Não informado'}</p>
            <p>Local: {vaga.city}, {vaga.state}</p>
            <p>Tipo Profissional: {vaga.level || 'Não informado'}</p>
            <p>Tipo de Trabalho: {vaga.serviceType || 'Não informado'}</p>
            <p>Detalhes: {vaga.details || 'Nenhum detalhe fornecido.'}</p>
            <p>Contato: {vaga.phone || 'Não informado'} | {vaga.email || 'Não informado'}</p>
            {vaga.linkedin && <p>LinkedIn: <a href={vaga.linkedin} target="_blank" rel="noopener noreferrer">{vaga.linkedin}</a></p>}
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

// Chamar esta função após o carregamento inicial da página para carregar o logo salvo
document.addEventListener('DOMContentLoaded', () => {
    const savedLogo = localStorage.getItem('companyLogoDataURL');
    const logoPreview = document.getElementById("logoPreview");

    if (savedLogo && logoPreview) {
        logoPreview.src = savedLogo;
    }
});


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

        if (!formData.title || !formData.company || !formData.state || !formData.city) {
            alert('Por favor, preencha o Título, Empresa, Estado e Município.');
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
                                src="https://via.placeholder.com/120x120?text=Logo" // Placeholder padrão
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
    const [vagasPublicadas, setVagasPublicadas] = React.useState(getStoredVagas);
    const [viewMode, setViewMode] = React.useState('list'); // 'list', 'create', 'details'

    const [selectedVagaId, setSelectedVagaId] = React.useState(null);

    const nextId = React.useMemo(() => {
        return vagasPublicadas.length > 0
            ? Math.max(...vagasPublicadas.map(v => v.id)) + 1
            : 1;
    }, [vagasPublicadas]);

    const handlePublicarVaga = (novaVagaData) => {
        const novaVaga = {
            id: nextId,
            title: novaVagaData.title,
            company: novaVagaData.company,
            state: novaVagaData.state,
            city: novaVagaData.city,
            status: 'Ativa',
            daysActive: 0,
            applicants: 0,
            ...novaVagaData
        };

        const novasVagas = [novaVaga, ...vagasPublicadas];
        setVagasPublicadas(novasVagas);

        saveVagasToStorage(novasVagas);

        setSelectedVagaId(novaVaga.id);
        setViewMode('details');
        alert(`Vaga "${novaVaga.title}" publicada com sucesso! (ID: ${novaVaga.id})`);
    };

    const handleRemoverVaga = (vagaId) => {
        setVagasPublicadas((vagasAtuais) => {
            const novasVagas = vagasAtuais.filter(v => v.id !== vagaId);
            saveVagasToStorage(novasVagas);
            return novasVagas;
        });

        if (selectedVagaId === vagaId) {
            setSelectedVagaId(null);
            setViewMode('list'); // Volta para a visualização de lista vazia ou primeira vaga
        }
    };

    const vagaAtiva = React.useMemo(() => {
        return vagasPublicadas.find(v => v.id === selectedVagaId);
    }, [selectedVagaId, vagasPublicadas]);

    const handleSelectVaga = (id) => {
        setSelectedVagaId(id);
        setViewMode('details');
    };

    const handleCriarVagaClick = () => {
        setViewMode('create');
        setSelectedVagaId(null); // Desseleciona qualquer vaga ao criar uma nova
    };

    const handleCancelForm = () => {
        setViewMode('list'); // Volta para a visualização de lista
        setSelectedVagaId(null);
    };

    const renderDisplayContent = () => {
        if (viewMode === 'create') {
            return <FormularioCriacaoVaga onCancel={handleCancelForm} onPublicar={handlePublicarVaga} />;
        }

        // Se estiver em 'details' ou 'list' e houver uma vaga selecionada, exibe os detalhes
        if (vagaAtiva) {
            return <DisplayVaga vaga={vagaAtiva} />;
        }
        
        // Caso contrário, mostra o placeholder.
        return <DisplayVaga vaga={null} />; 
    };

    return (
        <React.Fragment>
            <div className="dashboard-container">
                <main className="gerenciamento-layout">
                    <section className="vagas-publicadas-section">
                        <div className="section-header">
                            <h2>LISTA DE VAGAS PUBLICADAS</h2>
                            <button className="filter-button"><i className="bi bi-funnel"></i> FILTRAR <i className="bi bi-chevron-down"></i></button>
                        </div>

                        <div className="vagas-list-scroll">
                            {vagasPublicadas.length > 0 ? (
                                vagasPublicadas.map(vaga => (
                                    <VagaPublicadaCard
                                        key={vaga.id}
                                        vaga={vaga}
                                        isSelected={vaga.id === selectedVagaId}
                                        onSelectVaga={handleSelectVaga}
                                        onRemove={handleRemoverVaga}
                                    />
                                ))
                            ) : (
                                <p className="empty-list-message">Nenhuma vaga publicada ainda. Clique em "Criar Vagas" para começar.</p>
                            )}
                        </div>
                    </section>

                    <section className="vagas-display-section">
                        <button onClick={handleCriarVagaClick} className="create-vaga-button">
                            CRIAR VAGAS
                        </button>
                        {renderDisplayContent()}
                    </section>
                </main>
            </div>
        </React.Fragment>
    );
}

function UserActions() {
    const [dropdownAberto, setDropdownAberto] = React.useState(null);
    const dropdownRef = React.useRef(null);

    const handleAbrirNotificações = () => setDropdownAberto(prev => prev === 'notifications-button' ? null : 'notifications-button');
    const handleAbrirPerfil = () => setDropdownAberto(prev => prev === 'profile-button' ? null : 'profile-button');

    React.useEffect(() => {
        function handleClickFora(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                event.target.closest('.icon-button') === null // Não fechar se o clique for no próprio botão
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
                    <button onClick={() => setDropdownAberto(null)} className="close-dropdown">Fechar</button>
                </div>
            )}

            {dropdownAberto === 'profile-button' && (
                <div ref={dropdownRef} className="dropdown-content" id="profile-dropdown">
                    <a href="PerfilEmpresaPage.html" className="settings-link"><i className="bi bi-person-badge"></i>Perfil</a>
                    <a href="#" className="settings-link"><i className="bi bi-gear"></i> Configurações</a>
                    <a href="IntroducedPage.html"><i className="bi bi-box-arrow-left"></i> Sair</a>
                    <button onClick={() => setDropdownAberto(null)} className="close-dropdown">Fechar</button>
                </div>
            )}
        </React.Fragment>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<GerenciamentoVagas />);
ReactDOM.createRoot(document.getElementById('react-userActions')).render(<UserActions />);