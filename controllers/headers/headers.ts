
const acao = {"Access-Control-Allow-Origin": "*"};
exports.getHeaders = {...acao, "Access-Control-Allow-Methods" : "GET"};
exports.postHeaders = {...acao, "Access-Control-Allow-Methods" : "POST"};
exports.patchHeaders = {...acao, "Access-Control-Allow-Methods" : "PATCH"};
exports.deleteHeaders = {...acao, "Access-Control-Allow-Methods" : "DELETE"};