<template>
	<div class="cook-video-nav">
		<!-- <Header :title="title" @back="back"></Header> -->
		<mt-navbar v-model="selected">
		  <mt-tab-item id="hot">最热</mt-tab-item>
		  <mt-tab-item id="new">最新</mt-tab-item>
		  <mt-tab-item id="hongbei">烘焙</mt-tab-item>
		  <mt-tab-item id="miaochu">家常</mt-tab-item>
		  <mt-tab-item id="baobaocai">宝宝菜</mt-tab-item>
		  <mt-tab-item id="xican">异国</mt-tab-item>
		</mt-navbar>
		<router-view></router-view>
	</div>
</template>

<script type="text/javascript">
import Header from "@/components/header"
import { Navbar, TabItem } from 'mint-ui';
	export default{
		data(){
			return{
				title:"美食视频",
				selected:'hot'
			}
		},
		components:{
			Header
		},
		methods:{
			back(){
				history.go(-1)
			}
		},
		watch:{
			selected:function(newSelected){
				this.$router.push(`/cookvideonav/${newSelected}`)
			}
		}
	}
</script>

<style type="text/css">
	
</style>