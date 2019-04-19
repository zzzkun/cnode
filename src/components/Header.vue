<template>
  <div class="Header">
    <router-link :to="{
      name: 'root',
    }">

  <img src="../assets/cnodejs_light.svg" alt="">
    </router-link>
<ul >
  <li><a href="">首页</a></li>
  <li><a href="">关于</a></li>

   
</ul>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {

    }
  }
}
</script>


<style scoped>
.Header{
  background: #444444;
  min-width: 960px;
  height: 50px;
}
img{
  max-width: 120px;
  margin-left: 50px;
  margin-top: 10px;
}
ul{
  list-style: none;
  float: right;
  margin: 4px;
}
li{
  display: inline-block;
  line-height: 20px;
  padding: 10px 15px;
  
}
a{
  text-decoration: none;
  color: #ccc;
  font-style: 14px;
  text-shadow: none;
}
</style>
