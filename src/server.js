const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());

const DB_FILE = './db.json';

// Função para ler o banco (arquivo JSON)
const readDB = () => {
    if (!fs.existsSync(DB_FILE)) return [];
    const data = fs.readFileSync(DB_FILE);
    return JSON.parse(data);
};

// Rota para LISTAR tarefas (GET)
app.get('/tasks', (req, res) => {
    const tasks = readDB();
    res.json(tasks);
});

// Rota para CRIAR tarefa (POST)
app.post('/tasks', (req, res) => {
    const tasks = readDB();
    const newTask = { 
        id: Date.now(), 
        title: req.body.title 
    };
    tasks.push(newTask);
    fs.writeFileSync(DB_FILE, JSON.stringify(tasks, null, 2));
    res.status(201).json(newTask);
});

app.listen(3000, () => console.log('🚀 API de Tarefas rodando na porta 3000!'));