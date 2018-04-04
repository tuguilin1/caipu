<template>
	<transition name="food">
	<div class="classfied">
		<Header :title="title" @back="back"></Header>
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
import Header from "@/components/header"
	export default{
		props:{
			cfShow:{
				type:Boolean
			}
		},
		components:{
			Food,
			Header
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
				title:"菜谱分类"
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
		background: #FFF;
	}
	.nav{
		margin-top: 4rem;
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
		transition:left .3s;
	}
</style>