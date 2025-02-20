require('dotenv').config({ path: './server/.env' });

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conectar ao banco de dados
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});


db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
    } else {
        console.log('Conectado ao banco de dados db_escritorio_juridico');
    }
});

// Endpoint para receber os contatos do formulário
app.post('/contato', (req, res) => {
    console.log("Recebendo requisição:", req.body); // Verificar se os dados estão chegando

    const { nome_completo, email, telefone, mensagem } = req.body;

    if (!nome_completo || !email || !mensagem) {
        return res.status(400).json({ message: "Preencha todos os campos obrigatórios." });
    }

    const sql = `INSERT INTO tb_contatos (nome_completo, email, telefone, mensagem) VALUES (?, ?, ?, ?)`;
    const values = [nome_completo, email, telefone || null, mensagem];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Erro ao salvar contato no banco de dados:', err);
            res.status(500).json({ message: 'Erro ao salvar contato no banco de dados.' });
        } else {
            console.log('Contato salvo no banco:', result);
            res.status(200).json({ message: 'Contato enviado com sucesso!' });
        }
    });
});


// Iniciar o servidor
app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
});
