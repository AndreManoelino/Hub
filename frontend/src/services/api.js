//const API_URL = "http://localhost:5108";
const API_URL =
  import.meta.env.PROD
    ? "https://hub-2-7f8z.onrender.com"
    : "http://localhost:5108";

/* =========================================================
   LOGIN
========================================================= */

export async function fazerLogin(login, senha) {
  const resposta = await fetch(
    `${API_URL}/api/administrador/autenticacao/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        login,
        senha,
      }),
    }
  );

  if (!resposta.ok) {
    const erro = await resposta.json().catch(() => null);

    throw new Error(
      erro?.mensagem ||
        erro?.message ||
        "CPF ou senha inválidos."
    );
  }

  return resposta.json();
}


/* =========================================================
   REQUISIÇÃO EMPRESA
========================================================= */

async function requisicaoEmpresa(url, options = {}) {
  const token = localStorage.getItem("token");

  console.log("REQUISIÇÃO EMPRESA");
  console.log("URL:", `${API_URL}${url}`);
  console.log("TOKEN EXISTE:", !!token);

  const resposta = await fetch(`${API_URL}${url}`, {
    ...options,

    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",

      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),

      ...(options.headers || {}),
    },
  });

  console.log("STATUS EMPRESA:", resposta.status);

  if (!resposta.ok) {
    const erro = await resposta.json().catch(() => null);

    console.error("ERRO API EMPRESA:", erro);

    throw new Error(
      erro?.mensagem ||
        erro?.message ||
        `Erro na requisição. Código: ${resposta.status}`
    );
  }

  if (resposta.status === 204) {
    return null;
  }

  return resposta.json().catch(() => null);
}


/* =========================================================
   LISTAR EMPRESAS
========================================================= */

export async function listarEmpresas() {
  return requisicaoEmpresa(
    "/api/administrador/empresas",
    {
      method: "GET",
    }
  );
}


/* =========================================================
   BUSCAR EMPRESA POR ID
========================================================= */

export async function buscarEmpresaPorId(id) {
  return requisicaoEmpresa(
    `/api/administrador/empresas/${id}`,
    {
      method: "GET",
    }
  );
}


/* =========================================================
   BUSCAR EMPRESA POR DOCUMENTO
========================================================= */

export async function buscarEmpresaPorDocumento(documento) {
  return requisicaoEmpresa(
    `/api/administrador/empresas/documento/${encodeURIComponent(documento)}`,
    {
      method: "GET",
    }
  );
}


/* =========================================================
   CRIAR EMPRESA
========================================================= */

export async function criarEmpresa(dados) {
  return requisicaoEmpresa(
    "/api/administrador/empresas",
    {
      method: "POST",
      body: JSON.stringify(dados),
    }
  );
}


/* =========================================================
   ATUALIZAR EMPRESA
========================================================= */

export async function atualizarEmpresa(id, dados) {
  return requisicaoEmpresa(
    `/api/administrador/empresas/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(dados),
    }
  );
}


/* =========================================================
   DESATIVAR EMPRESA
========================================================= */

export async function desativarEmpresa(id) {
  return requisicaoEmpresa(
    `/api/administrador/empresas/${id}/desativar`,
    {
      method: "PATCH",
    }
  );
}


/* =========================================================
   ATIVAR EMPRESA
========================================================= */

export async function ativarEmpresa(id) {
  return requisicaoEmpresa(
    `/api/administrador/empresas/${id}/ativar`,
    {
      method: "PATCH",
    }
  );
}
/* =========================================================
   USUÁRIOS
========================================================= */

/* =========================================================
   REQUISIÇÃO USUÁRIO
========================================================= */

async function requisicaoUsuario(url, options = {}) {
  const token = localStorage.getItem("token");

  const resposta = await fetch(`${API_URL}${url}`, {
    ...options,

    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",

      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),

      ...(options.headers || {}),
    },
  });

  if (!resposta.ok) {
    const erro = await resposta.json().catch(() => null);

    throw new Error(
      erro?.mensagem ||
        erro?.message ||
        `Erro na requisição. Código: ${resposta.status}`
    );
  }

  if (resposta.status === 204) {
    return null;
  }

  return resposta.json().catch(() => null);
}


/* =========================================================
   LISTAR TODOS OS USUÁRIOS
   GET /api/Usuario
========================================================= */

export async function listarUsuarios() {
  return requisicaoUsuario(
    "/api/Usuario",
    {
      method: "GET",
    }
  );
}


/* =========================================================
   BUSCAR USUÁRIO POR ID
   GET /api/Usuario/{id}
========================================================= */

export async function buscarUsuarioPorId(id) {
  return requisicaoUsuario(
    `/api/Usuario/${id}`,
    {
      method: "GET",
    }
  );
}


/* =========================================================
   LISTAR USUÁRIOS POR EMPRESA
   GET /api/Usuario/empresa/{empresaId}
========================================================= */

export async function listarUsuariosPorEmpresa(empresaId) {
  return requisicaoUsuario(
    `/api/Usuario/empresa/${empresaId}`,
    {
      method: "GET",
    }
  );
}


/* =========================================================
   CRIAR USUÁRIO
   POST /api/Usuario
========================================================= */

export async function criarUsuario(dados) {
  return requisicaoUsuario(
    "/api/Usuario",
    {
      method: "POST",
      body: JSON.stringify(dados),
    }
  );
}


/* =========================================================
   ATUALIZAR USUÁRIO
   PUT /api/Usuario/{id}
========================================================= */

export async function atualizarUsuario(id, dados) {
  return requisicaoUsuario(
    `/api/Usuario/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(dados),
    }
  );
}


/* =========================================================
   DESATIVAR USUÁRIO
   PATCH /api/Usuario/{id}/desativar
========================================================= */

export async function desativarUsuario(id) {
  return requisicaoUsuario(
    `/api/Usuario/${id}/desativar`,
    {
      method: "PATCH",
    }
  );
}


/* =========================================================
   ATIVAR USUÁRIO
   PATCH /api/Usuario/{id}/ativar
========================================================= */

export async function ativarUsuario(id) {
  return requisicaoUsuario(
    `/api/Usuario/${id}/ativar`,
    {
      method: "PATCH",
    }
  );
}
