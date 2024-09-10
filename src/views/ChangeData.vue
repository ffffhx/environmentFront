<script setup>
import requests from '@/assets/requests';
import { reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus';
const router = useRouter()
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
// const address = ref()
const id = ref()
const dialogShow = (scope) => {
    // address.value = scope.row.address
    id.value = scope.row.id
    dialogFormVisible.value = true
}
const changeData = async () => {
    await updateInfo()
    dialogFormVisible.value = false
    getInfo()

}
// const fe = reactive({
//     huabei: null,
//     dongbei: null,
//     huadong: null,
//     huazhong: null,
//     xibe: null,
//     nanfang: null
// })
const updateInfo = () => {
    // console.log(address.value, 'address');
    console.log(id.value, 'id');
    console.log(form.fe, 'form.fe');
    return  requests({
        url: '/api/update',
        method: 'post',
        data: {
            id: id.value,
            content: form.fe,
        }
    }).then((res) => {
        console.log(res);
        if (res == 1) {
            console.log('修改成功');
            ElMessage({
                message: '修改成功',
                type: 'success',
            })
        } else {
            console.log('修改失败');
            ElMessage({
                message: '修改失败',
                type: 'error',
            })
        }
    }).catch((err) => {
        console.log(err);
    })
}
const getInfo = () => {
    requests({
        url: '/api/getInfo',
        method: 'post',
    }).then((res) => {
        console.log('执行了getInfo');
        // console.log(res[0],'12333333333333333333333333333');
        tableData[0].address = res[0].content
        tableData[1].address = res[1].content
        tableData[2].address = res[2].content
        tableData[3].address = res[3].content
        tableData[4].address = res[4].content
        tableData[5].address = res[5].content
        console.log(tableData[0].address, 'tableData[0].address');

        // tableData.forEach((item, index) => {
        //     item.address = res[0][Object.keys(res[0])[index + 1]]
        // })
    }).catch((err) => {
        console.log(err);
    })
}
getInfo()


const tableData = reactive([
    // 下面一个对象是一行
    {
        date: '华北区域电网',
        name: '北京市、天津市、河北省、山西省、山东省、内蒙古自治区b',
        address: 'No. 189, Grove St, Los Angeles',
        id: 1
    },
    {
        date: '东北区域电网',
        name: '辽宁省、吉林省、黑龙江省、内蒙古自治区c',
        address: 'No. 189, Grove St, Los Angeles',
        id: 2
    },
    {
        date: '华东区域电网',
        name: '上海市、江苏省、浙江省、安徽省、福建省',
        address: 'No. 189, Grove St, Los Angeles',
        id: 3
    },
    {
        date: '华中区域电网',
        name: '河南省、湖北省、湖南省、江西省、四川省、重庆市',
        address: 'No. 189, Grove St, Los Angeles',
        id: 4
    },
    {
        date: '西北区域电网',
        name: '陕西省、甘肃省、青海省、宁夏回族自治区、新疆维吾尔自治区',
        address: 'No. 189, Grove St, Los Angeles',
        id: 5
    },
    {
        date: '南方区域电网',
        name: '广东省、广西壮族自治区、云南省、贵州省、海南省',
        address: 'No. 189, Grove St, Los Angeles',
        id: 6
    },
])

const toLast = () => {
    router.push({ path: '/showstandard' })
}
const form = reactive({
    fe: '',
})

</script>

<template>

    <el-dialog v-model="dialogFormVisible" title="更改默认值" width="500">
        <el-form :model="form">
            <el-form-item label="请输入新的fe" :label-width="formLabelWidth">
                <el-input v-model="form.fe" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="changeData">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>
    <div class="flex justify-center m-auto rounded-lg p-4 w-full">
        <el-table :data="tableData" stripe style="width: 80%" class="m-auto" :row-style="{ height: '50px' }">
            <!-- 下面是三个列 -->
            <el-table-column prop="date" label="电网名称" width="240" />
            <el-table-column prop="name" label="省份" width="520" />
            <el-table-column prop="address" label="fe[kgCO2/(kW.h)]" width="240px" />
            <el-table-column label="修改">
                <template #default="scope">
                    <el-button size="small" @click="dialogShow(scope)">
                        修改
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-button @click="toLast">
        返回上级
    </el-button>
</template>

<style scoped></style>
