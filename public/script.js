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

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.area-btn');
    const descriptionContainer = document.getElementById('area-description');

    const descriptions = {
        trabalhista: `
            <h3>Direito Trabalhista</h3>
            <p>O Direito Trabalhista regula as relações entre empregados e empregadores, garantindo que os direitos e deveres de ambas as partes sejam respeitados. Inclui questões como salários, férias, condições de trabalho e rescisão contratual. Nosso escritório auxilia tanto trabalhadores quanto empresas em processos trabalhistas.</p>
        `,
        previdenciario: `
            <h3>Benefícios Previdenciários</h3>
            <p>Os Benefícios Previdenciários garantem segurança financeira em momentos de necessidade, como aposentadoria, doença, acidente ou maternidade. Nossa equipe ajuda clientes a obter aposentadorias, auxílio-doença, pensão por morte e outros direitos previdenciários.</p>
        `,
        consumidor: `
            <h3>Direito do Consumidor</h3>
            <p>O Direito do Consumidor protege clientes em relações de consumo, assegurando que produtos e serviços atendam aos padrões de qualidade e transparência. Nossa equipe representa consumidores contra abusos, como publicidade enganosa e defeitos em produtos.</p>
        `
    };

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const areaKey = this.getAttribute('data-area');

            if (descriptionContainer.classList.contains('active') && descriptionContainer.dataset.current === areaKey) {
                // Se já estiver aberto, fecha ao clicar novamente
                descriptionContainer.classList.remove('active');
                setTimeout(() => {
                    descriptionContainer.style.display = 'none';
                    descriptionContainer.innerHTML = '';
                }, 300);
            } else {
                // Atualiza o conteúdo e exibe
                descriptionContainer.innerHTML = descriptions[areaKey];
                descriptionContainer.style.display = 'block';
                setTimeout(() => descriptionContainer.classList.add('active'), 10);
                descriptionContainer.dataset.current = areaKey;
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll(".area-btn");
    const textBox = document.querySelector("#area-info");

    buttons.forEach(button => {
        button.addEventListener("click", function() {

            const selectedArea = this.getAttribute("data-area");
            showAreaInfo(selectedArea);
        });
    });

    function showAreaInfo(area) {
        const infoText = {
            "trabalhista": "O Direito Trabalhista protege os direitos dos trabalhadores...",
            "previdenciario": "Os Benefícios Previdenciários garantem apoio financeiro...",
            "consumidor": "O Direito do Consumidor protege os clientes de práticas abusivas..."
        };

        textBox.innerHTML = `<p>${infoText[area]}</p>`;
        textBox.classList.add("show");
    }
});

document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            const offset = 120;
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
    const btnFechar = document.querySelector(".close-modal");
    const btnWhatsApp = document.getElementById("btn-whatsapp");
    const btnSite = document.getElementById("btn-site");
    const formAgendamento = document.getElementById("form-agendamento");
    const escolhaAgendamento = document.querySelector(".escolha-agendamento");
    const btnVoltar = document.getElementById("btn-voltar");
    const mensagemSucesso = document.getElementById("mensagem-sucesso");

    // Abrir modal ao clicar em "Agendamento Online"
    if (btnAgendamento) {
        btnAgendamento.addEventListener("click", function () {
            modal.classList.add("show");
        });
    }

    // Fechar modal ao clicar no X
    if (btnFechar) {
        btnFechar.addEventListener("click", function () {
            modal.classList.remove("show");
        });
    }

    // Redirecionar para WhatsApp
    if (btnWhatsApp) {
        btnWhatsApp.addEventListener("click", function () {
            window.open("https://wa.me/5581995369027", "_blank");
        });
    }

    // Exibir Formulário de Agendamento
    if (btnSite) {
        btnSite.addEventListener("click", function () {
            escolhaAgendamento.style.display = "none";
            formAgendamento.classList.add("show");
        });
    }

    // Voltar para escolha inicial
    if (btnVoltar) {
        btnVoltar.addEventListener("click", function () {
            formAgendamento.classList.remove("show");
            escolhaAgendamento.style.display = "block";
        });
    }

    // Envio do formulário via EmailJS
    if (formAgendamento) {
        formAgendamento.addEventListener("submit", function (event) {
            event.preventDefault();

            // Captura dos dados do formulário
            const nome = document.getElementById("nome").value;
            const idade = document.getElementById("idade").value;
            const contato = document.getElementById("contato").value;
            const assunto = document.getElementById("assunto").value;

            // Configuração do EmailJS
            emailjs.send("service_xxxxx", "template_xxxxx", {
                from_name: nome,
                age: idade,
                reply_to: contato,
                message: assunto
            }).then(
                function (response) {
                    console.log("Email enviado com sucesso!", response);
                    mensagemSucesso.classList.add("show");

                    // Fechar automaticamente após 10 segundos
                    setTimeout(function () {
                        modal.classList.remove("show");
                        formAgendamento.reset();
                        mensagemSucesso.classList.remove("show");
                        escolhaAgendamento.style.display = "block";
                        formAgendamento.classList.remove("show");
                    }, 10000);
                },
                function (error) {
                    console.error("Erro ao enviar email:", error);
                }
            );
        });
    }
});
