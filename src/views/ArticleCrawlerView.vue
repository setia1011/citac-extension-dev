<template>
   <div ref="main" id="main" class="container is-fluid mt-5 p-32">
      <page-header></page-header>
      <div class="columns">
         <div class="column is-4">
            <div class="is-pulled-left">@</div>
            <div class="mb-2 buttons are-small is-pulled-right">
               <button v-if="mode==='create'" class="button is-success is-outlined mr-1">Create</button>
               <button v-if="mode==='edit'" class="button is-info is-outlined mr-1">Edit</button>
               <button v-if="mode==='edit'" class="button is-success is-outlined" v-on:click="reset">
                  <span class="icon"><i class="fa-light fa-square-plus"></i></span>
               </button>
            </div>
            <br>
            <br>
            <div class="mb-2 is-block">
               <v-select 
                  class="v-select v-media-sources" 
                  label="source"
                  append-to-body
                  v-model="s_media_sources" 
                  :reduce="s_media_sources => s_media_sources.id" 
                  placeholder="Select media sources"
                  @search="getMediaSources"
                  :options="s_media_sources_options">
               </v-select>
            </div>
            <div class="mb-2">
               <v-select 
                  v-model="s_crawler_keywords" 
                  placeholder="Crawler keywords" 
                  :selectable="() => s_crawler_keywords.length < 1" 
                  taggable 
                  multiple 
                  class="v-select" />
            </div>
            <div class="mb-2">
               <v-select 
                  v-model="s_crawler_status" 
                  :options="s_crawler_status_options" 
                  placeholder="Crawler status" 
                  class="v-select is-capitalized" />
            </div>
            <button class="button is-small is-dark" v-on:click="goCrawler($event)">
               <span class="is-capitalized">Submit</span>
            </button>
         </div>
         <div class="column is-8">
            <div class="box">
               <table class="table is-striped is-narrow is-hoverable is-fullwidth">
                  <thead>
                     <tr>
                        <th>No</th>
                        <th>Media</th>
                        <th class="is-hidden-touch">Keywords</th>
                        <th class="is-hidden-touch">Created At</th>
                        <th class="is-hidden-touch">Schedule</th>
                        <th>Status</th>
                        <th></th>
                     </tr>
                  </thead>
                  <tbody class="is-relative">
                     <loading class="loading" v-model:active="isLoading"
                     :can-cancel="false"
                     :background-color="'white'"
                     :opacity="1"
                     :height="25"
                     :width="25"
                     :z-index="25"
                     :loader="'spinner'"
                     :is-full-page="isFullPage">
                     </loading>
                     <template v-if="crawlers.length !== 0">
                        <tr v-for="(d, i) in crawlers.items" :key="i">
                           <th>{{ (page * pageSize) - pageSize + i + 1 }}.</th>
                           <td>{{ d.source.source }}</td>
                           <td class="is-hidden-touch">{{ d.keywords }}</td>
                           <td class="is-hidden-touch">{{ d.created_at }}</td>
                           <td class="is-hidden-touch">{{ d.schedule ? d.schedule : '/h' }}</td>
                           <td><span :class="(d.status === 'active') ? 'tag is-success' : 'tag is-danger'">{{ d.status }}</span></td>
                           <td class="p-0 m-0" style="text-align: right; width: 65px; vertical-align: middle;">
                              <span class="tag is-small is-info mr-1" style="vertical-align: middle !important; cursor: pointer;" v-on:click="editCrawler($event, d.id)">
                                 <i class="fa-sharp fa-solid fa-pen-to-square"></i>
                              </span>
                              <span class="tag is-small is-danger" style="vertical-align: middle !important; cursor: pointer;" v-on:click="deleteCrawler($event, d.id)">
                                 <i class="fa-light fa-trash-can"></i>
                              </span>
                           </td>
                        </tr>
                     </template>
                     <template v-else>
                        <tr >
                           <th></th>
                           <td></td>
                           <td>No data..</td>
                           <td></td>
                           <td></td>
                        </tr>
                     </template>
                  </tbody>
               </table>
               <nav class="level mt-3 mb-2">
                  <div class="level-left">
                     <div class="level-item">
                        <v-select 
                           class="v-selectx v-detik" 
                           label="text"
                           append-to-body
                           v-model="sKeywords" 
                           :reduce="sKeywords => sKeywords.value" 
                           placeholder="Select keywords"
                           @update:modelValue="sKeywordsChange"
                           :options="sKeywordsOptions">
                        </v-select>
                     </div>
                  </div>
                  <div class="level-right">
                     <div class="level-item">
                        <nav class="pagination is-right is-small">
                           <paginate
                           v-model="page"
                           :page-count="pageCount"
                           :page-range="3"
                           :margin-pages="0"
                           :click-handler="onClickCallback"
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
                           <div class="button is-small"><u>{{ page }}/{{ crawlers.total_pages }}</u>&nbsp;of&nbsp;<u>{{ crawlers.total_items }}</u>&nbsp;articles</div>
                     </div>
                  </div>
               </nav>
            </div>
         </div>
      </div>
   </div>
