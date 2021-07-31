<template>
	<div id="content">
		<el-breadcrumb separator=">">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>后勤管理</el-breadcrumb-item>
			<el-breadcrumb-item>损坏报修</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="body">
			<el-form label-position="right" :rules="rules" ref="ruleForm" label-width="80px" :model="ruleForm">
				<el-form-item label="报修日期" prop="date">
					<el-date-picker v-model="ruleForm.date" type="date" placeholder="选择日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="报修时间" prop="time">
					<el-time-picker v-model="ruleForm.time" placeholder="选择时间">
					</el-time-picker>
				</el-form-item>
				<el-form-item label="报修人" prop="mz">
					<el-input v-model="ruleForm.mz" placeholder="请输入您的姓名"></el-input>
				</el-form-item>
				<el-form-item label="联系电话" prop="sj">
					<el-input v-model="ruleForm.sj" placeholder="请输入您的联系电话"></el-input>
				</el-form-item>
				<el-form-item label="楼宇号" prop="ly">
					<el-input v-model="ruleForm.ly" placeholder="请输入您的所在楼宇号"></el-input>
				</el-form-item>
				<el-form-item label="宿舍号" prop="ss">
					<el-input v-model="ruleForm.ss" placeholder="请输入您的宿舍号"></el-input>
				</el-form-item>
				<el-form-item label="问题描述" style="width: 60%;" prop="ms">
					<el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请描述具体损坏情况"
						v-model="ruleForm.ms">
					</el-input>
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
					date: '',
					time: '',
					mz: '',
					sj: '',
					ly: '',
					ss: '',
					ms: ''
				},
				rules: {
					date: [{
						required: true,
						message: '请输入内容',
						trigger: 'blur'
					}, ],
					time: [{
						required: true,
						message: '请输入内容',
						trigger: 'blur'
					}, ],
					mz: [{
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
					ms: [{
						required: true,
						message: '请输入内容',
						trigger: 'blur'
					}, ],
				},
			}
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						console.log(this.ruleForm);
						this.$post(this.$api.API_URL_REPAIR,{
							data: this.ruleForm
						}).then(res => {
							console.log(res);
							this.$message(res.msg);
							this.$refs[formName].resetFields();
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
		height: 400px;
		background-color: #fff;
		padding: 0 20px;
	}

	.el-form-item {
		float: left;
		width: 40%;
		margin: 30px 0 0 0;
	}
</style>
