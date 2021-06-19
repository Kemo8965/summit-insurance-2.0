<template>
    <div>
       <b-tabs class="policy" type="is-toggle" expanded>
        <b-tab-item  label="Create New Debit Binder" icon="mail">
          <card></card>
        </b-tab-item>
        <b-tab-item label="Policies" icon="book">
            <inactive-policies-table></inactive-policies-table>
        </b-tab-item>
       
    </b-tabs>
     
    </div>
</template>

<script>
    import Card from '../../components/Card.vue'
    import InactivePoliciesTable from '../../components/tables/inactive-policies-table.vue'
    export default {
        components:{
            Card,
            InactivePoliciesTable
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

