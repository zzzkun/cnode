<template>
  <div id="app">
  
     <Header></Header>
     <div class="main">
     <router-view name='slidebar'></router-view>
    <router-view name='main'></router-view>
     </div>
  </div>

</template>

<script>
import Header from './components/Header'
import PostList from './components/PostList'
export default {
  name: 'App',
  components:{
    Header,
    PostList
  }
}
</script>

<style>
body{
   margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #e1e1e1;
  font-family: "Helvetica Neue","Luxi Sans","DejaVu Sans",Tahoma,"Hiragino Sans GB",STHeiti,sans-serif!important;
}
.main{
    width: 90%;
    max-width: 1400px;
    min-width: 960px;
    margin: 15px auto;
    min-height: 400px;
}
</style>
