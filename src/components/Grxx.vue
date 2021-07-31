<template>
	<div id="content">
		<el-breadcrumb separator=">">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>学生管理</el-breadcrumb-item>
			<el-breadcrumb-item>个人信息</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="body">
			<el-form label-position="right" :rules="rules" ref="ruleForm" label-width="80px" :model="ruleForm">
				<el-form-item label="名称" prop="mz">
					<el-input v-model="ruleForm.mz" placeholder="张三"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="xb">
					<el-input v-model="ruleForm.xb" placeholder="男"></el-input>
				</el-form-item>
				<el-form-item label="学号" prop="xh">
					<el-input v-model="ruleForm.xh" placeholder="20215044001"></el-input>
				</el-form-item>
				<el-form-item label="学院" prop="xy">
					<el-input v-model="ruleForm.xy" placeholder="计算机学院"></el-input>
				</el-form-item>
				<el-form-item label="班级" prop="bj">
					<el-input v-model="ruleForm.bj" placeholder="21计算机应用1班"></el-input>
				</el-form-item>
				<el-form-item label="联系电话" prop="sj">
					<el-input v-model="ruleForm.sj" placeholder="13712345678"></el-input>
				</el-form-item>
				<el-form-item label="所在楼宇" prop="ly">
					<el-input v-model="ruleForm.ly" placeholder="1栋"></el-input>
				</el-form-item>
				<el-form-item label="宿舍号" prop="ss">
					<el-input v-model="ruleForm.ss" placeholder="101"></el-input>
				</el-form-item>
				<el-form-item label="身份证号" style="width: 40%;" prop="sfz">
					<el-input v-model="ruleForm.sfz"></el-input>
				</el-form-item>
				<div style="position: absolute;bottom: 20px;right: 100px;">
					<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
					<el-button @click="resetForm('ruleForm')">重置</el-button>
				</div>

			</el-form>
		</div>
	</div>


</template>

<script>
	export default {
		data() {
			return {
				ruleForm: {
					mz: '',
					xb: '',
					xh: '',
					xy: '',
					bj: '',
					sj: '',
					ly: '',
					ss: '',
					sfz: ''
				},
				rules: {
					mz: [{
						required: true,
						message: '请输入内容',
						trigger: 'blur'
					}, ],
					xb: [{
						required: true,
						message: '请输入内容',
						trigger: 'blur'
					}, ],
					xh: [{
						required: true,
						message: '请输入内容',
						trigger: 'blur'
					}, ],
					xy: [{
						required: true,
						message: '请输入内容',
						trigger: 'blur'
					}, ],
					bj: [{
						required: true,
						message: '请输入内容',
						trigger: 'blur'
					}, ],
					sj: [{
						required: true,
						message: '请输入内容',
						trigger: 'blur'
					}, ],
					ly: [{
						required: true,
						message: '请输入内容',
						trigger: 'blur'
					}, ],
					ss: [{
						required: true,
						message: '请输入内容',
						trigger: 'blur'
					}, ],
					sfz: [{
						required: true,
						message: '请输入内容',
						trigger: 'blur'
					}, ],
				}
			}
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$post(this.$api.API_URL_STUDENT, {
							data: this.ruleForm
						}).then(res => {
							if(res.code === 200 ){
								this.$refs[formName].resetFields();
							}
							this.$message(res.msg);
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>

<style scoped="scoped">
	.body {
		position: relative;
		height: 300px;
		background-color: #fff;
		padding: 0 20px;
	}

	.el-form-item {
		float: left;
		width: 25%;
		margin: 30px 0 0 0;
	}
</style>
