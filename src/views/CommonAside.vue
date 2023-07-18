<template>
   <el-menu :collapse="tab.isCollapse" :default-active="$route.path" class="el-menu-vertical-demo"
        background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <h3 v-show="isCollapse">客户</h3>
        <h3 v-show="!isCollapse">客户管理系统</h3>
        <!-- 显示一级菜单，没有子菜单noChildren -->
       <el-menu-item :index="item.path" v-for="item in noChildren" :key="item.path" @click="clickMenu(item)">
            <el-icon>
                <component :is="item.icon"></component>
            </el-icon>
            <template #title>
                <span>{{ item.label }}</span>
            </template>
        </el-menu-item>
        <!-- 显示二级菜单，有子菜单hasChildren -->
        <el-sub-menu :index="item.label" v-for="(item, index) in hasChildren" :key="index">
            <template #title>
                <el-icon>
                    <component :is="item.icon"></component>
                </el-icon>
                <span>{{ item.label }}</span>
            </template>
            <el-menu-item-group>
                <el-menu-item :index="subItem.path" v-for="(subItem, subIndex) in item.children" :key="subIndex"
                    @click="clickMenu(subItem)">
                    <el-icon>
                        <component :is="subItem.icon"></component>
                    </el-icon>
                    <template #title>
                        <span>{{ subItem.label }}</span>
                    </template>
                </el-menu-item>
            </el-menu-item-group>
        </el-sub-menu>
    </el-menu>

</template>

<script>
import { useTabStore } from '@/stores/tab.js'
import { useUserStore } from '../stores/user'

export default {
    computed: {
        noChildren() {
            return this.menu.filter(item => !item.children);
        },
        hasChildren() {
            return this.menu.filter(item => item.children);
        },
        isCollapse() {
            // console.log("^^^^",this.tab.isCollapse)
            return this.tab.isCollapse;
            // return false;
        },
        menu() {
            //return this.user.menu;
             return this.asideMenu
        },
        user() {
            return useUserStore();
        }
    },
    data() {
        return {
            tab: useTabStore(),
            asideMenu: [
                {
                    path: "/home",
                    name: "home",
                    label: "首页",
                    label1: "首页1",
                    icon: "House"
                },
                {
                    path: "/user",
                    name: "user",
                    label: "客户管理",
                    label1: "客户管理1",
                    icon: "User"
                },
                {
                    label: "其他",
                    icon: "More",
                    children: [
                        {
                            path: "/other/page1",
                            name: "page1",
                            label: "员工管理",
                            icon: "User"
                        },
                        {
                            path: "/other/page2",
                            name: "page2",
                            label: "公海",
                            icon: "Star"
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        clickMenu(item) {
             //if (this.$route.name != item.name) {
             //this.$router.push({ name: item.name });
            this.$router.push({ path: item.path });
            this.tab.selectMenu(item)
             //this.$store.commit("selectMenu", item);
             //}

        }
    },

}
</script>

<style lang="scss" scoped>
.el-menu {
    height: 100%;
    border: none;

    h3 {
        color: #ffffff;
        text-align: center;
        line-height: 48px;
        margin:0;
    }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 220px;
    // min-height: 300px;
}
</style>