import { useEffect, useMemo, useState } from "react";
import "./Usuario.css";
import {
  listarUsuariosPorEmpresa,
  listarEmpresas,
  criarUsuario,
  atualizarUsuario,
  desativarUsuario,
  ativarUsuario,
} from "../../../services/api";

interface Usuario {
  id: number;
  nome: string;

  cpf: string;
  dataNascimento?: string | null;
  email: string;
  perfil: number;
  empresaId?: number | null;
  empresa?: string | null;
  ativo: boolean;
  dataCadastro: string;
}

interface Empresa {
  id: number;
  nome: string;
  razaoSocial?: string | null;
  nomeFantasia?: string | null;
  ativo?: boolean;
}

interface FormUsuario {
  nome: string;
  cpf: string;
  dataNascimento: string;
  email: string;
  perfil: number;
  empresaId: number;
}

interface UsuarioLogado {
  id?: number;
  usuarioId?: number;
  nome?: string;
  email?: string;
  perfil?: number;
  empresaId?: number | null;
  empresa?: string;
  nomeEmpresa?: string;
}

/* =====================================================
   FORMULÁRIO INICIAL
===================================================== */

const formularioInicial: FormUsuario = {
  nome: "",
  cpf: "",
  dataNascimento: "",
  email: "",
  perfil: 3,
  empresaId: 0,
};

/* =====================================================
   PERFIS
===================================================== */

const perfisPermitidos = [
  {
    valor: 2,
    nome: "Dono da Empresa",
    descricao: "Acesso principal da empresa",
  },
  {
    valor: 3,
    nome: "Administrador",
    descricao: "Gerencia a operação da empresa",
  },
  {
    valor: 4,
    nome: "Profissional",
    descricao: "Usuário operacional",
  },
  {
    valor: 5,
    nome: "Aluno",
    descricao: "Acesso destinado ao aluno",
  },
  {
    valor: 6,
    nome: "Cliente",
    descricao: "Acesso destinado a Clientes"
  },

];


/* =====================================================
   USUÁRIO LOGADO
===================================================== */

function obterUsuarioLocalStorage(): UsuarioLogado | null {
  const chaves = [
    "usuario",
    "usuarioLogado",
    "user",
    "currentUser",
  ];

  for (const chave of chaves) {
    const valor = localStorage.getItem(chave);

    if (!valor) continue;

    try {
      const usuario = JSON.parse(valor);

      if (usuario) {
        return usuario;
      }
    } catch {
      // Continua procurando outra chave.
    }
  }

  return null;
}

/* =====================================================
   PERFIL MASTER
   Perfil 1 = Master / Administração da plataforma
===================================================== */

function usuarioEhMaster(): boolean {
  const usuario = obterUsuarioLocalStorage();

  return Number(usuario?.perfil) === 1;
}

/* =====================================================
   EMPRESA DO USUÁRIO LOGADO

   IMPORTANTE:
   O Master pode não possuir empresa.
   Nesse caso retorna 0.
===================================================== */

function obterEmpresaIdUsuarioLogado(): number {
  const usuario = obterUsuarioLocalStorage();

  if (
    usuario?.empresaId !== undefined &&
    usuario?.empresaId !== null
  ) {
    return Number(usuario.empresaId);
  }

  const empresaId =
    Number(localStorage.getItem("empresaId")) ||
    Number(localStorage.getItem("EmpresaId")) ||
    0;

  return empresaId;
}

/* =====================================================
   NOME DA EMPRESA
===================================================== */

function obterNomeEmpresa(empresa: Empresa): string {
  return (
    empresa.nomeFantasia ||
    empresa.nome ||
    empresa.razaoSocial ||
    `Empresa #${empresa.id}`
  );
}

/* =====================================================
   NOME DO PERFIL
===================================================== */

function obterNomePerfil(perfil: number) {
  return (
    perfisPermitidos.find(
      (item) => item.valor === perfil
    )?.nome || "Perfil"
  );
}

/* =====================================================
   DESCRIÇÃO DO PERFIL
===================================================== */

function obterDescricaoPerfil(perfil: number) {
  return (
    perfisPermitidos.find(
      (item) => item.valor === perfil
    )?.descricao || ""
  );
}

