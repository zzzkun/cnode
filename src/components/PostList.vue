<template>
  <div class="PostList">
      <div class="hea-der">
          <a href="" class="topic-tab">全部</a>
          <a href="" class="topic-tab">精华</a>
          <a href="" class="topic-tab">分享</a>
          <a href="" class="topic-tab">问答</a>
          <a href="" class="topic-tab">招聘</a>
          <a href="" class="topic-tab">客户端测试</a>
      </div>
      <!-- 列表 -->
      <div v-for="(item, index) in posts" :key="index" class="cell">
          <!-- 头像 -->
         <a href="">
             <img :src="item.author.avatar_url" >
         </a>
         <!-- 回复 -->
         <span class="reply_count">
             <span class="count_of_replies">{{item.reply_count}}</span>
             /{{item.visit_count}}
         </span>
         <!-- 标题分类 -->
         <span :class="[{put_good:(item.good == true),put_top:(item.top == true),topiclist_tab:(item.good != true && item.top != true)}]"> 
          <span>{{item| formtitle}}</span>
         </span>
         <!-- 标题 -->
         <router-link :to="{
             name:'post-content',
             params:{
                 id:item.id,
                 name:item.author.loginname
             }
         }">
           <span class="topic_title"> 
              {{item.title}}
           </span>
         </router-link>

         
         <!-- 最终回复时间 -->
         <a href="" class="pull-right">

         <span class="last_active_time">{{item.last_reply_at|formatDate}}</span>
         </a>
         
         
         
       <!-- <ul>
           <li v-for="(item, index) in posts" :key="index">
               <img :src="item.author.avatar_url" >
               {{item.title}}</li>
       </ul> -->
      </div>
      <!-- 分页 -->
      <pagination @handle="renaderlist"></pagination>
  </div>
</template>

<script>
import  pagination from '../components/pagination.vue'
export default {
  components:{
      pagination
  },
  props:{},
  data(){
    return {
        posts:[],
        postpage:1
    }
  },
  
  methods:{
      getdata(){
         this.$http.get('https://cnodejs.org/api/v1/topics',{
             params:{

                 page:this.postpage,
                 limit:20
             }
         }).then((res) => {
            //  item = res.data.data
             this.posts = res.data.data 
         }).catch((err) => {
             
         });
      },
      renaderlist(value){
         this.postpage = value,
         this.getdata()
        // alert(value)
         console.log(this.postpage)
      }
      
  },
  beforeMount(){
      this.getdata()
  },
  
  mounted(){}
}
</script>
<style  scoped>

img{
    width: 30px;
    height: 30px;
    border-radius: 3px;
}
.cell:hover{
    background: #f5f5f5;
}
.cell{
    padding: 10px 0 10px 10px;
    font-size: 14px;
    background: #fff;
}
.hea-der{
    padding: 10px;
    background-color: #f6f6f6;
    border-radius: 3px 3px 0 0;
}
a{
    text-decoration: none;
}
.topic-tab{
    margin: 0 10px;
    color: #80bd01;
}
.reply_count{
    text-align: center;
}
.count_of_replies{
    color: #9e78c0;
}
.topic_title{
    color: #333;
    max-width: 70%;
    white-space: nowrap;
    display: inline-block;
    vertical-align: middle;
    font-size: 16px;
    line-height: 30px;
    text-decoration: none;
    overflow: hidden;
    text-overflow: ellipsis;
}
.pull-right{
    color: #778087;
    float: right;
    /* font-size: 11px; */
    
}
.last_active_time{
    text-align: right;
    margin: 10px;
    min-width: 50px;
    display: inline-block;
    white-space: nowrap;
}

.put_good, .put_top {
    background: #80bd01;
    padding: 2px 4px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    color: #fff;
    font-size: 12px;
}

.topiclist_tab {
    background-color: #e5e5e5;
    color: #999;
    padding: 2px 4px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    font-size: 12px;
}
</style>