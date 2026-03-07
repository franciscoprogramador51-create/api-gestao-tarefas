const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

const dbPath = path.join(__dirname, 'db.json');

function readDb() {
    if (!fs.existsSync(dbPath)) return { tasks: [] };
    return JSON.parse(fs.readFileSync(dbPath));
}

function writeDb(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// 🟢 ROTA: LISTAR TAREFAS (GET)
app.get('/tasks', (req, res) => {
    const db = readDb();
    res.json(db.tasks);
});

// 🔵 ROTA: CRIAR TAREFA (POST)
app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    const db = readDb();
    const newTask = { 
        id: Date.now().toString(), 
        title, 
        description, 
        status: 'pending' 
    };
    db.tasks.push(newTask);
    writeDb(db);
    res.status(201).json(newTask);
});

// 🔴 ROTA: DELETAR TAREFA (DELETE)
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    let db = readDb();
    
    const initialLength = db.tasks.length;
    db.tasks = db.tasks.filter(task => task.id !== id);
    
    if (db.tasks.length === initialLength) {
        return res.status(404).json({ error: "Tarefa não encontrada" });
    }

    writeDb(db);
    return res.status(204).send(); 
});

app.listen(3000, () => {
    console.log("🚀 PROJETO FINALIZADO E ONLINE!");
    console.log("🔗 Endpoints: GET /tasks | POST /tasks | DELETE /tasks/:id");
});
