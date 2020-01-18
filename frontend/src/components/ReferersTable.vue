<template>
  <div class="q-px-md">
    <q-table
      title="Referrers"
      :data="data"
      :columns="columns"
      :pagination.sync="pagination"
      :hide-bottom="bottomHidden"
      no-data-label="No data matching request"
      flat
    >
    <template v-slot:body-cell-main="main">
        <q-td>
          <router-link :to="{ path: '/referrer', query: { start: $route.query.start, end: $route.query.end, domain: $route.query.domain, referrer: main.value }}">{{ main.value }}</router-link>
        </q-td>
    </template>
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
          label: 'Referrer',
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
a {
  color: black;
  text-decoration: none;
}
</style>
