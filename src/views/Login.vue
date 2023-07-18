<template>
    <div class="background" style="padding: 20px">
        <el-card shadow="always">
            <div class="title-container">
                <h2 class="title">客户后台管理系统</h2>
            </div>
            <el-form :model="form" label-width="120">
                <el-form-item label="用户名">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password" type="password"></el-input>
                </el-form-item>
                <el-form-item align="center">
                    <el-button type="primary" @click="login">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import http from "../request/index.js"  //导入http的包
import { useUserStore } from '../stores/user'

const modules = import.meta.glob('../views/*/*.vue')
export default {

    data() {
        return {
            form: {
                username: 'admin',
                password: '123456',
            }
        }
    },
    computed: {
        user() {
            return useUserStore();
        }
    },
    methods: {
        async login() {
            let res = await http.post('/api/permission/getMenu', this.form);
            res = res.data
            if (res.code === 20000) {
                //设置登录标记
                this.user.token = res.data.token;
                console.log(res.data.menu)
                //新增动态路由
                this.addDynamicRoutes(res.data.menu)
                this.user.menu = res.data.menu; //将菜单保存到pinia

                this.$router.push({ path: '/home' })   //跳转到home,等于this.$router.push({'/home' })
            } else {
                this.$message.warning(res.data.message)
            }
        },
        addDynamicRoutes(menu) {
            const modules = import.meta.glob('../views/*.vue')
            console.log(modules)
            let homeMenu =
            {
                path: '/',
                component: modules['./Main.vue'],
                children: [],
            }
            //添加子路由
            menu.forEach(item => {
                if (item.children) {
                    let submenu = item.children.map(it => {
                        return {
                            'path': it.path,
                            component: modules['./' + it.url + '.vue']
                        }
                    })
                    console.log(submenu)
                    homeMenu.children.push(...submenu)
                }
                else {
                    console.log("***", item)
                    homeMenu.children.push({
                        path: item.path,
                        component: modules['./' + item.url + '.vue']
                    })
                }
            })
            this.$router.addRoute(homeMenu);
        }
    },
}
</script>

<style lang="scss" scoped>
.background{
    min-height: 100%;
    background-image:url(../assets/images/bg0.jpg)
}
.el-card {
    margin: auto;
    margin-top: 200px;
    width: 500px;
}
.title{
    user-select: none;
    text-align: center;
}
.el-form {
    width: 75%;
    margin: auto;
    align-items: center;
    padding-top: 45px;
    padding-right: 80px;
    height: 200px;
    background-color: #fff;
    border: 1px black;
}
.el-button {
    width: 200px;
}
</style>