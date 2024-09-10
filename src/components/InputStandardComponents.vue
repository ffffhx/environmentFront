<script setup>
import router from '@/router';
import { useCounterStore } from '@/stores/counter';
import { reactive, watch, ref } from 'vue';
import { ElMessage } from 'element-plus';
const counter = useCounterStore()

const props = defineProps({
    data: String,
    iData: String
})
console.log('counter.ifShow', counter.ifShow);

//每{{iData}}的结果

const oneDayResult = reactive({})

// N2O直接排放量
const N2O = reactive({
    mN2Oi: null,
    Qrbi: null,
    TNrbi: null,
    TNebi: null,
    EFN2O: 0.016,
    CN2ON2: 1.57
})


//N2O直接碳排放强度
const N2OCInt = reactive({
    EN2O: null,
    t: null,
    fN2O: 265,
    mN2Oi: null,
    Qrbi: null
})
// CH4直接排放量
const CH4 = reactive({
    mCH4i: null,
    Qrbi: null,
    CODrai: null,
    CODeai: null,
    SGSlud: null,
    SGWater: null,
    Pvi: null,
    p: 1.42,
    B0: 0.25,
    MCF: null,
    RCH4i: null,
})
// 污水处理过程 CH4修正因子。  即CH4.MCF
const MCFOptions = [
    {
        value: 0.003,
        label: '初沉池正常刮泥排泥、厌氧和缺氧区充分混合搅拌、曝气池好氧区曝气均匀时，各构筑物内无污泥淤积'
    },
    {
        value: 0.03,
        label: '存在初沉池刮泥排泥不正常、厌氧或缺氧区搅拌不充分、曝气池好氧区曝气不均匀等状况时，构筑物内存在污泥淤积'
    }
]


//CH4直接碳排放强度
const CH4CInt = reactive({
    ECH4: null,
    fCH4: 28,
    mCH4i: null,
    Qrbi: null
})
//  化石燃料燃烧CO2直接排放量
const CO2 = reactive({
    mCO2i: null,
    fc: 2.7725,
    Mfj: null,
    j: null,
    l: null
})
const CO2Mfj = reactive({
    LianJiao: 0,
    Yan: 0,
    NoYan: 0,
    JiaoC: 0,
    YuanOil: 0,
    QiOil: 0,
    MeiOil: 0,
    ChaiOil: 0,
    ShiYouQi: 0,
    GanQi: 0,
    MeiJiaoOil: 0,
    TianRanQi: 0,
    JiaoLuQi: 0,
    JiaoCQi: 0,
})
const CO2Data = [
    103398,
    103398,
    107098,
    19498,
    73739,
    69739,
    72339,
    74539,
    63267,
    57767,
    89498,
    56267,
    44567,
    10867
]
const CO2MfjNames = [
    '炼焦煤',
    '烟煤',
    '无烟煤',
    '焦炭',
    '原油',
    '汽油',
    '煤油',
    '柴油',
    '液化石油气',
    '炼厂千气',
    '煤焦油',
    '天然气',
    '焦炉煤气',
    '焦炭制气'
]
// CO2直接排放强度
const CO2Int = reactive({
    ECO2: null,
    mCO2i: null,
    Qrbi: null
})


// 直接碳排放强度
const IntC = reactive({
    Ed: null,
    EN2O: null,
    ECH4: null,
    ECO2: null
})


// 电耗碳排放强度
const EleCInt = reactive({
    Ee: null,
    fe: null,
    Wi: null,
    Qrbi: null
})

// 各地区对应的电耗碳排放因子fe
const EleArea = reactive({
    HuaBei: 0.9419,
    DongBei: 1.0826,
    HuaDong: 0.7921,
    HuaZhong: 0.8587,
    XiBei: 0.8922,
    NanFang: 0.8042
})


// 电耗碳排放因子fe 的各种地区
const AreaOptions = [
    {
        value: EleArea.HuaBei,
        label: '华北区域电网(北京市、天津市、河北省、山东省、山西省、内蒙古自治区)',
    },
    {
        value: EleArea.DongBei,
        label: '东北区域电网(辽宁省、吉林省、黑龙江省、内蒙古自治区)',
    },
    {
        value: EleArea.HuaDong,
        label: '华东区域电网(上海市、江苏省、浙江省、安徽省、福建省)',
    },
    {
        value: EleArea.HuaZhong,
        label: '华中区域电网(河南省、湖北省、湖南省、江西省、四川省、重庆市)',
    },
    {
        value: EleArea.XiBei,
        label: '西北区域电网(陕西省、甘肃省、青海省、宁夏回族自治区、新疆维吾尔自治区)',
    },
    {
        value: EleArea.NanFang,
        label: '南方区域电网(广东省、广西壮族自治区、云南省、贵州省、海南省)',
    }
]
// 热耗碳排放强度
const HotCInt = reactive({
    Eh: null,
    fc: 2.7725,
    Mhi: null,
    Qrbi: null
})


