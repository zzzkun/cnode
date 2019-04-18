import Vue from 'vue'
import Router from 'vue-router'
import Article from '../components/Article.vue'
import  postList from '../components/PostList.vue'
import  Userinfo from '../components/Userinfo.vue'
import  Slidebar from '../components/Slidebar.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'root',
      components: {
        main: postList,
       
      }
    },
    {
      path: '/topic/:id&author=:name',
      name: 'post-content',
      components: {
        main: Article,
        slidebar:Slidebar
      }
    },
    {
      path: '/user/:name',
      name: 'user-info',
      components: {
        main: Userinfo
      }
    },
    
    
  ]
})
