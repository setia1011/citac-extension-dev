<template>
   <slot />
   <footer class="footer mt-4" style="background-color: transparent !important;">
      <div id="footer" class="container is-fluid p-32">
         <div class="content">
               <div class="columns is-mobile">
                  <div class="column is-half">
                     <p>{{ copy }} <a href="/" class="has-text-info has-text-weight-semibold">DOI</a> _<span class="has-text-weight-semibold">v1.0.0</span></p>
                  </div>
                  <div class="column is-half">
                     <p class="is-pulled-right"><a href="https://techack.id" target="_blank" class="has-text-info"><i class="fa-regular fa-terminal fa-lg"></i></a></p>
                  </div>
               </div>
         </div>
      </div>
   </footer>
</template>

<script>
export default {
   name: "Fifth",
   components: {
   },
   data() {
      return {
         copy: "@2023 - " + new Date().getFullYear()
      }
   }
}
</script>