// NaClO浓度 以及是否出现选择框
const NaClO = reactive({
    ifHave: false,
    Con: null
})

// 次氯酸钠浓度
const NaClOOptions = [
    {
        value: 1,
        label: '15%NaClO',
    },
    {
        value: 2 / 3,
        label: '10%NaClO',
    },
    {
        value: 1 / 150,
        label: '0.1%NaClO',
    }
]


// 药剂浓度
const McgCon = reactive({
    Jian: 0,
    NaOH: 0,
    PAC: 0,
    CH3OH: 0,
    AlSO4: 0,
    PAM: 0,
    FeCl3: 0,
    CaOH2: 0,
    Otherxvning: 0,
    CiNaClO: 0,
    Cl2: 0,
    O3: 0,
    O2H2O: 0,
    Otherxiaodu: 0,
    Otheryao: 0,
    Cifen: 0,
    FeSO4: 0,
    C2H3NaO2: 0,
    NaClO: 0,
    Hcl: 0,
})
// 药剂质量
const McgM = reactive({
    Jian: 0,
    NaOH: 0,
    PAC: 0,
    CH3OH: 0,
    AlSO4: 0,
    PAM: 0,
    FeCl3: 0,
    CaOH2: 0,
    Otherxvning: 0,
    CiNaClO: 0,
    Cl2: 0,
    O3: 0,
    O2H2O: 0,
    Otherxiaodu: 0,
    Otheryao: 0,
    Cifen: 0,
    FeSO4: 0,
    C2H3NaO2: 0,
    NaClO: 0,
    Hcl: 0,
})
// （质量*浓度） 
const MatC = reactive({
    Jian: 0,
    NaOH: 0,
    PAC: 0,
    CH3OH: 0,
    AlSO4: 0,
    PAM: 0,
    FeCl3: 0,
    CaOH2: 0,
    Otherxvning: 0,
    CiNaClO: 0,
    Cl2: 0,
    O3: 0,
    O2H2O: 0,
    Otherxiaodu: 0,
    Otheryao: 0,
    Cifen: 0,
    FeSO4: 0,
    C2H3NaO2: 0,
    NaClO: 0,
    Hcl: 0
})
// 物耗碳排放量的各种排放因子
const MatCStyle = reactive({
    Jian: 1.74,
    NaOH: 1.12,
    PAC: 1.62,
    CH3OH: 1.54,
    AlSO4: 0.5,
    PAM: 1.5,
    FeCl3: 2.71,
    CaOH2: 0.68,
    Otherxvning: 2.5,
    CiNaClO: 0.92,
    Cl2: 2,
    O3: 8.01,
    O2H2O: 1.14,
    Otherxiaodu: 1.4,
    Otheryao: 1.6,
    Cifen: 0.0081,
    FeSO4: 0.23,
    C2H3NaO2: 2.9,
    NaClO: 5.11,
    Hcl: 1.2
})
// 物耗碳排放量
const MatCMci = reactive({
    Mci: null
})

// 物耗碳排放强度
const MatCInt = reactive({
    Ec: null,
    Mci: null,
    Qrbi: null
})

//各种化学药剂的名称
const MatConNames = [
    '碱度',
    '氢氧化钠（50% in H2O）',
    '聚合氯化铝（PAC）',
    '甲醇',
    '硫酸铝',
    '聚丙烯酰胺（PAM）',
    '六水三氯化铁',
    '石灰',
    '其他絮凝剂',
    '次氯酸钠',
    '液氯',
    '臭氧（液）',
    '双氧水（50% in H2O）',
    '其他消毒剂',
    '其他药剂',
    '磁粉',
    '硫酸铁',
    '乙酸钠',
    '氯酸钠',
    '盐酸'
]

// 间接碳排放强度
const IndCInt = reactive({
    Ei: null,
    Ee: null,
    Eh: null,
    Ec: null
})
// 碳排放强度
const CInt = reactive({
    Ef: null,
    Ed: null,
    Ei: null
})

//  总氮去除率修正系数
const TotNRemRat = reactive({
    k1: null,
    nTN: null,
    t: null,
    TNrbi: null,
    TNebi: null
})

// 处理规模修正系数
const TreScaRat = reactive({
    k2: null,
    Qrbi: null,
    Qda: null
})


// 耗氧污染物削减量X  耗氧污染物削减量修正系数k3
const OxyPolRem = reactive({
    k3: null,
    X: null,
    t: null,
    BODrbi: null,
    BODebi: null,
    TKNrbi: null,
    NH3Nebi: null,
    Qrbi: null,
    Qebi: null
})



