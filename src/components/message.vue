<template>
	<transition name="message">
	<div class="message">
		<div class="message-head">
			<i class="el-icon-arrow-left" @click="back"></i>
			周杰伦
		</div>
		<div class="message-bottom">
			<div class="input">
				<input type="search" name="">
			</div>
			<div class="send">发送</div>
		</div>
		<div class="content">
			<div class="from">
				<div class="from-img">
					<img :src="fromImg">
				</div>
				<div class="from-content">
					哈哈哈哈或或或或或或或或或或或或或或
				</div>
			</div>
			<div class="to">
				<div class="to-img">
					<img :src="toImg">
				</div>
				<div class="to-content">
					哈哈哈哈或或或或或或或或或或或或或或
				</div>
			</div>
		</div>
	</div>
</transition>
</template>

<script type="text/javascript">
import { mapGetters } from "vuex"
import axios from "axios"
	export default{
		data(){
			return{
				toImg:"",
				fromImg:""
			}
		},
		props:{
			toUser:{
				type:String,
				default:""
			}
		},
		computed:{
			...mapGetters([
				"phone"
				])
		},
		methods:{
			back(){
				this.$emit("stopMessage")
			},
			getUsers(){
				axios.all([axios.get("/users/user",{
					params:{
						phone:this.toUser,
						name:this.toUser
					}
				}),axios.get("/users/user",{
					params:{
						phone:this.phone,
						name:this.phone
					}
				})]).then((data)=>{
					console.log(data)
					if(data[0].data.status===0||data[1].data.status===0){
						return false;
					}else{
						if(data[0].data.list.phonenumber == this.phone){
							this.fromImg = data[0].data.list[0].avatar;
							this.toImg = data[1].data.list[0].avatar
						}else{
							this.fromImg = data[1].data.list[0].avatar;
							this.toImg  = data[0].data.list[0].avatar
						}
						console.log(this.fromImg,this.toImg)
					}
				})
			}
		},
		mounted(){
			this.getUsers()
		}
	}
</script>

<style type="text/css">
	.message{
		position: fixed;
		top:0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #DDD;
		z-index: 30;
	}
	.message-head{
		width: 100%;
		height: 4rem;
		text-align: center;
		line-height: 4rem;
		position: fixed;
		top:0;
		background: #EEE;
	}
	.el-icon-arrow-left{
		position: absolute;
		left: 1rem;
	}
	.message-bottom{
		width: 100%;
		position: fixed;
		bottom: 0;
		background: #EEE;
		height: 3rem;
		display: flex;
	}
	.message-bottom .input{
		width: 15rem;
		height: 2.5rem;
		margin-left: 1rem;
	}
	.message-bottom  input{
		width: 100%;
		height: 100%;
		border: none;
		background: transparent;
		border-bottom: 1px solid #CCC;
		outline: none;
	}
	.send{
		width: 3rem;
		margin-left: 1rem;
		height: 2.5rem;
		line-height: 3rem;
	}
	.message-enter{
		left: 10rem;
		opacity: 0;
	}
	.message-enter-active,.message-leave-active{
		transition:all .5s;
	}
	.message-leave-to{
		left: 10rem;
		opacity: 0;
	}
	.content{
		box-sizing: border-box;
		padding-left: 1rem;
		padding-right: 1rem;
		margin-top: 4.5rem;
	}
	.from{
		margin-bottom: 1rem;
		display: flex;
		justify-content: flex-start;
		height: auto;
		width: 16rem;
	}
	.from-img,.to-img{
		width: 3rem;
		height: 3rem;
	}
	.content img{
		width: 100%;
		height: 100%;
	}
	.from-content{
		flex: 1;
		margin-left: 0.5rem;
		padding: 0.5rem;
		background: #AAA;
		border-radius: 0.5rem;
	}
	.to{
		margin-top: 1rem;
		display: flex;
		justify-content: flex-end;
		height: auto;
		flex-direction: row-reverse;
	}
	.to-content{
		flex: 1;
		margin-right: 0.5rem;
		margin-left: 2rem;
		padding:0.5rem;
		background: #AAA;
		border-radius: 0.5rem;
	}
</style>