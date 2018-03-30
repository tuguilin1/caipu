<template>
	<div class="news">
		<div class="news-header">
			<i class="el-icon-arrow-left" @click="back"></i>
			消息
			<i class="el-icon-plus" @click="showAppend"></i>
			<div class="append" v-show="isAppendshow">
				<div @click="showSearch">添加好友</div>
				<div>添加群</div>
				<div>新建群</div>
			</div>
		</div>
		<new-friend v-if="isSearchshow" @stopSearch="showSearch"></new-friend>
	</div>
</template>

<script type="text/javascript">
import newFriend from "@/components/newFriend"
import { mapGetters } from "vuex"
export default{
  components:{
	  newFriend
  },
  data(){
      return{
          id:'',
          isAppendshow:false,
          isSearchshow:false
      }
  },
  computed:{
  	...mapGetters([
  		"phone",
  		"isLogined"
  		])
  },
  sockets:{
    connect: function(){
      console.log("连接成功")
    },
    message:function(data){
      	console.log(data)
    }
  },
  methods: {
  	showAppend:function(){
    	if(this.isAppendshow){
    		this.isAppendshow = false
    	}
    	else{
    		this.isAppendshow = true
    	}
    },
    showSearch:function(){
    	if(this.isSearchshow){
    		this.isSearchshow = false
    	}
    	else{
    		this.isSearchshow = true
    		this.isAppendshow = false
    	}
    },
    back(){
    	history.go(-1)
    }
  }
}
</script>

<style type="text/css">
	.news-header{
		width: 100%;
		position: fixed;
		top:0;
		text-align: center;
		height: 3rem;
		font-size: 1rem;
		line-height: 3rem;
		background: #EEE;
		border-bottom: 1px solid #DDD
	}
	.news-header .el-icon-plus{
		position: absolute;
		right: 1rem;
		font-size: 1.5rem;
		margin-top: 0.75rem;
	}
	.news-header .el-icon-arrow-left{
		position: absolute;
		left: 1rem;
		font-size: 1.5rem;
		margin-top: 0.75rem;
	}
	.append{
		width: 5rem;
		height: 9rem;
		background-color: #DDD;
		position: relative;
		left: 15rem;
		top:-0.5rem;
	}
</style>