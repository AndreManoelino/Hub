import { useEffect, useMemo, useState } from "react";
import "./Empresas.css";

import {
  listarEmpresas,
  criarEmpresa,
  atualizarEmpresa,
  buscarEmpresaPorDocumento,
  desativarEmpresa,
  ativarEmpresa,
  listarTiposEmpresa,
} from "../../../services/api";

interface Empresa {
  id: number;
  nomeFantasia: string;
  razaoSocial: string;
  cnpj: string;
  inscricaoEstadual?: string | null;
  email?: string | null;
  telefone?: string | null;
  celular?: string | null;
  cep?: string | null;
  estado?: string | null;
  cidade?: string | null;
  bairro?: string | null;
  logradouro?: string | null;
  numero?: string | null;
  complemento?: string | null;

  planoId?: number | null;
  plano?: string | null;

  tipoEmpresaId?: number | null;
  tipoEmpresa?: string | null;

  ativo: boolean;
  dataCadastro: string;
  dataAtualizacao?: string;
}

interface FormEmpresa {
  nomeFantasia: string;
  razaoSocial: string;
  cnpj: string;
  inscricaoEstadual: string;
  email: string;
  telefone: string;
  celular: string;
  cep: string;
  estado: string;
  cidade: string;
  bairro: string;
  logradouro: string;
  numero: string;
  complemento: string;
  planoId: number;
  tipoEmpresaId: number;
}
interface TipoEmpresa {
  id: number;
  nome: string;
  codigo: string;
  descricao?: string | null;
  ativo: boolean;
}
const formularioInicial: FormEmpresa = {
  nomeFantasia: "",
  razaoSocial: "",
  cnpj: "",
  inscricaoEstadual: "",
  email: "",
  telefone: "",
  celular: "",
  cep: "",
  estado: "",
  cidade: "",
  bairro: "",
  logradouro: "",
  numero: "",
  complemento: "",
  planoId: 0,
  tipoEmpresaId: 0,
};

function formatarDocumento(empresa: Empresa) {
  return empresa.cnpj || "-";
}


function formatarData(data?: string) {
  if (!data) return "-";

  return new Date(data).toLocaleDateString("pt-BR");
}


