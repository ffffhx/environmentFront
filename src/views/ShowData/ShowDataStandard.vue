<script setup>
import * as echarts from 'echarts';
import { onMounted, reactive } from 'vue';
import { useCounterStore } from '@/stores/counter';
import { ref } from 'vue'
import router from '@/router';
import '@/assets/font/iconfont.css'
import '@/assets/font/iconfont.js'
import requests from '@/assets/requests'
import { ElMessage } from 'element-plus';

const counter = useCounterStore()





const tableRowClassName = ({
  rowIndex,
}) => {
  if (rowIndex === 1) {
    return 'warning-row'
  } else if (rowIndex === 3) {
    return 'success-row'
  }
  return ''
}

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]








const toSelect = () => {
  router.push('/')
}
const toInputStandard = () => {
  router.push('/inputstandard')
}


// 这两个数据需要做持久化存储
//存放OnDayResult的对象  这个对象里面有很多的数组
const ManyDayResultObj = {
  N2O: [],
  CH4: [],
  CO2: [],
  EleCInt: [],
  HotCInt: [],
  MatCMci: [],//物耗碳排放量
  EvaCI: [],
  EvaCIScore: [],
  LowCScore: [],
  LowCTotalScore: [],
  Level: [],
  IntC: [],//[7]
  IndCInt: [],//[12]
  CInt: [],//[13]
  Qrbi: [],//进水量
  // DirCIRat: [],//直接碳排放强度
  // UndCIRat: [],//间接碳排放强度
  // IntC: [],//碳排放强度
  // N2OCInt: [],
  // CH4CInt: [],
  // CO2Int: [],
  // MatCInt: [],//物耗碳排放强度  /Q
  // IndCInt: [],
  // TotNRemRat: [],
  // TreScaRat: [],
  // OxyPolRem: [],
  // WaterOutRat: [],
  // OxyConRat: [],
}
//存放日期的数组
let ManyDate = []

//将数据从map中用循环的方式取出 。一个key对应一个value。   一个key就是一个日期 ， 一个value就是OneDayResult是一个对象。
counter.mapStandard.forEach((OneDayResult, oneDate) => {
  //从OneDayResult中取值，放入ManyDayResultObj中
  console.log('执行了上面'); //1次
  for (const AData in OneDayResult) {
    ManyDayResultObj[AData].push(OneDayResult[AData])
    console.log('执行了下面');//12 次
  }
  //把日期放入ManyDate中，并给他排序
  ManyDate.push(oneDate)
  ManyDate.sort((a, b) => new Date(a) - new Date(b))//默认情况下，sort将数组元素转换为字符串，然后按字母顺序进行排序。
});
// 需要把完成取值放值之后的数据存到数据库里面，以供后面使用（ManyDayResultObj和ManyDate）
const ManyDayResultObjName = 'ManyDayResultObj'
localStorage.setItem(ManyDayResultObjName, JSON.stringify(ManyDayResultObj))
localStorage.setItem('ManyDate', JSON.stringify(ManyDate))

const LocalDayResult = JSON.parse(localStorage.getItem('ManyDayResultObj'))
// localStorage.getItem('ManyDate')
console.log(LocalDayResult, 'LocalDayResult');



// 需要在页面中展示的数据
const totalDataValue = reactive({
  totalN2OValue: 0,
  totalCH4Value: 0,
  totalCO2Value: 0,
  totalEleValue: 0,
  totalHotValue: 0,
  totalDrugValue: 0,
  totalIntCValue: 0,
  totalIndCIntValue: 0,
  totalCIntValue: 0,
  totalQrbiValue: 0,
})
// 求和
for (let i = 0; i < ManyDayResultObj.N2O.length; i++) {
  totalDataValue.totalN2OValue += ManyDayResultObj.N2O[i]
  totalDataValue.totalCH4Value += ManyDayResultObj.CH4[i]
  totalDataValue.totalCO2Value += ManyDayResultObj.CO2[i]
  totalDataValue.totalEleValue += ManyDayResultObj.EleCInt[i]
  totalDataValue.totalHotValue += ManyDayResultObj.HotCInt[i]
  totalDataValue.totalDrugValue += ManyDayResultObj.MatCMci[i]
  totalDataValue.totalIntCValue += ManyDayResultObj.IntC[i]//7
  totalDataValue.totalIndCIntValue += ManyDayResultObj.IndCInt[i]//12
  totalDataValue.totalCIntValue += ManyDayResultObj.CInt[i]//13
  totalDataValue.totalQrbiValue += ManyDayResultObj.Qrbi[i]//进水量
}


