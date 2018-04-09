<template>
	<div class="collection">
		<Header :title="title" @back="back"></Header>
		<div class="dish-container">
			<div class="dish-container-list" v-for="(item,index) in foodData" :key="index" @click="show(item.id)">
				<div class="dish-container-left">
					<img v-lazy="item.pic">
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
		<Cook v-if="isCookshow" :cookId="cookId" @back="cookBack"></Cook>
	</div>
</template>

<script type="text/javascript">
import { getCollection } from "@/assets/js/api.js"
import { mapGetters } from "vuex"
import Cook from "@/components/cook"
import Header from "@/components/header"
	export default{
		components:{
			Cook,
			Header
		},
		data(){
			return{
				foodData:"",
				isCookshow:false,
				cookId:'',
				title:"我的收藏"
			}
		},
		computed:{
			...mapGetters([
				"phone",
				"isLogined"
				])
		},
		methods:{
			_getCollection(){
				const data = {
					phone:this.phone
				}
				console.log(1)
				getCollection(data).then((data)=>{
					console.log(data)
					this.foodData = data.data.userData
				})
			},
			back(){
				history.go(-1)
			},
			show(id){
				this.cookId=id;
				this.isCookshow = true
			},
			cookBack(){
				this.isCookshow = false;
			}
		},	
		activated(){
			if(this.isLogined){
				this._getCollection()
			}
		}
	}
</script>

<style type="text/css">

	.dish-container{
		margin-top: 5rem;
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