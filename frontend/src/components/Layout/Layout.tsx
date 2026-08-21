import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Layout.css";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();

  const [menuAberto, setMenuAberto] = useState(true);

  const usuario = JSON.parse(
    localStorage.getItem("usuario") || "{}"
  );

  const nomeUsuario = usuario.nome || "Usuário";
  const perfil = Number(usuario.perfil || 0);

  function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("usuarioId");
    localStorage.removeItem("perfil");
    localStorage.removeItem("empresaId");

    navigate("/login");
  }

  return (
    <div className="layout">

      {/* =========================
          SIDEBAR
      ========================= */}

      <aside
        className={`layout-sidebar ${
          menuAberto ? "layout-sidebar-open" : "layout-sidebar-closed"
        }`}
      >

        <div className="layout-sidebar-top">

          <div className="layout-brand">

            <div className="layout-brand-mark">
              C
            </div>

            {menuAberto && (
              <div className="layout-brand-name">
                Controll<span>Hub</span>
              </div>
            )}

          </div>

          <button
            type="button"
            className="layout-toggle"
            onClick={() => setMenuAberto(!menuAberto)}
            title={menuAberto ? "Fechar menu" : "Abrir menu"}
          >
            {menuAberto ? "‹" : "›"}
          </button>

        </div>


        {/* =========================
            MENU
        ========================= */}

        <nav className="layout-navigation">

          <div className="layout-menu-section">

            {menuAberto && (
              <span className="layout-menu-title">
                PRINCIPAL
              </span>
            )}

            <button
              type="button"
              className="layout-menu-item layout-menu-item-active"
            >
              <span className="layout-menu-icon">
                ◈
              </span>

              {menuAberto && (
                <span className="layout-menu-label">
                  Dashboard
                </span>
              )}
            </button>

          </div>


          {perfil === 1 && (
            <div className="layout-menu-section">

              {menuAberto && (
                <span className="layout-menu-title">
                  ADMINISTRAÇÃO
                </span>
              )}

              <button
                type="button"
                className="layout-menu-item"
              >
                <span className="layout-menu-icon">
                  ◉
                </span>

                {menuAberto && (
                  <span className="layout-menu-label">
                    Empresas
                  </span>
                )}
              </button>


              <button
                type="button"
                className="layout-menu-item"
              >
                <span className="layout-menu-icon">
                  ◎
                </span>

                {menuAberto && (
                  <span className="layout-menu-label">
                    Usuários
                  </span>
                )}
              </button>


              <button
                type="button"
                className="layout-menu-item"
              >
                <span className="layout-menu-icon">
                  ◇
                </span>

                {menuAberto && (
                  <span className="layout-menu-label">
                    Planos
                  </span>
                )}
              </button>

            </div>
          )}


          <div className="layout-menu-section">

            {menuAberto && (
              <span className="layout-menu-title">
                SISTEMA
              </span>
            )}

            <button
              type="button"
              className="layout-menu-item"
            >
              <span className="layout-menu-icon">
                ⚙
              </span>

              {menuAberto && (
                <span className="layout-menu-label">
                  Configurações
                </span>
              )}
            </button>

          </div>

        </nav>


        {/* =========================
            USUÁRIO
        ========================= */}

        <div className="layout-sidebar-bottom">

          <div className="layout-user">

            <div className="layout-user-avatar">
              {nomeUsuario
                .charAt(0)
                .toUpperCase()}
            </div>

            {menuAberto && (
              <div className="layout-user-info">

                <strong>
                  {nomeUsuario}
                </strong>

                <span>
                  {perfil === 1
                    ? "Administrador do Sistema"
                    : "Usuário"}
                </span>

              </div>
            )}

          </div>


          <button
            type="button"
            className="layout-logout"
            onClick={sair}
            title="Sair"
          >

            <span>
              ↪
            </span>

            {menuAberto && (
              <span>
                Sair
              </span>
            )}

          </button>

        </div>

      </aside>


      {/* =========================
          ÁREA PRINCIPAL
      ========================= */}

      <div
        className={`layout-main ${
          menuAberto
            ? "layout-main-expanded"
            : "layout-main-collapsed"
        }`}
      >

        {/* HEADER */}

        <header className="layout-header">

          <div className="layout-header-left">

            <button
              type="button"
              className="layout-mobile-menu"
              onClick={() => setMenuAberto(!menuAberto)}
            >
              ☰
            </button>

            <div>

              <span className="layout-header-small">
                CONTROLLHUB
              </span>

              <h1>
                Painel Administrativo
              </h1>

            </div>

          </div>


          <div className="layout-header-right">

            <button
              type="button"
              className="layout-notification"
              title="Notificações"
            >
              ♢

              <span className="layout-notification-dot"></span>
            </button>


            <div className="layout-header-user">

              <div className="layout-header-avatar">
                {nomeUsuario
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div className="layout-header-user-info">

                <strong>
                  {nomeUsuario}
                </strong>

                <span>
                  {perfil === 1
                    ? "Administrador do Sistema"
                    : "Usuário"}
                </span>

              </div>

            </div>

          </div>

        </header>


        {/* CONTEÚDO */}

        <main className="layout-content">
          {children}
        </main>


        {/* FOOTER */}

        <footer className="layout-footer">

          <span>
            © 2026 ControllHub
          </span>

          <span>
            Gestão • Organização • Resultados
          </span>

        </footer>

      </div>

    </div>
  );
}