<template>
	<div id="content">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>学生管理</el-breadcrumb-item>
			<el-breadcrumb-item>学生列表</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="search">

			<el-form label-width="80px" :model="searchForm" class="searchForm">
				<el-form-item label="学院">
					<el-input v-model="searchForm.xy" placeholder="计算机学院"></el-input>
				</el-form-item>
				<el-form-item label="姓名">
					<el-input v-model="searchForm.mz" placeholder="张三"></el-input>
				</el-form-item>
				<el-form-item label="班级">
					<el-input v-model="searchForm.bj" placeholder="21计算机应用1班"></el-input>
				</el-form-item>
				<el-button type="primary" icon="el-icon-search" @click="searchClick()">搜索</el-button>
			</el-form>
		</div>

		<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
			<el-table-column prop="mz" label="姓名" min-width="60">
			</el-table-column>
			<el-table-column prop="xh" label="学号" min-width="120">
			</el-table-column>
			<el-table-column prop="xb" label="性别" min-width="60">
			</el-table-column>
			<el-table-column prop="sj" label="联系电话" min-width="120">
			</el-table-column>
			<el-table-column prop="xy" label="学院" min-width="120">
			</el-table-column>
			<el-table-column prop="bj" label="班级" min-width="120">
			</el-table-column>
			<el-table-column prop="ly" label="楼宇号" min-width="60">
			</el-table-column>
			<el-table-column prop="ss" label="宿舍号" min-width="60">
			</el-table-column>
			<el-table-column label="操作" min-width="120">
				<template slot-scope="scope" v-if="scope.row.id!=1">
					<el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="5"
			layout="total, prev, pager, next, jumper" :total="total" style="text-align: center;">
		</el-pagination>

		<el-dialog title="编辑" :visible.sync="dialogFormVisible">
			<el-form :model="dialogValue">
				<el-form-item label="姓名" :label-width="formLabelWidth">
					<el-input v-model="dialogValue.mz" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="学号" :label-width="formLabelWidth">
					<el-input v-model="dialogValue.xh" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别" :label-width="formLabelWidth">
					<el-input v-model="dialogValue.xb" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="联系电话" :label-width="formLabelWidth">
					<el-input v-model="dialogValue.sj" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="学院" :label-width="formLabelWidth">
					<el-input v-model="dialogValue.xy" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="班级" :label-width="formLabelWidth">
					<el-input v-model="dialogValue.bj" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="楼宇" :label-width="formLabelWidth">
					<el-input v-model="dialogValue.ly" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="宿舍" :label-width="formLabelWidth">
					<el-input v-model="dialogValue.ss" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancel()">取 消</el-button>
				<el-button type="primary" @click="edit()">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [],
				search: '',
				searchForm: {
					xy: '',
					bj: '',
					mz: ''
				},

				currentPage: 1,
				total: 0,

				dialogValue: {
					id: 0,
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
				dialogFormVisible: false,
				formLabelWidth: '120px',
			}
		},

		methods: {
			sutdentCreate() {
				this.$get(this.$api.API_URL_STUDENT).then(res => {
					console.log(res);
					if (res.code === 200) {
						this.tableData = res.data.data;
						this.total  = res.data.total;
					}
				})
			},
			handleEdit(row) {
				console.log(row);
				this.dialogFormVisible = true;
				[this.dialogValue] = [row];
			},
			handleDelete(row) {
				console.log(row);
				this.$delete(this.$api.API_URL_STUDENT + '/' + row.id).then(res => {
					console.log(res);
					if (res.code === 200) {
						this.sutdentCreate()
					}
					this.$message(res.msg);
				})
			},
			edit() {
				this.$patch(this.$api.API_URL_STUDENT + '/' + this.dialogValue.id, {
					data: this.dialogValue
				}).then(res => {
					console.log(res);
					if (res.code === 200) {
						this.sutdentCreate();
						this.dialogFormVisible = false;
					}
					this.$message(res.msg);
				})
			},
			cancel() {
				this.sutdentCreate();
				this.dialogFormVisible = false;
			},
			searchClick() {
				this.$get('http://39.108.189.156:8088/api/studentshow', {
					xy: this.searchForm.xy,
					bj: this.searchForm.bj,
					mz: this.searchForm.mz,
				}).then(res => {
					console.log(res);
					if (res.code === 200) {
						this.tableData = res.data;
						this.total = res.data.length;
					}
					this.$message(res.msg);
				})
			},
			handleCurrentChange(val) {
				this.$get(this.$api.API_URL_STUDENT, {
					page: val
				}).then(res => {
					console.log(res);
					if (res.code === 200) {
						this.tableData = res.data.data;
						this.total  = res.data.total;
					}
				})
			}
		},

		created() {
			this.sutdentCreate();
		}
	}
</script>


<style scoped="scoped">
	.el-table {
		padding: 20px;
	}

	.searchForm {
		overflow: hidden;
	}

	.searchForm .el-form-item {
		float: left;
		width: 40%;
	}
</style>
