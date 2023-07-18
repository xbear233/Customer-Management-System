<template>
  <div style="height: 100%" ref="echart">echart</div>
</template>

<script>
//Vue使用官方Echarts5(v5)
//https://www.icode9.com/content-4-863034.html

// import echarts from "echarts";
import * as echarts from 'echarts';


export default {
  props: {
    age: {
      type: Number,
    },
  },
 data() {
    return {
      echart: null,
      msg: "xxxx",
    };
  },
  methods: {
    setOption(opt) {
      this.echart.setOption(opt);
    },
    xxxx() {
      console.log("*******************")
    }

  },
  mounted() {
    this.echart = echarts.init(this.$refs.echart);
    console.log(this.age)
    console.log(this.$parent);
  },
};
</script>

<style lang="scss" scoped>

</style>
