<template>
  <div class="accountManagementPage">
    <div class="form">
      <div class="bar">
        <div class="title">条件检索</div>
        <div class="action">
          <div class="sortTime">
            <el-dropdown placement="bottom-start" trigger="click">
              <div class="time">
                <el-icon style="margin-right: 6px" :size="16"
                  ><Filter
                /></el-icon>
                <span
                  >排序：{{
                    form.addTime == "time" ? "创建时间" : "编号"
                  }}</span
                >
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="form.addTime = 'time'"
                    >创建时间</el-dropdown-item
                  >
                  <el-dropdown-item @click="form.addTime = 'id'"
                    >编号</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <div class="sortStyle">
            <el-dropdown placement="bottom-start" trigger="click">
              <div class="sort">
                <el-icon style="margin-right: 6px" :size="16"><Sort /></el-icon>
                <span>{{ form.sort == "ascending" ? "升序" : "降序" }}</span>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="form.sort = 'descending'"
                    >降序</el-dropdown-item
                  >
                  <el-dropdown-item @click="form.sort = 'ascending'"
                    >升序</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </div>
      <div class="inner">
        <el-form :model="form" label-width="auto" style="display: flex">
          <el-form-item>
            <el-input
              v-model="form.accountID"
              size="large"
              placeholder="账号编号"
              style="width: 185px"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="form.account"
              size="large"
              placeholder="账号"
              style="width: 185px"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="form.grouping"
              size="large"
              style="width: 185px"
              clearable
            >
              <el-option
                v-for="item in groupingList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="form.phone"
              size="large"
              placeholder="手机号码"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="form.status"
              size="large"
              style="width: 185px"
              clearable
            >
              <el-option
                v-for="item in statusList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="form.status2"
              size="large"
              style="width: 185px"
              clearable
            >
              <el-option
                v-for="item in statusList2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="form.status3"
              size="large"
              style="width: 185px"
              clearable
            >
              <el-option
                v-for="item in statusList3"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="Search"
              size="large"
              style="margin-left: 30px"
              color="#1d1e20"
              @click="getTableData"
              >搜索</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="mystandard">
      <div class="bar">
        <div class="title">概述</div>
        <div class="action" @click="getSummaryList">
          <el-icon :size="16" :class="[iconStatus]"><RefreshRight /></el-icon>
        </div>
      </div>

      <div class="inner">
        <div class="list">
          <div
            v-for="(item, index) in list"
            :key="`list_${index}`"
            class="item"
            :style="{
              background: item.color + '0d',
            }"
          >
            <div class="text">{{ item.label }}</div>
            <div
              class="num"
              :style="{
                color: item.color,
              }"
            >
              {{ item.value }}
            </div>
          </div>
        </div>
        <div class="averageList">
          <div class="item">
            <div class="text">今日总招呼数</div>
            <div class="num">N/A</div>
          </div>
          <div class="item">
            <div class="text">今日平均招呼数</div>
            <div class="num">N/A</div>
          </div>
        </div>
      </div>
    </div>

    <div class="table">
      <div class="bar">
        <div class="title">账号列表</div>
        <div class="action">
          <el-button
            type="primary"
            color="#5e72e4"
            style="font-size: 12px"
            @click="openDialog('dialogLogin')"
            >登录/注册</el-button
          >
        </div>
      </div>
      <div class="inner">
        <div
          class="item"
          style="background-color: #2dce89"
          @click="openDialog('dialogOnline')"
        >
          批量上线
        </div>
        <div
          class="item"
          style="background-color: #f5365c"
          @click="openDialog('dialogOffline')"
        >
          批量下线
        </div>
        <div
          class="item"
          style="background-color: #0ea9e9"
          @click="openDialog('dialogGrouping')"
        >
          批量切换分组
        </div>
        <div
          class="item"
          style="background-color: #ffb310"
          @click="openDialog('dialogBan')"
        >
          批量封号检测
        </div>
        <div
          class="item"
          style="background-color: #f5365c"
          @click="openDialog('dialogDelete')"
        >
          批量删除
        </div>
        <div
          class="item"
          style="background-color: #a755e5"
          @click="openDialog('dialogSetSendingStatus')"
        >
          批量修改发送状态
        </div>
        <div
          class="item"
          style="background-color: #a755e5"
          @click="openDialog('dialogSetAddStatus')"
        >
          批量修改加粉状态
        </div>
      </div>

      <div class="tableBox">
        <el-table
          :data="tableData"
          style="
            width: 100%;
            flex: 1;
            padding: 15px 20px;
            box-sizing: border-box;
          "
          empty-text="列表查询数据为空"
        >
          <el-table-column
            type="selection"
            width="55"
            :selectable="selectable"
          />
          <el-table-column prop="date" label="账号信息" width="180" />
          <el-table-column prop="name" label="用户名" width="180" />
          <el-table-column prop="address" label="手机号" width="180" />
          <el-table-column prop="address" label="所属分组" width="180" />
          <el-table-column
            prop="address"
            label="联系人数/今日新加好友"
            width="180"
          />
          <el-table-column prop="address" label="状态" width="180" />
          <el-table-column prop="address" label="发送状态" width="180" />
          <el-table-column prop="address" label="加粉状态" width="180" />
          <el-table-column prop="address" label="设备类型" width="180" />
          <el-table-column prop="address" label="上线次数" width="180" />
          <el-table-column prop="address" label="地区" width="180" />
          <el-table-column
            prop="address"
            label="代理平台/国家/城市/IP"
            width="180"
          />
          <el-table-column prop="address" label="账号类型" width="180" />
          <el-table-column prop="address" label="创建时间" width="180" />
          <el-table-column prop="address" label="操作" width="180">
            <template #default="scope">
              <el-button
                type="primary"
                icon="EditPen"
                size="large"
                color="#a755e5"
                >编辑</el-button
              >

              <el-button
                type="primary"
                icon="Delete"
                size="large"
                color="#f5365c"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination">
          <el-pagination
            @change="getTableData"
            layout="prev, pager, next"
            size="large"
            :page-size="pageSize"
            background
            :total="total"
            v-model:current-page="page"
          />
        </div>
      </div>
    </div>

    <el-dialog
      v-model="dialogLogin"
      title="登录/注册"
      width="550"
      draggable
      top="10vh"
    >
      <div class="bodyItem">
        <div class="title">账号信息：</div>
        <div class="dialogForm">
          <div class="form-item">
            <div class="label">账号分组：</div>
            <div class="">
              <el-select
                v-model="loginForm.grouping"
                size="large"
                style="width: 100%"
                clearable
                placeholder="请选择这个"
              >
                <el-option
                  v-for="item in groupingList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
          <div class="form-item">
            <div class="label">手机号码:</div>
            <div class="">
              <el-input
                v-model="loginForm.phone"
                size="large"
                style="width: 100%"
                clearable
                placeholder="可不填，方便记录建议填写"
              >
              </el-input>
            </div>
          </div>
        </div>
      </div>

      <div class="bodyItem">
        <div class="title">聊天所属国:</div>
        <div class="dialogForm">
          <div class="form-item">
            <div class="label">国家/地域:</div>
            <div class="">
              <el-select
                v-model="loginForm.country"
                size="large"
                style="width: 100%"
                clearable
                placeholder="请选择这个"
              >
                <el-option
                  v-for="item in countryList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
          <div class="form-item">
            <div class="label">语言:</div>
            <div class="">
              <el-select
                v-model="loginForm.language"
                size="large"
                style="width: 100%"
                clearable
                placeholder="请选择这个"
              >
                <el-option
                  v-for="item in languageList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
        </div>
      </div>

      <div class="bodyItem">
        <div class="title">代理IP:</div>
        <div class="dialogForm">
          <div class="form-item">
            <div class="label">代理IP平台:</div>
            <div class="">
              <el-select
                v-model="loginForm.ip"
                size="large"
                style="width: 100%"
                clearable
                placeholder="请选择这个"
              >
                <el-option
                  v-for="item in ipList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
          <div class="form-item">
            <div class="label">代理IP国家:</div>
            <div class="">
              <el-select
                v-model="loginForm.ipCountry"
                size="large"
                style="width: 100%"
                clearable
                placeholder="请选择这个"
                :disabled="!loginForm.ip"
              >
                <el-option
                  v-for="item in ipCountryList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeDialog('dialogLogin')" size="large"
            >取消</el-button
          >
          <el-button
            type="primary"
            @click="submit('dialogLogin', 'loginForm')"
            size="large"
          >
            提交
          </el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog
      v-model="dialogOnline"
      title="批量账号上线"
      width="550"
      draggable
      top="10vh"
    >
      <div class="bodyItem">
        <div class="title">账号信息：</div>
        <div class="dialogForm">
          <div class="form-item" style="flex-basis: 100%; margin-bottom: 10px">
            <div class="label">账号分组：</div>
            <el-transfer
              v-model="onlineForm.grouping"
              :data="groupingList"
              filterable
              :titles="['已选0项', '已选0项']"
              filter-placeholder="搜索"
            >
              <template #left-empty> 暂无数据 </template>
              <template #right-empty> 暂无数据 </template>

              <template #left-footer>
                <div style="font-size: 14px; padding: 0px 10px">总共0项</div>
              </template>
              <template #right-footer>
                <div style="font-size: 14px; padding: 0px 10px">
                  总共0项
                </div></template
              >
            </el-transfer>
          </div>
          <div class="form-item" style="padding-right: 10px">
            <div class="label">状态：</div>
            <div class="">
              <el-select
                v-model="onlineForm.status"
                size="large"
                style="width: 100%"
                clearable
                placeholder="状态"
              >
                <el-option
                  v-for="item in statusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
          <div class="form-item">
            <div class="label">上线数量(不填默认全部):</div>
            <div class="">
              <el-input
                v-model="onlineForm.onlineNumber"
                size="large"
                style="width: 100%"
                clearable
                placeholder="上线数量(不填默认全部)"
              >
              </el-input>
            </div>
          </div>
        </div>
      </div>
      <div class="bodyItem">
        <div class="title">参数:</div>
        <div class="dialogForm">
          <div class="form-item" style="padding-bottom: 15px">
            <div class="label">代理IP平台:</div>
            <div class="">
              <el-select
                v-model="onlineForm.ip"
                size="large"
                style="width: 100%"
                clearable
                placeholder="请选择这个"
              >
                <el-option
                  v-for="item in ipList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
          <div class="form-item" style="padding-bottom: 15px">
            <div class="label">代理IP国家:</div>
            <div class="">
              <el-select
                v-model="onlineForm.ipCountry"
                size="large"
                style="width: 100%"
                clearable
                placeholder="请选择这个"
                :disabled="!loginForm.ip"
              >
                <el-option
                  v-for="item in ipCountryList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>

          <div class="form-item">
            <div class="label">同步联系人:</div>
            <div class="">
              <el-select
                v-model="onlineForm.contacts"
                size="large"
                style="width: 100%"
                clearable
                placeholder="请选择这个"
              >
                <el-option
                  v-for="item in contactsList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>

          <div class="form-item">
            <div class="label">同步个人信息:</div>
            <div class="">
              <el-select
                v-model="onlineForm.info"
                size="large"
                style="width: 100%"
                clearable
                placeholder="请选择这个"
              >
                <el-option
                  v-for="item in infoList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeDialog('dialogOnline')" size="large"
            >取消</el-button
          >
          <el-button
            type="primary"
            @click="submit('dialogOnline', 'onlineForm')"
            size="large"
          >
            提交
          </el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog
      v-model="dialogOffline"
      title="批量账号下线"
      width="550"
      draggable
      top="10vh"
    >
      <div class="bodyItem">
        <div class="title">账号信息：</div>
        <div class="dialogForm">
          <div class="form-item" style="flex-basis: 100%; margin-bottom: 10px">
            <div class="label">账号分组：</div>
            <el-transfer
              v-model="offlineForm.grouping"
              :data="groupingList"
              filterable
              :titles="['已选0项', '已选0项']"
              filter-placeholder="搜索"
            >
              <template #left-empty> 暂无数据 </template>
              <template #right-empty> 暂无数据 </template>

              <template #left-footer>
                <div style="font-size: 14px; padding: 0px 10px">总共0项</div>
              </template>
              <template #right-footer>
                <div style="font-size: 14px; padding: 0px 10px">
                  总共0项
                </div></template
              >
            </el-transfer>
          </div>
          <div class="form-item" style="flex-basis: 100%">
            <div class="label">状态：</div>
            <div class="">
              <el-select
                v-model="offlineForm.status"
                size="large"
                style="width: 100%"
                clearable
                placeholder="状态"
              >
                <el-option
                  v-for="item in statusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeDialog('dialogOffline')" size="large"
            >取消</el-button
          >
          <el-button
            type="primary"
            @click="submit('dialogOffline', 'offlineForm')"
            size="large"
          >
            提交
          </el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog
      v-model="dialogGrouping"
      title="批量切换账号分组"
      width="550"
      draggable
      top="10vh"
    >
      <div class="bodyItem">
        <div class="title">账号信息：</div>
        <div class="dialogForm">
          <div class="form-item" style="flex-basis: 100%; margin-bottom: 10px">
            <div class="label">账号分组：</div>
            <el-transfer
              v-model="groupingForm.grouping"
              :data="groupingList"
              filterable
              :titles="['已选0项', '已选0项']"
              filter-placeholder="搜索"
            >
              <template #left-empty> 暂无数据 </template>
              <template #right-empty> 暂无数据 </template>

              <template #left-footer>
                <div style="font-size: 14px; padding: 0px 10px">总共0项</div>
              </template>
              <template #right-footer>
                <div style="font-size: 14px; padding: 0px 10px">
                  总共0项
                </div></template
              >
            </el-transfer>
          </div>
          <div
            class="form-item"
            style="padding-right: 10px; padding-bottom: 15px"
          >
            <div class="label">状态：</div>
            <div class="">
              <el-select
                v-model="groupingForm.status"
                size="large"
                style="width: 100%"
                clearable
                placeholder="状态"
              >
                <el-option
                  v-for="item in statusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
          <div class="form-item" style="padding-bottom: 15px">
            <div class="label">发送状态:</div>
            <div class="">
              <el-select
                v-model="groupingForm.sendingStatus"
                size="large"
                style="width: 100%"
                clearable
                placeholder="发送状态"
              >
                <el-option
                  v-for="item in statusList2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>

          <div class="form-item" style="padding-right: 10px">
            <div class="label">加粉状态:</div>
            <div class="">
              <el-select
                v-model="groupingForm.add"
                size="large"
                style="width: 100%"
                clearable
                placeholder="加粉状态"
              >
                <el-option
                  v-for="item in statusList3"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>

          <div class="form-item">
            <div class="label">数量:</div>
            <div class="">
              <el-input
                v-model="groupingForm.number"
                size="large"
                style="width: 100%"
                clearable
                placeholder="数量"
              >
              </el-input>
            </div>
          </div>

          <div class="form-item" style="flex-basis: 100%; margin-top: 10px">
            <div class="label">新的分组:</div>
            <div class="">
              <el-select
                v-model="groupingForm.newGrouping"
                size="large"
                style="width: 100%"
                clearable
                placeholder="新的分组"
              >
                <el-option
                  v-for="item in groupingList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeDialog('dialogGrouping')" size="large"
            >取消</el-button
          >
          <el-button
            type="primary"
            @click="submit('dialogGrouping', 'groupingForm')"
            size="large"
          >
            提交
          </el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog
      v-model="dialogBan"
      title="批量账号封号检测对话框"
      width="550"
      draggable
      top="10vh"
    >
      <div class="bodyItem">
        <div class="title">筛选条件：</div>
        <div class="dialogForm">
          <div class="form-item" style="flex-basis: 100%; margin-bottom: 10px">
            <div class="label">账号分组：</div>
            <el-transfer
              v-model="banForm.grouping"
              :data="groupingList"
              filterable
              :titles="['已选0项', '已选0项']"
              filter-placeholder="搜索"
            >
              <template #left-empty> 暂无数据 </template>
              <template #right-empty> 暂无数据 </template>

              <template #left-footer>
                <div style="font-size: 14px; padding: 0px 10px">总共0项</div>
              </template>
              <template #right-footer>
                <div style="font-size: 14px; padding: 0px 10px">
                  总共0项
                </div></template
              >
            </el-transfer>
          </div>
          <div class="form-item" style="flex-basis: 100%">
            <div class="label">状态：</div>
            <div class="">
              <el-select
                v-model="banForm.status"
                size="large"
                style="width: 100%"
                clearable
                placeholder="状态"
              >
                <el-option
                  v-for="item in statusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
        </div>
      </div>

      <div style="color: #f5365c; font-size: 15px; padding: 10px 0 20px">
        注意: 此操作不可逆
      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeDialog('dialogBan')" size="large"
            >取消</el-button
          >
          <el-button
            type="primary"
            @click="submit('dialogBan', 'banForm')"
            size="large"
          >
            提交
          </el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog
      v-model="dialogDelete"
      title="批量账号删除"
      width="550"
      draggable
      top="10vh"
    >
      <div class="bodyItem">
        <div class="title">筛选条件：</div>
        <div class="dialogForm">
          <div class="form-item" style="flex-basis: 100%; margin-bottom: 10px">
            <div class="label">账号分组：</div>
            <el-transfer
              v-model="deleteForm.grouping"
              :data="groupingList"
              filterable
              :titles="['已选0项', '已选0项']"
              filter-placeholder="搜索"
            >
              <template #left-empty> 暂无数据 </template>
              <template #right-empty> 暂无数据 </template>

              <template #left-footer>
                <div style="font-size: 14px; padding: 0px 10px">总共0项</div>
              </template>
              <template #right-footer>
                <div style="font-size: 14px; padding: 0px 10px">
                  总共0项
                </div></template
              >
            </el-transfer>
          </div>
          <div class="form-item" style="flex-basis: 100%">
            <div class="label">状态：</div>
            <div class="">
              <el-select
                v-model="deleteForm.status"
                size="large"
                style="width: 100%"
                clearable
                placeholder="状态"
              >
                <el-option
                  v-for="item in statusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
        </div>
      </div>

      <div style="color: #f5365c; font-size: 15px; padding: 10px 0 20px">
        注意: 此操作不可逆
      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeDialog('dialogDelete')" size="large"
            >取消</el-button
          >
          <el-button
            type="primary"
            @click="submit('dialogDelete', 'deleteForm')"
            size="large"
          >
            提交
          </el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog
      v-model="dialogSetSendingStatus"
      title="批量修改发送状态"
      width="550"
      draggable
      top="10vh"
    >
      <div class="bodyItem">
        <div class="title">账号信息：</div>
        <div class="dialogForm">
          <div class="form-item" style="flex-basis: 100%; margin-bottom: 10px">
            <div class="label">账号分组：</div>
            <el-transfer
              v-model="setSendingStatusForm.grouping"
              :data="groupingList"
              filterable
              :titles="['已选0项', '已选0项']"
              filter-placeholder="搜索"
            >
              <template #left-empty> 暂无数据 </template>
              <template #right-empty> 暂无数据 </template>

              <template #left-footer>
                <div style="font-size: 14px; padding: 0px 10px">总共0项</div>
              </template>
              <template #right-footer>
                <div style="font-size: 14px; padding: 0px 10px">
                  总共0项
                </div></template
              >
            </el-transfer>
          </div>
          <div
            class="form-item"
            style="padding-right: 10px; padding-bottom: 15px; flex-basis: 33%"
          >
            <div class="label">状态：</div>
            <div class="">
              <el-select
                v-model="setSendingStatusForm.status"
                size="large"
                style="width: 100%"
                clearable
                placeholder="状态"
              >
                <el-option
                  v-for="item in statusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
          <div
            class="form-item"
            style="padding-right: 10px; padding-bottom: 15px; flex-basis: 33%"
          >
            <div class="label">使用状态:</div>
            <div class="">
              <el-select
                v-model="setSendingStatusForm.useStatus"
                size="large"
                style="width: 100%"
                clearable
                placeholder="发送状态"
              >
                <el-option
                  v-for="item in statusList2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
          <div
            class="form-item"
            style="padding-bottom: 15px; padding-bottom: 15px; flex-basis: 33%"
          >
            <div class="label">发送状态:</div>
            <div class="">
              <el-select
                v-model="setSendingStatusForm.sendingStatus"
                size="large"
                style="width: 100%"
                clearable
                placeholder="发送状态"
              >
                <el-option
                  v-for="item in statusList2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>

          <div class="form-item" style="padding-right: 10px; flex-basis: 33%">
            <div class="label">加粉状态:</div>
            <div class="">
              <el-select
                v-model="setSendingStatusForm.add"
                size="large"
                style="width: 100%"
                clearable
                placeholder="加粉状态"
              >
                <el-option
                  v-for="item in statusList3"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>

          <div class="form-item" style="flex-basis: 33%">
            <div class="label">数量:</div>
            <div class="">
              <el-input
                v-model="setSendingStatusForm.number"
                size="large"
                style="width: 100%"
                clearable
                placeholder="数量"
              >
              </el-input>
            </div>
          </div>

          <div class="form-item" style="flex-basis: 100%; margin-top: 10px">
            <div class="label">新的发送状态分组:</div>
            <div class="">
              <el-select
                v-model="setSendingStatusForm.newSendingStatus"
                size="large"
                style="width: 100%"
                clearable
                placeholder="新的分组"
              >
                <el-option
                  v-for="item in groupingList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeDialog('dialogSetSendingStatus')" size="large"
            >取消</el-button
          >
          <el-button
            type="primary"
            @click="submit('dialogSetSendingStatus', 'setSendingStatusForm')"
            size="large"
          >
            提交
          </el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog
      v-model="dialogSetAddStatus"
      title="批量修改加粉状态"
      width="550"
      draggable
      top="10vh"
    >
      <div class="bodyItem">
        <div class="title">账号信息：</div>
        <div class="dialogForm">
          <div class="form-item" style="flex-basis: 100%; margin-bottom: 10px">
            <div class="label">账号分组：</div>
            <el-transfer
              v-model="setAddStatusForm.grouping"
              :data="groupingList"
              filterable
              :titles="['已选0项', '已选0项']"
              filter-placeholder="搜索"
            >
              <template #left-empty> 暂无数据 </template>
              <template #right-empty> 暂无数据 </template>

              <template #left-footer>
                <div style="font-size: 14px; padding: 0px 10px">总共0项</div>
              </template>
              <template #right-footer>
                <div style="font-size: 14px; padding: 0px 10px">
                  总共0项
                </div></template
              >
            </el-transfer>
          </div>
          <div
            class="form-item"
            style="padding-right: 10px; padding-bottom: 15px; flex-basis: 33%"
          >
            <div class="label">状态：</div>
            <div class="">
              <el-select
                v-model="setAddStatusForm.status"
                size="large"
                style="width: 100%"
                clearable
                placeholder="状态"
              >
                <el-option
                  v-for="item in statusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
          <div
            class="form-item"
            style="padding-right: 10px; padding-bottom: 15px; flex-basis: 33%"
          >
            <div class="label">使用状态:</div>
            <div class="">
              <el-select
                v-model="setAddStatusForm.useStatus"
                size="large"
                style="width: 100%"
                clearable
                placeholder="发送状态"
              >
                <el-option
                  v-for="item in statusList2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
          <div
            class="form-item"
            style="padding-bottom: 15px; padding-bottom: 15px; flex-basis: 33%"
          >
            <div class="label">发送状态:</div>
            <div class="">
              <el-select
                v-model="setAddStatusForm.sendingStatus"
                size="large"
                style="width: 100%"
                clearable
                placeholder="发送状态"
              >
                <el-option
                  v-for="item in statusList2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>

          <div class="form-item" style="padding-right: 10px; flex-basis: 33%">
            <div class="label">加粉状态:</div>
            <div class="">
              <el-select
                v-model="setAddStatusForm.add"
                size="large"
                style="width: 100%"
                clearable
                placeholder="加粉状态"
              >
                <el-option
                  v-for="item in statusList3"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>

          <div class="form-item" style="flex-basis: 33%">
            <div class="label">数量:</div>
            <div class="">
              <el-input
                v-model="setAddStatusForm.number"
                size="large"
                style="width: 100%"
                clearable
                placeholder="数量"
              >
              </el-input>
            </div>
          </div>

          <div class="form-item" style="flex-basis: 100%; margin-top: 10px">
            <div class="label">新的加粉状态分组:</div>
            <div class="">
              <el-select
                v-model="setAddStatusForm.newSendingStatus"
                size="large"
                style="width: 100%"
                clearable
                placeholder="新的分组"
              >
                <el-option
                  v-for="item in groupingList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeDialog('dialogSetAddStatus')" size="large"
            >取消</el-button
          >
          <el-button
            type="primary"
            @click="submit('dialogSetAddStatus', 'setAddStatusForm')"
            size="large"
          >
            提交
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from "vue";
import { ElMessage } from "element-plus";
// 搜索条件
const form = ref({
  accountID: undefined,
  account: undefined,
  grouping: "0",
  phone: undefined,
  status: "0",
  status2: "0",
  status3: "0",
  addTime: "time",
  sort: "ascending",
});
const groupingList = ref([
  { value: "0", label: "不限分组" },
  { value: "1", label: "未分组" },
]);
const statusList = ref([
  { value: "0", label: "不限状态" },
  { value: "1", label: "未初始化" },
  { value: "2", label: "离线" },
  { value: "3", label: "在线" },
  { value: "4", label: "异常" },
  { value: "5", label: "封禁" },
]);

