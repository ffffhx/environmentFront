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


// 化石源碳矿化产生的碳排放量
const OCEwfCO2m = reactive({
    CEwfCO2m: null,
    Qinm: null,
    CODinm: null,
    CODoutm: null,
    EFwCO2: null,
    FCF: null,
})


//外加碳源矿化产生的化石源碳排放量
const OCEweCO2m = reactive({
    CEweCO2m: null,
    EFweCO2: null,
    Mem: null,
})


// 泵站和沉砂池逸散的  量
const OCEwCH4m = reactive({
    CEwCH4m: null,
    Qinm: null,
    CODinm: null,
    CODoutm: null,
    EFwCH4: null,
    MpumpCH4m: null,
    MgritCH4m: null,
    fCH4: null,
    FCH4: null,
})



// 污水生物处理脱氮过程排放的  的当量
const OCEwN2Om = reactive({
    CEwN2Om: null,
    Qinm: null,
    TNinm: null,
    TNoutm: null,
    EFwN2O: null,
    transitionRate: 44 / 28,
    fN2O: null,
})

// 污水处理阶段生化反应的年度碳排放量
const OCEwban = reactive({
    CEwban: null,
    CEwCH4m: null,
    CEwN2Om: null,
    CEwfCO2m: null,
    CEweCO2m: null
})


// 污水处理阶段所运行设备的电力消耗产生的碳排放量
const OCEwecm = reactive({
    CEwecm: null,
    Eecm: null,
    EFecp: null
})


// 用于污水处理阶段的锅炉热蒸汽生产设备运转等固定式能源燃料消耗产生的碳排放量以及外购热源等非电力能源消耗折合的碳排放量
const OCEwfcm = reactive({
    CEwfcm: null,
    Mfcjm: null,
    EFfcj: null
})


// 污水处理阶段药剂消耗产生的碳排放量
const OCEwccm = reactive({
    CEwccm: null,
    Mccjm: null,
    EFccj: null
})


// 污水处理阶段能源和药剂消耗产生的碳排放量
const OCEwrean = reactive({
    CEwrean: null,
    CEwfcm: null,
    CEwecm: null,
    CEwccm: null
})


// 污泥厌氧消化沼气收集管路无意泄露的 或沼气火炬燃烧不充分导致的碳排放排放当量
const OCEsCH4adm = reactive({
    CEsCH4adm: null,
    Vbiogasm: null,
    PCH4: null,
    F: null,
    transitionMol: 16 / 22.4,
    fCH4: null,
})


// 污泥好氧发酵过程生化反应的碳排放包括 CH4 和N2O 排放当量
const OCEsCH4afm = reactive({
    CEsCH4afm: null,
    Mssm: null,
    EFsCH4af: null,
    fCH4: null,
})

// 单独处理污泥厌氧消化过程产生的沼液时可根据沼液量与TN 浓度按本标准第3.2.4条规定计算
const OCEsN2Oafm = reactive({
    CEsN2Oafm: null,
    Mssm: null,
    EFsN2Oaf: null,
    fN2O: null,
})


// 在污泥干化焚烧或协同焚烧过程化石源碳被氧化产生的化石源CO2碳排放量
const OCEsfCO2incm = reactive({
    CEsfCO2incm: null,
    Mssm: null,
    CF: null,
    FCF: null,
})

// 污泥焚烧过程不完全燃烧产生的CH4和 N2O的CO2排放当量
const OCEsCH4incm = reactive({
    CEsCH4incm: null,
    Mssm: null,
    EFsCH4inc: null,
    fCH4: null,
})
const OCEsN2Oincm = reactive({
    CEsN2Oincm: null,
    Mssm: null,
    EFsN2Oinc: null,
    fN2O: null,
})




// 根据污泥实际处理方法计算污泥处理生化反应的碳排放总量,应包括化石源 CO2 、CH4和N2O的碳排放量
const OCEsban = reactive({
    CEsban: null,
    CEsCH4rm: null,
    CEsN2Orm: null,
    CEsfCO2rm: null,
})


// 污泥处理阶段能源和药剂消耗产生的碳排放量
const OCEsrean = reactive({
    CEsrean: null,
    CEsecrm: null,
    CEsfcrm: null,
    CEsccrm: null
})


// 采用热泵技术回收利用污水中蕴含的热能时相应的替碳量
const OCAhpm = reactive({
    CAhpm: null,
    Am: null,
    EFfcj: null,
})


// 采用光伏发电的厂区应使用光伏企业提供的厂内发电量,相应的替碳量
const OCApvm = reactive({
    CApvm: null,
    Epvm: null,
    EFecp: null,
})

// 再生水回用的替碳量宜按替代的商业供水的取水生产和输送的碳排放量
const OCAwsm = reactive({
    CAwsm: null,
    Qwsm: null,
    EIitj: null,
    EIspj: null,
    EIwsj: null,
    EFecp: null,
    CEIws: null
})


