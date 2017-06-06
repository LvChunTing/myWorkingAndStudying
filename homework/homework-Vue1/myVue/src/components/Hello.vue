<template>
    <Table :persons="persons" ></Table>
</template>

<script>

  export default {
    name: 'Hello',
    data () {
      return {
        persons: [
        {name: '张三', sex: '男', age: '18', note: '颜值担当', see: true},
        {name: '李四', sex: '男', age: '52', note: '大长腿', see: true},
        {name: '王二麻子', sex: '女', age: '19', note: '高鼻梁', see: true}
        ]
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
