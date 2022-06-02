import React, { useEffect, useState } from 'react';
import Pdf from 'react-to-pdf'
//import { jsPDF } from "jspdf";
import moment from 'moment'

import Styles from './Invoice.module.css'
import logo from '../../assert/1024.png'
const ref = React.createRef()
const InvoiceTemplate = ({ item, back }) => {
    const [date, setDate] = useState('')
    const [isgst, setIsgst] = useState(79)

    useEffect(() => {
        if (item) {
            let d = item.createdAt
            let s = moment(d).format("DD-MM-YYYY");
            setDate(s)
        }
    }, [item])
    return (
        <>
            <div className={Styles.main_container}>

                <button className={Styles.backbtn} onClick={() => back()}>back</button>
                <Pdf targetRef={ref} filename="orderinvoice.pdf" >
                    {({ toPdf }) => (
                        <button onClick={toPdf} className={Styles.btnpdf}>
                            Download pdf</button>
                    )}
                </Pdf>
                <div className={Styles.container} ref={ref}>
                    <div className={Styles.chaild_container}>
                        <div className={Styles.logo_container}>
                            <img src={logo} alt="logo image" style={{ width: 30, height: 30, }} />
                            <p style={{ color: 'red', fontSize: 16, textAlign: 'center', marginTop: 5, fontWeight: 'bold', letterSpacing: 1 }}>Pinkbox</p>
                        </div>
                        <div className={Styles.shopdetails}>
                            <div className={Styles.appheader}>
                                <p style={{ fontSize: 14, fontWeight: 'bold' }}>Pink Box Jewels Pvt. Ltd.</p>
                                <p style={{ fontSize: 12 }}>GST IN: 37AAMCP27639zp</p>
                            </div>
                            <div className={Styles.Invoice_details}>
                                <p style={{ fontSize: 18, fontWeight: 'bold', latterSpacing: 1, }}>INVOICE</p>
                            </div>
                        </div>
                        <div className={Styles.InvoiceDetails}>
                            <p style={{ fontSize: 12 }}>INVOICE NUMBER: 100121</p>
                            <p style={{ fontSize: 12 }}>INVOICE DATE: {date}</p>
                            <p style={{ fontSize: 12 }}>ORDER DATE: {date}</p>
                        </div>
                        <div className={Styles.Bill_container}>
                            <div className={Styles.bill_details}>
                                <p style={{ fontSize: 14, fontWeight: 600 }}>BILL TO/SHIP TO:</p>
                                <p style={{ fontSize: 13, textTransform: 'capitalize' }}>{item ? item.user_address?.name : ''}</p>
                                <p style={{ fontSize: 13, textTransform: 'capitalize' }}>{item ? item.user_address.address1 : ''},{item ? item.user_address.address2 : ''}</p>
                                <p style={{ fontSize: 13, textTransform: 'capitalize' }}>{item ? item.user_address.state : ''},{item ? item.user_address?.pincode : ''}</p>
                                <p style={{ fontSize: 13, textTransform: 'capitalize' }}>Phone: {item ? item.user_address?.contactnumber : ''},{item ? item.user?.mobilenumber : ""}</p>
                            </div>
                        </div>
                        <div className={Styles.declaration}>
                            <p style={{ fontSize: 13, fontWeight: 600 }}>DECLARTION:</p>
                            <p style={{ fontSize: 13 }}>Gold sold as a part of this shipment is intended for end use consumtion and not for retail sale</p>
                        </div>
                        <div style={{ marginTop: 20 }}>
                            <p style={{ fontSize: 13, fontWeight: 600 }}>ORDER NO: PB101121</p>
                        </div>
                        <div className={Styles.ItemQuantityBox}>

                            <div className={Styles.tablecontainer}>
                                <p style={{ fontSize: 13, fontWeight: 600 }}>Item Name: <lable style={{ textTransform: 'capitalize', fontSize: 13, fontWeight: 600 }}>{item ? item.product?.productName : ''}</lable></p>
                                <table style={{ width: '100%' }}>
                                    <thead><tr className={Styles.rowheader}>
                                        <td>QTY</td>
                                        <td>UNIT PRICE</td>
                                        <td>DISCOUNT</td>
                                        <td>CGST</td>
                                        <td>SGST</td>
                                        <td>IGST</td>
                                        <td>TOTAL</td>
                                    </tr></thead>
                                    <tbody ><tr className={Styles.rowitem}>
                                        <td>{item ? item.qty : 1}</td>
                                        <td>Rs.{item ? item.amount : 14000}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>Rs.{isgst}</td>
                                        <td>Rs.{item ? item.amount + isgst : 1479}</td>
                                    </tr></tbody>
                                </table>
                            </div>

                        </div>

                    </div>
                    <div className={Styles.footer_contaier}>
                        <div className={Styles.footer}>
                            <p style={{ fontSize: 14, textTransform: 'uppercase', fontWeight: 500 }}> thank you for your business</p>
                            <p style={{ fontSize: 13 }}>If you have any queries regarding the order. Please contact  us on<span style={{ fontWeight: 700 }}> +91 93904 88850</span> or <span style={{ fontWeight: 700 }}>info@pinkboxjewels.com</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default InvoiceTemplate;
