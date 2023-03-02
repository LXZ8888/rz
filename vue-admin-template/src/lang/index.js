import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import Vue from 'vue'
import hmzh from './hmzh'
import hmen from './hmen'
import en from './en'
import zh from './zh'
import jsCookie from 'js-cookie'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: jsCookie.get('lang') || 'en',
  messages: {
    en: {
      // 英文
      xxx: 'message',
      ...enLocale,
      ...hmen,
      ...en
    },
    zh: {
      // 中文
      xxx: '信息',
      ...zhLocale,
      ...hmzh,
      ...zh
    }
  }
})
export default i18n
