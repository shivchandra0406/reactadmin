const schema = [
    // Column #1
    {
      column: 'ID',
      type: String,
      value: item => item._id
    },
    // Column #2
    {
      column: 'Customer Name',
      type: String,
      value: item => item.user.name
    },
    // Column #3
    {
      column: 'Address',
      type: String,
      //format: '#,##0.00'
      value: item => item.user_address.area
    },
    // Column #4
    {
      column: 'Product Name',
      type: String,
      value: item => item.product.productName
     
    },
    {
        column: 'Quantity',
        type: Number,
        value: item => item.qty
       
    },
    {
        column: 'Price',
        type: Number,
        value: item => item.amount
       
    },
    {
        column: 'Payment',
        type: String,
        value: item => item.payment_order_id?.payment_info?.razorpay_payment_id||""
       
    },
    {
        column: 'Order Status',
        type: String,
        color:'#12db22',
        value: item => item.order_status
       
    },
    {
        column: 'Order Date',
        type: Date,
        format: 'mm/dd/yyyy',
        value: item => new Date(item.createdAt)
       
    }
  ]

export default schema