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
			<div class="news-content" v-for="(item,index) in list" :key="index" @click="showMessage(item)">
		    	<div class="user-avatar"><img :src="item.avatar" alt=""></div>
		    	<div class="user-information">
		    		<div class="user-name">
		    			{{item.username}}
		    		</div>
					<mt-badge size="small" type="error">{{  exist[item.phonenumber] }}</mt-badge>
		    	</div>
		    </div>
		</div>
		<Message v-if="isMessageshow" @stopMessage="showMessage" :toUser="chattingUser" :content="content"></Message>
		<new-friend v-if="isSearchshow" @stopSearch="showSearch" :content="content"></new-friend>
	</div>
</template>

<script type="text/javascript">
import newFriend from "@/components/newFriend"
import Message from "@/components/message"
import { mapGetters } from "vuex"
import axios from "axios"
import { Badge } from 'mint-ui'
export default{
  components:{
	  newFriend,
	  Message
  },
  data(){
      return{
          id:'',
          isAppendshow:false,
          isSearchshow:false,
          isMessageshow:false,
          list:[],
          exist:{},
          chattingUser:"",
          content:{}
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
	    let code="",bool=true;
		data.from == this.phone? (()=>{
			code=data.to,bool=false;
		})():code=data.from;
		if(code == this.chattingUser){
			this.content = data.content
		}
      	this.getUser(code,bool)
    },
    message:function(data){
		let code="",bool=true;
		data.from == this.phone? (()=>{
			code=data.to,bool=false;
		})():code=data.from;
		this.getUser(code,bool)
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
	showMessage(item){
		if(this.isMessageshow){
			this.isMessageshow = false
		}else{
			this.chattingUser = item.phonenumber;
			this.isMessageshow = true;
			delete this.exist[item.phonenumber];
			this.$set(this.exist,item.phonenumber,0);
		}
	},
    getUser:function(id,bool){
    	  	if(id in this.exist){
    	  		if(bool){
	    	  		let num = this.exist[id];
	    	  		delete(this.exist[id]);
		  			this.$set(this.exist,id,num+1);
    	  		}
				return false
			}else{
				if(bool){
					this.exist[id] = 1;
				}else{
					this.exist[id] = 0;
				}

			}
    	    axios.get("/users/user",{
    			params:{
    				phone:id,
    				name:id
    			}
    		}).then((_data)=>{
    			if(_data.data.status==1){
            		this.list.unshift(_data.data.list[0])			
      			}
      			console.log(this.list)
    		})
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
    getMessage:function(){
    	axios.get("/message/chat",{
    		params:{
    			phone:this.phone
    		}
    	}).then((data)=>{
    		console.log(data)

    		data.data.data.forEach((item)=>{
    			let code="",bool=true;
    			item.from == this.phone? (()=>{
    				code=item.to,bool=false;
    			})():code=item.from
	    		this.getUser(code,bool)
    		})
    	})
    	axios.get("/message/chatted",{
    		params:{
    			phone:this.phone
    		}
    	}).then((data)=>{
    		data.data.data.forEach((item)=>{
    			let code="",bool=true;
    			item.from == this.phone? (()=>{
    				code=item.to,bool=false;
    			})():code=item.from
    	  		if(code in this.exist){
    	  			if(bool){
	    	  			let num = this.exist[code];
	    	  			delete(this.exist[code]);
		  				this.$set(this.exist,code,num+1);
    	  			}
					return false
				}else{
					if(bool){
						this.exist[code] = 1;
					}else{
						this.exist[code] = 0;
				}

			}
	    		axios.get("/users/user",{
	    			params:{
	    				phone:code,
	    				name:code
	    			}
	    		}).then((_data)=>{
	    			if(_data.data.status==1){
	            		this.list.push(_data.data.list[0])			
	      			}
	    		})
    		})
    	})
    },
    back(){
    	history.go(-1)
    }
  },
  mounted(){
  	this.$socket.emit("newuser",{phone:this.phone})
  	this.getMessage()
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
		position:relative;
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
	.mint-badge.is-size-small{
		position: absolute;
		right:1rem;
		top:2rem;
	}
	.last-setence{
		margin-top: 1rem;
		white-space: nowrap;
		color:#555;
	}
</style>