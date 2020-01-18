<template>
  <div class="q-px-md">
    <BaseTable :columns="columns" :data="data" title="Pages"/>
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
          name: 'pagepath',
          required: true,
          label: 'Name',
          field: row => row.page,
          align: 'left'
        },
        {
          name: 'pageviews',
          required: true,
          label: 'Unique Pageviews',
          field: row => row.unq_pageviews,
          align: 'left'
        },
      ],

    }
  }
}
</script>

<style lang="css" scoped>
</style>
