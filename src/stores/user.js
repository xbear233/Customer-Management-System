import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
       token: "" ,  //存放登录标记
       menu:Object, //存放菜单
    }
  },
  actions:{
        /*选中菜单 */
        selectMenu(item) {
          /* 如果不是首页 */
          if (item.name !== "home") {
            // state.currentMenu = item;
            /* 检查tab页是否已经存在，如果不存在，则添加进来 */
            let result = this.tabsList.findIndex(obj => obj.name === item.name);
            if (result === -1) this.tabsList.push(item);
            /*将打开的tab页保存到sessionStorage */
            // window.sessionStorage.setItem('tabsList', JSON.stringify(state.tabsList))
          } else {
            // state.currentMenu = null;
          }
        },
            /*关闭tab页 */
    closeTab(item) {
      let result = this.tabsList.findIndex(obj => obj.name === item.name);
      this.tabsList.splice(result, 1);
      // window.sessionStorage.setItem('tabsList', JSON.stringify(state.tabsList))
    },

    
  },
  persist: {
    enabled: true , // 这个配置代表存储生效，而且是整个store都存储
  }


})
