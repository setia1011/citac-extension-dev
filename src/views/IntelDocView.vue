<template>
    <div ref="main" id="main" class="container is-fluid mt-5 p-32">
      <page-header></page-header>
      ...
    </div>
</template>
 
<script>
import { coaxios } from '../utils/xaxios';
import _ from "lodash";

export default {
  name: 'IntelDoc',
  mounted() {
    this.fake();
  },
  methods: {
    fake: function() {
      coaxios.get("/doc?lppi_no=").then((r) => {
        console.log(r.data);
      })
    }
  }
}
</script>