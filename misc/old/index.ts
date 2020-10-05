const http = require('http');
const url = require('url');
const fs = require('fs');

















// const slugify = require('slugify');

// const replaceTemplate = require('./modules/replaceTemplate.ts');

// const data = fs.readFileSync(`${__dirname}/db/data.json`, 'utf-8');
// const parsedData = JSON.parse(data);
//
// const mainPage = fs.readFileSync(`${__dirname}/templates/mainPage.html`, 'utf-8');
// const detailsPage = fs.readFileSync(`${__dirname}/templates/detailsPage.html`, 'utf-8');
// const itemBlock = fs.readFileSync(`${__dirname}/templates/itemBlock.html`, 'utf-8');

//const slugs = parsedData.map(slug => slugify(slug.name, {lower: true}));
//console.log(slugs);

// server
// const server = http.createServer((request, response) => {
//
//     // url.parse(request.url, true) return object that has such properties as 'query'
//     // and 'pathName', so we can get their values directly creating according variables:
//     const {pathname, query} = url.parse(request.url, true);
//
//     // if (request.method === 'GET') {
//     //     response.writeHead(200, {
//     //         'Content-type': 'text/html',
//     //         "Access-Control-Allow-Origin": "*",
//     //         "Access-Control-Allow-Methods" : "GET,POST,PUT,DELETE,OPTIONS",
//     //     });
//     //     response.end(data);
//     // }
//
//     if (pathname === '/') {
//         response.writeHead(200, {'Content-type': 'text/html',});
//         const arr = parsedData.map(item => replaceTemplate(itemBlock, item)).join('');
//         const output = mainPage.replace(/{%ITEM_BLOCKS%}/g, arr);
//         response.end(output);
//     } else if (pathname === `/details`) {
//         response.writeHead(200, {'Content-type': 'text/html',});
//         const item = parsedData[query.id - 1];
//         const output = replaceTemplate(detailsPage, item);
//         response.end(output);
//     } else if (pathname === '/api') {
//         response.writeHead(200, {'Content-type': 'application/json',});
//         response.end(data);
//     } else {
//         response.writeHead(404, {'Content-type': 'text/html',});
//         response.end('<h5>server response: page not found</h5>');
//     }
//
// });
//
// // 127.0.0.1 - localhost
// server.listen(3001, 'localhost', () => {
//     console.log('Listening to requests on port 3001...');
// });

