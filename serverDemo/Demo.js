let user = require('./User');




let http = require('http');

let server = http.createServer((req, rsp) => {
	rsp.statusCode = 200;
	rsp.setHeader('Content-Type', 'text/plain; charset=utf-8');

	console.log('a')

	rsp.end()
})

server.listen(3000, '127.0.0.1', () => {
	console.log('服务器已经运行，请打开浏览器，输入http://127.0.0.1:300 进行访问');
})