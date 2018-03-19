<template>
	<div class="person">
		<div class="person-header">
			<i class="el-icon-arrow-left" @click="back"></i>
			个人中心
		</div>
		<div class="person-content">
			<div class="person-img">
				<img src="/static/images/zjl.jpg">
			</div>
			<div class="person-name">
				周杰伦
			</div>
		</div>
		<div class="person-information">
			<div class="my-data">
				<span>个人资料</span>
				<i class="el-icon-edit"></i>
			</div>
			<div class="my-data">
				<span>我的收藏</span>
				<i class="el-icon-d-arrow-right"></i>
			</div>
			<div class="my-data">
				<span>我的发帖</span>
				<i class="el-icon-d-arrow-right"></i>
			</div>
		</div>
		<el-button type="info" plain @click="quit">退出登录</el-button>
	</div>
</template>

<script type="text/javascript">
import { mapMutations } from "vuex"
	export default{
			methods:{
				back(){
					history.go(-1)
				},
				quit(){
					this.setLogin(false);
					this.$router.push("/")
				},
				...mapMutations({
					setLogin:"SET_IS_LOGINED"
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
</style>