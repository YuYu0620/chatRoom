<template>
  <div class="common-layout">
    <SideBar></SideBar>
    <LayoutMain></LayoutMain>
  </div>
</template>
<script setup>
import SideBar from "./sideBar/index.vue";
import LayoutMain from "./layoutMain/index.vue";
</script>

<style lang="scss" scoped>
.common-layout {
  width: 100%;
  height: 100vh;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
}
</style>
