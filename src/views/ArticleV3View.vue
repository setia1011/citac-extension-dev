<template>
   <div ref="main" id="main" class="container is-fluid mt-5 p-32">
       <page-header class="is-inline-block is-hidden"></page-header>
       <div class="is-pulled-right is-hidden">
           <button class="button is-small is-danger is-outlined box is-inline-block mr-1" v-on:click="gRefresh($event)">
               <span class="icon">
               <i class="fa-sharp fa-solid fa-rotate-right"></i>
               </span>
           </button>

           <button class="button is-small box is-inline-block is-info" data-show="quickview" data-target="quickviewDefault">
               <span class="icon">
               <i class="fa-regular fa-filter-list"></i>
               </span>
           </button>
       </div>

       <div id="quickviewDefault" class="quickview is-hidden">
           <header class="quickview-header is-light">
               <p class="title"><i class="fa-regular fa-filter-list"></i></p>
               <span class="delete" data-dismiss="quickview"></span>
           </header>

           <div class="quickview-body">
               <div class="quickview-block">
               <div class="columns is-multiline m-0">
                   <div class="column pb-0 is-full">
                       <button ref='calendarTrigger' type='button'>Change</button>
                   </div>
                   <div class="column pb-0 is-full">
                       <v-select 
                           label="text"
                           v-model="sMediaSources" 
                           :reduce="sMediaSources => sMediaSources.value" 
                           placeholder="Select Media Source"
                           @search="getMediaSources"
                           @update:modelValue="mediaSourceUpdate"
                           :options="sMediaSourcesOptions">
                       </v-select>
                   </div>
                   <div class="column pb-0 is-full">
                       <v-select 
                           label="text"
                           v-model="sArKeywords" 
                           :reduce="sArKeywords => sArKeywords.value" 
                           placeholder="Select keywords"
                           @search="getArKeywords"
                           :options="sArKeywordsOptions">
                       </v-select>
                   </div>
                   <div class="column pb-0 is-full">
                       <v-select v-model="qSearch" placeholder="Cari berdasarkan kata dalam artikel" taggable multiple class="v-qsearch" />
                   </div>
                   <div class="column pb-0 is-full">
                       <button class="button is-danger" v-on:click="gSearch($event)">
                           <span class="icon">
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
       <div class="mb-5 is-size-6 is-inline-block">
         <span class="pb-2 is-underlined">
            <!-- <i class="fa-duotone fa-spider" style="--fa-primary-color: #511f44; --fa-secondary-color: #511f44;"></i> -->
            <!-- <i class="fa-brands fa-internet-explorer"></i> -->
            <i class="fa-brands fa-internet-explorer" style="color: #368fd3;"></i>
         </span>
      </div>
       <div class="article-meta mb-4">
           <div class="box metax is-inline-block p-2">{{ metaArticle }}</div>
       </div>
       
       <div class="columns is-multiline is-variable is-1-mobile is-1-tablet is-1-desktop is-1-widescreen is-1-fullhd">
         <!-- C1 -->
         <div class="column is-full-mobile is-full-tablet is-half-desktop is-half-widescreen">
            <div>
               <div class="panel is-success">
                  <!-- <p class="panel-heading is-size-6 has-text-left">~<br /></p> -->
                  <div class="panel-block is-block">
                     <tabs id="tab-cnbc" 
                        class="tabs is-centered is-boxed is-block" 
                        :options="{ defaultTabHash: 'cnbc' }">
                        <tab id="c1" name="/med">
                           <div class="mt-1 is-relative">
                              <loading class="loading" v-model:active="arIsLoading"
                              :can-cancel="false"
                              :background-color="'white'"
                              :opacity="1"
                              :height="25"
                              :width="25"
                              :z-index="25"
                              :loader="'spinner'"
                              :is-full-page="arFullPage">
                              </loading>
                              
                              <v-chart v-if="this.c1.series?.length > 0"
                                 :key="c1.series"
                                 class="chart border mb-1"
                                 :option="c1"
                                 :initOptions="initOptions" 
                                 autoresize/>
                              <div v-else class="v-charte">
                                 <span>No data..</span>
                              </div>
                           </div>
                        </tab>
                        <tab id="c2" name="/key">
                           <div class="mt-1 is-relative">
                              <loading class="loading" v-model:active="arIsLoading"
                              :can-cancel="false"
                              :background-color="'white'"
                              :opacity="1"
                              :height="25"
                              :width="25"
                              :z-index="25"
                              :loader="'spinner'"
                              :is-full-page="arFullPage">
                              </loading>

                              <v-chart v-if="this.c2.series?.length > 0"
                                 :key="c2.series"
                                 class="chart border"
                                 :option="c2"
                                 :initOptions="initOptions" 
                                 autoresize/>
                              <div v-else class="v-charte">
                                 <span>No data..</span>
                              </div>
                           </div>
                        </tab>
                     </tabs>
                  </div>
               </div>
            </div>
         </div>
         <!-- C2 -->
         <div class="column is-full-mobile is-full-tablet is-half-desktop is-half-widescreen">
            <div>
               <div class="panel is-dark">
                  <!-- <p class="panel-heading is-size-6 has-text-left">Articles<br /></p> -->
                  <div class="panel-block is-block">
                     <tabs id="tab-detik" 
                        class="tabs is-centered is-boxed is-block" 
                        :options="{ defaultTabHash: 'media' }">
                        <tab id="detik" name="Index">
                           <div class="mt-1 is-relative">
                              <loading class="loading" v-model:active="arIsLoading"
                              :can-cancel="false"
                              :background-color="'white'"
                              :opacity="1"
                              :height="25"
                              :width="25"
                              :z-index="25"
                              :loader="'spinner'"
                              :is-full-page="arFullPage">
                              </loading>
                              <template v-for="(d, i) in articles.items" :key="i">
                                 <div class="list has-overflow-ellipsis has-visible-pointer-controls has-hoverable-list-items">
                                    <div class="list-item pl-0 pr-0">
                                          <div class="list-item-content mr-2">
                                             <div class="list-item-title">
                                                {{ d.title }}
                                             </div>
                                    
                                             <div class="description">
                                                <span class="has-text-weight-normal">{{ dateFormat(d.posted_at) }}</span> ~
                                                <span class="tag" 
                                                   :class="[
                                                      {'is-warning': d.source_details.id === 1}, 
                                                      {'is-success': d.source_details.id === 2},
                                                      {'is-danger': d.source_details.id === 3},
                                                      {'is-info': d.source_details.id === 4},
                                                      {'is-danger': d.source_details.id === 5},
                                                      {'is-primary': d.source_details.id === 6},
                                                      {'is-link': d.source_details.id === 7}
                                                      ]">
                                                   {{ d.source_details.source }}</span>&nbsp;
                                                <span 
                                                   class="tag is-light is-underlined is-lowercase mr-1" 
                                                   :class="[
                                                      {'is-warning': sArKeywords === x.keywords},
                                                      {'is-success': sArKeywords !== x.keywords}
                                                   ]" style="vertical-align: top;"
                                                   v-for="x in d.url_details.keywords">{{ x.keywords }}</span>
                                             </div>
                                          </div>
                                          
                                          <div class="list-item-controls">
                                          <div class="buttons">
                                             <a :href="d.url_details.url" target="_blank" class="button is-outlined is-small" style="border: 1px solid rgb(161, 184, 160);">
                                                <span class="icon">
                                                      <img class="is-flex" src="../assets/images/link-external-small.svg" alt="">
                                                </span>
                                             </a>
                                          </div>
                                          </div>
                                    </div>
                                 </div>
                              </template>
                           </div>
                           <div>
                              <nav class="level mt-3 mb-2">
                                 <!-- Left side -->
                                 <div class="level-left">
                                    <div class="level-item">
                                          <v-select 
                                             class="v-selectx v-detik" 
                                             label="text"
                                             append-to-body
                                             v-model="sArKeywords" 
                                             :reduce="sArKeywords => sArKeywords.value" 
                                             placeholder="Select keywords"
                                             @search="getArKeywords"
                                             @update:modelValue="sArKeywordsChange"
                                             :options="sArKeywordsOptions">
                                          </v-select>
                                    </div>
                                 </div>
                                 <!-- Right side -->
                                 <div class="level-right">
                                    <div class="level-item">
                                          <nav class="pagination is-right is-small">
                                             <paginate
                                             v-model="arPage"
                                             :page-count="arPageCount"
                                             :page-range="3"
                                             :margin-pages="0"
                                             :click-handler="arClickCallback"
                                             :prev-link-class="'pagination-link'"
                                             :page-link-class="'pagination-link'"
                                             :next-link-class="'pagination-link'"
                                             :prev-text="'<i class=\'fa-solid fa-arrow-left\'></i>'"
                                             :next-text="'<i class=\'fa-solid fa-arrow-right\'></i>'"
                                             :no-li-surround="true"
                                             :active-class="'is-current'"
                                             :first-last-button="true"
                                             :first-button-text="'<i class=\'fa-solid fa-arrow-left-long-to-line\'></i>'"
                                             :last-button-text="'<i class=\'fa-solid fa-arrow-right-long-to-line\'></i>'"
                                             :hide-prev-next="true"
                                             :container-class="'pagination-list'"
                                             >
                                             </paginate>
                                          </nav>
                                    </div>
                                 </div>
                              </nav>

                              <nav id="nd-levelx" class="level mt-0 mb-3">
                                 <!-- Left side -->
                                 <div class="level-left">
                                    <div class="level-item">
                                          
                                    </div>
                                 </div>
                                 <!-- Right side -->
                                 <div class="level-right mt-0">
                                    <div class="level-item">
                                          <div class="button is-small"><u>{{ arPage }}/{{ articles.total_pages }}</u>&nbsp;of&nbsp;<u>{{ articles.total_items }}</u>&nbsp;articles</div>
                                    </div>
                                 </div>
                              </nav>
                           </div>
                        </tab>
                     </tabs>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
 
