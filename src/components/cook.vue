<template>
	<transition name="appear">
	<div class="cook">
		<div class="cook-header">
			<i class="el-icon-arrow-left" @click="back"></i>
			{{cookFood.name}}
		</div>
		<div class="cook-content" v-html="cookFood.content">
		</div>
		<div class="cook-material">
			<div class="cook-material-header">
				--准备食材--
			</div>
			<div class="cook-material-content">
				<div class="cook-material-number" v-for="(item,index) in cookFood.material" :key="index">
					<span>{{item.mname}}</span>
					<span class="not-active">{{item.amount}}</span>
				</div>
			</div>
		</div>
		<div class="cook-process">
			<div class="cook-material-header">
				--步骤--
			</div>
			<div class="cook-process-content">
				<div class="cook-process-container" v-for="(item,index) in cookFood.process" :key="index">
					<img :src="item.pic">
					<span>{{index+1}}、</span>
					<span v-html="item.pcontent"></span>
				</div>
			</div>
		</div>
		<div class="save" >
			<button type="success" @click="collect" ref="btn">{{iscollected}}</button>
		</div>
		
	</div>
</transition>
</template>

<script type="text/javascript">
import { getCook } from "@/assets/js/api"
import { mapGetters } from "vuex"
import axios from "axios"
	export default{
		props:{
			cookId:{
				type:String,
			}
		},
		data(){
			return{
				cookFood:"",
				iscollected:"收藏"
			}
		},
		computed:{
			...mapGetters([
				"isLogined",
				"phone"
				])
		},
		methods:{
			_getCook(){
				const data={
					"id":this.cookId,
					"appkey":"a463821a7f0fe98dbc3da2055678d238"
				}
				getCook(data).then((data)=>{
					if(data.data.msg==="查询成功"){
						this.cookFood=data.data.result.result;
					}
				})
			},
			back(){
				this.$emit("back")
			},
			open2(msg) {
		        this.$message({
		          message: msg,
		          type: 'success',
		          duration:1000,
		        });
		    },

		    open3(msg) {
		        this.$message({
		          message: msg,
		          type: 'warning',
		          duration:1000,
		        });
		    },
			collect(){
				if(!this.isLogined){
					this.open3("请先登录");
					return false
				}
				let phone = this.phone
				let {id,pic,tag} = this.cookFood;
				let data = {id,pic,tag,phone};
				axios.get("/users/collect",{
					params:data
				}).then((data)=>{
					if(data.data.status){
						this.open2(data.data.msg);
						this.$refs.btn.setAttribute("disabled",true);
						this.$refs.btn.style.background="#909399";
						this.iscollected="已收藏"
					}else{
						this.open3(data.data.msg)
					}
				})
			},
			isCollect(){
				axios.get("/users/iscollect",{
					params:{
						id:this.cookId,
						phone:this.phone
					}
				}).then((data)=>{
					if(data.data.status){
						this.$refs.btn.setAttribute("disabled",true);
						this.$refs.btn.style.background="#909399"
						this.iscollected="已收藏"
					}
				})
			}
		},
		mounted(){
			this._getCook();
			this.isCollect()
		}
	}
</script>

<style type="text/css">
	.cook{
		position: fixed;
		top:0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 20;
		background: #EEE;
		overflow: scroll;
	}
		.cook-header{
		width: 100%;
		position: fixed;
		top:0;
		text-align: center;
		height: 3rem;
		font-size: 1rem;
		line-height: 3rem;
		background: #EEE;
		border-bottom: 1px solid #DDD;
		background:#fff;
	}
	.cook-header i{
		position: absolute;
		left: 1rem;
		font-size: 2rem;
		margin-top: 0.5rem;
	}
	.cook-content{
		margin-top: 5rem;
		font-size: 1rem;
		color:#555;
		box-sizing: border-box;
		padding-left: 1rem;
		padding-right: 1rem;
		line-height: 2rem;
	}
	.cook-material-header{
		margin-top: 2rem;
		font-weight: bolder;
		text-align: center;
		width: 100%;
	}
	.cook-material-content{
		margin-top: 2rem;
		box-sizing: border-box;
		padding-left: 1rem;
		padding-right: 1rem;
	}
	.cook-material-number{
		height: 2rem;
		line-height: 2rem;
		border-bottom: 1px solid #BBB;
		display: flex;
		justify-content: space-around;
	}
	.not-active{
		color:#555;
	}
	.cook-process-content{
		box-sizing: border-box;
		padding-left: 1rem;
		padding-right: 1rem;
	}
	.cook-process-content img{
		width: 18rem;
		height: 14rem;
		display: block;
		margin-bottom: 2rem;
		margin-top: 2rem;
	}
	.save{
		width: 100%;
		margin-top: 2rem;
	}
	.save button{
		width: 18rem;
		margin-left: 1rem;
		font-size: 1rem;
		background: #409EFF;
		color:#CCC;
		height: 2rem;
	}
	.appear-enter{
		top:20rem;
		bottom: 20rem;
		left: 8rem;
		right: 8rem;
		transform: rotate(400deg);
		-ms-transform:rotate(400deg); 	/* IE 9 */
		-moz-transform:rotate(400deg); 	/* Firefox */
		-webkit-transform:rotate(400deg); /* Safari 和 Chrome */
		-o-transform:rotate(400deg); 	/* Opera */
	}
	.appear-leave{
		opacity:1;
	}
	.appear-leave-to{
		opacity:0
	}
	.appear-enter-active,.appear-leave-active{
		transition: all .4s;
	}

</style>