const statusList2 = ref([
  { value: "0", label: "不限状态" },
  { value: "1", label: "正常" },
  { value: "2", label: "双向" },
  { value: "3", label: "频繁" },
]);

const statusList3 = ref([
  { value: "0", label: "不限状态" },
  { value: "1", label: "正常" },
  { value: "2", label: "限制" },
]);

const list = ref([
  {
    label: "账号总数",
    value: 0,
    color: "#5e72e4",
  },
  {
    label: "在线数量",
    value: 0,
    color: "#2dce89",
  },
]);

// 刷新
// rotate 开始旋转 stop 停止旋转
const iconStatus = ref("stop");

const getSummaryList = async () => {
  iconStatus.value = "rotate";
  setTimeout(() => {
    iconStatus.value = "stop";
  }, 2000);
};

// 获取表格数据
const selectable = (row) => ![1, 31].includes(row.id);
const pageSize = ref(10);
const page = ref(1);
const total = ref(0);
const tableData = ref([]);
const getTableData = async () => {};
getTableData();

// 登录注册弹窗
const dialogLogin = ref(false);
const loginForm = ref({});
const countryList = ref([]);
const languageList = ref([
  {
    label: "en 英语",
    value: "en",
  },
  {
    label: "th 泰语",
    value: "th",
  },
  {
    label: "ja 日本语",
    value: "ja",
  },
]);
const ipList = ref([]);
const ipCountryList = ref([]);