// 污泥厌氧消化沼气利用的替碳量应只计算富余沼气实际供热或发电量或富余沼气经过净化提纯产生的天然气量
const OCAadm = reactive({
    CAadm: null,
    Eadm: null,
    EFecp: null,
    Hadm: null,
    EFfcj: null,
    Vngm: null,
    EFfcng: null
})



// 对于污泥干化焚烧或热解处理过程相应的替碳量
const OCAincm = reactive({
    CAincm: null,
    Eincm: null,
    EFecp: null,
    Hadm: null,
    EFfcj: null,
})



// 污泥经过厌氧好氧或碳化处理后 产生的替碳量
const OCAlandm = reactive({
    CAlandm: null,
    Mlandm: null,
    PN: null,
    wN: null,
    EFNFERT: null,
    Ppo: null,
    wpo: null,
    EFPFERT: null,
})


// 污水厂替碳量
const OCAan = reactive({
    CAan: null,
    CAhpm: null,
    CApvm: null,
    CArm: null,
    CAwsm: null,
    CAotherm: null,
})


// 污水厂运维阶段的年度碳排放量
const OCEoman = reactive({
    CEoman: null,
    CEwban: null,
    CEwrean: null,
    CEsban: null,
    CEsrean: null,
    CAan: null,
    CSan: null
})

// 污水厂全生命周期运维阶段碳排放量
const OCElcom = reactive({
    CElcom: null,
    T1: null,
    CEoman: null,
    Mrp: null,
    EFrpj: null,
    T2: null
})


// 污泥处置阶段的碳排放量
const OCEsdCH4lfan = reactive({
    CEsdCH4lfan: null,
    Mssm: null,
    MCF: null,
    transitionSlud: 2.52
})

// 污泥土地利用后分解产生的CH4、N2O排放的 CO2 当量
const OCEsdCH4landan = reactive({
    CEsdCH4landan: null,
    Mssm: null,
    EFsdCH4land: null,
    fCH4: null
})



const OCEsdN2Olandan = reactive({
    CEsdN2Olandan: null,
    Mssm: null,
    PN: null,
    EFsdN2Oland: null,
    fN2O: null
})


//污泥及其处理产物运输至处置地点CEsdtransrk产生的碳排放量
const CEsdtransran = reactive({
    CEsdtransran: null,
    Mssm: null,
    Lssrk: null,
    EFssk: null,
})


// 污泥处置阶段的碳排放量
const CEsdan = reactive({
    CEsdan: null,
    CEsdCH4ran: null,
    CEsdN2Oran: null,
    CEsdfcran: null,
    CEsdecran: null,
    CEsdtransran: null
})


// 污水排放入受纳水体的延伸阶段碳排放量
const OCEexN2Oan = reactive({
    CEexN2Oan: null,
    Qexoutm: null,
    TNoutm: null,
    EFexN2O: null,
    transition: 44 / 28,
    fN2O: null
})


// 污水厂全生命周期碳排放量
const OCElc = reactive({
    CElc: null,
    CEcs: null,
    CEdm: null,
    CElcom: null,
    T1: null,
    CEsdan: null,
    CEexN2Oan: null
})

// 污水厂运维阶段的年度碳排放强度
const OCEIoman = reactive({
    CEIoman: null,
    CEoman:null,
    Qinan:null,
})


// 污水厂运维阶段的年度污染物削减碳排放强度
const OCEIomanX = reactive({
    CEIomanX: null,
    CEoman:null,
    Xan:null,
    Qinan:null,
    CODinan:null,
    CODoutan:null,
    NH3Ninan:null,
    NH3Noutan:null,
})


// 污水厂运维阶段碳减排量
const OCRoman = reactive({
    CRoman: null,
    CEomvy: null,
    CEomby: null,
})


// 评估年度相对于基准年度的碳减排强度
const OCRIoman = reactive({
    CRIoman: null,
    CEIomvy: null,
    CEIomby: null,
})



// 评估年度相对于基准年度的污染物削减碳减排强度
const OCRIomanX = reactive({
    CRIomanX: null,
    CEIomvyX: null,
    CEIombyX: null,
})


// 待评估污水厂运维年度相对于行业同类平均水平的碳排放强度目标差
const OCEIomang = reactive({
    CEIomang: null,
    CEIomvy: null,
    CEIomav: null
})


// 污水厂各处理阶段的碳排放贡献度
const OCBstan = reactive({
    CBusan: null,
    CEstan: null,
    CEoman: null
})


// 污水厂全生命周期碳排放强度
const OCEIlc = reactive({
    CEIlc: null,
    CElc: null,
    T: null,
    Qin: null
})


// 污水厂去除单位耗氧污染物量对应的全生命周期碳排放量
const OCEIlcX = reactive({
    CElc: null,
    T: null,
    X: null
})

const OX = ref({
    X: null,
    Qinlc: null,
    CODinlc: null,
    CODoutlc: null,
    NH3Ninlc: null,
    NH3Noutlc: null
})


