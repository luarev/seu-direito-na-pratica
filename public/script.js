document.getElementById('contatoForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome_completo = document.getElementById('nome_completo').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    if (!nome_completo || !email || !mensagem) {
        document.getElementById('mensagemStatus').innerText = "Preencha todos os campos obrigatórios!";
        document.getElementById('mensagemStatus').style.color = "red";
        return;
    }

    try {
        const response = await fetch('http://localhost:3001/contato', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome_completo, email, telefone, mensagem })
        });

        const data = await response.json();
        document.getElementById('mensagemStatus').innerText = data.message;
        document.getElementById('mensagemStatus').style.color = "green";

        // Limpar o formulário após envio
        document.getElementById('contatoForm').reset();

    } catch (error) {
        document.getElementById('mensagemStatus').innerText = "Erro ao enviar o formulário.";
        document.getElementById('mensagemStatus').style.color = "red";
    }
});
