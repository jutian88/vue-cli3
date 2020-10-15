<template>
  <section>
    <el-table
      ref="filterTable"
      :data="tableData"
    >
      <el-table-column
        prop="date"
        :label="labelData"
      >
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.date"
            closable
            disable-transitions
            @close="handleClose('date', scope.row.date)"
          >
            {{scope.row.date}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
      >
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.name"
            closable
            disable-transitions
            @close="handleClose('name',scope.row.name)"
          >
            {{scope.row.name}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
      >
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.address"
            closable
            disable-transitions
            @close="handleClose('address',scope.row.address)"
          >
            {{scope.row.address}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="tag"
        label="标签"
      >
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.tag"
            closable
            disable-transitions
            @close="handleClose('tag', scope.row.tag)"
          >
            {{scope.row.tag}}
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
      labelData: ['时间', '姓名', '地址', '标签'],
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
    handleClose(name, val) {
      const changedTag = this.tableData.filter(elem => elem[name] == val)[0]
      changedTag[name] = null
    }
  }
}
</script>