const dialogLoginSubmit = () => {
  dialogLogin.value = false;
};

// 批量上线弹窗
const dialogOnline = ref(false);
const onlineForm = ref({});
const contactsList = ref([
  {
    label: "关闭",
    value: "off",
  },
  {
    label: "开启-全部刷新",
    value: "on",
  },
]);

const infoList = ref([
  {
    label: "关闭",
    value: "off",
  },
  {
    label: "开启-刷新",
    value: "on",
  },
]);

// 批量下线
const dialogOffline = ref(false);
const offlineForm = ref({});

// 切换分组
const dialogGrouping = ref(false);
const groupingForm = ref({});

// 封号检测
const dialogBan = ref(false);
const banForm = ref({});

// 批量删除
const deleteForm = ref({});
const dialogDelete = ref(false);

// 修改发送状态
const dialogSetSendingStatus = ref(false);
const setSendingStatusForm = ref({});

//修改加粉状态
const setAddStatusForm = ref({});
const dialogSetAddStatus = ref(false);

const instance = getCurrentInstance();

// 打开弹窗
const openDialog = (key) => {
  instance.setupState[key] = true;
};

// 关闭弹窗
const closeDialog = (key) => {
  instance.setupState[key] = false;
};

// 提交
const submit = (dialog, key) => {
  instance.setupState[dialog] = false;
  instance.setupState[key] = {};
  ElMessage.success("提交成功");
};
</script>

