<template>
  <div class="main">
    <v-header
      crumbs_title="企业管理"
      search="true"
      pmenterprise="true"
      ref="vheader"
      @searchList="setList"
    ></v-header>
    <!-- 中间表格内容区域 -->
    <v-table :table="table[currentPage3 - 1]" @getpmList="getList" :currentPage3="currentPage3"></v-table>
    <!-- 分页功能 -->
    <div class="block">
      <el-pagination
        :current-page.sync="currentPage3"
        :page-size="pageMsgNum"
        layout="prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import vHeader from "components/vHeader/vHeader";
import vFooter from "components/vFooter/vFooter";
import vTable from "components/vTable/vTable";
import { pmList, getProject } from "service/getData";

export default {
  components: {
    vHeader,
    vFooter,
    vTable
  },
  data() {
    return {
      total: null,
      currentPage3: 1, // 当前第几页
      pageMsgNum: 10, // 一页多少条
      table: []
    };
  },
  mounted() {
    var search = this.$route.query.search;
    // 从首页进来
    if (search) {
      getProject({ id: search }).then(res => {
        // console.log(res)
        this.table = [[res]];
      });
    } else {
      this.getList();
    }
  },
  methods: {
    // 查询项目列表
    getList() {
      pmList({}).then(res => {
        this.total = res.count;
        this.table = res.project_data;
      });
    },
    // 搜索
    setList(data) {
      this.total = data.count;
      this.table = data.project_data;
    }
  }
};
</script>


<style scoped lang="less">
@import "../style/mixin.less";

.el-tabs__content {
  overflow-x: scroll;
}
.main {
  position: relative;
  min-height: 100%;
}
.block {
  padding: 15px 15px 121px 15px;
  width: 600px;
  margin: 0 auto;
}
</style>