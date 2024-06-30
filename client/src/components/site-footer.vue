<template>
  <footer class="tan-site-footer">
    <ul class="tan-site-footer-top">
      <li>
        <img
          src="//yanxuan.nosdn.127.net/e6021a6fcd3ba0af3a10243b7a2fda0d.png"
          alt=""
        />
        <span>30天无忧退换货</span>
      </li>
      <li>
        <img
          src="//yanxuan.nosdn.127.net/e09c44e4369232c7dd2f6495450439f1.png"
          alt=""
        />
        <span>满88元免邮费</span>
      </li>
      <li>
        <img
          src="//yanxuan.nosdn.127.net/e72ed4de906bd7ff4fec8fa90f2c63f1.png"
          alt=""
        />
        <span>XX品质保证</span>
      </li>
    </ul>
    <div class="tan-site-footer-bottom">
      <ul>
        <li>关于我们</li>
        <li>帮助中心</li>
        <li>售后服务</li>
        <li>配送与验收</li>
        <li>商务合作</li>
        <li>企业采购</li>
        <li>开放平台</li>
        <li>搜索推荐</li>
        <li>友情链接</li>
      </ul>
      <p>XX公司版权所有 © 1996-2018 食品经营许可证：XXXXXXXXXXXXXXXXX</p>
    </div>
  </footer>
</template>

<style>
.tan-site-footer {
  height: 230px;
  background-color: #414141;
  color: white;
  overflow: hidden;
}

.tan-site-footer-top {
  display: flex;
  padding: 36px 0;
  border-bottom: 1px solid #4f4f4f;
}

.tan-site-footer-top > li {
  display: flex;
  width: 33%;
  height: 60px;
  justify-content: center;
  align-items: center;
}

.tan-site-footer-top > li > span {
  vertical-align: middle;
  font-size: 18px;
  margin-left: 10px;
}

.tan-site-footer-top > img {
  vertical-align: middle;
}

.tan-site-footer-bottom {
  color: #aaa;
  font-size: 13px;
  text-align: center;
  margin-top: 30px;
}

.tan-site-footer-bottom > ul > li {
  display: inline-block;
  cursor: pointer;
  padding: 0 6px;
  border-right: 2px solid #aaa;
}

.tan-site-footer-bottom > ul > li:last-child {
  border-right: none;
}

.tan-site-footer-bottom > p {
  margin: 5px;
}
</style>
