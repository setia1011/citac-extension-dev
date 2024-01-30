<template>
   <div ref="main" id="main" class="container is-fluid mt-5 p-32">
      <page-header class="is-inline-block"></page-header>

      <!-- Filter -->
      <div class="is-pulled-right">
         <button class="button is-small box is-outlined is-info mb-4" data-show="quickview" data-target="quickviewDefault">
            <span class="icon">
               <i class="fa-regular fa-filter-list"></i>
            </span>
            <!-- <span>Filter</span> -->
         </button>
      </div>

      <!-- QUickview -->
      <div id="quickviewDefault" class="quickview">
         <header class="quickview-header is-light">
            <p class="title"><i class="fa-regular fa-filter-list"></i></p>
            <span class="delete" data-dismiss="quickview"></span>
         </header>

         <div class="quickview-body">
            <div class="quickview-block">
               <div class="columns is-multiline m-0">

                  <!-- Date ranges -->
                  <div class="column pb-0 is-full">
                     <button ref='calendarTrigger' type='button'>Change</button>
                  </div>

                  <!-- Filter base -->
                  <!-- <div class="column pb-0 is-full">
                     <v-select
                        class="v-selectx v-komoditi"
                        placeholder="Komoditi/HS"
                        v-model="s_base"
                        label="name"
                        @update:modelValue="selectedBase"
                        :reduce="s_base => s_base.code" 
                        :options="s_base_options">
                     </v-select>
                  </div> -->

                     <!-- Komoditi -->
                     <!-- <div v-if="s_base === 1" class="column pb-0 is-full">
                        <v-select
                           class="v-selectx v-filter" 
                           placeholder="Komoditi" 
                           v-model="s_komoditi"
                           label="komoditi"
                           :reduce="s_komoditi => s_komoditi.komoditi"
                           @update:modelValue="selectedKomoditi"
                           @search="getKomoditi"
                           :options="s_komoditi_options">
                        </v-select>
                     </div> -->

                     <!-- Sub-komoditi -->
                     <!-- <div v-if="s_base === 1" class="column pb-0 is-full">
                        <v-select 
                           class="v-selectx v-filter" 
                           placeholder="Sub-komoditi" 
                           v-model="s_subkomoditi"
                           :reduce="s_subkomoditi => s_subkomoditi.subkomoditi"
                           label="subkomoditi"
                           @search="subKomoditi"
                           :options="s_subkomoditi_options">
                        </v-select>
                     </div> -->

                     <div v-if="s_base === 2" class="column pb-0 is-full">
                        <!-- HS -->
                        <!-- <v-select multiple
                           class="v-selectx v-filter" 
                           placeholder="Banyak HS dengan , (12119099, 12129990)" 
                           v-model="s_hs"
                           label="kode"
                           @search="getHs"
                           :reduce="s_hs => s_hs.kode"
                           :options="s_hs_options">
                           <i slot="spinner" class="icon icon-spinner"></i>
                        </v-select> -->
                        <v-select multiple taggable push-tags
                           class="v-selectx v-filter" 
                           placeholder="Banyak HS dengan , (12119099, 12129990)" 
                           v-model="s_hs"
                           label="kode">
                           <i slot="spinner" class="icon icon-spinner"></i>
                        </v-select>
                     </div>

                  <div class="column pb-0 is-full">
                     <button class="button is-primary" v-on:click="cariCpo($event)">
                        <span class="icon">
                           <!-- <i class="fa-brands fa-searchengin"></i> -->
                           <i class="fa-regular fa-arrow-right-to-arc"></i>
                        </span>
                        <span>Go</span>
                     </button>
                  </div>
               </div>
            </div>
         </div>

         <footer class="quickview-footer"></footer>
      </div>

      <div class="icon-text mb-5">
         <span class="icon">
            <i class="fa-sharp fa-regular fa-chart-scatter-bubble"></i>
         </span>
         <span class="title is-size-5">Trend Ekspor CPO dan Produk Turunannnya <span class="has-text-info-dark">({{ toIdDate(start_date) }} s.d. {{ toIdDate(end_date) }})</span></span>
      </div>

      <div class="columns is-multiline is-variable is-1-mobile is-1-tablet is-1-desktop is-1-widescreen is-1-fullhd mt-0 mb-0">
         <div class="column is-full-mobile is-full-tablet is-full-desktop is-full-widescreen pb-1 pt-1">
            <div class="is-relative">
               <loading class="loading" v-model:active="isLoading"
                  :can-cancel="false"
                  :background-color="'white'"
                  :opacity="1"
                  :height="25"
                  :width="25"
                  :z-index="25"
                  :loader="'spinner'"
                  :is-full-page="fullPage">
                  </loading>
               <v-chart v-if="this.c100.series?.length > 0"
                  :key="c100.series"
                  class="chart border box" 
                  style="width: 100%; height: 400px;" 
                  :option="c100"
                  :initOptions="initOptions" 
                  autoresize/>
               <div v-else class="v-charte">
                  <span>No data..</span>
               </div>
            </div>
         </div>
      </div>

      <div class="columns is-multiline is-variable is-1-mobile is-1-tablet is-1-desktop is-1-widescreen is-1-fullhd mt-0">
         <div class="column is-full-mobile is-full-tablet is-half-desktop is-half-widescreen pb-1 pt-1">
            <div class="is-relative">
               <loading class="loading" v-model:active="isLoading"
                  :can-cancel="false"
                  :background-color="'white'"
                  :opacity="1"
                  :height="25"
                  :width="25"
                  :z-index="25"
                  :loader="'spinner'"
                  :is-full-page="fullPage">
                  </loading>
               <v-chart v-if="this.c102.series?.length > 0"
                  :key="c102.series"
                  class="chart border box" 
                  style="width: 100%; height: 400px;" 
                  :option="c102"
                  :initOptions="initOptions" 
                  autoresize/>
               <div v-else class="v-charte">
                  <span>No data..</span>
               </div>
            </div>
         </div>
         <div class="column is-full-mobile is-full-tablet is-half-desktop is-half-widescreen pb-1 pt-1">
            <div class="is-relative">
               <loading class="loading" v-model:active="isLoading"
                  :can-cancel="false"
                  :background-color="'white'"
                  :opacity="1"
                  :height="25"
                  :width="25"
                  :z-index="25"
                  :loader="'spinner'"
                  :is-full-page="fullPage">
                  </loading>
               <v-chart v-if="this.c104.series?.length > 0"
                  :key="c104.series"
                  class="chart border box" 
                  style="width: 100%; height: 400px;" 
                  :option="c104"
                  :initOptions="initOptions" 
                  autoresize/>
               <div v-else class="v-charte">
                  <span>No data..</span>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
 
