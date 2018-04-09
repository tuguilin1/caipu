<template>
	<div class="index">
	  <div class="header">
        <i class="el-icon-menu" @click="classiFied"></i>
        <input  placeholder="请输入内容" @focus="searchShow" />
        <i class="iconfont icon-user" @click="jump"></i>
      </div>
      <Banner></Banner>
      <nav>
        <router-link tag="div" to="/cookvideonav" class="img-nav">
          <img src="https://i1.douguo.com//static/wap/img/m/h_video.png">
        </router-link>
        <router-link tag="div" to="/allfood" class="img-nav">
          <img src="https://i1.douguo.com//static/wap/img/m/h_all.png">
        </router-link>
      </nav>
      <footer>
        <img src="../../static/images/douguo.png">
      </footer>
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
.header{
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


.header i{
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
  display: flex;
  justify-content: center;
  width: 10rem;
}

nav img{
  width: 8rem;
  display: block;
  margin-left: 1rem;
}
footer{
  width: 100%;
}
footer img{
  width: 100%;
}
</style>