// 待评估污水厂相对于行业同类平均水平的全生命周期碳排放强度
const OCEIlcg = reactive({
    CEIlcg: null,
    CEIlcvy: null,
    CEIlcav: null
})

// 污水厂全生命周期碳排放节点分析基于各处理阶段的碳排放贡献度
const OCBlcst = reactive({
    CBlcst:null,
    CElcst:null,
    CElc:null
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
        <sub></sub>
        <!-- N2O直接排放量 -->
        <div class="flex">

        </div>
        <div class="mt-10">
            <!-- <el-card shadow="hover"> -->
            <p style="font-weight: bold; font-size: 20px; color: black;">N<sub>2</sub>O直接排放量</p>
            <el-form :model="N2O" class="flex flex-start flex-wrap gap-4 mt-3" ref="N2ORef">
                <div class="flex">
                    <div class="w-[180px]">𝑄<sub>rb,𝑖</sub>—污水生物处理单元第 i {{ iData }}进水水量，m<sup>3</sup></div>
                    <el-form-item prop="Qrbi" :rules="[{ required: true, message: 'Qrbi is required' }]">
                        <el-input v-model="N2O.Qrbi" style="width: 300px; height:50px;" placeholder="Qrbi" />
                    </el-form-item>
                </div>
                <div class="flex">
                    <div class="w-[180px]">𝑇𝑁<sub>rb.𝑖</sub>—— 污水生物处理单元第 i {{ iData }}平均进水TN浓度，mg/L</div>
                    <el-form-item prop="TNrbi" :rules="[{ required: true, message: 'TNrbi is required' }]">
                        <el-input v-model="N2O.TNrbi" style="width: 300px; height:50px;" placeholder="TNrbi" />
                    </el-form-item>
                </div>
                <div class="flex">
                    <div class="w-[180px]">𝑇𝑁<sub>eb,𝑖</sub>—— 污水生物处理单元第 i {{ iData }}平均出水 TN 浓度，mg/L</div>
                    <el-form-item prop="TNebi" :rules="[{ required: true, message: 'TNebi is required' }]">
                        <el-input v-model="N2O.TNebi" style="width: 300px; height:50px;" placeholder="TNebi" />
                    </el-form-item>
                </div>
                <div class="flex">
                    <div class="w-[180px]">𝐸𝐹<sub>N<sub>2</sub>O</sub> —— N<sub>2</sub>O 排放因子，取值为 0.016
                        kgN<sub>2</sub>O-N/kgTN</div>

                    <el-form-item prop="EFN2O" :rules="[{ required: true, message: 'EFN2O is required' }]">
                        <el-input v-model="N2O.EFN2O" style="width: 300px; height:50px;" placeholder="EFN2O" />
                    </el-form-item>
                </div>
                <div class="flex">
                    <div class="w-[180px]">𝐶<sub>N<sub>2</sub>O/N<sub>2</sub></sub>——
                        N<sub>2</sub>O/N<sub>2</sub>分子量之比，取值为 44/28</div>
                    <el-form-item prop="CN2ON2" :rules="[{ required: true, message: 'CN2ON2 is required' }]">
                        <el-input v-model="N2O.CN2ON2" style="width: 300px; height:50px;" placeholder="CN2ON2" />
                    </el-form-item>
                </div>
            </el-form>
            <!-- </el-card> -->

        </div>

        <!-- N2O直接碳排放强度 -->
        <!-- <div class="mt-10">
            <p style="font-weight: bold; font-size: 20px; color: black;">N2O直接碳排放强度</p>
            <el-form :model="N2OCInt" class="flex flex-start flex-wrap gap-4 mt-3"  ref="N2OCIntRef">
                <el-form-item prop="fN2O" :rules="[{ required: true, message: 'fN2O is required' }]">
                    <el-input v-model="N2OCInt.fN2O" style="width: 300px; height:50px;" placeholder="fN2O" readonly
                        :disabled="true" />
                </el-form-item>
                <el-form-item>
                    <el-input v-model="N2O.mN2Oi" style="width: 300px; height:50px;" placeholder="mN2Oi" />
                </el-form-item>
                <el-form-item>
                    <el-input v-model="N2O.Qrbi" style="width: 300px; height:50px;" placeholder="Qrbi" />
                </el-form-item>
            </el-form>
        </div> -->

        <!-- CH4直接排放量 -->
        <div class="mt-10">
            <p style="font-weight: bold; font-size: 20px; color: black;">CH4直接排放量</p>
            <el-form :model="CH4" class="flex flex-start flex-wrap gap-4 mt-3" ref="CH4Ref">
                <div class="flex">

                    <div class="w-[180px]">𝑄ra,𝑖
                        —— 污水处理厂第 i {{ iData }}进水水量，m<sup>3</sup>；</div>
                    <el-form-item>
                        <el-input v-model="N2O.Qrbi" style="width: 300px; height:50px;" placeholder="Qrbi" />
                    </el-form-item>
                </div>
                <div class="flex">

                    <div class="w-[180px]">𝐶𝑂𝐷ra,𝑖
                        —— 污水处理厂第 i {{ iData }}平均进水 CODCr浓度，mg/L；</div>
                    <el-form-item prop="CODrai" :rules="[{ required: true, message: 'CODrai is required' }]">
                        <el-input v-model="CH4.CODrai" style="width: 300px; height:50px;" placeholder="CODrai" />
                    </el-form-item>
                </div>
                <div class="flex">

                    <div class="w-[180px]">𝐶𝑂𝐷ea,𝑖
                        —— 污水处理厂第 i {{ iData }}平均出水 CODCr浓度，mg/L；</div>
                    <el-form-item prop="CODeai" :rules="[{ required: true, message: 'CODeai is required' }]">
                        <el-input v-model="CH4.CODeai" style="width: 300px; height:50px;" placeholder="CODeai" />
                    </el-form-item>
                </div>
                <div class="flex">

                    <div class="w-[180px]">污泥量,t</div>
                    <el-form-item prop="SGSlud" :rules="[{ required: true, message: 'SGSlud is required' }]">
                        <el-input v-model="CH4.SGSlud" style="width: 300px; height:50px;" placeholder="SGSlud" />
                    </el-form-item>
                </div>
                <div class="flex">

                    <div class="w-[180px]">含水率,%（80％填80即可）</div>
                    <el-form-item prop="SGWater" :rules="[{ required: true, message: 'SGWater is required' }]">
                        <el-input v-model="CH4.SGWater" style="width: 300px; height:50px;" placeholder="SGWater" />
                    </el-form-item>
                </div>
                <div class="flex">

                    <div class="w-[180px]">𝑃v,𝑖
                        —— 污水处理厂第 i {{ iData }}干污泥的有机分，%；</div>
                    <el-form-item prop="Pvi" :rules="[{ required: true, message: 'Pvi is required' }]">
                        <el-input v-model="CH4.Pvi" style="width: 300px; height:50px;" placeholder="Pvi" />
                    </el-form-item>
                </div>
                <div class="flex">

                    <div class="w-[180px]">𝑅CH4,
                        𝑖—— 污水处理厂第 i {{ iData }} CH4回收体积，m³；</div>
                    <el-form-item prop="RCH4i" :rules="[{ required: true, message: 'RCH4i is required' }]">
                        <el-input v-model="CH4.RCH4i" style="width: 300px; height:50px;" placeholder="RCH4i" />
                    </el-form-item>
                </div>
                <div class="flex">

                    <div class="w-[180px]">𝑀𝐶𝐹 —— 污水处理过程 CH4修正因子。</div>
                    <el-form-item prop="MCF" :rules="[{ required: true, message: 'MCF is required' }]">
                        <el-select v-model="CH4.MCF" placeholder="𝑀𝐶𝐹 —— 污水处理过程 CH4修正因子。" size="large"
                            style="width: 300px">
                            <el-option v-for="item in MCFOptions" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </el-form-item>
                </div>
                <div class="flex">

                    <div class="w-[180px]">𝐵0
                        —— 厌氧过程降解单位 CODCr时 CH4的产率系数，取值为 0.25 kgCH4/kgCODCr；</div>
                    <el-form-item prop="B0" :rules="[{ required: true, message: 'B0 is required' }]">
                        <el-input v-model="CH4.B0" style="width: 300px; height:50px;" placeholder="B0" />
                    </el-form-item>
                </div>
                <div class="flex">

                    <div class="w-[180px]">𝜌𝑆
                        —— 污泥中的有机物与 CODCr的转化系数，取值为 1.42 kgCODCr/kgDS；</div>
                    <el-form-item prop="p" :rules="[{ required: true, message: 'p is required' }]">
                        <el-input v-model="CH4.p" style="width: 300px; height:50px;" placeholder="p" />
                    </el-form-item>
                </div>
            </el-form>
        </div>


        <!-- 第四行CH4直接碳排放强度 -->
        <!-- <div class="mt-10">
            <p style="font-weight: bold; font-size: 20px; color: black;">CH4直接碳排放强度</p>
            <el-form :model="CH4CInt" class="flex flex-start flex-wrap gap-4 mt-3"  ref="CH4Ref">
                <el-form-item prop="fCH4" :rules="[{ required: true, message: 'fCH4 is required' }]">
                    <el-input v-model="CH4CInt.fCH4" style="width: 300px; height:50px;" placeholder="fCH4" />
                </el-form-item>
                <el-form-item>
                    <el-input v-model="CH4.mCH4i" style="width: 300px; height:50px;" placeholder="mN2Oi" />
                </el-form-item>
                <el-form-item>
                    <el-input v-model="N2O.Qrbi" style="width: 300px; height:50px;" placeholder="Qrbi" />
                </el-form-item>
            </el-form>
        </div> -->

        <!-- 第五行化石燃料燃烧 CO2直接排放量  -->
        <!-- <div class="mt-10">
            <p style="font-weight: bold; font-size: 20px; color: black;">化石燃料燃烧CO2直接排放量</p>
            <el-form :model="CO2" class="flex flex-start flex-wrap gap-4 mt-3"  ref="CH4Ref">
                <el-form-item prop="fc" :rules="[{ required: true, message: 'fc is required' }]">
                    <el-input v-model="CO2.fc" style="width: 300px; height:50px;" placeholder="fc" />
                </el-form-item>
                <el-form-item prop="Mfj" :rules="[{ required: true, message: 'Mfj is required' }]">
                    <el-input v-model="CO2.Mfj" style="width: 300px; height:50px;" placeholder="Mfj" />
                </el-form-item>
            </el-form>
        </div> -->


        <!-- CO2直接排放强度 -->
        <!-- <div class="mt-10">
            <p style="font-weight: bold; font-size: 20px; color: black;">CO2直接排放强度</p>
            <el-form :model="CO2Int" class="flex flex-start flex-wrap gap-4 mt-3"  ref="CH4Ref">
                <el-form-item prop="mCO2i" :rules="[{ required: true, message: 'mCO2i is required' }]">
                    <el-input v-model="CO2Int.mCO2i" style="width: 300px; height:50px;" placeholder="mCO2i" />
                </el-form-item>
                <el-form-item prop="Qrai" :rules="[{ required: true, message: 'Qrai is required' }]">
                    <el-input v-model="CO2Int.Qrai" style="width: 300px; height:50px;" placeholder="Qrai" />
                </el-form-item>
            </el-form>
        </div> -->

        <!-- 直接碳排放强度 -->
        <!-- <div class="mt-10">
            <p style="font-weight: bold; font-size: 20px; color: black;">直接碳排放强度</p>
            <el-form :model="IntC" class="flex flex-start flex-wrap gap-4 mt-3"  ref="CH4Ref">
                <el-form-item prop="Ed" :rules="[{ required: true, message: 'Ed is required' }]">
                    <el-input v-model="IntC.Ed" style="width: 300px; height:50px;" placeholder="Ed" />
                </el-form-item>
                <el-form-item prop="EN2O" :rules="[{ required: true, message: 'EN2O is required' }]">
                    <el-input v-model="IntC.EN2O" style="width: 300px; height:50px;" placeholder="EN2O" />
                </el-form-item>
                <el-form-item prop="ECH4" :rules="[{ required: true, message: 'ECH4 is required' }]">
                    <el-input v-model="IntC.ECH4" style="width: 300px; height:50px;" placeholder="ECH4" />
                </el-form-item>
                <el-form-item prop="ECO2" :rules="[{ required: true, message: 'ECO2 is required' }]">
                    <el-input v-model="IntC.ECO2" style="width: 300px; height:50px;" placeholder="ECO2" />
                </el-form-item>
            </el-form>
        </div> -->




        <!-- 电耗碳排放强度 -->
        <div class="mt-10">
            <p style="font-weight: bold; font-size: 20px; color: black;">电耗碳排放强度</p>

            <el-form :model="EleCInt" class="flex flex-start flex-wrap gap-4 mt-3" ref="EleCIntRef">
                <div class="flex">

                    <div class="w-[180px]">请您选择污水厂的所属区域</div>
                    <el-form-item prop="fe" :rules="[{ required: true, message: 'fe is required' }]">
                        <el-select v-model="EleCInt.fe" placeholder="选择污水厂所属区域" size="large" style="width: 300px">
                            <el-option v-for="item in AreaOptions" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </el-form-item>
                </div>
                <div class="flex">

                    <div class="w-[180px]">𝑊𝑖
                        —— 第 i {{ iData }}用于生产运行的外购电量，kW·h；</div>
                    <el-form-item prop="Wi" :rules="[{ required: true, message: 'Wi is required' }]">
                        <el-input v-model="EleCInt.Wi" style="width: 300px; height:50px;" placeholder="Wi" />
                    </el-form-item>
                </div>
                <div class="flex">

                    <div class="w-[180px]">𝑄ra,𝑖
                        —— 污水处理厂第 i {{ iData }}进水水量，m<sup>3</sup>。</div>
                    <el-form-item>
                        <el-input v-model="N2O.Qrbi" style="width: 300px; height:50px;" placeholder="Qrbi" />
                    </el-form-item>
                </div>
            </el-form>
        </div>


        <!-- 热耗碳排放强度 -->
        <div class="mt-10">
            <p style="font-weight: bold; font-size: 20px; color: black;">热耗碳排放强度</p>
            <el-form :model="HotCInt" class="flex flex-start flex-wrap gap-4 mt-3" ref="HotCIntRef">
                <div class="flex">

                    <div class="w-[180px]">𝑓c
                        —— 标准煤 CO2排放因子，取值为 2.7725 kgCO2/kg 标准煤；</div>
                    <el-form-item prop="fc" :rules="[{ required: true, message: 'fc is required' }]">
                        <el-input v-model="HotCInt.fc" style="width: 300px; height:50px;" placeholder="fc" />
                    </el-form-item>
                </div>
                <div class="flex">

                    <div class="w-[180px]">𝑀h,𝑖
                        —— 第 i {{ iData }}用于污水处理运行的外购热量，按标准煤计算，kg 标准煤；</div>
                    <el-form-item prop="Mhi" :rules="[{ required: true, message: 'Mhi is required' }]">
                        <el-input v-model="HotCInt.Mhi" style="width: 300px; height:50px;" placeholder="Mhi" />
                    </el-form-item>
                </div>
                <div class="flex">

                    <div class="w-[180px]">污水处理厂第 i {{ iData }}进水水量，m<sup>3</sup>。</div>

                    <el-form-item>
                        <el-input v-model="N2O.Qrbi" style="width: 300px; height:50px;" placeholder="Qrbi" />
                    </el-form-item>
                </div>
            </el-form>
        </div>

        <!-- 物耗碳排放量药剂质量 -->
        <div class="mt-10">
            <!-- NaClO浓度 -->
            <p style="font-weight: bold; font-size: 20px; color: black;">物耗碳排放量药剂质量</p>
            <div class="flex">

            </div>

            <div class="flex">
                <el-form :model="McgM" class="flex flex-start flex-wrap gap-4 mt-3" ref="McgMRef">
                    <div class="flex" v-for="(value, key, index) in McgM">
                        <div class="w-[180px]">{{ MatConNames[index] }}</div>
                        <el-form-item :key="key" :prop="key"
                            :rules="[{ required: true, message: `${key} is required` }]">
                            <el-input v-model="McgM[key]" style="width: 300px; height:50px;" :placeholder="key" />
                        </el-form-item>
                    </div>
                    <el-form :model="NaClO" class="flex flex-start flex-wrap gap-4 mt-3" ref="NaClORef"
                        v-if="NaClO.ifHave">
                        <div class="flex">
                            <div class="w-[180px]">选择您的次氯酸钠浓度</div>
                            <el-form-item prop="Con" :rules="[{ required: true, message: 'Con is required' }]">
                                <el-select v-model="NaClO.Con" placeholder="次氯酸钠浓度" size="large"
                                    style="width: 300px ;height:50px">
                                    <el-option v-for="item in NaClOOptions" :key="item.value" :label="item.label"
                                        :value="item.value" />
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-form>
                </el-form>


            </div>
        </div>


        <!-- 物耗碳排放量药剂浓度 -->
        <div class="mt-10">
            <p style="font-weight: bold; font-size: 20px; color: black;">物耗碳排放量药剂浓度</p>
            <el-form :model="McgCon" class="flex flex-start flex-wrap gap-4 mt-3" ref="McgConRef">

                <div class="flex" v-for="(value, key, index) in McgCon">
                    <div class="w-[180px]">{{ MatConNames[index] }}</div>
                    <el-form-item :key="key" :prop="key" :rules="[{ required: true, message: `${key} is required` }]">
                        <el-input v-model="McgCon[key]" style="width: 300px; height:50px;" :placeholder="key" />
                    </el-form-item>
                </div>


            </el-form>
        </div>

        <!-- 物耗碳排放量 -->
        <!-- <div class="mt-10">
            <p style="font-weight: bold; font-size: 20px; color: black;">物耗碳排放量</p>
            <el-form :model="MatC" class="flex flex-start flex-wrap gap-4 mt-3"  ref="CH4Ref">
                <el-form-item v-for="(value, key) in MatC" :key="key" :prop="key"
                    :rules="[{ required: true, message: `${key} is required` }]">
                    <el-input v-model="MatC[key]" style="width: 300px; height:50px;" :placeholder="key" />
                </el-form-item>
            </el-form>
        </div> -->

        <!-- 物耗碳排放强度 -->
        <!-- <div class="mt-10">
            <p style="font-weight: bold; font-size: 20px; color: black;">物耗碳排放强度</p>
            <el-form class="flex flex-start flex-wrap gap-4 mt-3"  ref="CH4Ref">
                <el-form-item>
                    <el-input v-model="MatC.Mci" style="width: 300px; height:50px;" placeholder="Mci" />
                </el-form-item>
                <el-form-item>
                    <el-input v-model="N2O.Qrbi" style="width: 300px; height:50px;" placeholder="Qrbi" />
                </el-form-item>
            </el-form>
        </div> -->

        <!-- 间接碳排放强度 -->
        <!-- <div class="mt-10">
            <p style="font-weight: bold; font-size: 20px; color: black;">间接碳排放强度</p>
            <el-form :model="IndCInt" class="flex flex-start flex-wrap gap-4 mt-3"  ref="CH4Ref">
                <el-form-item prop="Ei" :rules="[{ required: true, message: 'Ei is required' }]">
                    <el-input v-model="IndCInt.Ei" style="width: 300px; height:50px;" placeholder="Ei" />
                </el-form-item>
                <el-form-item prop="Ee" :rules="[{ required: true, message: 'Ee is required' }]">
                    <el-input v-model="IndCInt.Ee" style="width: 300px; height:50px;" placeholder="Ee" />
                </el-form-item>
                <el-form-item prop="Eh" :rules="[{ required: true, message: 'Eh is required' }]">
                    <el-input v-model="IndCInt.Eh" style="width: 300px; height:50px;" placeholder="Eh" />
                </el-form-item>
                <el-form-item prop="Ec" :rules="[{ required: true, message: 'Ec is required' }]">
                    <el-input v-model="IndCInt.Ec" style="width: 300px; height:50px;" placeholder="Ec" />
                </el-form-item>
            </el-form>
        </div> -->

        <!-- 碳排放强度 -->
        <!-- <div class="mt-10">
            <p style="font-weight: bold; font-size: 20px; color: black;">碳排放强度</p>
            <el-form :model="CInt" class="flex flex-start flex-wrap gap-4 mt-3"  ref="CH4Ref">
                <el-form-item prop="Ef" :rules="[{ required: true, message: 'Ef is required' }]">
                    <el-input v-model="CInt.Ef" style="width: 300px; height:50px;" placeholder="Ef" />
                </el-form-item>
                <el-form-item prop="Ed" :rules="[{ required: true, message: 'Ed is required' }]">
                    <el-input v-model="CInt.Ed" style="width: 300px; height:50px;" placeholder="Ed" />
                </el-form-item>
                <el-form-item prop="Ei" :rules="[{ required: true, message: 'Ei is required' }]">
                    <el-input v-model="CInt.Ei" style="width: 300px; height:50px;" placeholder="Ei" />
                </el-form-item>
            </el-form>
        </div> -->
        <!-- 总氮去除率修正系数 -->
        <!-- <div class="mt-10">
            <p style="font-weight: bold; font-size: 20px; color: black;">总氮去除率修正系数</p>
            <el-form :model="TotNRemRat" class="flex flex-start flex-wrap gap-4 mt-3"  ref="CH4Ref">
                <el-form-item prop="TNrbi" :rules="[{ required: true, message: 'TNrbi is required' }]">
                    <el-input v-model="TotNRemRat.TNrbi" style="width: 300px; height:50px;" placeholder="TNrbi" />
                </el-form-item>
                <el-form-item prop="TNebi" :rules="[{ required: true, message: 'TNebi is required' }]">
                    <el-input v-model="TotNRemRat.TNebi" style="width: 300px; height:50px;" placeholder="TNebi" />
                </el-form-item>
            </el-form>
        </div> -->


        <!-- 处理规模修正系数 -->
        <div class="mt-10">
            <p style="font-weight: bold; font-size: 20px; color: black;">处理规模修正系数</p>
            <el-form :model="TreScaRat" class="flex flex-start flex-wrap gap-4 mt-3" ref="TreScaRatRef">
                <div class="flex">
                    <div class="w-[180px]">处理规模——Qda</div>
                    <el-form-item prop="Qda" :rules="[{ required: true, message: 'Qda is required' }]">
                        <el-input v-model="TreScaRat.Qda" style="width: 300px; height:50px;" placeholder="Qda" />
                    </el-form-item>
                </div>
            </el-form>
        </div>

        <!-- 耗氧污染物削减量修正系数 -->
        <!-- <div class="mt-10">
            <p style="font-weight: bold; font-size: 20px; color: black;">耗氧污染物削减量修正系数</p>
            <el-form :model="OxyPolRemRat" class="flex flex-start flex-wrap gap-4 mt-3"  ref="CH4Ref">
                <el-form-item prop="k3" :rules="[{ required: true, message: 'k3 is required' }]">
                    <el-input v-model="OxyPolRemRat.k3" style="width: 300px; height:50px;" placeholder="k3" />
                </el-form-item>
                <el-form-item prop="X" :rules="[{ required: true, message: 'X is required' }]">
                    <el-input v-model="OxyPolRemRat.X" style="width: 300px; height:50px;" placeholder="X" />
                </el-form-item>
            </el-form>
        </div> -->

        <!-- 耗氧污染物削减量 -->
        <div class="mt-10">
            <p style="font-weight: bold; font-size: 20px; color: black;">耗氧污染物削减量</p>
            <el-form :model="OxyPolRem" class="flex flex-start flex-wrap gap-4 mt-3" ref="OxyPolRemRef">
                <!-- <el-form-item prop="X" :rules="[{ required: true, message: 'X is required' }]">
                    <el-input v-model="OxyPolRem.X" style="width: 300px; height:50px;" placeholder="X" />
                </el-form-item> -->

                <div class="flex">
                    <div class="w-[180px]">𝐵𝑂𝐷rb,𝑖
                        —— 污水生物处理单元第 i {{ iData }}平均进水 BOD5浓度，mg/L；</div>
                    <el-form-item prop="BODrbi" :rules="[{ required: true, message: 'BODrbi is required' }]">
                        <el-input v-model="OxyPolRem.BODrbi" style="width: 300px; height:50px;" placeholder="BODrbi" />
                    </el-form-item>
                </div>

                <div class="flex">
                    <div class="w-[180px]">𝐵𝑂𝐷eb,𝑖
                        —— 污水生物处理单元第 i {{ iData }}平均出水 BOD5浓度，mg/L；</div>
                    <el-form-item prop="BODebi" :rules="[{ required: true, message: 'BODebi is required' }]">
                        <el-input v-model="OxyPolRem.BODebi" style="width: 300px; height:50px;" placeholder="BODebi" />
                    </el-form-item>
                </div>

                <div class="flex">
                    <div class="w-[180px]">𝑇𝐾𝑁rb,𝑖
                        —— 污水生物处理单元第 i {{ iData }}平均进水 TKN 浓度，mg/L；</div>
                    <el-form-item prop="TKNrbi" :rules="[{ required: true, message: 'TKNrbi is required' }]">
                        <el-input v-model="OxyPolRem.TKNrbi" style="width: 300px; height:50px;" placeholder="TKNrbi" />
                    </el-form-item>
                </div>

                <div class="flex">
                    <div class="w-[180px]">NH3-Neb,i —— 污水生物处理单元第 i {{ iData }}平均出水 NH3-N 浓度，mg/L；</div>
                    <el-form-item prop="NH3Nebi" :rules="[{ required: true, message: 'NH3Nebi is required' }]">
                        <el-input v-model="OxyPolRem.NH3Nebi" style="width: 300px; height:50px;"
                            placeholder="NH3Nebi" />
                    </el-form-item>
                </div>

                <div class="flex">
                    <div class="w-[180px]">𝑄rb,𝑖
                        —— 污水生物处理单元第 i {{ iData }}进水水量，m<sup>3</sup>；</div>
                    <el-form-item prop="Qrbi" :rules="[{ required: true, message: 'Qrbi is required' }]">
                        <el-input v-model="OxyPolRem.Qrbi" style="width: 300px; height:50px;" placeholder="Qrbi" />
                    </el-form-item>
                </div>

                <div class="flex">
                    <div class="w-[180px]">𝑄eb,𝑖
                        —— 污水生物处理单元第 i {{ iData }}出水水量，m<sup>3</sup>。</div>
                    <el-form-item prop="Qebi" :rules="[{ required: true, message: 'Qebi is required' }]">
                        <el-input v-model="OxyPolRem.Qebi" style="width: 300px; height:50px;" placeholder="Qebi" />
                    </el-form-item>
                </div>

            </el-form>
        </div>

        <!-- 出水排放标准修正系数 -->
        <div class="mt-10">
            <p style="font-weight: bold; font-size: 20px; color: black;">出水排放标准修正系数</p>
            <el-form :model="WaterOutRat" class="flex flex-start flex-wrap gap-4 mt-3" ref="WaterOutRatRef">
                <div class="w-[180px]">本厂所执行的排放标准：规定的CODcr浓度限值</div>
                <el-form-item prop="CODcr" :rules="[{ required: true, message: 'WaterOutRat is required' }]">
                    <el-select v-model="WaterOutRat.CODcr" placeholder="CODcr浓度限值" size="large" style="width: 240px">
                        <el-option v-for="item in WaterOptions" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </el-form-item>
            </el-form>

        </div>




        <!-- 臭气控制程度修正系数 -->
        <div class="mt-10">
            <p style="font-weight: bold; font-size: 20px; color: black;">臭气控制程度修正系数</p>
            <el-form :model="OxyConRat" class="flex flex-start flex-wrap gap-4 mt-3" ref="OxyConRatRef">
                <div class="w-[180px]">除臭方式</div>
                <el-form-item prop="k5" :rules="[{ required: true, message: 'k5 is required' }]">
                    <el-select v-model="OxyConRat.k5" placeholder="除臭方式" size="large" style="width: 240px">
                        <el-option v-for="item in OxyConRatOptions" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </el-form-item>
            </el-form>

        </div>



        <!-- 低碳行为鼓励分数 -->
        <div class="mt-10">
            <p style="font-weight: bold; font-size: 20px; color: black;">低碳行为鼓励分数</p>
            <el-form :model="LowCStyle" class="flex flex-start flex-wrap gap-4 mt-3" ref="LowCStyleRef">
                <!-- v-for对于数组(item,index) item是当前项，index是当前项的下标 -->
                <!-- v-for对于对象(value,key) value是值，key是键 -->
                <div class="flex" v-for="(value, key, index) in LowCStyle">
                    <div class="w-[180px]">{{ LowCNames[index] }}</div>
                    <el-form-item :key="key" :prop="key" :rules="[{ required: true, message: `${key} is required` }]">
                        <el-input v-model="LowCStyle[key]" style="width: 300px; height:50px;"
                            :placeholder="LowCNames[index]" />
                    </el-form-item>
                </div>

            </el-form>
        </div>
    </div>

</template>