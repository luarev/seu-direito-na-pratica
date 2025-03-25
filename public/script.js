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
  const areaContainer = document.querySelector(".areas-container");

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
        `,
  };

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const areaKey = this.getAttribute("data-area");

      if (descriptionContainer.dataset.current === areaKey) {
        descriptionContainer.classList.remove("active");
        descriptionContainer.dataset.current = "";
        setTimeout(() => {
          descriptionContainer.style.display = "none";
          descriptionContainer.innerHTML = "";
        }, 300);
      } else {
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

document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      let offset = 0;

      if (targetId === "areas") {
        offset = window.innerHeight * 0.1;
      } else if (targetId === "sobre") {
        offset = window.innerHeight * 0.19;
      } else if (targetId === "contato-info") {
        offset = window.innerHeight * 0.26;
      } else if (targetId === "mapa") {
        offset = window.innerHeight * 0.12;
      } else {
        offset = window.innerHeight * 0.1;
      }

      const targetPosition = targetSection.offsetTop - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const modalAgendamento = document.getElementById("modal-agendamento");
  const modalFormulario = document.getElementById("modal-formulario");
  const btnAgendamento = document.getElementById("btn-agendamento");
  const btnFecharAgendamento = document.getElementById("btn-fechar");
  const btnFecharFormulario = document.getElementById("btn-fechar-formulario");
  const btnWhatsApp = document.getElementById("btn-whatsapp");
  const btnSite = document.getElementById("btn-site");
  const formAgendamento = document.getElementById("agendamento-form");
  const btnVoltar = document.getElementById("btn-voltar");
  const mensagemSucesso = document.getElementById("mensagem-sucesso");
  const campoContato = formAgendamento.querySelector('[name="contato"]');

  function abrirModal(modal) {
    modal.classList.remove("hidden", "hide");
    modal.classList.add("show");
  }
  function fecharModal(modal) {
    modal.classList.remove("show");
    modal.classList.add("hide");
    setTimeout(() => modal.classList.add("hidden"), 300);
  }
  btnAgendamento.addEventListener("click", (e) => {
    e.preventDefault();
    abrirModal(modalAgendamento);
  });
  btnFecharAgendamento.addEventListener("click", () =>
    fecharModal(modalAgendamento)
  );
  btnFecharFormulario.addEventListener("click", () =>
    fecharModal(modalFormulario)
  );
  btnVoltar.addEventListener("click", () => {
    fecharModal(modalFormulario);
    setTimeout(() => abrirModal(modalAgendamento), 200);
  });

  btnWhatsApp.addEventListener("click", () => {
    window.open("https://wa.me/5581995369027", "_blank");
  });

  btnSite.addEventListener("click", () => {
    fecharModal(modalAgendamento);
    setTimeout(() => abrirModal(modalFormulario), 200);
  });

  formAgendamento.addEventListener("submit", function (event) {
    event.preventDefault();

    const tipoContato = document.getElementById("contatoTipo").value;
    const valor = campoContato.value.trim();
    const apenasNumeros = valor.replace(/\D/g, "");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telefoneRegex = /^(\(?\d{2}\)?\s?)?9?\d{4}-?\d{4}$/;

    const erroAntigo =
      campoContato.parentElement.querySelector(".erro-validacao");
    if (erroAntigo) erroAntigo.remove();
    campoContato.classList.remove("erro");

    let valido = false;
    let mensagemErro = "";

    if (tipoContato === "email") {
      valido = emailRegex.test(valor) && valor.length <= 64;
      mensagemErro = "Digite um e-mail válido.";
    } else if (tipoContato === "telefone") {
      valido =
        telefoneRegex.test(valor) &&
        apenasNumeros.length >= 10 &&
        apenasNumeros.length <= 11;
      mensagemErro = "Digite um telefone válido.";
    }

    if (!valido) {
      const erro = document.createElement("span");
      erro.className = "erro-validacao";
      erro.textContent = mensagemErro;
      campoContato.classList.add("erro");
      campoContato.parentElement.appendChild(erro);
      return;
    }
    const loading = document.createElement("div");
    loading.className = "loading";
    this.appendChild(loading);

    emailjs
      .sendForm("service_osjcimo", "template_j5p7jkb", formAgendamento)
      .then(() => {
        mensagemSucesso.classList.remove("hidden");
        mensagemSucesso.classList.add("show");
        setTimeout(() => {
          formAgendamento.reset();
          mensagemSucesso.classList.remove("show");
          mensagemSucesso.classList.add("hidden");
        }, 2000);
      })
      .catch((error) => {
        alert("Erro ao enviar: " + JSON.stringify(error));
      })
      .finally(() => {
        loading.remove();
      });
  });

  campoContato.addEventListener("focus", () => {
    campoContato.classList.remove("erro");
    const erro = campoContato.parentElement.querySelector(".erro-validacao");
    if (erro) erro.remove();
  });
});

document.getElementById("form").addEventListener("submit", function (e) {
  const tipo = document.getElementById("contatoTipo").value;
  const valor = document.getElementById("contato").value.trim();
  const erro = document.getElementById("contatoErro");
  let valido = false;

  if (tipo === "email") {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    valido = regexEmail.test(valor);
    erro.textContent = valido
      ? ""
      : "Digite um e-mail válido (ex: nome@email.com)";
  } else if (tipo === "telefone") {
    const regexTelefone = /^[0-9]{10,15}$/;
    valido = regexTelefone.test(valor);
    erro.textContent = valido
      ? ""
      : "Digite um telefone válido com DDD (somente números)";
  } else {
    erro.textContent = "Selecione o tipo de contato";
  }

  if (!valido) {
    e.preventDefault();
  }
});

window.addEventListener("click", function (event) {
  if (event.target === modalAgendamento) {
    fecharModal(modalAgendamento);
  } else if (event.target === modalFormulario) {
    fecharModal(modalFormulario);
  }
});

const textarea = document.getElementById("assunto");
if (textarea) {
  textarea.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = Math.min(this.scrollHeight, 300) + "px";
  });
}
