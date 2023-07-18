<template>
    <div class="common-table">
        <el-table :data="tableData" height="100%" stripe v-loading="config.loading">
            <!-- 序号 -->
            <el-table-column label="序号" width="85">
                <template #default="scope">
                    <span style="margin-left: 10px">{{ scope.$index + 1 }} </span>
                </template>
            </el-table-column>
            <!-- 各列属性 -->
            <el-table-column show-overflow-tooltip v-for="item in tableLabel" :key="item.field" :label="item.label"
                :width="item.width ? item.width : 250" :prop="item.field" sortable
                :default-sort="{ prop: 'date', order: 'ascending' }">
                <template #default="scope">
                    <span style="margin-left: 10px">{{ scope.row[item.field] }}</span>
                </template>
            </el-table-column>
            <!-- 操作 -->
            <el-table-column label="操作" min-width="132">
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 页码 -->
        <el-pagination class="pager" layout="prev, pager, next" :total="config.total" v-model:current-page="config.page"
            @current-change="changePage" :page-size="config.limit">
        </el-pagination>
    </div>
</template>

<script>
export default {
    props: {
        tableData: Array,
        tableLabel: Array,
        config: Object
    },
    methods: {
        handleEdit(row) {
            console.log("edit")
            // this.$parent.edit(row)
            this.$emit('edit', row)
        },
        handleDelete(row) {
            this.$emit('del', row)
        },
        changePage(page) {
            this.$emit('changePage', page)
        }
    }

}
</script>

<style lang="scss" scoped>
.common-table {
    height: calc(100% - 62px);
    background-color: #fff;
    position: relative;

    .pager {
        position: absolute;
        bottom: 0;
        right: 20px;
    }
}
</style>