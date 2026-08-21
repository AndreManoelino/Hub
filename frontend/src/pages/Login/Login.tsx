import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fazerLogin } from "../../services/api";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");

  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErro("");

    // ==============================
    // VALIDAÇÕES
    // ==============================

    if (!login.trim()) {
      setErro("Informe seu CPF ou e-mail.");
      return;
    }

    if (!senha.trim()) {
      setErro("Informe sua senha.");
      return;
    }

    try {
      setCarregando(true);

      // ==============================
      // LOGIN NA API
      // ==============================

      const usuario = await fazerLogin(login, senha);

      // ==============================
      // VALIDAÇÃO DA RESPOSTA
      // ==============================

      if (!usuario?.token) {
        throw new Error(
          "A API não retornou um token de autenticação."
        );
      }

      // ==============================
      // SALVAR TOKEN
      // ==============================

      localStorage.setItem(
        "token",
        usuario.token
      );

      // ==============================
      // SALVAR USUÁRIO COMPLETO
      // ==============================

      localStorage.setItem(
        "usuario",
        JSON.stringify(usuario)
      );

      // ==============================
      // SALVAR ID DO USUÁRIO
      // ==============================

      localStorage.setItem(
        "usuarioId",
        String(usuario.usuarioId)
      );

      // ==============================
      // SALVAR PERFIL
      // ==============================

      localStorage.setItem(
        "perfil",
        String(usuario.perfil)
      );

      // ==============================
      // SALVAR EMPRESA
      // ==============================

      if (
        usuario.empresaId !== null &&
        usuario.empresaId !== undefined
      ) {
        localStorage.setItem(
          "empresaId",
          String(usuario.empresaId)
        );
      } else {
        localStorage.removeItem("empresaId");
      }

      // ==============================
      // SALVAR NOME DA EMPRESA
      // ==============================

      if (
        usuario.nomeEmpresa !== null &&
        usuario.nomeEmpresa !== undefined &&
        usuario.nomeEmpresa.trim() !== ""
      ) {
        localStorage.setItem(
          "nomeEmpresa",
          usuario.nomeEmpresa
        );
      } else {
        localStorage.removeItem("nomeEmpresa");
      }

      // ==============================
      // PERFIL
      // ==============================

      const perfil = Number(usuario.perfil);

      // ==============================
      // REDIRECIONAMENTO
      // ==============================

      switch (perfil) {
        case 1:
          // Administrador do Sistema ControllHub
          navigate("/administrador", {
            replace: true,
          });
          break;

        case 2:
          // Dono da Empresa
          navigate("/empresa", {
            replace: true,
          });
          break;

        case 3:
          // Administrador da Empresa
          navigate("/empresa/admin", {
            replace: true,
          });
          break;

        case 4:
          // Profissional
          navigate("/profissional", {
            replace: true,
          });
          break;

        case 5:
          // Aluno
          navigate("/aluno", {
            replace: true,
          });
          break;

        default:
          // Remove autenticação caso o perfil
          // não esteja configurado no sistema.
          localStorage.removeItem("token");
          localStorage.removeItem("usuario");
          localStorage.removeItem("usuarioId");
          localStorage.removeItem("perfil");
          localStorage.removeItem("empresaId");
          localStorage.removeItem("nomeEmpresa");

          setErro(
            "O perfil deste usuário não possui acesso configurado."
          );
          break;
      }
    } catch (error) {
      console.error(
        "Erro ao realizar login:",
        error
      );

      if (error instanceof Error) {
        setErro(error.message);
      } else {
        setErro(
          "Não foi possível realizar o login."
        );
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="login-page">

      {/* ==========================================
          LADO ESQUERDO
      ========================================== */}

      <section className="login-showcase">

        <div className="showcase-overlay"></div>

        <div className="showcase-content">

          {/* LOGO */}

          <a
            href="/"
            className="showcase-logo"
          >
            <span className="showcase-logo-mark">
              C
            </span>

            <span className="showcase-logo-name">
              Controll<span>Hub</span>
            </span>
          </a>

          {/* CONTEÚDO */}

          <div className="showcase-text">

            <span className="showcase-eyebrow">
              GESTÃO INTELIGENTE PARA ACADEMIAS
            </span>

            <h1>
              Sua academia.
              <br />
              <span>Mais organizada.</span>
            </h1>

            <p>
              Tenha controle completo da sua
              operação em uma única plataforma.
              Alunos, profissionais, treinos,
              avaliações, financeiro e muito mais.
            </p>

            {/* RECURSOS */}

            <div className="showcase-features">

              <div className="showcase-feature">

                <span>01</span>

                <div>
                  <strong>
                    Gestão completa
                  </strong>

                  <small>
                    Tudo conectado em um único sistema.
                  </small>
                </div>

              </div>

              <div className="showcase-feature">

                <span>02</span>

                <div>
                  <strong>
                    Controle de acesso
                  </strong>

                  <small>
                    Cada usuário acessa apenas o necessário.
                  </small>
                </div>

              </div>

              <div className="showcase-feature">

                <span>03</span>

                <div>
                  <strong>
                    Informações organizadas
                  </strong>

                  <small>
                    Sua operação sempre sob controle.
                  </small>
                </div>

              </div>

            </div>

          </div>

          {/* RODAPÉ DO SHOWCASE */}

          <div className="showcase-footer">

            <span>
              CONTROLLHUB
            </span>

            <span>
              GESTÃO • ORGANIZAÇÃO • RESULTADOS
            </span>

          </div>

        </div>

      </section>


      {/* ==========================================
          LADO DIREITO
      ========================================== */}

      <section className="login-panel">

        <div className="login-container">

          {/* LOGO MOBILE */}

          <div className="mobile-logo">

            <a
              href="/"
              className="showcase-logo"
            >
              <span className="showcase-logo-mark">
                C
              </span>

              <span className="showcase-logo-name">
                Controll<span>Hub</span>
              </span>
            </a>

          </div>


          {/* CABEÇALHO */}

          <div className="login-header">

            <span className="login-eyebrow">
              ACESSO AO SISTEMA
            </span>

            <h2>
              Bem-vindo de volta.
            </h2>

            <p>
              Entre com suas credenciais para
              acessar o ControllHub.
            </p>

          </div>


          {/* FORMULÁRIO */}

          <form
            className="login-form"
            onSubmit={handleLogin}
          >

            {/* LOGIN */}

            <div className="login-field">

              <label htmlFor="login">
                CPF ou e-mail
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  ◉
                </span>

                <input
                  id="login"
                  name="login"
                  type="text"
                  placeholder="Digite seu CPF ou e-mail"
                  value={login}
                  onChange={(event) =>
                    setLogin(event.target.value)
                  }
                  autoComplete="username"
                  disabled={carregando}
                />

              </div>

            </div>


            {/* SENHA */}

            <div className="login-field">

              <div className="field-header">

                <label htmlFor="senha">
                  Senha
                </label>

                <a href="#recuperar">
                  Esqueci minha senha
                </a>

              </div>

              <div className="input-wrapper">

                <span className="input-icon">
                  ●
                </span>

                <input
                  id="senha"
                  name="senha"
                  type="password"
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={(event) =>
                    setSenha(event.target.value)
                  }
                  autoComplete="current-password"
                  disabled={carregando}
                />

              </div>

            </div>


            {/* ERRO */}

            {erro && (
              <div
                className="login-error"
                role="alert"
              >
                {erro}
              </div>
            )}


            {/* OPÇÕES */}

            <div className="login-options">

              <label className="remember-me">

                <input
                  type="checkbox"
                  name="lembrar"
                  disabled={carregando}
                />

                <span>
                  Lembrar de mim
                </span>

              </label>

            </div>


            {/* BOTÃO */}

            <button
              type="submit"
              className="login-button"
              disabled={carregando}
            >

              <span>
                {carregando
                  ? "Entrando..."
                  : "Entrar no sistema"}
              </span>

              <span className="button-arrow">
                {carregando
                  ? "..."
                  : "→"}
              </span>

            </button>

          </form>


          {/* DIVISOR */}

          <div className="login-divider">

            <span></span>

            <small>
              ACESSO SEGURO
            </small>

            <span></span>

          </div>


          {/* SEGURANÇA */}

          <div className="login-security">

            <span className="security-icon">
              ✓
            </span>

            <div>

              <strong>
                Seus dados estão protegidos
              </strong>

              <p>
                O acesso é autenticado e protegido
                pelo sistema ControllHub.
              </p>

            </div>

          </div>


          {/* RODAPÉ */}

          <div className="login-footer">

            <a href="/">
              ← Voltar para o início
            </a>

            <span>
              © 2026 ControllHub
            </span>

          </div>

        </div>

      </section>

    </main>
  );
}