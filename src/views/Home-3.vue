<template>
    <el-row :gutter="10">
        <el-col :span="8">
            <el-card shadow="hover">
                <div class="user">
                    <img src="../assets/images/touxiang.jpg" />
                    <div class="userinfo">
                        <p class="name">Bear</p>
                        <p class="access">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登录时间：<span>2023-1-1</span></p>
                    <p>上次登录地点：<span>东莞</span></p>
                </div>
            </el-card>
            <el-card shadow="hover">
                <el-table :data="tableData">
                    <el-table-column show-overflow-tooltip v-for="(val, key) in tableLabel" :key="key" :prop="key"
                        :label="val"></el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="16">
            <el-card shadow="hover">
                <EChart style="height: 280px" ref="order_chart"></EChart>
            </el-card>

            <div class="graph">
                <el-card shadow="hover">
                    <EChart style="height: 260px" ref="user_chart"></EChart>
                </el-card>
                <el-card shadow="hover">
                    <EChart style="height: 260px" ref="video_chart"></EChart>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>

<script>
import EChart from './EChart.vue'; //导入EChart
import http from "../request/index.js"  //导入http

export default {
    components: {
        EChart
    },
    data() {
        return {
            tableData: [],
            tableLabel: {
                name: "合作企业",
                seasonTurnover: "本季度营业额",
                yearTurnover: "本年营业额",
                totalTurnover: "总营业额",
            },
            order_option: {
                xAxis: {
                    type: "category",
                    data: [],
                },
                yAxis: {
                    type: "value",
                },
                series: [],
                legend: {
                    selected: {
                    }
                },
                tooltip: {
                    trigger: 'item',
                    show: true
                },
                title: {
                    text: '公司营业状况图',
                    left: 'left'
                }
            },

            user_option: {
                tooltip: {
                    trigger: "axis",
                    // axisPointer: {
                    //   type: "cross",
                    // },
                },
                legend: {
                    selected: {
                        '新增客户': true,
                        '活跃客户': true
                    }
                },
                tooltip: {
                    trigger: 'item',
                    show: true
                },

                xAxis: {
                    type: "category",
                    data: [],
                },
                yAxis: {
                    type: "value",
                },
                series: [],
                title: {
                    text: '各负责人客户图',
                    left: 'left'
                },
            },

            //饼图
            video_option: {
                series: [
                ],
                tooltip: {
                    trigger: 'item',
                    show: true
                },
                //百分比
                label: {
                    show: true,
                    formatter: function (arg) {
                        return arg.name + arg.percent + '%'
                    }
                },
                title: {
                    text: '合作份额饼图',
                    left: 'center'
                }
            },
        }
    },
    methods: {
        async getchartdata() {
            var res = await http.get("/home/getData");
            console.log(res.data);
            res = res.data;

            var t = res.data.tableData.map(a => a.seasonTurnover)
            console.log(t)

            this.tableData = res.data.tableData;
            // 订单折线图
            const order = res.data.orderData;
            this.order_option.xAxis.data = order.date;
            // 第一步取出series中的name部分——键名
            let keyArray = Object.keys(order.data[0]);
            console.log("*****", order.data[0])
            // 第二步，循环添加数据
            keyArray.forEach((key) => {
                this.order_option.series.push({
                    name: key === "wechat" ? "小程序" : key,
                    data: order.data.map((item) => item[key]),
                    type: "line",
                });
            });
            // 用户柱状图
            this.user_option.xAxis.data = res.data.userData.map((item) => item.date);
            console.log("*****", this.user_option.xAxis.data)
            this.user_option.series.push({
                name: "新增客户",
                data: res.data.userData.map((item) => item.new),
                type: "bar",

            });
            this.user_option.series.push({
                name: "存量客户",
                data: res.data.userData.map((item) => item.active),
                type: "line",
                barGap: 0,
            });
            // 视频饼图
            this.video_option.series.push({
                data: res.data.videoData,
                type: "pie",
            });

            this.$refs.order_chart.setOption(this.order_option);
            this.$refs.user_chart.setOption(this.user_option);
            this.$refs.video_chart.setOption(this.video_option);
        },

    },
    mounted() {
        this.getchartdata();
    },

}
</script>

<style lang="scss" scoped>
.user {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;

    img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        margin-right: 40px;
    }

    .userinfo {
        .name {
            font-size: 32px;
            margin-bottom: 10px;
        }
        .access {
            color: #999999;
        }
    }
}
.login-info {
    p {
        line-height: 28px;
        font-size: 14px;
        color: #999999;

        span {
            color: #666666;
            margin-left: 60px;
        }
    }
}
.num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-card {
        width: 32%;
        margin-bottom: 20px;

        .el-icon {
            font-size: 30px;
            width: 110px;
            height: 110px;
            text-align: center;
            line-height: 110px;
            color: #fff;
        }
        .detail {
            margin-left: 15px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 110px;
            .num {
                font-size: 25px;
                margin-bottom: 10px;
            }
            .txt {
                font-size: 14px;
                text-align: center;
                color: #999999;
            }
        }

    }
}
.graph {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .el-card {
        width: 48%;
    }
}
</style>