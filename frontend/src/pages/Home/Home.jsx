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

      <header className="navbar">
        <div className="navbar-inner">

          <a href="#inicio" className="logo">
            <span className="logo-mark">C</span>
            <span className="logo-name">Controll<span>Hub</span></span>
          </a>

          <nav className="nav-links">
            <a href="#recursos">Recursos</a>
            <a href="#como-funciona">Como funciona</a>
            <a href="#planos">Planos</a>
            <a href="#sobre">Sobre</a>
          </nav>

          <div className="nav-actions">

            <a href="/login" className="login-link">
              Entrar
            </a>

            <button
              type="button"
              className="theme-switch"
              onClick={() => setTemaEscuro((valor) => !valor)}
              aria-label="Alternar tema"
            >
              <span className="theme-icon">
                {temaEscuro ? '☾' : '☀'}
              </span>

              <span className="theme-toggle">
                <span className="theme-toggle-ball"></span>
              </span>
            </button>

            <a href="#planos" className="button button-primary">
              Começar agora
            </a>

          </div>

        </div>
      </header>


      <section id="inicio" className="hero-section">

        <div className="hero-image"></div>

        <div className="hero-overlay"></div>

        <div className="hero-content">

          <div className="hero-copy">

            <span className="eyebrow">
              GESTÃO INTELIGENTE PARA ACADEMIAS
            </span>

            <h1>
              Sua academia.
              <br />
              <span>Mais organizada.</span>
            </h1>

            <p className="hero-description">
              Uma plataforma completa para administrar alunos, professores,
              treinos, avaliações, pagamentos e toda a operação da sua
              academia em um único lugar.
            </p>

            <div className="hero-actions">

              <a
                href="#planos"
                className="button button-primary button-large"
              >
                Conhecer os planos
              </a>

              <a
                href="#recursos"
                className="button button-glass button-large"
              >
                Conhecer o sistema
              </a>

            </div>

            <div className="hero-features">
              <span>Gestão</span>
              <i></i>
              <span>Treinos</span>
              <i></i>
              <span>Financeiro</span>
              <i></i>
              <span>Alunos</span>
            </div>

          </div>


          <div className="hero-side">

            <div className="hero-stat stat-top">

              <div>
                <span>Alunos ativos</span>
                <strong>1.248</strong>
                <small>+12,8% este mês</small>
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
                <span>Receita mensal</span>
                <strong>R$ 48.720</strong>
                <small>Pagamentos atualizados</small>
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


      <section className="numbers-section">

        <div className="numbers-grid">

          <div className="number-item">
            <strong>01</strong>
            <span>Plataforma completa</span>
          </div>

          <div className="number-item">
            <strong>24h</strong>
            <span>Acesso ao sistema</span>
          </div>

          <div className="number-item">
            <strong>100%</strong>
            <span>Gestão online</span>
          </div>

          <div className="number-item">
            <strong>30 dias</strong>
            <span>Período inicial</span>
          </div>

        </div>

      </section>


      <section id="recursos" className="section resources-section">

        <div className="section-container">

          <div className="section-heading">

            <div>
              <span className="eyebrow">
                TUDO CONECTADO
              </span>

              <h2>
                Uma plataforma criada
                <br />
                para a rotina da sua academia.
              </h2>
            </div>

            <p>
              O ControllHub reúne as principais áreas da academia em uma
              experiência simples para gestores, profissionais e alunos.
            </p>

          </div>


          <div className="resources-layout">

            <article className="feature-card feature-training">

              <div className="feature-photo">
                <img
                  src="/imagens/treino.jpeg"
                  alt="Treino em academia"
                />
              </div>

              <div className="feature-info">

                <span className="resource-number">01</span>

                <h3>
                  Treinos personalizados
                </h3>

                <p>
                  Crie fichas de treino de acordo com os objetivos do aluno,
                  equipamentos disponíveis, tempo de sessão e orientação
                  profissional.
                </p>

              </div>

            </article>


            <article className="resource-card">
            
              <span className="resource-number">02</span>

              <h3>Alunos</h3>

              <p>
                Cadastro completo, histórico, informações pessoais,
                acompanhamento e relacionamento com cada aluno.
              </p>

            </article>


            <article className="resource-card resource-dark">

              <span className="resource-number">03</span>

              <h3>Avaliações</h3>

              <p>
                Registre avaliações físicas, observações profissionais e
                histórico de evolução do aluno.
              </p>

            </article>


            <article className="resource-card">

              <span className="resource-number">04</span>

              <h3>Financeiro</h3>

              <p>
                Controle mensalidades, recebimentos, pagamentos pendentes,
                planos e movimentações financeiras.
              </p>

            </article>


            <article className="resource-card">

              <span className="resource-number">05</span>

              <h3>Equipe</h3>

              <p>
                Defina os profissionais da academia e controle exatamente
                o que cada pessoa pode visualizar e administrar.
              </p>

            </article>


            <article className="feature-card communication-card">

              <div className="communication-photo">
                <img
                  src="/imagens/academia-hero.jpeg"
                  alt="Interior de academia"
                />
              </div>

              <div className="communication-content">

                <span className="resource-number">06</span>

                <h3>
                  Comunicação com os alunos
                </h3>

                <p>
                  Publique avisos sobre feriados, manutenção, mudanças de
                  horário, eventos e novidades diretamente para seus alunos.
                </p>

              </div>

            </article>

          </div>

        </div>

      </section>


      <section id="como-funciona" className="section workflow-section">

        <div className="workflow-container">

          <div className="workflow-image">

            <img
              src="/imagens/academia-hero.jpeg"
              alt="Academia"
            />

            <div className="image-overlay-card">

              <span>CONTROLLHUB</span>

              <strong>
                Do cadastro
                <br />
                ao treino.
              </strong>

            </div>

          </div>


          <div className="workflow-content">

            <span className="eyebrow">
              DO CADASTRO AO TREINO
            </span>

            <h2>
              A experiência começa
              <br />
              antes do primeiro treino.
            </h2>

            <p>
              O aluno recebe um link personalizado da academia e pode
              realizar seu cadastro, solicitar uma avaliação e acompanhar
              toda sua jornada.
            </p>


            <div className="steps">

              <div className="step active">

                <span>01</span>

                <div>
                  <h3>Cadastro</h3>

                  <p>
                    O aluno informa seus dados e inicia seu relacionamento
                    com a academia.
                  </p>
                </div>

              </div>


              <div className="step">

                <span>02</span>

                <div>
                  <h3>Avaliação</h3>

                  <p>
                    O profissional registra informações e cria o histórico
                    de acompanhamento.
                  </p>
                </div>

              </div>


              <div className="step">

                <span>03</span>

                <div>
                  <h3>Treino</h3>

                  <p>
                    A ficha é criada de acordo com os objetivos e
                    necessidades do aluno.
                  </p>
                </div>

              </div>


              <div className="step">

                <span>04</span>

                <div>
                  <h3>Acompanhamento</h3>

                  <p>
                    O aluno acompanha sua evolução enquanto a equipe mantém
                    todo o histórico organizado.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      <section className="section permissions-section">

        <div className="section-container">

          <div className="section-heading centered">

            <span className="eyebrow">
              CONTROLE DE ACESSO
            </span>

            <h2>
              Cada pessoa vê
              <br />
              somente o que precisa.
            </h2>

            <p>
              O proprietário controla os acessos da equipe e define quais
              áreas estarão disponíveis para cada profissional.
            </p>

          </div>


          <div className="permission-grid">

            <article className="permission-card owner">

              <span>01</span>

              <h3>Proprietário</h3>

              <ul>
                <li>Visão completa da academia</li>
                <li>Financeiro</li>
                <li>Equipe</li>
                <li>Alunos</li>
                <li>Treinos</li>
                <li>Configurações</li>
              </ul>

            </article>


            <article className="permission-card">

              <span>02</span>

              <h3>Profissional</h3>

              <ul>
                <li>Alunos vinculados</li>
                <li>Avaliações</li>
                <li>Treinos</li>
                <li>Histórico</li>
                <li>Agenda</li>
              </ul>

            </article>


            <article className="permission-card">

              <span>03</span>

              <h3>Aluno</h3>

              <ul>
                <li>Meu cadastro</li>
                <li>Meus treinos</li>
                <li>Minhas avaliações</li>
                <li>Minha agenda</li>
                <li>Mensalidades</li>
              </ul>

            </article>

          </div>

        </div>

      </section>


      <section className="showcase-section">

        <div className="showcase-container">

          <div className="showcase-copy">

            <span className="eyebrow">
              A ACADEMIA NO SEU ESTILO
            </span>

            <h2>
              Sua marca também
              <br />
              faz parte da experiência.
            </h2>

            <p>
              Cada academia poderá personalizar sua experiência com logo,
              imagens, informações e conteúdos próprios.
            </p>


            <div className="showcase-list">

              <div>
                <strong>01</strong>
                <span>Logo da academia</span>
              </div>

              <div>
                <strong>02</strong>
                <span>Imagem de apresentação</span>
              </div>

              <div>
                <strong>03</strong>
                <span>Vídeos e conteúdos</span>
              </div>

              <div>
                <strong>04</strong>
                <span>Avisos e comunicados</span>
              </div>

            </div>

          </div>


          <div className="showcase-image">

            <img
              src="/imagens/academia-hero.jpeg"
              alt="Academia personalizada"
            />

          </div>

        </div>

      </section>


      <section id="planos" className="section pricing-section">

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
              academia cresce.
            </p>

          </div>


          <div className="pricing-grid">

            <article className="pricing-card">

              <span className="plan-name">
                Essencial
              </span>

              <h3>
                R$ 99
                <small>/mês</small>
              </h3>

              <p>
                Para academias que estão começando a organizar sua operação.
              </p>

              <div className="plan-divider"></div>

              <ul>
                <li>Cadastro de alunos</li>
                <li>Controle de equipe</li>
                <li>Agenda</li>
                <li>Mensalidades</li>
                <li>Comunicação</li>
              </ul>

              <a href="#cadastro" className="button button-outline">
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
                <small>/mês</small>
              </h3>

              <p>
                Para academias que querem centralizar toda a gestão.
              </p>

              <div className="plan-divider"></div>

              <ul>
                <li>Tudo do plano Essencial</li>
                <li>Avaliações físicas</li>
                <li>Fichas de treino</li>
                <li>Histórico de alunos</li>
                <li>Relatórios</li>
                <li>Controle financeiro</li>
              </ul>

              <a href="#cadastro" className="button button-primary">
                Começar agora
              </a>

            </article>


            <article className="pricing-card">

              <span className="plan-name">
                Personalizado
              </span>

              <h3>
                Sob consulta
              </h3>

              <p>
                Para operações maiores que precisam de recursos específicos.
              </p>

              <div className="plan-divider"></div>

              <ul>
                <li>Estrutura personalizada</li>
                <li>Mais usuários</li>
                <li>Mais unidades</li>
                <li>Recursos avançados</li>
                <li>Atendimento dedicado</li>
              </ul>

              <a href="#contato" className="button button-outline">
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
                30 dias para conhecer o ControllHub.
              </h3>

              <p>
                Cadastre sua academia e descubra como organizar sua operação
                em uma única plataforma.
              </p>

            </div>

            <a
              href="#cadastro"
              className="button button-primary button-large"
            >
              Criar minha academia
            </a>

          </div>

        </div>

      </section>


      <section id="sobre" className="section about-section">

        <div className="about-container">

          <div>

            <span className="eyebrow">
              CONTROLLHUB
            </span>

            <h2>
              Tecnologia para quem
              <br />
              vive a rotina da academia.
            </h2>

          </div>


          <div className="about-text">

            <p>
              O ControllHub nasceu para simplificar a gestão de academias,
              conectando proprietários, profissionais e alunos em uma única
              experiência.
            </p>

            <p>
              A plataforma foi pensada para crescer junto com o negócio,
              permitindo novas funcionalidades, novas unidades e diferentes
              perfis de acesso sem perder o controle da operação.
            </p>

          </div>

        </div>

      </section>


      <section id="cadastro" className="cta-section">

        <div className="cta-container">

          <span className="eyebrow">
            COMECE AGORA
          </span>

          <h2>
            Pronto para colocar
            <br />
            sua academia em ordem?
          </h2>

          <p>
            Crie sua conta, cadastre sua academia e comece a experimentar
            o ControllHub.
          </p>

          <a
            href="#planos"
            className="button button-light button-large"
          >
            Criar minha academia
          </a>

        </div>

      </section>


      <footer className="footer">

        <div className="footer-container">

          <div className="footer-brand">

            <a href="#inicio" className="logo">

              <span className="logo-mark">C</span>

              <span className="logo-name">
                Controll<span>Hub</span>
              </span>

            </a>

            <p>
              Gestão inteligente para academias.
            </p>

          </div>


          <div className="footer-links">

            <div>
              <strong>Produto</strong>
              <a href="#recursos">Recursos</a>
              <a href="#planos">Planos</a>
              <a href="#como-funciona">Como funciona</a>
            </div>

            <div>
              <strong>Empresa</strong>
              <a href="#sobre">Sobre</a>
              <a href="#contato">Contato</a>
              <a href="/login">Entrar</a>
            </div>

          </div>

        </div>


        <div className="footer-bottom">

          <span>
            © 2026 ControllHub. Todos os direitos reservados.
          </span>

          <span>
            Gestão para academias.
          </span>

        </div>

      </footer>

    </main>
  )
}

export default App