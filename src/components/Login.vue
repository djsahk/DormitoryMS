<template>
	<div id="login">
		<div class="login">
			<div class="title">宿舍管理系统</div>
			<el-form :model="form" label-width="80px">
				<el-input placeholder="username" v-model="form.name">
					<template slot="prepend"><i class="el-icon-user"></i></template>
				</el-input>
				<el-input placeholder="password" v-model="form.password" show-password>
					<template slot="prepend"><i class="el-icon-lock"></i></template>
				</el-input>
				<div class="login-btn">
					<el-button type="primary" style="width: 100%;"  @click="onSubmit">登录</el-button>
				</div>
				<p style="color: #fff;font-size: 12px;">Tips :账号:admin 密码:123456</p>
			</el-form>
		</div>
	</div>
</template>

<script>
	import {
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				form: {
					name: '',
					password: ''
				},
			}
		},
		methods: {
			...mapMutations(['setToken']),
			onSubmit() {
				if(this.form.name === '' || this.form.password === '') {
					this.$message('请输入账号和密码')
				} else if(this.form.name === 'admin' && this.form.password === '123456') {
					this.setToken('admin');
					this.$router.replace('/home')
				} else {
					this.$message('账号或密码错误')
				}

			}
		}
	}
</script>

<style scoped="scoped">
	#login {
		position: relative;
		width: 100%;
		height: 100%;
		background-image: url(../assets/img/login-bg.e2134055.jpg);
		background-size: 100%;
	}

	.login {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 350px;
		margin: -190px 0 0 -175px;
		border-radius: 5px;
		background: hsla(0, 0%, 100%, .3);
		overflow: hidden;
	}

	.title {
		width: 100%;
		line-height: 50px;
		text-align: center;
		font-size: 20px;
		color: #fff;
		border-bottom: 1px solid #ddd;
	}

	.el-form {
		padding: 30px 30px;
	}

	.el-input {
		margin-bottom: 18px;
	}

	.login-btn {}
</style>
