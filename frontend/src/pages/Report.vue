<template>
  <q-page class="q-px-xl">
    <h5 class="q-mb-md text-grey-14">
      Analytics for <span class="text-cyan-6 text-weight-bold">{{$route.query.domain}}</span><span class="text-cyan-6 text-grey text-weight-bold">{{$route.query.path}}</span>
    </h5>
    <div class="row full-width justify-between">
      <div class="col-7">
        <span v-if="loaded" class="text-subtitle1 text-grey-9">{{ stats.total }} pageviews in selected period</span>
      </div>
      <div class="col-5" align="right">
        <DatePicker v-if="loaded" @selected="handleDateChange"/>
      </div>
    </div>
    <div class="row full-width justify-center q-mt-lg">
      <div class="col-12">
        <LineChart v-if="loaded" :chart-data="stats.pageviews"/>
      </div>
    </div>
    <div class="row full-width justify-center q-mt-lg">
      <div class="col-4">
        <div>
          <ReferersTable v-if="loaded" :data="tables.referrers" />
        </div>
      </div>
      <div class="col-4">
        <div class="row full-width justify-center">
          <div class="col-12">
            <PagesTable v-if="loaded" :data="tables.pages" />
          </div>
          <div class="col-12">
            <BrowsersTable v-if="loaded" :data="tables.browsers"/>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="row full-width justify-center">
          <div class="col-12">
            <CountriesTable v-if="loaded" :data="tables.countries"/>
          </div>
          <div class="col-12">
            <ScreensTable v-if="loaded" :data="tables.screens"/>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import LineChart from 'components/LineChart'
import DatePicker from 'components/DatePicker'
import BrowsersTable from 'components/BrowsersTable'
import PagesTable from 'components/PagesTable'
import CountriesTable from 'components/CountriesTable'
import ReferersTable from 'components/ReferersTable'
import ScreensTable from 'components/ScreensTable'

import { date } from 'quasar'

export default {
  name: 'PageReport',
  components: {
    LineChart,
    DatePicker,
    BrowsersTable,
    PagesTable,
    CountriesTable,
    ReferersTable,
    ScreensTable
  },
  data () {
    return {
      loaded: false,
      stats: {
        pageviews: null,
        total: null
      },
      tables: {
        browsers: null,
        pages: null,
        referers: null
      }
    }
  },
  async mounted () {
    if (this.$route.query.domain && this.$route.query.start && this.$route.query.end) {
      this.fetchStats()
    }
    else {
      let end = date.formatDate(new Date(), 'YYYY-MM-DD')
      let start = date.formatDate(date.addToDate(new Date(), { month: -1 }), 'YYYY-MM-DD')

      this.$router.push({ path: '/pageviews', query: { start: start, end: end, domain: 'politicszoom.com'} })
      this.fetchStats()
    }
  },
  methods: {
    async fetchStats() {
      this.$q.loading.show()
      await this.$api.get('/stats', { params: this.$route.query})
        .then(response => {
          this.$q.loading.hide()
          this.stats.pageviews = response.data.results.pageviews
          this.tables.browsers = response.data.results.browsers
          this.tables.pages = response.data.results.pages
          this.tables.countries = response.data.results.countries
          this.tables.referrers = response.data.results.referrers
          this.tables.screens = response.data.results.screens
          this.stats.total = response.data.results.total
          this.loaded = true
        })
    },
    async handleDateChange(selectedDates) {
      console.log('Handling change')
      if (selectedDates.length > 1) {
        let start = date.formatDate(selectedDates[0], 'YYYY-MM-DD')
        let end = date.formatDate(selectedDates[1], 'YYYY-MM-DD')

        console.log(start)
        console.log(end)
        this.$router.push({ path: '/pageviews', query: { start: start, end: end, domain: this.$route.query.domain} })
        this.fetchStats()
      }
    }
  }
}

</script>
<style >
  .dr-form {
    width: 220px;
    padding: 8px;
    text-align: center;
  }
</style>
