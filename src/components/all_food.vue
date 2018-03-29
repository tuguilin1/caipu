<template>
	<div class="all-food">
		<div class="all-food-header">
			<i class="el-icon-arrow-left" @click="back"></i>
			全部分类
		</div>
		<div class="all-food-content" >
			<el-collapse accordion>
			  <el-collapse-item v-for="(item,index) in allFood" @click="search" :title="item.name"  :name="index" :key="index" >
			  	<span  v-for = "(_item,_index) in item.list.slice(0,20)"  :key="_index" @click="search(_item.classid)">
			  		<el-tag >{{_item.name}}</el-tag>
			  	</span>
			    
			  </el-collapse-item>
			</el-collapse>
		</div>
	</div>
</template>

<script type="text/javascript">
import {getAllfood} from "@/assets/js/api"
import { Indicator } from 'mint-ui';
	export default{
		data(){
			return{
				allFood:"",
			}
		},
		methods:{
			_getAllfood(){
				getAllfood({
					"appkey":"a463821a7f0fe98dbc3da2055678d238"
				}).then((data)=>{
					if(data.data.msg=="查询成功"){
						this.allFood=data.data.result.result;
					}
					setTimeout(()=>{
						Indicator.close()
					},300)
				})
			},
			back(){
				history.go(-1)
			},
			search(i){
				this.$router.push(`/dish/${i}`)
			}
		},
		mounted(){
			Indicator.open('加载中...');
			this._getAllfood()
		}
	}
</script>

<style type="text/css">
	.all-food-header{
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
	.all-food-header i{
		position: absolute;
		left: 1rem;
		font-size: 2rem;
		margin-top: 0.5rem;
	}
	.all-food-content{
		margin-top: 3rem;
		width: 20rem;
		overflow: hidden;
	}
	.el-collapse-item__header{
		height: 4rem;
		line-height: 4rem;
		box-sizing:border-box; 
		padding-left: 1rem;
	}
	.el-icon-arrow-right{
		font-size: 1rem;
	}
	.all-food-content .el-tag{
		margin-left: 0.5rem;
		margin-top: 0.3rem;
	}
</style>