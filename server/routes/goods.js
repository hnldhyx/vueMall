var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Goods = require('../models/goods');


// 连接数据库
// root:123456为账号和密码
// dumall为表名
mongoose.connect('mongodb://root:123456@127.0.0.1:27017/dumall');

// 连接成功
mongoose.connection.on('connected', () => {
	console.log('mongodb connection has been successed')
})

// 连接断开
mongoose.connection.on('disconnected', () => {
	console.log('mongodb connection has been disconnected')
})

// 连接失败
mongoose.connection.on('error', () => {
	console.log('mongodb connection has been failed')
})

router.get('/', (req, res, next) => {
	Goods.find({}, (err, doc) => {
		if(err){
			res.json({
				status: '1',
				message: err.message
			});
		}else{
			res.json({
				status: '0',
				message: 'ok',
				result: {
					count: doc.length,
					list: doc
				}
			})
		}
	})
})

module.exports = router;