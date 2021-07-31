<template>
	<el-container class="main">
		<el-header style="height: 70px;padding: 0;color: #fff;">
			<div class="header-left">
				<div class="collapse" @click="isCollapse = !isCollapse">
					<i class="el-icon-s-fold" v-if="!isCollapse"></i>
					<i class="el-icon-s-unfold" v-else></i>
				</div>
				<div class="logo">
					后台管理系统
				</div>
			</div>
			<div class="header-right">
				<div class="user">
					<div class="user-img"><img src="../assets/logo.png" alt=""></div>
					<div class="user-name">
						<el-dropdown>
							<span class="el-dropdown-link">
								admin<i class="el-icon-arrow-down el-icon--right"></i>
							</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item><span  @click="delLogin()">退出登录</span></el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</div>
				</div>
			</div>
		</el-header>
		<el-container>
			<el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
				:collapse="isCollapse" background-color="#324157" text-color="#BFCBD9" active-text-color="#20A0FF"
				router>
				<el-menu-item index="home">
					<i class="el-icon-s-home"></i>
					<!-- <i class="el-icon-menu"></i> -->
					<span slot="title">首页</span>
				</el-menu-item>
				<el-submenu index="1">
					<template slot="title">
						<i class="el-icon-s-custom"></i>
						<span slot="title">用户权限管理</span>
					</template>
					<el-menu-item index="yhlb">用户权限列表</el-menu-item>
				</el-submenu>
				<el-submenu index="2">
					<template slot="title">
						<i class="el-icon-user-solid"></i>
						<span slot="title">学生管理</span>
					</template>
					<el-menu-item index="grxx">个人信息</el-menu-item>
					<el-menu-item index="xslb">学生列表</el-menu-item>
				</el-submenu>
				<el-submenu index="3">
					<template slot="title">
						<i class="el-icon-office-building"></i>
						<span slot="title">楼宇管理</span>
					</template>
					<el-menu-item index="lylb">楼宇列表</el-menu-item>
				</el-submenu>
				<el-submenu index="4">
					<template slot="title">
						<i class="el-icon-school"></i>
						<span slot="title">宿舍管理</span>
					</template>
					<el-menu-item index="sslb">宿舍列表</el-menu-item>
				</el-submenu>

				<el-submenu index="5">
					<template slot="title">
						<i class="el-icon-s-order"></i>
						<span slot="title">后勤管理</span>
					</template>
					<el-menu-item index="shbx">损坏报修</el-menu-item>
					<el-menu-item index="bxlb">报修列表</el-menu-item>
				</el-submenu>

			</el-menu>

			<el-main>
				<router-view />
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import {
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				isCollapse: false
			};
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			...mapMutations(['delToken']),
			delLogin() {
				console.log('1');
				this.delToken();
				this.$router.replace({
					name: 'Login'
				})
			},
		}
	}
</script>

<style>
	#content {
		height: 100%;
		padding: 0 20px;
		background-color: #f0f0f0;
	}

	.collapse {
		float: left;
		padding: 0 21px;
		line-height: 70px;
		cursor:pointer
	}

	.collapse:hover {
		background: #283446;
	}

	.logo {
		float: left;
		width: 250px;
		line-height: 70px;
	}

	.header-left {
		font-size: 22px;
	}

	.header-right {
		float: right;
		padding-right: 50px;
	}

	.user {
		display: flex;
		height: 70px;
		align-items: center;
	}

	.user-name {
		font-size: 14px;
		margin-left: 10px;
	}

	.user-img {
		width: 40px;
		height: 40px;
		border-radius: 40px;
		overflow: hidden;
	}

	img {
		width: 100%;
	}

	.el-breadcrumb {
		padding: 20px 0;
	}

	.el-header {
		background-color: #242f42;
	}

	.el-menu-vertical-demo {
		height: 100%;
	}

	.el-menu--collapse {}

	.el-main {
		padding: 0 !important;
	}

	.search {
		position: relative;
		background-color: #fff;
		padding: 20px 0 25px;
		margin-bottom: 10px;
		text-align: center;
	}

	.search .add,
	.search_select {
		display: inline-block;
		float: left;
		margin-left: 30px;
	}

	.search_input {
		display: inline-block;
	}

	.search_input .el-input {
		width: 350px;
		margin: 0 25px 0 10px;
	}

	.el-dropdown-link {
		color: #fff;
	}
</style>
