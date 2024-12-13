<template>
  <!-- 头部 -->
  <div class="topbar__">
    <div class="topbar_warp">
      <div class="start_">
        <div class="start_head">
          <div>{{ userStore.router.title }}</div>
          <div
            class="subject_"
            style="color: #778898; font-size: 12px; padding-top: 7px"
          >
            Let's talk about your project
          </div>
        </div>
        <!-- <div class="start_chat">
          <div class="list_">
            <div class="item_">
              <div class="title_">今日进粉</div>
              <div class="value">0</div>
            </div>

            <div class="item_">
              <div class="title_">今日单号平均</div>
              <div class="value">0</div>
            </div>
          </div>
        </div> -->
      </div>
      <div class="end_">
        <div class="userinfo_wrap">
          <div class="headimg_">
            <el-image
              src="https://fs.tgzai.com/images/2024/05/05/cor6dfo51g3s72pja1o0.jpeg"
              style="width: 100%; height: 100%"
              alt=""
            />
          </div>
          <div class="username_">laotao1-wtg003</div>
          <el-dropdown trigger="click" @command="handleCommand"
            ><el-icon><ArrowDown /></el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item style="pointer-events: none"
                  >登录记录</el-dropdown-item
                >
                <el-dropdown-item command="outLogin">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import { useUserInfo } from "@/store/index.js";
const userStore = useUserInfo();

const handleCommand = (command) => {
  console.log("123");
  if (command === "outLogin") {
    outLogin();
  }
};

const outLogin = () => {
  console.log("456");
  userStore.$reset();

  router.push("/login");
};
</script>

<style lang="scss" scoped>
.topbar__ {
  width: 100%;
  .topbar_warp {
    width: 100%;
    display: flex;
    height: 60px;
    justify-content: space-between;
    .start_ {
      width: 100%;
      display: flex;
      .start_head {
        width: 300px;
        box-sizing: border-box;
        height: 50px;
        padding: 10px;
        color: #1d1e20;
        font-size: 20px;
        font-weight: 400;
        padding-bottom: 5px;
      }
      .start_chat {
        display: flex;
        height: 50px;
        flex: 1;
        .list_ {
          padding: 10px 10px 0;
          box-sizing: border-box;
          .item_ {
            border-radius: 3px;
            display: inline-flex;
            padding: 10px;
            background: #5e72e40d;
            box-sizing: border-box;
            &:not(:last-child) {
              margin-right: 5px;
            }
            .title_ {
              align-self: center;
              color: #778898;
              font-size: 12px;
              padding-right: 5px;
              white-space: nowrap;
            }
            .value {
              color: #5e72e4;
              align-self: center;
              font-size: 16px;
              font-weight: 500;
              white-space: nowrap;
            }
          }
        }
      }
    }
    .end_ {
      align-self: center;
      background: #e9ecef;
      border-radius: 10px;
      margin-right: 10px;
      padding: 5px;
      .userinfo_wrap {
        background: #fff;
        border-radius: 8px;
        display: flex;
        padding: 6px 10px;
        align-items: center;
        .headimg_ {
          align-self: center;
          border-radius: 50%;
          box-shadow: 0 10px 30px -10px #200e3229;
          flex-shrink: 0;
          height: 28px;
          margin-right: 10px;
          overflow: hidden;
          width: 28px;
        }
        .username_ {
          align-self: center;
          color: #1d1e20;
          flex-grow: 1;
          font-size: 14px;
          font-weight: 500;
          margin-right: 10px;
          text-transform: capitalize;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
