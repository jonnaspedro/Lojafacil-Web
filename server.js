const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const sequelize = require("./database");

const Cliente = require("./models/Cliente");
const Produto = require("./models/Produto");
const Categoria = require("./models/Categoria");
const Funcionario = require("./models/Funcionario");
const Fornecedor = require("./models/Fornecedor");
const Venda = require("./models/Venda");

const app = express();
const PORT = 3000;

app.engine('hbs', exphbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => res.render('home'));

app.get('/clientes', async (req, res) => {
    const clientes = await Cliente.findAll({ raw: true });
    res.render('clientes', { clientes });
});

app.post('/clientes', async (req, res) => {
    const nome = req.body.nome?.trim();
    if (!nome) return res.send("Nome obrigatório");

    await Cliente.create({ nome });
    res.redirect('/clientes');
});

app.get('/clientes/:id/editar', async (req, res) => {
    const cliente = await Cliente.findByPk(req.params.id, { raw: true });
    res.render('editar', { cliente });
});

app.post('/clientes/:id/editar', async (req, res) => {
    const cliente = await Cliente.findByPk(req.params.id);
    const nome = req.body.nome?.trim();
    if (!nome) return res.send("Nome obrigatório");
    await cliente.update({ nome });
    res.redirect('/clientes');
});

app.post('/clientes/:id/excluir', async (req, res) => {
    await Cliente.destroy({ where: { id: req.params.id }});
    res.redirect('/clientes');
});

app.get('/funcionarios', async (req, res) => {
    const funcionarios = await Funcionario.findAll({ raw: true }); // 🔹 RAW retorna objetos puros
    res.render('funcionarios', { funcionarios });
});

app.post('/funcionarios', async (req, res) => {
    const nome = req.body.nome?.trim();
    const cargo = req.body.cargo?.trim();
    if (!nome || !cargo) return res.send("Todos os campos são obrigatórios!");

    await Funcionario.create({ nome, cargo });
    res.redirect('/funcionarios');
});

app.get('/funcionarios/:id/editar', async (req, res) => {
    const funcionario = await Funcionario.findByPk(req.params.id, { raw: true });
    res.render('editarFuncionario', { funcionario });
});

app.post('/funcionarios/:id/editar', async (req, res) => {
    const funcionario = await Funcionario.findByPk(req.params.id);
    const nome = req.body.nome?.trim();
    const cargo = req.body.cargo?.trim();
    if (!nome || !cargo) return res.send("Todos os campos são obrigatórios!");

    await funcionario.update({ nome, cargo });
    res.redirect('/funcionarios');
});

app.post('/funcionarios/:id/excluir', async (req, res) => {
    await Funcionario.destroy({ where: { id: req.params.id }});
    res.redirect('/funcionarios');
});

app.get('/produtos', async (req, res) => {
    const produtos = await Produto.findAll({ raw: true });
    res.render('produtos', { produtos });
});

app.post('/produtos', async (req, res) => {
    const { nome, preco } = req.body;
    if (!nome || !preco) return res.send("Nome e preço são obrigatórios!");

    await Produto.create({ nome, preco });
    res.redirect('/produtos');
});

app.get('/produtos/:id/editar', async (req, res) => {
    const produto = await Produto.findByPk(req.params.id, { raw: true });
    res.render('editar', { produto });
});

app.post('/produtos/:id/editar', async (req, res) => {
    const produto = await Produto.findByPk(req.params.id);
    const { nome, preco } = req.body;
    if (!nome || !preco) return res.send("Nome e preço são obrigatórios!");

    await produto.update({ nome, preco });
    res.redirect('/produtos');
});

app.post('/produtos/:id/excluir', async (req, res) => {
    await Produto.destroy({ where: { id: req.params.id }});
    res.redirect('/produtos');
});

app.get('/categorias', async (req, res) => {
    const categorias = await Categoria.findAll({ raw: true });
    res.render('categorias', { categorias });
});

app.post('/categorias', async (req, res) => {
    const nome = req.body.nome?.trim();
    if (!nome) return res.send("Nome obrigatório");
    await Categoria.create({ nome });
    res.redirect('/categorias');
});

app.get('/categorias/:id/editar', async (req, res) => {
    const categoria = await Categoria.findByPk(req.params.id, { raw: true });
    res.render('editarCategoria', { categoria });
});

app.post('/categorias/:id/editar', async (req, res) => {
    const categoria = await Categoria.findByPk(req.params.id);
    const nome = req.body.nome?.trim();
    if (!nome) return res.send("Nome obrigatório");

    await categoria.update({ nome });
    res.redirect('/categorias');
});

app.post('/categorias/:id/excluir', async (req, res) => {
    await Categoria.destroy({ where: { id: req.params.id }});
    res.redirect('/categorias');
});

app.get('/fornecedores', async (req, res) => {
    const fornecedores = await Fornecedor.findAll({ raw: true });
    res.render('fornecedores', { fornecedores });
});

app.post('/fornecedores', async (req, res) => {
    const nome = req.body.nome?.trim();
    if (!nome) return res.send("Nome obrigatório");

    await Fornecedor.create({ nome });
    res.redirect('/fornecedores');
});

app.get('/fornecedores/:id/editar', async (req, res) => {
    const fornecedor = await Fornecedor.findByPk(req.params.id, { raw: true });
    res.render('editarFornecedor', { fornecedor });
});

app.post('/fornecedores/:id/editar', async (req, res) => {
    const fornecedor = await Fornecedor.findByPk(req.params.id);
    const nome = req.body.nome?.trim();
    if (!nome) return res.send("Nome obrigatório");

    await fornecedor.update({ nome });
    res.redirect('/fornecedores');
});

app.post('/fornecedores/:id/excluir', async (req, res) => {
    await Fornecedor.destroy({ where: { id: req.params.id }});
    res.redirect('/fornecedores');
});

app.get('/vendas', async (req, res) => {
    const vendas = await Venda.findAll({ raw: true });
    res.render('vendas', { vendas });
});

app.post('/vendas', async (req, res) => {
    const { cliente, produto, valor } = req.body;
    if (!cliente || !produto || !valor) return res.send("Todos os campos são obrigatórios!");

    await Venda.create({ cliente, produto, valor });
    res.redirect('/vendas');
});

app.post('/vendas/:id/excluir', async (req, res) => {
    await Venda.destroy({ where: { id: req.params.id }});
    res.redirect('/vendas');
});

app.use((req, res) => res.status(404).render('404'));

sequelize.sync({ force: true }).then(() => {
    console.log("Banco limpo e sincronizado.");
    app.listen(PORT, () =>
        console.log(`Servidor rodando em http://localhost:${PORT}`)
    );
});