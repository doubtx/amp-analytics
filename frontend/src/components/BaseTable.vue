<template>
  <div class="q-px-md">
    <q-table
      :title="title"
      :data="data"
      :columns="columns"
      :pagination.sync="pagination"
      :hide-bottom="bottomHidden"
      no-data-label="No data matching request"
      flat
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      pagination: {
        rowsPerPage: this.rowsPerPage
      },
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
    columns: {
      type: Array,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    data: {
      type: Array,
      default: []
    },
    rowsPerPage: {
      type: Number,
      default: 5
    },
    route: {
      type: Object,
      default: null
    }
  },
}
</script>

<style lang="css" scoped>
</style>