export default function Empresas() {

  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [tiposEmpresa, setTiposEmpresa] = useState<TipoEmpresa[]>([]);
  const [carregandoTiposEmpresa, setCarregandoTiposEmpresa] = useState(false);
  const [carregando, setCarregando] = useState(true);

  const [erro, setErro] = useState("");

  const [pesquisa, setPesquisa] = useState("");

  const [modalAberto, setModalAberto] = useState(false);

  const [empresaSelecionada, setEmpresaSelecionada] =
    useState<Empresa | null>(null);

  const [formulario, setFormulario] =
    useState<FormEmpresa>(formularioInicial);

  const [salvando, setSalvando] = useState(false);


  /* =====================================================
     CARREGAR
  ===================================================== */

  async function carregarEmpresas() {

    try {

      setCarregando(true);
      setErro("");

      const dados = await listarEmpresas();

      setEmpresas(Array.isArray(dados) ? dados : []);

    } catch (error) {

      setErro(
        error instanceof Error
          ? error.message
          : "Não foi possível carregar as empresas."
      );

    } finally {

      setCarregando(false);

    }
  }
  async function carregarTiposEmpresa() {
    try {
      setCarregandoTiposEmpresa(true);

      const dados = await listarTiposEmpresa();

      setTiposEmpresa(
        Array.isArray(dados) ? dados : []
      );

    } catch (error) {

      console.error(
        "Erro ao carregar tipos de empresa:",
        error
      );

      setErro(
        error instanceof Error
          ? error.message
          : "Não foi possível carregar os tipos de empresa."
      );

    } finally {

      setCarregandoTiposEmpresa(false);

    }
  }

  useEffect(() => {
    carregarEmpresas();
    carregarTiposEmpresa();
  }, []);


  /* =====================================================
     FILTRO
  ===================================================== */

  const empresasFiltradas = useMemo(() => {

    const termo = pesquisa
      .toLowerCase()
      .trim();

    if (!termo) {
      return empresas;
    }

    return empresas.filter((empresa) => {

      const documento = formatarDocumento(empresa);

      return (
        empresa.nomeFantasia
          ?.toLowerCase()
          .includes(termo) ||

        empresa.razaoSocial
          ?.toLowerCase()
          .includes(termo) ||

        documento
          ?.toLowerCase()
          .includes(termo) ||

        empresa.cidade
          ?.toLowerCase()
          .includes(termo)
      );
    });

  }, [empresas, pesquisa]);


  /* =====================================================
     NOVA EMPRESA
  ===================================================== */

  function abrirNovaEmpresa() {

    setEmpresaSelecionada(null);

    setFormulario(formularioInicial);

    setModalAberto(true);

  }


  /* =====================================================
     EDITAR
  ===================================================== */

  function abrirEdicao(empresa: Empresa) {

    setEmpresaSelecionada(empresa);

    setFormulario({

      nomeFantasia: empresa.nomeFantasia || "",

      razaoSocial: empresa.razaoSocial || "",

      cnpj: empresa.cnpj || "",

      inscricaoEstadual:
        empresa.inscricaoEstadual || "",

      email: empresa.email || "",

      telefone: empresa.telefone || "",

      celular: empresa.celular || "",

      cep: empresa.cep || "",

      estado: empresa.estado || "",

      cidade: empresa.cidade || "",

      bairro: empresa.bairro || "",

      logradouro: empresa.logradouro || "",

      numero: empresa.numero || "",

      complemento: empresa.complemento || "",

      planoId: empresa.planoId || 0,

      tipoEmpresaId: empresa.tipoEmpresaId || 0,

    });

    setModalAberto(true);
  }


  /* =====================================================
     INPUT
  ===================================================== */

  function alterarCampo(
    campo: keyof FormEmpresa,
    valor: string | number
  ) {

    setFormulario((anterior) => ({
      ...anterior,
      [campo]: valor,
    }));

  }


  /* =====================================================
     SALVAR
  ===================================================== */

    
    async function salvarEmpresa(
      event: React.FormEvent
    ) {
      event.preventDefault();

      // NÃO deixa outro submit começar enquanto este estiver executando
      if (salvando) {
        console.log("⛔ Salvamento já em andamento. Ignorando novo submit.");
        return;
      }

      // Valida ANTES de colocar o botão como salvando
      if (!formulario.nomeFantasia.trim()) {
        setErro("Informe o nome fantasia.");
        return;
      }

      if (!formulario.razaoSocial.trim()) {
        setErro("Informe a razão social.");
        return;
      }

      const dadosParaEnviar = {
        nomeFantasia: formulario.nomeFantasia.trim(),
        razaoSocial: formulario.razaoSocial.trim(),

        cnpj: formulario.cnpj?.trim() || "",

        inscricaoEstadual:
          formulario.inscricaoEstadual?.trim() || "",

        email:
          formulario.email?.trim() || "",

        telefone:
          formulario.telefone?.trim() || "",

        celular:
          formulario.celular?.trim() || "",

        cep:
          formulario.cep?.trim() || "",

        estado:
          formulario.estado?.trim() || "",

        cidade:
          formulario.cidade?.trim() || "",

        bairro:
          formulario.bairro?.trim() || "",

        logradouro:
          formulario.logradouro?.trim() || "",

        numero:
          formulario.numero?.trim() || "",

        complemento:
          formulario.complemento?.trim() || "",

        planoId:
          Number(formulario.planoId) || 0,
        tipoEmpresaId:
          Number(formulario.tipoEmpresaId) || 0,
      };

      try {
        setSalvando(true);
        setErro("");

        console.log("🚀 INICIANDO SALVAMENTO");

        if (empresaSelecionada) {
          console.log("✏️ Atualizando empresa:", empresaSelecionada.id);

          await atualizarEmpresa(
            empresaSelecionada.id,
            dadosParaEnviar
          );
        } else {
          console.log("➕ Criando empresa");

          await criarEmpresa(dadosParaEnviar);
        }

        console.log("✅ POST/PUT TERMINOU COM SUCESSO");

        // Fecha imediatamente após o POST/PUT terminar
        setSalvando(false);
        setModalAberto(false);
        setEmpresaSelecionada(null);
        setFormulario(formularioInicial);

        // Atualiza a lista depois, sem manter o botão preso
        carregarEmpresas().catch((error) => {
          console.error(
            "Erro ao atualizar lista de empresas:",
            error
          );
        });

      } catch (error) {
        console.error(
          "❌ ERRO AO SALVAR EMPRESA:",
          error
        );

        setErro(
          error instanceof Error
            ? error.message
            : "Não foi possível salvar a empresa."
        );

        setSalvando(false);
      }
    }




  /* =====================================================
     ATIVAR / DESATIVAR
  ===================================================== */

  async function alterarStatus(empresa: Empresa) {

    const acao = empresa.ativo
      ? "desativar"
      : "ativar";

    const confirmado = window.confirm(
      `Deseja realmente ${acao} a empresa "${empresa.nomeFantasia}"?`
    );

    if (!confirmado) {
      return;
    }

    try {

      if (empresa.ativo) {

        await desativarEmpresa(empresa.id);

      } else {

        await ativarEmpresa(empresa.id);

      }

      await carregarEmpresas();

    } catch (error) {

      setErro(
        error instanceof Error
          ? error.message
          : "Não foi possível alterar o status."
      );

    }
  }


  /* =====================================================
     BUSCAR DOCUMENTO
  ===================================================== */

  async function buscarDocumento() {

    const documento = window.prompt(
      "Digite o CPF ou CNPJ:"
    );

    if (!documento?.trim()) {
      return;
    }

    try {

      setErro("");

      const empresa =
        await buscarEmpresaPorDocumento(
          documento.trim()
        );

      if (!empresa) {
        setErro("Empresa não encontrada.");
        return;
      }

      setPesquisa(
        empresa.nomeFantasia || documento
      );

    } catch (error) {

      setErro(
        error instanceof Error
          ? error.message
          : "Não foi possível realizar a busca."
      );

    }
  }


  return (
    <section className="empresas-page">

      {/* =================================================
          CABEÇALHO
      ================================================= */}

      <div className="empresas-header">

        <div>

          <span className="empresas-eyebrow">
            ADMINISTRAÇÃO
          </span>

          <h1>
            Empresas
          </h1>

          <p>
            Gerencie as empresas cadastradas no
            ControllHub.
          </p>

        </div>


        <button
          className="empresa-primary-button"
          onClick={abrirNovaEmpresa}
        >
          <span>+</span>
          Criar empresa
        </button>

      </div>


      {/* =================================================
          CARDS
      ================================================= */}

      <div className="empresas-stats">

        <div className="empresa-stat">

          <span>Total</span>

          <strong>
            {empresas.length}
          </strong>

        </div>


        <div className="empresa-stat">

          <span>Ativas</span>

          <strong>
            {
              empresas.filter(
                (empresa) => empresa.ativo
              ).length
            }
          </strong>

        </div>


        <div className="empresa-stat">

          <span>Inativas</span>

          <strong>
            {
              empresas.filter(
                (empresa) => !empresa.ativo
              ).length
            }
          </strong>

        </div>

      </div>


      {/* =================================================
          BARRA DE FERRAMENTAS
      ================================================= */}

      <div className="empresas-toolbar">

        <div className="empresa-search">

          <span>⌕</span>

          <input
            type="text"
            placeholder="Pesquisar empresa, CNPJ ou cidade..."
            value={pesquisa}
            onChange={(event) =>
              setPesquisa(event.target.value)
            }
          />

        </div>


        <button
          className="empresa-secondary-button"
          onClick={buscarDocumento}
        >
          Buscar documento
        </button>


        <button
          className="empresa-refresh-button"
          onClick={carregarEmpresas}
        >
          ↻
        </button>

      </div>


      {/* =================================================
          ERRO
      ================================================= */}

      {erro && (

        <div className="empresas-error">

          <span>!</span>

          <div>
            {erro}
          </div>

          <button
            onClick={() => setErro("")}
          >
            ×
          </button>

        </div>

      )}


      {/* =================================================
          TABELA
      ================================================= */}

      <div className="empresas-table-container">

        {carregando ? (

          <div className="empresas-loading">

            <div className="loading-spinner"></div>

            <span>
              Carregando empresas...
            </span>

          </div>

        ) : empresasFiltradas.length === 0 ? (

          <div className="empresas-empty">

            <div className="empty-icon">
              ◇
            </div>

            <h3>
              Nenhuma empresa encontrada
            </h3>

            <p>
              Cadastre uma nova empresa para começar.
            </p>

            <button
              className="empresa-primary-button"
              onClick={abrirNovaEmpresa}
            >
              + Criar empresa
            </button>

          </div>

        ) : (

          <table>

            <thead>

              <tr>

                <th>
                  Empresa
                </th>

                <th>
                  Documento
                </th>

                <th>
                  Localização
                </th>

                <th>
                  Plano
                </th>
                <th>
                  Tipo
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

              {empresasFiltradas.map(
                (empresa) => (

                  <tr key={empresa.id}>

                    <td>

                      <div className="empresa-name">

                        <div className="empresa-avatar">
                          {empresa.nomeFantasia
                            ?.charAt(0)
                            ?.toUpperCase()}
                        </div>

                        <div>

                          <strong>
                            {empresa.nomeFantasia}
                          </strong>

                          <small>
                            {empresa.razaoSocial}
                          </small>

                        </div>

                      </div>

                    </td>


                    <td>

                      <span className="documento">
                        {formatarDocumento(empresa)}
                      </span>

                    </td>


                    <td>

                      <div className="localizacao">

                        <strong>
                          {empresa.cidade || "-"}
                        </strong>

                        <small>
                          {empresa.estado || ""}
                        </small>

                      </div>

                    </td>


                    <td>

                      <span className="plano-badge">
                        {empresa.plano || "Plano " + (empresa.planoId || "-")}
                      </span>

                    </td>


                    <td>

                      <span className="data-cadastro">
                        {formatarData(
                          empresa.dataCadastro
                        )}
                      </span>

                    </td>


                    <td>

                      <span
                        className={
                          empresa.ativo
                            ? "status-badge ativo"
                            : "status-badge inativo"
                        }
                      >

                        <span></span>

                        {empresa.ativo
                          ? "Ativa"
                          : "Inativa"}

                      </span>

                    </td>


                    <td>

                      <div className="empresa-actions">

                        <button
                          title="Editar"
                          onClick={() =>
                            abrirEdicao(empresa)
                          }
                        >
                          ✎
                        </button>


                        <button
                          title={
                            empresa.ativo
                              ? "Desativar"
                              : "Ativar"
                          }
                          onClick={() =>
                            alterarStatus(empresa)
                          }
                        >
                          {empresa.ativo
                            ? "◌"
                            : "✓"}
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
          className="empresa-modal-overlay"
          onMouseDown={(event) => {

            if (
              event.target === event.currentTarget
            ) {
              setModalAberto(false);
            }

          }}
        >

          <div className="empresa-modal">

            <div className="empresa-modal-header">

              <div>

                <span>
                  {empresaSelecionada
                    ? "EDITAR EMPRESA"
                    : "NOVA EMPRESA"}
                </span>

                <h2>
                  {empresaSelecionada
                    ? "Editar empresa"
                    : "Criar empresa"}
                </h2>

              </div>


              <button
                onClick={() =>
                  setModalAberto(false)
                }
              >
                ×
              </button>

            </div>


            <form
              className="empresa-form"
              onSubmit={salvarEmpresa}
            >

              <div className="form-section">

                <h3>
                  Informações principais
                </h3>

                <div className="form-grid">

                  <div className="form-group">

                    <label>
                      Nome fantasia *
                    </label>

                    <input
                      value={formulario.nomeFantasia}
                      onChange={(e) =>
                        alterarCampo(
                          "nomeFantasia",
                          e.target.value
                        )
                      }
                    />

                  </div>


                  <div className="form-group">

                    <label>
                      Razão social *
                    </label>

                    <input
                      value={formulario.razaoSocial}
                      onChange={(e) =>
                        alterarCampo(
                          "razaoSocial",
                          e.target.value
                        )
                      }
                    />

                  </div>

                  <div className="form-group">

                    <label>
                      CNPJ
                    </label>

                    <input
                      value={formulario.cnpj}
                      onChange={(e) =>
                        alterarCampo(
                          "cnpj",
                          e.target.value
                        )
                      }
                    />

                  </div>


                  <div className="form-group">

                    <label>
                      Inscrição estadual
                    </label>

                    <input
                      value={
                        formulario.inscricaoEstadual
                      }
                      onChange={(e) =>
                        alterarCampo(
                          "inscricaoEstadual",
                          e.target.value
                        )
                      }
                    />

                  </div>

                </div>

              </div>


              <div className="form-section">

                <h3>
                  Contato
                </h3>

                <div className="form-grid">

                  <div className="form-group">

                    <label>
                      E-mail
                    </label>

                    <input
                      type="email"
                      value={formulario.email}
                      onChange={(e) =>
                        alterarCampo(
                          "email",
                          e.target.value
                        )
                      }
                    />

                  </div>


                  <div className="form-group">

                    <label>
                      Telefone
                    </label>

                    <input
                      value={formulario.telefone}
                      onChange={(e) =>
                        alterarCampo(
                          "telefone",
                          e.target.value
                        )
                      }
                    />

                  </div>


                  <div className="form-group">

                    <label>
                      Celular
                    </label>

                    <input
                      value={formulario.celular}
                      onChange={(e) =>
                        alterarCampo(
                          "celular",
                          e.target.value
                        )
                      }
                    />

                  </div>

                </div>

              </div>


              <div className="form-section">

                <h3>
                  Endereço
                </h3>

                <div className="form-grid">

                  <div className="form-group">

                    <label>
                      CEP
                    </label>

                    <input
                      value={formulario.cep}
                      onChange={(e) =>
                        alterarCampo(
                          "cep",
                          e.target.value
                        )
                      }
                    />

                  </div>


                  <div className="form-group">

                    <label>
                      Estado
                    </label>

                    <input
                      value={formulario.estado}
                      onChange={(e) =>
                        alterarCampo(
                          "estado",
                          e.target.value
                        )
                      }
                    />

                  </div>


                  <div className="form-group">

                    <label>
                      Cidade
                    </label>

                    <input
                      value={formulario.cidade}
                      onChange={(e) =>
                        alterarCampo(
                          "cidade",
                          e.target.value
                        )
                      }
                    />

                  </div>


                  <div className="form-group">

                    <label>
                      Bairro
                    </label>

                    <input
                      value={formulario.bairro}
                      onChange={(e) =>
                        alterarCampo(
                          "bairro",
                          e.target.value
                        )
                      }
                    />

                  </div>


                  <div className="form-group form-wide">

                    <label>
                      Logradouro
                    </label>

                    <input
                      value={formulario.logradouro}
                      onChange={(e) =>
                        alterarCampo(
                          "logradouro",
                          e.target.value
                        )
                      }
                    />

                  </div>


                  <div className="form-group">

                    <label>
                      Número
                    </label>

                    <input
                      value={formulario.numero}
                      onChange={(e) =>
                        alterarCampo(
                          "numero",
                          e.target.value
                        )
                      }
                    />

                  </div>


                  <div className="form-group">

                    <label>
                      Complemento
                    </label>

                    <input
                      value={formulario.complemento}
                      onChange={(e) =>
                        alterarCampo(
                          "complemento",
                          e.target.value
                        )
                      }
                    />

                  </div>

                </div>

              </div>


              <div className="form-section">

                <h3>
                  Plano e tipo de empresa
                </h3>

                <div className="form-grid">

                  <div className="form-group">

                    <label>
                      Plano ID
                    </label>

                    <input
                      type="number"
                      min="0"
                      value={formulario.planoId}
                      onChange={(e) =>
                        alterarCampo(
                          "planoId",
                          Number(e.target.value)
                        )
                      }
                    />

                  </div>


                  <div className="form-group">

                    <label>
                      Tipo de empresa *
                    </label>

                    <select
                      value={formulario.tipoEmpresaId}
                      onChange={(e) =>
                        alterarCampo(
                          "tipoEmpresaId",
                          Number(e.target.value)
                        )
                      }
                      disabled={carregandoTiposEmpresa}
                    >

                      <option value={0}>
                        {carregandoTiposEmpresa
                          ? "Carregando..."
                          : "Selecione o tipo de empresa"}
                      </option>

                      {tiposEmpresa
                        .filter((tipo) => tipo.ativo)
                        .map((tipo) => (

                          <option
                            key={tipo.id}
                            value={tipo.id}
                          >
                            {tipo.nome}
                          </option>

                        ))}

                    </select>

                  </div>

                </div>
              </div>              
              

              <div className="empresa-modal-footer">

                <button
                  type="button"
                  className="empresa-cancel-button"
                  onClick={() =>
                    setModalAberto(false)
                  }
                  disabled={salvando}
                >
                  Cancelar
                </button>


                <button
                  type="submit"
                  className="empresa-primary-button"
                  disabled={salvando}
                >

                  {salvando
                    ? "Salvando..."
                    : empresaSelecionada
                      ? "Salvar alterações"
                      : "Criar empresa"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </section>
  );
}