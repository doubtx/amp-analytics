<template>
  <div class="q-px-md">
    <q-table
      title="Pages"
      :data="data"
      :columns="columns"
      :pagination.sync="pagination"
      :hide-bottom="bottomHidden"
      no-data-label="No data matching request"
      flat
    >
    <template v-slot:body-cell-pagepath="pagepath">
        <q-td>
          <router-link :to="{ path: '/page', query: { start: $route.query.start, end: $route.query.end, domain: $route.query.domain, path: pagepath.value }}">{{ pagepath.value }}</router-link>
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
