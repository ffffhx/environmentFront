<script setup>
import router from '@/router';
import { useCounterStore } from '@/stores/counter';
import { reactive, defineProps, watch, defineExpose, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
const counter = useCounterStore()

const props = defineProps({
    data: String,
    iData: String
})
console.log('counter.ifShow', counter.ifShow);

//每{{iData}}的结果



// CH4回收量
const CH4Rec = reactive({
    WCH4: null,// ——城镇污水处理厂 CH4年回收量，t/a；
    RCH4: null// ——城镇污水处理厂城镇污水处理过程中年回收的 CH4体积，m3/a；
})


//COD 和 TN 去除量
const CODTNRem = reactive({
    Rj: null,
    j: null,
    Q: null,
    Pinj: null,
    Poutj: null,
})


// 污泥处理量
const SludDis = reactive({
    SR: null,
    SG: null,
    SE: null,
    Wa: null,
    EFs: null,
    D: null,
})



// 回收甲烷（CH4）产生的温室气体减排量
const CH4RecPro = reactive({
    E1: null,
    WCH4: null,
    GWPCH4: 21,
})


//去除 COD 产生的温室气体排放量
const CODRemPro = reactive({
    E2: null,
    RCOD: null,
    SG: null,
    Ps: null,
    WCH4: null,
    EFCH4: null,
    GWPCH4: 21,
    MCF: null,
    B0: null
})


//  ——CH4 排放因子，t CH4/t COD；
// const EFCH4 = reactive({
//     EFCH4: null,
//     MCF: null,
//     B0: null
// })



//  处理污泥产生的温室气体排放量
const HandleSludPro = reactive({
    E3: null,
    SR: null,
    Bs: null,
    DOCf: null,
    MCF: null,
    F: null,
    CCH4: null
})


// 去除 TN 产生的 N2O 排放量
const TNRemProN2O = reactive({
    E4: null,
    RTN: null,
    EFN2O: null,
    CN2O: 44 / 28,
    GWPCO2: 310,
})


// 城镇污水处理消耗电力产生的 CO2排放量
const EleCO2Pro = reactive({
    E5: null,
    EH: null,
    EFCO2: null,
    GWPCO2: 1,
})


// 温室气体净减排总量
const TotRemCO2 = reactive({
    Eg: null,
    E1: null,
    E2: null,
    E3: null,
    E4: null,
    E5: null
})





// CH4回收量的计算
watch(
    () => [CH4Rec],
    ([newCH4Rec]) => {
        CH4Rec.WCH4 = newCH4Rec.RCH4 * 0.717 * 0.001
        console.log('CH4Rec.WCH4', CH4Rec.WCH4);
    }, {
    deep: true
}
)



// COD 和 TN 去除量的计算
watch(
    () => [CODTNRem],
    ([newCODTNRem]) => {
        CODTNRem.Rj = newCODTNRem.Q * (newCODTNRem.Pinj - newCODTNRem.Poutj) * 1e-6
        console.log('CODTNRem.Rj', CODTNRem.Rj);
    },
    { deep: true }
)


// 污泥处理量
watch(
    () => [SludDis],
    ([newSludDis]) => {
        SludDis.SR = newSludDis.SG - newSludDis.SE;
        SludDis.SG = newSludDis.Wa * newSludDis.EFs * newSludDis.D * 1e-4
        console.log('SludDis.SR', SludDis.SR);
        console.log('SludDis.SG', SludDis.SG);

    },
    { deep: true }
)


// 回收甲烷（CH4）产生的温室气体减排量
watch(
    () => [CH4Rec],
    ([]) => {
        CH4RecPro.E1 = CH4Rec.WCH4 * CH4RecPro.GWPCH4
        console.log(CH4RecPro.E1, 'CH4RecPro.E1');
    },
    { deep: true }
)


// 去除 COD 产生的温室气体排放量
watch(
    () => [CODRemPro],
    ([newCODRemPro]) => {
        CODRemPro.EFCH4 = newCODRemPro.MCF * newCODRemPro.B0
        console.log(CODRemPro.EFCH4, 'CODRemPro.EFCH4');
        CODRemPro.E2 = ((newCODRemPro.RCOD - newCODRemPro.SG * newCODRemPro.Ps) * CODRemPro.EFCH4 - CH4Rec.WCH4) * newCODRemPro.GWPCH4
        console.log(CODRemPro.E2, 'CODRemPro.E2');

    },
    { deep: true }
)


// 处理污泥产生的温室气体排放量
watch(
    () => [HandleSludPro],
    ([newHandleSludPro]) => {
        HandleSludPro.E3 = newHandleSludPro.SR * newHandleSludPro.Bs * newHandleSludPro.DOCf * newHandleSludPro.MCF * newHandleSludPro.F * newHandleSludPro.CCH4 * newHandleSludPro.GWPCO2
        console.log(HandleSludPro.E3, 'HandleSludPro.E3');
    },
    { deep: true }
)


// 去除 TN 产生的 N2O 排放量
watch(
    () => [TNRemProN2O],
    ([newTNRemProN2O]) => {
        TNRemProN2O.E4 = newTNRemProN2O.RTN * newTNRemProN2O.EFN2O * newTNRemProN2O.CN2O * newTNRemProN2O.GWPCO2
        console.log(TNRemProN2O.E4, 'TNRemProN2O.E4');

    },
    { deep: true }
)



// 城镇污水处理消耗电力产生的 CO2排放量
watch(
    () => [EleCO2Pro],
    ([newEleCO2Pro]) => {
        EleCO2Pro.E5 = newEleCO2Pro.EH * newEleCO2Pro.EFCO2 * newEleCO2Pro.GWPCO2

    },
    { deep: true }
)



// 温室气体净减排总量
watch(
    () => [TotRemCO2],
    ([newTotRemCO2]) => {
        TotRemCO2.Eg = newTotRemCO2.E1 + newTotRemCO2.E2 + newTotRemCO2.E3 + newTotRemCO2.E4 + newTotRemCO2.E5

    },
    { deep: true }
)





const CH4RecRef = ref(null)
const CODTNRemRef = ref(null)
const SludDisRef = ref(null)
const CH4RecProRef = ref(null)
const CODRemProRef = ref(null)
const HandleSludProRef = ref(null)
const TNRemProN2ORef = ref(null)
const EleCO2ProRef = ref(null)
const TotRemCO2Ref = ref(null)

























const oneDayResult = reactive({})
const pushAllResult = () => {
    oneDayResult.N2O = N2O.mN2Oi
    oneDayResult.N2OCInt = N2OCInt.EN2O
    oneDayResult.CH4 = CH4.mCH4i
    oneDayResult.CH4CInt = CH4CInt.ECH4
    oneDayResult.CO2 = CO2.mCO2i
    oneDayResult.CO2Int = CO2Int.ECO2
    oneDayResult.IntC = IntC.Ed
    oneDayResult.EleCInt = EleCInt.Ee
    oneDayResult.HotCInt = HotCInt.Eh
    oneDayResult.MatCMci = MatCMci.Mci  //物耗碳排放量
    oneDayResult.MatCInt = MatCInt.Ec   //物耗碳排放强度
    oneDayResult.IndCInt = IndCInt.Ei
    oneDayResult.CInt = CInt.Ef
    oneDayResult.TotNRemRat = TotNRemRat.k1
    oneDayResult.TreScaRat = TreScaRat.k2
    oneDayResult.OxyPolRem = OxyPolRem.k3
    oneDayResult.WaterOutRat = WaterOutRat.k4
    oneDayResult.OxyConRat = OxyConRat.k5
    oneDayResult.DirCIRat = DirCIRat.Edc
    oneDayResult.UndCIRat = UndCIRat.Eic
    oneDayResult.EvaCI = EvaCI.Ep
    oneDayResult.EvaCIScore = EvaCIScore.F1
    oneDayResult.LowCScore = LowCScore.F2
    oneDayResult.LowCTotalScore = LowCTotalScore.F
    oneDayResult.Level = Level.Level


    counter.mapFingerpost.set(props.data, oneDayResult)
    console.log('counter.mapFingerpost', counter.mapFingerpost);
    ElMessage('如需继续输入请选择新的日期，如果输入完毕，请点击确认按钮')
}

const toShowFingerpost = () => {
    console.log('执行了');

    // const refs = [
    //     N2ORef,
    //     CH4Ref,
    //     EleCIntRef,
    //     HotCIntRef,
    //     McgMRef,
    //     McgConRef,
    //     TreScaRatRef,
    //     OxyPolRemRef,
    //     WaterOutRatRef,
    //     OxyConRatRef,
    //     LowCStyleRef,
    //     NaClORef
    // ]

    // refs.map是一个数组方法，用于创建一个新数组

    // const validateAll = async () => {
    //     const promises = refs.map(ref => ref.value.validate())
    //     const results = await Promise.all(promises)
    //     const isAllValid = results.every(valid => valid)
    //     if (!isAllValid) {
    //         console.log('error submit!!');
    //         return
    //     } else {
    //         pushAllResult()
    //         router.push('/show')
    //     }
    // }
    // validateAll()
    pushAllResult()
    router.push('/showstandard')
}


defineExpose({ pushAllResult, toShowFingerpost })








</script>
<template>
    <div class="flex flex-col">
        <!-- CH4回收量 -->
        <div class="mt-10">
            <p style="font-weight: bold; font-size: 20px; color: black;">CH4回收量</p>
            <el-form :model="CH4Rec" class="flex flex-start flex-wrap gap-4 mt-3" ref="CH4RecRef">
                <div class="flex">
                    <div class="w-[180px]">WCH4 ——城镇污水处理厂 CH4年回收量，t/a；<sup>3</sup></div>
                    <el-form-item prop="WCH4" :rules="[{ required: true, message: 'WCH4 is required' }]">
                        <el-input v-model="CH4Rec.WCH4" style="width: 300px; height:50px;" placeholder="WCH4" />
                    </el-form-item>
                </div>
                <div class="flex">
                    <div class="w-[180px]">RCH4 ——城镇污水处理厂城镇污水处理过程中年回收的 CH4体积，m3/a；</div>
                    <el-form-item prop="RCH4" :rules="[{ required: true, message: 'RCH4 is required' }]">
                        <el-input v-model="CH4Rec.RCH4" style="width: 300px; height:50px;" placeholder="RCH4" />
                    </el-form-item>
                </div>
            </el-form>
        </div>



        <!-- COD 和 TN 去除量 -->
        <div class="mt-10">
            <p style="font-weight: bold; font-size: 20px; color: black;">COD 和 TN 去除量</p>
            <el-form :model="CODTNRem" class="flex flex-start flex-wrap gap-4 mt-3" ref="CODTNRemRef">
                <div class="flex">
                    <div class="w-[180px]">Q 为城镇污水处理厂污水年处理量，m3/a；</div>
                    <el-form-item prop="j" :rules="[{ required: true, message: 'j is required' }]">
                        <el-input v-model="CODTNRem.j" style="width: 300px; height:50px;" placeholder="j" />
                    </el-form-item>
                </div>
                <div class="flex">
                    <div class="w-[180px]">Pinj 为入厂城镇污水中污染物 j 的年均浓度，g/m3；</div>
                    <el-form-item prop="Q" :rules="[{ required: true, message: 'Q is required' }]">
                        <el-input v-model="CODTNRem.Q" style="width: 300px; height:50px;" placeholder="Q" />
                    </el-form-item>
                </div>
                <div class="flex">
                    <div class="w-[180px]"> Poutj 为出厂城镇污水中污染物 j 的年均浓度，g/m3；</div>
                    <el-form-item prop="Pinj" :rules="[{ required: true, message: 'Pinj is required' }]">
                        <el-input v-model="CODTNRem.Pinj" style="width: 300px; height:50px;" placeholder="Pinj" />
                    </el-form-item>
                </div>
                <div class="flex">
                    <div class="w-[180px]">j 为水污染物 COD 和 TN；</div>
                    <el-form-item prop="Poutj" :rules="[{ required: true, message: 'Poutj is required' }]">
                        <el-input v-model="CODTNRem.Poutj" style="width: 300px; height:50px;" placeholder="Poutj" />
                    </el-form-item>
                </div>
            </el-form>
        </div>


        <!-- 污泥处理量 -->
        <div class="mt-10">
            <p style="font-weight: bold; font-size: 20px; color: black;">污泥处理量</p>
            <el-form :model="SludDis" class="flex flex-start flex-wrap gap-4 mt-3" ref="SludDisRef">
                <div class="flex">
                    <div class="w-[180px]">Q 为城镇污水处理厂污水年处理量，m3/a；</div>
                    <el-form-item prop="SG" :rules="[{ required: true, message: 'SG is required' }]">
                        <el-input v-model="SludDis.SG" style="width: 300px; height:50px;" placeholder="SG" />
                    </el-form-item>
                </div>
                <div class="flex">
                    <div class="w-[180px]">Pinj 为入厂城镇污水中污染物 j 的年均浓度，g/m3；</div>
                    <el-form-item prop="SE" :rules="[{ required: true, message: 'SE is required' }]">
                        <el-input v-model="SludDis.SE" style="width: 300px; height:50px;" placeholder="SE" />
                    </el-form-item>
                </div>
                <div class="flex">
                    <div class="w-[180px]"> Poutj 为出厂城镇污水中污染物 j 的年均浓度，g/m3；</div>
                    <el-form-item prop="Wa" :rules="[{ required: true, message: 'Wa is required' }]">
                        <el-input v-model="SludDis.Wa" style="width: 300px; height:50px;" placeholder="Wa" />
                    </el-form-item>
                </div>
                <div class="flex">
                    <div class="w-[180px]">j 为水污染物 COD 和 TN；</div>
                    <el-form-item prop="EFs" :rules="[{ required: true, message: 'EFs is required' }]">
                        <el-input v-model="SludDis.EFs" style="width: 300px; height:50px;" placeholder="EFs" />
                    </el-form-item>
                </div>
                <div class="flex">
                    <div class="w-[180px]">j 为水污染物 COD 和 TN；</div>
                    <el-form-item prop="D" :rules="[{ required: true, message: 'D is required' }]">
                        <el-input v-model="SludDis.D" style="width: 300px; height:50px;" placeholder="D" />
                    </el-form-item>
                </div>
            </el-form>
        </div>



        <!-- 回收甲烷（CH4）产生的温室气体减排量 -->
        <div class="mt-10">
            <p style="font-weight: bold; font-size: 20px; color: black;">回收甲烷（CH4）产生的温室气体减排量</p>
            <el-form :model="CH4RecPro" class="flex flex-start flex-wrap gap-4 mt-3" ref="CH4RecProRef">
                <div class="flex">
                    <div class="w-[180px]">Q 为城镇污水处理厂污水年处理量，m3/a；</div>
                    <el-form-item prop="WCH4" :rules="[{ required: true, message: 'WCH4 is required' }]">
                        <el-input v-model="CH4RecPro.WCH4" style="width: 300px; height:50px;" placeholder="WCH4" />
                    </el-form-item>
                </div>
                <div class="flex">
                    <div class="w-[180px]">Pinj 为入厂城镇污水中污染物 j 的年均浓度，g/m3；</div>
                    <el-form-item prop="GWPCH4" :rules="[{ required: true, message: 'GWPCH4 is required' }]">
                        <el-input v-model="CH4RecPro.GWPCH4" style="width: 300px; height:50px;" placeholder="GWPCH4" />
                    </el-form-item>
                </div>
            </el-form>
        </div>





        <!-- 去除 COD 产生的温室气体排放量 -->
        <div class="mt-10">
            <p style="font-weight: bold; font-size: 20px; color: black;">去除 COD 产生的温室气体排放量</p>
            <el-form :model="CODRemPro" class="flex flex-start flex-wrap gap-4 mt-3" ref="CODRemProRef">
                <div class="flex">
                    <div class="w-[180px]">Q 为城镇污水处理厂污水年处理量，m3/a；</div>
                    <el-form-item prop="RCOD" :rules="[{ required: true, message: 'RCOD is required' }]">
                        <el-input v-model="CODRemPro.RCOD" style="width: 300px; height:50px;" placeholder="RCOD" />
                    </el-form-item>
                </div>
                <div class="flex">
                    <div class="w-[180px]">Pinj 为入厂城镇污水中污染物 j 的年均浓度，g/m3；</div>
                    <el-form-item prop="SG" :rules="[{ required: true, message: 'SG is required' }]">
                        <el-input v-model="CODRemPro.SG" style="width: 300px; height:50px;" placeholder="SG" />
                    </el-form-item>
                </div>
                <div class="flex">
                    <div class="w-[180px]"> Poutj 为出厂城镇污水中污染物 j 的年均浓度，g/m3；</div>
                    <el-form-item prop="Ps" :rules="[{ required: true, message: 'Ps is required' }]">
                        <el-input v-model="CODRemPro.Ps" style="width: 300px; height:50px;" placeholder="Ps" />
                    </el-form-item>
                </div>
                <div class="flex">
                    <div class="w-[180px]">j 为水污染物 COD 和 TN；</div>
                    <el-form-item prop="WCH4" :rules="[{ required: true, message: 'WCH4 is required' }]">
                        <el-input v-model="CODRemPro.WCH4" style="width: 300px; height:50px;" placeholder="WCH4" />
                    </el-form-item>
                </div>
                <div class="flex">
                    <div class="w-[180px]">j 为水污染物 COD 和 TN；</div>
                    <el-form-item prop="EFCH4" :rules="[{ required: true, message: 'EFCH4 is required' }]">
                        <el-input v-model="CODRemPro.EFCH4" style="width: 300px; height:50px;" placeholder="EFCH4" />
                    </el-form-item>
                </div>
                <div class="flex">
                    <div class="w-[180px]">j 为水污染物 COD 和 TN；</div>
                    <el-form-item prop="GWPCH4" :rules="[{ required: true, message: 'GWPCH4 is required' }]">
                        <el-input v-model="CODRemPro.GWPCH4" style="width: 300px; height:50px;" placeholder="GWPCH4" />
                    </el-form-item>
                </div>
                <div class="flex">
                    <div class="w-[180px]">j 为水污染物 COD 和 TN；</div>
                    <el-form-item prop="MCF" :rules="[{ required: true, message: 'MCF is required' }]">
                        <el-input v-model="CODRemPro.MCF" style="width: 300px; height:50px;" placeholder="MCF" />
                    </el-form-item>
                </div>
                <div class="flex">
                    <div class="w-[180px]">j 为水污染物 COD 和 TN；</div>
                    <el-form-item prop="B0" :rules="[{ required: true, message: 'B0 is required' }]">
                        <el-input v-model="CODRemPro.B0" style="width: 300px; height:50px;" placeholder="B0" />
                    </el-form-item>
                </div>
            </el-form>
        </div>





        <!-- 处理污泥产生的温室气体排放量 -->
        <div class="mt-10">
            <p style="font-weight: bold; font-size: 20px; color: black;">处理污泥产生的温室气体排放量</p>
            <el-form :model="HandleSludPro" class="flex flex-start flex-wrap gap-4 mt-3" ref="HandleSludProRef">
                <div class="flex">
                    <div class="w-[180px]">Q 为城镇污水处理厂污水年处理量，m3/a；</div>
                    <el-form-item prop="SR" :rules="[{ required: true, message: 'SR is required' }]">
                        <el-input v-model="HandleSludPro.SR" style="width: 300px; height:50px;" placeholder="SR" />
                    </el-form-item>
                </div>
                <div class="flex">
                    <div class="w-[180px]">Pinj 为入厂城镇污水中污染物 j 的年均浓度，g/m3；</div>
                    <el-form-item prop="Bs" :rules="[{ required: true, message: 'Bs is required' }]">
                        <el-input v-model="HandleSludPro.Bs" style="width: 300px; height:50px;" placeholder="Bs" />
                    </el-form-item>
                </div>
                <div class="flex">
                    <div class="w-[180px]"> Poutj 为出厂城镇污水中污染物 j 的年均浓度，g/m3；</div>
                    <el-form-item prop="DOCf" :rules="[{ required: true, message: 'DOCf is required' }]">
                        <el-input v-model="HandleSludPro.DOCf" style="width: 300px; height:50px;" placeholder="DOCf" />
                    </el-form-item>
                </div>
                <div class="flex">
                    <div class="w-[180px]">j 为水污染物 COD 和 TN；</div>
                    <el-form-item prop="MCF" :rules="[{ required: true, message: 'MCF is required' }]">
                        <el-input v-model="HandleSludPro.MCF" style="width: 300px; height:50px;" placeholder="MCF" />
                    </el-form-item>
                </div>
                <div class="flex">
                    <div class="w-[180px]">j 为水污染物 COD 和 TN；</div>
                    <el-form-item prop="F" :rules="[{ required: true, message: 'F is required' }]">
                        <el-input v-model="HandleSludPro.F" style="width: 300px; height:50px;" placeholder="F" />
                    </el-form-item>
                </div>
                <div class="flex">
                    <div class="w-[180px]">j 为水污染物 COD 和 TN；</div>
                    <el-form-item prop="CCH4" :rules="[{ required: true, message: 'CCH4 is required' }]">
                        <el-input v-model="HandleSludPro.CCH4" style="width: 300px; height:50px;" placeholder="CCH4" />
                    </el-form-item>
                </div>
            </el-form>
        </div>






        <!-- 去除 TN 产生的 N2O 排放量 -->
        <div class="mt-10">
            <p style="font-weight: bold; font-size: 20px; color: black;">去除 TN 产生的 N2O 排放量</p>
            <el-form :model="TNRemProN2O" class="flex flex-start flex-wrap gap-4 mt-3" ref="TNRemProN2ORef">
                <div class="flex">
                    <div class="w-[180px]">Q 为城镇污水处理厂污水年处理量，m3/a；</div>
                    <el-form-item prop="RTN" :rules="[{ required: true, message: 'RTN is required' }]">
                        <el-input v-model="TNRemProN2O.RTN" style="width: 300px; height:50px;" placeholder="RTN" />
                    </el-form-item>
                </div>
                <div class="flex">
                    <div class="w-[180px]">Pinj 为入厂城镇污水中污染物 j 的年均浓度，g/m3；</div>
                    <el-form-item prop="EFN2O" :rules="[{ required: true, message: 'EFN2O is required' }]">
                        <el-input v-model="TNRemProN2O.EFN2O" style="width: 300px; height:50px;" placeholder="EFN2O" />
                    </el-form-item>
                </div>
                <div class="flex">
                    <div class="w-[180px]"> Poutj 为出厂城镇污水中污染物 j 的年均浓度，g/m3；</div>
                    <el-form-item prop="CN2O" :rules="[{ required: true, message: 'CN2O is required' }]">
                        <el-input v-model="TNRemProN2O.CN2O" style="width: 300px; height:50px;" placeholder="CN2O" />
                    </el-form-item>
                </div>
                <div class="flex">
                    <div class="w-[180px]">j 为水污染物 COD 和 TN；</div>
                    <el-form-item prop="GWPCO2" :rules="[{ required: true, message: 'GWPCO2 is required' }]">
                        <el-input v-model="TNRemProN2O.GWPCO2" style="width: 300px; height:50px;" placeholder="GWPCO2" />
                    </el-form-item>
                </div>
            </el-form>
        </div>



        <!-- 城镇污水处理消耗电力产生的 CO2排放量 -->
        <div class="mt-10">
            <p style="font-weight: bold; font-size: 20px; color: black;">城镇污水处理消耗电力产生的 CO2排放量</p>
            <el-form :model="EleCO2Pro" class="flex flex-start flex-wrap gap-4 mt-3" ref="EleCO2ProRef">
                <div class="flex">
                    <div class="w-[180px]">Q 为城镇污水处理厂污水年处理量，m3/a；</div>
                    <el-form-item prop="EH" :rules="[{ required: true, message: 'EH is required' }]">
                        <el-input v-model="EleCO2Pro.EH" style="width: 300px; height:50px;" placeholder="EH" />
                    </el-form-item>
                </div>
                <div class="flex">
                    <div class="w-[180px]">Pinj 为入厂城镇污水中污染物 j 的年均浓度，g/m3；</div>
                    <el-form-item prop="EFCO2" :rules="[{ required: true, message: 'EFCO2 is required' }]">
                        <el-input v-model="EleCO2Pro.EFCO2" style="width: 300px; height:50px;" placeholder="EFCO2" />
                    </el-form-item>
                </div>
                <div class="flex">
                    <div class="w-[180px]"> Poutj 为出厂城镇污水中污染物 j 的年均浓度，g/m3；</div>
                    <el-form-item prop="GWPCO2" :rules="[{ required: true, message: 'GWPCO2 is required' }]">
                        <el-input v-model="EleCO2Pro.GWPCO2" style="width: 300px; height:50px;" placeholder="GWPCO2" />
                    </el-form-item>
                </div>
            </el-form>
        </div>



        <!-- 温室气体净减排总量 -->
        <div class="mt-10">
            <p style="font-weight: bold; font-size: 20px; color: black;">温室气体净减排总量</p>
            <el-form :model="EleCO2Pro" class="flex flex-start flex-wrap gap-4 mt-3" ref="EleCO2ProRef">
                <div class="flex">
                    <div class="w-[180px]">Q 为城镇污水处理厂污水年处理量，m3/a；</div>
                    <el-form-item prop="EH" :rules="[{ required: true, message: 'EH is required' }]">
                        <el-input v-model="EleCO2Pro.EH" style="width: 300px; height:50px;" placeholder="EH" />
                    </el-form-item>
                </div>
                <div class="flex">
                    <div class="w-[180px]">Pinj 为入厂城镇污水中污染物 j 的年均浓度，g/m3；</div>
                    <el-form-item prop="EFCO2" :rules="[{ required: true, message: 'EFCO2 is required' }]">
                        <el-input v-model="EleCO2Pro.EFCO2" style="width: 300px; height:50px;" placeholder="EFCO2" />
                    </el-form-item>
                </div>
                <div class="flex">
                    <div class="w-[180px]"> Poutj 为出厂城镇污水中污染物 j 的年均浓度，g/m3；</div>
                    <el-form-item prop="GWPCO2" :rules="[{ required: true, message: 'GWPCO2 is required' }]">
                        <el-input v-model="EleCO2Pro.GWPCO2" style="width: 300px; height:50px;" placeholder="GWPCO2" />
                    </el-form-item>
                </div>
            </el-form>
        </div>







































































    </div>

</template>