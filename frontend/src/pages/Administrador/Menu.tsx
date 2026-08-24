import { useEffect, useMemo, useState } from "react";
import "./Menu.css";
import Empresas from "./Empresas/Empresa";
import Usuario from "./Usuarios/Usuario";

import { listarEmpresas } from "../../services/api";

type TelaAdministrador =
  | "inicio"
  | "empresas"
  | "criar-empresa"
  | "usuarios"
  | "perfis"
  | "configuracoes"
  | "auditoria"
  | "senha";


type Empresa = {
  id: number;
  nomeFantasia?: string;
  razaoSocial?: string;
  cnpj?: string;
  cidade?: string;
  estado?: string;
  status?: string | number;
  ativo?: boolean;
  dataCadastro?: string;
};

type UsuarioLogado = {
  usuarioId?: number;
  nome?: string;
  cpf?: string;
  email?: string;
  perfil?: number;
  empresaId?: number | null;
  nomeEmpresa?: string | null;
};

const PERFIS: Record<number, string> = {
  1: "Administrador do Sistema",
  2: "Dono da Empresa",
  3: "Administrador da Empresa",
  4: "Profissional",
  5: "Aluno",
};

export default function MenuAdministrador() {
  /*
   * ============================================================
   * ESTADOS GLOBAIS DO MENU
   * ============================================================
   */

  const [menuAberto, setMenuAberto] = useState(true);

  const [tema, setTema] =
    useState<"dark" | "light">("dark");

  const [tela, setTela] =
    useState<TelaAdministrador>("inicio");

  const [usuario, setUsuario] =
    useState<UsuarioLogado | null>(null);

  /*
   * ============================================================
   * EMPRESAS
   * ============================================================
   */

  const [empresas, setEmpresas] =
    useState<Empresa[]>([]);

  const [carregandoEmpresas, setCarregandoEmpresas] =
    useState(true);

  const [erroEmpresas, setErroEmpresas] =
    useState("");

  const [pesquisa, setPesquisa] =
    useState("");

  /*
   * ============================================================
   * ABERTURA DOS GRUPOS
   * ============================================================
   */

  const [menuEmpresasAberto, setMenuEmpresasAberto] =
    useState(true);

  const [menuSistemaAberto, setMenuSistemaAberto] =
    useState(true);
  const [menuMelhoriasAberto, setMenuMelhoriasAberto] =
    useState(true);
  /*
   * ============================================================
   * INICIALIZAÇÃO
   * ============================================================
   */

  useEffect(() => {
    carregarUsuario();
    carregarEmpresas();

    const temaSalvo =
      localStorage.getItem("controllhub_tema");

    if (
      temaSalvo === "light" ||
      temaSalvo === "dark"
    ) {
      setTema(temaSalvo);
    }
  }, []);

  /*
   * ============================================================
   * TEMA
   * ============================================================
   */

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      tema
    );

    localStorage.setItem(
      "controllhub_tema",
      tema
    );
  }, [tema]);

  /*
   * ============================================================
   * USUÁRIO LOGADO
   * ============================================================
   */

  function carregarUsuario() {
    try {
      const usuarioSalvo =
        localStorage.getItem("usuario");

      if (!usuarioSalvo) {
        return;
      }

      const dados = JSON.parse(usuarioSalvo);

      setUsuario(dados);

    } catch (error) {
      console.error(
        "Erro ao carregar usuário:",
        error
      );
    }
  }

  /*
   * ============================================================
   * CARREGAR EMPRESAS
   * ============================================================
   */
  async function carregarEmpresas() {
    try {
      setCarregandoEmpresas(true);
      setErroEmpresas("");

      const dados = await listarEmpresas();

      const lista: Empresa[] =
        Array.isArray(dados)
          ? dados
          : [];

      setEmpresas(lista);

    } catch (error) {
      console.error(
        "Erro ao carregar empresas:",
        error
      );

      setErroEmpresas(
        error instanceof Error
          ? error.message
          : "Não foi possível carregar as empresas."
      );

    } finally {
      setCarregandoEmpresas(false);
    }
  }

  /*
   * ============================================================
   * LOGOUT
   * ============================================================
   */

  function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("usuarioId");
    localStorage.removeItem("perfil");
    localStorage.removeItem("empresaId");

    window.location.href = "/login";
  }

  /*
   * ============================================================
   * FORMATAÇÕES
   * ============================================================
   */

  function formatarCnpj(cnpj?: string) {
    if (!cnpj) {
      return "CNPJ não informado";
    }

    const numeros =
      cnpj.replace(/\D/g, "");

    if (numeros.length !== 14) {
      return cnpj;
    }

    return numeros.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      "$1.$2.$3/$4-$5"
    );
  }

  function formatarData(data?: string) {
    if (!data) {
      return "—";
    }

    const dataObj =
      new Date(data);

    if (
      Number.isNaN(
        dataObj.getTime()
      )
    ) {
      return "—";
    }

    return dataObj.toLocaleDateString(
      "pt-BR"
    );
  }

  function obterNomeEmpresa(
    empresa: Empresa
  ) {
    return (
      empresa.nomeFantasia ||
      empresa.razaoSocial ||
      "Empresa sem nome"
    );
  }

  function obterStatus(
    empresa: Empresa
  ) {
    if (
      typeof empresa.ativo ===
      "boolean"
    ) {
      return empresa.ativo
        ? "Ativa"
        : "Inativa";
    }

    if (
      empresa.status === "Ativa" ||
      empresa.status === "ATIVA" ||
      empresa.status === 1
    ) {
      return "Ativa";
    }

    return "Inativa";
  }

  /*
   * ============================================================
   * FILTRO
   * ============================================================
   */

  const empresasFiltradas =
    useMemo(() => {
      const termo =
        pesquisa
          .toLowerCase()
          .trim();

      if (!termo) {
        return empresas;
      }

      return empresas.filter(
        (empresa) => {
          const nome =
            obterNomeEmpresa(
              empresa
            ).toLowerCase();

          const cnpj =
            empresa.cnpj
              ?.toLowerCase() ||
            "";

          const cidade =
            empresa.cidade
              ?.toLowerCase() ||
            "";

          return (
            nome.includes(termo) ||
            cnpj.includes(termo) ||
            cidade.includes(termo)
          );
        }
      );
    }, [empresas, pesquisa]);

  /*
   * ============================================================
   * USUÁRIO
   * ============================================================
   */

  const nomeUsuario =
    usuario?.nome?.trim() ||
    "Administrador";

  const perfilUsuario =
    usuario?.perfil !== undefined
      ? PERFIS[usuario.perfil] ||
        "Usuário"
      : "Administrador do Sistema";

  const inicial =
    nomeUsuario
      .charAt(0)
      .toUpperCase();

  const empresasAtivas =
    empresas.filter(
      (empresa) =>
        obterStatus(empresa) ===
        "Ativa"
    ).length;

  /*
   * ============================================================
   * NAVEGAÇÃO
   * ============================================================
   */

  function navegar(
    novaTela: TelaAdministrador
  ) {
    setTela(novaTela);

    /*
     * No celular fecha o menu
     * depois de escolher uma opção.
     */
    if (
      window.innerWidth <= 900
    ) {
      setMenuAberto(false);
    }
  }

  /*
   * ============================================================
   * TÍTULO DA TELA
   * ============================================================
   */

  function obterTituloTela() {
    switch (tela) {
      case "empresas":
        return "Empresas";

      case "criar-empresa":
        return "Criar empresa";

      case "usuarios":
        return "Usuários";

      case "perfis":
        return "Perfis e permissões";

      case "configuracoes":
        return "Configurações";

      case "auditoria":
        return "Auditoria";

      case "senha":
        return "Redefinir senha";

      default:
        return "Visão geral";
    }
  }

  /*
   * ============================================================
   * RENDER
   * ============================================================
   */

  return (
    <div
      className={`admin-shell ${
        menuAberto
          ? "sidebar-open"
          : "sidebar-closed"
      }`}
      data-theme={tema}
    >

      {/* ======================================================
          FUNDO
      ====================================================== */}

      <div className="admin-background">
        <div className="admin-background-overlay" />
      </div>

      {/* ======================================================
          SIDEBAR
      ====================================================== */}

      <aside className="admin-sidebar">

        {/* BRAND */}

        <div className="sidebar-top">

          <div className="sidebar-brand">

            <div className="brand-symbol">
              C
            </div>

            {menuAberto && (
              <div className="brand-text">

                <strong>
                  Controll<span>Hub</span>
                </strong>

                <small>
                  ADMINISTRAÇÃO
                </small>

              </div>
            )}

          </div>

          <button
            type="button"
            className="sidebar-toggle"
            onClick={() =>
              setMenuAberto(
                !menuAberto
              )
            }
            title={
              menuAberto
                ? "Recolher menu"
                : "Abrir menu"
            }
          >
            {menuAberto
              ? "‹"
              : "›"}
          </button>

        </div>

        {/* USUÁRIO */}

        <div className="sidebar-user">

          <div className="user-avatar">
            {inicial}
          </div>

          {menuAberto && (
            <div className="user-info">

              <strong
                title={nomeUsuario}
              >
                {nomeUsuario}
              </strong>

              <span>
                {perfilUsuario}
              </span>

            </div>
          )}

        </div>

        {/* NAVEGAÇÃO */}

        <nav className="sidebar-navigation">

          <div className="navigation-label">
            {menuAberto
              ? "PRINCIPAL"
              : "•"}
          </div>

          {/* INÍCIO */}

          <button
            type="button"
            className={`nav-item ${
              tela === "inicio"
                ? "active"
                : ""
            }`}
            onClick={() =>
              navegar("inicio")
            }
          >

            <span className="nav-icon">
              ◈
            </span>

            {menuAberto && (
              <>
                <span>
                  Visão geral
                </span>

                {tela ===
                  "inicio" && (
                  <span className="nav-active-dot" />
                )}
              </>
            )}

          </button>

          {/* SISTEMA */}

          <div className="nav-group">

            <button
              type="button"
              className="nav-item"
              onClick={() =>
                setMenuSistemaAberto(
                  !menuSistemaAberto
                )
              }
            >

              <span className="nav-icon">
                ⚙
              </span>

              {menuAberto && (
                <>
                  <span>
                    Sistema
                  </span>

                  <span className="nav-chevron">
                    {menuSistemaAberto
                      ? "⌃"
                      : "⌄"}
                  </span>
                </>
              )}

            </button>

            {menuAberto &&
              menuSistemaAberto && (
                <div className="nav-submenu">

                  <button
                    type="button"
                    className={`nav-subitem ${
                      tela ===
                      "empresas"
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      navegar(
                        "empresas"
                      )
                    }
                  >
                    <span>
                      ▣
                    </span>
                    Empresas
                  </button>

                  <button
                    type="button"
                    className={`nav-subitem ${
                      tela ===
                      "usuarios"
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      navegar(
                        "usuarios"
                      )
                    }
                  >
                    <span>
                      ▣
                    </span>
                    Usuarios
                  </button>

                  <button
                    type="button"
                    className="nav-subitem"
                    onClick={() =>
                      navegar(
                        "empresas"
                      )
                    }
                  >
                    <span>
                      ◆
                    </span>
                    Financeiro
                  </button>

                  <button
                    type="button"
                    className="nav-subitem"
                    onClick={() =>
                      navegar(
                        "configuracoes"
                      )
                    }
                  >
                    <span>
                      ⚙
                    </span>
                    Configurações
                  </button>

                  <button
                    type="button"
                    className="nav-subitem"
                    onClick={() =>
                      navegar(
                        "auditoria"
                      )
                    }
                  >
                    <span>
                      ◌
                    </span>
                    Auditoria
                  </button>

                  <button
                    type="button"
                    className="nav-subitem"
                    onClick={() =>
                      navegar(
                        "senha"
                      )
                    }
                  >
                    <span>
                      ●
                    </span>
                    Redefinir senha
                  </button>

                </div>
              )}

          </div>

          {/* EMPRESAS */}

          <div className="nav-group">

            <button
              type="button"
              className="nav-item"
              onClick={() =>
                setMenuMelhoriasAberto(
                  !menuMelhoriasAberto
                )
              }
            >

              <span className="nav-icon">
                ▣
              </span>

              {menuAberto && (
                <>
                  <span>
                    Melhorias
                  </span>

                  <span className="nav-count">
                    {empresas.length}
                  </span>

                  <span className="nav-chevron">
                    {menuMelhoriasAberto
                      ? "⌃"
                      : "⌄"}
                  </span>
                </>
              )}

            </button>

            {menuAberto &&
              menuMelhoriasAberto && (
                <div className="nav-submenu">

                  <button
                    type="button"
                    className="nav-subitem"
                    onClick={() =>
                      navegar(
                        "empresas"
                      )
                    }
                  >
                    <span>
                      
                    </span>
                    Redefinir Senha
                  </button>

                  

                  <button
                    type="button"
                    className="nav-subitem"
                    onClick={() =>
                      navegar(
                        "usuarios"
                      )
                    }
                  >
                    <span>
                      
                    </span>
                     Planos
                  </button>

                </div>
              )}

          </div>

          {/* FINANCEIRO */}

          <button
            type="button"
            className="nav-item"
          >
            <span className="nav-icon">
              ◫
            </span>

            {menuAberto && (
              <span>
                Financeiro
              </span>
            )}
          </button>

          {/* RELATÓRIOS */}

          <button
            type="button"
            className="nav-item"
          >
            <span className="nav-icon">
              ◌
            </span>

            {menuAberto && (
              <span>
                Relatórios
              </span>
            )}
          </button>

          {/* CHAMADOS */}

          <button
            type="button"
            className="nav-item"
          >
            <span className="nav-icon">
              ◇
            </span>

            {menuAberto && (
              <span>
                Chamados
              </span>
            )}
          </button>

        </nav>

        {/* SIDEBAR FOOTER */}

        <div className="sidebar-footer">

          {menuAberto && (
            <div className="system-status">

              <span className="status-light" />

              <div>

                <strong>
                  Sistema online
                </strong>

                <small>
                  ControllHub API
                </small>

              </div>

            </div>
          )}

          <button
            type="button"
            className="logout-button"
            onClick={sair}
          >
            <span>
              ⇥
            </span>

            {menuAberto && (
              <span>
                Sair
              </span>
            )}
          </button>

        </div>

      </aside>

      {/* ======================================================
          ÁREA PRINCIPAL
      ====================================================== */}

      <main className="admin-main">

        {/* HEADER */}

        <header className="admin-header">

          <div className="header-left">

            <button
              type="button"
              className="mobile-menu-button"
              onClick={() =>
                setMenuAberto(
                  !menuAberto
                )
              }
            >
              ☰
            </button>

            <div>

              <span className="header-eyebrow">
                PAINEL ADMINISTRATIVO
              </span>

              <h1>
                {obterTituloTela()}
              </h1>

            </div>

          </div>

          <div className="header-actions">

            <button
              type="button"
              className="header-icon-button"
              title="Atualizar empresas"
              onClick={
                carregarEmpresas
              }
            >
              ↻
            </button>

            <button
              type="button"
              className="header-icon-button"
              title="Alternar tema"
              onClick={() =>
                setTema(
                  tema === "dark"
                    ? "light"
                    : "dark"
                )
              }
            >
              {tema === "dark"
                ? "☼"
                : "☾"}
            </button>

            <div className="header-divider" />

            <div className="header-user">

              <div className="header-user-text">

                <strong>
                  {nomeUsuario}
                </strong>

                <span>
                  {perfilUsuario}
                </span>

              </div>

              <div className="header-avatar">
                {inicial}
              </div>

            </div>

          </div>

        </header>

        {/* ==================================================
            CONTEÚDO
        ================================================== */}

        <div className="admin-content">

          {/* ==================================================
              TELA DE EMPRESAS
          ================================================== */}

          {tela === "empresas" && (
            <section className="page-container">

              <div className="page-top">

                <div>

                  <span className="welcome-label">
                    GESTÃO
                  </span>

                  <h2>
                    Empresas
                  </h2>

                  <p>
                    Gerencie todas as empresas
                    cadastradas no ControllHub.
                  </p>

                </div>

                <button
                  type="button"
                  className="primary-button"
                  onClick={() =>
                    navegar(
                      "criar-empresa"
                    )
                  }
                >
                  <span>
                    +
                  </span>
                  Criar empresa
                </button>

              </div>

              <div className="companies-toolbar">

                <div className="search-box">

                  <span>
                    ⌕
                  </span>

                  <input
                    type="text"
                    placeholder="Pesquisar por empresa, CNPJ ou cidade..."
                    value={pesquisa}
                    onChange={(e) =>
                      setPesquisa(
                        e.target.value
                      )
                    }
                  />

                  {pesquisa && (
                    <button
                      type="button"
                      onClick={() =>
                        setPesquisa("")
                      }
                    >
                      ×
                    </button>
                  )}

                </div>

                <div className="companies-counter">

                  <strong>
                    {
                      empresasFiltradas.length
                    }
                  </strong>

                  <span>
                    empresas encontradas
                  </span>

                </div>

              </div>

              {erroEmpresas && (
                <div className="companies-message error">

                  <strong>
                    Atenção
                  </strong>

                  <span>
                    {erroEmpresas}
                  </span>

                  <button
                    type="button"
                    onClick={
                      carregarEmpresas
                    }
                  >
                    Tentar novamente
                  </button>

                </div>
              )}

              {carregandoEmpresas && (
                <div className="companies-loading">

                  <div className="loading-spinner" />

                  <span>
                    Carregando empresas...
                  </span>

                </div>
              )}

              {!carregandoEmpresas &&
                !erroEmpresas &&
                empresasFiltradas.length ===
                  0 && (
                  <div className="companies-empty">

                    <div>
                      ▣
                    </div>

                    <h3>
                      Nenhuma empresa encontrada
                    </h3>

                    <p>
                      Não existem empresas
                      cadastradas ou sua
                      pesquisa não encontrou
                      resultados.
                    </p>

                    <button
                      type="button"
                      className="primary-button"
                      onClick={() =>
                        navegar(
                          "criar-empresa"
                        )
                      }
                    >
                      + Criar primeira empresa
                    </button>

                  </div>
                )}

              {!carregandoEmpresas &&
                empresasFiltradas.length >
                  0 && (
                  <div className="companies-table-wrapper">

                    <table className="companies-table">

                      <thead>

                        <tr>
                          <th>
                            EMPRESA
                          </th>

                          <th>
                            CNPJ
                          </th>

                          <th>
                            LOCALIZAÇÃO
                          </th>

                          <th>
                            CADASTRO
                          </th>
                            
                          <th>
                            STATUS
                          </th>

                          <th />
                        </tr>

                      </thead>

                      <tbody>

                        {empresasFiltradas.map(
                          (empresa) => {

                            const status =
                              obterStatus(
                                empresa
                              );

                            return (
                              <tr
                                key={
                                  empresa.id
                                }
                              >

                                <td>

                                  <div className="company-cell">

                                    <div className="company-avatar">
                                      {obterNomeEmpresa(
                                        empresa
                                      )
                                        .charAt(
                                          0
                                        )
                                        .toUpperCase()}
                                    </div>

                                    <div>

                                      <strong>
                                        {obterNomeEmpresa(
                                          empresa
                                        )}
                                      </strong>

                                      <span>
                                        ID #
                                        {
                                          empresa.id
                                        }
                                      </span>

                                    </div>

                                  </div>

                                </td>

                                <td>
                                  <span className="cnpj-text">
                                    {formatarCnpj(
                                      empresa.cnpj
                                    )}
                                  </span>
                                </td>

                                <td>

                                  <div className="location-cell">

                                    <strong>
                                      {
                                        empresa.cidade ||
                                        "Não informado"
                                      }
                                    </strong>

                                    <span>
                                      {
                                        empresa.estado ||
                                        "—"
                                      }
                                    </span>

                                  </div>

                                </td>

                                <td>
                                  {formatarData(
                                    empresa.dataCadastro
                                  )}
                                </td>

                                <td>

                                  <span
                                    className={`status-badge ${
                                      status ===
                                      "Ativa"
                                        ? "active"
                                        : "inactive"
                                    }`}
                                  >
                                    <i />
                                    {
                                      status
                                    }
                                  </span>

                                </td>

                                <td>

                                  <button
                                    type="button"
                                    className="table-action"
                                    title="Visualizar empresa"
                                  >
                                    →
                                  </button>

                                </td>

                              </tr>
                            );
                          }
                        )}

                      </tbody>

                    </table>

                  </div>
                )}

            </section>
          )}

          {/* ==================================================
              CRIAR EMPRESA
          ================================================== */}

          {tela ===
            "criar-empresa" && (
            <section className="page-container">

              <div className="page-top">

                <div>

                  
                

                  <span className="welcome-label">
                    EMPRESAS
                  </span>

                  <h2>
                    Criar nova empresa
                  </h2>

                  <p>
                    Cadastre uma nova empresa
                    na plataforma ControllHub.
                  </p>

                </div>

              </div>

              <div className="embedded-page">

                <Empresas />

              </div>

            </section>
          )}

          {/* ==================================================
              DASHBOARD
          ================================================== */}

          {tela === "inicio" && (
            <>
              <section className="welcome-section">

                <div>

                  <span className="welcome-label">
                    CONTROLLHUB
                  </span>

                  <h2>
                    Olá,{" "}
                    <strong>
                      {
                        nomeUsuario.split(
                          " "
                        )[0]
                      }
                    </strong>
                    .
                  </h2>

                  <p>
                    Tenha uma visão completa
                    da sua plataforma e das
                    empresas cadastradas.
                  </p>

                </div>

                <div className="welcome-date">

                  <span>
                    HOJE
                  </span>

                  <strong>
                    {new Date().toLocaleDateString(
                      "pt-BR",
                      {
                        weekday:
                          "long",
                        day:
                          "2-digit",
                        month:
                          "long",
                      }
                    )}
                  </strong>

                </div>

              </section>

              <section className="dashboard-cards">

                <article className="dashboard-card">

                  <div className="card-icon">
                    ▣
                  </div>

                  <div className="card-data">

                    <span>
                      EMPRESAS CADASTRADAS
                    </span>

                    <strong>
                      {carregandoEmpresas
                        ? "..."
                        : empresas.length}
                    </strong>

                  </div>

                  <div className="card-indicator">
                    TOTAL
                  </div>

                </article>

                <article className="dashboard-card">

                  <div className="card-icon success">
                    ✓
                  </div>

                  <div className="card-data">

                    <span>
                      EMPRESAS ATIVAS
                    </span>

                    <strong>
                      {carregandoEmpresas
                        ? "..."
                        : empresasAtivas}
                    </strong>

                  </div>

                  <div className="card-indicator green">
                    ATIVAS
                  </div>

                </article>

                <article className="dashboard-card">

                  <div className="card-icon">
                    ◫
                  </div>

                  <div className="card-data">

                    <span>
                      PERFIL ATUAL
                    </span>

                    <strong className="profile-card-name">
                      {perfilUsuario}
                    </strong>

                  </div>

                </article>

                <article className="dashboard-card">

                  <div className="card-icon">
                    ◉
                  </div>

                  <div className="card-data">

                    <span>
                      STATUS DO SISTEMA
                    </span>

                    <strong className="online-text">
                      ONLINE
                    </strong>

                  </div>

                  <div className="online-dot" />

                </article>

              </section>

              <section className="companies-section">

                <div className="section-heading">

                  <div>

                    <span>
                      GESTÃO
                    </span>

                    <h2>
                      Empresas cadastradas
                    </h2>

                    <p>
                      Empresas que fazem
                      parte da plataforma
                      ControllHub.
                    </p>

                  </div>

                  <button
                    type="button"
                    className="primary-button"
                    onClick={() =>
                      navegar(
                        "criar-empresa"
                      )
                    }
                  >
                    <span>
                      +
                    </span>
                    Nova empresa
                  </button>

                </div>

                {carregandoEmpresas && (
                  <div className="companies-loading">

                    <div className="loading-spinner" />

                    <span>
                      Carregando empresas...
                    </span>

                  </div>
                )}

                {!carregandoEmpresas &&
                  empresas.length > 0 && (
                    <div className="companies-table-wrapper">

                      <table className="companies-table">

                        <thead>

                          <tr>
                            <th>
                              EMPRESA
                            </th>

                            <th>
                              CNPJ
                            </th>

                            <th>
                              LOCALIZAÇÃO
                            </th>

                            <th>
                              STATUS
                            </th>

                            <th />
                          </tr>

                        </thead>

                        <tbody>

                          {empresas
                            .slice(0, 6)
                            .map(
                              (
                                empresa
                              ) => {

                                const status =
                                  obterStatus(
                                    empresa
                                  );

                                return (
                                  <tr
                                    key={
                                      empresa.id
                                    }
                                  >

                                    <td>

                                      <div className="company-cell">

                                        <div className="company-avatar">
                                          {obterNomeEmpresa(
                                            empresa
                                          )
                                            .charAt(
                                              0
                                            )
                                            .toUpperCase()}
                                        </div>

                                        <div>

                                          <strong>
                                            {obterNomeEmpresa(
                                              empresa
                                            )}
                                          </strong>

                                          <span>
                                            ID #
                                            {
                                              empresa.id
                                            }
                                          </span>

                                        </div>

                                      </div>

                                    </td>

                                    <td>
                                      {formatarCnpj(
                                        empresa.cnpj
                                      )}
                                    </td>

                                    <td>

                                      <div className="location-cell">

                                        <strong>
                                          {
                                            empresa.cidade ||
                                            "—"
                                          }
                                        </strong>

                                        <span>
                                          {
                                            empresa.estado ||
                                            "—"
                                          }
                                        </span>

                                      </div>

                                    </td>

                                    <td>

                                      <span
                                        className={`status-badge ${
                                          status ===
                                          "Ativa"
                                            ? "active"
                                            : "inactive"
                                        }`}
                                      >
                                        <i />
                                        {
                                          status
                                        }
                                      </span>

                                    </td>

                                    <td>

                                      <button
                                        type="button"
                                        className="table-action"
                                        onClick={() =>
                                          navegar(
                                            "empresas"
                                          )
                                        }
                                      >
                                        →
                                      </button>

                                    </td>

                                  </tr>
                                );
                              }
                            )}

                        </tbody>

                      </table>

                    </div>
                  )}

              </section>
            </>
          )}

          {/* ==================================================
              TELAS FUTURAS
          ================================================== */}

          {tela === "usuarios" && (
            <Usuario />
          )}

          {tela === "perfis" && (
            <section className="placeholder-page">

              <div className="placeholder-icon">
                ◆
              </div>

              <span>
                SEGURANÇA
              </span>

              <h2>
                Perfis e permissões
              </h2>

              <p>
                Gerenciamento de perfis,
                permissões e acessos.
              </p>

            </section>
          )}

          {tela === "configuracoes" && (
            <section className="placeholder-page">

              <div className="placeholder-icon">
                ⚙
              </div>

              <span>
                SISTEMA
              </span>

              <h2>
                Configurações
              </h2>

              <p>
                Configurações gerais da
                plataforma ControllHub.
              </p>

            </section>
          )}

          {tela === "auditoria" && (
            <section className="placeholder-page">

              <div className="placeholder-icon">
                ◌
              </div>

              <span>
                SEGURANÇA
              </span>

              <h2>
                Auditoria
              </h2>

              <p>
                Histórico de ações e
                atividades realizadas
                no sistema.
              </p>

            </section>
          )}

          {tela === "senha" && (
            <section className="placeholder-page">

              <div className="placeholder-icon">
                ●
              </div>

              <span>
                SEGURANÇA
              </span>

              <h2>
                Redefinir senha
              </h2>

              <p>
                Área para gerenciamento
                de credenciais.
              </p>

            </section>
          )}

          {/* FOOTER */}

          <footer className="admin-footer">

            <div>

              <strong>
                Controll<span>Hub</span>
              </strong>

              <span>
                Gestão • Organização • Resultados
              </span>

            </div>

            <span>
              © 2026 ControllHub
            </span>

          </footer>

        </div>

      </main>

    </div>
  );
}