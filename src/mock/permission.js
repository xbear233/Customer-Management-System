import Mock from "mockjs";
export default {
  getMenu: config => {
    const { username, password } = JSON.parse(config.body);  //接收登录信息
    console.log(JSON.parse(config.body));
    // 先判断用户是否存在
    if (username === "admin" || username === "user") {
      // 判断账号和密码是否对应
      if (username === "admin" && password === "123456") {
        return {
          code: 20000,
          data: {
            menu: [  //超级管理员，多菜单
              {
                path: "/home",
                name: "home",
                label: "首页",
                icon: "House",
                url: "Home-3"
              },
              {
                path: "/user",
                name: "user",
                label: "用户管理页",
                icon: "User",
                url: "User-2"
              },
              {
                label: "其他",
                icon: "Setting",
                children: [
                  {
                    path: "/other/page1",
                    name: "page1",
                    label: "页面1",
                    icon: "setting",
                    url: "Other/PageOne"
                  },
                  {
                    path: "/other/page2",
                    name: "page2",
                    label: "页面2",
                    icon: "setting",
                    url: "Other/PageTwo"
                  }
                ]
              }
            ],
            token: Mock.Random.guid(),
            message: "获取成功"
          }
        };
      } else if (username === "user" && password === "123456") {  //普通用户，少菜单
        return {
          code: 20000,
          data: {
            menu: [
              {
                path: "/home",
                name: "home",
                label: "首页",
                icon: "User",
                url: "Home-3"
              },
            ],
            token: Mock.Random.guid(),
            message: "获取成功"
          }
        };
      } else {
        return {
          code: -999,
          data: {
            message: "密码错误"
          }
        };
      }
    } else {
      return {
        code: -999,
        data: {
          message: "用户不存在"
        }
      };
    }
  }
};