// 出水排放标准修正系数
const WaterOutRat = reactive({
    k4: null,
    CODcr: null,
})
// 出水排放标准修正系数选择项
const WaterOptions = [
    {
        value: '>=60',
        label: '>=60',
    },
    {
        value: '=50',
        label: '=50',
    },
    {
        value: '=40',
        label: '=40',
    },
    {
        value: '<=30',
        label: '<=30',
    }
]
// 臭气控制程度修正系数
const OxyConRat = reactive({
    k5: null
})
// 臭气控制程度修正系数选项
const OxyConRatOptions = [
    {
        value: 1.00,
        label: '无除臭',
    },
    {
        value: 0.95,
        label: '部分除臭',
    },
    {
        value: 0.90,
        label: '加盖',
    },
    {
        value: 0.79,
        label: '地下室',
    }
]
// 直接碳排放强度
const DirCIRat = reactive({
    Edc: null,
    EN2O: null,
    k1: null,
    ECH4: null,
    ECO2: null
})
// 间接碳排放修正强度计算
const UndCIRat = reactive({
    Eic: null,
    Ee: null,
    Eh: null,
    Ec: null,
    k2: null,
    k3: null,
    k4: null,
    k5: null
})
// 评价碳排放强度计算
const EvaCI = reactive({
    Ep: null,
    Edc: null,
    Eic: null
})
// 评价碳排放强度分数
const EvaCIScore = reactive({
    F1: null,
    Ep: null
})
// 低碳行为鼓励分数
const LowCScore = reactive({
    F2: null,
    Sq: null,
    n: null
})

// 低碳行为鼓励分数的各种类型
const LowCStyle = reactive({
    DeslagEva: null,
    DeslagChange: null,
    PumpEva: null,
    PunpChange: null,
    MixEva: null,
    MixChange: null,
    AeraEva: null,//曝气
    AeraChange: null,
    SludEva: null,//污泥
    SludChange: null,
    ProductionEva: null,
    DeslagEva: null,
    PreEva: null,
    OneEva: null,
    TwoEva: null,
    DeepEva: null,
    DeoEva: null,//除臭
    SludEleEva: null,//污泥用电
    DeslagEva: null,
    AeraEleEva: null,//曝气用电
    SelectChe: null,
    OptPoint: null,//优化投加点
    SetDrug: null,
    TimeSRT: null,
    TimeRate: null,
    SetLowC: null,
    SludStable: null,
    CH4Use: null,
    LightEle: null,
    SludWaterPump: null,
    LocalTest: null,
    LowCReport: null,
})


// 各种低碳行为的名称
const LowCNames = [
    '除渣除砂设备效率评估',
    '除渣除砂设备改造',
    '泵组效率评估',
    '泵组改造',
    '混合搅拌设备效率评估',
    '混合搅拌设备改造',
    '曝气系统效率评估',
    '曝气系统改造',
    '污泥脱水系统效率评估',
    '污泥脱水系统改造',
    '生产用电和生活用电单独计量',
    '预处理单元用电单独计量与评估',
    '一级处理单元用电单独计量与评估',
    '二级处理单元用电单独计量与评估',
    '深度处理单元用电单独计量与评估',
    '除臭系统用电单独计量与评估',
    '污泥处理单元用电单独计量与评估',
    '曝气系统用电单独计量',
    '通过实验优选化学药剂种类',
    '优化投加点',
    '设置精准加药控制系统',
    '定期校核并调整SRT',
    '定期校核并调整回流比',
    '建设低碳信息管理系统',
    '采用厌氧消化或高温好氧发酵实现污泥稳定化',
    '沼气回收与利用',
    '光伏发电',
    '污水源热泵',
    '开展 CH4、N2O 现场监测并形成监测报告',
    '按照本标准开展低碳运行自评价并形成年度低碳运行评价报告'
]
// 低碳运行评价总分数
const LowCTotalScore = reactive({
    F: null,
    F1: null,
    F2: null,
    x1: null,
    x2: null
})

// 评价等级
const Level = reactive({
    Level: null
})




// N2O直接排放量的计算
watch(
    () => [N2O.Qrbi, N2O.TNrbi, N2O.TNebi, N2O.EFN2O, N2O.CN2ON2],
    ([newQrbi, newTNrbi, newTNebi, newEFN2O, newCN2ON2]) => {
        if (!props.data) {
            ElMessage({
                message: '请先选择日期后再输入',
                type: 'error',
                showClose: true,
                duration: 2000
            })
        }
        N2O.mN2Oi = newQrbi * (newTNrbi - newTNebi) * newEFN2O * newCN2ON2 / 1000
        console.log(N2O.mN2Oi, 'N2O.mN2Oi N2O直接排放量的计算');
    }
)




