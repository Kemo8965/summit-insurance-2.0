<template>
    <div>
       <b-tabs class="policy" type="is-toggle" expanded>
        <b-tab-item  label="Create New Policy" icon="google-photos">
          <card></card>
        </b-tab-item>
        <b-tab-item label="Policies" icon="library-music">
            <policies-table></policies-table>
        </b-tab-item>
       
    </b-tabs>
     <b-button class="btn" @click="$router.push('/')" type="is-success is-medium">Back</b-button>
    </div>
</template>

<script>
    import Card from '../../components/Card.vue'
    import PoliciesTable from '../../components/tables/policies-table.vue'
    export default {
        components:{
            Card,
            PoliciesTable
        }
    }
</script>

<style>
.btn{
    left:600px;
    width: 160px ;
}
    .policy{
       color: aquamarine;
    }
</style>

