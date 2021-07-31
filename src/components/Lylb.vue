<template>
	<div id="content">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>楼宇管理</el-breadcrumb-item>
			<el-breadcrumb-item>楼宇列表</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="search">
			<el-button type="primary" icon="el-icon-search" class="add" @click="add()">添加</el-button>
			<div class="search_input">
				<span>负责人</span>
				<el-input v-model="search" placeholder="请输入内容"></el-input>
				<el-button type="primary" icon="el-icon-search" @click="searchBuild()">搜索</el-button>
			</div>
		</div>

		<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
			<el-table-column prop="name" label="楼宇号" width="240">
			</el-table-column>
			<el-table-column prop="user.name" label="负责人" width="240">
			</el-table-column>
			<el-table-column prop="user.sex" label="性别" width="240">
			</el-table-column>
			<el-table-column prop="user.phone" label="联系电话" width="240">
			</el-table-column>
			<el-table-column label="操作" width="240">
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>



		<el-dialog :title="dialogValue.title" :visible.sync="dialogFormVisible">
			<el-form :model="dialogValue">
				<el-form-item label="楼宇" :label-width="formLabelWidth">
					<el-input v-model="dialogValue.building" autocomplete="off" :disabled="isDisabled"></el-input>
				</el-form-item>
				<el-form-item label="负责人" :label-width="formLabelWidth">
				      <el-select v-model="dialogValue.name" placeholder="请选择负责人">
				        <el-option :label="item.name" :value="item.name" v-for="(item,index) in userList" :key="index"></el-option>
				      </el-select>
				    </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
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
				userList: [],
				multipleSelection: [],
				search: '',
				dialogValue: {
					name: '',
					id: 0,
					building: '',
					title: '',
				},
				dialogFormVisible: false,
				formLabelWidth: '120px',
				isDisabled: false
			}
		},

		methods: {
			BuildingCreate() {
				this.$get(this.$api.API_URL_BUILDING).then(res => {
					console.log(res);
					this.tableData = res.data;
				})
			},
			handleEdit(index, row) {
				console.log(index, row);
				[this.dialogValue.building, this.dialogValue.id, this.dialogValue.name] = [row.name, row.id, row.user.name]
				this.dialogFormVisible = true;
				this.isDisabled = true;
				this.dialogValue.title = '编辑'
			},
			handleDelete(index, row) {
				this.$delete(this.$api.API_URL_BUILDING + '/' + row.id).then(res => {
					console.log(res);
					if (res.code === 200) {
						this.BuildingCreate();
					}
					this.$message(res.msg);
				})
			},
			add() {
				this.dialogFormVisible = true;
				this.dialogValue.title = '添加';
			},
			edit() {
				if (this.dialogValue.title === '编辑') {
					this.$patch(this.$api.API_URL_BUILDING + '/' + this.dialogValue.id, {
						name: this.dialogValue.name
					}).then(res => {
						if (res.code === 200) {
							this.dialogFormVisible = false;
							this.BuildingCreate();
						}
						this.$message(res.msg);
					})
				} else if (this.dialogValue.title === '添加') {
					this.$post(this.$api.API_URL_BUILDING, {
						building: this.dialogValue.building,
						name: this.dialogValue.name
					}).then(res => {
						if (res.code === 200) {
							this.dialogFormVisible = false;
							this.BuildingCreate();
						}
						this.$message(res.msg);
					})
				}
			},
			searchBuild() {
				if(this.search != '') {
					this.$get('http://39.108.189.156:8088/api/buildshow?name=' + this.search).then(res => {
						console.log(res);
						if(res.code === 200) {
							this.tableData = res.data;
						}
						this.$message(res.msg)
					})
				}
			}
		},
		watch: {
			search(newValue) {
				if(newValue === '') {
					this.BuildingCreate();
				}
			}
		},
		created() {
			this.BuildingCreate();
			this.$get(this.$api.API_URL_USER).then(res => {
				this.userList = res.data;
			})
		}
	}
</script>


<style scoped="scoped">
	.el-table {
		padding: 20px;
	}
</style>
