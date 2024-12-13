<template>
  <div class="chatRoom">
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
                opacity:
                  userStore.router.sidebar === subItem.meta.name ? 1 : 0.6,
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
          <div class="title">聊天室</div>
          <div class="sidebar_chat_main">
            <!-- 对话归档 -->
            <div class="session_wrap">
              <div class="headbar_">
                <div class="title_">对话归档</div>
                <div class="headbar_icon">
                  <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                      <el-icon><ArrowDown /></el-icon>
                    </span>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item @click="dialogAddFile = true"
                          >创建归档</el-dropdown-item
                        >
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
              </div>
              <div class="list_">
                <el-dropdown trigger="contextmenu">
                  <div
                    :class="['item_', active === 1 ? 'active' : '']"
                    @click="active = 1"
                  >
                    <div class="start_">
                      <el-icon :size="20" color="#485fe0"><Folder /></el-icon>
                    </div>
                    <div class="center_">全部</div>
                    <div class="total_">9</div>
                  </div>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item @click="dialogAddFile = true"
                        >创建归档</el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>

                <el-dropdown trigger="contextmenu">
                  <div
                    :class="['item_', active === 2 ? 'active' : '']"
                    @click="active = 2"
                  >
                    <div class="start_">
                      <el-icon :size="20" color="#0d98d1"><Folder /></el-icon>
                    </div>
                    <div class="center_">对方已回</div>
                    <!-- <div class="total_">9</div> -->
                  </div>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item @click="dialogAddFile = true"
                        >创建归档</el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </div>

            <!-- 账号分组 -->
            <div class="group_wrap">
              <div class="headbar_">
                <div class="title_">账号分组</div>
              </div>
              <div class="sidebar_chat_search">
                <el-input
                  v-model="input2"
                  style="width: 100%"
                  placeholder="搜索账号"
                  :prefix-icon="Search"
                />
              </div>

              <div class="list_">
                <el-collapse>
                  <el-collapse-item name="1">
                    <template #title>
                      <el-checkbox
                        v-model="checked1"
                        label="未分组"
                        size="large"
                      />
                    </template>
                    <div class="accounts">
                      <div class="item_">
                        <div class="headimg_">
                          <img
                            src="https://fs.tgzai.com/images/2024/05/05/cor6dfo51g3s72pja1o0.jpeg"
                            alt=""
                            style="width: 100%; height: 100%"
                          />
                        </div>
                        <div class="info_">
                          <div class="nickname_">奇怪</div>
                          <div class="detail_">254737127639</div>
                        </div>
                      </div>
                    </div>
                  </el-collapse-item>
                  <el-collapse-item name="2">
                    <template #title>
                      <el-checkbox
                        v-model="checked1"
                        label="123123"
                        size="large"
                      />

                      <div class="total_">0</div>
                    </template>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main">
      <!-- 头部 -->
      <div class="topbar__">
        <div class="topbar_warp">
          <div class="start_">
            <div class="start_head">聊天对话</div>
            <div class="start_chat">
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
            </div>
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
                    <el-dropdown-item command="outLogin"
                      >退出登录</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </div>
      </div>
      <div class="chat_wrap">
        <div class="chat_menus">
          <div class="sidebar_menus_search">
            <el-input
              v-model="input2"
              style="width: 100%"
              placeholder="搜索"
              :prefix-icon="Search"
            />
          </div>
          <div class="chat_menus_tabs">
            <div class="tabs">
              <el-tabs
                v-model="activeName"
                class="demo-tabs"
                @tab-click="handleClick"
              >
                <el-tab-pane label="对话" name="1"></el-tab-pane>
                <el-tab-pane label="群聊" name="2" disabled></el-tab-pane>
                <el-tab-pane label="通讯录(0)" name="3" disabled></el-tab-pane>
              </el-tabs>
            </div>

            <div class="dropdown">
              <el-dropdown trigger="click">
                <span
                  class="el-dropdown-link"
                  style="
                    font-size: 12px;
                    display: inline-flex;
                    align-items: center;
                    cursor: pointer;
                  "
                >
                  {{ screenText }}
                  <el-icon class="el-icon--right" style="margin: 0" :size="12">
                    <arrow-down />
                  </el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="screenText = '全部'"
                      >全部</el-dropdown-item
                    >
                    <el-dropdown-item @click="screenText = '未阅读'"
                      >未阅读</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
          <div class="chat_menus_list">
            <div
              :class="['item_', menusActive == 1 ? 'active' : '']"
              @click="menusActive = 1"
            >
              <el-dropdown trigger="contextmenu" placement="bottom-end">
                <div class="inner_">
                  <div class="start_">
                    <div class="headimg_">
                      <el-image
                        src="https://fs.tgzai.com/images/2024/05/05/cor6dfo51g3s72pja1o0.jpeg"
                        style="width: 100%; height: 100%"
                        alt=""
                        :preview-src-list="[
                          'https://fs.tgzai.com/images/2024/05/05/cor6dfo51g3s72pja1o0.jpeg',
                        ]"
                      />
                    </div>
                  </div>
                  <div class="center_">
                    <div class="nickname_">Telegram</div>
                    <div class="recent_">我: 1</div>
                  </div>

                  <div class="end_">
                    <div class="time_">11:39</div>
                  </div>
                </div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="dialogSetFile = true"
                      >设置归档</el-dropdown-item
                    >
                    <el-dropdown-item>删除消息</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
            <div
              :class="['item_', menusActive == 2 ? 'active' : '']"
              @click="menusActive = 2"
            >
              <el-dropdown trigger="contextmenu" placement="bottom-end">
                <div class="inner_">
                  <div class="start_">
                    <div class="headimg_">
                      <el-image
                        src="https://fs.tgzai.com/images/2024/05/05/cor6dfo51g3s72pja1o0.jpeg"
                        style="width: 100%; height: 100%"
                        alt=""
                        :preview-src-list="[
                          'https://fs.tgzai.com/images/2024/05/05/cor6dfo51g3s72pja1o0.jpeg',
                        ]"
                      />
                    </div>
                  </div>
                  <div class="center_">
                    <div class="nickname_">Telegram</div>
                    <div class="recent_">我: 1</div>
                  </div>

                  <div class="end_">
                    <div class="time_">11:39</div>
                  </div>
                </div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="dialogSetFile = true"
                      >设置归档</el-dropdown-item
                    >
                    <el-dropdown-item>删除消息</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </div>
        <div class="chat_box">
          <div class="chat_dialog">
            <div class="chat_dialog_head">
              <div class="inner_">
                <div class="start_">
                  <div class="headimg_">
                    <el-image
                      src="https://fs.tgzai.com/images/2024/05/05/cor6dfo51g3s72pja1o0.jpeg"
                      style="width: 100%; height: 100%"
                      alt=""
                      :preview-src-list="[
                        'https://fs.tgzai.com/images/2024/05/05/cor6dfo51g3s72pja1o0.jpeg',
                      ]"
                    />
                  </div>
                </div>
                <div class="center_">
                  <div class="nickname_">
                    Telegram <span>手机号：123123123</span>
                    <span>用户名: 无</span>
                  </div>
                  <div class="desc_">当前在线</div>
                </div>

                <div class="end_"></div>
              </div>
            </div>
            <div class="chat_dialog_main">
              <el-scrollbar height="500px" ref="scrollbarRef">
                <div class="inner_">
                  <div
                    v-for="(item, index) in msgList"
                    :key="`msgList_${index}`"
                  >
                    <div
                      class="msg_content system_tip"
                      v-if="item.type === 'tip'"
                    >
                      <div class="tip_wrap">
                        <div class="text_original">11-27</div>
                      </div>
                    </div>
                    <div class="msg_content left_" v-if="item.type === 'left'">
                      <div class="start_">
                        <div class="headimg_">
                          <el-image
                            src="https://fs.tgzai.com/images/2024/05/05/cor6dfo51g3s72pja1o0.jpeg"
                            style="width: 100%; height: 100%"
                            alt=""
                            :preview-src-list="[
                              'https://fs.tgzai.com/images/2024/05/05/cor6dfo51g3s72pja1o0.jpeg',
                            ]"
                          />
                        </div>
                      </div>
                      <div class="center_">
                        <div class="title_">
                          <div class="name_">Telegram</div>
                        </div>
                        <div class="msg_wrap">
                          <div class="msg_box">
                            <el-dropdown
                              placement="bottom"
                              trigger="contextmenu"
                            >
                              <div class="text_original" style="color: #1d1e20">
                                {{ item.content }}
                              </div>
                              <template #dropdown>
                                <el-dropdown-menu>
                                  <el-dropdown-item @click="copy"
                                    >复制</el-dropdown-item
                                  >
                                  <el-dropdown-item>删除消息</el-dropdown-item>
                                </el-dropdown-menu>
                              </template>
                            </el-dropdown>
                          </div>
                          <div class="msg_ext">
                            <div class="time_">16:58:54</div>
                            <div class="read_">已阅</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="msg_content right_"
                      v-if="item.type === 'right'"
                    >
                      <div class="start_">
                        <div class="headimg_">
                          <el-image
                            src="https://fs.tgzai.com/images/2024/05/05/cor6dfo51g3s72pja1o0.jpeg"
                            style="width: 100%; height: 100%"
                            alt=""
                            :preview-src-list="[
                              'https://fs.tgzai.com/images/2024/05/05/cor6dfo51g3s72pja1o0.jpeg',
                            ]"
                          />
                        </div>
                      </div>
                      <div class="center_">
                        <div class="title_">
                          <div class="name_">奇怪</div>
                        </div>
                        <div class="msg_wrap">
                          <div class="msg_box">
                            <el-dropdown
                              placement="bottom"
                              trigger="contextmenu"
                            >
                              <div class="text_original" style="color: #fff">
                                {{ item.content }}
                              </div>
                              <template #dropdown>
                                <el-dropdown-menu>
                                  <el-dropdown-item @click="copy"
                                    >复制</el-dropdown-item
                                  >
                                  <el-dropdown-item>删除消息</el-dropdown-item>
                                </el-dropdown-menu>
                              </template>
                            </el-dropdown>
                          </div>
                          <div class="msg_ext">
                            <div class="time_">16:58:54</div>
                            <!-- <div class="read_">已阅</div> -->
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-scrollbar>
            </div>
            <div class="chat_dialog_footer">
              <div class="actions_">
                <div class="start_">
                  <div class="send_text_drawer">
                    <el-popover placement="top" :width="400" trigger="click">
                      <template #reference>
                        <div>
                          <el-icon :size="20" color="#778898"
                            ><Tickets
                          /></el-icon>
                          <span class="title_">文本</span>
                        </div>
                      </template>
                      <div class="drawer_main">
                        <div class="dhead_">
                          <div class="title_">文本素材</div>
                        </div>
                        <div class="dbody_">
                          <el-collapse
                            v-model="activeNames"
                            @change="handleChange"
                          >
                            <el-collapse-item title="fz001" name="1">
                              <div class="library_items">
                                <div class="item_wrap">
                                  <div class="start_">
                                    <div class="title_">test001</div>
                                    <div class="checkbox">
                                      <el-radio
                                        v-model="radio"
                                        value="radio"
                                      ></el-radio>
                                    </div>
                                  </div>
                                  <div class="center_">
                                    <div class="content_">test001</div>
                                  </div>
                                </div>
                              </div>
                            </el-collapse-item>
                            <el-collapse-item title="123" name="2">
                              <div class="library_items">
                                <div class="item_wrap">
                                  <div class="start_">
                                    <div class="title_">123</div>
                                    <div class="checkbox">
                                      <el-radio
                                        v-model="radio"
                                        value="radio"
                                      ></el-radio>
                                    </div>
                                  </div>
                                  <div class="center_">
                                    <div class="content_">123</div>
                                  </div>
                                </div>
                              </div>
                            </el-collapse-item>
                          </el-collapse>
                        </div>
                      </div>
                    </el-popover>
                  </div>
                  <div class="send_photo_drawer">
                    <el-popover placement="top" :width="400" trigger="click">
                      <template #reference>
                        <div>
                          <el-icon :size="20" color="#778898"
                            ><Picture
                          /></el-icon>
                          <span class="title_">图片</span>
                        </div>
                      </template>
                      <div class="drawer_main">
                        <div class="dhead_">
                          <div class="title_">图片素材</div>
                        </div>
                        <div class="dbody_">
                          <el-collapse
                            v-model="activeNames"
                            @change="handleChange"
                          >
                            <el-collapse-item title="infacegroup" name="1">
                              <div class="library_items">
                                <div class="item_wrap">
                                  <div class="start_">
                                    <div class="title_">test001</div>
                                    <div class="checkbox">
                                      <el-radio
                                        v-model="radio"
                                        value="radio"
                                      ></el-radio>
                                    </div>
                                  </div>
                                  <div class="center_">
                                    <div
                                      class="content_"
                                      style="text-align: center"
                                    >
                                      <img
                                        src="https://fs.tgzai.com/images/2024/11/27/ct38pfg51g3s7385e2gg.jpg"
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </el-collapse-item>
                          </el-collapse>
                        </div>
                      </div>
                    </el-popover>
                  </div>
                </div>
                <div class="end_">
                  <div class="translate_switch">
                    <div class="icon_">
                      <img src="../../assets/translate.png" alt="" />
                    </div>
                    <div class="dropdown">
                      <el-popover placement="top" :width="300" trigger="click">
                        <template #reference>
                          <div
                            style="
                              font-size: 12px;
                              color: #778898;
                              cursor: pointer;
                            "
                          >
                            阿拉伯语
                          </div>
                        </template>
                        <div class="translate_menu">
                          <div class="tbar_">
                            <div class="title_">接收消息翻译设置</div>
                          </div>
                          <div class="inner_">
                            <div class="title_">选择平台:</div>
                            <div class="list_">
                              <div class="item_">
                                <div class="text">不翻译</div>
                                <div class="checkbox">
                                  <el-radio value="Value 1"></el-radio>
                                </div>
                              </div>
                            </div>
                            <div class="title_">选择语言:</div>
                            <div class="list_">
                              <div class="item_">
                                <div class="text">不翻译</div>
                                <div class="checkbox">
                                  <el-radio value="Value 1"></el-radio>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </el-popover>
                    </div>
                    <div class="action_switch rec_">收</div>
                    <div
                      class="icon"
                      style="
                        transform: rotate(90deg);
                        width: 20px;
                        height: 20px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                      "
                    >
                      <el-icon color="#778898" :size="14"><Sort /></el-icon>
                    </div>
                    <div class="dropdown">
                      <el-popover placement="top" :width="300" trigger="click">
                        <template #reference>
                          <div
                            style="
                              font-size: 12px;
                              color: #778898;
                              cursor: pointer;
                            "
                          >
                            阿拉伯语
                          </div>
                        </template>
                        <div class="translate_menu">
                          <div class="tbar_">
                            <div class="title_">发送消息翻译设置</div>
                          </div>
                          <div class="inner_">
                            <div class="title_">选择平台:</div>
                            <div class="list_">
                              <div class="item_">
                                <div class="text">不翻译</div>
                                <div class="checkbox">
                                  <el-radio value="Value 1"></el-radio>
                                </div>
                              </div>
                            </div>
                            <div class="title_">选择语言:</div>
                            <div class="list_">
                              <div class="item_">
                                <div class="text">不翻译</div>
                                <div class="checkbox">
                                  <el-radio value="Value 1"></el-radio>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </el-popover>
                    </div>
                    <div class="action_switch send_">发</div>
                  </div>
                </div>
              </div>

              <div class="input_wrap">
                <textarea
                  type="text"
                  class="paperview-input-text"
                  placeholder="输入消息..."
                  v-model="sendValue"
                />
              </div>

              <div class="actions_">
                <div class="start_"></div>
                <div class="end_">
                  <el-button color="#6f50ff" @click="send">发送</el-button>
                </div>
              </div>
            </div>
          </div>
          <div class="chat_quick">
            <div class="chat_quick_inner">
              <div class="chat_quick_center">
                <div class="title_">备忘录</div>
                <div class="meno_list">
                  <div
                    class="meno_item"
                    v-for="(item, index) in memorandumList"
                  >
                    {{ item.label }}
                  </div>
                </div>
                <div class="meno_ctrl">
                  <div class="input_wrap">
                    <textarea
                      type="text"
                      class="paperview-input-text"
                      placeholder="请输入内容..."
                      v-model="memorandum"
                    />
                  </div>
                  <el-button
                    type="primary"
                    style="width: 100%; margin-top: 10px"
                    @click="submitMemorandum"
                    >提交</el-button
                  >
                </div>
              </div>
              <div class="chat_quick_end">
                <div class="title_">我的信息</div>
                <div class="info_wrap">
                  <div class="start_">
                    <div class="headimg_">
                      <img
                        src="https://fs.tgzai.com/images/2024/05/05/cor6dfo51g3s72pja1o0.jpeg"
                        style="width: 100%; height: 100%"
                        alt=""
                      />
                    </div>
                  </div>
                  <div class="center_">
                    <div class="nickname_">奇怪</div>
                    <div class="desc_">编号: 240912511793</div>
                  </div>
                </div>
                <div class="ext_info_wrap">
                  <div class="item_">
                    <div class="title_">所属分组</div>
                    <div class="content_">未知分组</div>
                  </div>
                  <div class="item_">
                    <div class="title_">用户名</div>
                    <div class="content_">abs568</div>
                  </div>
                  <div class="item_">
                    <div class="title_">手机号</div>
                    <div class="content_">254737127639</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog v-model="dialogAddFile" title="创建自定义对话归档" width="350">
      <el-form
        ref="elSearchFormRef"
        :inline="true"
        :model="msgInfo"
        class="demo-form-inline"
        label-width="75px"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="msgInfo.name" placeholder="名称" />
        </el-form-item>
        <el-form-item label="配色" prop="color">
          <el-select
            v-model="msgInfo.color"
            clearable
            placeholder="配色"
            style="width: 192px"
          >
            <el-option
              v-for="(item, index) in colorList"
              :key="index"
              :label="item.label"
              :value="item.value"
            >
              <div style="cursor: pointer; display: flex; align-items: center">
                <div
                  class=""
                  style="display: flex; align-items: center; margin-right: 10px"
                >
                  <span
                    class=""
                    :style="{
                      borderRadius: '2px',
                      display: 'inline-block',
                      height: '12px',
                      width: '12px',
                      backgroundColor: item.value,
                    }"
                  ></span>
                </div>
                <div>{{ item.label }}</div>
              </div>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="优先级" prop="sort">
          <el-input v-model="msgInfo.sort" placeholder="优先级" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="msgInfo.remark" placeholder="备注" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogAddFile = false">取消</el-button>
          <el-button type="primary" @click="dialogAddFile = false">
            提交
          </el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="dialogSetFile" title="设置自定义对话归档" width="350">
      <el-form
        ref="elSearchFormRef"
        :inline="true"
        :model="msgInfo"
        class="demo-form-inline"
        label-width="105px"
      >
        <el-form-item label="选择对话归档" prop="name">
          <el-select v-model="value" placeholder="选择" style="width: 175px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogSetFile = false">取消</el-button>
          <el-button type="primary" @click="dialogSetFile = false">
            提交
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { Calendar, Search } from "@element-plus/icons-vue";
import { ref, onMounted, nextTick } from "vue";

