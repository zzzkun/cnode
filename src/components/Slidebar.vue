<template>
  <div class="Slidebar">     
         <div class="authorsummary">
           <div class="topbar">作者</div>
          <router-link :to="{
          name: 'user-info',
          params:{
            id:userinfo.loginname
          }
        }">
        <img :src="userinfo.avatar_url" alt="">
        </router-link>
         </div>
         <div class="recent_topics">
             <div class="topbar">作者其它话题</div>
             <ul> 
                 <li v-for="(item, index) in topicLimitBy5" :key="index">
                     <router-link :to="{
                          name:'post-content',
                          params:{
                              id:item.id,
                              name:item.author.loginname
                          }
                      }">

                    {{item.title}}
                     </router-link>
                 </li>
             </ul>
         </div>
         <div class="recent_replies">
             <div class="topbar">无人回复的话题</div>
             <ul> 
                 <li v-for="(item, index) in replyLimitBy5" :key="index">
                      <router-link :to="{
                          name:'post-content',
                          params:{
                            id:item.id,
                            name:item.author.loginname
                          }
                      }">

                    {{item.title}}
                     </router-link>
                 </li>
             </ul>
         </div>
    
  </div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
        isLoading: false,
        userinfo:{}
    }
  },

  methods:{
       getArticleData(){
      this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`).then((res) => {
        if (res.data.success  === true) {
           this.isLoading = false;
          this.userinfo = res.data.data;
        }
      }).catch((err) => {
        
      });
    }
  },
  beforeMount(){
      this.getArticleData(),
      this.isLoading = true
  },
  computed: {
      topicLimitBy5(){
          if (this.userinfo.recent_topics) {
             return this.userinfo.recent_topics.slice(0,5)  //返回一个新的数组，包含从 start 到 end （不包括该元素end）的 arrayObject 中的元素。
             console.log()     
          }
      },
      replyLimitBy5(){
          if (this.userinfo.recent_replies) {
             return this.userinfo.recent_replies.slice(0,5)
          }
      }
  },

}
</script>
<style  scoped>
 .authorsummary, .recent_replies, .recent_topics {
    background-color: #fff;
  }
  .Slidebar {
    width: 290px;
    font-size: 14px;
    float: right;
    margin-bottom: 20px;
  }
  li{
    white-space: nowrap;
    max-width: 270px;
    line-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .user_profile{
    padding: 10px;
    font-size: 13px;
  }
  .recent_replies ul, .recent_topics ul {
    margin-top: 0px;
    margin-bottom: 0px;
    list-style: none;
    padding-left: 14px;
  }
  .inner{
    padding: 10px;
  }
  ul a {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 12px;
    text-decoration: none;
    color: #778087;
  }
  .topbar{
    padding: 13px;
    background-color: #f6f6f6;
    font-size: 12px;
  }
  .topbar_first{
    margin: auto;
    padding: 13px;
    background-color: #f6f6f6;
    font-size: 12px;
  }
  img {
    height: 48px;
    width: 48px;
    border-radius: 3px;
    margin: 10px;
  }
  .loginname {
    width: 100px;
    float: right;
    margin-top: 22px;
    margin-right: 159px;
    font-size: 14px;
    color: #666;
    text-decoration: none;
  }
  .loginname a {
    text-decoration: none;
    color: #778087;
  }
  .authorsummay .topbar {
    margin-top: 0px;
  }
</style>