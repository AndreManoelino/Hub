import { useEffect, useState } from 'react'
import './Home.css'

function App() {
  const [temaEscuro, setTemaEscuro] = useState(true)

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      temaEscuro ? 'dark' : 'light'
    )
  }, [temaEscuro])

  return (
    <main className="site">

      {/* =========================================================
          NAVBAR
      ========================================================= */}

      <header className="navbar">

        <div className="navbar-inner">

          <a href="#inicio" className="logo">

            <span className="logo-mark">
              C
            </span>

            <span className="logo-name">
              Controll<span>Hub</span>
            </span>

          </a>


          <nav className="nav-links">

            <a href="#recursos">
              Recursos
            </a>

            <a href="#como-funciona">
              Como funciona
            </a>

            <a href="#clientes">
              Clientes
            </a>

            <a href="#planos">
              Planos
            </a>

            <a href="#sobre">
              Sobre
            </a>

          </nav>


          <div className="nav-actions">

            <a
              href="/login"
              className="login-link"
            >
              Entrar
            </a>


            <button
              type="button"
              className="theme-switch"
              onClick={() =>
                setTemaEscuro((valor) => !valor)
              }
              aria-label="Alternar tema"
            >

              <span className="theme-icon">
                {temaEscuro ? '☾' : '☀'}
              </span>

              <span className="theme-toggle">
                <span className="theme-toggle-ball"></span>
              </span>

            </button>


            

          </div>

        </div>

      </header>


      {/* =========================================================
          HERO
      ========================================================= */}

      <section
        id="inicio"
        className="hero-section"
      >

        <div className="hero-image">
         <img
            src="/imagens/fundo.png"
            alt="Dashboard de gestão empresarial do ControllHub"
          />
        </div>

        <div className="hero-overlay"></div>


        <div className="hero-content">

          <div className="hero-copy">

            <span className="eyebrow">
              GESTÃO INTELIGENTE PARA EMPRESAS
            </span>


            <h1>

              Sua empresa.
              <br />

              <span>
                Mais organizada.
              </span>

            </h1>


            <p className="hero-description">

              O ControllHub centraliza a gestão da sua empresa em uma única
              plataforma. Cadastros, pessoas, financeiro, clientes,
              produtos, estoque, operações e muito mais, tudo conectado.

            </p>


            <div className="hero-actions">

             


              <a
                href="#recursos"
                className="button button-glass button-large"
              >
                Conhecer o ControllHub
              </a>

            </div>


            <div className="hero-features">

              <span>
                Gestão
              </span>

              <i></i>

              <span>
                Financeiro
              </span>

              <i></i>

              <span>
                Clientes
              </span>

              <i></i>

              <span>
                Operação
              </span>

            </div>

          </div>


          <div className="hero-side">

            <div className="hero-stat stat-top">

              <div>

                <span>
                  Operações organizadas
                </span>

                <strong>
                  100%
                </strong>

                <small>
                  Tudo em um único ambiente
                </small>

              </div>


              <div className="mini-chart">

                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>

              </div>

            </div>


            <div className="hero-stat stat-bottom">

              <div>

                <span>
                  Controle financeiro
                </span>

                <strong>
                  R$ 48.720
                </strong>

                <small>
                  Exemplo demonstrativo
                </small>

              </div>


              <div className="bars">

                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          NUMBERS
      ========================================================= */}

      <section className="numbers-section">

        <div className="numbers-grid">

          <div className="number-item">

            <strong>
              01
            </strong>

            <span>
              Plataforma completa
            </span>

          </div>


          <div className="number-item">

            <strong>
              24h
            </strong>

            <span>
              Acesso ao sistema
            </span>

          </div>


          <div className="number-item">

            <strong>
              100%
            </strong>

            <span>
              Gestão online
            </span>

          </div>


          <div className="number-item">

            <strong>
              30 dias
            </strong>

            <span>
              Período inicial
            </span>

          </div>

        </div>

      </section>


      {/* =========================================================
          RECURSOS
      ========================================================= */}

      <section
        id="recursos"
        className="section resources-section"
      >

        <div className="section-container">

          <div className="section-heading">

            <div>

              <span className="eyebrow">
                TUDO CONECTADO
              </span>


              <h2>

                Uma plataforma criada
                <br />

                para a rotina da sua empresa.

              </h2>

            </div>


            <p>

              O ControllHub reúne as principais áreas da empresa em uma
              experiência simples para proprietários, gestores, funcionários
              e clientes.

            </p>

          </div>


          <div className="resources-layout">


            <article className="feature-card feature-training">

              <div className="feature-photo">

                <img
                src="/imagens/fundo.png"
                alt="Dashboard de gestão empresarial do ControllHub"
              />
              </div>


              <div className="feature-info">

                <span className="resource-number">
                  01
                </span>


                <h3>
                  Gestão centralizada
                </h3>


                <p>

                  Organize as principais informações da sua empresa em um
                  único ambiente, com acesso rápido aos dados que realmente
                  importam para sua operação.

                </p>

              </div>

            </article>


            <article className="resource-card">

              <span className="resource-number">
                02
              </span>


              <h3>
                Clientes
              </h3>


              <p>

                Cadastre clientes, acompanhe informações, histórico,
                relacionamento e tudo que sua equipe precisa para prestar
                um atendimento melhor.

              </p>

            </article>


            <article className="resource-card resource-dark">

              <span className="resource-number">
                03
              </span>


              <h3>
                Financeiro
              </h3>


              <p>

                Acompanhe receitas, despesas, pagamentos, movimentações,
                valores pendentes e informações importantes para a saúde
                financeira do negócio.

              </p>

            </article>


            <article className="resource-card">

              <span className="resource-number">
                04
              </span>


              <h3>
                Produtos e estoque
              </h3>


              <p>

                Controle produtos, entradas, saídas, compras e estoque
                para evitar perdas e manter sua operação organizada.

              </p>

            </article>


            <article className="resource-card">

              <span className="resource-number">
                05
              </span>


              <h3>
                Equipe
              </h3>


              <p>

                Cadastre funcionários e defina os níveis de acesso para
                que cada pessoa visualize somente aquilo que precisa.

              </p>

            </article>


            <article className="feature-card communication-card">

              <div className="communication-photo">

                <img
                  src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=85"
                  alt="Equipe de uma empresa trabalhando"
                />

              </div>


              <div className="communication-content">

                <span className="resource-number">
                  06
                </span>


                <h3>
                  Comunicação e operação
                </h3>


                <p>

                  Mantenha sua equipe alinhada, registre informações
                  importantes e acompanhe a operação de forma organizada.

                </p>

              </div>

            </article>

          </div>

        </div>

      </section>


      {/* =========================================================
          COMO FUNCIONA
      ========================================================= */}

      <section
        id="como-funciona"
        className="section workflow-section"
      >

        <div className="workflow-container">


          <div className="workflow-image">

            <img
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1400&q=85"
              alt="Equipe trabalhando em uma empresa"
            />


            <div className="image-overlay-card">

              <span>
                CONTROLLHUB
              </span>


              <strong>

                Da empresa
                <br />

                à operação.

              </strong>

            </div>

          </div>


          <div className="workflow-content">

            <span className="eyebrow">
              DA EMPRESA À OPERAÇÃO
            </span>


            <h2>

              A gestão começa
              <br />

              antes da operação.

            </h2>


            <p>

              Cadastre sua empresa, organize sua equipe e tenha uma visão
              centralizada das informações necessárias para administrar
              seu negócio.

            </p>


            <div className="steps">


              <div className="step active">

                <span>
                  01
                </span>


                <div>

                  <h3>
                    Cadastro
                  </h3>


                  <p>

                    Cadastre sua empresa e mantenha suas informações
                    organizadas desde o primeiro acesso.

                  </p>

                </div>

              </div>


              <div className="step">

                <span>
                  02
                </span>


                <div>

                  <h3>
                    Equipe
                  </h3>


                  <p>

                    Adicione os usuários e defina os níveis de acesso
                    de cada pessoa.

                  </p>

                </div>

              </div>


              <div className="step">

                <span>
                  03
                </span>


                <div>

                  <h3>
                    Operação
                  </h3>


                  <p>

                    Organize clientes, produtos, serviços, estoque,
                    financeiro e os demais processos.

                  </p>

                </div>

              </div>


              <div className="step">

                <span>
                  04
                </span>


                <div>

                  <h3>
                    Acompanhamento
                  </h3>


                  <p>

                    Tenha uma visão mais clara do negócio e acompanhe
                    o que está acontecendo em um só lugar.

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          SEGMENTOS
      ========================================================= */}

      <section className="section permissions-section">

        <div className="section-container">

          <div className="section-heading centered">

            <span className="eyebrow">
              DIFERENTES NEGÓCIOS
            </span>


            <h2>

              Um sistema que acompanha
              <br />

              a realidade da sua empresa.

            </h2>


            <p>

              O ControllHub foi pensado para ser flexível. Cada negócio
              possui uma rotina diferente e a plataforma pode organizar
              diferentes áreas e perfis de operação.

            </p>

          </div>


          <div className="permission-grid">


            <article className="permission-card owner">

              <span>
                01
              </span>


              <h3>
                Comércio
              </h3>


              <ul>

                <li>
                  Clientes
                </li>

                <li>
                  Produtos
                </li>

                <li>
                  Estoque
                </li>

                <li>
                  Compras
                </li>

                <li>
                  Financeiro
                </li>

                <li>
                  Equipe
                </li>

              </ul>

            </article>


            <article className="permission-card">

              <span>
                02
              </span>


              <h3>
                Serviços
              </h3>


              <ul>

                <li>
                  Clientes
                </li>

                <li>
                  Profissionais
                </li>

                <li>
                  Agenda
                </li>

                <li>
                  Serviços
                </li>

                <li>
                  Pagamentos
                </li>

              </ul>

            </article>


            <article className="permission-card">

              <span>
                03
              </span>


              <h3>
                Academias
              </h3>


              <ul>

                <li>
                  Alunos
                </li>

                <li>
                  Professores
                </li>

                <li>
                  Treinos
                </li>

                <li>
                  Avaliações
                </li>

                <li>
                  Mensalidades
                </li>

              </ul>

            </article>

          </div>

        </div>

      </section>


      {/* =========================================================
          EMPRESA DEMONSTRATIVA
      ========================================================= */}

      <section className="showcase-section">

        <div className="showcase-container">


          <div className="showcase-copy">

            <span className="eyebrow">
              EXEMPLO DE OPERAÇÃO
            </span>


            <h2>

              A empresa continua sendo
              <br />

              dela. A gestão fica mais simples.

            </h2>


            <p>

              Imagine uma empresa como a Eldora hoje temos alguns de seus revendedores melhorando seus processos  utilizando o ControllHub
              para centralizar clientes, equipe, produtos, estoque,
              financeiro e informações da operação. O ControllHub veio para melhorar essa interação fornecedor cliente com uma abordagem super leve otimizando tempo e dinheiro.

            </p>


            <div className="showcase-list">


              <div>

                <strong>
                  01
                </strong>

                <span>
                  Cadastro da empresa
                </span>

              </div>


              <div>

                <strong>
                  02
                </strong>

                <span>
                  Clientes e equipe
                </span>

              </div>


              <div>

                <strong>
                  03
                </strong>

                <span>
                  Produtos e estoque
                </span>

              </div>


              <div>

                <strong>
                  04
                </strong>

                <span>
                  Financeiro e operação
                </span>

              </div>

            </div>

          </div>


          <div className="showcase-image">

            <img
              src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1400&q=85"
              alt="Equipe em ambiente empresarial"
            />

          </div>

        </div>

      </section>


      {/* =========================================================
          CLIENTES / DEPOIMENTOS
      ========================================================= */}

      <section
        id="clientes"
        className="section resources-section"
      >

        <div className="section-container">


          <div className="section-heading centered">

            <span className="eyebrow">
              EXPERIÊNCIA DOS CLIENTES
            </span>


            <h2>

              Gestão pensada para
              <br />

              quem está no dia a dia.

            </h2>


            <p>

              Veja exemplos de como diferentes tipos de negócios podem
              utilizar o ControllHub para organizar suas operações.

            </p>

          </div>


          <div className="resources-layout">


            {/* ANA */}

            <article className="feature-card feature-training">

              <div className="feature-photo">

                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=85"
                  alt="Ana Carolina - imagem demonstrativa"
                />

              </div>


              <div className="feature-info">

                <span className="resource-number">
                  01
                </span>


                <h3>
                  Ana Carolina
                </h3>


                <p>

                  “O que eu mais gostei foi conseguir reunir as informações
                  da empresa em um único lugar. A equipe consegue trabalhar
                  melhor e eu consigo acompanhar a operação com muito mais
                  clareza.”

                </p>


                <small>
                  Proprietária de empresa de serviços — exemplo demonstrativo
                </small>

              </div>

            </article>


            {/* ELDORA */}

            <article className="resource-card">

              <span className="resource-number">
                02
              </span>


              <h3>
                Eldora
              </h3>


              <p>

                Exemplo de empresa que pode utilizar o ControllHub para
                acompanhar clientes, equipe, produtos, estoque e financeiro
                em uma única plataforma.

              </p>


              <strong>
                Operação demonstrativa
              </strong>

            </article>


            {/* ACADEMIA */}

            <article className="resource-card resource-dark">

              <span className="resource-number">
                03
              </span>


              <h3>
                Studio Prime Fitness
              </h3>


              <p>

                Uma academia fictícia utilizando o ControllHub para
                organizar alunos, professores, treinos, avaliações,
                mensalidades e rotina financeira.

              </p>


              <strong>
                Empresa fictícia para demonstração
              </strong>

            </article>


            {/* SEGUNDO DEPOIMENTO */}

            <article className="resource-card">

              <span className="resource-number">
                04
              </span>


              <h3>
                Organização
              </h3>


              <p>

                “Quando as informações ficam espalhadas, administrar o
                negócio fica mais difícil. A proposta do ControllHub é
                justamente colocar tudo em um só lugar.”

              </p>


              <strong>
                Depoimento demonstrativo
              </strong>

            </article>


            {/* TERCEIRO */}

            <article className="resource-card">

              <span className="resource-number">
                05
              </span>


              <h3>
                Controle
              </h3>


              <p>

                “Ter diferentes níveis de acesso ajuda muito, porque cada
                funcionário consegue trabalhar com as informações que
                realmente precisa.”

              </p>


              <strong>
                Depoimento demonstrativo
              </strong>

            </article>


            {/* FOTO CLIENTE */}

            <article className="feature-card communication-card">

              <div className="communication-photo">

                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85"
                  alt="Empreendedora - imagem demonstrativa"
                />

              </div>


              <div className="communication-content">

                <span className="resource-number">
                  06
                </span>


                <h3>
                  Espaço para seus clientes
                </h3>


                <p>

                  Aqui você pode colocar posteriormente as fotos reais
                  dos clientes que utilizarem o ControllHub e seus
                  respectivos depoimentos.

                </p>

              </div>

            </article>

          </div>

        </div>

      </section>


      {/* =========================================================
          GALERIA DE CLIENTES
      ========================================================= */}

      <section className="section workflow-section">

        <div className="section-container">


          <div className="section-heading centered">

            <span className="eyebrow">
              HISTÓRIAS REAIS
            </span>


            <h2>

              Coloque aqui as pessoas
              <br />

              que confiam no seu sistema.

            </h2>


            <p>

              Quando você tiver as fotos reais dos clientes, basta substituir
              os caminhos abaixo pelas imagens deles.

            </p>

          </div>


          <div className="permission-grid">


            <article className="permission-card owner">

              <img
                src="/imagens/clientes/cliente-01.jpg"
                alt="Cliente do ControllHub"
                style={{
                  width: '100%',
                  height: '260px',
                  objectFit: 'cover',
                  marginBottom: '24px'
                }}
              />


              <span>
                01
              </span>


              <h3>
                Seu cliente
              </h3>


              <p>
                “Seu depoimento real entra aqui.”
              </p>

            </article>


            <article className="permission-card">

              <img
                src="/imagens/clientes/cliente-02.jpg"
                alt="Cliente do ControllHub"
                style={{
                  width: '100%',
                  height: '260px',
                  objectFit: 'cover',
                  marginBottom: '24px'
                }}
              />


              <span>
                02
              </span>


              <h3>
                Seu cliente
              </h3>


              <p>
                “Seu depoimento real entra aqui.”
              </p>

            </article>


            <article className="permission-card">

              <img
                src="/imagens/clientes/cliente-03.jpg"
                alt="Cliente do ControllHub"
                style={{
                  width: '100%',
                  height: '260px',
                  objectFit: 'cover',
                  marginBottom: '24px'
                }}
              />


              <span>
                03
              </span>


              <h3>
                Seu cliente
              </h3>


              <p>
                “Seu depoimento real entra aqui.”
              </p>

            </article>

          </div>

        </div>

      </section>


      {/* =========================================================
          PLANOS
      ========================================================= */}

      <section
        id="planos"
        className="section pricing-section"
      >

        <div className="section-container">


          <div className="section-heading centered">

            <span className="eyebrow">
              PLANOS
            </span>


            <h2>

              Escolha o tamanho
              <br />

              da sua operação.

            </h2>


            <p>

              Comece com uma estrutura simples e evolua conforme sua
              empresa cresce.

            </p>

          </div>


          <div className="pricing-grid">


            <article className="pricing-card">

              <span className="plan-name">
                Essencial
              </span>


              <h3>

                R$ 99
                <small>
                  /mês
                </small>

              </h3>


              <p>

                Para pequenas empresas que estão começando a organizar
                sua operação.

              </p>


              <div className="plan-divider"></div>


              <ul>

                <li>
                  Cadastro de empresas
                </li>

                <li>
                  Clientes
                </li>

                <li>
                  Controle de equipe
                </li>

                <li>
                  Operação
                </li>

                <li>
                  Financeiro
                </li>

              </ul>


              <a
                href="#cadastro"
                className="button button-outline"
              >
                Começar
              </a>

            </article>


            <article className="pricing-card featured-plan">

              <span className="featured-label">
                MAIS COMPLETO
              </span>


              <span className="plan-name">
                Profissional
              </span>


              <h3>

                R$ 149

                <small>
                  /mês
                </small>

              </h3>


              <p>

                Para empresas que querem centralizar toda a gestão.

              </p>


              <div className="plan-divider"></div>


              <ul>

                <li>
                  Tudo do plano Essencial
                </li>

                <li>
                  Produtos e estoque
                </li>

                <li>
                  Relatórios
                </li>

                <li>
                  Controle financeiro
                </li>

                <li>
                  Mais usuários
                </li>

                <li>
                  Recursos avançados
                </li>

              </ul>


              
            </article>


            <article className="pricing-card">

              <span className="plan-name">
                Personalizado
              </span>


              <h3>
                Sob consulta
              </h3>


              <p>

                Para operações maiores que precisam de uma estrutura
                específica.

              </p>


              <div className="plan-divider"></div>


              <ul>

                <li>
                  Estrutura personalizada
                </li>

                <li>
                  Mais usuários
                </li>

                <li>
                  Mais unidades
                </li>

                <li>
                  Recursos avançados
                </li>

                <li>
                  Atendimento dedicado
                </li>

              </ul>


              <a
                href="#contato"
                className="button button-outline"
              >
                Falar conosco
              </a>

            </article>

          </div>


          <div className="trial-banner">

            <div>

              <span className="eyebrow">
                EXPERIMENTE
              </span>


              <h3>
                                       EQC 30 dias para conhecer o ControllHub.
              </h3>


              <p>
                Entre em contato com o nosso time, iremos expor todas as nossas funcionalidades do sistemas, a e tem coisas muito boa você pode sempre estar enviando melhorias que gostaria no sistema
                . Sendp assim tornando uma experiência mais agradavel.

              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          SOBRE
      ========================================================= */}

      <section
        id="sobre"
        className="section about-section"
      >

        <div className="about-container">


          <div>
           


            <h2>

              Tecnologia para quem
              <br />

              vive a rotina de uma empresa.

            </h2>

          </div>


          <div className="about-text">

            <p>

              O ControllHub nasceu com o objetivo de simplificar a gestão
              empresarial, conectando pessoas, processos, clientes,
              financeiro e operação em uma única experiência.

            </p>


            <p>

              A plataforma foi pensada para crescer junto com o negócio,
              permitindo novas funcionalidades, diferentes segmentos,
              novas unidades e diferentes perfis de acesso sem perder
              o controle da operação.

            </p>


            <p>

              A ideia é simples: deixar a empresa trabalhar enquanto o
              gestor tem uma visão mais clara do que está acontecendo.

            </p>

          </div>

        </div>

      </section>


      {/* =========================================================
          CADASTRO / CTA
      ========================================================= */}

      <section
        id="cadastro"
        className="cta-section"
      >

        <div className="cta-container">

          <span className="eyebrow">
            COMECE AGORA
          </span>


          <h2>

            Pronto para colocar
            <br />

            sua empresa em ordem?

          </h2>


          <p>

            Cadastre sua empresa e comece a experimentar o ControllHub.

          </p>


          

        </div>

      </section>


      {/* =========================================================
          CONTATO
      ========================================================= */}

      <section
        id="contato"
        className="section about-section"
      >

        <div className="about-container">


          <div>

            <span className="eyebrow">
              CONTATO
            </span>


            <h2>

              Vamos conversar sobre
              <br />

              a sua empresa.

            </h2>

          </div>


          <div className="about-text">

            <p>

              Quer conhecer o ControllHub, tirar dúvidas ou conversar
              sobre uma estrutura personalizada para sua empresa?

            </p>


            <p>

              <strong>
                Proprietário: Andre Manoelino
              </strong>

            </p>


            <p>

              WhatsApp:
              <br />

              <a
                href="https://wa.me/5531991070255"
                target="_blank"
                rel="noreferrer"
              >
                (31) 99107-0255
              </a>

            </p>


            <p>

              E-mails:
              <br />

              <a href="mailto:andremanoelino@outlook.com">
                andremanoelino@outlook.com
              </a>

              <br />

              <a href="mailto:agmphandre@gmail.com">
                agmphandre@gmail.com
              </a>

            </p>

          </div>

        </div>

      </section>


      {/* =========================================================
          FOOTER
      ========================================================= */}

      <footer className="footer">

        <div className="footer-container">


          <div className="footer-brand">

            <a
              href="#inicio"
              className="logo"
            >

              <span className="logo-mark">
                C
              </span>


              <span className="logo-name">

                Controll<span>
                  Hub
                </span>

              </span>

            </a>


            <p>
              Gestão inteligente para empresas.
            </p>


            <p>
              Proprietário: Andre Manoelino
            </p>

          </div>


          <div className="footer-links">


            <div>

              <strong>
                Produto
              </strong>


              <a href="#recursos">
                Recursos
              </a>


              <a href="#planos">
                Planos
              </a>


              <a href="#como-funciona">
                Como funciona
              </a>


              <a href="/login">
                Entrar
              </a>

            </div>


            <div>

              <strong>
                Empresa
              </strong>


              <a href="#sobre">
                Sobre
              </a>


              <a href="#clientes">
                Clientes
              </a>


              <a href="#contato">
                Contato
              </a>

            </div>


            <div>

              <strong>
                Contato
              </strong>


              <a
                href="https://wa.me/5531991070255"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>


              <a href="mailto:andremanoelino@outlook.com">
                E-mail
              </a>


              <a href="mailto:agmphandre@gmail.com">
                E-mail alternativo
              </a>

            </div>

          </div>

        </div>


        <div className="footer-bottom">

          <span>
            © 2026 ControllHub. Todos os direitos reservados.
          </span>


          <span>
            Gestão inteligente para empresas.
          </span>

        </div>

      </footer>

    </main>
  )
}

export default App