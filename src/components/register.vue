<template>
	<div class="register">
		<Header :title="title" @back="back"></Header>
		<el-form :model="ruleForm2" status-icon  ref="ruleForm2" :rules="rules2">
		  <el-form-item prop="name">
		    <el-input type="text" auto-complete="off" v-model="ruleForm2.name" placeholder="姓名"></el-input>
		  </el-form-item>
		  <el-form-item prop="phone">
		    <el-input type="text" v-model="ruleForm2.phone" auto-complete="off" placeholder="手机号"></el-input>
		  </el-form-item>
		  <el-form-item  prop="pass">
		    <el-input v-model="ruleForm2.pass" type="password"  auto-complete="off" placeholder="密码"></el-input>
		  </el-form-item>
		  <el-form-item prop="checkPass">
		    <el-input v-model="ruleForm2.checkPass" type="password"  auto-complete="off" placeholder="确认密码"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
		    <router-link tag="el-button" to="/login">已有账号，登录</router-link>
		  </el-form-item>
		</el-form>
	</div>
</template>

<script type="text/javascript">
import axios from "axios"
import { mapMutations } from 'vuex'
import { Toast } from 'mint-ui'
import Header from "@/components/header"
	export default{
		components:{
			Header
		},
		data() {
		     var checkName = (rule, value, callback) => {
		        if (!value) {
		          return callback(new Error('姓名不能为空'));
		        }
		      	 callback()
		      }
		      var validatePass = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请输入密码'));
		        } else {
		          if (this.ruleForm2.checkPass !== '') {
		            this.$refs.ruleForm2.validateField('checkPass');
		          }
		          callback();
		        }
		      };
		      var validatePass2 = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请再次输入密码'));
		        } else if (value !== this.ruleForm2.pass) {
		          callback(new Error('两次输入密码不一致!'));
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
			          checkPass: '',
			          name: '',
			          phone:""
			        },
			        rules2: {
			          pass: [
			            { validator: validatePass, trigger: 'blur' }
			          ],
			          checkPass: [
			            { validator: validatePass2, trigger: 'blur' }
			          ],
			          name: [
			            { validator: checkName, trigger: 'blur' }
			          ],
			          phone:[
			          	{ validator:validatePhone,trigger:"blur" }
			          ]
			        },
			        title:"注册"
			    }
			},
	   		methods:{
	   			submitForm(formName) {
			        this.$refs[formName].validate((valid) => {
				          if (valid) {
				            const data=this.ruleForm2;
				            axios.post("/users/register",data).then((data)=>{
				            	if(data.data.status){
				            		let instance = Toast('注册成功');
									setTimeout(() => {
									  instance.close();
									}, 2000);

				            		this.setUserpass(this.ruleForm2.pass);
				            		this.setUserphone(this.ruleForm2.phone);
				            		setTimeout(()=>{
				            			this.setLogin(true);
				            			this.$router.push("/")
				            		},2000)

				            	}
				            	else{
				            		let instance = Toast('服务器出错');
									setTimeout(() => {
									  instance.close();
									}, 2000);
												            	}
				            })
				        } else {
				            console.log('error submit!!');
				            return false;
				          }
				    });
			    },
				back:function(){
					history.go(-1);
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
	.register{
		position: fixed;
		top:0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	form{
		width: 18rem;
		margin-left: 1rem;
		background: none;
		margin-top: 6rem;
	}
	.register .el-button{
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