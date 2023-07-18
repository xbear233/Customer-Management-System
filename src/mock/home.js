import Mock from "mockjs";

//修改图表数据
// 图表数据  
let List = [];
export default {
  getStatisticalData: ()=> {
    for (let i = 0; i < 7; i++) {
      List.push(
        Mock.mock({
          营业收入: Mock.Random.float(100, 8000, 0, 2),
          营收增幅: Mock.Random.float(100, 200, 0, 8),
          营业成本: Mock.Random.float(100, 8000, 0, 2),
          净利润: Mock.Random.float(100, 8000, 0, 2),
          净利润同比: Mock.Random.float(100, 8000, 0, 2),
          营业利润率: Mock.Random.float(0, 1000, 0, 2)
        })
      );
    }
    return {
      code: 20000,
      data: {
        // 饼图  
        videoData: [
          {
            name: "腾讯",
            value: Mock.Random.float(4000, 10000, 0, 2)
          },
          {
            name: "网易",
            value: Mock.Random.float(2000, 10000, 0, 2)
          },
          {
            name: "三七",
            value: Mock.Random.float(1000, 7000, 0, 2)
          },
          {
            name: "世纪华通",
            value: Mock.Random.float(1000, 8000, 0, 2)
          },
          {
            name: "完美世界",
            value: Mock.Random.float(900, 7000, 0, 2)
          },
          {
            name: "吉比特",
            value: Mock.Random.float(800, 5000, 0, 2)
          }
        ],
        // 折线柱状图
        userData: [
          {
            date: "张三",
            new: Mock.Random.integer(1, 100),
            active: Mock.Random.integer(100, 1000)
          },
          {
            date: "李四",
            new: Mock.Random.integer(1, 100),
            active: Mock.Random.integer(100, 1000)
          },
          {
            date: "王五",
            new: Mock.Random.integer(1, 100),
            active: Mock.Random.integer(100, 1000)
          },
          {
            date: "赵六",
            new: Mock.Random.integer(1, 100),
            active: Mock.Random.integer(100, 1000)
          },
          {
            date: "孙七",
            new: Mock.Random.integer(1, 100),
            active: Mock.Random.integer(100, 1000)
          },
          {
            date: "周八",
            new: Mock.Random.integer(1, 100),
            active: Mock.Random.integer(100, 1000)
          },
          {
            date: "吴九",
            new: Mock.Random.integer(1, 100),
            active: Mock.Random.integer(100, 1000)
          }
        ],
        // 折线图
        orderData: {
          date: [
            "2022第一季度",
            "2022第二季度",
            "2022第三季度",
            "2022第四季度",
          ],
          data: List
        },
        tableData: [
          {
            name: "腾讯",
            seasonTurnover: Mock.Random.float(900, 5000, 0, 2),
            yearTurnover: Mock.Random.float(3000, 10000, 0, 2),
            totalTurnover: Mock.Random.float(40000, 1000000, 0, 2)
          },
          {
            name: "网易",
            seasonTurnover: Mock.Random.float(800, 1000, 0, 2),
            yearTurnover: Mock.Random.float(3000, 10000, 0, 2),
            totalTurnover: Mock.Random.float(40000, 1000000, 0, 2)
          },
          {
            name: "三七互娱",
            seasonTurnover: Mock.Random.float(100, 1000, 0, 2),
            yearTurnover: Mock.Random.float(3000, 8000, 0, 2),
            totalTurnover: Mock.Random.float(40000, 1000000, 0, 2)
          },
          {
            name: "世纪华通",
            seasonTurnover: Mock.Random.float(100, 1000, 0, 2),
            yearTurnover: Mock.Random.float(3000, 8000, 0, 2),
            totalTurnover: Mock.Random.float(40000, 1000000, 0, 2)
          },
          {
            name: "完美世界",
            seasonTurnover: Mock.Random.float(100, 1000, 0, 2),
            yearTurnover: Mock.Random.float(3000, 8000, 0, 2),
            totalTurnover: Mock.Random.float(40000, 1000000, 0, 2)
          },
          {
            name: "吉比特",
            seasonTurnover: Mock.Random.float(100, 1000, 0, 2),
            yearTurnover: Mock.Random.float(3000, 5000, 0, 2),
            totalTurnover: Mock.Random.float(40000, 1000000, 0, 2)
          }
        ]
      }
    };
  }
};
