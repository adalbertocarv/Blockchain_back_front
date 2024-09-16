const crypto = require('crypto');

function hashDocument(documentContent) {
    return crypto.createHash('sha256').update(documentContent).digest('hex');
}

module.exports = { hashDocument };
