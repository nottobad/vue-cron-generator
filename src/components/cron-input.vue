<template>
  <div>
    <el-row>
      <el-col :span="18">
 <el-popover v-model="visible">
      <cron v-model="cron_" :size="size" @change="change"/>
      <el-input slot="reference" v-model="cron_" :placeholder="$t('common.inputPlaceholder')" :size="size">
        <!-- <el-button slot="append" icon="el-icon-refresh" @click="reset"/> -->
      </el-input>
    </el-popover>
      </el-col>
     <el-col :span="6">
      <el-popover v-model="quickRuleVisible" >
        <el-table
      :data="tableData"
      size="mini"
      @row-click="handleRowClick"
      style="width: 100%">
      <el-table-column
        prop="rulename"
        :label="$t('common.rules')"
        width="180">
      </el-table-column>
    </el-table>
        <el-button  slot="reference" size="mini" icon="el-icon-menu"/>
      </el-popover>
          </el-col>
    </el-row>
  </div>
</template>

<script>
import Cron from './cron'
import { DEFAULT_CRON_EXPRESSION } from '../constant/filed'
export default {
  name: 'CronInput',
  components: {
    Cron
  },
  props: {
    value: {
      type: String,
      default: DEFAULT_CRON_EXPRESSION
    },
    size: {
      type: String,
      default: 'mini'
    }
  },
  data() {
    return {
      cron_: '',
      visible: false,
      quickRuleVisible:false,
      // tableData:[
      //   {rulename:'每天,上午9点',rule:'0 0 9 * * ? *'},
      //   {rulename:'每星期一,上午9点',rule:'0 0 9 ? * 2 *'},
      //   {rulename:'每月1日,上午9点',rule:'0 0 9 1 * ?'},
      //   {rulename:'每3个月的1日,上午9点',rule:'0 0 9 1 1/3 ?'},
      // ]
    }
  },
  computed:{
    tableData(){
      var temp = [
        {rulename:this.$t('common.rule1') ,rule:'0 0 9 * * ? *'},
        {rulename:this.$t('common.rule2'),rule:'0 0 9 ? * 2 *'},
        {rulename:this.$t('common.rule3'),rule:'0 0 9 1 * ?'},
        {rulename:this.$t('common.rule4'),rule:'0 0 9 1 1/3 ?'},
      ]
      return temp;
    }
  },
  watch: {
    value(val) {
      this.setCron(val)
    }
  },
  created() {
    this.setCron(this.value)
  },
  methods: {
    handleRowClick(row){
      this.cron_ = row.rule
      this.quickRuleVisible = false
    },
    setCron(newValue) {
      if (!newValue || newValue.trim().length < 11) {
        this.$message.error(this.$t('common.wordNumError'))
        return
      }
      this.cron_ = newValue
    },
    change(cron) {
      this.cron_ = cron
      this.$emit('change', cron)
    },
    reset() {
       //this.$emit('reset', this.value)
      // return;
      this.$confirm('要恢复默认时间设置(每月1日)吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('reset', this.value)
        }).catch(() => {
                   
        });
    }
  }
}
</script>