<script>
// var _ = require('lodash');
// import debounce from 'lodash.debounce';
import { imaxios } from "../utils/xaxios";
import Loading from "vue-loading-overlay";
import moment from "moment";
import Paginate from "vuejs-paginate-next";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import bulmaQuickview from "bulma-extensions/bulma-quickview/dist/js/bulma-quickview";
import bulmaCalendar from "bulma-extensions/bulma-calendar/dist/js/bulma-calendar";
import { ref } from "vue";

import { use } from "echarts/core";
import { CanvasRenderer, SVGRenderer } from "echarts/renderers";
import { LineChart, BarChart, ThemeRiverChart, PieChart, TreeChart } from "echarts/charts";
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
   PieChart,
   TreeChart,
   TitleComponent,
   TooltipComponent,
   LegendComponent,
   SVGRenderer,
   MarkLineComponent,
   ThemeRiverChart
]);

export default {
   name: 'ArticleV3',
   components: {
      Loading,
      VChart,
      Paginate,
      vSelect,
      bulmaQuickview
   },
   setup() {
      const calendar = ref(null);
      return {
         calendar
      }
   },
   data() {
      return {
         initOptions: {
            renderer: "png",
            width: 'auto',
            height: '430px'
         },
         // Stats
         colors: ['blue','green','yellow','black','gray'],
         c1: {},
         c2: {},
         // All
         arIsLoading: false,
         arFullPage: false,
         arSourceId: null,
         articles: [],
         arPage: 1,
         arPageCount: 0,
         arPageSize: 10,
         sArKeywords: null,
         sArKeywordsOptions: [],
         sMediaSources: null,
         sMediaSourcesOptions: [],
         // global
         start_date: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
         end_date: new Date(),
         sD: this.toDatabaseDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1)),
         eD: this.toDatabaseDate(new Date()),
         metaArticle: {
            'keywords': '',
            'contains_texts': '',
            'from': this.toIdDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1)),
            'to': this.toIdDate(new Date())
         },
         qSearch: []
      }
   },  
   mounted() {
      bulmaQuickview.attach();
      this.initCalendar();
      this.getMediaSources();
      this.getArKeywords();
      this.gSearch();
   },
   methods: {
      initCalendar: function() {
         this.calendar = bulmaCalendar.attach(this.$refs.calendarTrigger, {
               startDate: this.start_date,
               endDate: this.end_date,
               type: 'date',
               dateFormat: 'DD/MM/YYYY',
               isRange: true,
               displayMode: 'default',
               color: 'primary'
         })[0]

         this.calendar.on("hide", event => {
               this.start_date = event.data.date.start;
               this.end_date = event.data.date.end;
               this.sD = this.toDatabaseDate(this.start_date);
               this.eD = this.toDatabaseDate(this.end_date);
         });

         this.calendar.on("clear", event => {
               this.start_date = null;
               this.end_date = null;
               this.sD = "";
               this.eD = "";
         });

         this.calendar.on("select", event => {
               this.start_date = event.data.date.start;
               this.end_date = event.data.date.end;
               this.sD = this.toDatabaseDate(this.start_date);
               this.eD = this.toDatabaseDate(this.end_date);
         })
      },
      dateFormat: function(d) {
         return moment(d).format('DD/MM/YYYY');
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
      gReset: function() {
         this.qSearch = [];
         this.arSourceId = null;
         this.articles = [];
         this.arPage = 1;
         this.arPageCount = 0;
         this.arPageSize = 10;
         this.sMediaSources = null;
         this.sMediaSourcesOptions = [];
         this.sArKeywords = null;
         this.sArKeywordsOptions = [];
      },
      gSearch: function() {
         if (this.sD === 'undefined-undefined-undefined' || this.eD === 'undefined-undefined-undefined') {
            this.sD = "";
            this.eD = "";
         }
         this.arPage = 1;
         this.arPageCount = 0;
         this.arPageSize = 10;
         this.metaArticle.keywords = this.sArKeywords;
         this.metaArticle.contains_texts = this.qSearch;
         this.metaArticle.from = this.toIdDate(this.start_date);
         this.metaArticle.to = this.toIdDate(this.end_date);
         this.getMediaSources();
         this.getArKeywords();
         this.getArticles(String(this.qSearch).replace(',','|'), this.sArKeywords, this.sD, this.eD);
      },
      gRefresh: function() {
         this.gReset();
         this.start_date = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
         this.end_date = new Date();
         this.sD = this.toDatabaseDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
         this.eD = this.toDatabaseDate(new Date());
         this.metaArticle = {
            'keywords': '',
            'contains_texts': '',
            'from': this.toIdDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1)),
            'to': this.toIdDate(new Date())
         },
         this.getMediaSources();
         this.getArKeywords();
         this.getArticles();
         this.arIsLoading = true;
         setTimeout(() => {
            this.arIsLoading = false;
         }, 500)
      },
      getArticles: function(qS = String(this.qSearch).replace(',','|'), keywords = this.sArKeywords, sD = this.sD, eD = this.eD) {
         this.arIsLoading = true;
         imaxios.get(`contents?`+
         `contains_texts=${qS}&`+
         `keywords=${keywords ? keywords : ''}&`+
         `from_date=${sD}&`+
         `to_date=${eD}&`+
         `source_id=${this.arSourceId ? this.arSourceId : ''}&`+
         `page=${this.arPage}&`+
         `per_page=${this.arPageSize}`, {
         }).then((res) => {
               setTimeout(() => {
                  this.arIsLoading = false;
                  this.articles = res.data
                  this.arPageCount = res.data.total_pages;
                  let c1x = [];
                  res.data.total_items_by_sources.forEach((e) => {
                     if (e.source == 'Detik') {
                        c1x.push({value: e.total, name: e.source, itemStyle: {color: 'hsl(348deg, 86%, 61%)'}});
                     } else if (e.source == 'CNN Indonesia') {
                        c1x.push({value: e.total, name: e.source, itemStyle: {color: '#48c78e'}});
                     } else if (e.source == 'Okezone') {
                        c1x.push({value: e.total, name: e.source, itemStyle: {color: 'hsl(171deg, 100%, 41%)'}});
                     } else if (e.source == 'CNBC Indonesia') {
                        c1x.push({value: e.total, name: e.source, itemStyle: {color: '#ffe08a'}});
                     } else if (e.source == 'Kompas') {
                        c1x.push({value: e.total, name: e.source, itemStyle: {color: 'hsl(207deg, 61%, 53%)'}});
                     } else {
                        c1x.push({value: e.total, name: e.source});
                     }
                  });
                  this.c1 = {
                     legend: {
                        top: 'top'
                     },
                     toolbox: {
                        show: false,
                        feature: {
                           mark: { show: true },
                           dataView: { show: true, readOnly: false },
                           restore: { show: true },
                           saveAsImage: { show: true }
                        }
                     },
                     series: [
                        {
                           name: 'C1',
                           type: 'pie',
                           radius: [50, 150],
                           center: ['50%', '50%'],
                           roseType: 'area',
                           itemStyle: {
                              borderRadius: 8,
                              borderColor: '#fff',
                              borderWidth: 1
                           },
                           data: c1x,
                           label: {
                              alignTo: 'edge',
                              formatter: '{name|{b}}\n{value|{c} articles}',
                              minMargin: 5,
                              edgeDistance: 10,
                              lineHeight: 15,
                              rich: {
                                 time: {
                                    fontSize: 10,
                                    color: '#999'
                                 }
                              }
                           },
                        }
                     ]
                  };
                  let c2x = [];
                  res.data.total_items_by_keywords.forEach((e) => {
                     c2x.push({'name': e.keywords, 'value': e.total});
                  });
                  this.c2 = {
                     tooltip: {
                        trigger: 'item',
                        triggerOn: 'mousemove'
                     },
                     series: [
                        {
                           type: 'tree',
                           data: [{"name": "keywords", "value": 10, "children": c2x}],
                           left: '2%',
                           right: '2%',
                           top: '40%',
                           bottom: '5%',
                           symbol: 'emptyCircle',
                           orient: 'BT',
                           expandAndCollapse: true,
                           tooltip: {
                              formatter: '{b} <br />({c} articles)'
                           },
                           label: {
                              position: 'bottom',
                              rotate: 90,
                              verticalAlign: 'middle',
                              align: 'right',
                              formatter: function(d) {
                                 if (d.name === 'keywords') {
                                    return "";
                                 } else {
                                    return d.name + ` (${d.value})`;
                                 }
                              }
                           },
                           leaves: {
                              label: {
                                 position: 'top',
                                 rotate: 90,
                                 verticalAlign: 'middle',
                                 align: 'left'
                              }
                           },
                           emphasis: {
                              focus: 'descendant'
                           },
                           animationDurationUpdate: 750
                        }
                     ]
                  }
               }, 500)
         })
      },
      getArKeywords: function(qS = String(this.qSearch).replace(',','|'), keywords = this.sArKeywords, sD = this.sD, eD = this.eD) {
         imaxios.get(`contents-keywords?`+
         `contains_texts=${qS}&`+
         `keywords=${keywords ? keywords : ''}&`+
         `from_date=${sD}&`+
         `to_date=${eD}&`+
         `source_id=${this.arSourceId ? this.arSourceId : ''}`, {
         }).then((res) => {
               // this.sArKeywords = res.data;
               this.sArKeywordsOptions = res.data;
         })
      },
      getMediaSources: function(qS = String(this.qSearch).replace(',','|'), keywords = this.sArKeywords, sD = this.sD, eD = this.eD) {
         imaxios.get(`contents-sources?`+
         `contains_texts=${qS}&`+
         `keywords=${keywords ? keywords : ''}&`+
         `from_date=${sD}&`+
         `to_date=${eD}&`+
         `source_id=${this.arSourceId ? this.arSourceId : ''}`, {
         }).then((res) => {
               // this.sMediaSources = res.data;
               this.sMediaSourcesOptions = res.data;
         })
      },
      mediaSourceUpdate: function(id) {
         this.arSourceId = id;
      },
      arClickCallback: function (pageNum) {
         this.arPage = pageNum;
         if (this.sArKeywords) {
               this.sArKeywordsChange('');
         } else { this.getArticles(); }
      },
      sArKeywordsChange: function(r = 'r') {
         if (r) { this.arPage = 1; this.arPageCount = 0; }
         this.getArticles(String(this.qSearch).replace(',','|'), this.sArKeywords, this.sD, this.eD);
         this.metaArticle.keywords = this.sArKeywords;
      }
   }
}
</script>

