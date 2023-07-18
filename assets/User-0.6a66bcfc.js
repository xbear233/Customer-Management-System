import m from"./CommonTable.8bb1f867.js";import u from"./CommonForm.a1617824.js";import{_ as L,h as i,r as d,o as _,c as v,f as y,a as s,w as t,d as p}from"./index.f771df5d.js";const w={components:{CommonTable:m,CommonForm:u},data(){return{tableData:[],tableLabel:[{field:"name",label:"\u59D3\u540D",width:150},{field:"age",label:"\u5E74\u9F84",width:150},{field:"sexLabel",label:"\u6027\u522B",width:150},{field:"levelLabel",label:"\u5BA2\u6237\u7B49\u7EA7",width:150},{field:"transactions",label:"\u6210\u4EA4\u6570",width:150},{field:"chargepersonLabel",label:"\u8D1F\u8D23\u4EBA",width:150},{field:"phone",label:"\u7535\u8BDD\u53F7\u7801",width:150},{field:"addr",label:"\u5730\u5740",width:310}],config:{page:1,total:15,limit:15,loading:!1},searchFrom:{keyword:""},formLabel:[{field:"keyword",label:""}],operateType:"add",isShow:!1,operateForm:{name:"",addr:"",age:"",transactions:"",chargeperson:"",phone:"",sex:"",level:""},operateFormLabel:[{field:"name",label:"\u59D3\u540D"},{field:"age",label:"\u5E74\u9F84"},{field:"sex",label:"\u6027\u522B",type:"select",opts:[{label:"\u7537",value:1},{label:"\u5973",value:0}]},{field:"level",label:"\u5BA2\u6237\u7B49\u7EA7",type:"select",opts:[{label:"A",value:0},{label:"B",value:1},{label:"C",value:2},{label:"D",value:3}]},{field:"transactions",label:"\u6210\u4EA4\u6570"},{field:"chargeperson",label:"\u8D1F\u8D23\u4EBA",type:"select",opts:[{label:"\u7532",value:1},{label:"\u4E59",value:2},{label:"\u4E19",value:3},{label:"\u4E01",value:4}]},{field:"phone",label:"\u7535\u8BDD\u53F7\u7801"},{field:"addr",label:"\u5730\u5740"}]}},methods:{async getList(a=""){this.config.loading=!0,a=this.searchFrom.keyword,a&&(this.config.page=1);let l=await i.get("/api/user/getUser",{params:{page:this.config.page,limit:this.config.limit,name:a}});console.log(l),this.tableData=l.data.list.map(e=>(e.sexLabel=e.sex===0?"\u5973":"\u7537",e.level===0?e.levelLabel="A\u7EA7":e.level===1?e.levelLabel="B\u7EA7":e.level===2?e.levelLabel="C\u7EA7":e.level===3&&(e.levelLabel="D\u7EA7"),e.chargeperson===1?e.chargepersonLabel="\u5F20\u4E09":e.chargeperson===2?e.chargepersonLabel="\u674E\u56DB":e.chargeperson===3?e.chargepersonLabel="\u738B\u4E94":e.chargeperson===4?e.chargepersonLabel="\u8D75\u516D":e.chargeperson===5?e.chargepersonLabel="\u5B59\u4E03":e.chargeperson===6?e.chargepersonLabel="\u5468\u516B":e.chargeperson===7&&(e.chargepersonLabel="\u5434\u4E5D"),e)),this.config.total=l.data.count,this.config.loading=!1},addUser(){this.operateForm={},this.operateType="add",this.isShow=!0},editUser(a){this.operateType="edit",this.isShow=!0,this.operateForm={...a}},async confirm(){if(this.operateType==="edit"){let a=await i.post("/api/user/edit",this.operateForm);console.log(a.data),this.isShow=!1,this.getList()}else{let a=await i.post("/api/user/add",this.operateForm);console.log(a.data),this.isShow=!1,this.getList()}},async delUser(a){console.log(a);try{let l=await this.$confirm("\u6B64\u64CD\u4F5C\u5C06\u6C38\u4E45\u5220\u9664\u8BE5\u8BB0\u5F55, \u662F\u5426\u7EE7\u7EED?","\u63D0\u793A",{confirmButtonText:"\u786E\u5B9A",cancelButtonText:"\u53D6\u6D88",type:"warning"});console.log("***res=",l);let e=await i.get("/api/user/del",{params:{id:a.id}});console.log(e.data),this.$message({type:"success",message:"\u5220\u9664\u6210\u529F!"}),this.getList()}catch(l){console.log(l),this.$message({type:"info",message:"\u5DF2\u53D6\u6D88\u5220\u9664"})}},delUser2(a){this.$confirm("\u6B64\u64CD\u4F5C\u5C06\u6C38\u4E45\u5220\u9664\u8BE5\u8BB0\u5F55, \u662F\u5426\u7EE7\u7EED?","\u63D0\u793A",{confirmButtonText:"\u786E\u5B9A",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(()=>{let l=a.id;i.get("/api/user/del",{params:{id:l}}).then(e=>{console.log(e.data),this.$message({type:"success",message:"\u5220\u9664\u6210\u529F!"}),this.getList()})}).catch(()=>{this.$message({type:"info",message:"\u5DF2\u53D6\u6D88\u5220\u9664"})})}},mounted(){this.getList()}},C={class:"manage"},x={class:"manage-header"};function F(a,l,e,T,o,r){const c=d("el-button"),f=d("CommonForm"),g=d("CommonTable"),h=d("common-form"),b=d("el-dialog");return _(),v("div",C,[y("div",x,[s(c,{type:"primary",onClick:l[0]||(l[0]=n=>r.addUser())},{default:t(()=>[p("+ \u65B0\u589E")]),_:1}),s(f,{inline:"",formLabel:o.formLabel,form:o.searchFrom},{default:t(()=>[s(c,{type:"primary",onClick:l[1]||(l[1]=n=>r.getList(o.searchFrom.keyword))},{default:t(()=>[p("\u641C\u7D22")]),_:1})]),_:1},8,["formLabel","form"])]),s(g,{tableData:o.tableData,tableLabel:o.tableLabel,config:o.config,onChangePage:l[2]||(l[2]=n=>r.getList()),onEdit:r.editUser,onDel:r.delUser},null,8,["tableData","tableLabel","config","onEdit","onDel"]),s(b,{title:o.operateType==="add"?"\u65B0\u589E\u7528\u6237":"\u66F4\u65B0\u7528\u6237",modelValue:o.isShow,"onUpdate:modelValue":l[4]||(l[4]=n=>o.isShow=n)},{footer:t(()=>[s(c,{onClick:l[3]||(l[3]=n=>o.isShow=!1)},{default:t(()=>[p("\u53D6 \u6D88")]),_:1}),s(c,{type:"primary",onClick:r.confirm},{default:t(()=>[p("\u786E \u5B9A")]),_:1},8,["onClick"])]),default:t(()=>[s(h,{formLabel:o.operateFormLabel,form:o.operateForm,ref:"form"},null,8,["formLabel","form"])]),_:1},8,["title","modelValue"])])}const D=L(w,[["render",F],["__scopeId","data-v-d0f4e173"]]);export{D as default};