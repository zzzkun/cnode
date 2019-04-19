<template>
  <div class="Article">
    <div class="loading" v-if="isLoading">
      <!-- <img src="../assets/loading.gif"> -->
    </div>
    <div v-else>
  <div class="top" >
      <div class="topic_header">
        <div class="topic_full_title">{{item.title}}</div>
        <ul>
          <li>发布于 {{item.create_at | formatDate}}</li>
          <li>作者 {{item.author && item.author.loginname}}</li>
          <li>{{item.visit_count}}次浏览</li>
          <li>最后一次编辑是{{item.last_reply_at| formatDate}}</li>
          <li>来自{{item | formtitle}}</li>
        </ul>
        <div v-html="item.content" class="topic_content"></div>
      </div>
      <div id="reply">

      <div class="topbara">回复</div>
      <div v-for="(item, index) in item.replies" :key="index" class="a">
        <router-link :to="{
          name: 'user-info',
          params:{
            name:item.author.loginname
          }
        }">
        <img :src="item.author.avatar_url" alt="">
        </router-link>

        
        <span>{{item.author.loginname}}</span>
        
        <span>{{index+1}}楼</span>
        <span>{{item.create_at| formatDate}}</span>
        <span v-if="item.ups.length>0" class="user_action">☝{{item.ups.length}}</span>
      
        <p v-html="item.content" class="cell"></p>
      </div>
      </div>
  </div>
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
      item:{}
    }
  },

  methods:{
    getArticleData(){
      this.$http.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`).then((res) => {
        if (res.data.success  === true) {
           this.isLoading = false;
          this.item = res.data.data;
        }
      }).catch((err) => {
        
      });
    }
  },
  beforeMount(){
      this.getArticleData(),
      this.isLoading = true;
  },
  watch: {
    $route(to, from) {
      this.getArticleData();
    }
  }

}
</script>
<style>
@import url('../assets/github-markdown.css');
.Article{

    padding: 0;
    margin-right: 305px;
}
.topbara {
  padding: 5px;
  background-color: #f6f6f6;
  height: 16px;
  font-size: 12px;
  /* margin-top: 10px; */
}
#reply,
.topic_header {
  background-color: #fff;
}
#reply {
  margin-top: 15px;
}
#reply img {
  width: 30px;
  height: 30px;
  position: relative;
  bottom: -3px;
  border-radius: 3px;
}
#reply a,
#reply span {
  font-size: 13px;
  color: #666;
  text-decoration: none;
}
.replySec {
  border-bottom: 1px solid #e5e5e5;
  padding: 0 10px;
}

.replyUp a:nth-of-type(2) {
  margin-left: 0px;
  display: inline-block;
}
.topic_header {
  padding: 10px;
}
.topic_full_title {
  font-size: 20px;
  font-weight: bold;
  padding-top: 8px;
}
.topic_header ul {
  list-style: none;
  padding: 0px 0px;
  margin: 6px 0px;
}
.topic_header li {
  display: inline-block;
  font-size: 12px;
  color: #838383;
}
.topic_content {
  border-top: 1px solid #e5e5e5;
  padding: 0 10px;
}
.markdown-text img {
  /* width: 50% !important;
   */
   cursor: pointer;
}
img {
    
    height: auto;
    max-width: 100%;
    vertical-align: middle;
    border: 0;
    
}
.a{
  margin: 10px;
}
.user_action{
  float: right;
    margin-left: 20px;
    font-size: 15px;
}
.cell{
    padding-right: 10px;
    background: #fff;
    border-bottom: 1px solid #f0f0f0;
}
</style>