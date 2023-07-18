<template>
    <header>
        <div class="l-content">
            <el-button plain icon="menu" size="small" @click="collapseMenu">
            </el-button>
            <!-- <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current">
          {{ current.label }}
        </el-breadcrumb-item>
      </el-breadcrumb> -->

            <div class="tabs">
                <el-tag :key="tag.name" size="small" v-for="(tag, index) in tab.tabsList"
                    :closable="tag.name !== 'home'" :disable-transitions="false" @close="handleClose(tag, index)"
                    @click="changeMenu(tag)" :effect="$route.name === tag.name ? 'dark' : 'plain'">
                    {{ tag.label }}
                </el-tag>
            </div>
        </div>
        <div class="r-content">
            <el-dropdown trigger="click" size="mini">
                <span class="el-dropdown-link"><img src="../assets/images/touxiang.jpg" class="user" /></span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item @click="logout()">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </header>
</template>

<script>
import { useTabStore } from '@/stores/tab.js'
import { useUserStore } from '../stores/user'

export default {
    data() {
        return {
            userImg: "../assets/images/user.png",
            tab: useTabStore(),
            user: useUserStore(),

        }
    },
    methods: {
        collapseMenu() {
            this.tab.isCollapse = !this.tab.isCollapse;
        },
        handleClose(tag, index) {
            this.tab.closeTab(tag);
            //切换到最后一个tab页
            this.$router.push(this.tab.tabsList[this.tab.tabsList.length - 1].path);
            console.log(index);
        },
        changeMenu(item) {
            //这里与CommonAside的功能没有实现复用，待解决
            // if (this.$route.name != item.name) {
                this.$router.push({ path: item.path });
                this.tab.selectMenu(item);
            // }
        },
        logout(){
            this.user.token=''; //清除登录标记
            this.$router.push({path:'/login'});
        }

    },

}
</script>

<style lang="scss" scoped>
header {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;
}

.l-content {
    display: flex;
    align-items: center;

    .el-button {
        margin-right: 20px;
    }

    .tabs {

        // padding: 20px;
        .el-tag {
            margin-right: 15px;
            cursor: pointer;
        }
    }
}

.r-content {
    .user {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
}
</style>