<template>
	<div class="all-food">
		<Header :title="title" @back="back"></Header>
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
import { Indicator } from 'mint-ui'
import Header from "@/components/header"
	export default{
		data(){
			return{
				allFood:"",
				title:"全部分类"
			}
		},
		components:{
			Header
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
	.all-food-content{
		margin-top: 4rem;
		width: 20rem;
		overflow: hidden;
	}
	.el-collapse-item__header{
		height: 4rem;
		line-height: 4rem;
		box-sizing:border-box; 
		padding-left: 1rem;
		font-size: 1.1rem;
	}
	.el-icon-arrow-right{
		font-size: 1rem;
		line-height: 4rem;
	}
	.all-food-content .el-tag{
		margin-left: 0.5rem;
		margin-top: 0.3rem;
	}
</style>