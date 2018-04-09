<template>
	<div class="cook-video-list">
		<div class="cook-video" v-for= "(item,index) in videoList" :key="index">
			<video src="" :poster="item.pic" ref="video">
				您的浏览器不支持video
			</video>
			<div class="cook-video-name">
				{{item.name}}
			</div>
			<div class="iconfont icon-bofang1" @click="playVideo(item)"></div>
			<div class="cook-video-from">
				<div>{{item.author_name}}</div>
				<div>精选视频推荐</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
import {getVideo} from "@/assets/js/api.js"
	export default{
		data(){
			return{
				videoList:""
			}
		},
		computed:{
			type:function(){
				return this.$route.params.type
			}
		},
		methods:{
			_getVideo:function(){
				const data = {
					"type":this.type,
					"offset":0,
					"limit":10
				};
				getVideo(data).then((data)=>{
					this.videoList = data.data.data.lists;
					console.log(this.videoList)
				})
			},
			playVideo(item){
				if(item.type === 2){
					window.location.href=item.video_url;
				}else if(item.type===1){
					console.log(1)
					window.location.href = `https://m.douguo.com/cookbook/${item.id}.html?isapp=-1&f=www`
				}

			}
		},
		mounted(){
			this._getVideo()
		},
		watch:{
			type:function(newType){
				this._getVideo()
			}
		}
	}
</script>

<style type="text/css">
	.cook-video{
		width: 100%;
		box-sizing: border-box;
		margin-top: 1rem;
		padding-left: .6rem;
		padding-right: 1rem;
		position: relative;
		overflow: hidden;
	}
	.cook-video video{
		width: 18rem;
		margin: 0 auto;
		display: block;
	}
	.icon-bofang1{
		position: absolute;
		top:4rem;
		left: 9rem;
		font-size: 2rem;
		color:#222;
		width: 4rem;
		height: 4rem;
		background: blue;
	}
	.cook-video-name{
		overflow: hidden;
		height: 2rem;
		line-height: 2rem;
		font-size: 1.2rem;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.cook-video-from{
		display: flex;
		justify-content: space-between;
		font-size: 0.8rem;
		color:#909399;
	}
</style>