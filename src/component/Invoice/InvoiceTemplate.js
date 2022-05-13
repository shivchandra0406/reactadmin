import React from 'react';
import Styles from './Invoice.module.css'
const InvoiceTemplate = () => {
    return (
        <div className={Styles.container}>
            <div className={Styles.chaild_container}>
                <div className={Styles.logo_container}></div>
                <div className={Styles.Invoice_details}></div>
                <div className={Styles.Bill_container}>
                    <div className={Styles.bill_details}></div>
                    <div className={Styles.address_details}></div>
                </div>
                <div className={Styles.declaration}></div>
            </div>  
        </div>
    );
}

export default InvoiceTemplate;
