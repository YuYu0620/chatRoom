<template>
  <div class="side">
    <div class="start">
      <!-- logo -->
      <div class="sidebar_head">
        <img src="../../assets/favicon.png" class="logo" alt="" />
      </div>

      <!-- 菜单 -->
      <div class="sidebar_main">
        <div class="menu_wrap">
          <div
            class="item"
            @click="sidebarClick(subItem)"
            :style="{
              opacity: userStore.router.sidebar === subItem.meta.name ? 1 : 0.6,
            }"
            v-for="subItem in menuList"
            :key="subItem.path"
          >
            <div class="item__icon">
              <el-icon
                :size="20"
                :color="
                  userStore.router.sidebar === subItem.meta.name
                    ? '#233cce'
                    : '#1d1e20'
                "
                ><component :is="subItem.meta.icon"></component
              ></el-icon>
            </div>
            <div
              class="item__text"
              :style="{
                fontWeight:
                  userStore.router.sidebar === subItem.meta.name
                    ? '600'
                    : '400',
              }"
            >
              {{ subItem.meta.title }}
            </div>
          </div>
        </div>
      </div>

      <!-- 个人信息按钮 -->
      <div class="sidebar_footer">
        <el-dropdown
          placement="top-start"
          trigger="click"
          @command="handleCommand"
        >
          <div class="userinfo_wrap">L</div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item style="pointer-events: none"
                >用户名：123123123</el-dropdown-item
              >
              <el-dropdown-item command="outLogin">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="end">
      <div class="menus_inner">
        <div class="title">{{ userStore.router.title }}</div>
        <div class="sidebar_chat_main">
          <!-- 对话归档 -->
          <div class="session_wrap">
            <div class="list_">
              <div
                :class="[
                  'item_',
                  userStore.router.active === item.name ? 'active' : '',
                ]"
                @click="itemsClick(item)"
                v-for="item in userStore.router.list"
                :key="item.path"
              >
                <div class="start_">
                  <el-icon :size="20" color="#485fe0"
                    ><component :is="item.meta.icon"></component
                  ></el-icon>
                </div>
                <div
                  class="center_"
                  :style="{
                    color:
                      userStore.router.active === item.name
                        ? '#1d1e20'
                        : '#778898',
                  }"
                >
                  {{ item.meta.title }}
                </div>
                <!-- <div class="total_">9</div> -->
              </div>
              <div class="dividing_"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import router from "@/router";
import { useUserInfo } from "@/store/index.js";

const userStore = useUserInfo();
const routerList = router.getRoutes();
const menuList = routerList.filter((item) => {
  console.log(item.meta.title, item.meta.isDetails);
  if (
    item.meta &&
    item.meta.title &&
    item.children.length > 0 // 必须有children
    // item.meta.root.includes(useStore.user.role) // 符合当前用户权限
  )
    return item;
});

if (!userStore.router.active) {
  // sidebar.value = menuList[0].meta.name;
  // list.value = menuList[0].children;
  // active.value = menuList[0].children[0].name;
  // title.value = menuList[0].children[0].meta.title;

  userStore.router.sidebar = menuList[0].meta.name;
  userStore.router.list = menuList[0].children;
  userStore.router.active = menuList[0].children[0].name;
  userStore.router.title = menuList[0].children[0].meta.title;
  userStore.router.path = menuList[0].children[0].path;

  router.push(menuList[0].children[0].path);
}

const sidebarClick = (event) => {
  // sidebar.value = event.meta.name;
  // list.value = event.children;
  // active.value = event.children[0].name;
  // title.value = event.children[0].meta.title;

  userStore.router.sidebar = event.meta.name;
  userStore.router.list = event.children;
  userStore.router.active = event.children[0].name;
  userStore.router.title = event.children[0].meta.title;

  itemsClick(userStore.router.list[0]);
};

