<template>
	<div class="new-friend">
		<header>
	        <i class="el-icon-arrow-down"></i>
	        <input ref="input"  placeholder="输入对方手机号或昵称"/>
	        <i class="el-icon-search" @click="inputSearch"></i>
	    </header>
	    <div class="user" v-for = "(item,index) in users" :key="index">
	    	<div class="user-avatar"><img :src="item.avatar" alt=""></div>
	    	<div class="user-information">
	    		<div class="user-name">
	    			{{item.username}}
	    		</div>
	    		<div class="operation">
	    			<el-button type="info" plain @click="sendMessage">发消息</el-button>
	    		</div>
	    	</div>
	    </div>
	    <Message v-if="isMessageshow"></Message>
	</div>
</template>

<script type="text/javascript">
import axios from "axios"
import Message from "@/components/message"
	export default{
		components:{
			Message
		},
		data(){
			return {
				users:'',
				isMessageshow:false
			}
		},
		methods:{
			inputSearch(){
				const value = this.$refs.input.value;
				if(value !== ""){
					const data={
						phone:"",
						name :""
					}
					var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
					if(myreg.test(value)){
						data.phone = value;
					}else{
						data.name = value;
					}
					axios.get("/users/user",{
						params:data
					}).then((data)=>{
						console.log(data);
						if(data.data.status){
							this.users = data.data.list
						}else{
							this.users = ''
						}
					})
				}	
			},
			sendMessage(){
				this.isMessageshow = true
			}
		},

	}
</script>

<style type="text/css">
	.new-friend{
		position: fixed;
		top:0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #EEE;
		z-index: 10
	}
	.new-friend header{
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
	  border-bottom: 1px solid #DDD
	}
	.new-friend i{
	  font-size: 1.5rem;
	  line-height: 4rem;
	  
	}
	.new-friend header input{
	  margin-top: 1rem;
	  display: block;
	  width: 10rem;
	  height: 2rem;
	  border:0;
	  outline: none;
	  padding-left: 0.5rem;
	  background: #FFF;
	  -moz-border-radius:0.5rem; /* Firefox */
	  -webkit-border-radius: 0.5rem; /* Safari 和 Chrome */
	  border-radius: 0.5rem; /* Opera 10.5+, 以及使用了IE-CSS3的IE浏览器 */
	}
	.user{
		width: 100%;
		display: flex;
		box-sizing: border-box;
		padding-left: 1rem;
		padding-right: 1rem;
		height: 5rem;
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
	.operation button{
		width: 4rem;
		height: 2rem;
		margin-left: 8rem;
		text-align: center;
		margin-top: 1rem;
		padding: 0 0;
	}
</style>