<template>
	<header>
		<i class="el-icon-arrow-left" @click="back"></i>
		{{title}}
		<slot name="right-icon"></slot>
	</header>
</template>

<script type="text/javascript">
	export default{
		props:{
			title:{
				type:String,
				default:""
			}
		},
		methods:{
			back(){
				this.$emit("back")
			}
		}
	}
</script>

<style type="text/css" scoped>
	header{
		width: 100%;
		height: 4rem;
		background: #409EFF;
		text-align: center;
		line-height: 4rem;
		position: fixed;
		left: 0;
		top:0;
		right: 0;
		font-size: 1.3rem;
		color:white;
	}
	header .el-icon-arrow-left{
		position: absolute;
		left: 1rem;
		top:1rem;
		font-size: 2rem;
	}
</style>

