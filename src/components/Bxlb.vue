<template>
	<div id="content">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>后勤管理</el-breadcrumb-item>
			<el-breadcrumb-item>报修列表</el-breadcrumb-item>
		</el-breadcrumb>

		<el-table ref="multipleTable" :data="tableData.data" tooltip-effect="dark" style="width: 100%">

			<el-table-column prop="ly" label="楼宇号" min-width="75">
			</el-table-column>
			<el-table-column prop="ss" label="宿舍号" min-width="75">
			</el-table-column>
			<el-table-column prop="mz" label="报修人" min-width="75">
			</el-table-column>
			<el-table-column prop="sj" label="联系电话" min-width="120">
			</el-table-column>
			<el-table-column label="报修日期" width="120">
				<template slot-scope="scope">{{ formatDate(scope.row.date) }}</template>
			</el-table-column>
			<el-table-column label="报修时间" width="120">
				<template slot-scope="scope">{{ formatTime(scope.row.time) }}</template>
			</el-table-column>
			<el-table-column prop="ms" label="报修详情" min-width="400">
			</el-table-column>
			<el-table-column label="操作" min-width="90">
				<template slot-scope="scope">
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="page_size"
			layout="total, prev, pager, next, jumper" :total="tableData.total">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [],
				multipleSelection: [],
				search: '',
				time: '',

				page_size: 5,
				currentPage: 1,
				page:0
			}
		},
		computed: {
			formatDate() {
				return function(val) {
					return val ? new Date(val).Format('yyyy-MM-dd') : ''
				}
			},
			formatTime() {
				return function(val) {
					return val ? new Date(val).Format('hh:mm:ss') : ''
				}
			}
		},

		methods: {
			repairCreate() {
				this.$get(this.$api.API_URL_REPAIR).then(res => {
					console.log(res);
					if (res.code === 200) {
						this.tableData = res.data;
						this.page = res.data.current_page
					}
				})
			},
			handleDelete(index, row) {
				this.$delete(this.$api.API_URL_REPAIR + '/' + row.id).then(res => {
				this.$message(res.msg)
				console.log(this.page);
				this.handleCurrentChange(this.page)
				})
			},
			handleCurrentChange(val) {
				this.$get(this.$api.API_URL_REPAIR, {
					page: val
				}).then(res => {
					console.log(res);
					if (res.code === 200) {
						this.tableData = res.data;
						this.page = res.data.current_page
					}
				})
			}
		},

		created() {
			this.repairCreate();
		}


	}
</script>


<style scoped="scoped">
	.el-table {
		padding: 20px;
	}

	.el-pagination {
		text-align: center;
	}
</style>
