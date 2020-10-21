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
      <el-popover >
        <el-table
      :data="tableData"
      size="mini"
      @row-click="handleRowClick"
      style="width: 100%">
      <el-table-column
        prop="rulename"
        label="常用时间规则"
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
      tableData:[
        {rulename:'aaa',rule:'0 0 12 * * ?'},
        {rulename:'bbbb',rule:'0 0 13 * * ?'},
        {rulename:'ccc',rule:'0 0 14 * * ?'},
      ]
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
