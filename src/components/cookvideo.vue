<template>
	<div class="cook-video">
		123
	</div>
</template>

<script type="text/javascript">
import {getVideo} from "@/assets/js/api.js"
	export default{
		methods:{
			_getVideo:function(){
				const reg = /^\/cookvideonav\//g
				const type = this.$route.path.match(reg)
				// const data = {
				// 	"type":"new",
				// 	"offset":0,
				// 	"limit":10
				// };
				// getVideo(data).then((data)=>{
				// 	console.log(data)
				// })
				console.log(this.$route.params)
			}
		},
		mounted(){
			this._getVideo()
		}
	}
</script>

<style type="text/css">
	
</style>