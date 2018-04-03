<template>
	<div class="food" @click="foodSearch" ref="food">
		<el-tag    v-for="(item,index) in foodList" :key="index">{{item.name}}</el-tag> 
	</div>
</template>

<script type="text/javascript">
import { getFood } from "@/assets/js/api.js"
	export default{
		props:{
			num:{
				type:String,
			},
			cfShow:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return{
				foodList:""
			}
		},
		methods:{
			_getFood:function(){
				const data = {
					"classid":this.num,
					"start":"0",
					"num":"20",
					"appkey":"a463821a7f0fe98dbc3da2055678d238"
				}
				getFood(data).then((data)=>{
					if(data.data.msg === "查询成功"){
						this.foodList = data.data.result.result.list;
						this.$nextTick(()=>{
							this.$refs.food.style.display = "block"
						})
					}
					else{
						this.foodList = [{"name":"没有信息"}]
					}
				})
			},
			foodSearch(event){
				    var e = event||window.event; 
             		var source = e.target || e.srcElement;
             		if(source.nodeName.toLowerCase()=="span"){
             			const reg = /[\u4e00-\u9fa5]/g;
             			let foodName = source.innerHTML.match(reg).join("");
             			this.$router.push(`/dish/${foodName}`)
             		}
             	}
		},	
		watch:{
			cfShow:function(_cfShow){
				if(_cfShow === true){
					this._getFood()
				}
				
			}
		}
	}
</script>

<style type="text/css">
.food{
	display: none;
}
</style>