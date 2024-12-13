<template>
  <div class="main">
    <NavBar></NavBar>
    <div class="chat_wrap">
      <div class="chat_box">
        <router-view v-slot="{ Component, route }">
          <transition appear name="fade-transform" mode="out-in">
            <keep-alive v-if="route.meta.keepAlive" :include="includeList">
              <component :is="Component" :key="route.path" />
            </keep-alive>
            <component :is="Component" :key="route.path" v-else />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from "../navBar/index.vue";
import { useRouter } from "vue-router";
const router = useRouter();
let includeList = router
  .getRoutes()
  .filter((item) => item.meta.keepAlive)
  .map((mapItem) => {
    return mapItem.name;
  });
console.log("includeList ==> ", includeList, router.getRoutes());
</script>

<style lang="scss" scoped>
.main {
  flex: 1;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
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
  .chat_wrap {
    display: flex;
    flex: 1;
    padding: 10px;
    box-sizing: border-box;

    .chat_box {
      flex: 1;
      height: 100%;
      padding: 10px;
      box-sizing: border-box;
      min-width: 910px;
      flex-shrink: 0;
      background: #e9ecef;
      border-radius: 12px;
      display: flex;
      .chat_dialog {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        .chat_dialog_head {
          border-radius: 12px 2px 2px 2px;
          background-color: #fff;
          box-shadow: 0 10px 30px -10px #200e3229;
          .inner_ {
            display: flex;
            height: 60px;
            padding-left: 10px;
            .start_ {
              align-self: center;
              flex-shrink: 0;
              .headimg_ {
                background-color: #e9ecef;
                border: 2px solid #ced4da;
                border-radius: 50%;
                cursor: pointer;
                height: 42px;
                overflow: hidden;
                width: 42px;
              }
            }
            .center_ {
              align-self: center;
              line-height: 1.2;
              padding-left: 10px;
              .nickname_ {
                color: #1d1e20;
                font-size: 16px;
                font-weight: 600;
                white-space: nowrap;
                span {
                  color: #778898;
                  display: inline-block;
                  font-size: 12px;
                  font-weight: 400;
                  padding-left: 5px;
                }
              }
              .desc_ {
                color: #778898;
                font-size: 12px;
              }
            }
          }
        }
        .chat_dialog_main {
          background-color: #fff;
          box-shadow: 0 10px 30px -10px #200e3229;
          flex: 1;
          margin-top: 10px;
          padding: 10px 0;
          .inner_ {
            height: 100%;
            overflow-x: hidden;
            overflow-y: auto;
            .msg_content {
              display: flex;
              padding: 10px;
            }
            .system_tip {
              justify-content: center;
              .tip_wrap {
                background: #0000001a;
                border-radius: 5px;
                padding: 5px 10px 2px;
                .text_original {
                  padding-bottom: 3px;
                  word-wrap: break-word;
                  color: #1d1e20;
                  font-size: 13px;
                  line-height: 1.25;
                  min-width: 20px;
                  overflow-wrap: break-word;
                  -webkit-user-select: text;
                  user-select: text;
                  white-space: pre-wrap;
                  word-break: break-word;
                }
              }
            }
            .left_ {
              flex-direction: row;
              .start_ {
                align-self: start;
                flex-shrink: 0;
                .headimg_ {
                  background-color: #e9ecef;
                  border-radius: 5px;
                  cursor: pointer;
                  height: 40px;
                  overflow: hidden;
                  width: 40px;
                }
              }
              .center_ {
                padding-left: 10px;
                align-self: start;
                display: flex;
                flex-direction: column;
                max-width: 72%;
                .title_ {
                  align-self: flex-start;
                  display: flex;
                  height: 20px;
                  .name_ {
                    align-self: center;
                    color: #1d1e20;
                    font-size: 14px;
                    font-weight: 500;
                  }
                }
                .msg_wrap {
                  flex-direction: row;
                  align-items: flex-end;
                  display: flex;
                  .msg_box {
                    align-self: flex-start;
                    background: #ced4da;
                    border-bottom-left-radius: 6px;
                    border-bottom-right-radius: 6px;
                    border-top-right-radius: 6px;
                    color: #1d1e20;
                    margin-top: 5px;
                    min-height: 40px;
                    box-sizing: border-box;
                    padding: 10px;
                    position: relative;
                    .text_original {
                      padding-bottom: 3px;
                      word-wrap: break-word;
                      font-size: 14px;
                      line-height: 1.25;
                      min-width: 20px;
                      overflow-wrap: break-word;
                      -webkit-user-select: text;
                      user-select: text;
                      white-space: pre-wrap;
                      word-break: break-word;
                    }
                  }

                  .msg_ext {
                    display: flex;
                    flex-direction: row;
                    padding-left: 10px;
                    .time_ {
                      color: #778898;
                      font-size: 12px;
                      padding: 2px 0;
                      white-space: nowrap;
                    }
                    .read_ {
                      color: #778898;
                      font-size: 12px;
                      padding: 2px 0;
                      padding-left: 5px;
                      white-space: nowrap;
                    }
                  }
                }
              }
            }
            .right_ {
              flex-direction: row-reverse;
              display: flex;
              padding: 10px;
              .start_ {
                align-self: start;
                flex-shrink: 0;
                .headimg_ {
                  background-color: #e9ecef;
                  border-radius: 5px;
                  cursor: pointer;
                  height: 40px;
                  overflow: hidden;
                  width: 40px;
                }
              }
              .center_ {
                align-self: start;
                display: flex;
                flex-direction: column;
                max-width: 72%;
                padding-right: 10px;
                .title_ {
                  display: flex;
                  height: 20px;
                  align-self: flex-end;
                  .name_ {
                    align-self: center;
                    color: #1d1e20;
                    font-size: 14px;
                    font-weight: 500;
                  }
                }

                .msg_wrap {
                  align-items: flex-end;
                  display: flex;
                  flex-direction: row-reverse;
                  .msg_box {
                    align-self: flex-end;
                    background: #6f50ff;
                    border-bottom-left-radius: 6px;
                    border-bottom-right-radius: 6px;
                    border-top-left-radius: 6px;
                    color: #fff;
                    margin-top: 5px;
                    min-height: 40px;
                    box-sizing: border-box;
                    padding: 10px;
                    position: relative;
                    .text_original {
                      padding-bottom: 3px;
                      word-wrap: break-word;
                      font-size: 14px;
                      line-height: 1.25;
                      min-width: 20px;
                      overflow-wrap: break-word;
                      -webkit-user-select: text;
                      user-select: text;
                      white-space: pre-wrap;
                      word-break: break-word;
                    }
                  }
                  .msg_ext {
                    flex-direction: row-reverse;
                    padding-right: 10px;
                    display: flex;
                    .time_ {
                      color: #778898;
                      font-size: 12px;
                      padding: 2px 0;
                      white-space: nowrap;
                    }
                  }
                }
              }
            }
          }
        }
        .chat_dialog_footer {
          background-color: #fff;
          border-radius: 2px 2px 2px 12px;
          box-shadow: 0 10px 30px -10px #200e3229;
          height: 180px;
          margin-top: 10px;
          .actions_ {
            display: flex;
            height: 40px;
            padding: 5px 10px 0;
            .start_ {
              align-items: center;
              display: flex;
              flex-grow: 1;
              .send_text_drawer,
              .send_photo_drawer {
                cursor: pointer;
                display: flex;
                height: 30px;
                padding: 5px;
                -webkit-user-select: none;
                user-select: none;
                .el-tooltip__trigger {
                  display: flex;
                  align-items: center;
                  .title_ {
                    align-self: center;
                    color: #778898;
                    font-size: 13px;
                    padding-left: 2px;
                    transition: color 0.3s ease 0s;
                    white-space: nowrap;
                  }
                }
              }
            }
            .end_ {
              align-items: center;
              display: flex;
              .translate_switch {
                display: flex;
                height: 30px;
                padding: 5px;
                box-sizing: border-box;
                -webkit-user-select: none;
                user-select: none;
                align-items: center;
                .icon_ {
                  height: 20px;
                  width: 20px;
                  img {
                    width: 100%;
                    height: 100%;
                    transform: scale(0.85);
                  }
                }

                .action_switch {
                  border: 1px solid #ced4da;
                  border-radius: 2px;
                  color: #778898;
                  cursor: pointer;
                  font-size: 13px;
                  height: 20px;
                  line-height: 18px;
                  margin-left: 2px;
                  text-align: center;
                  transition: color 0.3s ease 0s;
                  -webkit-user-select: none;
                  user-select: none;
                  width: 20px;
                  &.rec_ {
                    border-color: #0ea9e9 !important;
                    color: #0ea9e9 !important;
                  }
                  &.send_ {
                    border-color: #5e72e4 !important;
                    color: #5e72e4 !important;
                  }
                }
              }
            }
          }
          .input_wrap {
            height: 90px;
            padding: 0 10px;
            position: relative;
            .paperview-input-text {
              -webkit-appearance: none;
              background-color: #fff;
              background-image: none;
              border-radius: 4px;
              border: 0px !important;
              width: 82%;
              padding: 10px;
              height: 60px;
              outline: none;
              resize: none;
              &:focus-visible {
                border: 0px !important;
              }
              &:focus {
                border: 0px !important;
              }
            }
          }
        }
      }
      .chat_quick {
        flex-shrink: 0;
        height: 100%;
        padding-left: 10px;
        width: 320px;
        .chat_quick_inner {
          height: 100%;
          .chat_quick_center {
            background-color: #fff;
            border-radius: 2px 2px;
            box-shadow: 0 10px 30px -10px #200e3229;
            height: calc(100% - 210px);
            overflow-x: hidden;
            overflow-y: auto;
            padding: 10px;
            display: flex;
            flex-direction: column;
            .title_ {
              color: #778898;
              font-size: 12px;
              padding: 0 0 10px;
            }
            .meno_list {
              flex: 1;
              overflow-x: hidden;
              overflow-y: auto;
              .meno_item {
                word-wrap: break-word;
                background: #e9ecef;
                border-radius: 3px;
                color: #1d1e20;
                font-size: 14px;
                line-height: 1.25;
                overflow-wrap: break-word;
                padding: 10px;
                -webkit-user-select: text;
                user-select: text;
                white-space: pre-wrap;
                word-break: break-word;
              }
            }
            .meno_ctrl {
              .input_wrap {
                .paperview-input-text {
                  -webkit-appearance: none;
                  background-color: #fff;
                  background-image: none;
                  border-radius: 4px;
                  width: 100%;
                  padding: 10px;
                  border-color: rgb(177, 187, 196);
                  box-sizing: border-box;
                  height: 80px;
                  outline: none;
                  resize: none;
                }
              }
            }
          }
          .chat_quick_end {
            background-color: #fff;
            box-shadow: 0 10px 30px -10px #200e3229;
            padding: 10px;
            border-radius: 2px 2px 12px 2px;
            height: 180px;
            margin-top: 10px;
            box-sizing: border-box;
            .title_ {
              color: #778898;
              font-size: 12px;
              padding-bottom: 5px;
            }
            .info_wrap {
              align-items: center;
              display: flex;
              .start_ {
                .headimg_ {
                  background-color: #e9ecef;
                  border: 2px solid #ced4da;
                  border-radius: 50%;
                  cursor: pointer;
                  height: 50px;
                  overflow: hidden;
                  width: 50px;
                }
              }
              .center_ {
                padding-left: 10px;
                .nickname_ {
                  color: #1d1e20;
                  font-size: 16px;
                  font-weight: 600;
                  padding-bottom: 3px;
                }
                .desc_ {
                  color: #778898;
                  font-size: 12px;
                }
              }
            }

            .ext_info_wrap {
              padding-top: 10px;
              .item_ {
                border-bottom: 1px solid #ecedf5;
                display: flex;
                justify-content: space-between;
                padding: 6px 10px;
                .title_ {
                  color: #778898;
                  font-size: 12px;
                  font-weight: 500;
                  padding-bottom: 0;
                }
                .content_ {
                  color: #1d1e20;
                  font-size: 12px;
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
