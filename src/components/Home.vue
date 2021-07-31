<template>
	<div id="home">
		<div class="title">
			<h1>校园风光</h1>
			<p>校内风光，无限美好，俯瞰之间，尽收眼底</p>
		</div>
		<div class="body">
				<el-row >
				  <el-col :span="6" v-for="(o, index) in img1" :key="index" :offset="index > 0 ? 3 : 0">
				    <el-card :body-style="{ padding: '0px' }">
				      <img :src="o.src" class="image">
				      <div style="padding: 14px;">
				        <span>校园风光</span>
				      </div>
				    </el-card>
				  </el-col>
				</el-row>
				<el-row>
				  <el-col :span="6" v-for="(o, index) in img2" :key="index" :offset="index > 0 ? 3 : 0">
				    <el-card :body-style="{ padding: '0px' }">
				      <img :src="o.src" class="image">
				      <div style="padding: 14px;">
				        <span>校园风光</span>
				      </div>
				    </el-card>
				  </el-col>
				</el-row>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				img1: [{
					src:'https://jmy-pic.baidu.com/0/pic/8b0223ab4938e5b5c4de8b2d4b3ffbf4.jpg'
				},{
					src:'https://jmy-pic.baidu.com/0/pic/8255ca1de86bb2166d6c959a8d1d89eb.jpg'
				},{
					src:'https://jmy-pic.baidu.com/0/pic/8cc64bc17c599ee1efaf2e051367c86d.jpg'
				}],
				img2: [{
					src:'https://jmy-pic.baidu.com/0/pic/019833c449d68f643b29086f59cbc224.jpg'
				},{
					src:'https://jmy-pic.baidu.com/0/pic/c3a843ccdac0b5a8fe3a5d8963cf1c98.jpg'
				},{
					src:'https://jmy-pic.baidu.com/0/pic/58bf7da440ef5ebd1558009d90456dea.jpg'
				}],
			}
		}
	}
</script>

<style>
	#home {
	}
	.title {
		text-align: center;
	}
	.title h1 {
		font-weight: 400;
		font-size: 30px;
	}
	.title p {
		color: #999;
	}
	
	.el-row {
		margin: 30px auto;
		padding: 0 20px;
		max-width: 1400px;
		text-align: center;
	}
 </style>
