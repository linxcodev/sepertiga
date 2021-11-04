<template>
  <div>
    <loading
      :active.sync="loadPage"
      :is-full-page="true"
      :loader="'bars'"
      :color="'#1f1498'"
    ></loading>

    <div :class="{ 'c-wrapper': true }">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import "vue-loading-overlay/dist/vue-loading.css";
import Loading from "vue-loading-overlay";

export default {
  components: {
    Loading,
  },
  computed: {
    ...mapState(['loadPage'])
  },
  methods: {},
  created() {
    console.log('jalan app.vue');
  },
};
</script>

<style lang="scss">
.swal2-popup {
  font-size: 0.7rem !important;
}
</style>
