<template>
	<div class="person">
		<div class="person-header">
			<i class="el-icon-arrow-left" @click="back"></i>
			个人中心
		</div>
		<div class="person-content">
			<div class="person-img" @click="changeAvater">
				<img src="/static/images/zjl.jpg" ref="img">
			</div>
			<div class="person-name">
				{{phone}}
			</div>
		</div>
		<div class="change-avater">
			<input type="file" name="avater" ref="input">
		</div>
		<div class="person-information">
			<div class="my-data">
				<span>个人资料</span>
				<i class="el-icon-edit"></i>
			</div>
			<router-link tag="div" to="/collection" class="my-data">
				<span>我的收藏</span>
				<i class="el-icon-d-arrow-right"></i>
			</router-link>
			<div class="my-data">
				<span>我的发帖</span>
				<i class="el-icon-d-arrow-right"></i>
			</div>
		</div>
		<el-button type="info" plain @click="quit">退出登录</el-button>
	</div>
</template>

<script type="text/javascript">
import axios from "axios"
import { mapMutations,mapGetters } from "vuex"
	export default{
		computed:{
			...mapGetters([
				"phone",
				"isLogined"
				])
		},
			methods:{
				back(){
					history.go(-1)
				},
				quit(){
					this.setLogin(false);
					this.$router.push("/")
				},
				changeAvater(){
					this.$refs.input.click();
					this.$refs.input.onchange = ()=>{
						let file = this.$refs.input.files[0];
					    let formData = new FormData();
					    formData.append("avatar", file);
					    formData.append("phone",this.phone)
					    axios.post("/users/avatar",formData).then((data)=>{
					    	if(data.data.status){
					    		this.$refs.img.src=data.data.filePath
					    	}
					    })
					}
				},
				...mapMutations({
					setLogin:"SET_IS_LOGINED"
				})
			},
			created(){
				if(!this.isLogined){
					this.$router.push("/login")
				}
			},
			activated(){
				axios.get("/users/userHead",{
					params:{
						phone:this.phone
					}
				}).then((data)=>{
					if(data.data.status){
						this.$refs.img.src=data.data.pic
					}
				})
			}
	}
</script>

<style type="text/css">
	.person{
		position: fixed;
		left: 0;
		right: 0;
		top:0;
		bottom: 0;
		background:#DDD;
	}
	.person-header{
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
	.person-header i{
		position: absolute;
		left: 1rem;
		font-size: 2rem;
		margin-top: 0.5rem;
	}
	.person-content{
		margin-top: 5rem;
		text-align: center;
	}
	.person-img{
		margin-left: 6rem;
		width: 8rem;
		height: 8rem;
		border-radius: 50%;
	}
	.person-img img{
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.person-name{
		margin-top: 1rem;
	}
	.person-information{
		margin-top: 2rem;
	}
	.my-data{
		box-sizing: border-box;
		padding-left: 1rem;
		padding-right: 1rem;
		height: 3rem;
		border-bottom: 1px solid #CCC;
		font-size: 1rem;
		line-height: 3rem;
	}
	.my-data span{
		float: left;
	}
	.my-data i{
		float: right;
		margin-top: 1rem;
	}
	.person .el-button{
		margin-top: 2rem;
		width: 16rem;
		margin-left: 2rem;
	}
	.change-avater{
		display: none;
	}
</style>