<style lang="scss" scoped>
.accountManagementPage {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  .form {
    margin-bottom: 15px;
    padding: 10px 0;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 10px 30px -10px #200e3229;
    .bar {
      display: flex;
      height: 30px;
      justify-content: space-between;
      padding: 0 20px;
      .title {
        align-self: center;
        color: #1d1e20;
        font-size: 14px;
        font-weight: 500;
        white-space: nowrap;
      }
      .action {
        display: flex;
        .sortTime,
        .sortStyle {
          display: flex;
          align-items: center;
          justify-content: center;
          .time,
          .sort {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            color: #465360;
            min-width: 60px;
            padding: 8px 12px;
          }
        }
      }
    }

    .inner {
      display: flex;
      justify-content: space-between;
      padding: 10px 20px;
      .el-form-item {
        margin: 0;
        margin-right: 10px;
        &:nth-last-child(1) {
          margin: 0;
        }
      }
    }
  }

  .mystandard {
    margin-bottom: 15px;
    padding: 10px 0;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 10px 30px -10px #200e3229;
    .bar {
      display: flex;
      height: 30px;
      justify-content: space-between;
      padding: 0 20px;
      .title {
        align-self: center;
        color: #1d1e20;
        font-size: 14px;
        font-weight: 500;
        white-space: nowrap;
      }
      .action {
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-radius: 3px;
        &:hover {
          background-color: #e1e8f0;
        }

        .rotate {
          animation: myfirst 1.5s infinite;
        }
        .stop {
          transform: rotateZ(0deg);
        }
        @keyframes myfirst {
          from {
            transform: rotateZ(0deg);
          }
          to {
            transform: rotateZ(360deg);
          }
        }
      }
    }
    .inner {
      padding: 0px 20px;
      .list {
        display: flex;
        .item {
          width: 120px;
          height: 72px;
          margin-right: 5px;
          border-radius: 3px;
          padding: 10px;
          box-sizing: border-box;
          .text {
            color: #778898;
            font-size: 13px;
            padding-bottom: 10px;
            white-space: nowrap;
          }
          .num {
            font-size: 24px;
            font-weight: 500;
            white-space: nowrap;
          }
        }
      }
      .averageList {
        display: flex;
        align-items: center;
        padding-top: 10px;
        .item {
          background: #5e72e40d;
          margin-right: 5px;
          border-radius: 3px;
          display: inline-flex;
          padding: 10px;
          .text {
            align-self: center;
            color: #778898;
            font-size: 12px;
            padding-right: 5px;
            white-space: nowrap;
          }
          .num {
            align-self: center;
            font-size: 16px;
            font-weight: 500;
            white-space: nowrap;
            color: #5e72e4;
          }
        }
      }
    }
  }

  .table {
    flex: 1;
    padding: 10px 0;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 10px 30px -10px #200e3229;
    display: flex;
    flex-direction: column;
    .bar {
      display: flex;
      height: 30px;
      justify-content: space-between;
      padding: 0 20px;
      .title {
        align-self: center;
        color: #1d1e20;
        font-size: 14px;
        font-weight: 500;
        white-space: nowrap;
      }
      .action {
      }
    }

    .inner {
      display: flex;
      padding: 20px;
      .item {
        margin-right: 10px;
        min-width: 60px;
        padding: 7px;
        box-shadow: 0 4px 6px #32325d1c, 0 1px 3px #00000014;
        cursor: pointer;
        border-radius: 2px;
        font-size: 12px;
        text-align: center;
        color: #fff;
      }
    }

    .tableBox {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      .pagination {
        padding: 10px 0px;
      }
    }
  }
}

