<template>
  <div class="Userinfo">
          <div class="loading" v-if="isLoading">
      <!-- <img src="../assets/loading.gif"> -->
    </div>
      <div v-else>
   <div class="userInfomation">
   <section>
       <img :src="userinfo.avatar_url" alt="">
       <span>{{userinfo.loginname}}</span>
       <p>
           {{userinfo.score}}积分
       </p>
       <p>
           注册时间：{{userinfo.create_at | formatDate}}
       </p>
   </section>
   <div class="replies">
       <p>最近创建的话题</p>
       <ul>
           <li v-for="(item, index) in userinfo.recent_topics" :key="index" class="cell">
               <img :src="userinfo.avatar_url" alt="">
               <router-link :to="{
                   name: 'post-content',
                   params:{id:item.id}
               }">

            <span class="topics-list">{{item.title}} </span>
               </router-link>
           </li>
       </ul>
   </div>
   <div class="topics">
       <p>最近参与的话题</p>
       <ul>
           <li v-for="(item, index) in userinfo.recent_replies" :key="index" class="cell">
                <img :src="item.author.avatar_url" alt="">
                <router-link :to="{
                     name: 'post-content',
                   params:{id:item.id}
               
                }">

                  <span class="topics-list">{{item.title}} </span>
                </router-link>
           </li>
       </ul>
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
  

}
</script>
<style  scoped>

.userInfomation {
  background: white;
  width: 75%;
  margin: 10px auto;
}
.userInfomation section {
  padding: 12px;
}
.userInfomation img {
  width: 30px;
  margin-bottom: -8px;
}
.userInfomation li {
  list-style: none;
}
.userInfomation .replies,
.userInfomation .topics {
  font-size: 0.72rem;
  border-top: 10px #dddddd solid;
}
.userInfomation > div > p {
  padding: 12px 0 12px 12px;
  background-color: rgba(212, 205, 205, 0.17);
  font-size: 0.75rem;
  margin: 0;
}
.userInfomation > div > ul > li {
  padding: 4px 0 4px 12px;
  white-space: nowrap;
  font-size: 0.72rem;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 30px;
  vertical-align: middle;
}
.userInfomation > div > ul > li > a {
  color: #094e99;
  text-decoration: none;
}
ul{
  padding: 0;
}
.cell{
  
    padding-right: 10px;
    background: #fff;
    border-bottom: 1px solid #f0f0f0;
}
img{
  /* padding-top: 20px; */
}
.topics-list{
      margin: 6px 0 0 5px;
      font-size: 16px;
      color: #333;
}
.cell:hover{

background: #f5f5f5;
}
</style>