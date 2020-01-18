<template>
  <q-page class="flex flex-center">

    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h6 text-grey">Login</div>
      </q-card-section>

      <q-card-section>
        <q-input dense v-model="email" filled label="Username" class="q-mb-sm"/>
        <q-input dense v-model="password" filled label="Password" type="password" />
      </q-card-section>

      <q-separator />
      <q-card-actions align="right">
        <q-btn flat @click="doLogin">Log In</q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script type="text/javascript">
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');

export default {
  name: "Login",
  data () {
    return {
      email: null,
      password: null,
      loading: false
    }
  },
  methods: {
    doLogin() {
      this.$q.loading.show()

      var poolData = {
        UserPoolId : process.env.CognitoUserPoolId, // Your user pool id here
        ClientId : process.env.CognitoUserPoolClientId // Your client id here
      };

      const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

      var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
          Username : this.email,
          Password : this.password,
      });

      var userData = {
          Username : this.email,
          Pool : userPool
      };

      var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

      cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: (result) => {
            localStorage.setItem('token', result.getIdToken().getJwtToken())
            // console.log('access token + ' + result.getAccessToken().getJwtToken());
            // console.log('id token + ' + result.getIdToken().getJwtToken());
            // console.log('refresh token + ' + result.getRefreshToken().getToken());
            this.$router.push('/pageviews')
            this.$q.loading.hide()
          },
          onFailure: (err) => {
            this.$q.loading.hide()
            this.$q.notify({
              color: 'negative',
              message: err.message,
              position: 'top'
            })
          }
      });
    }
  },
  async mounted() {

  }
}
</script>
