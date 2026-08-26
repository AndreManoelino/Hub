import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fazerLogin,
  buscarEmpresaPorId,
} from "../../services/api";
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
      // PERFIL
      // ==============================

      const perfil = Number(usuario.perfil);

      // ==============================
      // ADMINISTRADOR DO SISTEMA
      // ==============================

      if (perfil === 1) {
        localStorage.setItem(
          "token",
          usuario.token
        );

        localStorage.setItem(
          "usuario",
          JSON.stringify(usuario)
        );

        localStorage.setItem(
          "usuarioId",
          String(usuario.usuarioId)
        );

        localStorage.setItem(
          "perfil",
          String(usuario.perfil)
        );

        localStorage.removeItem("empresaId");
        localStorage.removeItem("nomeEmpresa");
        localStorage.removeItem("tipoEmpresa");

        navigate("/administrador", {
          replace: true,
        });

        return;
      }

      // ==============================
      // USUÁRIO DE EMPRESA
      // ==============================

      if (
        usuario.empresaId === null ||
        usuario.empresaId === undefined
      ) {
        throw new Error(
          "Este usuário não está vinculado a uma empresa."
        );
      }

      const empresaId = Number(usuario.empresaId);

      if (!empresaId || empresaId <= 0) {
        throw new Error(
          "A empresa vinculada ao usuário é inválida."
        );
      }

      // ==============================
      // BUSCAR EMPRESA
      // ==============================

      const empresa = await buscarEmpresaPorId(
        empresaId
      );

      if (!empresa) {
        throw new Error(
          "Não foi possível localizar a empresa deste usuário."
        );
      }

      // ==============================
      // TIPO DA EMPRESA
      // ==============================

      const tipoEmpresa =
        empresa.tipoEmpresa ??
        empresa.TipoEmpresa ??
        empresa.tipo ??
        empresa.Tipo;

      if (
        tipoEmpresa === null ||
        tipoEmpresa === undefined ||
        String(tipoEmpresa).trim() === ""
      ) {
        throw new Error(
          "O tipo da empresa não foi identificado."
        );
      }

      const tipoEmpresaNormalizado =
        String(tipoEmpresa)
          .trim()
          .toLowerCase();

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

      localStorage.setItem(
        "empresaId",
        String(empresaId)
      );

      // ==============================
      // SALVAR NOME DA EMPRESA
      // ==============================

      const nomeEmpresa =
        empresa.nomeFantasia ??
        empresa.NomeFantasia ??
        usuario.nomeEmpresa;

      if (
        nomeEmpresa !== null &&
        nomeEmpresa !== undefined &&
        String(nomeEmpresa).trim() !== ""
      ) {
        localStorage.setItem(
          "nomeEmpresa",
          String(nomeEmpresa)
        );
      } else {
        localStorage.removeItem("nomeEmpresa");
      }

      // ==============================
      // SALVAR TIPO DA EMPRESA
      // ==============================

      localStorage.setItem(
        "tipoEmpresa",
        String(tipoEmpresa)
      );

      // ==============================
      // REDIRECIONAMENTO POR TIPO
      // ==============================

      if (
        tipoEmpresaNormalizado === "academia"
      ) {
        navigate(
          `/academia/${empresaId}`,
          {
            replace: true,
          }
        );

        return;
      }

      if (
        tipoEmpresaNormalizado === "barbearia"
      ) {
        navigate(
          `/barbearia/${empresaId}`,
          {
            replace: true,
          }
        );

        return;
      }

      // ==============================
      // TIPO NÃO CONFIGURADO
      // ==============================

      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
      localStorage.removeItem("usuarioId");
      localStorage.removeItem("perfil");
      localStorage.removeItem("empresaId");
      localStorage.removeItem("nomeEmpresa");
      localStorage.removeItem("tipoEmpresa");

      throw new Error(
        `O tipo de empresa "${tipoEmpresa}" ainda não possui uma área configurada no sistema.`
      );

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

          {/* RODAPÉ */}

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