<template>
  <div ref="main" id="main" class="container is-fluid mt-5 p-32">
    <page-header></page-header>
    <div class="columns">
      <div class="column is-6">
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
    </div>
  </div>
</template>
 
<script>
export default {
  name: 'IntelDocSummary',
  data() {
    return {
      kode_kantor: null,
      start_date: null,
      end_date: null,
      text_search: null,
      asc: true
    }
  },
  mounted() {
  }
}
</script>