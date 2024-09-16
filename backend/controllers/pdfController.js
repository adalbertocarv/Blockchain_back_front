// Função para fazer upload e adicionar hash do documento à blockchain
exports.uploadPdf = (req, res) => {
    const pdfFile = req.file;

    // Log para depuração
    console.log("Arquivo enviado:", pdfFile);

    if (!pdfFile) {
        return res.status(400).send('Nenhum arquivo enviado.');
    }

    // Calcular o hash do PDF
    const filePath = path.join(__dirname, '..', 'uploads', pdfFile.filename);
    console.log("Caminho do arquivo:", filePath);

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const pdfHash = hashDocument(fileContent);

    // Adicionar dados à blockchain
    blockchain.addData(pdfHash, "v1", pdfFile.originalname);

    // Criar um novo bloco
    const lastBlock = blockchain.getLastBlock();
    const proof = blockchain.proofOfWork(lastBlock.proof);
    const previousHash = blockchain.hash(lastBlock);
    blockchain.createBlock(proof, previousHash);

    return res.status(200).json({
        message: 'Arquivo enviado e registrado na blockchain.',
        blockchain: blockchain.chain
    });
};
