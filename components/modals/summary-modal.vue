<template>
  <div class="modal-card modal-width-auto">
    <header class="modal-card-head">
      <h3 class="modal-card-title">Operation</h3>
      <button type="button" class="delete" @click="close"></button>
    </header>
    <section class="modal-card-body has-background-white">
      <!-- Modal Content -->
      <div>
        <form v-for="policy in policies" :key="policy">
          <div v-if="selectedPolicy">
            <li>
              {{ policy.clientID }}
            </li>
            <li>
              {{ policy.currency }}
            </li>
            <li>
              {{ policy.numOfQuarters }}
            </li>
            <li>
              {{ policy.startDate }}
            </li>

            <li>
              {{ policy.endDate }}
            </li>
          </div>
        </form>
      </div>
    </section>
    <footer class="modal-card-foot">
      <b-button label="Cancel" @click="close" />
      <b-button
        label="Submit"
        type="is-primary"
        icon-left="account"
        @click="onSubmit"
      />
    </footer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'OperationModal',

  computed: {
    ...mapGetters('policies', {
      loading: 'loading',
      policies: 'inactivePolicies',
    }),
  },

  mounted() {},

  methods: {
    ...mapActions('policies', ['load', 'selectPolicy']),
    ...mapActions('policies', ['load', 'getInactivePolicies']),

    async onSubmit() {
      const msg = await Promise.resolve('Operation successul')
      this.$buefy.toast.open({
        message: msg, // 'Operation successful',
        duration: 5000,
        position: 'is-top',
        type: 'is-info',
      })
      this.$parent.close()
    },

    close() {
      this.$buefy.toast.open({
        message: 'Operation cancelled...',
        duration: 5000,
        position: 'is-top',
        type: 'is-info',
      })
      this.$parent.close()
    },
  },
}
</script>

<style scoped>
.modal-width-auto {
  width: auto;
}
</style>
