let http = require('http');
let url = require('url');
let util = require('util');

let fs = require('fs')

http.createServer((req,res) => {
	let pathname = url.parse(req.url).pathname;
	fs.readFile(pathname.substring(1), (err, data) => {
		if(err){
			res.writeHead(404, {
				'Content-Type': 'text/html'
			})
		}else{
			res.writeHead(200, {
				'Content-Type': 'text/html'
			})

			res.write(data.toString());
		}

		res.end()
	})

}).listen(3000, '127.0.0.1', () => {
	console.log('服务器已经运行，请打开浏览器，输入 http://127.0.0.1:3000/ 进行访问');
})