const { useState } = React;

function Header() {
    return (
        <header className="header">
            <div className="logo">
                <img src="Assets/Nexora-PurpleLight.png" alt="Nexora logo" />
            </div>
            <nav className="nav-links">
                <a>Suporte</a>
                <span className="separator">|</span>
                <a>Termos e Serviços</a>
            </nav>
        </header>
    );
}

function HeroSection() {
    const [activeModal, setActiveModal] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [recoveryType, setRecoveryType] = useState(null);

    const abrirModalSelecao = () => setActiveModal('select');
    const fecharModal = () => {
        setActiveModal(null);
        setRecoveryType(null);
        setShowPassword(false);
    };

    const mostrarAvisoDesenvolvimento = (pagina) => {
        const continuar = window.confirm(
            'Atenção: Esta é uma aplicação em desenvolvimento e algumas funcionalidades podem não funcionar corretamente.'
        );

        if (continuar) {
            window.location.href = pagina;
        }
    };

    const loginCandidato = () => {
        mostrarAvisoDesenvolvimento('index2.html');
    };

    const loginEmpresa = () => {
        mostrarAvisoDesenvolvimento('index3.html');
    };

    return (
        <main className="hero-content">
            <div className="visual-section">
                <h1 className="nexora-title">
                    Nexora <span className="brand-line">Line</span>
                </h1>

                <p>
                    Nexora Line é um site profissional no ramo especializado de gerenciamento nas vagas de emprego para
                    desenvolvedores em TI. Nosso compromisso é com a inovação, oferecendo aos nossos clientes e empresas
                    ferramentas para facilitar a busca por ambos. Nosso ambiente web é dinâmico, pois, graças à tecnologia temos o
                    potencial de mudar a busca pelo emprego e dedicação para o futuro. Junte-se a nós!
                </p>

                <button className="btn-cta" onClick={abrirModalSelecao}>
                    ACESSAR
                </button>
            </div>

            {activeModal && (
                <div className="modal-backdrop" onClick={fecharModal}>
                    <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>

                        {activeModal === 'select' && (
                            <div className="modal-box modal-selection">
                                <button className="modal-close-btn" onClick={fecharModal}>
                                    <i className="bi bi-x-lg"></i>
                                </button>
                                <h3>Você está cadastrado como?</h3>
                                <div className="selection-options">
                                    <button
                                        className="btn-select-type company-border"
                                        onClick={() => setActiveModal('empresa')}
                                    >
                                        EMPRESA
                                    </button>
                                    <span className="selection-or">ou</span>
                                    <button
                                        className="btn-select-type candidate-border"
                                        onClick={() => setActiveModal('candidato')}
                                    >
                                        CANDIDATO
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeModal === 'candidato' && !recoveryType && (
                            <div className="modal-box modal-form candidate-accent">
                                <button className="modal-close-btn" onClick={fecharModal}>
                                    <i className="bi bi-x-lg"></i>
                                </button>
                                <p className="modal-headline">Você selecionou: <strong>CANDIDATO</strong></p>

                                <div className="form-group">
                                    <label>Email:</label>
                                    <input type="text" placeholder="Digite o seu email" />
                                    <span className="field-link" onClick={() => setRecoveryType('email')}>Esqueceu o email?</span>
                                </div>

                                <div className="form-group">
                                    <label>Senha:</label>
                                    <div className="input-password-container">
                                        <input type={showPassword ? "text" : "password"} autoComplete="off" placeholder="Digite o sua senha" />
                                        <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                                            <i className={showPassword ? "bi bi-eye-slash-fill" : "bi bi-eye-fill"}></i>
                                        </span>
                                    </div>
                                    <span className="field-link" onClick={() => setRecoveryType('senha')}>Esqueceu a senha?</span>
                                </div>

                                <div className="modal-warning">
                                    <i className="bi bi-exclamation-triangle"></i>
                                    <p>Nexora <strong>recomenda</strong> fazer login para maiores <strong>acima</strong> de 18 anos, segundo a legislação brasileira (art. 7º, inciso XXXIII, da Constituição Federal).</p>
                                </div>

                                <p className="modal-terms">
                                    Ao conectar-se com este site, você estará concordando com nossos <a href="#terms">Termos de Uso e Serviço</a>.
                                </p>

                                <div className="modal-actions">
                                    <button className="btn-modal-action btn-submit-login" onClick={loginCandidato}>LOGAR</button>
                                    <button className="btn-modal-action btn-register">CADASTRE-SE</button>
                                </div>
                            </div>
                        )}

                        {activeModal === 'empresa' && !recoveryType && (
                            <div className="modal-box modal-form company-accent">
                                <button className="modal-close-btn" onClick={fecharModal}>
                                    <i className="bi bi-x-lg"></i>
                                </button>
                                <p className="modal-headline">Você selecionou: <strong>EMPRESA</strong></p>

                                <div className="form-group">
                                    <label>Email:</label>
                                    <input type="text" placeholder="Digite o seu email" />
                                </div>

                                <div className="form-group">
                                    <label>Senha:</label>
                                    <div className="input-password-container">
                                        <input type={showPassword ? "text" : "password"} autoComplete="off" placeholder="Digite o sua senha" />
                                        <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                                            <i className={showPassword ? "bi bi-eye-slash-fill" : "bi bi-eye-fill"}></i>
                                        </span>
                                    </div>
                                    <span className="field-link" onClick={() => setRecoveryType('senha')}>Esqueceu a senha?</span>
                                </div>

                                <div className="modal-warning">
                                    <i className="bi bi-exclamation-triangle"></i>
                                    <p>Nexora <strong>recomenda</strong> o login <strong>através</strong> de um e-mail oficial da empresa ou de e-mail fornecido pela mesma, e-mails pessoais não são aceitos!</p>
                                </div>

                                <p className="modal-terms">
                                    Ao conectar-se com este site, você estará concordando com nossos <a href="#terms">Termos de Uso e Serviço</a>.
                                </p>

                                <div className="modal-actions">
                                    <button className="btn-modal-action btn-submit-login" onClick={loginEmpresa}>ENTRAR</button>
                                    <button className="btn-modal-action btn-register">CADASTRE-SE</button>
                                </div>
                            </div>
                        )}

                        {recoveryType && (
                            <div className="modal-box modal-form company-accent">
                                <button
                                    className="modal-close-btn"
                                    onClick={() => setRecoveryType(null)}
                                >
                                    <i className="bi bi-x-lg"></i>
                                </button>

                                <p className="modal-headline">
                                    Funcionalidade em <strong>Desenvolvimento</strong>
                                </p>

                                <div className="modal-warning">
                                    <i className="bi bi-tools"></i>

                                    <p>
                                        O sistema de recuperação de{' '}
                                        <strong>
                                            {recoveryType === 'email' ? 'e-mail' : 'senha'}
                                        </strong>{' '}
                                        ainda está em desenvolvimento e poderá ser implementado em versões futuras da Nexora Line.
                                    </p>
                                </div>

                                <p className="modal-terms">
                                    Esta área atualmente possui apenas finalidade demonstrativa para apresentação visual da interface.
                                </p>

                                <div className="modal-actions">
                                    <button
                                        className="btn-modal-action btn-submit-login"
                                        onClick={() => setRecoveryType(null)}
                                    >
                                        ENTENDI
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            )}
        </main>
    );
}

function Footer() {
    return (
        <footer className="footer">
            <p>Nexora Line © 2025 - Todos os direitos reservados </p>
            <span className="separator-footer">|</span>
            <div className="footer-links">
                <a href="#perguntas">Perguntas Frequentes</a> - <a href="#">Contato</a>
            </div>
        </footer>
    );
}

function App() {
    return (
        <div className="app-container">
            <Header />
            <div className="hero-wrapper">
                <HeroSection />
            </div>
            <Footer />
        </div>
    );
}

const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement).render(<App />);