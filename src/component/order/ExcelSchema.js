const schema = [
    // Column #1
    {
      column: 'ID',
      type: String,
      width: 25,
      align:'center',
      value: item => item._id
    },
    // Column #2
    {
      column: 'Customer Name',
      type: String,
      width: 25,
      align:'center',
      value: item => item.user.name
    },
    // Column #3
    {
      column: 'Address',
      type: String,
      width: 25,
      align:'center',
      //format: '#,##0.00'
      value: item => item.user_address?.area
    },
    // Column #4
    {
      column: 'Product Name',
      type: String,
      width: 25,
      align:'center',
      value: item => item.product?.productName
     
    },
    {
        column: 'Quantity',
        type: Number,
        width: 25,
        align:'center',
        value: item => item.qty
       
    },
    {
        column: 'Price',
        type: Number,
        width: 25,
        align:'center',
        value: item => item.amount
       
    },
    {
        column: 'Payment',
        type: String,
        width: 25,
        align:'center',
        value: item => item.payment_order_id?.payment_info?.razorpay_payment_id||""
       
    },
    {
        column: 'Order Status',
        type: String,
        width: 25,
        color:'#12db22',
        align:'center',
        value: item => item.order_status
       
    },
    {
      column: 'Tracking Id',
      type: String,
      width: 25,
      color:'#12db22',
      align:'center',
      value: item => item.trackingId
    },
    {
        column: 'Order Date',
        type: Date,
        format: 'dd/mm/yyyy',
        width: 25,
        align:'center',
        value: item => new Date(item.createdAt)
       
    }
  ]

export default schema