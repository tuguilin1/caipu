<template>
	<transition name="food">
	<div class="classfied">
		<div class="header">
			<i class="el-icon-arrow-left" @click="back"></i>
			菜谱分类
			<i class="el-icon-search"></i>
		</div>
		<div class="nav">
			<el-tabs tab-position="left">
		    	<el-tab-pane v-for="(item,key) in menu" :label="item" :key="item">
					<Food :num="key" :cfShow="cfShow"></Food>
		    	</el-tab-pane>

		    </el-tabs>
		</div>
		<Food></Food>
	</div>
</transition>
</template>

<script type="text/javascript">
import Food from "./foods.vue"
	export default{
		props:{
			cfShow:{
				type:Boolean
			}
		},
		components:{
			Food
		},
		data(){
			return{
				menu:{
					"76":"助睡眠",
					"224":"川菜",
					"253":"西餐",
					"302":"家常菜",
					"319":"婴儿辅食",
					"377":"懒人食谱",
					"236":"东北菜",
					"296":"沙县小吃",
					"311":"下酒菜",
					"2":"减肥",
					"85":"健脑益智",
					"309":"创意菜",
				},
			}
		},
		methods:{
			back(){
				this.$emit("back")
			}
		}
	}
</script>

<style type="text/css">
	.classfied{
		position: fixed;
		top:0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 10;
		background: #EEE;
	}
	.header{
		width: 100%;
		height: 3rem;
		font-size: 1rem;
		line-height: 3rem;
		text-align: center !important;
		background: #FFF;
		margin-left:0;
		margin-bottom: 1rem;
		position: fixed;
		top:0;
		z-index: 20;
	}
	.nav{
		margin-top: 3rem;
	}
	.is_left{
		width: 6rem;
		overflow: scroll;
	}
	.header .el-icon-arrow-left{
		position: absolute;
		font-size: 1.5rem;
		left: 1rem;
		top:-0.5rem;
	}
	.header .el-icon-search{
		position: absolute;
		font-size: 1.5rem;
		right: 1rem;
		top:-0.5rem;
	}
	.food-enter-active,.food-leave-active{
		transition:left 1s;
	}
	.food-enter{
		left:100%;
	}
	.food-enter-to{
		left: 0;
	}
	.food-leave{
		left: 0;
	}
	.food-leave-to{
		left: 100%;
	}
</style>