const itemsClick = (event) => {
  userStore.router.active = event.name;
  userStore.router.path = event.path;
  userStore.router.title = event.meta.title;
  router.push(event.path);
};

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
.side {
  width: 340px;
  height: 100%;
  display: flex;
  background-color: #e9ecef;
  border-radius: 12px;
  .start {
    width: 80px;
    display: flex;
    flex-direction: column;
    .sidebar_head {
      width: 80px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      .logo {
        width: 40px;
        height: 40px;
      }
    }
    .sidebar_main {
      width: 100%;
      flex: 1;
      .menu_wrap {
        padding: 10px;
        box-sizing: border-box;
        .item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          opacity: 0.6;
          width: 100%;
          height: 80px;
          border-bottom: 1px solid #ced4da;
          .item__icon {
            display: flex;
            justify-content: center;
          }
          .item__text {
            color: #1d1e20;
            font-size: 14px;
            padding-top: 10px;
          }
        }
      }
    }
    .sidebar_footer {
      width: 80px;
      height: 80px;
      padding-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      .userinfo_wrap {
        width: 42px;
        height: 42px;
        background-color: #9facb9;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #1d1e20;
        border-radius: 50%;
        cursor: pointer;
      }
    }
  }
  .end {
    width: 250px;
    padding: 10px 0px;
    box-sizing: border-box;
    .menus_inner {
      width: 100%;
      height: 100%;
      background-color: #fff;
      border-radius: 12px;
      padding-top: 10px;
      box-sizing: border-box;
      .title {
        width: 100%;
        padding: 0px 20px;
        box-sizing: border-box;
        height: 45px;
        line-height: 45px;
        color: #233cce;
        font-size: 20px;
      }

      .sidebar_chat_main {
        width: 100%;
        box-sizing: border-box;
        .session_wrap {
          width: 100%;
          padding: 20px 15px;
          box-sizing: border-box;
          max-height: 375px;
          .headbar_ {
            width: 100%;
            height: 30px;
            padding: 0 10px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .title_ {
              color: #1d1e20;
              font-size: 13px;
              font-weight: 500;
            }
            .headbar_icon {
              display: flex;
              justify-content: center;
            }
          }
          .list_ {
            .item_ {
              width: 100%;
              box-sizing: border-box;
              border-left: 2px solid #0000;
              border-radius: 0 3px 3px 0;
              cursor: pointer;
              display: flex;
              height: 40px;
              padding-left: 20px;
              padding-right: 20px;
              .start_ {
                align-self: center;
                display: flex;
                justify-content: center;
              }
              .center_ {
                align-self: center;
                font-size: 14px;
                font-weight: 500;
                padding-left: 10px;
                white-space: nowrap;
                flex: 1;
              }
              .total_ {
                align-self: center;
                border: 1px solid #0000;
                border-radius: 4px;
                color: #324cdd;
                flex-shrink: 0;
                font-size: 12px;
                font-weight: 500;
                line-height: 1;
                padding: 3px 6px;
                transform: scale(0.95);
                background-color: #5e72e41a;
                border-color: #5e72e41a;
              }
            }
            .active {
              background-color: #5e72e41a;
              border-left-color: #233cce;
            }

            .dividing_ {
              height: 40px;
              position: relative;
              &::after {
                background-color: #e9ecef;
                content: "";
                height: 1px;
                left: 0;
                position: absolute;
                right: 0;
                top: 20px;
                width: 100%;
              }
            }
          }
        }

        .group_wrap {
          width: 100%;
          padding: 10px 0px;
          .headbar_ {
            display: flex;
            height: 30px;
            padding: 0 10px;
            .title_ {
              align-self: center;
              color: #1d1e20;
              flex-grow: 1;
              font-size: 13px;
              font-weight: 500;
            }
          }
          .sidebar_chat_search {
            padding: 0 10px;
          }

          .list_ {
            padding: 0 10px;
            .total_ {
              width: 100%;
              height: 100%;
              text-align: right;
              font-size: 12px;
              font-weight: 500;
              padding: 3px 6px;
              line-height: 40px;
              transform: scale(0.95);
              color: #b1bbc4;
            }

            .accounts {
              padding-left: 10px;
              .item_ {
                border-left: 2px solid #e9ecef;
                border-radius: 0 3px 3px 0;
                cursor: pointer;
                display: flex;
                height: 46px;
                padding-left: 6px;
                .headimg_ {
                  align-self: center;
                  background-color: #e9ecef;
                  height: 36px;
                  position: relative;
                  width: 36px;
                  &::before {
                    background: #2dce89;
                    border: 2px solid #fff;
                    border-radius: 50%;
                    bottom: -2px;
                    box-shadow: 0 10px 30px -10px #200e3229;
                    content: "";
                    height: 12px;
                    position: absolute;
                    right: -2px;
                    width: 12px;
                    box-sizing: border-box;
                  }
                }
                .info_ {
                  align-self: center;
                  line-height: 1.2;
                  padding-left: 10px;
                  .nickname_ {
                    color: #1d1e20;
                    font-size: 14px;
                    font-weight: 500;
                    white-space: nowrap;
                  }
                  .detail_ {
                    color: #778898;
                    font-size: 12px;
                    white-space: nowrap;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
