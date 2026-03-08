const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 COLE SEUS CÓDIGOS AQUI EMBAIXO
const supabaseUrl = 'https://arxftxobcohkziyejrlr.supabase.co'
const supabaseKey = 'sb_publishable_dxtNKXXCPFQGSqqHWGQN8w_XOn_1G_D'
const supabase = createClient(supabaseUrl, supabaseKey);

// 🟢 ROTA: BUSCAR TAREFAS NA NUVEM
app.get('/tasks', async (req, res) => {
    const { data, error } = await supabase.from('tasks').select('*');
    if (error) return res.status(400).json(error);
    res.json(data);
});

// 🔵 ROTA: SALVAR TAREFA NA NUVEM
app.post('/tasks', async (req, res) => {
    const { title, description } = req.body;
    const { data, error } = await supabase
        .from('tasks')
        .insert([{ title, description }])
        .select();

    if (error) return res.status(400).json(error);
    res.status(201).json(data[0]);
});

app.listen(3000, () => console.log("🚀 API GRADUADA! Conectada ao Supabase Cloud."));