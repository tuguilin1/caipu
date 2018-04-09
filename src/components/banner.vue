<template>
	  <swiper :options="swiperOption" ref="mySwiper" class="Swiper">
	    <!-- slides -->
	    <swiper-slide class="swiper-slide"  v-for="(item,key) in banners" :key="key"><img v-lazy="item.picUrl" @click="jump(item.foodName)"></swiper-slide>
<!-- 	    <swiper-slide class="swiper-slide"><img src="../assets/images/dajitui.jpg"></swiper-slide>
	    <swiper-slide class="swiper-slide"><img src="../assets/images/gongbaojiding.jpg"></swiper-slide>
	    <swiper-slide class="swiper-slide"><img src="../assets/images/lalamian.jpg"></swiper-slide>
	    <swiper-slide class="swiper-slide"><img src="../assets/images/shangxiaojikuai.jpg"></swiper-slide>
	    <swiper-slide class="swiper-slide"><img src="../assets/images/suancairousimian.jpg"></swiper-slide>
	    <swiper-slide class="swiper-slide"><img src="../assets/images/tudoujimifan.jpg"></swiper-slide> -->
	  </swiper>	
</template>

<script type="text/javascript">
import { swiper, swiperSlide } from 'vue-awesome-swiper'

import axios from "axios"
  export default {
    components:{
    	swiper,
    	swiperSlide
    },
    data() {
	    return {  
	        swiperOption: {
	        	speed:400,
	        	initialSlide :0,  
		        autoplay: true,
		        autoplayDisableOnInteraction:false,
		        notNextTick: true,  
		        pagination: '.swiper-pagination',  
		        slidesPerView: "auto",  
		        centeredSlides: true,  
		        paginationClickable: true,  
		        spaceBetween: 30, 
		        direction: 'horizontal',

	        },
	        banners:""  
	    }  
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    methods:{
   		 getBanner(){ //跨域取banner数据
     		 axios.get("/banners").then((data)=>{
     	     this.banners = data.data.banner 
     	 })
   		},
   		jump(name){
   			this.$router.push(`/dish/${name}`)
   		}
    },
  	mounted(){
    	this.getBanner()
  	}
  }
</script>

<style type="text/css" scoped>
.Swiper{
	width: 20rem;
	height: 10rem;
}

.swiper-slide{
	width: 14rem;
	height: 10rem;
	-moz-border-radius:1rem; /* Firefox */
    -webkit-border-radius: 1rem; /* Safari 和 Chrome */
     border-radius: 1rem; /* Opera 10.5+, 以及使用了IE-CSS3的IE浏览器 */
}

img{
	width: 100%;
	height: 100%;
	display: block;
	-moz-border-radius:1rem; /* Firefox */
    -webkit-border-radius: 1rem; /* Safari 和 Chrome */
     border-radius: 1rem; /* Opera 10.5+, 以及使用了IE-CSS3的IE浏览器 */
}
.swiper-container .swiper-wrapper .swiper-slide-prev{ margin-top: 18px; height: 8rem!important;}
.swiper-container .swiper-wrapper .swiper-slide-prev img{ height: 8rem!important;}
.swiper-container .swiper-wrapper .swiper-slide-next{ margin-top: 18px; height: 8rem!important;}
.swiper-container .swiper-wrapper .swiper-slide-next img{ height: 8rem!important;}
</style>