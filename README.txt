
前端：4200端口（search输入框，按enter键模糊查找，输入框为空时，获得所有数据）


后台：3000端口


MYSQL：3306 端口。在 todos数据库中添加了一张tasktable的表格 


           
CREATE DATABASE todos;
USE todos;
CREATE TABLE `tasktable`  (
  `taskId` bigint(0) UNSIGNED NULL DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `status` int(0) NULL DEFAULT NULL,
  `detail` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;