// N2O直接碳排放强度的计算
watch(
    () => [N2OCInt.fN2O, N2O.mN2Oi, N2O.Qrbi],
    ([newfN2O, newmN2Oi, newQrbi]) => {
        N2OCInt.EN2O = newfN2O * newmN2Oi / newQrbi
        console.log(N2OCInt.EN2O, 'N2OCInt.EN2O N2O直接碳排放强度的计算');
    }
)


//SG的计算
// watch(
//     () => [SG],
//     () => {
//         CH4.SG = SG.Slud * (1 - SG.Water) * 1000
//     },
//     {
//         deep: true
//     }
// )





// CH4直接排放量的计算
watch(
    () => [N2O.Qrbi, CH4.CODrai, CH4.CODeai, CH4.SGSlud, CH4.SGWater, CH4.Pvi, CH4.p, CH4.B0, CH4.MCF, CH4.RCH4i],
    ([newQrbi, newCODrai, newCODeai, newSGSlud, newSGWater, newPvi, newP, newB0, newMCF, newRCH4i]) => {
        CH4.mCH4i = ((newQrbi * (newCODrai - newCODeai) / 1000) - ((newSGSlud * (1 - newSGWater / 100) * 1000) * newPvi * 0.01 * newP)) * newB0 * newMCF - newRCH4i * 0.717
        console.log(newSGSlud, 'newSGSlud');
        console.log(newSGWater, 'newSGWater');
        console.log(newMCF, 'newMCF');

        console.log(CH4.mCH4i, 'CH4.mCH4i');
        if (newCODrai && newCODeai && newSGSlud && newSGWater && newPvi && newP && newB0 && newMCF && newRCH4i) {
            console.log('全部输入完成');
            if (CH4.mCH4i < 0) {
                ElMessage({
                    message: '请修正SGi和Pv,i，尤其应调低Pv,i',
                    type: 'error',
                    showClose: true,
                    duration: 2000
                })
            }
        }
    }
)

// CH4直接碳排放强度
watch(
    () => [CH4.mCH4i],
    ([newmCH4i]) => {
        CH4CInt.ECH4 = CH4CInt.fCH4 * newmCH4i / N2O.Qrbi
        console.log(CH4CInt.ECH4, 'CH4CInt.ECH4     CH4直接碳排放强度');
    }
)


// 化石燃料燃烧CO2直接排放量
watch(
    () => [CO2Mfj, CH4],
    ([newCO2Mfj, newCH4]) => {
        console.log('asfdbhkjlgasfdnjlkasdfgbnjkadfgsbhjlko;');
        if (Object.values(newCO2Mfj).every(value => value !== null)) {
            Object.keys(newCO2Mfj).forEach((key, index) => {
                let temp = 0
                temp = CO2.fc * newCO2Mfj[key] * CO2Data[index]
                CO2.mCO2i += temp
            })
        }
        console.log(CO2.mCO2i, 'CO2直接排放量');

    },
    {
        deep: true
    }
)

// CO2直接排放强度
watch(
    () => [CO2.mCO2i, N2O.Qrbi],
    ([]) => {
        CO2Int.ECO2 = CO2.mCO2i / N2O.Qrbi
        console.log(CO2Int.ECO2, 'CO2Int.ECO2');

    }
)

// 直接碳排放强度
watch(
    () => [N2OCInt.EN2O, CH4CInt.ECH4, CO2Int.ECO2],
    () => {
        IntC.Ed = N2OCInt.EN2O + CH4CInt.ECH4 + CO2Int.ECO2
        console.log(IntC.Ed, 'IntC.Ed');

    }
)


// 电耗碳排放强度
watch(
    () => [EleCInt],
    ([newEleCInt]) => {
        EleCInt.Ee = newEleCInt.fe * newEleCInt.Wi / N2O.Qrbi
        console.log(EleCInt.Ee, 'EleCInt.Ee');
    },
    { deep: true }
)

// 热耗碳排放强度
watch(
    () => [HotCInt],
    ([newHotCInt]) => {
        HotCInt.Eh = newHotCInt.fc * newHotCInt.Mhi
        console.log(HotCInt.Eh, 'HotCInt.Eh');
    },
    { deep: true }
)

// 物耗碳（质量*浓度）
watch(
    () => [McgCon, McgM],
    ([newMcgCon, newMcgM]) => {
        console.log(newMcgCon, newMcgM, 'newMcgCon, newMcgM');
        for (const key in newMcgCon) {
            MatC[key] = (newMcgCon[key] || 0) * (newMcgM[key] || 0)
            console.log(MatC[key], 'MatC[key]');
        }
        if (McgM.CiNaClO !== 0) {
            NaClO.ifHave = true
        } else {
            NaClO.ifHave = false
        }
    },
    { deep: true }
)