/* =====================================================
   DATA
===================================================== */

function formatarData(data?: string | null) {
  if (!data) return "-";

  return new Date(data).toLocaleDateString("pt-BR");
}

/* =====================================================
   CPF
===================================================== */

function formatarCpf(cpf?: string) {
  if (!cpf) return "-";

  const somenteNumeros = cpf.replace(/\D/g, "");

  if (somenteNumeros.length !== 11) {
    return cpf;
  }

  return somenteNumeros.replace(
    /(\d{3})(\d{3})(\d{3})(\d{2})/,
    "$1.$2.$3-$4"
  );
}

/* =====================================================
   DATA INPUT
===================================================== */

function formatarDataInput(data?: string | null) {
  if (!data) return "";

  return data.substring(0, 10);
}

/* =====================================================
   COMPONENTE
===================================================== */

export default function Usuario() {
  /* ===================================================
     USUÁRIOS
  =================================================== */

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  /* ===================================================
     EMPRESAS
  =================================================== */

  const [empresas, setEmpresas] = useState<Empresa[]>([]);

  /* ===================================================
     ESTADOS
  =================================================== */

  const [carregando, setCarregando] = useState(true);

  const [carregandoEmpresas, setCarregandoEmpresas] =
    useState(false);

  const [erro, setErro] = useState("");

  const [pesquisa, setPesquisa] = useState("");

  const [filtroPerfil, setFiltroPerfil] =
    useState<number | "todos">("todos");

  const [filtroStatus, setFiltroStatus] =
    useState<"todos" | "ativos" | "inativos">("todos");

  const [modalAberto, setModalAberto] =
    useState(false);

  const [usuarioSelecionado, setUsuarioSelecionado] =
    useState<Usuario | null>(null);

  const [formulario, setFormulario] =
    useState<FormUsuario>(formularioInicial);

  const [salvando, setSalvando] =
    useState(false);

  const [empresaIdUsuarioLogado, setEmpresaIdUsuarioLogado] =
    useState(0);

  const [ehMaster, setEhMaster] =
    useState(false);

  /* =====================================================
     CARREGAR EMPRESAS
  ===================================================== */

  async function carregarEmpresas() {
    try {
      setCarregandoEmpresas(true);

      const dados = await listarEmpresas();

      const lista = Array.isArray(dados)
        ? dados
        : [];

      setEmpresas(
        lista.filter(
          (empresa: Empresa) =>
            empresa.ativo !== false
        )
      );
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Não foi possível carregar as empresas."
      );
    } finally {
      setCarregandoEmpresas(false);
    }
  }

  /* =====================================================
     CARREGAR USUÁRIOS
  ===================================================== */

  async function carregarUsuarios(
    empresaParaCarregar?: number
  ) {
    try {
      setCarregando(true);
      setErro("");

      const master = usuarioEhMaster();

      const empresaLogado =
        obterEmpresaIdUsuarioLogado();

      setEhMaster(master);
      setEmpresaIdUsuarioLogado(
        empresaLogado
      );

      /*
       * MASTER:
       *
       * O Master não possui empresa.
       * Portanto, não podemos exigir empresaId
       * do localStorage para abrir a tela.
       *
       * Para listar usuários, usamos a empresa
       * selecionada quando houver.
       */

      if (master) {
        const empresaSelecionada =
          empresaParaCarregar ||
          0;

        if (!empresaSelecionada) {
          /*
           * Ainda não existe empresa selecionada
           * para filtrar os usuários.
           *
           * A tela continua funcionando e
           * mostramos os usuários vazios.
           */
          setUsuarios([]);

          return;
        }

        const dados =
          await listarUsuariosPorEmpresa(
            empresaSelecionada
          );

        setUsuarios(
          Array.isArray(dados)
            ? dados
            : []
        );

        return;
      }

      /*
       * USUÁRIO VINCULADO A EMPRESA
       */

      if (!empresaLogado) {
        setErro(
          "Não foi possível identificar a empresa do usuário logado."
        );

        setUsuarios([]);

        return;
      }

      const dados =
        await listarUsuariosPorEmpresa(
          empresaLogado
        );

      setUsuarios(
        Array.isArray(dados)
          ? dados
          : []
      );
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Não foi possível carregar os usuários."
      );
    } finally {
      setCarregando(false);
    }
  }

  /* =====================================================
     INICIALIZAÇÃO
  ===================================================== */

  useEffect(() => {
    async function inicializar() {
      try {
        const master = usuarioEhMaster();

        setEhMaster(master);

        const empresaLogado =
          obterEmpresaIdUsuarioLogado();

        setEmpresaIdUsuarioLogado(
          empresaLogado
        );

        /*
         * Sempre carregamos as empresas.
         *
         * Isso é especialmente importante
         * para o Master, pois ele precisa escolher
         * a empresa ao cadastrar o usuário.
         */

        await carregarEmpresas();

        /*
         * Usuário normal:
         * carrega automaticamente a própria empresa.
         */

        if (!master && empresaLogado) {
          await carregarUsuarios(
            empresaLogado
          );
        } else {
          /*
           * Master:
           *
           * Não possui empresa própria.
           * Não força empresaId.
           *
           * Usuários serão carregados conforme
           * a empresa selecionada.
           */

          await carregarUsuarios();
        }
      } catch (error) {
        setErro(
          error instanceof Error
            ? error.message
            : "Não foi possível inicializar a tela."
        );
      }
    }

    inicializar();
  }, []);

  /* =====================================================
     FILTROS
  ===================================================== */

  const usuariosFiltrados = useMemo(() => {
    const termo =
      pesquisa
        .toLowerCase()
        .trim();

    return usuarios.filter(
      (usuario) => {
        const correspondePesquisa =
          !termo ||
          usuario.nome
            ?.toLowerCase()
            .includes(termo) ||
          usuario.email
            ?.toLowerCase()
            .includes(termo) ||
          usuario.cpf
            ?.toLowerCase()
            .includes(termo) ||
          usuario.empresa
            ?.toLowerCase()
            .includes(termo);

        const correspondePerfil =
          filtroPerfil === "todos" ||
          usuario.perfil ===
            filtroPerfil;

        const correspondeStatus =
          filtroStatus === "todos" ||
          (filtroStatus ===
            "ativos" &&
            usuario.ativo) ||
          (filtroStatus ===
            "inativos" &&
            !usuario.ativo);

        return (
          correspondePesquisa &&
          correspondePerfil &&
          correspondeStatus
        );
      }
    );
  }, [
    usuarios,
    pesquisa,
    filtroPerfil,
    filtroStatus,
  ]);

  /* =====================================================
     NOVO USUÁRIO
  ===================================================== */

  function abrirNovoUsuario() {
    setUsuarioSelecionado(null);

    /*
     * Se for Master:
     * começa sem empresa para obrigar a escolha.
     *
     * Se for usuário vinculado:
     * já seleciona a própria empresa.
     */

    setFormulario({
      ...formularioInicial,
      empresaId: ehMaster
        ? 0
        : empresaIdUsuarioLogado,
    });

    setErro("");

    setModalAberto(true);
  }

  /* =====================================================
     EDITAR USUÁRIO
  ===================================================== */

  function abrirEdicao(
    usuario: Usuario
  ) {
    setUsuarioSelecionado(
      usuario
    );

    setFormulario({
      nome:
        usuario.nome || "",

      cpf:
        usuario.cpf || "",

      dataNascimento:
        formatarDataInput(
          usuario.dataNascimento
        ),

      email:
        usuario.email || "",

      perfil:
        usuario.perfil,

      empresaId:
        Number(
          usuario.empresaId || 0
        ),
    });

    setErro("");

    setModalAberto(true);
  }

  /* =====================================================
     ALTERAR CAMPO
  ===================================================== */

  function alterarCampo(
    campo: keyof FormUsuario,
    valor: string | number
  ) {
    setFormulario(
      (anterior) => ({
        ...anterior,
        [campo]: valor,
      })
    );
  }

  /* =====================================================
     EMPRESA SELECIONADA
  ===================================================== */

  const empresaSelecionada =
    useMemo(() => {
      return empresas.find(
        (empresa) =>
          empresa.id ===
          formulario.empresaId
      );
    }, [
      empresas,
      formulario.empresaId,
    ]);

  /* =====================================================
     SALVAR USUÁRIO
  ===================================================== */

  async function salvarUsuario(
    event: React.FormEvent
  ) {
    event.preventDefault();

    try {
      setSalvando(true);
      setErro("");

      /* -----------------------------------------------
         NOME
      ----------------------------------------------- */

      if (!formulario.nome.trim()) {
        setErro(
          "Informe o nome do usuário."
        );

        return;
      }

      /* -----------------------------------------------
         CPF
      ----------------------------------------------- */

      if (!usuarioSelecionado) {
        if (!formulario.cpf.trim()) {
          setErro(
            "Informe o CPF do usuário."
          );

          return;
        }

        if (
          !formulario.dataNascimento
        ) {
          setErro(
            "Informe a data de nascimento."
          );

          return;
        }
      }

      /* -----------------------------------------------
         E-MAIL
      ----------------------------------------------- */

      if (!formulario.email.trim()) {
        setErro(
          "Informe o e-mail do usuário."
        );

        return;
      }

      /* -----------------------------------------------
         EMPRESA
      ----------------------------------------------- */

      if (!formulario.empresaId) {
        setErro(
          "Selecione a empresa à qual o usuário será vinculado."
        );

        return;
      }

      /* -----------------------------------------------
         EMPRESA EXISTE
      ----------------------------------------------- */

      const empresaExiste =
        empresas.some(
          (empresa) =>
            empresa.id ===
            formulario.empresaId
        );

      if (!empresaExiste) {
        setErro(
          "A empresa selecionada não foi encontrada."
        );

        return;
      }

      /* -----------------------------------------------
         PERFIL
      ----------------------------------------------- */

      if (
        !perfisPermitidos.some(
          (perfil) =>
            perfil.valor ===
            formulario.perfil
        )
      ) {
        setErro(
          "Perfil de usuário inválido."
        );

        return;
      }

      /* -----------------------------------------------
         ATUALIZAÇÃO
      ----------------------------------------------- */

      if (usuarioSelecionado) {
        await atualizarUsuario(
          usuarioSelecionado.id,
          {
            nome:
              formulario.nome.trim(),

            dataNascimento:
              formulario.dataNascimento
                ? formulario.dataNascimento
                : null,

            email:
              formulario.email.trim(),

            perfil:
              formulario.perfil,

            empresaId:
              formulario.empresaId,
          }
        );
      }

      /* -----------------------------------------------
         CRIAÇÃO
      ----------------------------------------------- */

      else {
        await criarUsuario({
          nome:
            formulario.nome.trim(),

          cpf:
            formulario.cpf
              .replace(/\D/g, "")
              .trim(),

          dataNascimento:
            formulario.dataNascimento,

          email:
            formulario.email.trim(),

          perfil:
            formulario.perfil,

          empresaId:
            formulario.empresaId,
        });
      }

      /* -----------------------------------------------
         FECHAR
      ----------------------------------------------- */

      setModalAberto(false);

      setUsuarioSelecionado(
        null
      );

      setFormulario(
        formularioInicial
      );

      /*
       * Depois de salvar, atualizamos
       * a lista da empresa selecionada.
       */

      await carregarUsuarios(
        formulario.empresaId
      );
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Não foi possível salvar o usuário."
      );
    } finally {
      setSalvando(false);
    }
  }

  /* =====================================================
     ATIVAR / DESATIVAR
  ===================================================== */

  async function alterarStatus(
    usuario: Usuario
  ) {
    const acao =
      usuario.ativo
        ? "desativar"
        : "ativar";

    const confirmado =
      window.confirm(
        `Deseja realmente ${acao} o usuário "${usuario.nome}"?`
      );

    if (!confirmado) {
      return;
    }

    try {
      setErro("");

      if (usuario.ativo) {
        await desativarUsuario(
          usuario.id
        );
      } else {
        await ativarUsuario(
          usuario.id
        );
      }

      await carregarUsuarios(
        Number(
          usuario.empresaId ||
            empresaIdUsuarioLogado
        )
      );
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Não foi possível alterar o status."
      );
    }
  }

  /* =====================================================
     TROCAR EMPRESA PARA VISUALIZAÇÃO
     
     Só aparece para MASTER.
  ===================================================== */

  async function trocarEmpresaVisualizacao(
    valor: string
  ) {
    const id = Number(valor);

    if (!id) {
      setUsuarios([]);

      return;
    }

    await carregarUsuarios(id);
  }

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <section className="usuarios-page">

      {/* =================================================
          CABEÇALHO
      ================================================= */}

      <div className="usuarios-header">

        <div>

          <span className="usuarios-eyebrow">
            ADMINISTRAÇÃO
          </span>

          <h1>
            Usuários
          </h1>

          <p>
            Gerencie os usuários, acessos e empresas vinculadas.
          </p>

        </div>

        <button
          type="button"
          className="usuario-primary-button"
          onClick={abrirNovoUsuario}
        >
          <span>+</span>

          Novo usuário
        </button>

      </div>

      {/* =================================================
          SELEÇÃO DE EMPRESA PARA MASTER
      ================================================= */}

      {ehMaster && (

        <div className="usuarios-toolbar">

          <div
            className="usuario-form-group"
            style={{
              flex: 1,
              minWidth: "280px",
            }}
          >

            <label>
              Empresa para visualizar usuários
            </label>

            <select
              className="usuario-filter"
              defaultValue=""
              onChange={(event) =>
                trocarEmpresaVisualizacao(
                  event.target.value
                )
              }
              disabled={
                carregandoEmpresas
              }
            >

              <option value="">
                Selecione uma empresa
              </option>

              {empresas.map(
                (empresa) => (

                  <option
                    key={empresa.id}
                    value={empresa.id}
                  >
                    {obterNomeEmpresa(
                      empresa
                    )}
                  </option>

                )
              )}

            </select>

          </div>

        </div>

      )}

      {/* =================================================
          CARDS
      ================================================= */}

      <div className="usuarios-stats">

        <div className="usuario-stat">

          <div className="usuario-stat-icon">
            ◉
          </div>

          <div>

            <span>
              Total de usuários
            </span>

            <strong>
              {usuarios.length}
            </strong>

          </div>

        </div>

        <div className="usuario-stat">

          <div className="usuario-stat-icon">
            ✓
          </div>

          <div>

            <span>
              Usuários ativos
            </span>

            <strong>
              {
                usuarios.filter(
                  (usuario) =>
                    usuario.ativo
                ).length
              }
            </strong>

          </div>

        </div>

        <div className="usuario-stat">

          <div className="usuario-stat-icon">
            ◌
          </div>

          <div>

            <span>
              Usuários inativos
            </span>

            <strong>
              {
                usuarios.filter(
                  (usuario) =>
                    !usuario.ativo
                ).length
              }
            </strong>

          </div>

        </div>

        <div className="usuario-stat">

          <div className="usuario-stat-icon">
            ◇
          </div>

          <div>

            <span>
              Administradores
            </span>

            <strong>
              {
                usuarios.filter(
                  (usuario) =>
                    usuario.perfil === 2 ||
                    usuario.perfil === 3
                ).length
              }
            </strong>

          </div>

        </div>

      </div>

      {/* =================================================
          TOOLBAR
      ================================================= */}

      <div className="usuarios-toolbar">

        <div className="usuario-search">

          <span>
            ⌕
          </span>

          <input
            type="text"
            placeholder="Pesquisar por nome, CPF, e-mail ou empresa..."
            value={pesquisa}
            onChange={(event) =>
              setPesquisa(
                event.target.value
              )
            }
          />

        </div>

        <select
          className="usuario-filter"
          value={filtroPerfil}
          onChange={(event) => {

            const valor =
              event.target.value;

            setFiltroPerfil(
              valor === "todos"
                ? "todos"
                : Number(valor)
            );

          }}
        >

          <option value="todos">
            Todos os perfis
          </option>

          {perfisPermitidos.map(
            (perfil) => (

              <option
                key={perfil.valor}
                value={perfil.valor}
              >
                {perfil.nome}
              </option>

            )
          )}

        </select>

        <select
          className="usuario-filter"
          value={filtroStatus}
          onChange={(event) =>
            setFiltroStatus(
              event.target.value as
                | "todos"
                | "ativos"
                | "inativos"
            )
          }
        >

          <option value="todos">
            Todos os status
          </option>

          <option value="ativos">
            Ativos
          </option>

          <option value="inativos">
            Inativos
          </option>

        </select>

        <button
          type="button"
          className="usuario-refresh-button"
          onClick={() =>
            carregarUsuarios(
              ehMaster
                ? undefined
                : empresaIdUsuarioLogado
            )
          }
          title="Atualizar"
        >
          ↻
        </button>

      </div>

      {/* =================================================
          ERRO
      ================================================= */}

      {erro && (

        <div className="usuarios-error">

          <span>
            !
          </span>

          <div>
            {erro}
          </div>

          <button
            type="button"
            onClick={() =>
              setErro("")
            }
          >
            ×
          </button>

        </div>

      )}

      {/* =================================================
          TABELA
      ================================================= */}

      <div className="usuarios-table-container">

        {carregando ? (

          <div className="usuarios-loading">

            <div className="usuario-loading-spinner"></div>

            <span>
              Carregando usuários...
            </span>

          </div>

        ) : usuariosFiltrados.length === 0 ? (

          <div className="usuarios-empty">

            <div className="usuario-empty-icon">
              ◉
            </div>

            <h3>
              Nenhum usuário encontrado
            </h3>

            <p>
              {ehMaster
                ? "Selecione uma empresa ou cadastre um novo usuário vinculando-o a uma empresa."
                : "Cadastre um usuário para começar a gerenciar os acessos da empresa."}
            </p>

            <button
              type="button"
              className="usuario-primary-button"
              onClick={
                abrirNovoUsuario
              }
            >
              + Novo usuário
            </button>

          </div>

        ) : (

          <table>

            <thead>

              <tr>

                <th>
                  Usuário
                </th>

                <th>
                  CPF
                </th>

                <th>
                  E-mail
                </th>

                <th>
                  Empresa
                </th>

                <th>
                  Perfil
                </th>

                <th>
                  Cadastro
                </th>

                <th>
                  Status
                </th>

                <th>
                  Ações
                </th>

              </tr>

            </thead>

            <tbody>

              {usuariosFiltrados.map(
                (usuario) => (

                  <tr
                    key={
                      usuario.id
                    }
                  >

                    <td>

                      <div className="usuario-name">

                        <div className="usuario-avatar">
                          {usuario.nome
                            ?.charAt(
                              0
                            )
                            ?.toUpperCase()}
                        </div>

                        <div>

                          <strong>
                            {usuario.nome}
                          </strong>

                          <small>
                            ID #
                            {
                              usuario.id
                            }
                          </small>

                        </div>

                      </div>

                    </td>

                    <td>

                      <span className="usuario-documento">
                        {
                          formatarCpf(
                            usuario.cpf
                          )
                        }
                      </span>

                    </td>

                    <td>

                      <span className="usuario-email">
                        {
                          usuario.email
                        }
                      </span>

                    </td>

                    <td>

                      <div className="usuario-perfil">

                        <span
                          className="perfil-badge"
                        >
                          {
                            usuario.empresa ||
                            empresas.find(
                              (empresa) =>
                                empresa.id ===
                                usuario.empresaId
                            )?.nomeFantasia ||
                            empresas.find(
                              (empresa) =>
                                empresa.id ===
                                usuario.empresaId
                            )?.nome ||
                            `Empresa #${usuario.empresaId || "-"}`
                          }
                        </span>

                      </div>

                    </td>

                    <td>

                      <div className="usuario-perfil">

                        <span
                          className={`perfil-badge perfil-${usuario.perfil}`}
                        >
                          {
                            obterNomePerfil(
                              usuario.perfil
                            )
                          }
                        </span>

                      </div>

                    </td>

                    <td>

                      <span className="usuario-data">
                        {
                          formatarData(
                            usuario.dataCadastro
                          )
                        }
                      </span>

                    </td>

                    <td>

                      <span
                        className={
                          usuario.ativo
                            ? "usuario-status-badge ativo"
                            : "usuario-status-badge inativo"
                        }
                      >

                        <span></span>

                        {
                          usuario.ativo
                            ? "Ativo"
                            : "Inativo"
                        }

                      </span>

                    </td>

                    <td>

                      <div className="usuario-actions">

                        <button
                          type="button"
                          title="Editar usuário"
                          onClick={() =>
                            abrirEdicao(
                              usuario
                            )
                          }
                        >
                          ✎
                        </button>

                        <button
                          type="button"
                          title={
                            usuario.ativo
                              ? "Desativar usuário"
                              : "Ativar usuário"
                          }
                          onClick={() =>
                            alterarStatus(
                              usuario
                            )
                          }
                        >
                          {
                            usuario.ativo
                              ? "◌"
                              : "✓"
                          }
                        </button>

                      </div>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        )}

      </div>

      {/* =================================================
          MODAL
      ================================================= */}

      {modalAberto && (

        <div
          className="usuario-modal-overlay"
          onMouseDown={(
            event
          ) => {

            if (
              event.target ===
              event.currentTarget
            ) {
              setModalAberto(
                false
              );
            }

          }}
        >

          <div className="usuario-modal">

            {/* =========================================
                CABEÇALHO MODAL
            ========================================= */}

            <div className="usuario-modal-header">

              <div>

                <span>
                  {
                    usuarioSelecionado
                      ? "EDITAR USUÁRIO"
                      : "NOVO USUÁRIO"
                  }
                </span>

                <h2>
                  {
                    usuarioSelecionado
                      ? "Editar usuário"
                      : "Cadastrar usuário"
                  }
                </h2>

                <p>
                  {
                    usuarioSelecionado
                      ? "Atualize os dados, acesso e empresa vinculada."
                      : "Cadastre um novo usuário e vincule-o a uma empresa."
                  }
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setModalAberto(
                    false
                  )
                }
              >
                ×
              </button>

            </div>

            {/* =========================================
                FORM
            ========================================= */}

            <form
              className="usuario-form"
              onSubmit={
                salvarUsuario
              }
            >

              {/* =======================================
                  DADOS PESSOAIS
              ======================================= */}

              <div className="usuario-form-section">

                <div className="usuario-section-title">

                  <div className="usuario-section-icon">
                    ◉
                  </div>

                  <div>

                    <h3>
                      Dados pessoais
                    </h3>

                    <p>
                      Informações básicas do usuário.
                    </p>

                  </div>

                </div>

                <div className="usuario-form-grid">

                  <div className="usuario-form-group usuario-form-wide">

                    <label>
                      Nome completo *
                    </label>

                    <input
                      type="text"
                      value={
                        formulario.nome
                      }
                      placeholder="Digite o nome completo"
                      onChange={(
                        event
                      ) =>
                        alterarCampo(
                          "nome",
                          event.target.value
                        )
                      }
                    />

                  </div>

                  <div className="usuario-form-group">

                    <label>
                      CPF *
                    </label>

                    <input
                      type="text"
                      value={
                        formulario.cpf
                      }
                      placeholder="000.000.000-00"
                      disabled={
                        !!usuarioSelecionado
                      }
                      maxLength={
                        14
                      }
                      onChange={(
                        event
                      ) =>
                        alterarCampo(
                          "cpf",
                          event.target.value
                        )
                      }
                    />

                  </div>

                  <div className="usuario-form-group">

                    <label>
                      Data de nascimento *
                    </label>

                    <input
                      type="date"
                      value={
                        formulario.dataNascimento
                      }
                      onChange={(
                        event
                      ) =>
                        alterarCampo(
                          "dataNascimento",
                          event.target.value
                        )
                      }
                    />

                  </div>

                </div>

              </div>

              {/* =======================================
                  EMPRESA
              ======================================= */}

              <div className="usuario-form-section">

                <div className="usuario-section-title">

                  <div className="usuario-section-icon">
                    ◆
                  </div>

                  <div>

                    <h3>
                      Empresa vinculada
                    </h3>

                    <p>
                      Defina em qual empresa este usuário terá acesso.
                    </p>

                  </div>

                </div>

                <div className="usuario-form-grid">

                  <div className="usuario-form-group usuario-form-wide">

                    <label>
                      Empresa *
                    </label>

                    <select
                      value={
                        formulario.empresaId
                      }
                      onChange={(
                        event
                      ) =>
                        alterarCampo(
                          "empresaId",
                          Number(
                            event.target.value
                          )
                        )
                      }
                      disabled={
                        !ehMaster &&
                        !!empresaIdUsuarioLogado
                      }
                    >

                      <option value={0}>
                        {carregandoEmpresas
                          ? "Carregando empresas..."
                          : "Selecione a empresa"}
                      </option>

                      {empresas.map(
                        (empresa) => (

                          <option
                            key={
                              empresa.id
                            }
                            value={
                              empresa.id
                            }
                          >
                            {
                              obterNomeEmpresa(
                                empresa
                              )
                            }
                          </option>

                        )
                      )}

                    </select>

                    {empresaSelecionada && (

                      <div className="usuario-perfil-help">

                        <strong>
                          {
                            obterNomeEmpresa(
                              empresaSelecionada
                            )
                          }
                        </strong>

                        <span>
                          ID da empresa: #
                          {
                            empresaSelecionada.id
                          }
                        </span>

                      </div>

                    )}

                    {!ehMaster &&
                      empresaIdUsuarioLogado && (

                        <div className="usuario-perfil-help">

                          <strong>
                            Empresa vinculada ao seu acesso
                          </strong>

                          <span>
                            Usuários criados por este acesso ficam vinculados à sua empresa.
                          </span>

                        </div>

                      )}

                  </div>

                </div>

              </div>

              {/* =======================================
                  ACESSO
              ======================================= */}

              <div className="usuario-form-section">

                <div className="usuario-section-title">

                  <div className="usuario-section-icon">
                    ◇
                  </div>

                  <div>

                    <h3>
                      Acesso ao sistema
                    </h3>

                    <p>
                      Defina o e-mail e o perfil de acesso.
                    </p>

                  </div>

                </div>

                <div className="usuario-form-grid">

                  <div className="usuario-form-group usuario-form-wide">

                    <label>
                      E-mail *
                    </label>

                    <input
                      type="email"
                      value={
                        formulario.email
                      }
                      placeholder="usuario@empresa.com"
                      onChange={(
                        event
                      ) =>
                        alterarCampo(
                          "email",
                          event.target.value
                        )
                      }
                    />

                  </div>

                  <div className="usuario-form-group usuario-form-wide">

                    <label>
                      Perfil de acesso *
                    </label>

                    <select
                      value={
                        formulario.perfil
                      }
                      onChange={(
                        event
                      ) =>
                        alterarCampo(
                          "perfil",
                          Number(
                            event.target.value
                          )
                        )
                      }
                    >

                      {perfisPermitidos.map(
                        (perfil) => (

                          <option
                            key={
                              perfil.valor
                            }
                            value={
                              perfil.valor
                            }
                          >
                            {
                              perfil.nome
                            }
                          </option>

                        )
                      )}

                    </select>

                    <div className="usuario-perfil-help">

                      <strong>
                        {
                          obterNomePerfil(
                            formulario.perfil
                          )
                        }
                      </strong>

                      <span>
                        {
                          obterDescricaoPerfil(
                            formulario.perfil
                          )
                        }
                      </span>

                    </div>

                  </div>

                </div>

              </div>

              {/* =======================================
                  SENHA
              ======================================= */}

              {!usuarioSelecionado && (

                <div className="usuario-senha-info">

                  <div className="usuario-senha-icon">
                    🔐
                  </div>

                  <div>

                    <strong>
                      Senha inicial automática
                    </strong>

                    <p>
                      A senha inicial será criada
                      automaticamente pelo sistema.
                      O usuário deverá redefini-la
                      posteriormente.
                    </p>

                  </div>

                </div>

              )}

              {/* =======================================
                  RODAPÉ
              ======================================= */}

              <div className="usuario-modal-footer">

                <button
                  type="button"
                  className="usuario-cancel-button"
                  onClick={() =>
                    setModalAberto(
                      false
                    )
                  }
                  disabled={
                    salvando
                  }
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="usuario-primary-button"
                  disabled={
                    salvando ||
                    carregandoEmpresas
                  }
                >
                  {
                    salvando
                      ? "Salvando..."
                      : usuarioSelecionado
                        ? "Salvar alterações"
                        : "Criar usuário"
                  }
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </section>
  );
}