const express = require('express');
const multer = require('multer');
const pdfController = require('../controllers/pdfController');

// Configuração do multer para salvar arquivos na pasta 'uploads'
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

// Rota para upload de PDF
router.post('/upload', upload.single('pdf'), pdfController.uploadPdf);

// Rota para verificar a integridade de um PDF
router.post('/verify', upload.single('pdf'), pdfController.verifyPdf);

module.exports = router;