</template>
 
<script>
import Loading from "vue-loading-overlay";
import { toIdDate, toDbDate, toDate } from '../utils/useful';
import { imaxios } from '../utils/xaxios';
import Paginate from "vuejs-paginate-next";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
export default {
   name: 'ArticleCrawler',
   components: {
      vSelect,
      Paginate,
      Loading
   },
   data() {
      return {
         isLoading: false,
         isFullPage: false,
         date: null,
         mode: 'create',
         page: 1,
         pageCount: 0,
         pageSize: 10,
         crawler_id: null,
         media_sources: [],
         sKeywords: null,
         sKeywordsOptions: [],
         s_media_sources: null,
         s_media_sources_options: [],
         s_crawler_keywords: [],
         s_crawler_status: 'active',
         s_crawler_status_options: [
            'active',
            'not active'
         ],
         crawlers: []
      }
   },
   watch: {
      s_crawler_keywords: function(e) {
         // console.log(this.s_crawler_keywords);
      }
   },
   mounted() {
      this.date = toIdDate(new Date());
      this.getMediaSources();
      this.getCrawlerSettings();
   },
   methods: {
      reset: function() {
         this.mode = 'create';
         this.s_media_sources = this.s_media_sources_options[0].id;
         this.s_crawler_keywords = [];
         this.s_crawler_status = 'active';
      },
      getMediaSources: function() {
         imaxios.get("media-sources", {
         }).then((res) => {
            if (res.data) { 
               this.s_media_sources = res.data[0].id;
               this.s_media_sources_options = res.data;
            }
         })
      },
      getCrawlerSettings: function() {
         this.isLoading = true;
         this.crawlers = [];
         imaxios.get(`settings/crawler?keywords=${this.sKeywords ? this.sKeywords : ''}&page=${this.page}&per_page=${this.pageSize}`, {
         }).then((res) => {
            this.crawlers = res.data;
            this.pageCount = res.data.total_pages;
            this.sKeywordsOptions = res.data.keywords;
            this.crawlers.items.forEach((e, i) => {
               this.crawlers.items[i].created_at = toDate(e.created_at);
            });
            setTimeout(() => {
               this.isLoading = false;
            }, 400)
         })
      },
      sKeywordsChange: function(r = 'r') {
         if (r) { this.page = 1; this.pageCount = 0; }
         this.getCrawlerSettings();
      },
      editCrawler: function(e, id) {
         this.crawlers.items.forEach((v) => {
            if (v.id == id) {
               this.mode = 'edit';
               this.crawler_id = v.id;
               this.s_media_sources = v.source.id;
               this.s_crawler_keywords = v.keywords;
               this.s_crawler_status = v.status;
            }
         })
      },
      onClickCallback: function (pageNum) {
         this.page = pageNum;
         this.getCrawlerSettings();
      },
      deleteCrawler: function(e, id) {
         imaxios.delete(`settings/crawler?crawler_id=${id}`
         ).then((res) => {
            this.getCrawlerSettings();
         })
      },
      goCrawler: function(e) {
         if (this.crawler_id && this.mode === 'edit') {
            imaxios.patch(`settings/crawler?`+
               `crawler_id=${this.crawler_id}`+
               `&source_id=${this.s_media_sources}`+
               `&keywords=${this.s_crawler_keywords}`+
               `&status=${this.s_crawler_status}`
            ).then((res) => {
               this.getCrawlerSettings();
            })
         }
         if (this.s_crawler_keywords && this.s_crawler_status && this.s_media_sources && this.mode === 'create') {
            imaxios.post(`settings/crawler?`+
               `source_id=${this.s_media_sources}`+
               `&keywords=${this.s_crawler_keywords}`+
               `&status=${this.s_crawler_status}`
            ).then((res) => {
               this.getCrawlerSettings();
            })
         }
      }
   }
}
</script>

<style>
@import "bulma-list/css/bulma-list.css";
@import "bulma-extensions/bulma-quickview/dist/css/bulma-quickview.min.css";
@import "bulma-extensions/bulma-calendar/dist/css/bulma-calendar.min.css";

.loading {
   border: 1px solid #d9d9d9;
   border-radius: 4px;
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
.v-select {
   width: 100%;
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