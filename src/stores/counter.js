import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
export const useCounterStore = defineStore('counter', () => {

  // 评价等级

  const ifShow = ref(true)

  //建立一个映射，键是日期，值是oneDayResult
  const mapStandard = new Map()
  const mapEvaSta = new Map()
  const mapFingerpost = new Map()
  return {
    mapStandard, mapEvaSta, mapFingerpost, ifShow
  }
})
