<template>
	<div class="login">
		<header>
			<i class="el-icon-arrow-left" @click="back"></i>
			登录
		</header>
		<el-form :model="ruleForm2" status-icon  ref="ruleForm2" :rules="rules2">
		  <el-form-item label="手机号" prop="phone">
		    <el-input type="text" v-model="ruleForm2.phone" auto-complete="off"></el-input>
		  </el-form-item>
		  <el-form-item label="密码"  prop="pass">
		    <el-input v-model="ruleForm2.pass" type="password"  auto-complete="off"></el-input>
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
import { mapMutations } from 'vuex'
	export default{
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
		        }
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
			            	console.log(data);
			            	if(data.data.status){
			            		this.open2(data.data.msg);
			            		let pass = this.ruleForm2.pass;
			            		let phone = this.ruleForm2.phone
			            		this.setUserpass(pass);
			            		this.setUserphone(phone)
			            		setTimeout(()=>{
			            			this.setLogin(true);
			            			this.$router.push("/")
			            		},2000)
			            	}
			     			else{
			     				this.open3(data.data.msg)
			     			}
			            })	
			        } else {
			            console.log('error submit!!');
			            return false;
			          }
			    });
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
		background-color:  #DDD;
	}
	.login header{
		width: 100%;
		height: 3rem;
		font-size: 1rem;
		line-height: 3rem;
		text-align: center;
		background: #FFF;
	}
	.login .el-icon-arrow-left{
		position: absolute;
		font-size: 2rem;
		left: 1rem;
		line-height: 3rem;
	}
	form{
		width: 18rem;
		margin-left: 1rem;
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
</style>