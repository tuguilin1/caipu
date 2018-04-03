<template>
	<transition name="message">
	<div class="message">
		<div class="message-head" ref="head">
			<i class="el-icon-arrow-left" @click="back"></i>
			{{toUser}}
		</div>
		<div class="message-bottom" ref="footer">
			<div class="input">
				<input type="search" name="" ref="_input">
			</div>
			<div class="send" @click="send">发送</div>
		</div>
		<div class="content" ref="content">
			<div v-for="(key,index) in list" :key="index">
				<div :class="key.class" >
					<div :class="key.class == 'from'? 'from-img':'to-img'">
						<img :src="key.img">
					</div>
					<div :class="key.class == 'from'? 'from-content':'to-content'">
						{{key.text}}
					</div>
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
				fromImg:"",
				num:0,
				list:[]
			}
		},
		props:{
			toUser:{
				type:String,
				default:""
			},
			content:{
				type:Object,
				default:{}
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
							this.fromImg = data[1].data.list[0].avatar;
							this.toImg = data[0].data.list[0].avatar
						}else{
							this.fromImg = data[0].data.list[0].avatar;
							this.toImg  = data[1].data.list[0].avatar
						}
					}
				})
			},
			send(){
				let date = new Date();
				let _date = `${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}`
				let value = this.$refs._input.value
				if(!value){
					return false;
				}else{
					this.list.push({img:this.toImg,class:"from",num:this.num++,text:value})
					this.$socket.emit("chat1",{from:this.phone,to:this.toUser,content:{
						num:this.num,
						text:value
					},time:_date})
					this.$refs._input.value=""

				}
			}
		},
		mounted(){
			this.getUsers();
			this.$refs.content.style.height = this.$refs.footer.offsetTop - this.$refs.head.offsetHeight + "px"
		},
		watch:{
			content:function(newcontent){
				this.list.push({img:this.fromImg,class:"to",num:this.num,text:newcontent.text})
			},
			list:function(){
				this.$nextTick(()=>{
					let chatTop = this.$refs.content.lastElementChild.offsetTop||0;
					let chatHeight = this.$refs.content.lastElementChild.offsetHeight;
					let headHeight= this.$refs.head.offsetHeight;
					let footerTop = this.$refs.footer.offsetTop;
					if(footerTop-headHeight < chatTop+chatHeight){
						let height = chatTop+chatHeight-footerTop+headHeight;
						this.$refs.content.scrollTop = height;
					}
				})

			}
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
		margin-top: 1rem;
		font-size: 1.5rem;
	}
	.message-bottom{
		width: 100%;
		position: fixed;
		bottom: 0;
		background: #EEE;
		height: 3rem;
		display: flex;
		z-index: 30;
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
		position:fixed;
		box-sizing: border-box;
		padding-left: 1rem;
		padding-right: 1rem;
		top: 4.5rem;
		width: 20rem;
		bottom: 5rem;
		overflow: scroll;
	}
	.to{
		margin-top: 1rem;
		display: flex;
		justify-content: flex-start;
		height: auto;
	}
	.from-img,.to-img{
		width: 3rem;
		height: 3rem;
	}
	.content img{
		width: 100%;
		height: 100%;
	}
	.to-content{
		margin-left: 0.5rem;
		padding: 0.5rem;
		background: #AAA;
		border-radius: 0.5rem;
		max-width: 6rem;
		word-wrap: break-word;
	}
	.from{
		margin-top: 1rem;
		display: flex;
		height: auto;
		flex-direction: row-reverse;
	}
	.from-content{
		margin-right: 0.5rem;
		margin-left: 2rem;
		padding:0.5rem;
		background: #AAA;
		border-radius: 0.5rem;
		max-width: 6rem;
		word-wrap: break-word;
	}
</style>