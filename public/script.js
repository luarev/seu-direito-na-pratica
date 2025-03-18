document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");

    function checkScroll() {
        sections.forEach((section) => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight - 100) {
                section.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", checkScroll);
    checkScroll();
});

//areas de atuação

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".area-btn");
    const descriptionContainer = document.getElementById("area-description");
    const areaContainer = document.querySelector(".areas-container"); // Pegamos a div das áreas

    const descriptions = {
        trabalhista: `
            <h3>Direito Trabalhista</h3>
            <p>O Direito Trabalhista regula as relações entre empregados e empregadores, garantindo que os direitos e deveres de ambas as partes sejam respeitados. Inclui questões como salários, férias, condições de trabalho e rescisão contratual. Nosso escritório auxilia tanto trabalhadores quanto empresas em processos trabalhistas.</p>
        `,
        previdenciario: `
            <h3>Benefícios Previdenciários</h3>
            <p>Os Benefícios Previdenciários garantem segurança financeira em momentos de necessidade, como aposentadoria, doença, acidente ou maternidade. Nossa equipe ajuda clientes a obter aposentadorias, auxílio por incapacidade temporária, pensão por morte e outros direitos previdenciários.</p>
        `,
        consumidor: `
            <h3>Direito do Consumidor</h3>
            <p>O Direito do Consumidor protege clientes em relações de consumo, assegurando que produtos e serviços atendam aos padrões de qualidade e transparência. Nossa equipe representa consumidores contra abusos, como publicidade enganosa e defeitos em produtos.</p>
        `
    };

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const areaKey = this.getAttribute("data-area");
    
            if (descriptionContainer.dataset.current === areaKey) {
                // Se a mesma área já estiver aberta, fecha
                descriptionContainer.classList.remove("active");
                descriptionContainer.dataset.current = "";
                setTimeout(() => {
                    descriptionContainer.style.display = "none";
                    descriptionContainer.innerHTML = "";
                }, 300); // Tempo para a transição de fechamento
            } else {
                // Esconde qualquer descrição anterior
                descriptionContainer.classList.remove("active");
                setTimeout(() => {
                    descriptionContainer.innerHTML = descriptions[areaKey];
                    descriptionContainer.style.display = "block";
                    setTimeout(() => descriptionContainer.classList.add("active"), 10);
                    descriptionContainer.dataset.current = areaKey;
                }, 300); // Tempo para a transição de abertura
            }
        });
    });
});






document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            let offset = 0;

            // Ajuste o offset para cada seção específica
            if (targetId === "areas") {
                offset = window.innerHeight * 0.1;
            } else if (targetId === "sobre") {
                offset = window.innerHeight * 0.19;
            } else if (targetId === "contato") {
                offset = window.innerHeight * 0.26;
            } else {
                offset = window.innerHeight * 0.1;
            }

            const targetPosition = targetSection.offsetTop - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        }
    });
});




document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal-agendamento");
    const btnAgendamento = document.getElementById("btn-agendamento");
    const btnFechar = document.getElementById("btn-fechar");
    const btnWhatsApp = document.getElementById("btn-whatsapp");
    const btnSite = document.getElementById("btn-site");
    const formAgendamento = document.getElementById('form-agendamento');
    const escolhaAgendamento = document.getElementById("escolha-agendamento");
    const btnVoltar = document.getElementById("btn-voltar");
    const mensagemSucesso = document.getElementById("mensagem-sucesso");

    function abrirModal() {
        modal.classList.remove("hidden");
        modal.style.display = "flex"; // Força o display flex para centralização
        setTimeout(() => modal.classList.add("show"), 10);
        // Reseta o estado interno ao abrir
        escolhaAgendamento.classList.remove("hidden");
        formAgendamento.classList.add("hidden");
    }

    function fecharModal() {
        modal.classList.remove("show");
        setTimeout(() => {
            modal.classList.add("hidden");
            modal.style.display = "none"; // Garante o ocultamento completo
        }, 300);
    }

    // Função para alternar entre os modos do modal
    function toggleModalView(showForm) {
        if(showForm) {
            escolhaAgendamento.classList.add("hidden");
            formAgendamento.classList.remove("hidden");
            setTimeout(() => formAgendamento.classList.add("show"), 10);
        } else {
            formAgendamento.classList.remove("show");
            setTimeout(() => {
                formAgendamento.classList.add("hidden");
                escolhaAgendamento.classList.remove("hidden");
            }, 300);
        }
    }

    // Evento do botão de agendamento na navbar
        btnAgendamento.addEventListener("click", function (e) {
            e.preventDefault();
            abrirModal();
        });

    // Evento do botão de fechar modal
    if (btnFechar) {
        btnFechar.addEventListener("click", fecharModal);
    }

    // Botão de WhatsApp - Redirecionamento
    if (btnWhatsApp) {
        btnWhatsApp.addEventListener("click", function () {
            window.open("https://wa.me/5581995369027", "_blank");
        });
    }

    // Botão de Agendamento pelo Site
    if (btnSite) {
        btnSite.addEventListener("click", () => toggleModalView(true));
    }

    // Botão de Voltar
    if (btnVoltar) {
        btnVoltar.addEventListener("click", () => toggleModalView(false));
    }

    modal.addEventListener("click", (e) => {
        if(e.target === modal) fecharModal();
    });


    //envio do formulário
    formAgendamento.addEventListener("submit", function (event) {
        event.preventDefault();
    
        const nome = document.getElementById('nome').value;
        const idade = document.getElementById('idade').value;
        const contato = document.getElementById('contato').value;
        const assunto = document.getElementById('assunto').value;
    
        if (!nome || !idade || !contato || !assunto) {
            alert("Por favor, preencha todos os campos.");
            return;
        }
    
        const loading = document.createElement('div');
        loading.className = 'loading';
        this.appendChild(loading);
    
        emailjs.sendForm("service_qmujy7o", "template_76bts8q", this)
            .then(() => {
                mensagemSucesso.classList.add("show");
                setTimeout(() => {
                    fecharModal();
                    formAgendamento.reset();
                    mensagemSucesso.classList.remove("show");
                }, 2000);
            })
            .catch((error) => {
                alert("Erro ao enviar: " + JSON.stringify(error));
            })
            .finally(() => {
                loading.remove();
            });
    });

    // 📏 Ajuste de altura automática para textarea
    const textarea = document.getElementById('assunto');
    if (textarea) {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    }
});