<template>
  <div class="pagination" @click="change($event)">
     <button>首页</button>
     <button  >上一页</button>
     <button  v-if="jduge" class="pagebtn">...</button>
     <button v-for="(item, index) in items" :key="index" :class="[{Page:item == current},'pagebtn']">{{item}}</button>
     <button  >下一页</button>
  </div>
</template>

<script>
export default {
  components:{},
  props:{
    isRest:{
      type:Boolean,
      default:false
    
    }
  },
  data(){
    return {
        items:[1,2,3,4,5,'.....'],
        current:1,
        jduge:false
    }
  },
  watch:{
    isRest(){ // isRest改变触发,重置该组件的样式
    console.log(111)
      this.items = [1,2,3,4,5,'.....'];
      this.current = 1
    }
  },
  computed:{},
  methods:{
    change($event) {
      // console.log($event.target);
      let value = $event.target
      if (value.className == 'pagination') return;
      if ((value.innerText - 0) != value.innerText) { // NaN == NaN => false
        switch (value.innerText) {
          case '上一页':
            if (this.current > 1) {
              this.current--
            }
            break;
          case '下一页':
            this.current++
            break;
          case '首页':
            this.items = [1, 2, 3, 4, 5, '.....'];
            this.current = 1
            break;
        }
      } else {
        // console.log(value.innerText)
        if (value.innerText > 4) {
          this.jduge = true
        } else {
          this.jduge = false
        }
        this.current = Number(value.innerText)
      }
      if (this.current == this.items[4]) {
        this.items.shift() //移除第一个元素
        this.items.splice(4, 0, this.items[3] + 1) //splice()方法删除位于 index 4 的元素，并添加一个新元素来替代被删除的元素。
      } else if (this.current == this.items[0] && this.current > 1) {
        this.items.unshift(this.items[0] - 1)
        this.items.splice(5, 1)
      }

      this.$emit('handle', this.current); //子传父组件的方法  触发自定义handle的函数  其中handle为父组件定义函数，this.current为需要传递参数

    }
  },
  created(){},
  mounted(){}
}
</script>
<style  scoped>
  .pagination {
    margin-top: 5px;
    margin-bottom: 20px;
    background-color: white;
    padding: 6px 20px;
    border-radius: 5px;
    /*box-shadow: 0px 2px 9px #888888;*/
    border: 1px solid #888888;
  }

  button {
    background-color: #fff;
    border: 1px solid #ddd;
    color: #778087;
    border-radius: 3px;
    outline: none;
    height: 21px;
    cursor: pointer;
    padding: 0 2px;
    width: 55px;
    height: 29px;
  }

  .pagebtn {
    position: relative;
    bottom: 1px;
    width: 40px;
    margin: 0 4px;
  }

  .Page {
    color: white;
    background-color: #1f1b1b;

  }
</style>