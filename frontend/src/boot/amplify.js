import Vue from 'vue'
import { Auth, API } from 'aws-amplify'

Amplify.configure({
    // OPTIONAL - if your API requires authentication
    Auth: {
        region: 'eu-central-1',
        userPoolId: 'eu-central-1_o4PSWlMBt',
        userPoolWebClientId: '5ldqfo06pug11h191bj98m4ctr'
    }
})

Vue.prototype.$api = axios
