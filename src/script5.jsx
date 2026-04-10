function PortifolioManager() {
    const [projetos, setProjetos] = React.useState([]);
    const [modalAberto, setModalAberto] = React.useState(false);
    const [editandoId, setEditandoId] = React.useState(null);
    const [formData, setFormData] = React.useState({
        titulo: '',
        descricao: '',
        tecnologias: '',
        link: '',
        imagem: ''
    });

    React.useEffect(() => {
        const projetosArmazenados = JSON.parse(localStorage.getItem('nexoraProjetos') || '[]');
        setProjetos(projetosArmazenados);
    }, []);

    const salvarProjetos = (novosProjetos) => {
        localStorage.setItem('nexoraProjetos', JSON.stringify(novosProjetos));
        setProjetos(novosProjetos);
    };

    const handleAbrirModal = (projeto = null) => {
        if (projeto) {
            setEditandoId(projeto.id);
            setFormData(projeto);
        } else {
            setEditandoId(null);
            setFormData({
                titulo: '',
                descricao: '',
                tecnologias: '',
                link: '',
                imagem: ''
            });
        }
        setModalAberto(true);
    };

    const handleFecharModal = () => {
        setModalAberto(false);
        setEditandoId(null);
        setFormData({
            titulo: '',
            descricao: '',
            tecnologias: '',
            link: '',
            imagem: ''
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImagemUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setFormData({
                    ...formData,
                    imagem: event.target.result
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSalvarProjeto = (e) => {
        e.preventDefault();
        
        if (!formData.titulo.trim()) {
            alert('Por favor, preencha o título do projeto.');
            return;
        }

        if (editandoId) {
            const novosProjetos = projetos.map(p => 
                p.id === editandoId ? { ...formData, id: editandoId } : p
            );
            salvarProjetos(novosProjetos);
            alert('Projeto atualizado com sucesso!');
        } else {
            const novoProjeto = {
                ...formData,
                id: Date.now()
            };
            salvarProjetos([...projetos, novoProjeto]);
            alert('Projeto adicionado com sucesso!');
        }
        
        handleFecharModal();
    };

    const handleRemoverProjeto = (id) => {
        if (confirm('Tem certeza que deseja remover este projeto?')) {
            const novosProjetos = projetos.filter(p => p.id !== id);
            salvarProjetos(novosProjetos);
            alert('Projeto removido com sucesso!');
        }
    };

    return (
        <div className="portfolio-container">
            <div className="portfolio-header">
                <h2>Seu Portfólio</h2>
                <button 
                    onClick={() => handleAbrirModal()} 
                    className="btn-adicionar-projeto"
                >
                    <i className="bi bi-plus-circle"></i> Adicionar Projeto
                </button>
            </div>

            {projetos.length === 0 ? (
                <div className="portfolio-vazio">
                    <i className="bi bi-folder-open"></i>
                    <p>Você ainda não adicionou nenhum projeto.</p>
                    <button 
                        onClick={() => handleAbrirModal()} 
                        className="btn-adicionar-projeto"
                    >
                        <i className="bi bi-plus-circle"></i> Adicionar Seu Primeiro Projeto
                    </button>
                </div>
            ) : (
                <div className="portfolio-grid">
                    {projetos.map(projeto => (
                        <div key={projeto.id} className="portfolio-card">
                            {projeto.imagem && (
                                <div className="portfolio-card-imagem">
                                    <img src={projeto.imagem} alt={projeto.titulo} />
                                </div>
                            )}
                            <div className="portfolio-card-conteudo">
                                <h3>{projeto.titulo}</h3>
                                <p className="portfolio-descricao">{projeto.descricao}</p>
                                {projeto.tecnologias && (
                                    <div className="portfolio-tecnologias">
                                        {projeto.tecnologias.split(',').map((tech, idx) => (
                                            <span key={idx} className="tech-tag">
                                                {tech.trim()}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                {projeto.link && (
                                    <a href={projeto.link} target="_blank" rel="noopener noreferrer" className="portfolio-link">
                                        <i className="bi bi-link-45deg"></i> Acessar Projeto
                                    </a>
                                )}
                            </div>
                            <div className="portfolio-card-acoes">
                                <button 
                                    onClick={() => handleAbrirModal(projeto)} 
                                    className="btn-editar"
                                    title="Editar"
                                >
                                    <i className="bi bi-pencil"></i>
                                </button>
                                <button 
                                    onClick={() => handleRemoverProjeto(projeto.id)} 
                                    className="btn-remover"
                                    title="Remover"
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {modalAberto && (
                <div className="portfolio-modal-overlay">
                    <div className="portfolio-modal-conteudo">
                        <button 
                            onClick={handleFecharModal} 
                            className="btn-fechar-modal"
                        >
                            ×
                        </button>
                        
                        <h2>{editandoId ? 'Editar Projeto' : 'Adicionar Novo Projeto'}</h2>
                        
                        <form onSubmit={handleSalvarProjeto}>
                            <div className="form-group">
                                <label htmlFor="titulo">Título do Projeto:</label>
                                <input
                                    type="text"
                                    id="titulo"
                                    name="titulo"
                                    value={formData.titulo}
                                    onChange={handleInputChange}
                                    placeholder="Ex: Aplicativo de Gestão de Vagas"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="descricao">Descrição:</label>
                                <textarea
                                    id="descricao"
                                    name="descricao"
                                    value={formData.descricao}
                                    onChange={handleInputChange}
                                    placeholder="Descreva seu projeto..."
                                    rows="4"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="tecnologias">Tecnologias (separadas por vírgula):</label>
                                <input
                                    type="text"
                                    id="tecnologias"
                                    name="tecnologias"
                                    value={formData.tecnologias}
                                    onChange={handleInputChange}
                                    placeholder="Ex: React, Node.js, MongoDB"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="link">Link do Projeto:</label>
                                <input
                                    type="url"
                                    id="link"
                                    name="link"
                                    value={formData.link}
                                    onChange={handleInputChange}
                                    placeholder="https://seu-projeto.com"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="imagem">Imagem da Capa:</label>
                                <input
                                    type="file"
                                    id="imagem"
                                    accept="image/*"
                                    onChange={handleImagemUpload}
                                />
                                {formData.imagem && (
                                    <div className="imagem-preview">
                                        <img src={formData.imagem} alt="Preview" />
                                    </div>
                                )}
                            </div>

                            <div className="form-buttons">
                                <button type="submit" className="btn-salvar">
                                    {editandoId ? 'Atualizar' : 'Adicionar'} Projeto
                                </button>
                                <button 
                                    type="button" 
                                    onClick={handleFecharModal} 
                                    className="btn-cancelar"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('reactprofile-screenshot')).render(<PortifolioManager />);
