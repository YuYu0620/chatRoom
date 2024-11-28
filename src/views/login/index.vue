<template>
  <div class="login">
    <div class="center_">
      <div class="left_">
        <div class="logo_">
          <img src="../../assets/favicon.png" alt="" />
        </div>
        <div class="title_">T客服台</div>
        <div class="tips_">要继续，请使用账号密码登录</div>
      </div>
      <div class="right_">
        <div class="title_">请登录</div>
        <div class="user">
          <el-input
            v-model="username"
            style="width: 268px"
            placeholder="账号"
            :prefix-icon="User"
            size="large"
          />
        </div>
        <div class="password">
          <el-input
            v-model="password"
            style="width: 268px"
            placeholder="密码"
            :prefix-icon="Lock"
            size="large"
          />
        </div>
        <div class="code">
          <el-input
            v-model="code"
            style="width: 268px"
            placeholder="验证码, 没有不填"
            :prefix-icon="CircleCheckFilled"
            size="large"
          />
        </div>
        <div class="" style="width: 268px; padding-top: 20px">
          <el-button
            type="primary"
            size="large"
            style="width: 100%"
            @click="login"
            >立即提交</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { User, Lock, CircleCheckFilled } from "@element-plus/icons-vue";
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { useUserInfo } from "../../store/index";

import { useRouter } from "vue-router";

const username = ref();
const password = ref();
const code = ref();

const userStore = useUserInfo();

const router = useRouter();

const login = () => {
  if (!username.value) {
    return ElMessage({
      type: "error",
      message: "请输入账号",
    });
  }
  if (!password.value) {
    return ElMessage({
      type: "error",
      message: "请输入密码",
    });
  }

  userStore.token = "123";

  console.log("userStore ===========> ", userStore.token);
  router.replace("/");
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(0deg, #e6e9f0 0, #eef1f5);
  display: flex;
  align-items: center;
  justify-content: center;
  .center_ {
    width: 700px;
    height: 400px;
    background: #fff;
    border-radius: 8px 0 0 8px;
    display: flex;
    .left_ {
      width: 300px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .logo_ {
        width: 75px;
        height: 75px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .title_ {
        color: #1d1e20;
        font-size: 20px;
        font-weight: 500;
        padding: 20px 0 0;
        text-align: center;
      }
      .tips_ {
        color: #778898;
        font-size: 14px;
        padding: 20px 0 0;
        text-align: center;
      }
    }
    .right_ {
      width: 400px;
      height: 100%;
      background-color: #f6f7fb;
      padding: 50px 66px 0;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      .title_ {
        color: #1d1e20;
        font-size: 20px;
        font-weight: 500;
        padding: 15px 0 10px;
        text-align: center;
      }
      .user,
      .password,
      .code {
        padding-top: 15px;
      }
    }
  }
}
</style>
