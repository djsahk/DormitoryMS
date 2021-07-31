<template>
	<div id="content">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>宿舍管理</el-breadcrumb-item>
			<el-breadcrumb-item>宿舍列表</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="search">
			<div class="search_select">
				楼宇号
				<el-select v-model="value" placeholder="请选择">
					<el-option v-for="item in options" :key="item.name" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</div>
			<div class="search_input">
				<span>宿舍号</span>
				<el-input v-model="search" placeholder="请输入内容"></el-input>
				<el-button type="primary" icon="el-icon-search" @click="showDormiroty">搜索</el-button>
			</div>
		</div>

		<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
			<el-table-column type="expand">
				<template slot-scope="props" >
					<el-table :data="props.row.student" style="width: 100%;padding: 0;" >
						<el-table-column prop="mz" label="姓名" min-width="120">
						</el-table-column>
						<el-table-column prop="xh" label="学号" min-width="120">
						</el-table-column>
						<el-table-column prop="bj" label="班级" min-width="120">
						</el-table-column>
						<el-table-column prop="xy" label="学院" min-width="120">
						</el-table-column>
						<el-table-column label="操作">
							<template slot-scope="scope">
								<el-button size="mini" type="danger" @click="studentDelete(scope.row)">移出</el-button>
							</template>
						</el-table-column>
					</el-table>
				</template>
			</el-table-column>
			<el-table-column prop="ss_name" label="宿舍名" min-width="120">
			</el-table-column>
			<el-table-column prop="ssz" label="宿舍长" min-width="120">
			</el-table-column>
			<el-table-column prop="student.length" label="宿舍人数" min-width="120">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="5"
			layout="total, prev, pager, next, jumper" :total="total" style="text-align: center;">
		</el-pagination>

		<el-dialog title="编辑" :visible.sync="dialogFormVisible">
			<el-form :model="dialogValue">
				<el-form-item label="宿舍号" :label-width="formLabelWidth">
					<el-input v-model="dialogValue.ss_name" autocomplete="off" disabled></el-input>
				</el-form-item>
				<el-form-item label="宿舍长" :label-width="formLabelWidth">
					<el-input v-model="dialogValue.ssz" autocomplete="off"></el-input>
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
				multipleSelection: [],
				search: '',
				value: 1,
				options: [],
				dialogValue: {
					id: 0,
					ss_name: 0,
					ssz: ''
				},
				dialogFormVisible: false,
				formLabelWidth: '120px',
				currentPage: 1,
				total: 0,
			}
		},

		methods: {
			buildingCreate() {
				this.$get(this.$api.API_URL_BUILDING).then(res => {
					if (res.code === 200) {
						this.options = res.data
					}
				})
			},
			dormirotyCreate() {
				this.$get(this.$api.API_URL_DORMITORY + '/' + this.value).then(res => {
					console.log(res);
					if (res.code === 200) {
						this.tableData = res.data.data;
						this.total = res.data.total;
					} else {
						this.tableData = [];
						this.total = 0;
					}
				})
			},
			showDormiroty() {
				if (this.search != '') {
					this.$get(this.$api.API_URL_DORMITORY, {
						id: this.value,
						name: this.search
					}).then(res => {
						console.log(res);
						if (res.code === 200) {
							this.tableData = res.data;
							this.total = res.data.length;
						} else {
							this.tableData = [];
						}
					})
				}
			},
			handleEdit(index, row) {
				console.log(index, row);
				[this.dialogValue] = [row];
				this.dialogFormVisible = true;
			},
			edit(){
				this.$patch(this.$api.API_URL_DORMITORY+ '/' + this.dialogValue.id,{
					ssz: this.dialogValue.ssz
				}).then(res => {
					if(res.code === 200) {
						this.dormirotyCreate();
						this.dialogFormVisible = false;
					}
					this.$message(res.msg);
				})
			},
			handleDelete(index, row) {
				this.$delete(this.$api.API_URL_DORMITORY + '/' + row.id).then(res => {
					if (res.code === 200) {
						this.dormirotyCreate();
					}
					this.$message(res.msg);
				})
			},
			handleCurrentChange(val) {
				this.$get(this.$api.API_URL_DORMITORY, {
					page: val
				}).then(res => {
					console.log(res);
					if (res.code === 200) {
						this.tableData = res.data.data;
						this.total  = res.data.total;
					}
				})
			},
			studentDelete(row) {
				console.log(row);
				this.$patch(this.$api.API_URL_STUDENT + '/' + row.id, {
					data: {ss: ''}
				}).then(res => {
					if (res.code === 200) {
						this.dormirotyCreate();
					}
					this.$message(res.msg);
				})
			}
		},
		watch: {
			value() {
				this.dormirotyCreate();
			},
			search(newValue) {
				if (newValue === '') {
					this.dormirotyCreate();
				}
			}
		},

		created() {
			this.buildingCreate();
			this.dormirotyCreate();
		}
	}
</script>


<style scoped="scoped">
	.el-table {
		padding: 20px;
	}
</style>
