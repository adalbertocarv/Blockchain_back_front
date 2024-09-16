class Block {
    constructor(index, timestamp, data, proof, previousHash) {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.proof = proof;
        this.previousHash = previousHash;
    }

    toString() {
        return JSON.stringify(this);
    }
}

module.exports = Block;
