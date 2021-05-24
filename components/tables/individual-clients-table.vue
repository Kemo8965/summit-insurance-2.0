<template>
  <div>
    <b-field grouped group-multiline>
      <b-select v-model="perPage">
        <option
          v-for="(option, index) in pageOptions"
          :key="index"
          :value="option"
        >
          {{ option }} entries
        </option>
      </b-select>

      <b-button class="mr-3" icon-left="refresh" @click="load"
        >Refresh</b-button
      >
      <b-button icon-left="account-plus" type="is-primary" @click="addNewClient"
        >Add New Client</b-button
      >
    </b-field>
    <b-table
      :data="tableData"
      :loading="loading"
      :paginated="isPaginated"
      :per-page="perPage"
      :current-page.sync="currentPage"
      :pagination-position="paginationPosition"
      :default-sort-direction="defaultSortDirection"
      mobile-cards
      default-sort="companyName"
      aria-next-label="Next Page"
      aria-previous-label="Previous Page"
      aria-page-label="Page"
      aria-current-label="Current Page"
    >
      <b-table-column
        v-slot="props"
        field="clientID"
        label="Client ID"
        sortable
      >
        {{ props.row.clientID }}
      </b-table-column>

      <b-table-column v-slot="props" field="name" label="Name" sortable>
        {{ fullname(props.row) }}
      </b-table-column>

      <b-table-column v-slot="props" field="email" label="Email" sortable>
        {{ props.row.email }}
      </b-table-column>

      <b-table-column v-slot="props" field="phone" label="Phone" sortable>
        {{ props.row.phoneNumber }}
      </b-table-column>

      <!-- <b-table-column v-slot="props" field="status" label="Status" sortable>
        <span
          :class="[
            'tag',
            {
              'is-success': props.row.status === 'Active',
            },
            {
              'is-danger': props.row.status === 'Inactive',
            },
          ]"
          >{{ props.row.status }}</span
        >
      </b-table-column> -->

      <b-table-column label="Options">
        <span class="buttons">
          <b-button type="is-secondary-outline" icon-left="eye">View</b-button>
        </span>
      </b-table-column>
      
      <template #empty>
        <h4 class="is-size-4 has-text-centered">No clients added yet &#x1F4DC;</h4>
      </template>
    
    </b-table>
     <b-button class="btn" @click="$router.push('/')" type="is-success is-medium">Back</b-button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import _ from 'lodash'
import AddIndividualClientModal from '~/components/modals/add-individual-client-modal'

export default {
  name: 'CorporateClientsTable',
  data() {
    return {
      isPaginated: true,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      paginationPosition: 'bottom',
      defaultSortDirection: 'asc',
      sortIcon: 'arrow-up',
      sortIconSize: 'is-small',
    }
  },


  // async created() {
  //   await this.load()
  // },

  
  
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
}

.content-area {
  grid-column: 2/3;
}
</style>
