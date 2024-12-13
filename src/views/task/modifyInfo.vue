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
              v-model="form.name"
              size="large"
              placeholder="名称"
              style="width: 185px"
              clearable
            />
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="Search"
          size="large"
          style="margin-left: 30px"
          color="#1d1e20"
          @click="getTableData"
          >搜索</el-button
        >
      </div>
    </div>

    <div class="table">
      <div class="bar">
        <div class="title">资料任务列表</div>
        <div class="action">
          <el-button
            type="primary"
            color="#a755e5"
            style="font-size: 12px"
            @click="dialogAddTemplate = true"
            icon="Plus"
            >模板创建任务</el-button
          >
          <el-button
            type="primary"
            color="#a755e5"
            style="font-size: 12px"
            @click="dialogAddTask = true"
            icon="Plus"
            >创建任务</el-button
          >
        </div>
      </div>
      <div class="inner">
        <div
          class="item"
          :style="{
            backgroundColor: '#2dce89',
            opacity: tableData.length === 0 ? '0.5' : '1',
            cursor: tableData.length === 0 ? ' not-allowed' : 'pointer',
          }"
        >
          批量开始
        </div>
        <div
          class="item"
          :style="{
            backgroundColor: '#f5365c',
            opacity: tableData.length === 0 ? '0.5' : '1',
            cursor: tableData.length === 0 ? ' not-allowed' : 'pointer',
          }"
        >
          批量关闭
        </div>
        <div
          class="item"
          :style="{
            backgroundColor: '#f5365c',
            opacity: tableData.length === 0 ? '0.5' : '1',
            cursor: tableData.length === 0 ? ' not-allowed' : 'pointer',
          }"
        >
          批量删除
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
          <el-table-column prop="id" label="编号" width="120" />
          <el-table-column prop="name" label="任务名称" width="180" />
          <el-table-column prop="status" label="状态" width="180" />

          <el-table-column
            prop="accountNumber"
            label="设置用户名"
            width="100"
          />
          <el-table-column prop="sort" label="设置名" width="100" />

          <el-table-column prop="remark" label="设置个性签名" width="180" />
          <el-table-column prop="address" label="设置头像" width="180" />
          <el-table-column
            prop="accountNumber"
            label="删除账号时间"
            width="100"
          />
          <el-table-column prop="sort" label="上线状态" width="100" />

          <el-table-column
            prop="accountNumber"
            label="群频道邀请"
            width="100"
          />
          <el-table-column prop="sort" label="通话设置" width="100" />

          <el-table-column prop="accountNumber" label="个人头像" width="100" />
          <el-table-column prop="sort" label="转发消息" width="100" />

          <el-table-column
            prop="accountNumber"
            label="手机号可见"
            width="100"
          />
          <el-table-column prop="sort" label="手机号搜索" width="100" />

          <el-table-column prop="accountNumber" label="个性签名" width="100" />
          <el-table-column prop="sort" label="开始时间" width="100" />

          <el-table-column prop="accountNumber" label="结束时间" width="100" />
          <el-table-column prop="sort" label="原因" width="100" />

          <el-table-column prop="accountNumber" label="创建时间" width="100" />
          <!-- <el-table-column prop="sort" label="优先级" width="100" />

          <el-table-column prop="address" label="操作">
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
          </el-table-column> -->
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
      v-model="dialogAddTemplate"
      title="模板创建任务"
      width="550"
      draggable
      top="10vh"
    >
      <div class="bodyItem">
        <!-- <div class="title">账号信息：</div> -->
        <div class="dialogForm" style="border: 0px">
          <div class="form-item" style="flex-basis: 100%; margin-bottom: 10px">
            <div class="label">账号分组：</div>
            <el-transfer
              v-model="addTemplateForm.grouping"
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
            <div class="label">名称：</div>
            <div class="">
              <el-input
                v-model="addTemplateForm.name"
                size="large"
                style="width: 100%"
                clearable
                placeholder="状态"
              >
              </el-input>
            </div>
          </div>
          <div class="form-item" style="flex-basis: 100%">
            <div class="label">同时账号数:</div>
            <div class="">
              <el-input-number
                v-model="addTemplateForm.accountNumber"
                size="large"
                style="width: 100%"
                clearable
                placeholder="优先级"
                :controls="false"
              >
              </el-input-number>
            </div>
          </div>
          <div class="form-item" style="flex-basis: 100%">
            <div class="label">模板：</div>
            <div class="">
              <el-select
                v-model="addTemplateForm.template"
                size="large"
                style="width: 100%"
                clearable
                placeholder=""
              >
                <el-option
                  v-for="item in templateList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>

          <div class="form-item" style="flex-basis: 100%">
            <div class="label">备注：</div>
            <div class="">
              <el-input
                v-model="addTemplateForm.remark"
                size="large"
                style="width: 100%"
                clearable
                placeholder="备注"
              >
              </el-input>
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
            @click="submit('dialogOffline', 'addTemplateForm')"
            size="large"
          >
            提交
          </el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog
      v-model="dialogAddTask"
      title="创建资料任务"
      width="550"
      draggable
      top="10vh"
    >
      <div class="bodyItem">
        <div class="title"></div>
        <div class="dialogForm" style="border: 0px">
          <div class="form-item" style="flex-basis: 100%; margin-bottom: 10px">
            <div class="label">账号分组：</div>
            <el-transfer
              v-model="addTaskForm.grouping"
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
            <div class="label">名称：</div>
            <div class="">
              <el-input
                v-model="addTaskForm.name"
                size="large"
                style="width: 100%"
                clearable
                placeholder="状态"
              >
              </el-input>
            </div>
          </div>
          <div class="form-item" style="flex-basis: 100%">
            <div class="label">同时账号数:</div>
            <div class="">
              <el-input-number
                v-model="addTaskForm.accountNumber"
                size="large"
                style="width: 100%"
                clearable
                placeholder=""
                :controls="false"
              >
              </el-input-number>
            </div>
          </div>
        </div>
      </div>
      <div class="bodyItem">
        <div class="title">资料设置:</div>
        <div class="dialogForm">
          <div class="form-item" style="flex-basis: 50%">
            <div class="label">设置用户名：</div>
            <div class="">
              <el-select
                v-model="addTaskForm.username"
                size="large"
                style="width: 100%"
                clearable
                placeholder=""
              >
                <el-option
                  v-for="item in [
                    { label: '关闭', value: 0 },
                    { label: '随机字符', value: 1 },
                  ]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
          <div class="form-item" style="flex-basis: 50%">
            <div class="label">设置头像:</div>
            <div class="">
              <el-select
                v-model="addTaskForm.ava"
                size="large"
                style="width: 100%"
                clearable
                placeholder=""
              >
                <el-option
                  v-for="item in [
                    { label: '关闭', value: 0 },
                    { label: '随机字符', value: 1 },
                  ]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
          <div class="form-item" style="flex-basis: 50%">
            <div class="label">设置名(firstName):</div>
            <div class="">
              <el-select
                v-model="addTaskForm.firstName"
                size="large"
                style="width: 100%"
                clearable
                placeholder=""
              >
                <el-option
                  v-for="item in [
                    { label: '关闭', value: 0 },
                    { label: '随机字符', value: 1 },
                  ]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
          <div class="form-item" style="flex-basis: 50%">
            <div class="label">设置姓(lastName):</div>
            <div class="">
              <el-select
                v-model="addTaskForm.lastName"
                size="large"
                style="width: 100%"
                clearable
                placeholder=""
              >
                <el-option
                  v-for="item in [
                    { label: '关闭', value: 0 },
                    { label: '随机字符', value: 1 },
                  ]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
          <div class="form-item" style="flex-basis: 50%">
            <div class="label">设置个性签名:</div>
            <div class="">
              <el-select
                v-model="addTaskForm.autograph"
                size="large"
                style="width: 100%"
                clearable
                placeholder=""
              >
                <el-option
                  v-for="item in [
                    { label: '关闭', value: 0 },
                    { label: '随机字符', value: 1 },
                  ]"
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
        <div class="title">隐私设置:</div>
        <div class="dialogForm">
          <div class="form-item" style="flex-basis: 50%; margin-bottom: 10px">
            <div class="label">未登录账号删除账号时间:</div>
            <div class="">
              <el-select
                v-model="addTaskForm.time"
                size="large"
                style="width: 100%"
                clearable
                placeholder=""
              >
                <el-option
                  v-for="item in timeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
          <div class="form-item" style="flex-basis: 50%; margin-bottom: 10px">
            <div class="label">上线状态:</div>
            <div class="">
              <el-select
                v-model="addTaskForm.onlineStatus"
                size="large"
                style="width: 100%"
                clearable
                placeholder=""
              >
                <el-option
                  v-for="item in onlineList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
          <div class="form-item" style="flex-basis: 50%; margin-bottom: 10px">
            <div class="label">群频道邀请设置:</div>
            <div class="">
              <el-select
                v-model="addTaskForm.groupChat"
                size="large"
                style="width: 100%"
                clearable
                placeholder=""
              >
                <el-option
                  v-for="item in onlineList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
          <div class="form-item" style="flex-basis: 50%; margin-bottom: 10px">
            <div class="label">通话(可以与我语音视频通话):</div>
            <div class="">
              <el-select
                v-model="addTaskForm.conversation"
                size="large"
                style="width: 100%"
                clearable
                placeholder=""
              >
                <el-option
                  v-for="item in onlineList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
          <div class="form-item" style="flex-basis: 50%; margin-bottom: 10px">
            <div class="label">头像(谁可以看到我的头像):</div>
            <div class="">
              <el-select
                v-model="addTaskForm.ava"
                size="large"
                style="width: 100%"
                clearable
                placeholder=""
              >
                <el-option
                  v-for="item in onlineList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
          <div class="form-item" style="flex-basis: 50%; margin-bottom: 10px">
            <div class="label">转发消息(点击可以查看账号信息):</div>
            <div class="">
              <el-select
                v-model="addTaskForm.msg"
                size="large"
                style="width: 100%"
                clearable
                placeholder=""
              >
                <el-option
                  v-for="item in onlineList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
          <div class="form-item" style="flex-basis: 50%; margin-bottom: 10px">
            <div class="label">手机号码可见设置:</div>
            <div class="">
              <el-select
                v-model="addTaskForm.phone"
                size="large"
                style="width: 100%"
                clearable
                placeholder=""
              >
                <el-option
                  v-for="item in onlineList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
          <div class="form-item" style="flex-basis: 50%; margin-bottom: 10px">
            <div class="label">手机号搜索(可以通过手机号搜索):</div>
            <div class="">
              <el-select
                v-model="addTaskForm.search"
                size="large"
                style="width: 100%"
                clearable
                placeholder=""
              >
                <el-option
                  v-for="item in onlineList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>

          <div class="form-item" style="flex-basis: 50%; margin-bottom: 10px">
            <div class="label">个性签名(谁可以看到我的个性签名) :</div>
            <div class="">
              <el-select
                v-model="addTaskForm.autograph"
                size="large"
                style="width: 100%"
                clearable
                placeholder=""
              >
                <el-option
                  v-for="item in onlineList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
        </div>
      </div>
      <div class="form-item" style="flex-basis: 100%; margin-bottom: 10px">
        <div class="label">备注:</div>
        <div class="">
          <el-input
            v-model="addTaskForm.remark"
            size="large"
            style="width: 100%"
            clearable
            placeholder=""
          >
          </el-input>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeDialog('dialogOffline')" size="large"
            >取消</el-button
          >
          <el-button
            type="primary"
            @click="submit('dialogOffline', 'addTemplateForm')"
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
import { ref } from "vue";
import { ElMessage } from "element-plus";
// 搜索条件
const form = ref({
  name: undefined,
  addTime: "time",
  sort: "ascending",
});
const groupingList = ref([
  { value: "0", label: "不限分组" },
  { value: "1", label: "未分组" },
]);

// 获取表格数据
const selectable = (row) => ![1, 31].includes(row.id);
const pageSize = ref(10);
const page = ref(1);
const total = ref(0);
const tableData = ref([]);
const getTableData = async () => {};
getTableData();

// 创建模板
const dialogAddTemplate = ref(false);
const addTemplateForm = ref({});
const templateList = ref([]);

// 创建任务
const dialogAddTask = ref(false);
const addTaskForm = ref({});
const timeList = ref([
  {
    label: "不设置",
    value: 0,
  },
  {
    label: "一个月",
    value: 1,
  },
  {
    label: "三个月",
    value: 2,
  },
  {
    label: "六个月",
    value: 3,
  },
  {
    label: "一年",
    value: 4,
  },
]);

const onlineList = ref([
  {
    label: "不设置",
    value: 0,
  },
  {
    label: "所有人",
    value: 1,
  },
  {
    label: "联系人",
    value: 2,
  },
  {
    label: "没有人",
    value: 3,
  },
]);
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
    height: 600px;
    overflow: auto;
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

::v-deep .el-input-number .el-input__inner {
  text-align: left;
}
</style>
