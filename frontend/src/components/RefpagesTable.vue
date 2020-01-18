<template>
  <div class="q-px-md">
    <q-table
      title="Referring pages"
      :data="data"
      :columns="columns"
      :pagination.sync="pagination"
      :hide-bottom="bottomHidden"
      no-data-label="No data matching request"
      flat
    >
  </q-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pagination: {
        rowsPerPage: 5
      },
      rowsPerPage: 5,
      columns: [
        {
          name: 'main',
          required: true,
          label: 'Page path',
          field: row => row.referrer,
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
  },
  computed: {
    bottomHidden() {
      if (this.data.length > 0) {
        return true
      }
      else {
        return false
      }
    }
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  }
}
</script>

<style lang="css" scoped>
</style>
