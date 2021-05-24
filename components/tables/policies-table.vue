<template>
    <b-table :data="data" :columns="columns"></b-table>
</template>

<script>
    export default {
        data() {
            return {
                data: [
                    { 'id': 1, 'name': 'Jesse', 'client_type': 'IND', 'date': '2016-10-15 13:43:27', 'policy_status': 'INACTIVE' , 'policy_type': 'COMPREHENSIVE' },
                    { 'id': 2, 'name': 'ABS Corp', 'client_type': 'CORP', 'date': '2016-12-15 06:00:53', 'policy_status': 'ACTIVE' , 'policy_type': 'THIRD PARTY' },
                    { 'id': 3, 'name': 'Titan Limited', 'client_type': 'CORP', 'date': '2016-04-26 06:26:28', 'policy_status': 'INACTIVE' , 'policy_type': 'COMPREHENSIVE' },
                    { 'id': 4, 'name': 'Bovuder Limited', 'client_type': 'CORP', 'date': '2016-04-10 10:28:46', 'policy_status': 'ACTIVE' , 'policy_type': 'COMPREHENSIVE' },
                    { 'id': 5, 'name': 'ATC Inc.', 'client_type': 'CORP', 'date': '2016-12-06 14:38:38', 'policy_status': 'ACTIVE' , 'policy_type': 'THIRD PARTY' }
                ],
                columns: [
                    {
                        field: 'id',
                        label: 'ID',
                        width: '40',
                        numeric: true
                    },
                    {
                        field: 'name',
                        label: 'Name',
                    },
                    {
                        field: 'client_type',
                        label: 'Client Type',
                    },
                    {
                        field: 'date',
                        label: 'Date',
                        centered: true
                    },
                    {
                        field: 'policy_status',
                        label: 'Policy Status',
                    },
                     {
                        field: 'policy_type',
                        label: 'Policy Type',
                    }
                ]
            }
        }
    }
</script>