<style>
@import "bulma-list/css/bulma-list.css";
@import "bulma-extensions/bulma-quickview/dist/css/bulma-quickview.min.css";
@import "bulma-extensions/bulma-calendar/dist/css/bulma-calendar.min.css";
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

.list-item {
   padding: .25em 0 .25em 0!important;
   border-bottom: 1px solid #e4dede !important;
}
.list-item:not(:last-child) {
   border-bottom: 1px solid #e4dede !important;
}
.metax {
   /* border: 1.2px inset rgb(198 207 201); 
   display: inline-block; 
   padding: 1px 4px; 
   border-radius: 3px; 
   background-color: #c9c7c64f; 
   border-style: inset; 
   font-size: large; */
   font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
table tr, table td {
   vertical-align: middle !important;
}
.v-selectx {
   height: 30px;
}
.v-selectx .vs__open-indicator {
   margin: 3px 4px 2px 0;
}
.v-selectx .vs__selected {
   margin: 1px 4px 0px 0;
}
.v-selectx .v__selected, .v-selectx .vs__search {
   padding: 0 .25em !important;
   margin: 0px 2px 0 !important;
}
.v-selectx .vs__search:focus {
   padding: 0 .25em !important;
}
.v-selectx .vs__clear {
   line-height: 1em;
}
/* select detik */
.v-detik, .v-detik .vs__dropdown-option, .v-detik .vs__dropdown-menu {
  min-width: 160px !important;
}
.vs__search, .vs__search:focus {
   z-index: inherit;
}
#tab-detik > ul, #tab-cnbc > ul, #tab-cnn > ul {
   justify-content: left !important;
}
#tab-detik .pagination-link, #tab-cnbc .pagination-link, #tab-cnn .pagination-link {
   border: 1px solid hsl(0deg, 0%, 71%);
   border-radius: 4px !important;
   padding: 0px !important;
}
.ima-link-eks {
   padding: 0 !important;
   margin: 0 !important;
}
@media screen and (max-width: 768px) {
   .level-left + .level-right {
       margin-top: .7rem;
   }
   #nd-levelx .level-right {
       margin-top: .3rem !important;
   }
}
.datetimepicker {
   z-index: 999999 !important;
}
</style>

<style scoped>
#main {
   position: relative;
   min-height: calc(100vh - 120px);
}
</style>