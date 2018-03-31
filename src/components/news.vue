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
		<div class="centent">
			<div class="news-content" v-for="(item,index) in list" :key="index">
		    	<div class="user-avatar"><img :src="item.avatar" alt=""></div>
		    	<div class="user-information">
		    		<div class="user-name">
		    			{{item.username}}
		    		</div>
		    		<div class="last-setence">
		    			11111111111111111111111111111111111111111111111111111111111111
		    		</div>
		    	</div>
		    </div>
		</div>

		<new-friend v-if="isSearchshow" @stopSearch="showSearch"></new-friend>
	</div>
</template>

<script type="text/javascript">
import newFriend from "@/components/newFriend"
import { mapGetters } from "vuex"
import axios from "axios"
export default{
  components:{
	  newFriend
  },
  data(){
      return{
          id:'',
          isAppendshow:false,
          isSearchshow:false,
          list:[]
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
    nowMessage:function(data){
      	console.log(data);
      	axios.get("/users/user",{
      		params:{
      			phone:data.from,
      			name:data.from
      		}
      	}).then((_data)=>{
      		if(_data.data.status==1){
            	this.list.push(_data.data.list[0])			
      		}
      		console.log(this.list)
      	})
    },
    message:function(data){
    	console.log(data);
    	const exist=[]
		data.forEach((item)=>{
			if(exist.indexOf(item.from) != -1){
				return false
			}
			exist.push(item.from);
    		axios.get("/users/user",{
    			params:{
    				phone:item.from,
    				name:item.from
    			}
    		}).then((_data)=>{
    			if(_data.data.status==1){
            		this.list.push(_data.data.list[0])			
      			}
      			console.log(this.list)
    		})
    	})
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
  },
  mounted(){
  	this.$socket.emit("newuser",{phone:this.phone})
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
	.centent{
		margin-top: 4rem;
	}
	.news-content{
		width: 100%;
		display: flex;
		box-sizing: border-box;
		padding-left: 1rem;
		padding-right: 1rem;
		height: 5rem;
		border-bottom:1px solid #CCC;
	}
	.user-avatar{
		width: 5rem;
		height: 100%;
	}
	.user-avatar img{
		width: 4rem;
		height: 4rem;
		margin-top: 0.5rem;
	}
	.user-name{
		margin-top: 0.5rem;
	}
	.user-information{
		overflow: hidden;
		width: 12rem;
	}
	.last-setence{
		margin-top: 1rem;
		white-space: nowrap;
		color:#555;
	}
</style>