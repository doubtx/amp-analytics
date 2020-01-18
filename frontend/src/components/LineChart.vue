
<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  data() {
    return {
      options: {
        maintainAspectRatio: false,
        legend: { display: false },
        elements: { line: { tension: 0.000001 } },
        animation: { duration: 0 },
        hover: { animationDuration: 0 },
        responsiveAnimationDuration: 0
      }
    }
  },
  props: {
    chartData: {
      type: Object,
      default: null
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>

<style>
</style>
