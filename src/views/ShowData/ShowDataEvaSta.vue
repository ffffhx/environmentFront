<script setup>
import * as echarts from 'echarts';
import { onMounted, reactive } from 'vue';
import { useCounterStore } from '@/stores/counter';
import { ref } from 'vue'
const counter = useCounterStore()


//存放OnDayResult的对象
const valueObj =
{
    N2O: [],
    N2OCInt: [],
    CH4: [],
    CH4CInt: [],
    CO2: [],
    CO2Int: [],
    IntC: [],
    EleCInt: [],
    HotCInt: [],
    MatCMci: [],
    MatCInt: [],
    IndCInt: [],
    CInt: [],
    TotNRemRat: [],
    TreScaRat: [],
    OxyPolRem: [],
    WaterOutRat: [],
    OxyConRat: [],
    DirCIRat: [],
    UndCIRat: [],
    EvaCI: [],
    EvaCIScore: [],
    LowCScore: [],
    LowCTotalScore: [],
    Level: []
}


//存放日期的数组
let keyArr = []

//将数据从map中用循环的方式取出  一个key对应一个value   一个key就是一个日期  一个value就是OneDayResult，是一个对象
counter.mapStandard.forEach((value, key) => {
    console.log(key, value, 'key, value');
    // for循环的方式
    for (const item in value) {
        console.log(item, 'item');
        // 当动态的访问属性名的时候需要使用方括号
        // console.log(valueObj[item], 'valueObj.item');
        valueObj[item].push(value[item])
        console.log(valueObj, 'valueObj');
    }
    keyArr.push(key)//日期
    // console.log(`${key}: ${value.N2O} ${value.N2OCInt}`);
    // valueN2OArr.push(value.N2O)//值
    // valueN2OCIntArr.push(value.N2OCInt)
    // valueObj.value
});

const N2ORef = ref(null)
const CH4Ref = ref(null)
const CO2Ref = ref(null)

const refs = [
    N2ORef,//里面是一个dom元素
    CH4Ref,
    CO2Ref
]
// 用于存放dom元素的数组
const Doms = []
// 用于存放echarts实例的数组
const charts = []
// 用于存放echarts图表具体信息的数组
const Options = []

onMounted(() => {

    // 图标的具体信息
    Options[0] = {
        title: {
            text: 'N2O直接排放量'
        },
        xAxis: {
            type: 'category',
            data: keyArr
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: valueObj.N2O,
                type: 'line'
            }
        ]
    };

    // 循环创建图表
    refs.forEach((ref, index) => {
        Doms[index] = ref.value
        charts[index] = echarts.init(Doms[index]);
        Options[index] && charts[index].setOption(Options[index])
    })


    // Object.keys返回一个对象的所有键组成的数组
    // Object.keys(Options).forEach((key, index) => {



    //当且仅当OptionN2O存在且为真值的时候才执行后面的代码
    // setOption 方法非常强大，接受一个对象作为参数，允许你完全控制图表的外观和行为。
    // ChartN2O.setOption(OptionN2O);
    // ChartCH4.setOption(OptionCH4);
})

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
        城镇污水处理厂碳减排评估标准

    </div>
    <div class="flex flex-col mt-[20px]">
        <!-- 第一行 -->
        <div class="flex justify-around">
            <div style="width: 400px; height: 400px;" ref="N2ORef"></div>
            <div style="width: 400px; height: 400px;" ref="CH4Ref"></div>
            <div style="width: 400px; height: 400px;" ref="CO2Ref"></div>
        </div>
        <!-- 第二行 -->
        <!-- <div class="flex justify-around">
      <divstyle="width: 400px; height: 400px;"></div>
      <div id="bb" style="width: 400px; height: 400px;"></div>
      <div id="cc" style="width: 400px; height: 400px;"></div>
    </div> -->
    </div>
    <!-- 确认框 -->
    <div class="flex justify-center mt-10">
        <el-button type="primary"
            class="px-6 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            @click="$router.push('/')">
            回到首页
        </el-button>

    </div>
</template>

<style></style>
