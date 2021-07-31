<template>
	<div id="content">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>用户权限管理</el-breadcrumb-item>
			<el-breadcrumb-item>用户权限列表</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="search">
			<el-button type="primary" icon="el-icon-search" class="add" @click="handleAdd()">添加</el-button>
			<div class="search_input">
				<span>姓名</span><el-input v-model="search" placeholder="请输入内容" ></el-input>
				<el-button type="primary" icon="el-icon-search" @click="searchUser()">搜索</el-button>
			</div>
		</div>

		<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
			<el-table-column prop="name" label="负责人" min-width="120">
			</el-table-column>
			<el-table-column prop="sex" label="性别" min-width="120">
			</el-table-column>
			<el-table-column prop="phone" label="联系电话" min-width="120">
			</el-table-column>
			<el-table-column prop="role" label="角色" min-width="120">
			</el-table-column>
			<el-table-column label="操作" min-width="120">
				<template slot-scope="scope" v-if="scope.row.id!=1">
					<el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		
	<!-- 	<el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="5"
			layout="total, prev, pager, next, jumper" :total="total" style="text-align: center;">
		</el-pagination> -->
		
		<el-dialog title="编辑" :visible.sync="dialogFormVisible">
			<el-form :model="dialogValue">
				<el-form-item label="负责人" :label-width="formLabelWidth">
					<el-input v-model="dialogValue.name" autocomplete="off" ></el-input>
				</el-form-item>
				<el-form-item label="性别" :label-width="formLabelWidth">
					<el-input v-model="dialogValue.sex" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="联系电话" :label-width="formLabelWidth">
					<el-input v-model="dialogValue.phone" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="角色" :label-width="formLabelWidth">
					<el-input v-model="dialogValue.role" autocomplete="off"></el-input>
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
				multipleSelection: [],
				search:'',
				
				currentPage: 1,
				total: 0,
				
				title: '',
				id: 0,
				dialogValue: {
					name: '',
					sex: '',
					phone: '',
					role: ''
				},
				dialogFormVisible: false,
				formLabelWidth: '120px',
			}
		},

		methods: {
			userCreate() {
				this.$get(this.$api.API_URL_USER).then(res => {
					console.log(res);
					if(res.code === 200) {
						this.tableData = res.data
						this.total  = res.data.total;
					}
				})
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			handleEdit(row) {
				console.log(row);
				[this.dialogValue] = [row];
				this.id = row.id;
				this.dialogFormVisible = true;
				this.title = '编辑';
			},
			handleAdd() {
				for(let item in this.dialogValue){
					this.dialogValue[item] = '';
				}
				
				this.dialogFormVisible = true;
				this.title = '添加';
			},
			cancel () {
				this.userCreate();
				this.dialogFormVisible = false;
			},
			edit() {
				if(this.title === '编辑') {
				this.$patch(this.$api.API_URL_USER+ '/' + this.id,{
					data: this.dialogValue
				}).then(res => {
					console.log(res);
					if(res.code === 200) {
						this.userCreate();
						this.dialogFormVisible = false;
					}
					this.$message(res.msg);
				})
				} else if(this.title === '添加') {
					const oldValue = this.dialogValue;
					console.log(oldValue);
					this.$post(this.$api.API_URL_USER, {
						data: this.dialogValue
					}).then(res => {
						if(res.code === 200) {
							this.userCreate();
							this.dialogFormVisible = false;
							this.dialogValue = oldValue;
						}
						this.$message(res.msg);
					})
				}
			},
			handleDelete(row) {
				this.$delete(this.$api.API_URL_USER + '/+' + row.id).then( res=> {
					if(res.code === 200) {
						this.userCreate();
					}
					this.$message(res.msg);
				})
			},
			handleCurrentChange(val) {
				this.$get(this.$api.API_URL_USER,{
					page: val
				}).then(res => {
					console.log(res);
					if (res.code === 200) {
						this.tableData = res.data.data
						this.total  = res.data.total;
					}
				})
			},
			searchUser() {
				this.$get('http://39.108.189.156:8088/api/usershow',{
					name: this.search
				}).then(res => {
					if(res.code === 200) {
						this.tableData = res.data;
					}
				})
			}
		},
		watch: {
			search(newValue) {
				if (newValue === '') {
					this.userCreate();
				}
			}
		},
		created() {
			this.userCreate();
		}
	}
</script>


<style scoped="scoped">

	.el-table {
		padding: 20px;
	}
</style>
