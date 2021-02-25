import { NUMBER } from '../constant/reg'

export const
  sortNum = (a, b) => {
    return a - b
  },
  isNumber = (str) => {
    return new RegExp(NUMBER).test(str)
  },
  getLocale = () => {
    const lang = localStorage.getItem('locale') || sessionStorage.getItem('locale') || (navigator.systemLanguage ? navigator.systemLanguage : navigator.language)
     return lang.replace('-' , '_')
  }
