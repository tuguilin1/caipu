<template>
	<div class="index">
	  <header>
        <i class="el-icon-menu" @click="classiFied"></i>
        <input  placeholder="请输入内容" @focus="searchShow" />
        <i class="iconfont icon-user" @click="jump"></i>
      </header>
      <Banner></Banner>
      <nav>
        <router-link to="/dish/菠菜" tag="div">
          <img src="../../static/images/bocai.jpg" alt="">
          <span>菠菜</span>
        </router-link>
        <router-link to="/dish/木耳" tag="div">
          <img src="../../static/images/muer.jpg" alt="">
          <span>木耳</span>
        </router-link>
        <router-link to="/dish/苹果" tag="div">
          <img src="../../static/images/pingguo.jpg" alt="">
          <span>苹果</span>
        </router-link>
        <router-link  tag="div" to="/allfood">
          <img src="../../static/images/quanbu.jpg" alt="">
          <span>全部</span>
        </router-link>
      </nav>
      <class-fied v-show="cf_show" :cfShow="cf_show" @back="classiFied"></class-fied>
      <Search v-show="is_searchShow" @goBack="searchShow" :isSearchshow="is_searchShow"></Search>  
	</div>
</template>

<script>
import Banner from "@/components/banner"
import classFied from "@/components/classfied"
import Search from "@/components/search.vue"
import { mapGetters } from 'vuex'
export default {
  components:{
    Banner,
    classFied,
    Search
  },
  data(){
    return{
      cf_show:false,
      is_searchShow:false,
    }
  },
  computed:{
    ...mapGetters([
        "isLogined"
      ])
  },
  methods:{
    classiFied:function(){
      if(this.cf_show === true){
        this.cf_show=false
      }
      else{
        this.cf_show=true
      }
    },
    searchShow(){
      if(this.is_searchShow === true){
        this.is_searchShow=false
      }
      else{
        this.is_searchShow=true
      }
    },
    jump(){
      if(!this.isLogined){
        this.$router.push("/login")
      }else{
        this.$router.push("/person")
      }
    }
  }

}
</script>

<style>
*{
  padding: 0;
  margin: 0;
}
.index{
  z-index: 0;
}
.index header{
  width: 18rem;
  height: 4rem;
  line-height: 4rem;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-left: 1rem;
  -webkit-box-pack: space-between;
  -webkit-justify-content: space-between;
  -ms-flex-pack: space-between;
  justify-content: space-between;
}


.index i{
  font-size: 1.5rem;
  line-height: 4rem;
  
}
.index input{
  margin-top: 1rem;
  display: block;
  width: 10rem;
  height: 2rem;
  border:0;
  outline: none;
  padding-left: 0.5rem;
  background: #EEE;
  -moz-border-radius:0.5rem; /* Firefox */
  -webkit-border-radius: 0.5rem; /* Safari 和 Chrome */
  border-radius: 0.5rem; /* Opera 10.5+, 以及使用了IE-CSS3的IE浏览器 */
}

/*导航布局*/
nav{
  width: 20rem;
  height: 4rem;
  margin-top: 1rem;
  display: flex;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  flex-direction: row;
}

nav div{
  width: 3rem;
  height: 4rem;
  margin-left: 1.6rem;
  font-size: 0.6rem;
  text-align: center;
}

nav img{
  width: 100%;
  height: 3rem;
  display: block;
  -moz-border-radius:1.25rem; /* Firefox */
  -webkit-border-radius: 1.25rem; /* Safari 和 Chrome */
  border-radius: 1.25rem;
}

</style>