export const COLUMNS = [ 
    
    {
        Header: 'trx_id',
        accessor: 'trx_id' as const
    },
    {
        Header: 'username',
        accessor: 'username' as const
    },
    {
        Header: 'amount',
        accessor: 'amount' as const
    },
    {
        Header: 'currency_id',
        accessor: 'currency_id' as const
    },
    {
       Header: 'bankname',
       accessor: 'bankname'  as const
    },
    {
        Header: 'status',
        accessor: 'status' as const
    },
    {
        Header: 'trx_init_time',
        accessor: 'trx_init_time' as const
    },
    {
        Header: 'trx_complete_time',
        accessor: 'trx_complete_time' as const
    } 
]
