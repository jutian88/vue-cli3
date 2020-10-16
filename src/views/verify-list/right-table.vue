<template>
  <section>
    <el-table
      ref="filterTable"
      :data="tableData"
    >
      <el-table-column
        v-for="(item,index) in labelData"
        :key="item.enName"
        :prop="item.enName"
        :label="item.cnName"
      >
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row[item.enName]"
            closable
            disable-transitions
            @close="handleClose(item, scope.$index)"
          >
            {{scope.row[item.enName]}}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-switch
      :style="{marginTop: '10px', marginLeft: '800px'}"
      v-model="isTrunOn"
      active-color="#13ce66"
    >
    </el-switch>
  </section>
</template>

<script>
export default {
  data() {
    return {
      labelData: [
        { enName: 'date', cnName: '时间' },
        { enName: 'name', cnName: '姓名' },
        { enName: 'address', cnName: '地址' },
        { enName: 'tag', cnName: '标签' }
      ],
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '1518 弄',
          tag: '家'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '1517 弄',
          tag: '公司'
        },
        {
          date: '2020-10-2',
          name: '',
          address: '1519 弄',
          tag: '家1'
        },
        {
          date: '2016-05-03',
          name: '11',
          address: ' 1516 弄',
          tag: '公司2'
        }
      ],
      isTrunOn: false,
      toDoTableData: [],
      currentRow: 0,
      currentColumn: 0,
      todoIndex: 0
    }
  },
  created() {
    this.toDoTableData = JSON.parse(JSON.stringify(this.tableData))
  },
  watch: {
    // 监听弹窗是否打开
    isTrunOn(val) {
      if (val) {
        console.log('开始启动')
        this.toDoTableData.map((obj, index) => {
          // 第一层判断
          if (this.isTrunOn) {
            let currentColumn = 0
            // console.log('进来1', index + '--index')
            for (const enName in obj) {
              currentColumn++
              // 第二层判断: 无值时或者手动暂停
              if (!obj[enName]) {
                this.currentRow =  index +1
                // console.log('进来3', index + '--行')
                this.isTrunOn = false
                break
              } else {
                delete this.toDoTableData[index][enName]
              }
            }
            this.currentColumn = currentColumn
          }
        })
      } else {
        this.toDoTableData.splice(0, this.currentRow)
        console.log("当前行列: "+this.currentRow+'-'+this.currentColumn);
        console.log(this.toDoTableData, '停止')
      }
    }
  },
  methods: {
    handleClose(item, index) {
      let obj = this.tableData[index]
      const enName = item.enName
      // const changedTag = obj.filter(elem => elem[enName] == row[item.key])[0]
      obj[enName] = null
    }
  }
}
</script>