import router from "@/router";
import { useUserInfo } from "@/store/index.js";

// 退出登录
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

onMounted(async () => {
  await nextTick();
  inputSlider();
});

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

const sidebar = ref(2);
const active = ref(1);
const dialogAddFile = ref(false);
const dialogSetFile = ref(false);
const msgInfo = ref({});
const colorList = ref([
  {
    label: "木炭黑",
    value: "#1d1e20",
  },
  {
    label: "蓝色",
    value: "#5e72e4",
  },
]);
const activeName = ref("1");
const screenText = ref("全部");

const menusActive = ref(null);

const radio = ref("radio");

const copy = () => {
  navigator.clipboard.writeText("123");
};

const scrollbarRef = ref();
const inputSlider = () => {
  scrollbarRef.value.setScrollTop(500);
};

// 发送消息
const sendValue = ref("");
const msgList = ref([]);
const send = () => {
  if (!sendValue.value) return;
  msgList.value.push({
    content: sendValue.value,
    type: "right",
  });
  sendValue.value = "";
};

//备忘录
const memorandumList = ref([]);
const memorandum = ref("");
const submitMemorandum = () => {
  if (!memorandum.value) return;
  memorandumList.value.push({
    label: memorandum.value,
  });
  memorandum.value = "";
};
</script>

