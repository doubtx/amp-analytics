<template>
  <div class="q-px-md">
    <BaseTable :columns="columns" :data="data" title="Screens" :rowsPerPage="10"/>
  </div>
</template>

<script>
import BaseTable from 'components/BaseTable'

export default {
  components: {
    BaseTable
  },
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      columns: [
        {
          name: 'sw_group',
          required: true,
          label: 'Screen',
          field: row => row.sw_group,
          align: 'left'
        },
        {
          name: 'pageviews',
          required: true,
          label: 'Unique Pageviews',
          field: row => row.unq_pageviews,
          align: 'left'
        }
      ]

    }
  }
}
</script>

<style lang="css" scoped>
</style>
