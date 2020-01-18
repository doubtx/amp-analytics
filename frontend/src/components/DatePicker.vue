<template>
  <flat-pickr v-model="date" :config="config" @on-change="emitSelected"/>
</template>

<script>
import FlatPickr from 'vue-flatpickr-component'
import ShortcutButtonsPlugin from 'shortcut-buttons-flatpickr'
import 'flatpickr/dist/flatpickr.css';
import 'flatpickr/dist/themes/airbnb.css';

export default {
  name: 'DatePicker',
  components: {
    FlatPickr
  },
  mounted() {
    console.log('Mounted flatpicker')
  },
  data() {
    return {
      date:  this.$route.query.start + ' to ' + this.$route.query.end,
      config: {
        mode: 'range',
        altFormat: 'M j, Y',
        altInputClass: "dr-form",
        altInput: true,
        dateFormat: 'Y-m-d',
        fullWidth: true,
        plugins: [
          ShortcutButtonsPlugin({
            button: [
              {
                label: "Today"
              },
              {
                label: "7 days"
              },
              {
                label: "30 days"
              },
              {
                label: "90 days"
              },
              {
                label: "365 days"
              },
            ],
            onClick: (index, fp) => {
              let start;
              let end;

              switch (index) {
                case 0:
                  start = new Date();
                  end = new Date();
                  break;
                case 1:
                  start = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
                  end = new Date();
                  break;
                case 2:
                  start = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
                  end = new Date();
                  break;
                case 3:
                  start = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
                  end = new Date();
                  break
                case 4:
                  start = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
                  end = new Date();
                  break
              }

              fp.setDate([start, end], true)
              fp.close()
            }
          })
        ]
      }
    }
  },
  methods: {
    async emitSelected(selectedDates, dateStr, instance) {
      console.log('Emiting selected')
        this.$emit('selected', selectedDates)
    }
  }
}
</script>
<style >
  .flatpickr-calendar {
    display: flex !important;
    flex-direction: column;
  }
  .shortcut-buttons-flatpickr-wrapper {
    order: 1;
  }

  .flatpickr-innerContainer {
    order: 2;
  }
  button:focus {
    outline:0;
  }
  .shortcut-buttons-flatpickr-button {
    background-color: rgb(230, 71, 90);
    color: rgb(255, 255, 255);
    margin-left: 7px;
    font-size: 12px;
    cursor: pointer;
    padding: 0px 4px 0px 4px;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    border-color: rgb(230, 71, 90)
  }
  .dr-form {
    width: 220px;
    padding: 8px;
    text-align: center;
  }
</style>
