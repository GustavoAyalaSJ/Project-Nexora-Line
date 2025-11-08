alert('Atenção caro usuário!');
alert('Você está acessando um protótipo desenvolvido apenas para fins de demonstração, ele não é 100% operacional.');
alert('Obrigado pela atenção!');

function HeaderLinks() {
    const [modalAberto, setModalAberto] = React.useState(null);

    const handleAbrirTermos = () => setModalAberto('termos');
    const handleAbrirSuporte = () => setModalAberto('suporte');
    const handleFecharModal = () => setModalAberto(null);

    return (
        <>
            <div className="header-links">
                <a onClick={handleAbrirTermos}>Termos e Serviços</a>
                <span className="separador">|</span>
                <a onClick={handleAbrirSuporte} style={{ marginLeft: '10px' }}>Suporte</a>
            </div>

            {modalAberto === 'termos' && (
                <div className="modal">
                    <div className="modal-content">
                        <button onClick={handleFecharModal}>X</button>
                        <h2>Termos e Serviços</h2>
                        <p>PLACEHOLDER</p>
                    </div>
                </div>
            )}

            {modalAberto === 'suporte' && (
                <div className="modal">
                    <div className="modal-content">
                        <button onClick={handleFecharModal}>X</button>
                        <h2>Suporte</h2>
                        <form>
                            <label>Nome:</label>
                            <input type="text" placeholder="Informe seu nome completo" />
                            <label>Email:</label>
                            <input type="email" placeholder="Informe seu email" />
                            <label>Número:</label>
                            <input type="tel" placeholder="Informe seu número de telefone" maxLength="11" />
                            <label>Problema:</label>
                            <select>
                                <option>Selecione</option>
                                <option>Problema 1</option>
                                <option>Problema 2</option>
                                <option>Problema 3</option>
                            </select>
                            <label>Mensagem:</label>
                            <textarea rows="5" maxLength="500"></textarea>
                            <button type="submit">Enviar</button>
                            <button type="reset">Limpar</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

function ModaisNexora() {
    const [modalAberto, setModalAberto] = React.useState(null);
    const [mostrarTermos, setMostrarTermos] = React.useState(false);
    const [mostrarPolitica, setMostrarPolitica] = React.useState(false);
    const [mostrarSenha, setMostrarSenha] = React.useState(false);
    const [papelSelecionado, setPapelSelecionado] = React.useState(null);

    const handleAbrirTermos = () => setMostrarTermos(true);
    const handleAbrirPolítica = () => setMostrarPolitica(true);
    const handleFecharTermos = () => setMostrarTermos(false);
    const handleFecharPolitica = () => setMostrarPolitica(false);

    const handleAbrirForm = () => {
        setModalAberto('formulário');
        setPapelSelecionado(null);
    };
    const handleFecharModal = () => {
        setModalAberto(null);
        setPapelSelecionado(null);
    };

    const handleSelecionarPapel = (papel) => {
        setPapelSelecionado(papel);
        setModalAberto(null);
    };

    const handleAbrirCadastro = () => {
        if (papelSelecionado === 'candidato') {
            setModalAberto('cadastro_candidato');
        } else if (papelSelecionado === 'empresa') {
            setModalAberto('cadastro_empresa');
        }
    };

    const buttonContainer = document.getElementById('react-button-underTextleft');
    const formSelectionContainer = document.getElementById('react-form-label');

    // Efeito de Blur Condicional
    React.useEffect(() => {
        const container = document.querySelector('.background-container');
        if (container) {
            const isLoginOpen = papelSelecionado !== null;
            const isRegisterOpen = modalAberto === 'cadastro_candidato' || modalAberto === 'cadastro_empresa';

            const blurAtivo = isLoginOpen || isRegisterOpen;

            container.classList.toggle('blurred', blurAtivo);
        }
    }, [modalAberto, papelSelecionado]);

    return (
        <>
            {buttonContainer && !modalAberto && ReactDOM.createPortal(
                <a onClick={handleAbrirForm} className="btn-landing">ACESSAR</a>,
                buttonContainer
            )}

            {formSelectionContainer && modalAberto === 'formulário' && ReactDOM.createPortal(
                <div className="modal-card">
                    <h2>Você está cadastrado como?</h2>
                    <a onClick={() => handleSelecionarPapel('candidato')}
                        className={`role-candidato ${papelSelecionado === 'candidato' ? 'selected' : ''}`}>CANDIDATO</a>
                    <p>ou</p>
                    <a onClick={() => handleSelecionarPapel('empresa')}
                        className={`role-empresa ${papelSelecionado === 'empresa' ? 'selected' : ''}`}>EMPRESA</a>
                </div>,
                formSelectionContainer
            )}

            {papelSelecionado && (
                <div className="login-card">
                    <button onClick={handleFecharModal}>X</button>
                    <p>Você selecionou: <strong>{papelSelecionado.toUpperCase()}</strong></p>
                    <div className="warning-box">
                        Nexora recomenda {papelSelecionado === 'empresa' ? 'usar email oficial da empresa' : 'login para maiores de 18 anos'}.
                    </div>
                    <form
                        autoComplete="off"
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (papelSelecionado === 'candidato') {
                                window.location.href = "UserPage.html";
                            } else if (papelSelecionado === 'empresa') {
                                window.location.href = "EmpresaPage.html";
                            }
                        }}
                    >
                        <label>Email:</label>
                        <input type="email" placeholder="Digite seu email" />
                        <a href="#">Esqueceu o email?</a>

                        <label>Senha:</label>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input type={mostrarSenha ? "text" : "password"} placeholder="Digite sua senha" />
                            <span onClick={() => setMostrarSenha(!mostrarSenha)}
                                style={{ marginLeft: '10px', cursor: 'pointer' }}>
                                {mostrarSenha ? (
                                    <i className="bi bi-eye-slash-fill"></i> // Adicione o link para o Bootstrap Icons no seu HTML
                                ) : (
                                    <i className="bi bi-eye-fill"></i>
                                )}
                            </span>
                        </div>
                        <a href="#">Esqueceu a senha?</a>

                        <button type="submit">LOGAR</button>
                        <button type="button" onClick={handleAbrirCadastro}>CADASTRE-SE</button>

                        <p>
                            Ao conectar-se com este site, você concorda com nossos
                            <a onClick={handleAbrirTermos} style={{ cursor: 'pointer' }}> Termos de Uso </a> e
                            <a onClick={handleAbrirPolítica} style={{ cursor: 'pointer' }}> Política de Privacidade </a>.
                        </p>
                    </form>
                </div>
            )}

            {/* Modal de Termos (Não ativa o blur) */}
            {mostrarTermos && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button onClick={handleFecharTermos}>X</button>
                        <h2>Termos de Uso</h2>
                        <p>PLACEHOLDER</p>
                    </div>
                </div>
            )}

            {mostrarPolitica && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button onClick={handleFecharPolitica}>X</button>
                        <h2>Política de Privacidade</h2>
                        <p>PLACEHOLDER</p>
                    </div>
                </div>
            )}

            {modalAberto === 'cadastro_candidato' && (
                <div className="login-card">
                    <button onClick={handleFecharModal}>X</button>
                    <p>Cadastro selecionado: <strong>CANDIDATO</strong></p>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleFecharModal();
                        setModalAberto('verificacao');
                        autoComplete = "off";
                        window.location.href = "UserPage.html";
                    }}>
                        <label>Nome Completo:</label>
                        <input type="text" placeholder="Seu nome" required />
                        <div className="linha-dupla">
                            <div>
                                <label>Data:</label>
                                <input type="text" placeholder="--/--/----" required />
                            </div>
                            <div>
                                <label>CPF:</label>
                                <input type="text" placeholder="000.000.000.00" required />
                            </div>
                        </div>
                        <div className="linha-dupla">
                            <div>
                                <label>CEP:</label>
                                <input type="text" placeholder="00000-000" required />
                            </div>
                            <div>
                                <label>Celular:</label>
                                <input type="text" placeholder="00-00000-0000" required />
                            </div>
                        </div>
                        <label>Email:</label>
                        <input type="email" placeholder="email@seuemail.com" required />
                        <label>Senha:</label>
                        <input type="password" placeholder="Crie uma senha" required />
                        <label>Confirmar Senha:</label>
                        <input type="password" placeholder="Confirmar senha" required />
                        <button className="FinalizarCadastro" type="submit">FINALIZAR CADASTRO</button>
                    </form>
                    <a className="tenhoConta" onClick={() => { handleFecharModal(); setPapelSelecionado('candidato'); }}>
                        Já tenho uma conta
                    </a>
                </div>
            )}

            {modalAberto === 'cadastro_empresa' && (
                <div className="login-card">
                    <button onClick={handleFecharModal}>X</button>
                    <p>Cadastro selecionado: <strong>EMPRESA</strong></p>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleFecharModal();
                        autoComplete = "off";
                        window.location.href = "EmpresaPage.html";
                    }}>
                        <label>Nome da Empresa:</label>
                        <input type="text" placeholder="Nome oficial da Empresa" required />
                        <label>CNPJ:</label>
                        <input type="text" placeholder="00.000.000/0001-00" required />
                        <label>Endereço Empresarial:</label>
                        <input type="text" placeholder="Endereço Empresarial" required />
                        <label>CEP:</label>
                        <input type="text" placeholder="00000-000" required />
                        <label>Email Comercial:</label>
                        <input type="email" placeholder="email@suaempresa.com" required />
                        <label>Senha:</label>
                        <input type="password" placeholder="Crie uma senha" required />
                        <label>Confirmar Senha:</label>
                        <input type="password" placeholder="Confirmar senha" required />
                        <button className="FinalizarCadastro" type="submit">FINALIZAR CADASTRO</button>
                    </form>
                    <a className="tenhoConta" onClick={() => { handleFecharModal(); setPapelSelecionado('empresa'); }}>
                        Já tenho uma conta
                    </a>
                </div>
            )}
        </>
    );
}


// Renderização
ReactDOM.createRoot(document.getElementById('react-header-links')).render(<HeaderLinks />);
ReactDOM.createRoot(document.getElementById('root')).render(<ModaisNexora />);
