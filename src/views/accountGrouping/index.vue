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
            <el-input
              v-model="form.remark"
              size="large"
              placeholder="备注"
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
        <div class="title">账号分组列表</div>
        <div class="action">
          <el-button type="primary" color="#f5365c" style="font-size: 12px"
            >批量删除</el-button
          >
          <el-button
            type="primary"
            color="#a755e5"
            style="font-size: 12px"
            @click="dialogLogin = true"
            icon="Plus"
            >创建账号分组</el-button
          >
        </div>
      </div>
      <!-- <div class="inner">
        <div
          class="item"
          style="background-color: #2dce89"
          @click="dialogOnline = true"
        >
          批量上线
        </div>
        <div
          class="item"
          style="background-color: #f5365c"
          @click="dialogOffline = true"
        >
          批量下线
        </div>
        <div
          class="item"
          style="background-color: #0ea9e9"
          @click="dialogGrouping = true"
        >
          批量切换分组
        </div>
        <div
          class="item"
          style="background-color: #ffb310"
          @click="dialogBan = true"
        >
          批量封号检测
        </div>
        <div
          class="item"
          style="background-color: #f5365c"
          @click="dialogDelete = true"
        >
          批量删除
        </div>
        <div
          class="item"
          style="background-color: #a755e5"
          @click="dialogSetSendingStatus = true"
        >
          批量修改发送状态
        </div>
        <div
          class="item"
          style="background-color: #a755e5"
          @click="dialogSetAddStatus = true"
        >
          批量修改加粉状态
        </div>
      </div> -->

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
          <el-table-column prop="name" label="名称" width="180" />
          <el-table-column prop="accountNumber" label="账号数" width="100" />
          <el-table-column prop="sort" label="优先级" width="100" />

          <el-table-column prop="status" label="状态" width="180" />
          <el-table-column prop="remark" label="备注" width="180" />
          <el-table-column prop="address" label="创建时间" width="180" />
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
      title="创建账号分组"
      width="550"
      draggable
      top="10vh"
    >
      <div class="bodyItem">
        <div class="dialogForm">
          <div class="form-item">
            <div class="label">名称：</div>
            <div class="">
              <el-input
                v-model="loginForm.phone"
                size="large"
                style="width: 100%"
                clearable
                placeholder="名称"
              >
              </el-input>
            </div>
          </div>
          <div class="form-item">
            <div class="label">配色:</div>
            <div class="">
              <el-select
                v-model="loginForm.color"
                clearable
                placeholder="配色"
                size="large"
                style="width: 100%"
              >
                <el-option
                  v-for="(item, index) in colorList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                >
                  <div
                    style="cursor: pointer; display: flex; align-items: center"
                  >
                    <div
                      class=""
                      style="
                        display: flex;
                        align-items: center;
                        margin-right: 10px;
                      "
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
            </div>
          </div>

          <div class="form-item">
            <div class="label">优先级：</div>
            <div class="">
              <el-input-number
                v-model="loginForm.sort"
                size="large"
                style="width: 100%; text-align: left"
                clearable
                placeholder="优先级"
                :controls="false"
              >
              </el-input-number>
            </div>
          </div>
          <div class="form-item">
            <div class="label">状态：</div>
            <div class="">
              <el-select
                v-model="loginForm.status"
                size="large"
                style="width: 100%"
                clearable
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
            <div class="label">备注：</div>
            <div class="">
              <el-input
                v-model="loginForm.remark"
                size="large"
                placeholder="备注"
                style="width: 100%"
                clearable
              />
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogLogin = false" size="large">取消</el-button>
          <el-button type="primary" @click="dialogLoginSubmit" size="large">
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
  status: "0",
  remark: undefined,
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

const dialogLoginSubmit = () => {
  dialogLogin.value = false;
  loginForm.value = {};
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
        border-radius: 2px;
        padding: 10px;
        .form-item {
          flex-basis: 100%;
          box-sizing: border-box;
          margin-bottom: 10px;
          .label {
            color: #778898;
            font-size: 14px;
            padding: 0 0 5px;
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
