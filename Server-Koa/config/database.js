//配置数据库信息
const Client = require("mysql-pro");
const client = new Client({
	mysql: {
		user: 'root',
		password: 'asd123456',
		database: 'todos',
		host: '127.0.0.1',
		port: 3306,
	}
});

module.exports = client;