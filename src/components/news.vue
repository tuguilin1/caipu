<template>
	<div class="news">
		<div class="news-header">
			
			消息
			<i class="el-icon-plus"></i>
		</div>
	</div>
</template>

<script type="text/javascript">
export default{
  data(){
      return{
          id:''
      }
  },
  sockets:{
    connect: function(){
      console.log("连接成功")
    },
    event: function(data){
      	console.log(data)
    }
  },
  methods: {
  },
  mounted(){
  	this.$socket.emit("event01")
  }
}
</script>

<style type="text/css">
	.news-header{
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
	.news-header i{
		position: absolute;
		right: 1rem;
		font-size: 1.5rem;
		margin-top: 0.75rem;
	}
</style>