// 获取dom元素
const CIntRef = ref(null)
const cakeRef = ref(null)
console.log(ManyDayResultObj.CInt, 'ManyDayResultObj.CIntsdfasdfgagwaergwaergrwEGWRe');
console.log(totalDataValue.totalCIntValue, 'totalDataValue.totalCIntValue += ManyDayResultObj.CInt[i]//13');

// 折线图
onMounted(() => {
  const CIntDom = CIntRef.value
  const CIntChart = echarts.init(CIntDom)
  // 图标的具体信息
  const option = {
    title: {
      text: '项目碳排放变化',
      top: '5%',
      left: '5%'
    },
    xAxis: {
      type: 'category',
      data: ManyDate
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: ManyDayResultObj.CInt,
        type: 'line'
      }
    ]
  };
  option && CIntChart.setOption(option)
})

// 饼图
onMounted(() => {
  const cakeDom = cakeRef.value
  const cakeChart = echarts.init(cakeDom)
  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '3%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '60%'], //往下一点
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: totalDataValue.totalN2OValue * 265, name: 'N20排放当量' },
          { value: totalDataValue.totalCH4Value * 28, name: '甲烷排放当量' },
          { value: totalDataValue.totalCO2Value, name: '二氧化碳排放量' },
          { value: totalDataValue.totalEleValue, name: '电耗排放当量' },
          { value: totalDataValue.totalHotValue, name: '热耗排放当量' },
          { value: totalDataValue.totalDrugValue, name: '药耗排放当量' }
        ]
      }
    ]
  }
  option && cakeChart.setOption(option)
})

console.log(ManyDayResultObj.CInt, '123213eqrsdfsdfsdggr');

const toChangeData = () => {
  dialogFormVisible.value = true
  // router.push('/changedata')
}
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
  userId: '',
  password: ''
})

const confirmLogin = () => {
  console.log('confirm');
  requests({
    url: '/api/login',
    method: 'post',
    data: {
      userId: form.userId,
      password: form.password
    }
  }).then((res) => {
    console.log('res', res);
    if (res == 1) {
      ElMessage.success('登录成功')
      dialogFormVisible.value = false
      router.push('./changedata')
    } else {
      ElMessage({
        message: '账号/密码错误',
        type: 'error'
      })
    }
  }).catch((err) => {
    console.log(err, 'err');
  })
}
const cancelLogin = () => {
  dialogFormVisible.value = false

}