// 物耗碳排放量
watch(
    () => [MatC, NaClO],
    () => {
        let temp = 0;
        for (const key in MatCStyle) {
            temp += Number(MatCStyle[key] * MatC[key])
        }
        if (NaClO.Con) {
            MatCMci.Mci = temp * NaClO.Con;
        } else {
            MatCMci.Mci = temp
        }
        console.log(MatCMci.Mci, '物耗排放量');
    },
    { deep: true }
)

// 物耗碳排放强度（Ec）
watch(
    () => [MatCMci.Mci],
    () => {
        MatCInt.Ec = MatCMci.Mci / N2O.Qrbi
        console.log(MatCInt.Ec, 'MatCInt.Ec');

    }
)


// 间接碳排放强度
watch(
    () => [EleCInt.Ee, HotCInt.Eh, MatCInt.Ec],
    () => {
        IndCInt.Ei = EleCInt.Ee + HotCInt.Eh + MatCInt.Ec
        console.log(IndCInt.Ei, 'IndCInt.Ei');

    }
)

// 碳排放强度
watch(
    () => [IntC.Ed, IndCInt.Ei],
    () => {
        CInt.Ef = IntC.Ed + IndCInt.Ei
        console.log('CInt.Ef', CInt.Ef);

    }
)



// 总氮去除率修正系数
watch(
    () => [N2O],
    ([newN2O]) => {
        TotNRemRat.nTN = (N2O.TNrbi - N2O.TNebi) / N2O.TNrbi
        console.log(TotNRemRat.nTN, 'TotNRemRat.nTN');
        if (TotNRemRat.nTN < 0.6) {
            TotNRemRat.k1 = 1.00
        } else if (TotNRemRat.nTN >= 0.6 && TotNRemRat.nTN < 0.65) {
            TotNRemRat.k1 = 0.9
        } else if (TotNRemRat.nTN >= 0.65 && TotNRemRat.nTN < 0.7) {
            TotNRemRat.k1 = 0.75
        } else if (TotNRemRat.nTN >= 0.7 && TotNRemRat.nTN < 0.75) {
            TotNRemRat.k1 = 0.60
        } else if (TotNRemRat.nTN >= 0.75 && TotNRemRat.nTN < 0.8) {
            TotNRemRat.k1 = 0.45
        } else if (TotNRemRat.nTN >= 0.8 && TotNRemRat.nTN < 0.85) {
            TotNRemRat.k1 = 0.30
        } else if (TotNRemRat.nTN >= 0.85 && TotNRemRat.nTN < 0.9) {
            TotNRemRat.k1 = 0.15
        } else if (TotNRemRat.nTN >= 0.9 && TotNRemRat.nTN < 0.95) {
            TotNRemRat.k1 = 0.05
        } else if (TotNRemRat.nTN >= 0.95) {
            TotNRemRat.k1 = 0.00
        }
        console.log(TotNRemRat.k1, 'TotNRemRat.k1');
        console.log('123123123123213');

    },
    { deep: true }
)

// 处理规模修正系数
watch(
    () => [TreScaRat],
    ([newTreScaRat]) => {
        if (newTreScaRat.Qda > 300000) {
            TreScaRat.k2 = 1.10
        } else {
            TreScaRat.k2 = 0.91 + 0.056 * Math.log(newTreScaRat.Qda / 10000)
            console.log(TreScaRat.k2, 'TreScaRat.k2');
        }
    },
    { deep: true }
)

// 耗氧污染物削减量
watch(
    () => [OxyPolRem],
    ([newOxyPolRem]) => {
        OxyPolRem.X = (N2O.Qrbi * (newOxyPolRem.BODrbi + 3.5 * N2O.TNrbi) - newOxyPolRem.Qebi * (newOxyPolRem.BODebi + 3.5 * newOxyPolRem.NH3Nebi)) / newOxyPolRem.Qebi
        console.log(OxyPolRem.X, 'OxyPolRem.X');
        if (OxyPolRem.X > 500) {
            OxyPolRem.k3 = 0.125
        } else {
            OxyPolRem.k3 = 1.875 - 0.0035 * OxyPolRem.X
        }
        console.log(OxyPolRem.k3, 'OxyPolRem.k3');

    },
    { deep: true }
)

// 出水排放标准修正系数
watch(
    () => [WaterOutRat],
    ([newWaterOutRat]) => {
        if (newWaterOutRat.CODcr == '>=60') {
            WaterOutRat.k4 = 1.18
        } else if (newWaterOutRat.CODcr == '=50') {
            WaterOutRat.k4 = 1.00
        } else if (newWaterOutRat.CODcr == '40') {
            WaterOutRat.k4 = 0.82
        } else if (newWaterOutRat.CODcr == '<=30') {
            WaterOutRat.k4 = 0.64
        }
        console.log(WaterOutRat.k4, 'WaterOutRat.k4');
        console.log(newWaterOutRat.CODcr, 'newWaterOutRat.CODcr');

    }, { deep: true }
)

