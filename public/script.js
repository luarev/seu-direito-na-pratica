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

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".area-btn");
    const descriptionContainer = document.getElementById("area-description");

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
                }, 300);
            } else {
                // Esconde qualquer descrição anterior
                descriptionContainer.classList.remove("active");
                setTimeout(() => {
                    descriptionContainer.innerHTML = descriptions[areaKey];
                    descriptionContainer.style.display = "block";
                    setTimeout(() => descriptionContainer.classList.add("active"), 10);
                    descriptionContainer.dataset.current = areaKey;
                }, 300);
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
            const offset = window.innerHeight / 5.5;
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

    if (btnAgendamento) {
        btnAgendamento.addEventListener("click", function () {
            modal.classList.add("show");
        });
    }

    // Fechar modal ao clicar no X
    if (btnFechar) {
        btnFechar.addEventListener("click", function () {
            modal.classList.remove("show");
            // Quando fechar o modal, restaurar os botões para evitar problemas de exibição
            setTimeout(() => {
                escolhaAgendamento.style.display = "flex";
                formAgendamento.style.display = "none";
                formAgendamento.classList.remove("show");
            }, 300);
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
            perguntaAgendamento.style.opacity = "0"; // Esconde suavemente
            setTimeout(() => perguntaAgendamento.style.display = "none", 300); // Remove após animação

            escolhaAgendamento.classList.add("hidden"); // Esconde a escolha inicial
            formAgendamento.classList.remove("hidden"); // Exibe o formulário
            setTimeout(() => formAgendamento.classList.add("show"), 10); // Animação suave
        });
    }

    // Voltar para escolha inicial e garantir que os botões sejam restaurados corretamente
    if (btnVoltar) {
        btnVoltar.addEventListener("click", function () {
            formAgendamento.classList.remove("show");
            setTimeout(() => {
                formAgendamento.classList.add("hidden");
                escolhaAgendamento.classList.remove("hidden");
                perguntaAgendamento.style.display = "block"; // Reexibe a pergunta
                setTimeout(() => perguntaAgendamento.style.opacity = "1", 10); // Animação de volta
            }, 300);
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
                        escolhaAgendamento.style.display = "flex";
                        formAgendamento.style.display = "none";
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
