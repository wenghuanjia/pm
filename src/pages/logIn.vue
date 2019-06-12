<template>
  <div class="login">
    <!-- <div class="from">
            <div class="container">
                <el-row :gutter="20">
                <el-col :span="8" :offset="8">
                    <el-row>
                        <h1 class="h1">项目管理系统</h1>
                    </el-row>
                    <el-row>
                        <el-input type="text" placeholder="请输入账号" v-model="account"></el-input>
                    </el-row>
                    <el-row>
                        <el-input type="password" placeholder="请输入密码" v-model="pass"></el-input>
                    </el-row>
                    <el-row>
                    <el-button type="primary" style="display: block;width: 100%;" @keyup.enter="submitForm()" @click="submitForm()">登录</el-button>
                    </el-row>
                </el-col>
                </el-row>
            </div>
    </div>-->
    <div class="login_m">
      <div class="login_logo">
        <!-- <img src="../images/banner.png" width="196" height="46" alt=""> -->
      </div>
      <div class="login_logo">
        <h1 class="h1">项目管理系统</h1>
      </div>
      <div class="login_boder">
        <div class="login_padding">
          <h2>用户名</h2>
          <label>
            <input type="text" id="username" class="txt_input txt_input2" v-model="account">
          </label>
          <h2>密码</h2>
          <label>
            <input type="password" name="textfield2" id="userpwd" class="txt_input" v-model="pass">
          </label>
          <div class="rem_sub">
            <el-button type="primary" @keyup.enter="submitForm()" @click="submitForm()">登录</el-button>
          </div>
        </div>
      </div>
      <!--login_boder end-->
    </div>
  </div>
</template>

<script>
import { login } from "service/getData.js";
import { setStore, getStore } from "common/common.js";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      account: "", // 账号
      pass: "" // 密码
    };
  },
  created() {
    var account = getStore("account");
    this.account = account ? account : "";
  },
  methods: {
    ...mapMutations(["RECORD_USERINFO"]),
    // 登录
    submitForm() {
      var self = this;
      login({
        username: this.account,
        password: this.pass,
        device_type: "wxapp"
      }).then(res => {
        this.$message({
          message: "登录成功!",
          type: "success"
        });
        setStore("account", this.account);
        this.RECORD_USERINFO(res);
        this.$router.push({ path: "/index" });
      });
    }
  }
};
</script>

<style scoped lang="less">
.login {
  // background: url("../images/login_bgx.gif");
  background: url('http://demo1.mycodes.net/denglu/disanfanglogin/images/bg-01.jpg') no-repeat;
  // background-size: 100% 100%;
  background-size: cover;
  height: 100%;
  min-width: 1200px;
  overflow: hidden;
  .from {
    margin-top: 180px;
    .container {
      width: 1200px;
      margin: 0 auto;
      .h1 {
        text-align: center;
      }
      .el-row {
        margin-bottom: 20px;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}
.login_m {
    width: 403px;
    margin: 0 auto;
    height: 375px;
    // transform: translateY(50%);
    margin-top: 98px;
    .login_logo {
        text-align: center;
        margin-bottom: 25px;
    }
    .login_boder {
        // transform: translateY(50%);
        background: url('../images/login_m_bg.png') no-repeat;
        height: 302px;
        overflow: hidden;
        .login_padding {
            padding: 28px 47px 20px 47px;
            h2 {
                color: #4f5d80;
                text-transform: uppercase;
                font-size: 12px;
                font-weight: normal;
                margin-bottom: 11px;
            }
            input.txt_input2 {
                margin-bottom: 20px;
            }
            input.txt_input {
                width: 295px;
                height: 36px;
                border: 1px solid #cad2db;
                // background: url(../images/txt_input_bg.gif) no-repeat;
                padding: 0 5px;
                -moz-border-radius: 5px;
                -webkit-border-radius: 5px;
                border-radius: 5px;
                line-height: 36px;
                margin-bottom: 10px;
                font-size: 14px;
                color: #717171;
                font-family: Arial;
            }
            .rem_sub {
                text-align: center;
            }
        }
    }
}
.login_boder input.txt_input:focus {
    transition: border linear .2s,box-shadow linear .2s;
    -moz-transition: border linear .2s,-moz-box-shadow linear .2s;
    -webkit-transition: border linear .2s,-webkit-box-shadow linear .2s;
    outline: none;
    border-color: rgba(173,173,173.75);
    box-shadow: 0 0 8px rgba(173,173,173,.5);
    -moz-box-shadow: 0 0 8px rgba(173,173,173,.5);
    -webkit-box-shadow: 0 0 8px rgba(173, 173, 173, 1);
    border: 1px solid #6192c8;
}

</style>