// 臭气控制程度修正系数
watch(
    () => [OxyConRat],
    () => {
        console.log(OxyConRat.k5, 'OxyConRat.k5');

    }, { deep: true }
)


// 直接碳排放修正强度
watch(
    () => [N2OCInt.EN2O, TotNRemRat.k1, CH4CInt.ECH4, CO2Int.ECO2],
    () => {
        DirCIRat.Edc = N2OCInt.EN2O * TotNRemRat.k1 + CH4CInt.ECH4 + CO2Int.ECO2
        console.log(DirCIRat.Edc, 'DirCIRat.Edc');
    }
)

// 间接碳排放修正强度
watch(
    () => [EleCInt.Ee, TreScaRat.k2, OxyConRat.k5, HotCInt.Eh, MatCInt.Ec, OxyPolRem.k3, WaterOutRat.k4],
    () => {
        UndCIRat.Eic = (EleCInt.Ee * TreScaRat.k2 * OxyConRat.k5 + HotCInt.Eh + MatCInt.Ec) * OxyPolRem.k3 * WaterOutRat.k4
        console.log(UndCIRat.Eic, 'UndCIRat.Eic');
    }
)



//只有单位是年的时候才可以

watch(
    () => [props.iData],
    () => {

        if (props.iData == '年' && props.nowDay) {
            console.log('gfdbnjkhasdfojh');
            console.log('props.iData', props.iData);
            console.log('props.nowDay', props.nowDay);


            // 评价碳排放强度计算
            watch(
                () => [UndCIRat.Eic, DirCIRat.Edc],
                () => {
                    EvaCI.Ep = DirCIRat.Edc + UndCIRat.Eic
                    console.log(EvaCI.Ep, 'EvaCI.Ep');

                },
                { deep: true }
            )
            // 评价碳排放强度分数
            watch(
                () => [EvaCI.Ep],
                () => {
                    if (EvaCI.Ep < 0.164) {
                        EvaCIScore.F1 = 100
                    } else if (EvaCI.Ep >= 0.164 && EvaCI.Ep < 0.451) {
                        EvaCIScore.F1 = 128.64 - 174.3 * EvaCI.Ep
                    } else if (EvaCI.Ep >= 0.451) {
                        EvaCIScore.F1 = 50
                    }
                    console.log(EvaCIScore.F1, 'EvaCIScore.F1');
                })

            // 低碳行为鼓励分数
            watch(
                () => [LowCStyle],
                ([newLowCStyle]) => {
                    if (Object.values(newLowCStyle).every(value => value !== null)) {
                        console.log('不为空');
                        let temp = 0;
                        for (const key in newLowCStyle) {
                            temp += Number(newLowCStyle[key])
                        }
                        LowCScore.F2 = temp;
                    }
                    console.log(LowCScore.F2, 'LowCScore.F2');
                }, { deep: true })

            // 低碳运行评价总分数
            watch(
                () => [LowCScore.F2, EvaCIScore.F1],
                ([newF2, newF1]) => {
                    LowCTotalScore.F = newF2 * 0.2 + newF1 * 0.8
                    console.log(newF2, 'LnewF2');
                    console.log(newF1, 'newF1');

                    console.log(LowCTotalScore.F, 'LowCTotalScore.F');
                })

            // 评价等级
            watch(
                () => [LowCTotalScore.F],
                () => {
                    if (LowCTotalScore.F <= 100 && LowCTotalScore.F >= 85) {
                        Level.Level = '一级'
                    } else if (LowCTotalScore.F >= 75 && LowCTotalScore.F < 85) {
                        Level.Level = '二级'
                    } else if (LowCTotalScore.F >= 60 && LowCTotalScore.F < 75) {
                        Level.Level = '三级'
                    } else {
                        Level.Level = '超出范围'
                    }
                    console.log(Level.Level, 'Level.Level');

                })
        }


    }
)





