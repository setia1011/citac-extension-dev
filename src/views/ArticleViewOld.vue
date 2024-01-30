<template>
   <div ref="main" id="main" class="container is-fluid mt-5 p-32">
       <page-header class="is-inline-block"></page-header>
       <div class="is-pulled-right">
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

       <div id="quickviewDefault" class="quickview">
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
                           v-model="gKeywords" 
                           :reduce="gKeywords => gKeywords.value" 
                           placeholder="Select keywords"
                           @update:modelValue="getKeywordsChange"
                           @search="getKeywords"
                           :options="gKeywordsOptions">
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
       
       <div class="article-meta mb-4">
           <div class="metax">{{ metaArticle }}</div>
       </div>
       <div class="columns is-multiline is-variable is-1-mobile is-1-tablet is-1-desktop is-1-widescreen is-1-fullhd">
           <!-- Detik -->
           <div class="column is-full-mobile is-full-tablet is-half-desktop is-half-widescreen">
              <div>
                 <div class="panel is-info" style="border-radius: 0px !important;">
                    <p 
                       class="panel-heading is-size-6 has-text-left" 
                       style="border-radius: 0 0 0 0 !important;">Detik<br />
                    </p>
                    <div class="panel-block is-block">
                       <tabs id="tab-detik" 
                          class="tabs is-centered is-boxed is-block" 
                          :options="{ defaultTabHash: 'detik' }">
                          <tab id="detik" name="/">
                             <div class="mt-1 is-relative" style="border-bottom: 1px solid hsl(0deg, 0%, 71%);">
                               <loading class="loading" v-model:active="detikIsLoading"
                               :can-cancel="false"
                               :background-color="'white'"
                               :opacity="1"
                               :height="25"
                               :width="25"
                               :z-index="25"
                               :loader="'spinner'"
                               :is-full-page="detikFullPage">
                               </loading>
                                <table class="table is-striped is-narrow is-hoverable is-fullwidth">
                                   <thead>
                                      <tr>
                                           <th>Date</th>
                                           <th>Title</th>
                                           <th>Keywords</th>
                                      </tr>
                                   </thead>
                                   <tbody>
                                      <tr v-for="(d, i) in detik.items" :key="i">
                                           <td class="is-pull-right has-text-left">{{ dateFormat(d.posted_at) }}</td>
                                           <td class="has-text-left" style="word-wrap: break-word; white-space: pre-wrap;">{{ d.title }} ~
                                               <a class="ima-link-eks has-text-info is-inline-block" 
                                               :href="d.url_details.url" target="_blank"><img style="max-width: 75%;" class="is-flex" src="../assets/images/link-external-small.svg" alt=""></a></td>
                                           <td class="has-text-left" style="word-wrap: break-word; white-space: pre-wrap;">{{ d.url_details.keywords }}</td>
                                      </tr>
                                   </tbody>
                                </table>
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
                                               v-model="sDetikKeywords" 
                                               :reduce="sDetikKeywords => sDetikKeywords.value" 
                                               placeholder="Select keywords"
                                               @search="getDetikKeywords"
                                               @update:modelValue="sDetikKeywordsChange"
                                               :options="sDetikKeywordsOptions">
                                           </v-select>
                                       </div>
                                   </div>
                                   <!-- Right side -->
                                   <div class="level-right">
                                       <div class="level-item">
                                           <nav class="pagination is-right is-small">
                                               <paginate
                                               v-model="detikPage"
                                               :page-count="detikPageCount"
                                               :page-range="3"
                                               :margin-pages="0"
                                               :click-handler="detikClickCallback"
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
                                           <div class="button is-small"><u>{{ detikPage }}/{{ detik.total_pages }}</u>&nbsp;of&nbsp;<u>{{ detik.total_items }}</u>&nbsp;articles</div>
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
           <!-- CNBC -->
           <div class="column is-full-mobile is-full-tablet is-half-desktop is-half-widescreen">
              <div>
                 <div class="panel is-success" style="border-radius: 0px !important;">
                    <p 
                       class="panel-heading is-size-6 has-text-left" 
                       style="border-radius: 0 0 0 0 !important;">CNBC Indonesia<br />
                    </p>
                    <div class="panel-block is-block">
                       <tabs id="tab-cnbc" 
                          class="tabs is-centered is-boxed is-block" 
                          :options="{ defaultTabHash: 'cnbc' }">
                          <tab id="cnbc" name="/">
                             <div class="mt-1 is-relative" style="border-bottom: 1px solid hsl(0deg, 0%, 71%);">
                               <loading class="loading" v-model:active="cnbcIsLoading"
                               :can-cancel="false"
                               :background-color="'white'"
                               :opacity="1"
                               :height="25"
                               :width="25"
                               :z-index="25"
                               :loader="'spinner'"
                               :is-full-page="cnbcFullPage">
                               </loading>
                                <table class="table is-striped is-narrow is-hoverable is-fullwidth">
                                   <thead>
                                      <tr>
                                           <th>Date</th>
                                           <th>Title</th>
                                           <th>Keywords</th>
                                      </tr>
                                   </thead>
                                   <tbody>
                                      <tr v-for="(d, i) in cnbc.items" :key="i">
                                           <td class="is-pull-right has-text-left">{{ dateFormat(d.posted_at) }}</td>
                                           <td class="has-text-left" style="word-wrap: break-word; white-space: pre-wrap;">{{ d.title }} ~
                                               <a class="ima-link-eks has-text-info is-inline-block" 
                                               :href="d.url_details.url" target="_blank"><img style="max-width: 75%;" class="is-flex" src="../assets/images/link-external-small.svg" alt=""></a></td>
                                           <td class="has-text-left" style="word-wrap: break-word; white-space: pre-wrap;">{{ d.url_details.keywords }}</td>
                                      </tr>
                                   </tbody>
                                </table>
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
                                               v-model="sCNBCKeywords" 
                                               :reduce="sCNBCKeywords => sCNBCKeywords.value" 
                                               placeholder="Select keywords"
                                               @search="getCNBCKeywords"
                                               @update:modelValue="sCNBCKeywordsChange"
                                               :options="sCNBCKeywordsOptions">
                                           </v-select>
                                       </div>
                                   </div>
                                   <!-- Right side -->
                                   <div class="level-right">
                                       <div class="level-item">
                                           <nav class="pagination is-right is-small">
                                               <paginate
                                               v-model="cnbcPage"
                                               :page-count="cnbcPageCount"
                                               :page-range="3"
                                               :margin-pages="0"
                                               :click-handler="cnbcClickCallback"
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
                                           <div class="button is-small"><u>{{ cnbcPage }}/{{ cnbc.total_pages }}</u>&nbsp;of&nbsp;<u>{{ cnbc.total_items }}</u>&nbsp;articles</div>
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
           <!-- CNN -->
           <div class="column is-full-mobile is-full-tablet is-half-desktop is-half-widescreen">
              <div>
                 <div class="panel is-warning" style="border-radius: 0px !important;">
                    <p 
                       class="panel-heading is-size-6 has-text-left" 
                       style="border-radius: 0 0 0 0 !important;">CNN Indonesia<br />
                    </p>
                    <div class="panel-block is-block">
                       <tabs id="tab-cnn" 
                          class="tabs is-centered is-boxed is-block" 
                          :options="{ defaultTabHash: 'cnn' }">
                          <tab id="cnn" name="/">
                             <div class="mt-1 is-relative" style="border-bottom: 1px solid hsl(0deg, 0%, 71%);">
                               <loading class="loading" v-model:active="cnnIsLoading"
                               :can-cancel="false"
                               :background-color="'white'"
                               :opacity="1"
                               :height="25"
                               :width="25"
                               :z-index="25"
                               :loader="'spinner'"
                               :is-full-page="cnnFullPage">
                               </loading>
                                <table class="table is-striped is-narrow is-hoverable is-fullwidth">
                                   <thead>
                                      <tr>
                                           <th>Date</th>
                                           <th>Title</th>
                                           <th>Keywords</th>
                                      </tr>
                                   </thead>
                                   <tbody>
                                      <tr v-for="(d, i) in cnn.items" :key="i">
                                           <td class="is-pull-right has-text-left">{{ dateFormat(d.posted_at) }}</td>
                                           <td class="has-text-left" style="word-wrap: break-word; white-space: pre-wrap;">{{ d.title }} ~
                                               <a class="ima-link-eks has-text-info is-inline-block" 
                                               :href="d.url_details.url" target="_blank"><img style="max-width: 75%;" class="is-flex" src="../assets/images/link-external-small.svg" alt=""></a></td>
                                           <td class="has-text-left" style="word-wrap: break-word; white-space: pre-wrap;">{{ d.url_details.keywords }}</td>
                                      </tr>
                                   </tbody>
                                </table>
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
                                               v-model="sCNNKeywords" 
                                               :reduce="sCNNKeywords => sCNNKeywords.value" 
                                               placeholder="Select keywords"
                                               @search="getCNNKeywords"
                                               @update:modelValue="sCNNKeywordsChange"
                                               :options="sCNNKeywordsOptions">
                                           </v-select>
                                       </div>
                                   </div>
                                   <!-- Right side -->
                                   <div class="level-right">
                                       <div class="level-item">
                                           <nav class="pagination is-right is-small">
                                               <paginate
                                               v-model="cnnPage"
                                               :page-count="cnnPageCount"
                                               :page-range="3"
                                               :margin-pages="0"
                                               :click-handler="cnnClickCallback"
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
                                           <div class="button is-small"><u>{{ cnnPage }}/{{ cnn.total_pages }}</u>&nbsp;of&nbsp;<u>{{ cnn.total_items }}</u>&nbsp;articles</div>
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

           <!-- CNN -->
           <div class="column is-full-mobile is-full-tablet is-half-desktop is-half-widescreen">
              <div>
                 <div class="panel is-warning" style="border-radius: 0px !important;">
                    <p 
                       class="panel-heading is-size-6 has-text-left" 
                       style="border-radius: 0 0 0 0 !important;">CNN Indonesia<br />
                    </p>
                    <div class="panel-block is-block">
                       <tabs id="tab-cnn" 
                          class="tabs is-centered is-boxed is-block" 
                          :options="{ defaultTabHash: 'cnn' }">
                          <tab id="cnn" name="/">
                             <div class="mt-1 is-relative" style="border-bottom: 1px solid hsl(0deg, 0%, 71%);">
                               <loading class="loading" v-model:active="cnnIsLoading"
                               :can-cancel="false"
                               :background-color="'white'"
                               :opacity="1"
                               :height="25"
                               :width="25"
                               :z-index="25"
                               :loader="'spinner'"
                               :is-full-page="cnnFullPage">
                               </loading>
                                <!-- <table class="table is-striped is-narrow is-hoverable is-fullwidth">
                                   <thead>
                                      <tr>
                                           <th>Date</th>
                                           <th>Title</th>
                                           <th>Keywords</th>
                                      </tr>
                                   </thead>
                                   <tbody>
                                      <tr v-for="(d, i) in cnn.items" :key="i">
                                           <td class="is-pull-right has-text-left">{{ dateFormat(d.posted_at) }}</td>
                                           <td class="has-text-left" style="word-wrap: break-word; white-space: pre-wrap;">{{ d.title }} ~
                                               <a class="ima-link-eks has-text-info is-inline-block" 
                                               :href="d.url_details.url" target="_blank"><img style="max-width: 75%;" class="is-flex" src="../assets/images/link-external-small.svg" alt=""></a></td>
                                           <td class="has-text-left" style="word-wrap: break-word; white-space: pre-wrap;">{{ d.url_details.keywords }}</td>
                                      </tr>
                                   </tbody>
                                </table> -->
                                <div class="list has-overflow-ellipsis has-visible-pointer-controls has-hoverable-list-items" v-for="(d, i) in cnn.items" :key="i">
                                   <div class="list-item">
                                       <div class="list-item-image">
                                       <figure class="image is-64x64">
                                           <img src="../assets/images/newspapers-2.svg">
                                       </figure>
                                       </div>
                                       
                                       <div class="list-item-content">
                                       <div class="list-item-title">
                                           {{ d.title }}
                                       </div>
                               
                                       <div class="description">
                                           {{ dateFormat(d.posted_at) }} ~ {{ d.url_details.keywords }}
                                       </div>
                                       </div>
                                       
                                       <div class="list-item-controls">
                                       <div class="buttons">
                                           <button class="button is-dark is-outlined">
                                               <span class="icon">
                                                   <a class="ima-link-eks has-text-info is-inline-block" 
                                               :href="d.url_details.url" target="_blank"><img class="is-flex" src="../assets/images/link-external-small.svg" alt=""></a>
                                               </span>
                                           </button>
                                       </div>
                                       </div>
                                   </div>
                               </div>
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
                                               v-model="sCNNKeywords" 
                                               :reduce="sCNNKeywords => sCNNKeywords.value" 
                                               placeholder="Select keywords"
                                               @search="getCNNKeywords"
                                               @update:modelValue="sCNNKeywordsChange"
                                               :options="sCNNKeywordsOptions">
                                           </v-select>
                                       </div>
                                   </div>
                                   <!-- Right side -->
                                   <div class="level-right">
                                       <div class="level-item">
                                           <nav class="pagination is-right is-small">
                                               <paginate
                                               v-model="cnnPage"
                                               :page-count="cnnPageCount"
                                               :page-range="3"
                                               :margin-pages="0"
                                               :click-handler="cnnClickCallback"
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
                                           <div class="button is-small"><u>{{ cnnPage }}/{{ cnn.total_pages }}</u>&nbsp;of&nbsp;<u>{{ cnn.total_items }}</u>&nbsp;articles</div>
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

