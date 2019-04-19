<template>
  <div class="PostList">
      <div class="hea-der">
          <a href="javascript:;" class="topic-tab" @click="getdata('all')">全部</a>
          <a href="javascript:;" class="topic-tab" @click="getdata('good')">精华</a>
          <a href="javascript:;" class="topic-tab" @click="getdata('share')">分享</a>
          <a href="javascript:;" class="topic-tab" @click="getdata('ask')">问答</a>
          <a href="javascript:;" class="topic-tab" @click="getdata('job')">招聘</a>
          <a href="javascript:;" class="topic-tab" @click="getdata('dev')">客户端测试</a>
      </div>
      <!-- 列表 -->
      <div v-for="(item, index) in posts" :key="index" class="cell">
          <!-- 头像 -->
         <router-link :to="{
          name: 'user-info',
          params:{
            name:item.author.loginname
          }
        }">
             <img :src="item.author.avatar_url" >
        </router-link>
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
              <!-- {{item.title}} -->
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
      <pagination @handle="renaderlist" :isRest="isRest"></pagination>
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
        postpage:1,
        tab:"all",
       isRest:false // 判断是是否切换了tab
    }
  },
  
  methods:{
      getdata(tab='all'){
          if(this.tab !== tab){ // 当2次请求是不同的tab栏的时候,就把tab赋值新的tab,同时postpage要重置1
           this.tab = tab
           this.postpage = 1
           this.isRest = !this.isRest // 2次tab把不同的时候就取反,触发 pagination组件的 watch事件
         }
         this.$http.get('https://cnodejs.org/api/v1/topics',{
             params:{
                  tab:this.tab, 
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
        this.getdata(this.tab) // 必填this.tab, 不然tab切换时,getdata里面的if(this.tab != tab) 经常不相等, tab默认是all
        // alert(value)
        //  console.log(this.postpage)
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
    margin-bottom: -10px;
}
.cell:hover{
    background: #f5f5f5;
}
.cell{
    padding: 20px 0 10px 10px;
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
    width: 100px;
    display: inline-block;
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