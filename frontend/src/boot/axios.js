import axios from 'axios'
import { Loading } from 'quasar'

export default  ({ app, router, store, Vue }) => {
  Vue.prototype.$api = axios.create({
    baseURL: `https://${process.env.CfFrontHost}/`,
  })

  Vue.prototype.$api.interceptors.response.use(response => {
     return response;
  }, error => {
     router.push("/login")
     Loading.hide()
  })

  Vue.prototype.$api.interceptors.request.use(config => {
    console.log('Intercepting request')
    let token = localStorage.getItem('token', null)
    if (!token) {
      router.push("/login")
      Loading.hide()
    }

    config.headers['Authorization'] = token

    return config
  })

}
