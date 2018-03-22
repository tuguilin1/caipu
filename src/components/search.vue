<template>
	<transition name="search">
	<div class="search">
	 <header>
        <i class="el-icon-arrow-down" @click="goBack"></i>
        <input ref="input"  placeholder="请输入内容" @keydown="inputSearch" />
        <i class="el-icon-search" @click="inputSearch"></i>
      </header>
      <div class="hot">
      	<div class="hot-header">
      		热门搜索
      	</div>
      	<div class="hot-content" @click="jump">
      		<el-tag>五花肉</el-tag>
      		<el-tag>可乐鸡翅</el-tag>
      		<el-tag>豆腐</el-tag>
      		<el-tag>西蓝花</el-tag>
      		<el-tag>月子餐</el-tag>
      		<el-tag>家常菜</el-tag>
      		<el-tag>川菜</el-tag>
      		<el-tag>面包</el-tag>
      		<el-tag>蛋挞</el-tag>
      		<el-tag>山药</el-tag>
      	</div>
      </div>
      <div class="history">
      		<div class="history-head">
      			历史记录
      		</div>
      		<div class="hot-content">
      			<el-tag closable :disable-transitions="false" v-for="(item,key) in searchHistory" :key="key" @close="handleClose(key)">{{item.name}}</el-tag>
      		</div>
      </div>
	</div>
</transition>
</template>

<script type="text/javascript">
import { mapGetters } from "vuex"
import axios from "axios"
	export default{
		data(){
			return{
				searchHistory:""	
			}

		},
		props:{
			isSearchshow:{
				type:Boolean,
				default:false
			}
		},
		computed:{
			...mapGetters([
				"isLogined",
				"phone"
			])
		},
		methods:{
			goBack(){
				this.$emit("goBack")
			},
			search(value){
				this.$router.push(`/dish/${value}`)
			},
			inputSearch(){
				const value = this.$refs.input.value;
				if(value !== ""){
					this.search(value);
					if(this.isLogined){
						const data = {
							phone:this.phone,
							name:value
						}
						axios.get("/users/history",{
							params:data
						})
					}
				}
				
			},
			jump(event){
				var e = event||window.event; 
	         		var source = e.target || e.srcElement;
	         		if(source.nodeName.toLowerCase()=="span"){
	         			const reg = /[\u4e00-\u9fa5]/g;
	         			let foodName = source.innerHTML.match(reg).join("");
	         			this.$router.push(`/dish/${foodName}`)
	         		}
			},
			handleClose(key) {
				console.log(key)
     		   
     		   const data = {
     		   	name:this.searchHistory[key].name,
     		   	phone:this.phone
     		   }
     		   this.searchHistory.splice(key, 1);
     		   axios.get("/users/remove-history",{
     		   	params:data
     		   })
     	    },
		},
		watch:{
			isSearchshow:function(_isSearchshow){
				if(_isSearchshow){
					if(this.isLogined){
						axios.get("/users/gethistory",{
							params:{
								phone:this.phone
							}
						}).then((data)=>{
							if(data.data.status){
								this.searchHistory=data.data.data
							}
						})
					}
				}
			}
		}

	}
</script>

<style type="text/css">
	.search{
		position: fixed;
		top:0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #EEE;
		z-index: 10
	}
	.search header{
  width: 18rem;
  height: 4rem;
  line-height: 4rem;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-left: 1rem;
  -webkit-box-pack: space-between;
  -webkit-justify-content: space-between;
  -ms-flex-pack: space-between;
  justify-content: space-between;
  border-bottom: 1px solid #DDD
}


.search i{
  font-size: 1.5rem;
  line-height: 4rem;
  
}
.search input{
  margin-top: 1rem;
  display: block;
  width: 10rem;
  height: 2rem;
  border:0;
  outline: none;
  padding-left: 0.5rem;
  background: #FFF;
  -moz-border-radius:0.5rem; /* Firefox */
  -webkit-border-radius: 0.5rem; /* Safari 和 Chrome */
  border-radius: 0.5rem; /* Opera 10.5+, 以及使用了IE-CSS3的IE浏览器 */
}
.hot{
	width: 100%;
	margin-top: 2rem;
}

.hot-header,.history-head{
	width: 100%;
	height: 2rem;
	font-size: 1rem;
	margin-left: 1rem;
}
.el-tag{
	margin-left: 0.5rem;
	margin-top: 1rem;
}
.history{
	margin-top: 2rem;
}
	.search-enter-active,.search-leave-active{
		transition:top .5s;
	}
	.search-enter{
		top:100%;
	}
	.search-enter-to{
		top: 0;
	}
	.search-leave{
		top: 0;
	}
	.search-leave-to{
		top: 100%;
	}
</style>