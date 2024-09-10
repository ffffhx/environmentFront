<script setup>
import router from '@/router';
const toInputStandard = () => {
    router.push('/inputstandard')
}
const toInputEvaSta = () => {
    router.push('/inputevasta')
}
const toInputFingerpost = () => {
    router.push('/inputfingerpost')
}
// localStorage.setItem('test', 'test')
// sessionStorage.setItem('test', 'test')
const test = 1.2222
// console.log(test.toFixed(2), 'test');

</script>

<template>
    <div>
        <div className="
            bg-white
            border-b-2
            border-gray-300
            p-4
            font-bold
            text-2xl
            text-center
            sticky
            top-0
            z-10
        ">
            标题{{ test.toFixed(2) }}
        </div>
        <div class="flex justify-around mt-4">
            <el-card style="width: 480px" shadow="hover">
                <div class="text-center font-bold text-lg cursor-pointer" @click="toInputStandard">
                    污水处理厂低碳运行评价技术规范
                </div>
            </el-card>
            <el-card style="width: 480px" shadow="hover">
                <div class="text-center font-bold text-lg cursor-pointer" @click="toInputEvaSta">
                    城镇污水处理厂污染物去除协同控制温室气体核算技术指南（试行）
                </div>
            </el-card>
            <el-card style="width: 480px" shadow="hover">
                <div class="text-center font-bold text-lg cursor-pointer" @click="toInputFingerpost">
                    城镇污水处理厂碳减排评估标准
                </div>
            </el-card>
        </div>
    </div>

</template>
