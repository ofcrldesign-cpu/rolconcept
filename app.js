/**
 * ROL CONCEPT — Pure Vanilla JavaScript
 * Implementações:
 * 1. Banner Rotativo Hero de 5 segundos com barra de progresso visual e controles
 * 2. Botão Flutuante Voltar ao Topo (Lado Direito da Página)
 * 3. Menu Mobile Drawer Responsivo
 * 4. Filtros de Categorias de Serviços
 * 5. Cópia de Endereço com Toast Notification
 * 6. Modal Interativo de Agendamento com Conexão ao WhatsApp
 * 7. Transições de Cabeçalho e Destaque de Navegação Ativa
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. BANNER ROTATIVO HERO (3 SLIDES - INTERVALO DE 5 SEGUNDOS)
     ========================================================================== */
  const carousel = {
    slides: document.querySelectorAll('.carousel-slide'),
    indicators: document.querySelectorAll('.indicator-tab'),
    counter: document.getElementById('carouselCounter'),
    pauseHint: document.getElementById('carouselPauseHint'),
    prevBtn: document.getElementById('carouselPrevBtn'),
    nextBtn: document.getElementById('carouselNextBtn'),
    wrapper: document.querySelector('.hero-carousel-section'),
    
    currentIndex: 0,
    intervalTime: 5000, // Exatamente 5 segundos por slide
    timer: null,
    isPaused: false,

    init() {
      if (!this.slides.length) return;

      // Eventos dos botões de avançar/voltar
      if (this.prevBtn) {
        this.prevBtn.addEventListener('click', () => {
          this.goTo(this.currentIndex - 1);
          this.resetTimer();
        });
      }

      if (this.nextBtn) {
        this.nextBtn.addEventListener('click', () => {
          this.goTo(this.currentIndex + 1);
          this.resetTimer();
        });
      }

      // Eventos dos indicadores inferiores (abas de progresso)
      this.indicators.forEach((indicator) => {
        indicator.addEventListener('click', () => {
          const targetIndex = parseInt(indicator.getAttribute('data-go-to'), 10);
          if (!isNaN(targetIndex) && targetIndex !== this.currentIndex) {
            this.goTo(targetIndex);
            this.resetTimer();
          }
        });
      });

      // Pausar banner quando o cursor estiver em cima para facilitar leitura
      if (this.wrapper) {
        this.wrapper.addEventListener('mouseenter', () => this.pause());
        this.wrapper.addEventListener('mouseleave', () => this.resume());

        // Suporte a gestos Touch (Swipe) em dispositivos móveis
        let touchStartX = 0;
        let touchEndX = 0;

        this.wrapper.addEventListener('touchstart', (e) => {
          touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        this.wrapper.addEventListener('touchend', (e) => {
          touchEndX = e.changedTouches[0].screenX;
          const swipeThreshold = 50;
          if (touchStartX - touchEndX > swipeThreshold) {
            this.goTo(this.currentIndex + 1); // Swipe para a esquerda -> Próximo
            this.resetTimer();
          } else if (touchEndX - touchStartX > swipeThreshold) {
            this.goTo(this.currentIndex - 1); // Swipe para a direita -> Anterior
            this.resetTimer();
          }
        }, { passive: true });
      }

      // Navegação por teclado (Acessibilidade)
      document.addEventListener('keydown', (e) => {
        if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'SELECT') return;
        if (e.key === 'ArrowLeft') {
          this.goTo(this.currentIndex - 1);
          this.resetTimer();
        } else if (e.key === 'ArrowRight') {
          this.goTo(this.currentIndex + 1);
          this.resetTimer();
        }
      });

      // Exibir o primeiro slide e iniciar timer
      this.showSlide(this.currentIndex);
      this.startTimer();
    },

    showSlide(index) {
      // Ajustar loop infinito (0 a total-1)
      if (index < 0) {
        this.currentIndex = this.slides.length - 1;
      } else if (index >= this.slides.length) {
        this.currentIndex = 0;
      } else {
        this.currentIndex = index;
      }

      // Atualizar slides visuais
      this.slides.forEach((slide, i) => {
        if (i === this.currentIndex) {
          slide.classList.add('active');
          slide.setAttribute('aria-hidden', 'false');
        } else {
          slide.classList.remove('active');
          slide.setAttribute('aria-hidden', 'true');
        }
      });

      // Atualizar abas e barra de progresso
      this.indicators.forEach((ind, i) => {
        if (i === this.currentIndex) {
          ind.classList.add('active');
          ind.setAttribute('aria-selected', 'true');
        } else {
          ind.classList.remove('active');
          ind.setAttribute('aria-selected', 'false');
        }
      });

      // Atualizar contador numérico (ex: 01 / 03)
      if (this.counter) {
        const currentFormatted = String(this.currentIndex + 1).padStart(2, '0');
        const totalFormatted = String(this.slides.length).padStart(2, '0');
        this.counter.textContent = `${currentFormatted} / ${totalFormatted}`;
      }
    },

    goTo(index) {
      this.showSlide(index);
    },

    startTimer() {
      this.clearTimer();
      this.timer = setInterval(() => {
        if (!this.isPaused) {
          this.goTo(this.currentIndex + 1);
        }
      }, this.intervalTime);
    },

    clearTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },

    resetTimer() {
      this.clearTimer();
      this.startTimer();
    },

    pause() {
      this.isPaused = true;
      if (this.pauseHint) {
        this.pauseHint.textContent = 'Pausado';
      }
    },

    resume() {
      this.isPaused = false;
      if (this.pauseHint) {
        this.pauseHint.textContent = 'Auto: 5s';
      }
    }
  };

  carousel.init();


  /* ==========================================================================
     2. BOTÃO VOLTAR AO TOPO (LADO DIREITO DA PÁGINA)
     ========================================================================== */
  const backToTopBtn = document.getElementById('backToTopBtn');

  function handleScrollBackToTop() {
    if (!backToTopBtn) return;
    // Surge suavemente após o usuário rolar 320px
    if (window.scrollY > 320) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleScrollBackToTop, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }


  /* ==========================================================================
     3. HEADER STICKY & DESTAQUE DE NAVEGAÇÃO
     ========================================================================== */
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], header[id]');

  function handleHeaderScroll() {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Identificar qual seção está ativa na tela
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach((link) => {
        const href = link.getAttribute('href').replace('#', '');
        if (href === currentSectionId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });


  /* ==========================================================================
     4. MENU MOBILE DRAWER
     ========================================================================== */
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavClose = document.getElementById('mobileNavClose');
  const mobileNavBackdrop = document.getElementById('mobileNavBackdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileNav() {
    if (!mobileNav || !mobileNavBackdrop) return;
    mobileNav.classList.add('open');
    mobileNavBackdrop.classList.add('open');
    mobileNav.setAttribute('aria-hidden', 'false');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    if (!mobileNav || !mobileNavBackdrop) return;
    mobileNav.classList.remove('open');
    mobileNavBackdrop.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (menuToggle) menuToggle.addEventListener('click', openMobileNav);
  if (mobileNavClose) mobileNavClose.addEventListener('click', closeMobileNav);
  if (mobileNavBackdrop) mobileNavBackdrop.addEventListener('click', closeMobileNav);

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', closeMobileNav);
  });


  /* ==========================================================================
     5. FILTROS DE SERVIÇOS (ABAS PÍLULA)
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Atualizar botão ativo
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      serviceCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });


  /* ==========================================================================
     6. CÓPIA DE ENDEREÇO & TOAST NOTIFICATION
     ========================================================================== */
  const copyAddressBtn = document.getElementById('copyAddressBtn');
  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimer = null;

  function showToast(message) {
    if (!toastNotification) return;
    if (toastMessage) toastMessage.textContent = message;
    
    toastNotification.classList.add('show');
    
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 3200);
  }

  if (copyAddressBtn) {
    copyAddressBtn.addEventListener('click', async () => {
      const address = "R. Uhland, 641 - Vila Ema, São Paulo - SP, 03288-040";
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(address);
        } else {
          // Fallback para contextos não-HTTPS
          const tempInput = document.createElement('input');
          tempInput.value = address;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
        }
        showToast('Endereço copiado para a área de transferência!');
      } catch (err) {
        showToast('Endereço: R. Uhland, 641 - Vila Ema');
      }
    });
  }


  /* ==========================================================================
     7. MODAL DE AGENDAMENTO INTERATIVO COM DIRECIONAMENTO PARA O WHATSAPP
     ========================================================================== */
  const bookingModal = document.getElementById('bookingModalBackdrop');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const openBookingBtns = document.querySelectorAll('.open-booking-btn');
  const serviceSelect = document.getElementById('serviceSelect');
  const bookingForm = document.getElementById('bookingForm');

  function openModal(defaultService = '') {
    if (!bookingModal) return;
    bookingModal.classList.add('open');
    bookingModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (defaultService && serviceSelect) {
      // Encontrar opção correspondente ou mais próxima
      let matched = false;
      for (let option of serviceSelect.options) {
        if (option.value.toLowerCase().includes(defaultService.toLowerCase())) {
          serviceSelect.value = option.value;
          matched = true;
          break;
        }
      }
      if (!matched) {
        serviceSelect.value = defaultService;
      }
    }
  }

  function closeModal() {
    if (!bookingModal) return;
    bookingModal.classList.remove('open');
    bookingModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openBookingBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = btn.getAttribute('data-service') || '';
      openModal(serviceName);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeMobileNav();
    }
  });

  // Envio do Formulário de Agendamento
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('clientName').value.trim();
      const service = document.getElementById('serviceSelect').value;
      const day = document.getElementById('preferredDay').value;
      const period = document.getElementById('preferredPeriod').value;
      const notes = document.getElementById('clientNotes').value.trim();

      // Montar mensagem elegante para o WhatsApp
      let message = `Olá! Gostaria de agendar um horário no *ROL CONCEPT*.\n\n`;
      message += `👤 *Nome:* ${name}\n`;
      message += `✂️ *Serviço:* ${service}\n`;
      message += `📅 *Dia preferido:* ${day}\n`;
      message += `⏰ *Período:* ${period}\n`;
      if (notes) {
        message += `📝 *Observação:* ${notes}\n`;
      }
      message += `\nAguardo a confirmação da disponibilidade. Obrigado(a)!`;

      const whatsappUrl = `https://wa.me/5511985940916?text=${encodeURIComponent(message)}`;

      // Abrir WhatsApp em nova aba
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      // Fechar modal e resetar formulário
      closeModal();
      bookingForm.reset();
      showToast('Redirecionando para o WhatsApp do ROL Concept...');
    });
  }

  /* ==========================================================================
     8. FORMULÁRIO DE AGENDAMENTO DIRETO NA PÁGINA (WHATSAPP)
     ========================================================================== */
  const whatsappDirectForm = document.getElementById('whatsappDirectForm');

  if (whatsappDirectForm) {
    whatsappDirectForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('directName').value.trim();
      const phone = document.getElementById('directPhone').value.trim();
      const service = document.getElementById('directService').value;
      const day = document.getElementById('directDay').value;
      const period = document.getElementById('directPeriod').value;
      const notes = document.getElementById('directNotes').value.trim();

      // Montar mensagem formatada e polida para o WhatsApp oficial
      let message = `Olá! Gostaria de agendar um horário no *ROL CONCEPT* pelo site.\n\n`;
      message += `👤 *Nome:* ${name}\n`;
      message += `📱 *Telefone:* ${phone}\n`;
      message += `✂️ *Serviço Escolhido:* ${service}\n`;
      message += `📅 *Dia da Semana:* ${day}\n`;
      message += `⏰ *Período Preferido:* ${period}\n`;
      if (notes) {
        message += `📝 *Observação / Cabelo:* ${notes}\n`;
      }
      message += `\nAguardo a confirmação do horário pela equipe ROL Concept!`;

      const whatsappUrl = `https://wa.me/5511985940916?text=${encodeURIComponent(message)}`;

      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      showToast('Abrindo o WhatsApp do ROL Concept para confirmar...');
    });
  }

});