<style lang="scss" scoped>
.chatRoom {
  width: 100%;
  height: 100vh;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
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
          padding: 0 10px;
          box-sizing: border-box;
          .session_wrap {
            width: 100%;
            padding: 10px 0px;
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
              padding-top: 5px;
              .item_ {
                width: 100%;
                box-sizing: border-box;
                border-left: 2px solid #0000;
                border-radius: 0 3px 3px 0;
                cursor: pointer;
                display: flex;
                height: 40px;
                padding-left: 10px;
                padding-right: 10px;
                .start_ {
                  align-self: center;
                  display: flex;
                  justify-content: center;
                }
                .center_ {
                  align-self: center;
                  color: #778898;
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
  .main {
    flex: 1;
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
      padding: 10px 10px 10px 0;
      box-sizing: border-box;
      .chat_menus {
        width: 300px;
        height: 100%;
        padding: 0px 10px;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        .sidebar_menus_search {
          padding-bottom: 5px;
          width: 100%;
        }
        .chat_menus_tabs {
          display: flex;
          .tabs {
            flex: 1;
          }
          .dropdown {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        .chat_menus_list {
          flex: 1;
          overflow: auto;
          padding: 10px 0px;
          .item_ {
            border-bottom: 1px dashed #e9ecef;
            border-top: 1px dashed #0000;
            height: 60px;
            .inner_ {
              width: 100%;
              box-sizing: border-box;
              cursor: pointer;
              display: flex;
              padding: 10px 5px;
              .start_ {
                align-self: center;
                flex-basis: 40px;
                flex-shrink: 0;
                .headimg_ {
                  background-color: #e9ecef;
                  border: 1px solid #e9ecef;
                  box-sizing: border-box;
                  border-radius: 5px;
                  height: 40px;
                  overflow: hidden;
                  width: 40px;
                }
              }
              .center_ {
                align-self: center;
                flex-grow: 1;
                line-height: 1.2;
                max-width: 170px;
                overflow: hidden;
                padding-left: 10px;
                .nickname_ {
                  color: #1d1e20;
                  font-size: 15px;
                  font-weight: 600;
                  padding-bottom: 4px;
                  white-space: nowrap;
                }
                .recent_ {
                  color: #778898;
                  font-size: 13px;
                  white-space: nowrap;
                }
              }
              .end_ {
                align-items: flex-end;
                display: flex;
                flex-basis: 40px;
                flex-direction: column;
                flex-shrink: 0;
                height: 40px;
                transform: translateY(4px);
                .time_ {
                  color: #778898;
                  font-size: 12px;
                }
              }
            }

            &.active {
              background-color: #5e72e433;
            }
          }
        }
      }
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
                  margin-bottom: 10px;
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
}

::v-deep .el-collapse {
  border: 0px;
}

::v-deep .el-collapse-item__header {
  height: 40px !important;
  border: 0px;
}

::v-deep .el-collapse-item__wrap {
  border: 0px;
}

::v-deep .el-collapse-item__content {
  padding: 0px;
}

::v-deep .el-dropdown {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

::v-deep .el-tabs__header {
  margin: 0;
}

::v-deep .el-tabs__item {
  padding: 0px 10px;
}

::v-deep .el-tabs__nav-wrap::after {
  bottom: 0;
  content: "";
  height: 0px;
  left: 0;
  position: absolute;
  width: 100%;
}

.drawer_main {
  .dhead_ {
    align-items: center;
    border-bottom: 1px solid #ecedf5;
    display: flex;
    height: 40px;
    justify-content: space-between;
    padding: 0 10px;
    .title_ {
      align-self: center;
      color: #1d1e20;
      font-size: 14px;
      font-weight: 500;
      white-space: nowrap;
    }
  }
  .dbody_ {
    width: 100%;
    height: 500px;
    overflow-y: auto;
    background: #f6f7fb;
    cursor: pointer;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 10px;
    box-sizing: border-box;
    ::v-deep .el-collapse-item {
      margin-bottom: 10px;
      .el-collapse-item__header {
        padding: 0px 10px;
        border-left: 4px solid #2f325d;
        border-radius: 2px;
        box-shadow: 0 10px 30px -10px #200e3229;
        display: flex;
      }
      .library_items {
        .item_wrap {
          margin-bottom: 10px;
          background: #fff;
          cursor: pointer;
          overflow: hidden;
          padding: 10px;
          position: relative;
          .start_ {
            display: flex;
            justify-content: space-between;
            .title_ {
              color: #1d1e20;
              font-size: 13px;
              font-weight: 600;
            }
          }
          .center_ {
            .content_ {
              word-wrap: break-word;
              border-left: 2px solid #e9ecef;
              color: #778898;
              font-size: 12px;
              overflow-wrap: break-word;
              padding-left: 5px;
              white-space: pre-wrap;
              word-break: break-word;
              img {
                max-height: 120px;
                max-width: 360px;
                object-fit: contain;
              }
            }
          }
        }
      }
    }
  }
}

.translate_menu {
  .tbar_ {
    align-items: center;
    display: flex;
    height: 40px;
    justify-content: space-between;
    padding: 0 10px;
    .title_ {
      align-self: center;
      color: #1d1e20;
      font-size: 14px;
      font-weight: 500;
      white-space: nowrap;
    }
  }
  .inner_ {
    cursor: pointer;
    max-height: 600px;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 10px;
    .title_ {
      color: #1d1e20;
      font-size: 13px;
    }
    .list_ {
      padding: 10px 0;
      .item_ {
        margin-bottom: 10px;
        align-items: center;
        border: 1px solid #e9ecef;
        border-radius: 5px;
        display: flex;
        height: 40px;
        justify-content: space-between;
        padding: 0 10px;
      }
    }
  }
}
</style>
