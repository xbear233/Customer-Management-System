<template>
    <div class="manage">
        <div class="manage-header">
            <el-button type="primary" @click="addUser()">+ 新增</el-button>
            <CommonForm inline :formLabel="formLabel" :form="searchFrom">
                <el-button type="primary" @click="getList(searchFrom.keyword)">搜索</el-button>
            </CommonForm>
        </div>
        <CommonTable :tableData="tableData" :tableLabel="tableLabel" :config="config" @changePage="getList()"
            @edit="editUser" @del="delUser">
        </CommonTable>
        <el-dialog :title="operateType === 'add' ? '新增用户' : '更新用户'" v-model="isShow">
            <common-form :formLabel="operateFormLabel" :form="operateForm" ref="form"></common-form>
            <template #footer class="dialog-footer">
                <el-button @click="isShow = false">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </template>
        </el-dialog>

    </div>
</template>

<script>
import CommonTable from './CommonTable.vue';
import CommonForm from './CommonForm.vue'
import http from "../request/index.js"

export default {
    components: {
        CommonTable, CommonForm
    },
    data() {
        return {
            tableData: [],  //用来接收mock随机生成的数据
            tableLabel: [   //新增或编辑的弹出窗口的对象在90~158行
                {
                    field: "name",
                    label: "姓名",
                    width: 150,
                },
                {
                    field: "age",
                    label: "年龄",
                    width: 150,
                },
                {
                    field: "sexLabel",
                    label: "性别",
                    width: 150,
                },
                {
                    field: "levelLabel",
                    label: "客户等级",
                    width: 150,
                },
                // {
                //     field: "birth",
                //     label: "出生日期",
                //     width: 200,
                // },
                {
                    field: "transactions",
                    label: "成交数",
                    width: 150,
                },
                {
                    field: "chargepersonLabel",
                    label: "负责人",
                    width: 150,
                },
                {
                    field: "phone",
                    label: "电话号码",
                    width: 150,
                },
                {
                    field: "addr",
                    label: "地址",
                    width: 310,
                },
            ],
            config: {
                page: 1,
                total: 15, //总记录条数
                limit: 15,  //每页几条
                loading: false,
            },
            searchFrom: {
                keyword: "",
            },
            formLabel: [
                {
                    field: "keyword",
                    label: "",
                },
            ],
            operateType: "add",
            isShow: false,

            operateForm: {
                name: "",
                addr: "",
                age: "",
                //birth: "",
                transactions: "",
                chargeperson: "",
                phone: "",
                sex: "",
                level: "",
            },
            operateFormLabel: [
                {
                    field: "name",
                    label: "姓名",
                },
                {
                    field: "age",
                    label: "年龄",
                },
                {
                    field: "sex",
                    label: "性别",
                    type: "select",
                    opts: [
                        {
                            label: "男",
                            value: 1,
                        },
                        {
                            label: "女",
                            value: 0,
                        },
                    ],
                },
                {
                    field: "level",
                    label: "客户等级",
                    type: "select",
                    opts: [
                        {
                            label: "A",
                            value: 0,
                        },
                        {
                            label: "B",
                            value: 1,
                        },
                        {
                            label: "C",
                            value: 2,
                        },
                        {
                            label: "D",
                            value: 3,
                        },
                    ],
                },
                {
                    field: "transactions",
                    label: "成交数",
                },
                {
                    field: "chargeperson",
                    label: "负责人",
                    type: "select",
                    opts: [
                        {
                            label: "甲",
                            value: 1,
                        },
                        {
                            label: "乙",
                            value: 2,
                        },
                        {
                            label: "丙",
                            value: 3,
                        },
                        {
                            label: "丁",
                            value: 4,
                        },
                    ],
                },
                {
                    field: "phone",
                    label: "电话号码",
                },
                {
                    field: "addr",
                    label: "地址",
                },
            ],

        }
    },
    methods: {
        async getList(name = "") {
            this.config.loading = true;
            // 搜索时，页码需要设置为1，才能正确返回数据，因为数据是从第一页开始返回的
            name = this.searchFrom.keyword;
            name ? (this.config.page = 1) : "";
            let res = await http
                .get("/api/user/getUser", {
                    params: {
                        page: this.config.page,
                        limit: this.config.limit,
                        name,
                    },
                });
            console.log(res);
            this.tableData = res.data.list.map((item) => {
                item.sexLabel = item.sex === 0 ? "女" : "男";  //给label赋值
                if (item.level === 0){  //给label赋值
                    item.levelLabel="A级"
                }else if(item.level === 1){
                    item.levelLabel="B级"
                }else if(item.level === 2){
                    item.levelLabel="C级"
                }else if(item.level === 3){
                    item.levelLabel="D级"
                }
                if (item.chargeperson === 1){  //给label赋值
                    item.chargepersonLabel="张三"
                }else if(item.chargeperson === 2){
                    item.chargepersonLabel="李四"
                }else if(item.chargeperson === 3){
                    item.chargepersonLabel="王五"
                }else if(item.chargeperson === 4){
                    item.chargepersonLabel="赵六"
                }else if(item.chargeperson === 5){
                    item.chargepersonLabel="孙七"
                }else if(item.chargeperson === 6){
                    item.chargepersonLabel="周八"
                }else if(item.chargeperson === 7){
                    item.chargepersonLabel="吴九"
                }



                return item;
            });
            this.config.total = res.data.count;
            this.config.loading = false;
        },
        addUser() {
            this.operateForm = {};
            this.operateType = "add";
            this.isShow = true;
        },
        editUser(row) {
            this.operateType = "edit";
            this.isShow = true;
            // this.operateForm = row;
            this.operateForm = { ...row }
        },
        /*新增或修改的确认 */
        async confirm() {
            if (this.operateType === "edit") {
                let res = await http.post("/api/user/edit", this.operateForm)
                console.log(res.data);
                this.isShow = false;
                this.getList();
            } else {
                let res = await http.post("/api/user/add", this.operateForm)
                console.log(res.data);
                this.isShow = false;
                this.getList();
            }
        },
        async delUser(row) {
            console.log(row);
            try {
                let res =await this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                });
                console.log("***res=", res);
                let res2 = await http.get("/api/user/del", {
                    params: {
                        id: row.id,
                    },
                });
                console.log(res2.data);
                this.$message({
                    type: "success",
                    message: "删除成功!",
                });
                this.getList();

            } catch (error) {
                console.log(error)
                this.$message({
                type: "info",
                message: "已取消删除",
            });
        }
    },
    delUser2(row) {
        this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
        }).then(() => {
            let id = row.id;
            http.get("/api/user/del", {
                params: {
                    id,
                },
            }).then((res) => {
                console.log(res.data);
                this.$message({
                    type: "success",
                    message: "删除成功!",
                });
                this.getList();
            });
        }).catch(() => {
            this.$message({
                type: "info",
                message: "已取消删除",
            });
        });
    },


},
mounted() {
    this.getList();
},
}
</script>

<style lang="scss" scoped>
.manage {
    height: 90%;
    padding-bottom: 20px;
    overflow: hidden;

    &-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }
}
</style>