<script>
import { ciaxios } from '../utils/xaxios';
// var _ = require('lodash');
import _ from 'lodash';
import * as XLSX from 'xlsx';
// import debounce from 'lodash.debounce';
import moment from 'moment';
import bulmaQuickview from "bulma-extensions/bulma-quickview/dist/js/bulma-quickview";
import bulmaCalendar from "bulma-extensions/bulma-calendar/dist/js/bulma-calendar";
import Loading from "vue-loading-overlay";
import vSelect from "vue-select";
import { use } from "echarts/core";
import { CanvasRenderer, SVGRenderer } from "echarts/renderers";
import { LineChart, BarChart, ThemeRiverChart } from "echarts/charts";
import {
   VisualMapComponent,
   GridComponent,
   TitleComponent,
   TooltipComponent,
   LegendComponent,
   ToolboxComponent,
   DataZoomComponent,
   MarkLineComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";

use([
   DataZoomComponent,
   ToolboxComponent,
   VisualMapComponent,
   CanvasRenderer,
   GridComponent,
   LineChart,
   BarChart,
   TitleComponent,
   TooltipComponent,
   LegendComponent,
   SVGRenderer,
   MarkLineComponent,
   ThemeRiverChart
]);

export default {
   name: 'KomEksporCPOView',
   components: {
      Loading,
      VChart,
      vSelect,
      bulmaQuickview
   },
   provide: {
      // [THEME_KEY]: "dark"
   },
   data() {
      return {
         isLoading: false,
         fullPage: false,
         loader: 'spinner',
         start_date: new Date((new Date().getMonth() + 1).toString()+'/01/'+new Date().getFullYear().toString()),
         // start_date: new Date(new Date().getMonth().toString()+'/01/2022'),
         end_date: new Date(),
         initOptions: {
            renderer: "svg",
         },
         s_base: 2,
         s_base_options: [{name: 'HS Code', code: 2}],
         s_komoditi: null,
         s_komoditi_options: [],
         s_subkomoditi: null,
         s_subkomoditi_options: [],
         s_hs: null,
         s_hs_options: [],
         colors: ['blue','green','yellow','black','gray'],
         c100: {},
         c100_stacked: false,
         c102: {},
         c102_stacked: false,
         c104: {},
         c104_stacked: false,
      }
   },
   watch: {
   },
   computed: {
      getHs: function() {
         if (this.hs) {
            return debounce(
               this.hs, 500
            )
         } else {
            return null
         }
      },
      getKomoditi: function() {
         if (this.komoditi) {
            return debounce(
               this.komoditi, 500
            )
         } else {
            return null
         }
      }
   },
   mounted() {
      var quickviews = bulmaQuickview.attach();
      const calendar = bulmaCalendar.attach(this.$refs.calendarTrigger, {
         startDate: this.start_date,
         endDate: this.end_date,
         type: 'date',
         dateFormat: 'DD/MM/YYYY',
         isRange: true,
         displayMode: 'default',
         color: 'primary'
      })[0]

      calendar.on("hide", event => {
         this.start_date = event.data.date.start;
         this.end_date = event.data.date.end;
         console.log(2)
      });

      calendar.on("clear", event => {
         this.start_date = null;
         this.end_date = null;
      });

      calendar.on("select", event => {
         this.start_date = event.data.date.start;
         this.end_date = event.data.date.end;
         console.log(1)
      })

      this.cpoDaily();
      this.cpoWeekly();
      this.cpoMonthly();
   },
   methods: {
      toXLSX: function(items, fname, ref) {
         const yx = []
         if (ref === 'monthly') {
            items.forEach((e, i) => {
               e.data.forEach((j, k) => {
                  yx.push({
                     'Kluster': e.name,
                     'Tahun': j[0].split('-')[0],
                     'Bulan': j[0].split('-')[1],
                     'Berat (Ton)': j[1]
                  })
               })
            });
         }

         if (ref === 'weekly') {
            items.forEach((e, i) => {
               e.data.forEach((j, k) => {
                  yx.push({
                     'Kluster': e.name,
                     'Tahun': j[0].split('-')[0],
                     'Minggu': j[0].split('-')[1],
                     'Berat (Ton)': j[1]
                  })
               })
            });
         }
         
         if (ref === 'daily') {
            items.forEach((e, i) => {
               e.data.forEach((j, k) => {
                  yx.push({
                     'Kluster': e.name,
                     'Tahun': j[0].split('-')[0],
                     'Tanggal': j[0],
                     'Berat (Ton)': j[1]
                  })
               })
            });
         }
         var wb = XLSX.utils.book_new();
         var ws = XLSX.utils.json_to_sheet(yx);
         // XLSX.utils.book_append_sheet(wb, ws, 'sheet1');
         XLSX.utils.book_append_sheet(wb, ws);
         XLSX.writeFile(wb, fname + ".xlsx");
      },
      genDays: function(start, end) {
         const listDate = [];
         const startDate = start;
         const endDate = end;
         const dateMove = new Date(startDate);
         let strDate = startDate;
         while (strDate < endDate) {
            strDate = dateMove.toISOString().slice(0, 10);
            listDate.push(strDate);
            dateMove.setDate(dateMove.getDate() + 1);
         };
         return listDate;
      },
      toDatabaseDate: function(date) {
         const year = date?.toLocaleString("id-ID", { year: "numeric" });
         const month = date?.toLocaleString("id-ID", { month: "2-digit" });
         const day = date?.toLocaleString("id-ID", { day: "2-digit" });
         const formattedDate = year + "-" + month + "-" + day;
         return formattedDate;
      },
      toIdDate: function(date) {
         const year = date?.toLocaleString("id-ID", { year: "numeric" });
         const month = date?.toLocaleString("id-ID", { month: "2-digit" });
         const day = date?.toLocaleString("id-ID", { day: "2-digit" });
         const formattedDate = day + "/" + month + "/" + year;
         return formattedDate;
      },
      hsArr2Str: function() {
         if (this.s_hs) {
            var tx = JSON.parse(JSON.stringify(this.s_hs));
            var qq = [];
            tx.forEach(e => {
               qq.push(e);
            });
            return qq.join(",");
         } else {
            return null;
         }
      },
      selectedBase: function() {
         this.s_hs = null;
         this.s_hs_options = [];
         this.s_komoditi = null;
         this.s_komoditi_options = [];
         this.s_subkomoditi = null;
         this.s_subkomoditi_options = [];
      },
      komoditi: function(s, l) {
         if (s === "")
            return;
         l(true);
         ciaxios.get("komoditi", {
            params: {
               q: s
            }
         }).then((res) => {
            this.s_komoditi_options = res.data;
            l(false);
         })
      },
      selectedKomoditi: function() {
         this.s_subkomoditi = null;
         this.s_subkomoditi_options = [];
      },
      subKomoditi: function(s, l) {
         // // kalau multiple
         // var tx = JSON.parse(JSON.stringify(this.s_komoditi));
         // var qq = [];
         // tx.forEach(e => {
         //    qq.push(e.komoditi);
         // });
         // qq.join("|")
         // if (!this.komoditi)
         //    return; 
         if (l) {
            if (s === "")
               return;
            l(true);
         }
         ciaxios.get("subkomoditi", {
            params: {
               q: this.s_komoditi
            }
         }).then((res) => {
            this.s_subkomoditi_options = res.data;
            if (l) {
               l(false);
            }
         })
      },
      hs: function(s, l) {
         if (s === "")
            return;
         l(true);
         ciaxios.get("hs", {
            params: {
               q: s
            }
         }).then((res) => {
            this.s_hs_options = res.data;
            l(false);
         })
      },
      cariCpo: function() {
         if (this.start_date) {
            if (this.end_date) {
               this.cpoDaily();
               this.cpoWeekly();
               this.cpoMonthly();
            } else {
               this.end_date = new Date();
               this.cpoDaily();
               this.cpoWeekly();
               this.cpoMonthly();
            }
         }
      },
      cpoDaily: function() {
         this.isLoading = true;
         ciaxios.get("chart/ekspor/cpo/daily", {
            params: {
               from: this.toDatabaseDate(this.start_date),
               to: this.toDatabaseDate(this.end_date),
               hs: this.hsArr2Str()
            }
         }).then((res) => {
            setTimeout(() => {
               this.isLoading = false;
            }, 2000);
            const data = res.data;
            const x = [];
            const y = [];
            data.forEach((e, i) => {
               if (i <= 2) {
                  x.push({name:e.name, data:e.data, type:"line", smooth:!0});
                  y.push({name:e.name, data:e.data, type:"line", stack:"x", areaStyle:{opacity:.3}, smooth:!0});
               } else {
                  x.push(
                     {
                        name: e.name.toUpperCase(), 
                        data: e.data.map(e => ([e.tanggal, e.volume_ton])), 
                        type: 'bar',
                        markLine: {
                           show: true,
                           data: [{
                              name: 'average line',
                              type: 'average'
                           }],
                           lineStyle: {
                              color: 'black'
                           },
                           label: {
                              position: 'middle',
                              formatter: function (params) {
                                 return new Intl.NumberFormat('id').format(params.value? params.value.toFixed(2) : 0);
                              }
                           }
                        },
                        markPoint: {
                           symbol: 'path://',
                           symbolOffset: [0, '-13px'],
                           label: {
                              fontWeight: 'bold',
                              formatter: function(data) {
                                 if (data.data.type === 'min') {
                                    return `{min|${new Intl.NumberFormat('id').format(data.value)}}`
                                 }
                                 if (data.data.type === 'max') {
                                    return `{max|${new Intl.NumberFormat('id').format(data.value)}}`
                                 }
                              },
                              rich: {
                                 min: {
                                    color: 'red',
                                    fontWeight: 'bold'
                                 },
                                 max: {
                                    color: 'green',
                                    fontWeight: 'bold'
                                 }
                              }
                           },
                           data: [{
                              type: 'max',
                              name: ''
                           }, {
                              type: 'min',
                              name: ''
                           }]
                        },
                     }
                  )
                  y.push(
                     {
                        name: e.name.toUpperCase(), 
                        data: e.data.map(e => ([e.tanggal, e.volume_ton])), 
                        type: 'bar',
                        markLine: {
                           show: true,
                           data: [{
                              name: 'average line',
                              type: 'average'
                           }],
                           lineStyle: {
                              color: 'black'
                           },
                           label: {
                              position: 'middle',
                              formatter: function (params) {
                                 return new Intl.NumberFormat('id').format(params.value? params.value.toFixed(2) : 0);
                              }
                           }
                        },
                        markPoint: {
                           symbol: 'path://',
                           symbolOffset: [0, '-13px'],
                           label: {
                              fontWeight: 'bold',
                              formatter: function(data) {
                                 if (data.data.type === 'min') {
                                    return `{min|${new Intl.NumberFormat('id').format(data.value)}}`
                                 }
                                 if (data.data.type === 'max') {
                                    return `{max|${new Intl.NumberFormat('id').format(data.value)}}`
                                 }
                              },
                              rich: {
                                 min: {
                                    color: 'red',
                                    fontWeight: 'bold'
                                 },
                                 max: {
                                    color: 'green',
                                    fontWeight: 'bold'
                                 }
                              }
                           },
                           data: [{
                              type: 'max',
                              name: ''
                           }, {
                              type: 'min',
                              name: ''
                           }]
                        },
                     }
                  )
               }
            });
            var h1 = this.genDays(
               this.start_date?.toISOString().slice(0, 10), 
               this.end_date?.toISOString().slice(0, 10)
            )
            var t2 = [...new Set(x[0].data.map(e => e[0].split('-')[0]))]
            this.c100 = {
               title: {
                  left: 'center',
                  text: 'Tren Ekspor Harian (Ton)',
                  subtext: ''
               },
               legend: {
                  show: true,
                  orient: 'horizontal',
                  textStyle: {
                     fontSize: 10
                  },
                  top: 35
               },
               toolbox: {
                  show: true,
                  top: 90,
                  orient: 'vertical',
                  feature: {
                     mark: { show: true },
                     restore: { show: true },
                     myTool1: {
                           show: true,
                           title: 'Switch Style',
                           icon: 'path fill="currentColor" d="M230.91 172a8 8 0 0 1-2.91 10.91l-96 56a8 8 0 0 1-8.06 0l-96-56A8 8 0 0 1 36 169.09l92 53.65l92-53.65a8 8 0 0 1 10.91 2.91ZM220 121.09l-92 53.65l-92-53.65a8 8 0 0 0-8 13.82l96 56a8 8 0 0 0 8.06 0l96-56a8 8 0 1 0-8.06-13.82ZM24 80a8 8 0 0 1 4-6.91l96-56a8 8 0 0 1 8.06 0l96 56a8 8 0 0 1 0 13.82l-96 56a8 8 0 0 1-8.06 0l-96-56A8 8 0 0 1 24 80Zm23.88 0L128 126.74L208.12 80L128 33.26Z',
                           onclick: async () => {
                              this.c100_stacked = !this.c100_stacked;
                              if (this.c100_stacked) {
                                 this.c100.series = y;
                              } else {
                                 this.c100.series = x;
                              }
                           }
                     },
                     myTool2: {
                           show: true,
                           title: 'Save as Excel',
                           icon: 'path fill="none" stroke="currentColor" d="M2.5 3.5v-2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-10a1 1 0 0 1-1-1v-2m0-6l4 4m-4 0l4-4m-5-2h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1Z"',
                           onclick: async () => {
                              await this.toXLSX(this.c100.series, 'ekspor_harian_ton', 'daily');
                           }
                     },
                     saveAsImage: { show: true }
                  }
               },
               tooltip: {
                  confine: true,
                  trigger: 'axis',
                  formatter: function (params) {
                     var f = `<div class='has-text-centered mb-2'>${moment(params[0].axisValueLabel).format('YYYY-MM-DD')}</div>`;
                     for (var i=0; i<params.length; i++) {
                        f += `${params[i].marker} ${params[i].seriesName}&nbsp;&nbsp;&nbsp;&nbsp; `+
                           `<span class='is-pulled-right'><b>` + new Intl.NumberFormat('id').format(params[i].value[1] ? params[i].value[1].toFixed(0) : 0) + `</b></span><br/>`;
                     }
                     return f;
                  }
               },
               grid: {
                  show: false,
                  left: 10,
                  top: 100,
                  right: 40,
                  bottom: 10,
                  containLabel: true
               },
               xAxis: [
                  {
                     type: 'time',
                     show: true,
                     data: h1,
                     splitLine: {show: false},
                     axisLabel: {
                        show: true,
                        formatter: function (value) {
                           const date = new Date(value);

                           const monthStart = new Date(value);
                           monthStart.setDate(1);
                           monthStart.setHours(0);
                           monthStart.setMinutes(0);
                           monthStart.setSeconds(0);
                           monthStart.setMilliseconds(0);

                           const yearStart = new Date(value);
                           yearStart.setMonth(0);
                           yearStart.setDate(1);
                           yearStart.setHours(0);
                           yearStart.setMinutes(0);
                           yearStart.setSeconds(0);
                           yearStart.setMilliseconds(0);
                           
                           // If the start of year
                           if (date.getTime() === yearStart.getTime()) {
                              return '{month|' + moment().month(date.getMonth()).format("MMM") + '}\n\n'
                              + '{year|' + (date.getFullYear()) + '}';
                           } else {
                              if (t2.length > 1) {
                                 return '{month|' + (moment().month(date.getMonth()).format("MMM")) + '}';
                              } else {
                                 if (date.getTime() === monthStart.getTime()) {
                                    return '{date|' + (date.getDate()) + '}\n\n' 
                                    + '{monthx|' + (moment().month(date.getMonth()).format("MMM")) + '}';
                                 } else {
                                    return '{date|' + (date.getDate()) + '}';
                                 }
                              }  
                           }
                        },
                        rich: {
                              year: {
                                 color: '#000',
                                 fontWeight: 'bold'
                              },
                              monthx: {
                                 color: '#999',
                                 fontWeight: 'bold'
                              },
                              month: {
                                 color: '#999'
                              }
                        }
                     }
                  },
               ],
               yAxis: {
                  type: 'value',
                  axisLabel: {
                     formatter: function(v) {
                        return new Intl.NumberFormat('id', {notation: "compact", maximumFractionDigits: 1}).format(v)
                     }
                  }
               },
               series: x
            }
            if (data.length <= 1) {this.c100.series = []}
         })
      },
      cpoWeekly: function() {
         this.loading = true;
         ciaxios.get("chart/ekspor/cpo/weekly", {
            params: {
               from: this.toDatabaseDate(this.start_date),
               to: this.toDatabaseDate(this.end_date),
               hs: this.hsArr2Str()
            }
         }).then((res) => {
            setTimeout(() => {
               this.isLoading = false;
            }, 2000);
            const data = res.data;
            const x = [];
            const y = [];
            data.forEach((e, i) => {
               if (i <= 2) {
                  x.push(
                     {
                        name: e.name, 
                        data: e.data.map(e => ([e[0] +'-'+ e[1], e[2]])), 
                        type: 'line',
                        smooth: true
                     }
                  );
                  y.push(
                     {
                        name: e.name, 
                        data: e.data.map(e => ([e[0] +'-'+ e[1], e[2]])), 
                        type: 'line',
                        stack: 'x',
                        areaStyle: {
                           opacity: 0.3
                        },
                        smooth: true
                     }
                  )
               } else {
                  x.push(
                     {
                        name: e.name.toUpperCase(), 
                        data: e.data.map(e => ([e[0] +'-'+ e[1], e[2]])),
                        type: 'bar',
                        label: {
                           show: false,
                           position: 'top'
                        },
                        markLine: {
                           show: true,
                           data: [{
                              name: 'average line',
                              type: 'average'
                           }],
                           lineStyle: {
                              color: 'black'
                           },
                           label: {
                              position: 'middle',
                              formatter: function (params) {
                                 return new Intl.NumberFormat('id').format(params.value? params.value.toFixed(2) : 0);
                              }
                           }
                        },
                        markPoint: {
                           symbol: 'path://',
                           symbolOffset: [0, '-13px'],
                           label: {
                              fontWeight: 'bold',
                              formatter: function(data) {
                                 if (data.data.type === 'min') {
                                    return `{min|${new Intl.NumberFormat('id').format(data.value)}}`
                                 }
                                 if (data.data.type === 'max') {
                                    return `{max|${new Intl.NumberFormat('id').format(data.value)}}`
                                 }
                              },
                              rich: {
                                 min: {
                                    color: 'red',
                                    fontWeight: 'bold'
                                 },
                                 max: {
                                    color: 'green',
                                    fontWeight: 'bold'
                                 }
                              }
                           },
                           data: [{
                              type: 'max',
                              name: ''
                           }, {
                              type: 'min',
                              name: ''
                           }]
                        },
                     }
                  );
                  y.push(
                     {
                        name: e.name.toUpperCase(), 
                        data: e.data.map(e => ([e[0] +'-'+ e[1], e[2]])),
                        type: 'bar',
                        label: {
                           show: false,
                           position: 'top'
                        },
                        markLine: {
                           show: true,
                           data: [{
                              name: 'average line',
                              type: 'average'
                           }],
                           lineStyle: {
                              color: 'black'
                           },
                           label: {
                              position: 'middle',
                              formatter: function (params) {
                                 return new Intl.NumberFormat('id').format(params.value? params.value.toFixed(2) : 0);
                              }
                           }
                        },
                        markPoint: {
                           symbol: 'path://',
                           symbolOffset: [0, '-13px'],
                           label: {
                              fontWeight: 'bold',
                              formatter: function(data) {
                                 if (data.data.type === 'min') {
                                    return `{min|${new Intl.NumberFormat('id').format(data.value)}}`
                                 }
                                 if (data.data.type === 'max') {
                                    return `{max|${new Intl.NumberFormat('id').format(data.value)}}`
                                 }
                              },
                              rich: {
                                 min: {
                                    color: 'red',
                                    fontWeight: 'bold'
                                 },
                                 max: {
                                    color: 'green',
                                    fontWeight: 'bold'
                                 }
                              }
                           },
                           data: [{
                              type: 'max',
                              name: ''
                           }, {
                              type: 'min',
                              name: ''
                           }]
                        },
                     }
                  )
               }
               
            });
            var t1 = data.map(e => ({
               data: e.data.map(e => [e[0] + '-' + e[1]]).flat(1)
            }));
            var t2 = data.map(e => ({
               data: e.data.map(e => [e[0]]).flat(1)
            }));
            this.c102 = {
               title: {
                  left: 'center',
                  text: 'Tren Ekspor Mingguan (Ton)',
                  subtext: ''
               },
               legend: {
                  show: true,
                  orient: 'horizontal',
                  textStyle: {
                     fontSize: 10
                  },
                  top: 35
               },
               toolbox: {
                  show: true,
                  top: 90,
                  orient: 'vertical',
                  feature: {
                     mark: { show: true },
                     restore: { show: true },
                     myTool1: {
                           show: true,
                           title: 'Switch Style',
                           icon: 'path fill="currentColor" d="M230.91 172a8 8 0 0 1-2.91 10.91l-96 56a8 8 0 0 1-8.06 0l-96-56A8 8 0 0 1 36 169.09l92 53.65l92-53.65a8 8 0 0 1 10.91 2.91ZM220 121.09l-92 53.65l-92-53.65a8 8 0 0 0-8 13.82l96 56a8 8 0 0 0 8.06 0l96-56a8 8 0 1 0-8.06-13.82ZM24 80a8 8 0 0 1 4-6.91l96-56a8 8 0 0 1 8.06 0l96 56a8 8 0 0 1 0 13.82l-96 56a8 8 0 0 1-8.06 0l-96-56A8 8 0 0 1 24 80Zm23.88 0L128 126.74L208.12 80L128 33.26Z',
                           onclick: async () => {
                              this.c102_stacked = !this.c102_stacked;
                              if (this.c102_stacked) {
                                 this.c102.series = y;
                              } else {
                                 this.c102.series = x;
                              }
                           }
                     },
                     myTool2: {
                           show: true,
                           title: 'Save as Excel',
                           icon: 'path fill="none" stroke="currentColor" d="M2.5 3.5v-2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-10a1 1 0 0 1-1-1v-2m0-6l4 4m-4 0l4-4m-5-2h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1Z"',
                           onclick: async () => {
                              await this.toXLSX(this.c102.series, 'ekspor_mingguan_ton', 'weekly');
                           }
                     },
                     saveAsImage: { show: true }
                  }
               },
               tooltip: {
                  confine: true,
                  trigger: 'axis',
                  formatter: function (params) {
                     var f = `<div class='has-text-centered mb-2'>${params[0].axisValueLabel}</div>`;
                     for (var i=0; i<params.length; i++) {
                        f += `${params[i].marker} ${params[i].seriesName}&nbsp;&nbsp;&nbsp;&nbsp; `+
                           `<span class='is-pulled-right'><b>` + new Intl.NumberFormat('id').format(params[i].value[1] ? params[i].value[1].toFixed(0) : 0) + `</b></span><br/>`;
                     }
                     return f;
                  }
               },
               grid: {
                  show: false,
                  left: 10,
                  top: 100,
                  right: 40,
                  bottom: 10,
                  containLabel: true
               },
               xAxis: [
                  {
                     type: 'category',
                     show: true,
                     data: t1[0].data,
                     axisLabel: {
                        formatter: function(items) {
                           return items.split('-')[1]
                        }
                     }
                  },
                  {
                     type: 'category',
                     show: true,
                     data: [...new Set(t2[0].data)],
                     position: 'bottom',
                     offset: 23,
                     axisTick: {
                        length: 20,
                        inside: false,
                        lineStyle: {color: '#ccc'},
                        alignWithLabel: false
                     },
                     axisLabel: {
                        inside: false,
                        fontWeight: "bold"
                     },
                     axisLine: {
                        onZero: false,
                        show: false          
                     }
                  }
               ],
               yAxis: {
                  type: 'value',
                  axisLabel: {
                     formatter: function(v) {
                        return new Intl.NumberFormat('id', {notation: "compact", maximumFractionDigits: 1}).format(v)
                     }
                  }
               },
               series: x
            };
            if (data.length <= 1) {this.c102.series = []}
         })
      },
      cpoMonthly: function() {
         this.loading = true;
         ciaxios.get("chart/ekspor/cpo/monthly", {
            params: {
               from: this.toDatabaseDate(this.start_date),
               to: this.toDatabaseDate(this.end_date),
               hs: this.hsArr2Str()
            }
         }).then((res) => {
            setTimeout(() => {
               this.isLoading = false;
            }, 2000);
            const data = res.data;
            const x = [];
            const y = [];
            data.forEach((e, i) => {
               if (i <= 2) {
                  x.push(
                     {
                        name: e.name, 
                        data: e.data.map(e => ([e[0] +'-'+ e[1], e[2]])), 
                        type: 'line',
                        smooth: true
                     }
                  );

                  y.push(
                     {
                        name: e.name, 
                        data: e.data.map(e => ([e[0] +'-'+ e[1], e[2]])), 
                        type: 'line',
                        stack: 'x',
                        areaStyle: {
                           opacity: 0.3
                        },
                        smooth: true
                     }
                  )
               } else {
                  x.push(
                     {
                        name: e.name.toUpperCase(), 
                        data: e.data.map(e => ([e[0] +'-'+ e[1], e[2]])),
                        type: 'bar',
                        label: {
                           show: false,
                           position: 'top'
                        },
                        markLine: {
                           show: true,
                           data: [{
                              name: 'average line',
                              type: 'average'
                           }],
                           lineStyle: {
                              color: 'black'
                           },
                           label: {
                              position: 'middle',
                              formatter: function (params) {
                                 return new Intl.NumberFormat('id').format(params.value? params.value.toFixed(2) : 0);
                              }
                           }
                        },
                        markPoint: {
                           symbol: 'path://',
                           symbolOffset: [0, '-13px'],
                           label: {
                              fontWeight: 'bold',
                              formatter: function(data) {
                                 if (data.data.type === 'min') {
                                    return `{min|${new Intl.NumberFormat('id').format(data.value)}}`
                                 }
                                 if (data.data.type === 'max') {
                                    return `{max|${new Intl.NumberFormat('id').format(data.value)}}`
                                 }
                              },
                              rich: {
                                 min: {
                                    color: 'red',
                                    fontWeight: 'bold'
                                 },
                                 max: {
                                    color: 'green',
                                    fontWeight: 'bold'
                                 }
                              }
                           },
                           data: [{
                              type: 'max',
                              name: ''
                           }, {
                              type: 'min',
                              name: ''
                           }]
                        },
                     }
                  );
                  y.push(
                     {
                        name: e.name.toUpperCase(), 
                        data: e.data.map(e => ([e[0] +'-'+ e[1], e[2]])),
                        type: 'bar',
                        label: {
                           show: false,
                           position: 'top'
                        },
                        markLine: {
                           show: true,
                           data: [{
                              name: 'average line',
                              type: 'average'
                           }],
                           lineStyle: {
                              color: 'black'
                           },
                           label: {
                              position: 'middle',
                              formatter: function (params) {
                                 return new Intl.NumberFormat('id').format(params.value? params.value.toFixed(2) : 0);
                              }
                           }
                        },
                        markPoint: {
                           symbol: 'path://',
                           symbolOffset: [0, '-13px'],
                           label: {
                              fontWeight: 'bold',
                              formatter: function(data) {
                                 if (data.data.type === 'min') {
                                    return `{min|${new Intl.NumberFormat('id').format(data.value)}}`
                                 }
                                 if (data.data.type === 'max') {
                                    return `{max|${new Intl.NumberFormat('id').format(data.value)}}`
                                 }
                              },
                              rich: {
                                 min: {
                                    color: 'red',
                                    fontWeight: 'bold'
                                 },
                                 max: {
                                    color: 'green',
                                    fontWeight: 'bold'
                                 }
                              }
                           },
                           data: [{
                              type: 'max',
                              name: ''
                           }, {
                              type: 'min',
                              name: ''
                           }]
                        },
                     }
                  )
               }
               
            });
            var t1 = data.map(e => ({
               data: e.data.map(e => [e[0] + '-' + e[1]]).flat(1)
            }));
            var t2 = data.map(e => ({
               data: e.data.map(e => [e[0]]).flat(1)
            }));
            this.c104 = {
               title: {
                  left: 'center',
                  text: 'Tren Ekspor Bulanan (Ton)',
                  subtext: ''
               },
               legend: {
                  show: true,
                  orient: 'horizontal',
                  textStyle: {
                     fontSize: 10
                  },
                  top: 35
               },
               toolbox: {
                  show: true,
                  top: 90,
                  orient: 'vertical',
                  feature: {
                     mark: { show: true },
                     restore: { show: true },
                     myTool1: {
                           show: true,
                           title: 'Switch Style',
                           icon: 'path fill="currentColor" d="M230.91 172a8 8 0 0 1-2.91 10.91l-96 56a8 8 0 0 1-8.06 0l-96-56A8 8 0 0 1 36 169.09l92 53.65l92-53.65a8 8 0 0 1 10.91 2.91ZM220 121.09l-92 53.65l-92-53.65a8 8 0 0 0-8 13.82l96 56a8 8 0 0 0 8.06 0l96-56a8 8 0 1 0-8.06-13.82ZM24 80a8 8 0 0 1 4-6.91l96-56a8 8 0 0 1 8.06 0l96 56a8 8 0 0 1 0 13.82l-96 56a8 8 0 0 1-8.06 0l-96-56A8 8 0 0 1 24 80Zm23.88 0L128 126.74L208.12 80L128 33.26Z',
                           onclick: async () => {
                              this.c104_stacked = !this.c104_stacked;
                              if (this.c104_stacked) {
                                 this.c104.series = y;
                              } else {
                                 this.c104.series = x;
                              }
                           }
                     },
                     myTool2: {
                           show: true,
                           title: 'Save as Excel',
                           icon: 'path fill="none" stroke="currentColor" d="M2.5 3.5v-2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-10a1 1 0 0 1-1-1v-2m0-6l4 4m-4 0l4-4m-5-2h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1Z"',
                           onclick: async () => {
                              await this.toXLSX(this.c104.series, 'ekspor_bulanan_ton', 'monthly');
                           }
                     },
                     saveAsImage: { show: true }
                  }
               },
               tooltip: {
                  confine: true,
                  trigger: 'axis',
                  formatter: function (params) {
                     var f = `<div class='has-text-centered mb-2'>${params[0].axisValueLabel}</div>`;
                     for (var i=0; i<params.length; i++) {
                        f += `${params[i].marker} ${params[i].seriesName}&nbsp;&nbsp;&nbsp;&nbsp; `+
                           `<span class='is-pulled-right'><b>` + new Intl.NumberFormat('id').format(params[i].value[1] ? params[i].value[1].toFixed(0) : 0) + `</b></span><br/>`;
                     }
                     return f;
                  }
               },
               grid: {
                  show: false,
                  left: 10,
                  top: 100,
                  right: 40,
                  bottom: 10,
                  containLabel: true
               },
               xAxis: [
                  {
                     type: 'category',
                     show: true,
                     data: t1[0].data,
                     axisLabel: {
                        formatter: function(items) {
                           return items.split('-')[1]
                        }
                     }
                  },
                  {
                     type: 'category',
                     show: true,
                     data: [...new Set(t2[0].data)],
                     position: 'bottom',
                     offset: 23,
                     axisTick: {
                        length: 20,
                        inside: false,
                        lineStyle: {color: '#ccc'},
                        alignWithLabel: false
                     },
                     axisLabel: {
                        inside: false,
                        fontWeight: "bold"
                     },
                     axisLine: {
                        onZero: false,
                        show: false          
                     }
                  }
               ],
               yAxis: {
                  type: 'value',
                  axisLabel: {
                     formatter: function(v) {
                        return new Intl.NumberFormat('id', {notation: "compact", maximumFractionDigits: 1}).format(v)
                     }
                  }
               },
               series: x
            }
            if (data.length <= 1) {this.c104.series = []}
         })
      }
   }
}
</script>


<style>
@import "vue-select/dist/vue-select.css";
@import "bulma-extensions/bulma-quickview/dist/css/bulma-quickview.min.css";
@import "bulma-extensions/bulma-calendar/dist/css/bulma-calendar.min.css";
@import "bulma-extensions/bulma-divider/dist/css/bulma-divider.min.css";

.chart {
   width: 100%;
   min-height: 400px;
   padding: 15px 13px 13px 13px;
   border-radius: 4px;
}
.loading {
   border: 1px solid #d9d9d9;
   border-radius: 4px;
}
.v-charte {
   text-align: center;
   width: 100%;
   min-height: 400px;
   border: 1px solid gainsboro;
   border-radius: 4px;
   padding-top: 170px;
}
.quickview-header {
   min-height: 3.3em !important;
}
.quickview-footer {
   border-top: none !important;
}
.table td, .table th {
   font-size: 0.93 !important;
}
</style>
 
<style>
.datetimepicker {
   z-index: 99999999 !important;
}
.datetimepicker-dummy .datetimepicker-clear-button {
   top: -4px !important;
}
.tabs li a {
   font-weight: bold !important;
}
.v-tahun, .v-tahun .vs__dropdown-option, .v-tahun .vs__dropdown-menu {
   width: 121px !important;
}
.v-kantor .vs__dropdown-toggle {
   border: var(--vs-border-width) var(--vs-border-style) #cc0f3563;
}
.v-kantor, .v-kantor .vs__dropdown-option, .v-kantor .vs__dropdown-menu {
   width: 100% !important;
}
.v-komoditi, .v-komoditi .vs__dropdown-option, .v-komoditi .vs__dropdown-menu {
   width: 150px !important;
}
.v-filter, .v-filter .vs__dropdown-option, .v-filter .vs__dropdown-menu {
   width: 100% !important;
}
.v-negara, .v-negara .vs__dropdown-option, .v-negara .vs__dropdown-menu {
   width: 100% !important;
}
.v-exim, .v-exim .vs__dropdown-option, .v-exim .vs__dropdown-menu {
   width: 150px !important;
}
</style>