::v-deep .el-dialog {
  padding: 0px;
  .el-dialog__header {
    padding: 0px 15px;
    height: 50px;
    line-height: 50px;
  }
  .el-dialog__body {
    background-color: #f6f7fb;
    padding: 10px 15px;
    .bodyItem {
      .title {
        color: #778898;
        font-size: 14px;
        padding: 0 0 5px;
      }
      .dialogForm {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 10px;
        border: 1px dashed #e9ecef;
        border-radius: 2px;
        padding: 10px;
        .form-item {
          flex-basis: 50%;
          padding-right: 10px;
          box-sizing: border-box;
          .label {
            color: #778898;
            font-size: 14px;
            padding: 0 0 5px;
          }

          &:nth-child(2n) {
            padding: 0;
          }
        }
      }
    }
  }

  .el-dialog__footer {
    padding: 0px 15px;
    height: 60px;
    background-color: #f6f7fb;
  }
}

::v-deep .el-transfer {
  display: flex;
  height: 272px;
  .el-transfer-panel {
    display: flex;
    flex-direction: column;
    .el-transfer-panel__header {
      background-color: #fff;
      .el-checkbox__label {
        font-size: 14px;
      }
    }
    .el-transfer-panel__footer {
      height: 30px;
      line-height: 30px;
    }
  }

  .el-transfer__buttons {
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .el-transfer__button:nth-child(2) {
      margin: 0;
      margin-top: 10px;
    }
  }
}
</style>
