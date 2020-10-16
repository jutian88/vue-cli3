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
        :label="item.enName"
      >
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row[item.enName]"
            closable
            disable-transitions
            @close="handleClose(item, scope.row, scope.$index)"
          >
            {{scope.row[item.enName]}}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-switch
      :style="{marginTop: '100px', marginLeft: '800px'}"
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
          name: '',
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
          date: '2016-05-01',
          name: '王小虎',
          address: '1519 弄',
          tag: '家1'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: ' 1516 弄',
          tag: '公司2'
        }
      ],
      isTrunOn: false
    }
  },
  watch: {
    // 监听弹窗是否打开
    isTrunOn(val) {
      if (val) {
        console.log('开始启动')
        this.tableData.map((obj, index) => {
          console.log(this.isTrunOn, index + '--index')
          // console.log( Object.keys(obj)); //获取对象的属性名
          // console.log( Object.values(obj)); // 获取对象的属性值
          // 第一层判断
          if (this.isTrunOn) {
            console.log('进来1', index + '--index')
            for (const name in obj) {
              // 第二层判断
              if (name == 'name' && this.isTrunOn) {
                console.log('进来2', index + '--index', !obj[name])
                // 第三层判断
                if (!obj[name]) {
                  console.log('进来3', index + '--index', obj, name + '-----暂停的重要参数')
                  console.log('得出的行列--' + index + name)
                  this.isTrunOn = false
                  break
                }
              }
            }
          }
        })
      } else {
        console.log('停止')
      }
    }
  },
  methods: {
    handleClose(item, row, index) {
      let obj = this.tableData[index]
      const enName = item.enName
      // const changedTag = obj.filter(elem => elem[enName] == row[item.key])[0]
      obj[enName] = null
    }
  }
}
</script>
