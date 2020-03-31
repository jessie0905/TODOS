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

try {
	client.startTransaction()//开启事务
	client.stopTransaction();//关闭事务
} catch (error) {
	console.log("数据库连接失败")
}

var  p = new Promise(function(resolve,reject){
	if(client.startTransaction()){
		resolve();
	}else {
		reject(error);
	}
})

p.then(()=>{
	client.stopTransaction();
})
p.catch((error)=>{
	runtimeLog.error('[error]',error)
})
module.exports = client;