// const emit = defineEmits(['pushAllResult'])
const pushAllResult = () => {
    oneDayResult.N2O = N2O.mN2Oi
    oneDayResult.CH4 = CH4.mCH4i
    oneDayResult.CO2 = CO2.mCO2i
    oneDayResult.EleCInt = EleCInt.Ee
    oneDayResult.HotCInt = HotCInt.Eh
    oneDayResult.MatCMci = MatCMci.Mci  //物耗碳排放量
    oneDayResult.CInt = CInt.Edc
    oneDayResult.EvaCI = EvaCI.Ep
    oneDayResult.EvaCIScore = EvaCIScore.F1
    oneDayResult.LowCScore = LowCScore.F2
    oneDayResult.LowCTotalScore = LowCTotalScore.F
    oneDayResult.Level = Level.Level
    oneDayResult.IntC = IntC.Ed//[7]
    oneDayResult.IndCInt = IndCInt.Ei//[12]
    oneDayResult.CInt = CInt.Ef//[13]
    oneDayResult.Qrbi = N2O.Qrbi//进水量
    // oneDayResult.DirCIRat = DirCIRat.Edc// 直接碳排放强度
    // oneDayResult.UndCIRat = UndCIRat.Eic//间接碳排放强度
    // oneDayResult.CH4CInt = CH4CInt.ECH4
    // oneDayResult.N2OCInt = N2OCInt.EN2O
    // oneDayResult.MatCInt = MatCInt.Ec   //物耗碳排放强度
    // oneDayResult.CO2Int = CO2Int.ECO2
    // oneDayResult.IntC = IntC.Ed//碳排放强度
    counter.mapStandard.set(props.data, oneDayResult)
    console.log('set map done');

    console.log('counter.mapStandard', counter.mapStandard);
    // ElMessage({
    //     message: '请输入当前日期的值。',
    //     type: 'success',
    //     showClose: true,
    //     duration: 2000
    // })
}

const N2ORef = ref(null)
const CH4Ref = ref(null)
const EleCIntRef = ref(null)
const HotCIntRef = ref(null)
const McgMRef = ref(null)
const McgConRef = ref(null)
const TreScaRatRef = ref(null)
const OxyPolRemRef = ref(null)
const WaterOutRatRef = ref(null)
const OxyConRatRef = ref(null)
const LowCStyleRef = ref(null)
const NaClORef = ref(null)
const toShowStandard = () => {
    // const isN2OValid = N2ORef.value.validate()
    // const isCH4Valid = CH4Ref.value.validate()
    // const isEleCIntValid = EleCIntRef.value.validate()
    // const isHotCIntValid = HotCIntRef.value.validate()
    // const isMcgMValid = McgMRef.value.validate()
    // const isMcgConValid = McgConRef.value.validate()
    // const isTreScaRatValid = TreScaRatRef.value.validate()
    // const isOxyPolRemValid = OxyPolRemRef.value.validate()
    // const isWaterOutRatValid = WaterOutRatRef.value.validate()
    // const isOxyConRatValid = OxyConRatRef.value.validate()
    // const isLowCStyleValid = LowCStyleRef.value.validate()
    // const isNaClOValid = NaClORef.value.validate()

    // const isAllValid = isN2OValid && isCH4Valid && isEleCIntValid && isHotCIntValid && isMcgMValid && isMcgConValid && isTreScaRatValid && isOxyPolRemValid && isWaterOutRatValid && isOxyConRatValid && isLowCStyleValid && isNaClOValid

    // if (!isAllValid) {
    //     ElMessage({
    //         message: '请输入全部数据',
    //         type: 'error',
    //         showClose: true,
    //         duration: 2000
    //     })
    //     return
    // } else {
    //     router.push('/showstandard')
    // }
    router.push('/showstandard')

}
const ifNull = () => {
    if (!N2O.mN2Oi) {
        return 1
    } else {
        return 0
    }
}

defineExpose({ pushAllResult, toShowStandard, ifNull })



