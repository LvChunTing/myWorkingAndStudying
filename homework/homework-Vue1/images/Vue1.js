/**
 * Created by Administrator on 2017/4/5 0005.
 */
var app = new Vue({
    el: '#app',
    data: {
        persons: [{name: "张三", sex: "男", age: "18", note: "颜值担当",see:true},
            {name: "李四", sex: "男", age: "52", note: "大长腿",see:true},
            {name: "王二麻子", sex: "女", age: "19", note: "高鼻梁",see:true},],
        newPerson: {
            name: "",
            sex:"",
            age:"",
            note:"",
            see:""
        }
    },
    methods: {
        del:function (index) {
            app.persons.splice(index,1);
        },
        add: function () {
            app.newPerson.see=true;
            app.persons.push(app.newPerson);
            app.newPerson = {name: "", sex: "", age: "", note: "", see:""};
        },
        change:function (index) {
            app.persons[index].see = !app.persons[index].see;
            if(app.persons[index].see){
                event.target.value = "修改";
            }else{
                event.target.value = "确认修改";
            }
        }
    }
});