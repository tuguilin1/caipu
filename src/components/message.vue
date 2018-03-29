<template>
	<div class="message">
		<div class="message-head">
			<i class="el-icon-arrow-left"></i>
			周杰伦
		</div>
		<div class="message-bottom">
			<div class="input">
				<input type="search" name="">
			</div>
			<div class="send">发送</div>
		</div>
	</div>
</template>

<script type="text/javascript">

import axios from "axios"
	export default{
		mounted(){
			this.$socket.emit("chat",{msg:"123",phone:15167120242});
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
		position: relative;
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
</style>