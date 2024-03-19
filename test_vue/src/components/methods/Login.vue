<template>
  <div class="background-image-container">
    <div class="logo" style="margin-top:100px">
      <img src="/backHXN_logo2.png" alt="" style="width: 100%;height: auto; display: block;">
    </div>
    <div class="search-container">
      <h1>数字资源服务平台</h1>
      <div class="header-l">
        <ul>
          <li  @click="changeTab('t1')">
            <span :class="whichTitle == 't1' ? 'active' : 'normal'">
              <span style="margin-left:20px">账号登录</span>
            </span>
          </li>
          <li  @click="changeTab('t2')">
            <span :class="whichTitle == 't2' ? 'active' : 'normal'">验证码登录</span>
          </li>
          <li  @click="changeTab('t3')">
            <span :class="whichTitle == 't3' ? 'active' : 'normal'">地区平台</span>
          </li>
        </ul>
      </div>
      <div style="text-align: left;">
        <div style="margin-top: 20px; margin-bottom: 10px;">
          <span style="color:red;text-align: left; ">*&nbsp;</span>账号
        </div>
        <el-input v-model="username" placeholder="请输入用户名/手机号/邮箱/证件号码"></el-input>
        <div style="margin-top: 20px; margin-bottom: 10px;">
          <span style="color:red;">*&nbsp;</span>密码
        </div>
        <el-input placeholder="请输入密码" v-model="password" show-password></el-input>

        <el-tooltip class="item" effect="light" content-class="custom-content" placement="right-start">
          <span slot="content">
            <img src="/QRCode.png" style="width:100px;height:100px" alt="二维码">
          </span>
          <div style="cursor: pointer;text-align: right; margin-top: 20px; margin-bottom: 20px; font-size:12px;">联系教师服务顾问，开通专属平台账号</div>
        </el-tooltip>

        <el-button type="primary" @click="loginHandler">登 录</el-button>
      </div>
    </div>
    <div class="my-font"> &copy;111111111111111</div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'LoginIndex2',
  data () {
    return {
      isOpen: false,
      type: 'password',
      loginLoading: false,

      /* 1111111111111111111111111 */
      username: '',
      password: '',
      showImg: false,
      whichTitle: 't1'

    };
  },
  mounted () {},
  methods: {
    async loginHandler () {
      if (!this.username || !this.password) {
        this.$message('请填写账号密码！');
        return;
      }
      await Account.login({
        username: this.username.trim(),
        password: this.password.trim()
      });
      const user = await Account.own();
      if (!user.orgs[0]) {
        return this.$message.error('该账号没有企业，请联系负责人！');
      }
      if (this.$teacherENV && !this.$store.getters['orgUsers/isTeacher']) {
        this.$message.error('该账号没有教师权限，禁止登入！');
        return;
      }
      Vue.prototype.$user = user;
      if (this.$teacherENV) {
        await this.$router.push('/teacher');
      } else {
        await this.$router.push('/');
      }
      this.$message.success('登入成功');
    },
    /* 1111111111111111111111111 */
    showImgHover () {
      console.log(123);
      this.showImg = true;
    },
    loginTo () {
      console.log(this.username);
      console.log(this.password);
    },
    changeTab (title) {
      this.whichTitle = title;
    },
  }
};
</script>

<style lang="scss" scoped>
body {
    font-family: Arial, sans-serif;
}
.background-image-container {
  /* 设置背景图片 */
  background-image: url('/backHXN.jpg');
  // background-size: cover;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100%;

  position: relative;
}
.logo {
  position: absolute;
  top: 0;
  left: 0;
  width: 20%;
  min-width: 150px;
  height: auto;
}
.search-container {
  width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  background-color: rgb(246, 246, 246);
  // margin-top: 10%;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: 9999;
  }

  .my-font {
  text-align: center;
  font-size: 14px;
  color: #999;
  position: absolute;
  top: 98%;
  left: 50%;
  transform: translate(-50%, -50%);
}

h1 {
  margin-bottom: 20px;
  letter-spacing: 2px;
}
.header-l{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.header-l ul{
  display: flex;
  height: 50px;
}
.header-l ul li {
  margin-right: 79px;
  font-size: 16px;
  line-height: 50px;
  font-weight: 500;
  cursor: pointer;
}
.active{
  position: relative;
  color: #297fff;
}
.active:after{
  content: '';
  position: absolute;
  bottom: -20px;
  left: 0;
  width: 140%;
  height: 3px;
  // margin-left: -20%;
  background: #297fff;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>
