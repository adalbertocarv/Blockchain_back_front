const express = require('express');
const cors = require('cors');  // Importar o CORS
const pdfRoutes = require('./routes/pdfRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());  // Habilitar CORS

// Rotas de upload e verificação
app.use('/api/pdf', pdfRoutes);

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
