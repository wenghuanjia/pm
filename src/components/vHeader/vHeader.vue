<template>
  <header>
    <div class="header_top clear">
      <h2 class="header_top_left fl">广东联高技术推广服务有限公司</h2>
      <section class="header_top_right fr clear">
        <div class="user_name fl" v-if="userInfo">欢迎{{ userInfo.name }}：{{ userInfo.user_login }}</div>
        <div class="exit fr" @click="goLogin">退出</div>
      </section>
    </div>
    <el-menu :default-active="active" class="el-menu-demo"  mode="horizontal" @select="handleSelect" background-color="#287DD4" text-color="#fff" active-text-color="#fff">
      <el-menu-item  index="/index">首页</el-menu-item>
      <el-menu-item   index="/company">企业管理</el-menu-item>
      <el-submenu index="/pm">
        <template slot="title">项目管理</template>
        <el-menu-item index="/pm" v-for="(item, index) in tabs" :key="index" @click="whileId(item.id)">{{ item.name }}</el-menu-item>
      </el-submenu>
      <el-menu-item index="/staff">人员管理</el-menu-item>
    </el-menu>
    <section class="crumbs-wrapper clear" v-if="!getaddpm">
        <div class="crumbs_title fl">
          {{ crumbs_title }} <span v-if="smallTitle" style="font-size: 12px;">{{ smallTitle }}</span> 
        </div>
        <div class="fr clear">
          <div class="search fl clear" v-if="search">
            <el-input class="fl" style="width: 70%; margin-right: 15px;" placeholder="请输入内容" size="mini" :clearable="true" prefix-icon="el-icon-search" v-model="searchMsg"></el-input>
            <el-button class="fl" type="primary" size="mini" @click="searchBtn">搜索</el-button>
          </div>
          <div class="addenterprise fl" v-if="pmenterprise && userInfo && userInfo.name == '业务员'">
            <el-button type="primary"  size="mini" icon="el-icon-edit" @click="auditstate = true;">新增项目</el-button>
          </div>
        </div>
    </section>

    <!-- 新增项目 -->
    <el-dialog title="请选择" width="30%" center :visible.sync="auditstate">
      <!-- <div class="lists" v-for="(item, index) in tabs" :key="index" @click="addpm(item.id)">{{ item.name }}</div> -->
      <el-checkbox-group v-model="typeArr">
        <el-checkbox class="lists" v-for="(item, index) in tabs" :label="item.id" :key="index">{{ item.name }}</el-checkbox>
      </el-checkbox-group>
      <div class="right">
        <el-button type="primary" @click="addpm()">下一步</el-button>
      </div>
    </el-dialog>

    <!-- 新增项目输入名称 -->
    <el-dialog title="新增项目" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="企业名称" label-width="120px">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div>
        <span class="choose">请选择</span>
        <el-select v-model="year" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancenl">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </header>
</template>

<script>
import { getStore, removeStore } from "common/common";
import { mapState, mapMutations } from "vuex";
import { pmtype, pmList, addProjectName, addProName } from "service/getData"

export default {
  name: 'vHeader',
  props: ['crumbs_title', 'search', 'pmenterprise', 'getaddpm'],
  data () {
    return {
      typeArr: [],
      auditstate: false, // 新增项目模态框
      dialogFormVisible: false, // 新增项目输入名称
      searchMsg: '', // 搜索框
      active: '', // 头部链接
      project_type_id: '', // 新增项目id
      tabs: null,
      smallTitle: '',
      form: {
          name: ''
      },
      year: '',
      options: []
    }
  },
  created () {
    this.INIT_USERINFO();
    var url = this.$route.path;
    if (url.indexOf("/index") != -1) {
      this.active = '/index';
    } else if (url.indexOf("/company") != -1) {
      this.active = '/company';
    } else if (url.indexOf("/pm") != -1) {
      this.active = '/pm';
    } else if (url.indexOf("/staff") != -1) {
      this.active = '/staff';
    }
    this.handleYear();
  },
  async mounted () {
    // 获取新建项目列表
    await pmtype().then(res => {
      this.tabs = res
    });
    
    var pmid = this.$route.params.pmid;
    if (pmid) {
      for (var i = 0; i < this.tabs.length; i++) {
        if (pmid == this.tabs[i].id) {
          this.smallTitle = this.tabs[i].name
        }
      }
    }
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  methods: {
    ...mapMutations(['OUT_LOGIN', 'INIT_USERINFO', 'SET_STATE_FLAG']),
    // 一级导航栏
    handleSelect(key, keyPath, name) {
      if (this.$route.query && key == '/company') {
        pmList({search: ''}).then(res => {
          this.$emit("searchList", res)
        })
      }

      if (key != '/pm') {
        this.$router.push({path: key})
      }
    },
    // 退出
    goLogin () {
      this.OUT_LOGIN();
      this.$router.push({ path: '/login' });
    },
    // 筛选项目
    whileId (id) {
      this.$router.push({name: 't0', params: {pmid: id}});
      this.$emit("whileList", id)
    },
    // 新增项目
    addpm () {
      if (this.typeArr.length == 0) return this.$message('至少选择一项');
      // console.log(this.typeArr)
      this.auditstate = false;
      this.dialogFormVisible = true;
      // this.project_type_id = id;
    },
    // 取消输入名称
    cancenl () {
      this.dialogFormVisible = false;
      this.auditstate = true;
    },
    // 确定输入名称
    confirm () {
      this.dialogFormVisible = false;
      if (this.form.name == '' || this.year == '') return this.$message('请输入企业名称')
      this.typeArr.forEach(item => {
        console.log(item)
        console.log(this.year)
        addProName({name: this.form.name, project_type_id: item, year: this.year}).then(res => {
          this.SET_STATE_FLAG(1);
          this.$router.push({path: '/company/t0'})
          this.$message({
            message: '添加成功',
            type: 'success'
          });
          // this.$router.push({ path: '/addpm', query: {id: this.project_type_id, pro_id: res.pro_id}});
        })
      })
      this.typeArr = [];
    },
    handleYear() {
      // 生成年份选择器
      var myDate= new Date(); 
      var startYear=myDate.getFullYear()-50;//起始年份 
      var endYear=myDate.getFullYear()+50;//结束年份
      for (let i = startYear; i <= endYear; i++) {
        this.options = [].concat(this.options, i)
      }
    },
    // 搜索
    searchBtn () {
      pmList({search: this.searchMsg}).then(res => {
        this.$emit("searchList", res)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../../style/mixin.less";

  .header_top {
    padding: 0px 15px;
    line-height: 50px;
    .header_top_right {
      .sc(14px, #333);
      .exit {
        margin-left: 15px;
        cursor: pointer;
      }
    }
  }
  .crumbs-wrapper {
    padding: 15px;
    .crumbs_title {
      .sc(16px, @theme);
      padding-left: 5px;
      border-left: 4px solid @theme;
    }
  }
  .lists {
    // margin-left: 20px;
    width: 100%;
    // text-align: center;
    line-height: 30px;
    &:hover {
      background: #E2E2E2;
      cursor: pointer;
    }
  }
  .el-checkbox+.el-checkbox {
    margin-left: 0;
  }
  .right {
    text-align: right;
  }
  .el-select-dropdown .el-popper {
    min-width: 217px;
    transform-origin: center top 0px;
    z-index: 2025;
    position: fixed;
    top: 258px !important;
    left: 420px;
  }
  .choose {
    width: 120px;
    font-weight: bold;
    display: inline-block;
    text-align: right;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
</style>
