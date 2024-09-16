const crypto = require('crypto');
const Block = require('./Block');

class Blockchain {
    constructor() {
        this.chain = [];
        this.currentData = [];
        this.createBlock(100, '1');  // Bloco gênesis
    }

    createBlock(proof, previousHash) {
        const block = new Block(
            this.chain.length + 1,
            Date.now(),
            this.currentData,
            proof,
            previousHash
        );

        this.currentData = [];
        this.chain.push(block);
        return block;
    }

    addData(documentHash, version, documentName) {
        this.currentData.push({
            documentName: documentName,
            documentHash: documentHash,
            version: version
        });
        return true;
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    hash(block) {
        const blockString = block.toString();
        return crypto.createHash('sha256').update(blockString).digest('hex');
    }

    proofOfWork(lastProof) {
        let proof = 0;
        while (!this.validProof(lastProof, proof)) {
            proof += 1;
        }
        return proof;
    }

    validProof(lastProof, proof) {
        const guess = `${lastProof}${proof}`;
        const guessHash = crypto.createHash('sha256').update(guess).digest('hex');
        return guessHash.substring(0, 4) === '0000';
    }
}

module.exports = Blockchain;
