<template>
	<div class="login">
		<Header :title="title" @back="back"></Header>
		<el-form :model="ruleForm2" status-icon  ref="ruleForm2" :rules="rules2">
		  <el-form-item prop="phone">
		    <el-input type="text" v-model="ruleForm2.phone" auto-complete="off" placeholder="手机号"></el-input>
		  </el-form-item>
		  <el-form-item  prop="pass">
		    <el-input v-model="ruleForm2.pass" type="password"  auto-complete="off" placeholder="密码"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
		    <router-link tag="el-button" to="/register">注册</router-link>
		  </el-form-item>
		</el-form>
	</div>
</template>

<script type="text/javascript">
import axios from "axios"
import { Toast } from 'mint-ui';
import { mapMutations } from 'vuex'
import Header from "@/components/header"
	export default{
		components:{
			Header
		},
		data() {
	      var validatePass = (rule, value, callback) => {
	        if (value === '') {
	          callback(new Error('请输入密码'));
	        } else {
	          callback();
	        }
	      };
	      var validatePhone = (rule,value,callback) => {
	      	if(value === ""){
	      		callback(new Error("请输入手机号"));
	      	}
	      	else if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(value)){
	      		callback(new Error("请输入正确的手机号"))
	      	}
	      	else{
	      		callback();
	      	}
	      }
     	 	return {
		        ruleForm2: {
		          pass: '',
		          phone:""
		        },
		        rules2: {
		          pass: [
		            { validator: validatePass, trigger: 'blur' }
		          ],
		          phone:[
		          	{ validator:validatePhone,trigger:"blur" }
		          ]
		        },
		        title:"登录"
		    }
		},
		methods:{
			back:function(){
				history.go(-1);
			},
			submitForm(formName) {
		        this.$refs[formName].validate((valid) => {
			          if (valid) {
			            const data=this.ruleForm2;
			            axios.post("/users/login",data).then((data)=>{
			            	if(data.data.status){
			            		let instance = Toast('登陆成功');
								setTimeout(() => {
								  instance.close();
								}, 1000);
			            		let pass = this.ruleForm2.pass;
			            		let phone = this.ruleForm2.phone
			            		this.setUserpass(pass);
			            		this.setUserphone(phone)
			            		setTimeout(()=>{
			            			this.setLogin(true);
			            			this.$router.push("/")
			            		},1000)
			            	}
			     			else{
			     				let instance = Toast('账号密码错误');
								setTimeout(() => {
								  instance.close();
								}, 1000);
			     			}
			            })	
			        } else {
			            return false;
			          }
			    });
		    },
		    ...mapMutations({
		    	setLogin:"SET_IS_LOGINED",
		    	setUserpass:"SET_USERPASS",
		    	setUserphone:"SET_USERPHONE"
		    })
		}
	}
</script>

<style type="text/css">
*{
	margin: 0;
	padding: 0;
}
	.login{
		position: fixed;
		top:0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	form{
		width: 18rem;
		margin-left: 1rem;
		margin-top: 6rem;
	}
	.forget{
		width: 100%;
		height: 2rem;
		margin-top: 1.5rem;
		font-size: 0.8rem;
		text-align: right;
		color:#409EFF;
	}
	form .el-button{
		display: block;
		width: 100%;
		margin-top: 1rem;
	}
	form .el-button+.el-button{
		margin-left: 0;
	}
	.el-input__inner{
		background: none;
		outline: none;
		border:none;
		border-bottom: 1px solid #DDD;
		border-radius: 0;
	}
</style>