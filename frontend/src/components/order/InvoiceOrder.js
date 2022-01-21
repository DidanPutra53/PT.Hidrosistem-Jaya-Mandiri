import React, { Fragment, useEffect, useRef } from 'react'
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails } from '../../actions/orderAction'
import { logoHJM } from '../images/images'
import Button from '@mui/material/Button'
import { PDFExport } from '@progress/kendo-react-pdf'

const InvoiceOrder = ({ match }) => {

    const dispatch = useDispatch()

    const { order = {} } = useSelector(state => state.orderDetails)
    const { buyer, Items, totalPrice, orderStatus } = order

    const orderId = match.params.id

    useEffect(() => {
        dispatch(getOrderDetails(orderId))
    }, [dispatch, orderId])

    const pdfExportComponent = useRef(null);

    const exportPDFWithComponent = () => {
        if (pdfExportComponent.current) {
            pdfExportComponent.current.save();
        }
    };

    return (
        <Fragment>
            <MetaData title={`Invoice ${order && order._id}`} />
            <div className="content">
                <h2>Invoice Order {order && order._id}</h2>
                <div className="invoice-print">
                    <PDFExport
                        ref={pdfExportComponent}
                        paperSize="auto"
                        author='Hidrosistem Jaya Mandiri'
                        scale={0.5}
                        fileName={`Invoice ${Items && Items.namavendor} ${String(order && order.createAt).substring(0, 10)}`}
                    >
                        <div className="invoice">
                            <div className="header-invoice">
                                <div className="invoice-image">
                                    <img src={logoHJM} alt="logo" />
                                </div>
                                <br />
                                <div className="invoice-number">
                                    <h5>Invoice Number :</h5>
                                    <h5>{order && order._id}</h5>
                                    <br />
                                    <h5>Tanggal :</h5>
                                    <h5>{String(order && order.createAt).substring(0, 10)}</h5>
                                </div>
                            </div>
                            <hr />
                            <div className="order-sell-invoice">
                                <h5>Pembeli :</h5>
                                <h6>{Items && Items.namavendor} ({buyer && buyer.notlp})</h6>
                                <h6>{buyer && buyer.labelalamat}</h6>
                                <h6>{buyer && buyer.kota}</h6>
                                <hr />
                                <h5>Status Barang</h5>
                                <h6>{orderStatus}</h6>
                                <h6>{String(order && order.deliveredAt).substring(0, 10)}</h6>
                            </div>
                            <br />
                            <div className="list-invoice">
                                <table>
                                    <tr>
                                        <th>Nama Barang</th>
                                        <th>Jumlah</th>
                                        <th>Harga Beli</th>
                                        <th>Total Harga</th>
                                    </tr>
                                    <tr>
                                        <td>{Items && Items.name}</td>
                                        <td>{Items && Items.quantity}</td>
                                        <td>{Items && Items.hbeli}</td>
                                        <td>{totalPrice}</td>
                                    </tr>
                                </table>
                            </div>
                            <hr />
                        </div>
                    </PDFExport>
                </div>
                <Button
                    variant="contained"
                    onClick={exportPDFWithComponent}
                    style={{
                        margin: "30px 80px",
                    }}
                >
                    Download PDF
                </Button>
            </div>
        </Fragment>
    )
}

export default InvoiceOrder
