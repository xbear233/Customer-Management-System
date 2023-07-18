<template>
  <el-container style="height:100%;">
    <!-- 三步第三步，实例化 -->
    <!-- 侧边栏 -->
    <el-aside width="auto" style="overflow-y: hidden">
        <CommonAside ref="aside" />
    </el-aside>
    <el-container style="overflow-y: hidden">
      <!-- 头部 -->
      <el-header style="background-color:#545c64"> <CommonHeader ref="header" /></el-header>
      <!-- main主体部分根据菜单选项切换不同页面 -->
      <el-main >
        <router-view />  
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 三步第一步，导包
import CommonAside from './CommonAside.vue'; 
import CommonHeader from './CommonHeader.vue';
    export default {
      // 三步第二步，注册
        components: {
            CommonAside,CommonHeader
        }
        
    }
</script>

<style lang="scss" scoped>

</style>