const testScript = () => {
    console.log('脚本测试');

    N2O.Qrbi = 10000
    N2O.TNrbi = 30
    N2O.TNebi = 10
    CH4.CODeai = 10
    CH4.CODrai = 200
    CH4.Pvi = 50
    CH4.SGSlud = 5
    CH4.SGWater = 80
    CH4.RCH4i = 0
    CH4.MCF = 0.003
    CO2Mfj.LianJiao = 0
    EleCInt.fe = 0.8042
    EleCInt.Wi = 1800
    HotCInt.Mhi = 0
    McgCon.PAM = 1
    McgCon.CiNaClO = 1
    McgCon.FeSO4 = 1
    McgCon.C2H3NaO2 = 1
    McgM.PAM = 14.25
    McgM.CiNaClO = 17.8
    McgM.FeSO4 = 155
    McgM.C2H3NaO2 = 79
    NaClOOptions[0].value = 1
    TreScaRat.Qda = 10000
    OxyPolRem.BODrbi = 100
    OxyPolRem.BODebi = 6
    OxyPolRem.NH3Nebi = 0.07
    OxyPolRem.Qebi = 9500
    // OxyPolRem.Qrbi = 10000
    // OxyPolRem.TKNrbi = 100
    WaterOutRat.CODcr = 40
    OxyConRat.k5 = 0.95
    watch(
        () => [props.iData],
        () => {
            console.log('脚本执行');

            if (props.iData == '年') {
                LowCStyle.DeslagEva = 3
                LowCStyle.DeslagChange = 0
                LowCStyle.PumpEva = 2
                LowCStyle.PunpChange = 0
                LowCStyle.MixEva = 1
                LowCStyle.MixChange = 0
                LowCStyle.AeraEva = 3
                LowCStyle.AeraChange = 0
                LowCStyle.SludEva = 1
                LowCStyle.SludChange = 0
                LowCStyle.ProductionEva = 0
                LowCStyle.PreEva = 0
                LowCStyle.OneEva = 0
                LowCStyle.TwoEva = 0
                LowCStyle.DeepEva = 0
                LowCStyle.DeoEva = 0
                LowCStyle.SludEleEva = 0
                LowCStyle.AeraEleEva = 0
                LowCStyle.SelectChe = 2
                LowCStyle.OptPoint = 1
                LowCStyle.SetDrug = 0
                LowCStyle.TimeSRT = 5
                LowCStyle.TimeRate = 3
                LowCStyle.SetLowC = 0
                LowCStyle.SludStable = 0
                LowCStyle.CH4Use = 0
                LowCStyle.LightEle = 0
                LowCStyle.SludWaterPump = 0
                LowCStyle.LocalTest = 5
                LowCStyle.LowCReport = 6
            }
        }
    )

}




</script>
<template>
    <div class="flex flex-col ml-4">
        <button @click="testScript">一键输入</button>
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
        <!-- 化石燃料燃烧CO2直接排放量  -->
        <div class="mt-10">
            <p style="font-weight: bold; font-size: 20px; color: black;">化石燃料燃烧CO2直接排放量</p>
            <el-form :model="CO2Mfj" class="flex flex-start flex-wrap gap-4 mt-3" ref="CO2MfjRef">
                <div class="flex" v-for="(value, key, index) in CO2Mfj">
                    <div class="w-[180px]">{{ CO2MfjNames[index] }}</div>
                    <el-form-item :key="key" :prop="key" :rules="[{ required: true, message: `${key} is required` }]">
                        <el-input v-model="CO2Mfj[key]" style="width: 300px; height:50px;" :placeholder="key" />
                    </el-form-item>
                </div>
            </el-form>
        </div>

        <!-- CO2直接排放强度 -->
        <!-- <div class="mt-10">
            <p style="font-weight: bold; font-size: 20px; color: black;">CO2直接排放强度</p>
            <el-form :model="CO2Int" class="flex flex-start flex-wrap gap-4 mt-3"  ref="CH4Ref">
                <el-form-item prop="mCO2i" :rules="[{ required: true, message: 'mCO2i is required' }]">
                    <el-input v-model="CO2Int.mCO2i" style="width: 300px; height:50px;" placeholder="mCO2i" />
                </el-form-item>
                <el-form-item prop="Qrbi" :rules="[{ required: true, message: 'Qrbi is required' }]">
                    <el-input v-model="CO2Int.Qrbi" style="width: 300px; height:50px;" placeholder="Qrbi" />
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

                <!-- <div class="flex">
                    <div class="w-[180px]">𝑇𝐾𝑁rb,𝑖
                        —— 污水生物处理单元第 i {{ iData }}平均进水 TKN 浓度，mg/L；</div>
                    <el-form-item prop="TKNrbi" :rules="[{ required: true, message: 'TKNrbi is required' }]">
                        <el-input v-model="OxyPolRem.TKNrbi" style="width: 300px; height:50px;" placeholder="TKNrbi" />
                    </el-form-item>
                </div> -->

                <div class="flex">
                    <div class="w-[180px]">NH3-Neb,i —— 污水生物处理单元第 i {{ iData }}平均出水 NH3-N 浓度，mg/L；</div>
                    <el-form-item prop="NH3Nebi" :rules="[{ required: true, message: 'NH3Nebi is required' }]">
                        <el-input v-model="OxyPolRem.NH3Nebi" style="width: 300px; height:50px;"
                            placeholder="NH3Nebi" />
                    </el-form-item>
                </div>

                <!-- <div class="flex">
                    <div class="w-[180px]">𝑄rb,𝑖
                        —— 污水生物处理单元第 i {{ iData }}进水水量，m<sup>3</sup>；</div>
                    <el-form-item prop="Qrbi" :rules="[{ required: true, message: 'Qrbi is required' }]">
                        <el-input v-model="OxyPolRem.Qrbi" style="width: 300px; height:50px;" placeholder="Qrbi" />
                    </el-form-item>
                </div> -->

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
        <div class="mt-10" v-if="iData === '年'">
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