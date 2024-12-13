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
              style="width: 185px"
              placeholder="素材标题"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="form.grouping"
              size="large"
              style="width: 185px"
              placeholder=""
            >
              <el-option
                v-for="item in groupingList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
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
        <div class="title">素材列表</div>
        <div class="action">
          <el-button
            type="primary"
            color="#f5365c"
            style="font-size: 12px"
            :disabled="tableData.length === 0"
            >批量删除</el-button
          >
          <el-button
            type="primary"
            color="#a755e5"
            style="font-size: 12px"
            @click="addDialog = true"
            icon="Plus"
            >导入素材</el-button
          >
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
          <el-table-column prop="name" label="所属分组" width="180">
          </el-table-column>
          <el-table-column prop="status" label="素材标题" width="100" />
          <el-table-column prop="number" label="优先级" width="100" />

          <el-table-column prop="remark" label="状态" width="180" />
          <el-table-column prop="status" label="素材内容" width="180" />
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
      v-model="addDialog"
      title="导入素材"
      width="550"
      draggable
      top="10vh"
      @close="close"
    >
      <div class="bodyItem">
        <div class="dialogForm" style="border: 0px">
          <div class="form-item" style="flex-basis: 100%">
            <div class="label">素材标题：</div>
            <div class="">
              <el-input
                v-model="addForm.name"
                size="large"
                style="width: 100%"
                clearable
                placeholder="素材标题"
              >
              </el-input>
            </div>
          </div>

          <div class="form-item" style="flex-basis: 100%">
            <div class="label">素材类型：</div>
            <div class="">
              <el-select
                v-model="addForm.status"
                size="large"
                style="width: 100%"
                placeholder="素材类型"
              >
                <el-option
                  v-for="item in addTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>

          <div class="form-item" style="flex-basis: 100%">
            <div class="label">优先级：</div>
            <div class="">
              <el-input-number
                v-model="addForm.sort"
                size="large"
                style="width: 100%; text-align: left"
                clearable
                placeholder="优先级"
                :controls="false"
              >
              </el-input-number>
            </div>
          </div>

          <div class="form-item" style="flex-basis: 100%">
            <div class="label">素材分组：</div>
            <div class="">
              <el-select
                v-model="addForm.sourceMaterialGrouping"
                size="large"
                style="width: 100%"
                placeholder="素材分组"
              >
                <el-option
                  v-for="item in sourceMaterialGroupingList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>

          <div class="form-item" style="flex-basis: 100%">
            <div class="label">添加模式：</div>
            <div class="">
              <el-select
                v-model="addForm.mode"
                size="large"
                style="width: 100%"
                placeholder="添加模式"
              >
                <el-option
                  v-for="item in [
                    { label: '单条', value: 1 },
                    { label: '每行一条', value: 2 },
                  ]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
          <div class="form-item" style="flex-basis: 100%">
            <div class="label">素材内容：</div>
            <div class="" style="display: flex">
              <el-input
                v-model="addForm.sourceMaterialContent"
                placeholder="素材内容"
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 5 }"
              >
              </el-input>
              <el-upload
                ref="uploadRef"
                class="upload-demo"
                action=""
                :auto-upload="false"
                :show-file-list="false"
                :on-change="upFilled"
                accept=".text,.txt"
              >
                <template #trigger>
                  <el-button
                    type="primary"
                    size="large"
                    style="margin-left: 30px"
                    color="#1d1e20"
                    >选择文件</el-button
                  >
                </template>
              </el-upload>
            </div>
          </div>

          <div class="form-item" style="flex-basis: 100%">
            <div class="label">状态：</div>
            <div class="">
              <el-select
                v-model="addForm.status"
                size="large"
                style="width: 100%"
                placeholder="状态"
              >
                <el-option
                  v-for="item in [
                    { label: '启用', value: 1 },
                    { label: '禁用', value: -1 },
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

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="close()" size="large">取消</el-button>
          <el-button type="primary" @click="submit()" size="large">
            提交
          </el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog
      v-model="editDialog"
      :title="title"
      width="550"
      draggable
      top="10vh"
    >
      <div style="color: #f5365c; font-size: 15px; padding: 10px 0 20px">
        注意: 此操作不可逆
      </div>
      <div class="bodyItem">
        <div class="title">筛选条件：</div>
        <div class="dialogForm">
          <div class="form-item">
            <div class="label">名称：</div>
            <div class="">
              <el-input
                v-model="addForm.name"
                size="large"
                style="width: 100%"
                clearable
                placeholder="名称"
              >
              </el-input>
            </div>
          </div>

          <div class="form-item">
            <div class="label">备注：</div>
            <div class="">
              <el-input
                v-model="addForm.name"
                size="large"
                style="width: 100%"
                clearable
                placeholder="备注"
              >
              </el-input>
            </div>
          </div>

          <div class="form-item">
            <div class="label">状态：</div>
            <div class="">
              <el-select
                v-model="addForm.status"
                size="large"
                style="width: 100%"
                placeholder="状态"
              >
                <el-option
                  v-for="item in [
                    { label: '开启', value: 1 },
                    { label: '关闭', value: -1 },
                  ]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>

          <div class="form-item">
            <div class="label">素材类型：</div>
            <div class="">
              <el-select
                v-model="addForm.status"
                size="large"
                style="width: 100%"
                placeholder="素材类型"
              >
                <el-option
                  v-for="item in editTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
        </div>
        <div class="form-item" style="flex-basis: 100%">
          <div class="label">新的名称：</div>
          <div class="">
            <el-input
              v-model="addForm.newName"
              size="large"
              style="width: 100%"
              placeholder="新的名称"
            >
            </el-input>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="editClose()" size="large">取消</el-button>
          <el-button type="primary" @click="editSubmit()" size="large">
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
import axios from "axios";
// 搜索条件
const form = ref({
  name: undefined,
  grouping: 0,
  addTime: "time",
  sort: "ascending",
});
const groupingList = ref([{ label: "不限分组", value: 0 }]);

// 获取表格数据
const selectable = (row) => ![1, 31].includes(row.id);
const pageSize = ref(10);
const page = ref(1);
const total = ref(0);
const tableData = ref([]);
const getTableData = async () => {};
getTableData();

// 创建模板
const addDialog = ref(false);
const addForm = ref({});
const addTypeList = ref([
  { value: 1, label: "文本" },
  { value: 2, label: "图片" },
  { value: 3, label: "视频" },
  { value: 4, label: "音频" },
]);

const sourceMaterialGroupingList = ref([]);

const submit = () => {
  ElMessage.success("提交成功");
  addDialog.value = false;
  addForm.value = {};
};

const close = () => {
  addForm.value = {};
  addDialog.value = false;
};

const upFilled = (event) => {
  console.log("event ========> ", event.raw);
  const reader = new FileReader();
  reader.onload = (e) => {
    addForm.value.sourceMaterialContent = e.target.result;
    console.log("内容 ========> ", e);
  };
  reader.readAsText(event.raw);
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
    max-height: 600px;
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
          margin-bottom: 10px;
          box-sizing: border-box;
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
