<template>
	<div class="dish">
		<div class="dish-header">
			<i class="el-icon-arrow-left" @click="back"></i>
			{{foodName}}
		</div>
		<div class="dish-container">
			<div class="dish-container-list" v-for="(item,index) in foodData" :key="index" @click="show(item.id)">
				<div class="dish-container-left">
					<img :src="item.pic">
				</div>
				<div class="dish-container-right">
					<div class="dish-name">
						{{item.name}}
					</div>
					<div class="dish-tag">
						{{item.tag}}
					</div>
				</div>
			</div>
		</div>
		<Cook v-if="is_cookshow" :cookId="cookId" @back="cookBack"></Cook>
	</div>
</template>

<script type="text/javascript">
import {getDish,getFood} from "@/assets/js/api.js"
import Cook from "@/components/cook"
import { Indicator } from 'mint-ui';
	export default{
		components:{
			Cook
		},
		data(){
			return{
				foodName:"",
				foodData:"",
				is_cookshow:false,
				cookId:'',
			}
		},
		methods:{
			_getFood(){
				const reg = /[\u4e00-\u9fa5]/g;
				const name = this.$route.path.match(reg);//获取url上的菜名，如果没有菜名，则获取代表某个菜系的数字
				if(name){ 
					this.foodName = name.join("");
					const data = {
						"num":10,
						"keyword":this.foodName,
						"appkey":"a463821a7f0fe98dbc3da2055678d238"
					}
					getDish(data).then((data)=>{
						if(data.data.msg === "查询成功"){
							this.foodData = data.data.result.result.list;
						}
						setTimeout(()=>{
							Indicator.close()
						},300)
					})
				}
				else{
					const num = this.$route.path.substring(6);
					this.foodName=""//获取url上代表某个菜系的数字
					const data = {
						"classid":num,
						"start":0,
						"num":10,
						"appkey":"a463821a7f0fe98dbc3da2055678d238"
					}
					getFood(data).then((data)=>{
						if(data.data.msg === "查询成功"){
							this.foodData = data.data.result.result.list;
						}
						setTimeout(()=>{
							Indicator.close()
						},300)
					})
				}
				// const data = {
				// 	"num":10,
				// 	"keyword":this.foodName,
				// 	"appkey":"a463821a7f0fe98dbc3da2055678d238"
				// }

				// getDish(data).then((data)=>{
				// 	console.log(data)
				// 	if(data.data.msg === "查询成功"&&data.data.result.msg === "ok"){
				// 		this.foodData = data.data.result.result.list;
				// 		return Promise.resolve({})
				// 	}
				// 	else{
				// 		const reg = /[^\d]/g
				// 		const keyword = this.$route.path.match(reg)
				// 		const _data={
				// 			"classid":keyword,
				// 			"start":0,
				// 			"num":15
				// 		}
				// 		console.log(keyword)
				// 	}
				// })
			},
			back(){
				history.go(-1)
			},
			show(id){
				this.cookId=id;
				this.is_cookshow = true
			},
			cookBack(){
				this.is_cookshow = false;
			}
		},
		activated(){
			Indicator.open('加载中...');
			this.is_cookshow=false
			this._getFood()
		}
	}
</script>

<style type="text/css">
	.dish-header{
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
	.dish-header i{
		position: absolute;
		left: 1rem;
		font-size: 2rem;
		margin-top: 0.5rem;
	}
	.dish-container{
		margin-top: 4rem;
	}
	.dish-container-list{
		display: flex;
		margin-top: 1rem;
	}
	.dish-container-left{
		width: 7rem;
		height: 5rem;
		margin-left: 1rem;
	}
	.dish-container-left img{
		width: 100%;
		height:100%;
	}
	.dish-container-right{
		margin-left: 2rem;
		width: 10rem;
		overflow: hidden;
	    overflow: hidden;
	    -webkit-line-clamp: 2;
	    -webkit-box-orient: vertical;
	    word-break: break-all;
	}
	.dish-tag{
		margin-top: 1.15rem;
		color:#555;
		font-size: 0.5rem;
	}
</style>