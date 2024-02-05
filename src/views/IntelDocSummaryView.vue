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
         <span class="title is-size-5">Title ____</span>
      </div>
     
     <!-- <div class="columns">
       <div class="column">
         <div class="field is-horizontal">
           <div class="field-label is-normal" style="text-align: left; flex-grow: 0 !important; width: 50px;">
             <label class="label">Kantor</label>
           </div>
           <div class="field-body">
             <div class="field">
               <input class="input" type="text" placeholder="Kantor">
             </div>
           </div>
         </div>
 
         <div class="field is-horizontal">
           <div class="field-label is-normal" style="text-align: left; flex-grow: 0 !important; width: 50px;">
             <label class="label">Periode</label>
           </div>
           <div class="field-body">
             <div class="field">
               <input class="input" type="text" placeholder="01/01/2024">
             </div>
             <div class="field">
               <input class="input" type="text" placeholder="01/01/2024">
             </div>
           </div>
         </div>
       </div>
     </div> -->
 
      <div class="columns is-multiline is-variable is-1-mobile is-1-tablet is-1-desktop is-1-widescreen is-1-fullhd mt-0">
         <div class="column is-full-mobile is-full-tablet is-half-desktop is-one-third-widescreen pb-1 pt-1">
         <div>
            <v-chart
            :key="chart_pie_jenis_dokumen.series"
            class="chart border" 
            style="width: 100%; height: 400px;" 
            :option="chart_pie_jenis_dokumen"
            autoresize/>
         </div>
         </div>
         <div class="column is-full-mobile is-full-tablet is-half-desktop is-one-third-widescreen pb-1 pt-1">
         <v-chart
            :key="chart_line_dokumen_per_bulan.series?.name"
            class="chart border" 
            style="width: 100%; height: 400px;" 
            :option="chart_line_dokumen_per_bulan"
            autoresize/>
         </div>
         <div class="column is-full-mobile is-full-tablet is-half-desktop is-one-third-widescreen pb-1 pt-1">
            <v-chart
            :key="chart_bar_hitrate.series?.name"
            class="chart border" 
            style="width: 100%; height: 400px;" 
            :option="chart_bar_hitrate"
            autoresize/>
         </div>
         <div class="column is-full-mobile is-full-tablet is-half-desktop is-one-third-widescreen pb-1 pt-1">
            <v-chart
            :key="chart_bar_jenis_dokumen_referensi.dataset?.source"
            class="chart border" 
            style="width: 100%; height: 400px;" 
            :option="chart_bar_jenis_dokumen_referensi"
            autoresize/>
         </div>
         <div class="column is-full-mobile is-full-tablet is-half-desktop is-one-third-widescreen pb-1 pt-1">
            <v-chart
            :key="chart_bar_jenis_dokumen_referensi.dataset?.source"
            class="chart border" 
            style="width: 100%; height: 400px;" 
            :option="chart_bar_jenis_dokumen_referensi"
            autoresize/>
         </div>
         <div class="column is-full-mobile is-full-tablet is-half-desktop is-one-third-widescreen pb-1 pt-1">
            <v-chart
            :key="chart_bar_jenis_dokumen_referensi.dataset?.source"
            class="chart border" 
            style="width: 100%; height: 400px;" 
            :option="chart_bar_jenis_dokumen_referensi"
            autoresize/>
         </div>
      </div>
      <div class="is-divider p-0 m-0 mb-4" data-content="|"></div>

      <!-- https://stackoverflow.com/questions/52795558/how-to-accomplish-a-masonry-layout-like-google-keep-with-bulma -->
      <div class="card-columns columns-3-xl columns-3-lg columns-2-md columns-1-sm p-0">

         <div class="card card-content is-radiusless is-shadowless p-0">
            <div class="panel is-shadowless" style="border: 1px solid rgb(228, 222, 222);">
               <p 
                  class="panel-heading is-size-6 has-text-centered">10 Terbanyak Berdasarkan Analis<br />
                  <span class="is-size-7 has-text-grey-dark">(Th-2024) 1</span>
               </p>
               <div class="panel-block">
                  <table class="table is-striped is-narrow is-hoverable is-fullwidth">
                     <thead>
                        <tr>
                           <th>No.</th>
                           <th>Nama Analis</th>
                           <th>Jumlah</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <td>1</td>
                           <td>Proyekmu siap tampung traffic tinggi didukung fleksibilitas pilihan sistem operasi & isolasi resources 100%.</td>
                           <td>8000</td>
                        </tr>
                        <tr>
                           <td>2</td>
                           <td>Proyekmu siap tampung traffic tinggi didukung fleksibilitas pilihan sistem operasi & isolasi resources 100%.</td>
                           <td>8000</td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
         </div>

         <div class="card card-content is-radiusless is-shadowless p-0">
            <div class="panel is-shadowless" style="border: 1px solid rgb(228, 222, 222);">
               <p 
                  class="panel-heading is-size-6 has-text-centered">10 Terbanyak Berdasarkan Analis<br />
                  <span class="is-size-7 has-text-grey-dark">(Th-2024) 2</span>
               </p>
               <div class="panel-block">
                  <table class="table is-striped is-narrow is-hoverable is-fullwidth">
                     <thead>
                        <tr>
                           <th>No.</th>
                           <th>Nama Analis</th>
                           <th>Jumlah</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <td>1</td>
                           <td>Proyekmu siap tampung traffic tinggi didukung fleksibilitas pilihan sistem operasi & isolasi resources 100%.</td>
                           <td>8000</td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
         </div>

         <div class="card card-content is-radiusless is-shadowless p-0">
            <div class="panel is-shadowless" style="border: 1px solid rgb(228, 222, 222);">
               <p 
                  class="panel-heading is-size-6 has-text-centered">10 Terbanyak Berdasarkan Analis<br />
                  <span class="is-size-7 has-text-grey-dark">(Th-2024) 3</span>
               </p>
               <div class="panel-block">
                  <table class="table is-striped is-narrow is-hoverable is-fullwidth">
                     <thead>
                        <tr>
                           <th>No.</th>
                           <th>Nama Analis</th>
                           <th>Jumlah</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <td>1</td>
                           <td>Proyekmu siap tampung traffic tinggi didukung fleksibilitas pilihan sistem operasi & isolasi resources 100%.</td>
                           <td>8000</td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
         </div>

         <div class="card card-content is-radiusless is-shadowless p-0">
            <div class="panel is-shadowless" style="border: 1px solid rgb(228, 222, 222);">
               <p 
                  class="panel-heading is-size-6 has-text-centered">10 Terbanyak Berdasarkan Analis<br />
                  <span class="is-size-7 has-text-grey-dark">(Th-2024) 4</span>
               </p>
               <div class="panel-block">
                  <table class="table is-striped is-narrow is-hoverable is-fullwidth">
                     <thead>
                        <tr>
                           <th>No.</th>
                           <th>Nama Analis</th>
                           <th>Jumlah</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <td>1</td>
                           <td>Proyekmu siap tampung traffic tinggi didukung fleksibilitas pilihan sistem operasi & isolasi resources 100%.</td>
                           <td>8000</td>
                        </tr>
                        <tr>
                           <td>2</td>
                           <td>Proyekmu siap tampung traffic tinggi didukung fleksibilitas pilihan sistem operasi & isolasi resources 100%.</td>
                           <td>8000</td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
         </div>

         <div class="card card-content is-radiusless is-shadowless p-0">
            <div class="panel is-shadowless" style="border: 1px solid rgb(228, 222, 222);">
               <p 
                  class="panel-heading is-size-6 has-text-centered">10 Terbanyak Berdasarkan Analis<br />
                  <span class="is-size-7 has-text-grey-dark">(Th-2024) 5</span>
               </p>
               <div class="panel-block">
                  <table class="table is-striped is-narrow is-hoverable is-fullwidth">
                     <thead>
                        <tr>
                           <th>No.</th>
                           <th>Nama Analis</th>
                           <th>Jumlah</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <td>1</td>
                           <td>Proyekmu siap tampung traffic tinggi didukung fleksibilitas pilihan sistem operasi & isolasi resources 100%.</td>
                           <td>8000</td>
                        </tr>
                        <tr>
                           <td>1</td>
                           <td>Proyekmu siap tampung traffic tinggi didukung fleksibilitas pilihan sistem operasi & isolasi resources 100%.</td>
                           <td>8000</td>
                        </tr>
                        <tr>
                           <td>1</td>
                           <td>Proyekmu siap tampung traffic tinggi didukung fleksibilitas pilihan sistem operasi & isolasi resources 100%.</td>
                           <td>8000</td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
         </div>

         <div class="card card-content is-radiusless is-shadowless p-0">
            <div class="panel is-shadowless" style="border: 1px solid rgb(228, 222, 222);">
               <p 
                  class="panel-heading is-size-6 has-text-centered">10 Terbanyak Berdasarkan Analis<br />
                  <span class="is-size-7 has-text-grey-dark">(Th-2024) 6</span>
               </p>
               <div class="panel-block">
                  <table class="table is-striped is-narrow is-hoverable is-fullwidth">
                     <thead>
                        <tr>
                           <th>No.</th>
                           <th>Nama Analis</th>
                           <th>Jumlah</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <td>1</td>
                           <td>Proyekmu siap tampung traffic tinggi didukung fleksibilitas pilihan sistem operasi & isolasi resources 100%.</td>
                           <td>8000</td>
                        </tr>
                        <tr>
                           <td>2</td>
                           <td>Proyekmu siap tampung traffic tinggi didukung fleksibilitas pilihan sistem operasi & isolasi resources 100%.</td>
                           <td>8000</td>
                        </tr>
                        <tr>
                           <td>3</td>
                           <td>Proyekmu siap tampung traffic tinggi didukung fleksibilitas pilihan sistem operasi & isolasi resources 100%.</td>
                           <td>8000</td>
                        </tr>
                     </tbody>
                  </table>
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
import { LineChart, BarChart, PieChart, ThemeRiverChart } from "echarts/charts";
import {
VisualMapComponent,
GridComponent,
TitleComponent,
TooltipComponent,
LegendComponent,
ToolboxComponent,
DataZoomComponent,
MarkLineComponent,
DatasetComponent,
GraphicComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
 
use([
   DataZoomComponent,
   ToolboxComponent,
   VisualMapComponent,
   CanvasRenderer,
   GridComponent,
   DatasetComponent,
   GraphicComponent,
   LineChart,
   BarChart,
   PieChart,
   TitleComponent,
   TooltipComponent,
   LegendComponent,
   SVGRenderer,
   MarkLineComponent,
   ThemeRiverChart
]);
 export default {
   name: 'IntelDocSummary',
   components: {
      Loading,
      VChart,
      vSelect,
      bulmaQuickview
   },
   data() {
      return {
         s_base: null,
         kode_kantor: null,
         start_date: null,
         end_date: null,
         text_search: null,
         asc: true,
         jenis_dokumen: 'all',
         chart_pie_jenis_dokumen: {
            title: {
               text: 'Komposisi',
               subtext: 'Th-2024',
               left: 'left'
            },
            grid: {
               show: false,
               left: 10,
               top: 127,
               right: 40,
               bottom: 10,
               containLabel: true
            },
            tooltip: {
               trigger: 'item',
               formatter: `<span class='is-underlined'>{a}</span> <br/>{b} : {c} ({d}%)`
            },
            legend: {
               orient: 'vertical',
               left: 'left',
               // type: 'scroll',
               icon: '',
               top: 60,
               // height: 100,
               left: 0,
               textStyle: {
                  fontSize: 10
               },
            },
            // legend: {
            //    show: true,
            //    orient: 'horizontal',
            //    top: 60,
            //    textStyle: {
            //       fontSize: 10
            //    },
            //    type: 'scroll'
            // },
            toolbox: {
               show: true,
               feature: {
                  mark: { show: true },
                  dataView: { show: true, readOnly: false },
                  restore: { show: true },
                  saveAsImage: { show: true }
               }
            },
            series: [
               {
                  name: 'Jenis Dokumen',
                  type: 'pie',
                  // radius: '75%',
                  radius: [40, 150],
                  center: ['50%', '50%'],
                  roseType: 'area', // radius, area
                  data: [
                     { value: 1048, name: 'LPPI' },
                     { value: 735, name: 'LKAI' },
                     { value: 580, name: 'NHI' },
                     { value: 484, name: 'NI' },
                     { value: 300, name: 'PSA' },
                     { value: 400, name: 'NP' },
                     { value: 350, name: 'LI' }
                  ],
                  label: {
                     show: true,
                     alignTo: 'none', // labelLine, edge, none
                     formatter: '{name|{b}}\n{time|{d} %}',
                     // minMargin: 5,
                     // edgeDistance: 10,
                     lineHeight: 15,
                     rich: {
                        time: {
                           fontSize: 10,
                           color: '#999'
                        }
                     }
                  },
                  emphasis: {
                     itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                     }
                  }
               }
            ]
         },
         chart_bar_hitrate: {
            title: {
               text: 'Hitrate',
               subtext: 'Th-2024',
               left: 'center'
            },
            grid: {
               show: false,
               left: 10,
               top: 127,
               right: 40,
               bottom: 10,
               containLabel: true
            },
            tooltip: {
               trigger: 'item',
               // formatter: function(f) {
               //    console.log(f)
               //    return `<span class='is-underlined'>${f.seriesName}</span>`+
               //          `<br/><span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:#5470c6;"></span> Capaian: ${f.data['Capaian']}%`+
               //          `<br/><span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:#91cc75;"></span> Target: ${f.data['Target']}%`+
               //          `<br/><span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:#fac858;"></span> Rerata Capaian: ${f.data['Capaian']}%`
               // },
               formatter: function(f) {
                  return `<span class=''>${f.seriesName}</span>: ${f.data[f.seriesName]}%`;
               }
            },
            legend: {
               show: true,
               orient: 'horizontal',
               top: 60,
               textStyle: {
                  fontSize: 10
               },
            },
            toolbox: {
               show: true,
               feature: {
                  mark: { show: true },
                  dataView: { show: true, readOnly: false },
                  restore: { show: true },
                  saveAsImage: { show: true }
               }
            },
            dataset: {
               dimensions: ['hitrate', 'Capaian', 'Target'],
               source: [
                  { hitrate: '', 'Capaian': 45, 'Target': 60}
               ]
            },
            xAxis: { type: 'category' },
            yAxis: {},
            series: [
               { 
                  type: 'bar', 
                  label: { 
                     show: true, 
                     position: 'top', 
                     formatter: function(f) {
                        return f.data.Capaian + '%';
                     },
                     fontSize: '10'
                  },
               }, 
               { 
                  type: 'bar', 
                  label: {
                     show: true,
                     position: 'top',
                     formatter: function(f) {
                        return f.data.Target + '%';
                     },
                     fontSize: '10'
                  } 
               }
            ]
         },
         chart_line_dokumen_per_bulan: {
            title: {
               show: true,
               text: 'Tren',
               subtext: `Th-2024`,
               left: 'center'
            },
            grid: {
               show: false,
               left: 10,
               top: 127,
               right: 40,
               bottom: 10,
               containLabel: true
            },
            tooltip: {
               trigger: 'axis'
            },
            legend: {
               show: true,
               orient: 'horizontal',
               top: 60,
               textStyle: {
                  fontSize: 10
               },
            },
            toolbox: {
               show: true,
               top: 120,
               orient: 'vertical',
               feature: {
                  mark: { show: true },
                  restore: { show: true },
                  magicType: {
                     show: true, 
                     type: ['stack']
                  },
                  saveAsImage: { show: true }
               }
            },
            xAxis: [
               {
                  type: 'category',
                  axisLine: { 
                     show: false 
                  },
                  axisTick: {
                     show: false
                  },
                  data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
               }
            ],
            yAxis: {
               type: 'value'
            },
            series: [
               {
                  name: 'LPPI',
                  type: 'line',
                  // stack: 'Total',
                  data: [120, 132, 101, 134, 90, 230, 210],
                  smooth: true,
                  stackStrategy: 'samesign'
               },
               {
                  name: 'LKAI',
                  type: 'line',
                  // stack: 'Total',
                  data: [220, 182, 191, 54, 290, 330, 310],
                  smooth: true,
                  stackStrategy: 'samesign'
               },
               {
                  name: 'NHI',
                  type: 'line',
                  // stack: 'Total',
                  data: [150, 232, 201, 154, 190, 330, 410],
                  smooth: true,
                  stackStrategy: 'samesign'
               },
               {
                  name: 'NI',
                  type: 'line',
                  // stack: 'Total',
                  data: [320, 332, 301, 334, 390, 900, 320],
                  smooth: true,
                  stackStrategy: 'samesign'
               },
               {
                  name: 'PSA',
                  type: 'line',
                  // stack: 'Total',
                  data: [820, 50, 901, 934, 54, 1330, 1320],
                  smooth: true,
                  stackStrategy: 'samesign'
               },
               {
                  name: 'NP',
                  type: 'line',
                  // stack: 'Total',
                  data: [820, 932, 65, 500, 1290, 89, 1320],
                  smooth: true,
                  stackStrategy: 'samesign'
               },
               {
                  name: 'LI',
                  type: 'line',
                  // stack: 'Total',
                  data: [820, 700, 89, 934, 1290, 40, 1320],
                  smooth: true,
                  stackStrategy: 'samesign'
               }
            ]
         },
         chart_bar_jenis_dokumen_referensi: {
            title: {
               text: 'Referensi',
               subtext: 'Th-2024\n\nReferensi/sumber/dokumen terkait',
               left: 'center'
            },
            grid: {
               show: false,
               left: 10,
               top: 127,
               right: 40,
               bottom: 10,
               containLabel: true
            },
            legend: {
               show: false,
               orient: 'horizontal',
               top: 60,
               textStyle: {
                  fontSize: 10
               },
            },
            tooltip: {
               trigger: 'item',
               formatter: function(f) {
                  return `<span class=''>${f.name}</span>: ${f.value}`;
               }
            },
            xAxis: [
               {
                  type: 'category',
                  data: ['PIB', 'PEB', 'CN', 'PIBK', 'Lainnya'],
                  axisTick: {
                  alignWithLabel: true
                  }
               }
            ],
            yAxis: [
               {
                  type: 'value'
               }
            ],
            series: [
               {
                  name: 'Referensi',
                  type: 'bar',
                  barWidth: '60%',
                  data: [
                  {
                     value: 50,
                     itemStyle: {
                        color: '#2980B9'
                     },
                     label: { 
                        show: true, 
                        position: 'top', 
                        formatter: function(f) {
                           return f.value;
                        },
                        fontSize: '10'
                     },
                  },
                  {
                     value: 80,
                     itemStyle: {
                        color: '#76D7C4'
                     },
                     label: { 
                        show: true, 
                        position: 'top', 
                        formatter: function(f) {
                           return f.value;
                        },
                        fontSize: '10'
                     },
                  },
                  {
                     value: 180,
                     itemStyle: {
                        color: '#7DCEA0'
                     },
                     label: { 
                        show: true, 
                        position: 'top', 
                        formatter: function(f) {
                           return f.value;
                        },
                        fontSize: '10'
                     },
                  },
                  {
                     value: 50,
                     itemStyle: {
                        color: '#EB984E'
                     },
                     label: { 
                        show: true, 
                        position: 'top', 
                        formatter: function(f) {
                           return f.value;
                        },
                        fontSize: '10'
                     },
                  },
                  {
                     value: 150,
                     itemStyle: {
                        color: '#DAF7A6'
                     },
                     label: { 
                        show: true, 
                        position: 'top', 
                        formatter: function(f) {
                           return f.value;
                        },
                        fontSize: '10'
                     },
                  }
                  ],
                  showBackground: true,
                  backgroundStyle: {
                     color: 'rgba(180, 180, 180, 0.2)'
                  },
                  markPoint: {
                     data: [
                        { type: 'max', name: 'Max' },
                        { type: 'min', name: 'Min' }
                     ]
                  },
                  markLine: {
                     data: [{ type: 'average', name: 'Avg' }],
                     lineStyle: {
                        color: 'black'
                     },
                     label: {
                        position: 'end',
                        formatter: function (params) {
                           return new Intl.NumberFormat('id').format(params.value? params.value.toFixed(2) : 0);
                        }
                     }
                  }
               }
            ]
         },
         isLoading: false,
         fullPage: false,
         loader: 'spinner',
         start_date: new Date((new Date().getMonth() + 1).toString()+'/01/'+new Date().getFullYear().toString()),
         // start_date: new Date(new Date().getMonth().toString()+'/01/2022'),
         end_date: new Date(),
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
         });
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

<style scoped>
.card-columns {
   column-count: 1;
   column-gap: .5rem;
   padding: 1.5rem;
}

.card-columns .card {
   display: inline-block;
   width: 100%;
   margin-bottom: .5rem;
}

.columns-6 {
   column-count: 6;
}
.columns-5 {
   column-count: 5;
}
.columns-4 {
   column-count: 4;
}
.columns-3 {
   column-count: 3;
}
.columns-2 {
   column-count: 2;
}
.columns-1 {
   column-count: 1;
}

@media (min-width: 576px) {
  .columns-6-sm {
    column-count: 6;
  }
  .columns-5-sm {
    column-count: 5;
  }
  .columns-4-sm {
    column-count: 4;
  }
  .columns-3-sm {
    column-count: 3;
  }
  .columns-2-sm {
    column-count: 2;
  }
  .columns-1-sm {
    column-count: 1;
  }
}

@media (min-width: 768px) {
  .columns-6-md {
    column-count: 6;
  }
  .columns-5-md {
    column-count: 5;
  }
  .columns-4-md {
    column-count: 4;
  }
  .columns-3-md {
    column-count: 3;
  }
  .columns-2-md {
    column-count: 2;
  }
  .columns-1-md {
    column-count: 1;
  }
}

@media (min-width: 992px) { 
  .columns-6-lg {
    column-count: 6;
  }
  .columns-5-lg {
    column-count: 5;
  }
  .columns-4-lg {
    column-count: 4;
  }
  .columns-3-lg {
    column-count: 3;
  }
  .columns-2-lg {
    column-count: 2;
  }
  .columns-1-lg {
    column-count: 1;
  }
}

@media (min-width: 1200px) { 
  .columns-6-xl {
    column-count: 6;
  }
  .columns-5-xl {
    column-count: 5;
  }
  .columns-4-xl {
    column-count: 4;
  }
  .columns-3-xl {
    column-count: 3;
  }
  .columns-2-xl {
    column-count: 2;
  }
  .columns-1-xl {
    column-count: 1;
  }
}
</style>