const client = require('../config/database')
module.exports = {
    /**
     * 获取所有值：如果不输入keywords或者keywords=' '的时候返回的是全部数据
     * ctx.query.keywords
     */  
    async getData(ctx){
        let keywords = ['%',ctx.query.keywords ,'%'].join("");
        let state = ctx.query.state;
        let taskId = ctx.query.taskId;
        try {
         await client.startTransaction(); //开启事务
         switch(state){
            //1、返回todos
            case 'all':
                data = await client.executeTransaction('select * from tasktable where title like ?;',[keywords]);
                break;
            //2、查询单个taskId
            default:
                data = await client.executeTransaction('select * from tasktable where  taskId;',[taskId]);
         }
           await client.stopTransaction();//关闭事务,此处应该是提交事务
           ctx.body= JSON.parse(JSON.stringify(data));
        }catch(e){
            ctx.body= JSON.parse(JSON.stringify({msg:"操作失败"}));
        }
    },
    // 移除
    async remove(ctx) {
        let taskId = ctx.query.taskId;
        let keywords = ['%',ctx.query.keywords ,'%'].join("");
        let op = taskId ? 'single':'all';
        try{
            await client.startTransaction(); //开启事务
            switch(op){
                //删除指定的项
                case 'single': 
                    await client.executeTransaction('delete from tasktable where taskId = ?;',  [taskId]); 
                    break;
                //清除completed所有项
                default:
                    await client.executeTransaction('delete from tasktable where status =? and title like ?;',[1,keywords]);
                }
            await client.stopTransaction();//关闭事务,此处应该是提交事务
            ctx.body= JSON.parse(JSON.stringify({msg:"操作成功"}));
        }catch(e){
            ctx.body= JSON.parse(JSON.stringify({msg:"操作失败"})); 
        }
    },
    //变换状态 
    async change(ctx) {
        let taskId = ctx.query.taskId;
        let checked = ctx.query.checked =='true'?1:0
        try{
            await client.startTransaction(); //开启事务
                //变换指定的项状态
            await client.executeTransaction('update tasktable set status = ? where taskId = ?;', [checked, taskId]); 
                //变换所有项的状态
            await client.stopTransaction();//关闭事务
            ctx.body= JSON.parse(JSON.stringify({msg:"操作成功"}));
        }catch(e){
            ctx.body= JSON.parse(JSON.stringify({msg:"操作失败"}));
        }
    },
    //更改全部状态
    async changeAll(ctx) {
        let keywords = ['%',ctx.query.keywords ,'%'].join("");
        let checked = ctx.query.checked =='true'?1:0
        try{
            await client.startTransaction(); //开启事务
                //变换指定的项状态
            await client.executeTransaction('update tasktable set status = ? where title like ?;', [checked, keywords]); 
                //变换所有项的状态
            await client.stopTransaction();//关闭事务
            ctx.body= JSON.parse(JSON.stringify({msg:"操作成功"}));
        }catch(e){
            ctx.body= JSON.parse(JSON.stringify({msg:"操作失败"}));
        }
    },
    //添加/更新项目
	async create(ctx){
        var todo = ctx.request.body;
        // let operation_sql = `insert into tasktable values (${todo.})`;
        // console.log(operation_sql)
        if(todo.taskId == 0){
            todo.taskId = Date.now();
            console.log(todo.taskId);
        }
		try {
            await client.startTransaction(); //开启事务
            //如果是编辑，则先删除对应项，再添加。如果是添加操作，删除语法无效。
            await client.executeTransaction('delete from tasktable where taskId=?;',[todo.taskId]); 
            // await client.executeTransaction( 'insert into tasktable values (?,?,?,?);',[todo.taskId,todo.title,todo.status,todo.detail]); 
            await client.executeTransaction( 'insert into tasktable values (?,?,?,?);',[todo.taskId,todo.title,parseInt(todo.status),todo.detail]); 
            await client.stopTransaction();//关闭事务,此处应该是提交事务
            ctx.body= JSON.parse(JSON.stringify({msg:"操作成功"}));
		}catch(e){
            ctx.body= JSON.parse(JSON.stringify({msg:"操作失败"}));
		}
    },
}