<script setup>
import router from '@/router';
import { ref, reactive, onUpdated, watch } from 'vue'
import { useCounterStore } from '@/stores/counter';
import InputComponents from '@/components/InputFingerpostComponents.vue'
const counter = useCounterStore()
import { nextTick } from 'vue';


// 跳转到首页
const toSelect = () => {
    console.log('到首页');
    router.push('/')
}

//跳转到展示页面的路由
const toShowFingerpost = () => {
    inputComponentsRef.value.toShowFingerpost()

}


// 选择哪一天
const ifDay = ref(true)
const ifMonth = ref(false)
const ifYear = ref(false)
// 当前日/月/年
const nowDay = ref('')

// 第i天/月/年
const iData = ref('天')


const handleIfDay = () => {
    ifMonth.value = false;
    ifYear.value = false;
    ifDay.value = true;
    iData.value = '天'
}
const handleIfMonth = () => {
    ifDay.value = false;
    ifYear.value = false;
    ifMonth.value = true;
    iData.value = '月'
}
const handleIfYear = () => {
    ifDay.value = false;
    ifMonth.value = false;
    ifYear.value = true;
    iData.value = '年'
}

const change = () => {
    inputComponentsRef.value.pushAllResult()
    counter.ifShow = false
    nextTick(() => {
        counter.ifShow = true
    })
}
const inputComponentsRef = ref(null)
</script>

<template>
    <div>

        <!-- 标题 -->
        <div className=" bg-white border-b-2 border-gray-300 p-4 font-bold text-2xl text-center sticky top-0 z-10">
            城镇污水处理厂污染物去除协同控制温室气体核算技术指南（试行）
        </div>
        <div class="flex justify-around mt-8">
            <!-- 选择年/月/日 -->
            <el-card style="width: 250px" shadow="hover">
                <div class="flex justify-around">
                    <el-button @click="handleIfYear" :style="{ backgroundColor: ifYear ? 'skyblue' : '' }">年</el-button>
                    <el-button @click="handleIfMonth"
                        :style="{ backgroundColor: ifMonth ? 'skyblue' : '' }">月</el-button>
                    <el-button @click="handleIfDay" :style="{ backgroundColor: ifDay ? 'skyblue' : '' }">日</el-button>
                </div>
            </el-card>
            <!-- 选择日期范围 -->
            <el-card style="width: 280px" shadow="hover">
                <div class="flex justify-center">
                    <div v-if="ifDay">
                        <el-date-picker v-model="nowDay" type="date" placeholder="Pick a day" format="YYYY/MM/DD"
                            value-format="YYYY-MM-DD" @change="change">
                        </el-date-picker>
                    </div>
                    <div class="block" v-else-if="ifMonth">
                        <el-date-picker v-model="nowDay" type="month" placeholder="Pick a month" format="YYYY/MM"
                            value-format="YYYY-MM" @change="change">
                        </el-date-picker>
                    </div>
                    <div class="block" v-else-if="ifYear">
                        <el-date-picker v-model="nowDay" type="year" placeholder="Pick a year" format="YYYY"
                            value-format="YYYY" @change="change">
                        </el-date-picker>
                    </div>
                </div>
            </el-card>

        </div>



        <!-- 输入框 -->
        <InputComponents ref="inputComponentsRef" :data="nowDay" :iData="iData" v-if="counter.ifShow" />
        <!-- 分页 :page-size='counter.daysDiff'是每一页的数量  ：total则是总的数量 -->
        <!-- @current-change 事件会在当前页码变化时触发，handleCurrentChange 是一个在 Vue 组件中的方法，用来处理页码变化时的逻辑。例如，当用户点击下一页时，这个方法会被调用。 -->
        <!-- 
              <div>
                     <el-pagination size="small" background layout="prev, pager, next" :page-size='counter.daysDiff'
                            :total='counter.daysDiff * counter.daysDiff' class="mt-4"
                            @current-change="handleCurrentChange" />
              </div> -->
        <!-- 确认框 -->
        <div class="flex justify-center mb-5">
            <el-button type="primary"
                class="px-6 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                @click="toSelect">
                回到首页
            </el-button>
            <el-button type="primary"
                class="px-6 py-2  rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                @click="toShowFingerpost">
                确认
            </el-button>
        </div>
    </div>

</template>
