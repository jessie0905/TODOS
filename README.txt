
ǰ�ˣ�4200�˿ڣ�search����򣬰�enter��ģ�����ң������Ϊ��ʱ������������ݣ�


��̨��3000�˿�


MYSQL��3306 �˿ڡ��� todos���ݿ��������һ��tasktable�ı�� 


           
CREATE DATABASE todos;
USE todos;
CREATE TABLE `tasktable`  (
  `taskId` bigint(0) UNSIGNED NULL DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `status` int(0) NULL DEFAULT NULL,
  `detail` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;