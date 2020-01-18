<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="bg-blue-1 q-pa-lg">
        <q-toolbar-title class="text-grey-9">
          AMP Analytics
        </q-toolbar-title>

      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',

  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>
