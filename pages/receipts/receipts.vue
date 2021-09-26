<template>
    <div>
       <b-tabs class="policy" type="is-toggle" expanded>
        <b-tab-item  label="Create New Invoice" icon="mail">
          <card></card>
        </b-tab-item>
        <b-tab-item label="Invoices" icon="book">
            <invoices-table></invoices-table>
        </b-tab-item>
       
    </b-tabs>
     
    </div>
</template>

<script>
    import Card from '../../components/Card.vue'
    import InvoicesTable from '../../components/tables/invoices-table.vue'
    export default {
        components:{
            Card,
            InvoicesTable
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

