/*
Navicat MySQL Data Transfer

Source Server         : test
Source Server Version : 50626
Source Host           : localhost:3306
Source Database       : mall

Target Server Type    : MYSQL
Target Server Version : 50626
File Encoding         : 65001

Date: 2021-05-19 11:23:08
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for cart
-- ----------------------------
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `checked` tinyint(4) NOT NULL,
  `quantity` int(11) NOT NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `product_id` bigint(20) NOT NULL,
  `detail_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `detail_id` (`detail_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`detail_id`) REFERENCES `product_detail` (`id`),
  CONSTRAINT `cart_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cart
-- ----------------------------
INSERT INTO `cart` VALUES ('1', '1', '2', '2021-05-01 10:38:39', '2021-05-01 10:37:45', '3', '5', '1');

-- ----------------------------
-- Table structure for contact
-- ----------------------------
DROP TABLE IF EXISTS `contact`;
CREATE TABLE `contact` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(254) NOT NULL,
  `telephone` varchar(254) NOT NULL,
  `address` text NOT NULL,
  `tag` varchar(254) NOT NULL,
  `create_time` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  `update_time` datetime NOT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `contact_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of contact
-- ----------------------------
INSERT INTO `contact` VALUES ('1', '哈哈', '13612341234', '湖南', '学校', '2021-05-04 17:03:40', '2021-04-26 14:56:54', '2');
INSERT INTO `contact` VALUES ('2', 'tantan', '13612341234', '湖北', '家', '2021-05-01 15:56:01', '2021-04-26 14:57:18', '2');

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `id` varchar(254) NOT NULL,
  `price` varchar(254) NOT NULL,
  `paid` tinyint(4) NOT NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `contact_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `contact_id` (`contact_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `order_ibfk_1` FOREIGN KEY (`contact_id`) REFERENCES `contact` (`id`),
  CONSTRAINT `order_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of order
-- ----------------------------
INSERT INTO `order` VALUES ('2021428143158728', '10999.00', '0', '2021-04-28 14:31:59', '2021-04-28 14:31:59', '2', '1');
INSERT INTO `order` VALUES ('2021428143437645', '10999.00', '1', '2021-04-28 06:34:43', '2021-04-28 14:34:38', '1', '1');
INSERT INTO `order` VALUES ('2021428144437336', '15998.00', '1', '2021-04-28 06:44:39', '2021-04-28 14:44:37', '2', '1');
INSERT INTO `order` VALUES ('2021430195832547', '4999.00', '1', '2021-04-30 11:58:34', '2021-04-30 19:58:33', '1', '1');
INSERT INTO `order` VALUES ('202143020057661', '4688.00', '1', '2021-04-30 12:00:59', '2021-04-30 20:00:58', '2', '1');
INSERT INTO `order` VALUES ('202151155741873', '4298.00', '1', '2021-05-01 15:59:01', '2021-05-01 15:57:42', '1', '2');
INSERT INTO `order` VALUES ('202151155950657', '1399.00', '0', '2021-05-01 15:59:51', '2021-05-01 15:59:51', '2', '2');
INSERT INTO `order` VALUES ('202153142542591', '6045.00', '1', '2021-05-03 14:25:43', '2021-05-03 14:25:43', '2', '2');
INSERT INTO `order` VALUES ('202154162751162', '17192.00', '0', '2021-05-04 16:27:51', '2021-05-04 16:27:51', '2', '2');
INSERT INTO `order` VALUES ('202154165749450', '5596.00', '0', '2021-05-04 16:57:49', '2021-05-04 16:57:49', '2', '2');
INSERT INTO `order` VALUES ('20215417534459', '4498.00', '1', '2021-05-04 17:05:34', '2021-05-04 17:05:34', '1', '2');

-- ----------------------------
-- Table structure for order_detail
-- ----------------------------
DROP TABLE IF EXISTS `order_detail`;
CREATE TABLE `order_detail` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `quantity` int(11) NOT NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `order_id` varchar(254) NOT NULL,
  `product_id` bigint(20) NOT NULL,
  `detail_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `detail_id` (`detail_id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `order_detail_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `order_detail_ibfk_2` FOREIGN KEY (`detail_id`) REFERENCES `product_detail` (`id`),
  CONSTRAINT `order_detail_ibfk_4` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of order_detail
-- ----------------------------
INSERT INTO `order_detail` VALUES ('16', '1', '2021-04-28 14:31:58', '2021-04-28 14:31:58', '2021428143158728', '2', '4');
INSERT INTO `order_detail` VALUES ('17', '1', '2021-04-28 14:34:37', '2021-04-28 14:34:37', '2021428143437645', '2', '4');
INSERT INTO `order_detail` VALUES ('18', '1', '2021-04-28 14:44:37', '2021-04-28 14:44:37', '2021428144437336', '2', '3');
INSERT INTO `order_detail` VALUES ('19', '1', '2021-04-28 14:44:37', '2021-04-28 14:44:37', '2021428144437336', '1', '1');
INSERT INTO `order_detail` VALUES ('20', '1', '2021-04-30 19:58:32', '2021-04-30 19:58:32', '2021430195832547', '1', '1');
INSERT INTO `order_detail` VALUES ('21', '1', '2021-04-30 20:00:57', '2021-04-30 20:00:57', '202143020057661', '3', '5');
INSERT INTO `order_detail` VALUES ('22', '2', '2021-05-01 15:57:41', '2021-05-01 15:57:41', '202151155741873', '9', '17');
INSERT INTO `order_detail` VALUES ('23', '1', '2021-05-01 15:59:50', '2021-05-01 15:59:50', '202151155950657', '7', '15');
INSERT INTO `order_detail` VALUES ('24', '1', '2021-05-03 14:25:42', '2021-05-03 14:25:42', '202153142542591', '6', '13');
INSERT INTO `order_detail` VALUES ('25', '1', '2021-05-03 14:25:42', '2021-05-03 14:25:42', '202153142542591', '10', '20');
INSERT INTO `order_detail` VALUES ('26', '8', '2021-05-04 16:27:51', '2021-05-04 16:27:51', '202154162751162', '9', '17');
INSERT INTO `order_detail` VALUES ('27', '4', '2021-05-04 16:57:49', '2021-05-04 16:57:49', '202154165749450', '7', '15');
INSERT INTO `order_detail` VALUES ('28', '1', '2021-05-04 17:05:34', '2021-05-04 17:05:34', '20215417534459', '10', '19');
INSERT INTO `order_detail` VALUES ('29', '1', '2021-05-04 17:05:34', '2021-05-04 17:05:34', '20215417534459', '10', '20');

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `description` text NOT NULL,
  `show_index` int(11) NOT NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `category_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `product_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES ('1', 'HUAWEI Mate 40 5G 全网通', ' 华为Mate40是华为研发的智能手机，搭载麒麟9000E芯片，采用6.5英寸的68度曲面屏，分辨率为2376*1080', '0', '2021-05-02 16:34:24', '2021-04-21 03:55:52', '1');
INSERT INTO `product` VALUES ('2', 'HUAWEI Mate 40 RS保时捷设计 5G 全网通', '保时捷设计基因, 5nm 麒麟9000旗舰芯片, 超感知徕卡电影五摄, 有线无线双超..\r\n芯片:  5nm 麒麟9000旗舰芯片摄像:  超感知徕卡电影五摄充电:  66W有线50W无线快充系统:  EMUI 11', '0', '2021-04-21 03:57:12', '2021-04-21 03:57:12', '1');
INSERT INTO `product` VALUES ('3', 'HUAWEI WATCH GT 2 ', '【保时捷设计款】HUAWEI WATCH GT 2 保时捷设计款 钛金灰（46mm）华为智能手表 全钛金属设计 蓝宝石表面 陶瓷背壳 蓝牙通话 专业户外运动', '0', '2021-05-01 09:57:21', '2021-04-30 09:46:19', '2');
INSERT INTO `product` VALUES ('4', 'Apple Watch Series 3智能手表', '有 3 在手，事事成', '0', '2021-05-01 10:45:51', '2021-05-01 10:45:54', '2');
INSERT INTO `product` VALUES ('5', '小米11 Ultra', '匠心独具的现代陶瓷工艺，坚固度、耐久性远超想象，细腻的触感有如凝脂，这一点，你的双手将会印象深刻。', '0', '2021-05-01 14:06:40', '2021-05-01 14:06:42', '1');
INSERT INTO `product` VALUES ('6', '荣耀30 Pro', '50倍远摄 麒麟990 5G 4000万超感光摄影 3200W美颜自拍 游戏手机 全网通版', '0', '2021-05-01 14:20:08', '2021-05-01 14:20:11', '1');
INSERT INTO `product` VALUES ('7', '华为荣耀WATCH-Magic2', '智能手环手表 运动防水智能手环手表', '0', '2021-05-01 14:26:30', '2021-05-01 14:26:32', '2');
INSERT INTO `product` VALUES ('8', '小米手环 5', '动态彩屏 心率运动手环50米防水女性健康24小时高精准心率监测磁吸式充电', '0', '2021-05-01 14:29:37', '2021-05-01 14:29:39', '2');
INSERT INTO `product` VALUES ('9', '华为平板M6电脑', '平板电脑二合一全网通智能超薄高清游戏2019新款ipad 8.4英寸', '0', '2021-05-01 14:34:53', '2021-05-01 14:34:55', '3');
INSERT INTO `product` VALUES ('10', 'HUAWEI MatePad', '6+ 2K全面屏 7nm麒麟820芯片 哈曼卡顿调音 莱茵护眼认证 教育学习平板电脑', '0', '2021-05-01 14:43:04', '2021-05-01 14:43:07', '3');
INSERT INTO `product` VALUES ('11', 'HUAWEI MatePad', '10.8英寸 麒麟990旗舰芯片 Wifi6+ 2K高清屏 娱乐影音学习办公平板 ', '0', '2021-05-01 14:54:03', '2021-05-01 14:49:36', '3');
INSERT INTO `product` VALUES ('12', 'HUAWEI MatePad Pro 5G', '绚丽全面屏学生平板 麒麟990芯片 手机平板多屏协同 轻办公平板电脑', '0', '2021-05-01 14:57:51', '2021-05-01 14:57:54', '3');

-- ----------------------------
-- Table structure for product_category
-- ----------------------------
DROP TABLE IF EXISTS `product_category`;
CREATE TABLE `product_category` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(254) NOT NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of product_category
-- ----------------------------
INSERT INTO `product_category` VALUES ('1', '手机', '2021-04-21 03:52:03', '2021-04-21 03:52:03');
INSERT INTO `product_category` VALUES ('2', '手环手表', '2021-04-21 03:52:25', '2021-04-21 03:52:25');
INSERT INTO `product_category` VALUES ('3', '平板电脑', '2021-05-01 14:31:28', '2021-05-01 14:31:30');

-- ----------------------------
-- Table structure for product_detail
-- ----------------------------
DROP TABLE IF EXISTS `product_detail`;
CREATE TABLE `product_detail` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `stock` int(11) NOT NULL,
  `price` varchar(254) NOT NULL,
  `sale_price` varchar(254) NOT NULL,
  `image` text NOT NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `product_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_detail_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of product_detail
-- ----------------------------
INSERT INTO `product_detail` VALUES ('1', '8GB+128GB（秘银色）', '90', '5999.00', '4999.00', 'http://127.0.0.1:3000/public/images/p1d01.png', '2021-05-01 10:25:02', '2021-04-30 19:58:28', '1');
INSERT INTO `product_detail` VALUES ('2', '8GB+128GB（夏日胡杨）', '3', '5999.00', '4999.00', 'http://127.0.0.1:3000/public/images/p1d02.png', '2021-05-01 10:25:07', '2021-04-30 19:57:58', '1');
INSERT INTO `product_detail` VALUES ('3', '8GB+256GB（陶瓷黑）', '0', '11999.00', '10999.00', 'http://127.0.0.1:3000/public/images/p2d01.png', '2021-05-01 10:25:15', '2021-04-28 14:30:59', '2');
INSERT INTO `product_detail` VALUES ('4', '8GB+256GB（陶瓷白）', '94', '11999.00', '10999.00', 'http://127.0.0.1:3000/public/images/p2d02.png', '2021-05-01 10:25:21', '2021-04-30 19:57:59', '2');
INSERT INTO `product_detail` VALUES ('5', '钛金灰', '997', '5688.00', '4688.00', 'http://127.0.0.1:3000/public/images/p3d01.png', '2021-05-02 22:31:49', '2021-05-02 22:31:50', '3');
INSERT INTO `product_detail` VALUES ('6', '黑色运动式 GPS版 性价比之选', '10', '1499', '1399', 'http://127.0.0.1:3000/public/images/p4d01.jpg', '2021-05-02 22:31:50', '2021-05-02 22:31:51', '4');
INSERT INTO `product_detail` VALUES ('7', '白色运动式 GPS版 性价比之选', '10', '1499', '1399', 'http://127.0.0.1:3000/public/images/p4d02.jpg', '2021-05-02 22:31:53', '2021-05-02 22:31:53', '4');
INSERT INTO `product_detail` VALUES ('8', '黑色运动式 NIKE GPS+蜂窝网络版', '10', '2599', '2299', 'http://127.0.0.1:3000/public/images/p4d03.jpg', '2021-05-01 11:08:43', '2021-05-01 10:54:59', '4');
INSERT INTO `product_detail` VALUES ('9', '深空黑米兰尼斯 GPS+蜂窝版', '10', '5599', '5599', 'http://127.0.0.1:3000/public/images/p4d04.png', '2021-05-01 10:56:32', '2021-05-01 10:56:35', '4');
INSERT INTO `product_detail` VALUES ('10', '黑色运动式NIKEGPS版性价比之选', '10', '1899', '1699', 'http://127.0.0.1:3000/public/images/p4d05.jpg', '2021-05-01 15:45:44', '2021-05-01 15:45:45', '4');
INSERT INTO `product_detail` VALUES ('11', '8GB+256GB(陶瓷黑)', '10', '5999', '5999', 'http://127.0.0.1:3000/public/images/p5d01.jpg', '2021-05-02 22:58:44', '2021-05-02 22:58:45', '5');
INSERT INTO `product_detail` VALUES ('12', '8GB+256GB(陶瓷白)', '10', '5999', '5999', 'http://127.0.0.1:3000/public/images/p5d02.jpg', '2021-05-02 14:07:57', '2021-05-01 14:15:57', '5');
INSERT INTO `product_detail` VALUES ('13', '8GB+128GB(緑野仙踪)', '9', '3999', '3796', 'http://127.0.0.1:3000/public/images/p6d01.jpg', '2021-05-03 11:14:42', '2021-05-02 23:09:34', '6');
INSERT INTO `product_detail` VALUES ('14', '8GB+128GB( 流光幻镜)', '10', '3999', '3899', 'http://127.0.0.1:3000/public/images/p6d02.jpg', '2021-05-01 14:23:56', '2021-05-01 14:23:45', '6');
INSERT INTO `product_detail` VALUES ('15', '黑色', '5', '1599', '1399', 'http://127.0.0.1:3000/public/images/p7d01.jpg', '2021-05-03 14:25:27', '2021-05-03 14:25:28', '7');
INSERT INTO `product_detail` VALUES ('16', '石墨黑', '10', '189', '169', 'http://127.0.0.1:3000/public/images/p8d01.jpg', '2021-05-01 14:31:05', '2021-05-01 14:30:13', '8');
INSERT INTO `product_detail` VALUES ('17', '4GB+64GB(香槟金)', '0', '2199', '2149', 'http://127.0.0.1:3000/public/images/p9d01.png', '2021-05-01 15:44:56', '2021-05-04 16:22:37', '9');
INSERT INTO `product_detail` VALUES ('18', '4GB+64GB(幻影蓝)', '10', '2199', '2149', 'http://127.0.0.1:3000/public/images/p9d02.png', '2021-05-01 14:42:16', '2021-05-01 14:41:10', '9');
INSERT INTO `product_detail` VALUES ('19', '6GB+128GB(贝母白)', '9', '2299', '2249', 'http://127.0.0.1:3000/public/images/p10d01.png', '2021-05-01 14:45:00', '2021-05-04 17:05:19', '10');
INSERT INTO `product_detail` VALUES ('20', '6GB+128GB(夜阑灰)', '8', '2299', '2249', 'http://127.0.0.1:3000/public/images/p10d02.png', '2021-05-02 23:09:45', '2021-05-04 17:05:23', '10');
INSERT INTO `product_detail` VALUES ('21', '6GB+64GB WiFi（香槟金）', '10', '2999', '2399', 'http://127.0.0.1:3000/public/images/p11d01.png', '2021-05-01 14:55:43', '2021-05-01 14:55:45', '11');
INSERT INTO `product_detail` VALUES ('22', '6GB+64GB WiFi（银钻灰）', '10', '2999', '2399', 'http://127.0.0.1:3000/public/images/p11d02.png', '2021-05-01 14:56:33', '2021-05-01 14:56:35', '11');
INSERT INTO `product_detail` VALUES ('23', '8GB+256GB 全网通（青山黛）', '10', '5299', '5249', 'http://127.0.0.1:3000/public/images/p12d01.png', '2021-05-01 15:00:08', '2021-05-01 15:00:10', '12');
INSERT INTO `product_detail` VALUES ('24', '8GB+256GB 全网通（丹霞橙）', '10', '5299', '5249', 'http://127.0.0.1:3000/public/images/p12d02.png', '2021-05-01 15:00:49', '2021-05-01 15:00:52', '12');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(254) NOT NULL,
  `password` varchar(254) NOT NULL,
  `email` varchar(254) NOT NULL,
  `avatar` varchar(254) NOT NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'jack', '123', 'jack@163.com', 'http://127.0.0.1:3000/public/images/avatar.jpg', '2021-05-01 15:43:56', '2021-04-20 07:29:07');
INSERT INTO `user` VALUES ('2', 'tan', '123', 'tan@163.com', 'http://127.0.0.1:3000/public/images/avatar.jpg', '2021-05-01 15:44:12', '2021-04-20 07:30:09');
INSERT INTO `user` VALUES ('3', '哈哈', '123', 'haha@163.com', 'http://127.0.0.1:3000/public/images/avatar.jpg', '2021-05-01 15:44:29', '2021-04-20 07:34:25');