export default {
   name: 'Article',
   components: {
       Loading,
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
           // detik
           detikIsLoading: false,
           detikFullPage: false,
           detikSourceId: 3,
           detik: [],
           detikKeywords: [],
           detikKeywordsSelected: null,
           detikPage: 1,
           detikPageCount: 0,
           detikPageSize: 5,
           sDetikKeywords: null,
           sDetikKeywordsOptions: [],
           // cnbc
           cnbcIsLoading: false,
           cnbcFullPage: false,
           cnbcSourceId: 1,
           cnbc: [],
           cnbcKeywords: [],
           cnbcKeywordsSelected: null,
           cnbcPage: 1,
           cnbcPageCount: 0,
           cnbcPageSize: 5,
           sCNBCKeywords: null,
           sCNBCKeywordsOptions: [],
           // cnn
           cnnIsLoading: false,
           cnnFullPage: false,
           cnnSourceId: 2,
           cnn: [],
           cnnKeywords: [],
           cnnKeywordsSelected: null,
           cnnPage: 1,
           cnnPageCount: 0,
           cnnPageSize: 5,
           sCNNKeywords: null,
           sCNNKeywordsOptions: [],
           // global
           gKeywords: null,
           gKeywordsOptions: [],
           start_date: new Date('01/01/'+new Date().getFullYear().toString()),
           end_date: new Date(),
           sD: this.toDatabaseDate(new Date('01/01/'+new Date().getFullYear().toString())),
           eD: this.toDatabaseDate(new Date()),
           metaArticle: {
               'keywords': '',
               'contains_texts': '',
               'from': this.toIdDate(new Date('01/01/'+new Date().getFullYear().toString())),
               'to': this.toIdDate(new Date())
           },
           qSearch: []
       }
   },
   computed: {
   },  
   mounted() {
       bulmaQuickview.attach();
       this.initCalendar();
       this.gSearch();
       this.getKeywords();
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
           // global
           // this.gKeywords = '';
           // this.gKeywordsOptions = [];
           // this.start_date = new Date(new Date().getMonth().toString()+'/01/'+new Date().getFullYear().toString());
           // this.end_date = new Date();
           // this.sD = this.toDatabaseDate(new Date(new Date().getMonth().toString()+'/01/'+new Date().getFullYear().toString()));
           // this.eD = this.toDatabaseDate(new Date());
           // this.metaArticle = {
           //     'keywords': '',
           //     'contains_texts': '',
           //     'from': this.toIdDate(new Date(new Date().getMonth().toString()+'/01/'+new Date().getFullYear().toString())),
           //     'to': this.toIdDate(new Date())
           // },
           // this.qSearch = [];

           // detik
           this.detik= [];
           this.detikKeywords= [];
           this.detikKeywordsSelected= null;
           this.detikPage= 1;
           this.detikPageCount= 0;
           this.detikPageSize= 5;
           this.sDetikKeywords= null;
           this.sDetikKeywordsOptions= [];
           // cnbc
           this.cnbc= [];
           this.cnbcKeywords= [];
           this.cnbcKeywordsSelected= null;
           this.cnbcPage= 1;
           this.cnbcPageCount= 0;
           this.cnbcPageSize= 5;
           this.sCNBCKeywords= null;
           this.sCNBCKeywordsOptions= [];
           // cnn
           this.cnn= [];
           this.cnnKeywords= [];
           this.cnnKeywordsSelected= null;
           this.cnnPage= 1;
           this.cnnPageCount= 0;
           this.cnnPageSize= 5;
           this.sCNNKeywords= null;
           this.sCNNKeywordsOptions= [];

           // this.getDetikKeywords();
           // this.getDetik();
           // this.getCNBCKeywords();
           // this.getCNBC();
           // this.getCNNKeywords();
           // this.getCNN();
       },
       gSearch: function() {
           if (this.sD === 'undefined-undefined-undefined' || this.eD === 'undefined-undefined-undefined') {
               this.sD = "";
               this.eD = "";
           }
           this.gReset();
           this.metaArticle.keywords = this.gKeywords;
           this.metaArticle.contains_texts = this.qSearch;
           this.metaArticle.from = this.sD;
           this.metaArticle.to = this.eD;
           this.getDetikKeywords();
           this.getCNBCKeywords();
           this.getCNNKeywords();
           this.getDetik(String(this.qSearch).replace(',','|'), this.gKeywords, this.sD, this.eD);
           this.getCNBC(String(this.qSearch).replace(',','|'), this.gKeywords, this.sD, this.eD);
           this.getCNN(String(this.qSearch).replace(',','|'), this.gKeywords, this.sD, this.eD);
       },
       gRefresh: function() {
           this.gReset();
           this.gKeywords = '';
           this.gKeywordsOptions = [];
           this.start_date = new Date('01/01/'+new Date().getFullYear().toString());
           this.end_date = new Date();
           this.sD = this.toDatabaseDate(new Date('01/01/'+new Date().getFullYear().toString()));
           this.eD = this.toDatabaseDate(new Date());
           this.metaArticle = {
               'keywords': '',
               'contains_texts': '',
               'from': this.toIdDate(new Date('01/01/'+new Date().getFullYear().toString())),
               'to': this.toIdDate(new Date())
           },
           this.qSearch = [];
           this.detikIsLoading = true;
           this.cnbcIsLoading = true;
           this.cnnIsLoading = true;

           this.getDetikKeywords();
           this.getDetik();
           this.getCNBCKeywords();
           this.getCNBC();
           this.getCNNKeywords();
           this.getCNN();

           setTimeout(() => {
               this.detikIsLoading = false;
               this.cnbcIsLoading = false;
               this.cnnIsLoading = false;
           }, 500)
       },
       dateFormat: function(d) {
           return moment(d).format('DD/MM/YYYY');
       },
       getKeywords: function() {
           imaxios.get(`keywords`, {
           }).then((res) => {
               if (res.data) { 
                   this.gKeywords = null;
                   this.gKeywordsOptions = res.data;
               }
           })
       },
       getKeywordsChange: function() {
           console.log(this.gKeywords);
       },
       getDetikKeywords: function(qS = String(this.qSearch).replace(',','|'), keywords = this.gKeywords, sD = this.sD, eD = this.eD) {
           imaxios.get(`contents-keywords?`+
           `contains_texts=${qS}&`+
           `keywords=${keywords ? keywords : ''}&`+
           `from_date=${sD}&`+
           `to_date=${eD}&`+
           `source_id=${this.detikSourceId}`, {
           }).then((res) => {
               this.detikKeywords = res.data;
               this.sDetikKeywordsOptions = res.data;
           })
       },
       detikClickCallback: function (pageNum) {
           this.detikPage = pageNum;
           if (this.sDetikKeywords) {
               this.sDetikKeywordsChange('');
           } else { this.getDetik(); }
           
       },
       sDetikKeywordsChange: function(r = 'r') {
           if (r) { this.detikPage = 1; this.detikPageCount = 0; }
           this.getDetik(String(this.qSearch).replace(',','|'), this.sDetikKeywords, this.sD, this.eD);
       },
       getDetik: function(qS = String(this.qSearch).replace(',','|'), keywords = this.gKeywords, sD = this.sD, eD = this.eD) {
           this.detikIsLoading = true;
           imaxios.get(`contents?`+
           `contains_texts=${qS}&`+
           `keywords=${keywords ? keywords : ''}&`+
           `from_date=${sD}&`+
           `to_date=${eD}&`+
           `source_id=${this.detikSourceId}&`+
           `page=${this.detikPage}&`+
           `per_page=${this.detikPageSize}`, {
           }).then((res) => {
               setTimeout(() => {
                   this.detikIsLoading = false;
                   this.detik = res.data
                   this.detikPageCount = res.data.total_pages;
               }, 1000)
           })
       },
       getCNBCKeywords: function(qS = String(this.qSearch).replace(',','|'), keywords = this.gKeywords, sD = this.sD, eD = this.eD) {
           imaxios.get(`contents-keywords?`+
           `contains_texts=${qS}&`+
           `keywords=${keywords ? keywords : ''}&`+
           `from_date=${sD}&`+
           `to_date=${eD}&`+
           `source_id=${this.cnbcSourceId}`, {
           }).then((res) => {
               this.cnbcKeywords = res.data;
               this.sCNBCKeywordsOptions = res.data;
           })
       },
       cnbcClickCallback: function (pageNum) {
           this.cnbcPage = pageNum;
           if (this.sCNBCKeywords) {
               this.sCNBCKeywordsChange('');
           } else { this.getCNBC(); }
       },
       sCNBCKeywordsChange: function(r = 'r') {
           if (r) { this.cnbcPage= 1; this.cnbcPageCount= 0; }
           this.getCNBC(String(this.qSearch).replace(',','|'), this.sCNBCKeywords, this.sD, this.eD);
       },
       getCNBC: function(qS = String(this.qSearch).replace(',','|'), keywords = this.gKeywords, sD = this.sD, eD = this.eD) {
           this.cnbcIsLoading = true;
           imaxios.get(`contents?`+
           `contains_texts=${qS}&`+
           `keywords=${keywords ? keywords : ''}&`+
           `from_date=${sD}&`+
           `to_date=${eD}&`+
           `source_id=${this.cnbcSourceId}&`+
           `page=${this.cnbcPage}&`+
           `per_page=${this.cnbcPageSize}`, {
           }).then((res) => {
               setTimeout(() => {
                   this.cnbcIsLoading = false;
                   this.cnbc = res.data
                   this.cnbcPageCount = res.data.total_pages;
               }, 1000)
           })
       },
       getCNNKeywords: function(qS = String(this.qSearch).replace(',','|'), keywords = this.gKeywords, sD = this.sD, eD = this.eD) {
           imaxios.get(`contents-keywords?`+
           `contains_texts=${qS}&`+
           `keywords=${keywords ? keywords : ''}&`+
           `from_date=${sD}&`+
           `to_date=${eD}&`+
           `source_id=${this.cnnSourceId}`, {
           }).then((res) => {
               this.cnnKeywords = res.data;
               this.sCNNKeywordsOptions = res.data;
           })
       },
       cnnClickCallback: function (pageNum) {
           this.cnnPage = pageNum;
           if (this.sCNNKeywords) {
               this.sCNNKeywordsChange('');
           } else { this.getCNN(); }
       },
       sCNNKeywordsChange: function(r = 'r') {
           if (r) { this.cnnPage= 1; this.cnnPageCount= 0; }
           this.getCNN(String(this.qSearch).replace(',','|'), this.sCNNKeywords, this.sD, this.eD);
       },
       getCNN: function(qS = String(this.qSearch).replace(',','|'), keywords = this.gKeywords, sD = this.sD, eD = this.eD) {
           this.cnnIsLoading = true;
           imaxios.get(`contents?`+
           `contains_texts=${qS}&`+
           `keywords=${keywords ? keywords : ''}&`+
           `from_date=${sD}&`+
           `to_date=${eD}&`+
           `source_id=${this.cnnSourceId}&`+
           `page=${this.cnnPage}&`+
           `per_page=${this.cnnPageSize}`, {
           }).then((res) => {
               setTimeout(() => {
                   this.cnnIsLoading = false;
                   this.cnn = res.data
                   this.cnnPageCount = res.data.total_pages;
               }, 1000)
           })
       }
   }
}
</script>

<style>
@import "bulma-list/css/bulma-list.css";
@import "bulma-extensions/bulma-quickview/dist/css/bulma-quickview.min.css";
@import "bulma-extensions/bulma-calendar/dist/css/bulma-calendar.min.css";

.list-item {
   padding: 0.75em;
   border-bottom: 1px solid #e4dede !important;
}
.list-item:not(:last-child) {
   border-bottom: 1px solid #e4dede !important;
}
.metax {
   border: 1.2px inset rgb(198 207 201); 
   display: inline-block; 
   padding: 1px 4px; 
   border-radius: 3px; 
   background-color: #c9c7c64f; 
   border-style: inset; 
   font-size: large;
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

</style>


<!-- <style>
@import "vue-select/dist/vue-select.css";
</style> -->
<!-- <style scoped>
@import "vue-multiselect/dist/vue-multiselect.css";

</style> -->