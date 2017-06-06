<template>
   <table border="0" cellspacing="0" cellpadding="">
       <tr v-if="persons.length>0"><th>序号</th><th>姓名</th><th>性别</th><th>年龄</th><th>备注</th><th>操作</th></tr>
       <tr v-for="(person,index) in persons"  v-if="persons.length>0">
           <td>{{index +1}}</td>
           <!--显示的时候-->
           <td v-show="person.see">{{person.name}}</td>
           <td v-show="person.see">{{person.sex}}</td>
           <td v-show="person.see">{{person.age}}</td>
           <td v-show="person.see">{{person.note}}</td>
           <!--修改的时候-->
           <td v-show="!person.see"><input type="text" v-model="person.name"></td>
           <td v-show="!person.see"><input type="text" v-model="person.sex"></td>
           <td v-show="!person.see"><input type="text" v-model="person.age"></td>
           <td v-show="!person.see"><input type="text" v-model="person.note"></td>
           <td><input type="button" value="修改" v-on:click="change(index,$event)"><input type="button" value="删除" v-on:click="del(index)"></td>
       </tr>
       <tr  v-if="persons.length>0"><td></td><td><input type="text" v-model="newPerson.name"></td><td><input type="text" v-model="newPerson.sex"></td><td><input type="text" v-model="newPerson.age"></td><td><input type="text" v-model="newPerson.note"></td><td><input type="button" value="添加" v-on:click="add()"></td></tr>
       <tr v-if="persons.length<=0"><th>什么都没有了....</th></tr>
   </table>
</template>

<script>
  export default {
    name: 'Table',
    props: {
      persons: [Array, Object]
    },
    data () {
      return {
        newPerson: {
          name: '',
          sex: '',
          age: '',
          note: '',
          see: ''
        }
      }
    },
    methods: {
      del: function (index) {
        this.persons.splice(index, 1)
      },
      add: function () {
        this.newPerson.see = true
        this.persons.push(this.newPerson)
        this.newPerson = {name: '', sex: '', age: '', note: '', see: ''}
      },
      change: function (index) {
        this.persons[index].see = !this.persons[index].see
        if (this.persons[index].see) {
          event.target.value = '修改'
        } else {
          event.target.value = '确认修改'
        }
      }
    }
  }

</script>
<style>
  table {
            min-width: 100px;
            margin: 0 auto;
        }
        table tr:first-child,table tr:last-child{
            background-color: #42b983!important;
            color: #000!important;
        }
        table tr:last-child input[type=button] {
            background-color: #000;
            color: #FFF;
            border-radius: 5px;
        }
        th {
            padding: 5px 40px;
            text-align: center;
        }
        td {
            text-align: center;
            padding:5px ;
        }
        tr input[type=button]{
            border-radius: 3px;
            border:1px solid #42b983;
            background-color:#42b983;
            margin:0 5px;
        }
        tr input[type=text]{
           text-align: center;
        }
        tr:nth-child(odd){
            background-color: #666;
            color: #fff;
        }
        tr:nth-child(even){
            background-color: #fff;
            color: #000;
        }
</style>