</script>
<template>
  <div className="
            bg-white
            border-b-2
            border-gray-300
            p-4
            font-bold
            text-2xl
            text-center
            top-0
            z-10
        ">
    污水处理厂低碳运行评价技术规范

  </div>
  <div class="flex flex-col mt-[20px] h-[90vh]">
    <div class="flex justify-around mt-[50px] flex-1">
      <!-- 数据总览 -->
      <div class="flex flex-col rounded-lg flex-1 mr-10 ml-16 shadow-md">
        <div class="flex ml-4 mt-4 ">
          <div class="w-[3px] h-[18px] bg-sky-500 rounded-md mr-4 mt-1"></div>
          <div>数据总览</div>
        </div>
        <div class="flex flex-row flex-wrap mt-3 ml-4 flex-1">
          <div class="flex w-1/2 h-[60px]">
            <svg class="icon svg-icon h-8 w-8" aria-hidden="true">
              <use xlink:href="#icon-a-shipinduomeiti"></use>
            </svg>
            <div class="flex flex-col ml-5">
              <div>直接碳排放当量：</div>
              <div class="text-2xl font-bold">{{ (totalDataValue.totalIntCValue *
                totalDataValue.totalQrbiValue).toFixed(2) }}
              </div>
            </div>
          </div>
          <div class="flex w-1/2 h-[60px]">
            <svg class="icon svg-icon h-8 w-8" aria-hidden="true">
              <use xlink:href="#icon-a-shipinduomeiti"></use>
            </svg>
            <div class="flex flex-col ml-5">
              <div>间接碳排放总量：</div>
              <div class="text-2xl font-bold">{{ (totalDataValue.totalIndCIntValue *
                totalDataValue.totalQrbiValue).toFixed(2) }}
              </div>
            </div>
          </div>
          <div class="flex w-1/2 h-[60px]">
            <svg class="icon svg-icon h-8 w-8" aria-hidden="true">
              <use xlink:href="#icon-a-shipinduomeiti"></use>
            </svg>
            <div class="flex flex-col ml-5">
              <div>总碳排放量：</div>
              <div class="text-2xl font-bold">{{ (totalDataValue.totalCIntValue *
                totalDataValue.totalQrbiValue).toFixed(2) }}
              </div>
            </div>
          </div>
          <div class="flex w-1/2 h-[60px]">
            <svg class="icon svg-icon h-8 w-8" aria-hidden="true">
              <use xlink:href="#icon-a-shipinduomeiti"></use>
            </svg>
            <div class="flex flex-col ml-5">
              <div>直接碳排放强度：</div>
              <div class="text-2xl font-bold">{{ Number(totalDataValue.totalIntCValue / (ManyDayResultObj.N2O.length ===
                0 ? 1 : ManyDayResultObj.N2O.length)).toFixed(2)
                }}</div>
            </div>
          </div>
          <div class="flex w-1/2 h-[60px]">
            <svg class="icon svg-icon h-8 w-8" aria-hidden="true">
              <use xlink:href="#icon-a-shipinduomeiti"></use>
            </svg>
            <div class="flex flex-col ml-5">
              <div>间接碳排放强度：</div>
              <div class="text-2xl font-bold">{{ (totalDataValue.totalIndCIntValue / (ManyDayResultObj.N2O.length === 0 ?
                1 : ManyDayResultObj.N2O.length)).toFixed(2) }}</div>
            </div>
          </div>
          <div class="flex w-1/2 h-[60px]">
            <svg class="icon svg-icon h-8 w-8" aria-hidden="true">
              <use xlink:href="#icon-a-shipinduomeiti"></use>
            </svg>
            <div class="flex flex-col ml-5">
              <div>总碳排放强度：</div>
              <div class="text-2xl font-bold">{{ (totalDataValue.totalCIntValue / (ManyDayResultObj.N2O.length === 0 ? 1
                : ManyDayResultObj.N2O.length)).toFixed(2) }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 饼图 -->
      <div class="flex-1 rounded-lg  mx-2 shadow-md" ref="cakeRef"></div>
      <!-- 折线图 -->
      <div class="flex-1 rounded-lg  ml-10 mr-16 shadow-md" ref="CIntRef" v-show="ManyDayResultObj.CInt.length >= 2">
      </div>
      <div class="flex-1 rounded-lg  ml-10 mr-16 shadow-md" v-show="ManyDayResultObj.CInt.length < 2">
        <div class="flex flex-col items-center mt-10 h-1/2">
          <!-- <p class="text-xl font-bold">数据不足连成折线</p> -->
          <div class="text-4xl font-bold flex-1">CInt的值为：</div>
          <div class="text-2xl flex-1">{{ ManyDayResultObj.CInt[0] && ManyDayResultObj.CInt[0].toFixed(2) }}</div>
        </div>
      </div>
    </div>




    <div class=" flex justify-around mt-[50px] flex-1">
      <!-- 评价结果 -->
      <div class="flex-1 flex rounded-lg flex-col mr-10 ml-16 shadow-md">
        <div class="flex ml-4 mt-4">
          <div class="w-[3px] h-[18px] bg-sky-500 rounded-md mr-4 mt-1"></div>
          <div>评价结果</div>
        </div>
        <div class="flex flex-1 flex-wrap justify-between ml-6">
          <div class="w-1/2 mb-2">
            <div class="text-gray-600">评价碳排放强度:</div>
            <div class="text-2xl font-bold">
              {{ (ManyDayResultObj.EvaCI[0] === undefined
                || ManyDayResultObj.EvaCI[0] === null) ? '未评分' :
                Number(ManyDayResultObj.EvaCI[0]).toFixed(2) }}
            </div>
          </div>
          <div class="w-1/2 mb-2">
            <div class="text-gray-600">评价碳排放得分:</div>
            <div class="text-2xl font-bold">
              {{ (ManyDayResultObj.EvaCIScore[0] === undefined
                || ManyDayResultObj.EvaCIScore[0] === null) ? '未评分' :
                Number(ManyDayResultObj.EvaCIScore[0]).toFixed(2) }}
            </div>
          </div>
          <div class="w-1/2 mb-2">
            <div class="text-gray-600">低碳鼓励行为总分:</div>
            <div class="text-2xl font-bold">
              {{ (ManyDayResultObj.LowCScore[0] ===
                undefined || ManyDayResultObj.LowCScore[0] === null) ? '未评分' :
                Number(ManyDayResultObj.LowCScore[0]).toFixed(2) }}
            </div>
          </div>
          <div class="w-1/2 mb-2">
            <div class="text-gray-600">加权总得分:</div>
            <div class="text-2xl font-bold">
              {{ (ManyDayResultObj.LowCTotalScore[0] ===
                undefined || ManyDayResultObj.LowCTotalScore[0] === null) ? '未评分' :
                Number(ManyDayResultObj.LowCTotalScore[0]).toFixed(2) }}
            </div>
          </div>
          <div class="w-full mb-2">
            <div class="text-gray-600">属于第几级:</div>
            <div class="text-2xl font-bold">
              {{ (ManyDayResultObj.Level[0] === undefined
                || ManyDayResultObj.Level[0] === null) ? '未评级' :
                ManyDayResultObj.Level[0]
              }}
            </div>
          </div>
        </div>
      </div>
      <!-- 动态 -->
      <div class="flex-1 rounded-lg  mx-2 shadow-md">
        <div class="flex ml-4 mt-4">
          <div class="w-[3px] h-[18px] bg-sky-500 rounded-md mr-4 mt-1"></div>
          <div>动态</div>
        </div>
        <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
          <el-table-column prop="name" label="Name" width="80" />
          <el-table-column prop="date" label="Date" width="80" />
          <el-table-column prop="address" label="Address" />
        </el-table>
      </div>
      <!-- 快速操作 -->
      <div class="flex-1 rounded-lg  ml-10 mr-16 shadow-md">
        <div class="flex ml-4 mt-4">
          <div class="w-[3px] h-[18px] bg-sky-500 rounded-md mr-4 mt-1"></div>
          <div>快速操作</div>
        </div>
        <div class="flex justify-around mt-[50px]">
          <div class="flex flex-col h-[100px] cursor-pointer" @click="toSelect">
            <svg class="icon svg-icon h-14 w-14" aria-hidden="true">
              <use xlink:href="#icon-a-duankouduomeiti"></use>
            </svg>
            <div>回到首页</div>
          </div>
          <div class="flex flex-col h-[100px] cursor-pointer" @click="toInputStandard">
            <svg class="icon svg-icon h-14 w-14" aria-hidden="true">
              <use xlink:href="#icon-a-vrxunixianshiduomeiti"></use>
            </svg>
            <div>快速录入</div>
          </div>
          <div class="flex flex-col h-[100px] cursor-pointer" @click="toChangeData">
            <svg class="icon svg-icon h-14 w-14" aria-hidden="true">
              <use xlink:href="#icon-a-sduanziduankouduomeiti"></use>
            </svg>
            <div>修改数据</div>
          </div>
        </div>

        <el-dialog v-model="dialogFormVisible" title="请先登录" width="500">
          <el-form :model="form">
            <el-form-item label="账号" :label-width="formLabelWidth">
              <el-input v-model="form.userId" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
              <el-input v-model="form.password" autocomplete="off" type="password" />
            </el-form-item>
          </el-form>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="cancelLogin">取消</el-button>
              <el-button type="primary" @click="confirmLogin">
                确定
              </el-button>
            </div>
          </template>
        </el-dialog>

      </div>
    </div>
  </div>
</template>

<style></style>
