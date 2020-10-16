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
      isTrunOn: false, //开始按钮是否打开状态
      toDoTableData: [], // 剩余未被校验的表
      currentRow: 0, //当前的行: 从1开始
      currentColumn: 0, //当前的列: 从1开始
      todoIndex: 0, // 停留的index序列
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
        this.tableData.map((obj, index) => {
          // 第一层判断
          if (this.isTrunOn) {
            // let currentColumn = this.todoIndex > 0 ?  this.currentColumn+ 0: 0
            let currentColumn = 0
            // console.log('进来1', index + '--index')
            for (let enName in obj) {
              currentColumn++
              // 第二层判断: 无值时或者手动暂停
              if (!obj[enName]) {
                console.log('进来了');
                this.currentRow =  index +1
                // console.log('进来3', index + '--行')
                this.isTrunOn = false
                break
              } else {
                this.currentRow = 0 // 只是测试一次循环, 记得删除这行代码, 打开下行的代码
                // delete this.toDoTableData[index][enName]
              }
            }
            this.currentColumn = currentColumn
            // 获取tr元素 改变其样式
            console.log(this.currentRow +'...'+currentColumn);
            const todoIndex = +(this.currentRow - 1) * this.labelData.length + currentColumn -1
            // 判断todoIndex变化
            if(todoIndex > 0) {
              this.todoIndex = todoIndex
              console.log('todoIndex: '+this.todoIndex);
              console.log(document.querySelectorAll("table td")[todoIndex]);
              document.querySelectorAll("table td")[todoIndex].style.backgroundColor = "red"
            }
          }
        })
      } else {
        this.toDoTableData.splice(0, this.currentRow -1)
        console.log('停止---'+"当前行列: "+ this.currentRow+'-'+ this.currentColumn);
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
