import React, { Fragment, useEffect, useRef } from 'react'
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { getSellDetails } from '../../actions/sellAction'
import { logoHJM } from '../images/images'
import Button from '@mui/material/Button'
import { PDFExport } from '@progress/kendo-react-pdf'

const InvoiceSell = ({ match }) => {

    const dispatch = useDispatch()

    const { sell = {} } = useSelector(state => state.sellDetails)
    const { seller, Items, totalPrice, orderStatus } = sell

    const sellId = match.params.id

    useEffect(() => {
        dispatch(getSellDetails(sellId))
    }, [dispatch, sellId])

    const pdfExportComponent = useRef(null);

    const exportPDFWithComponent = () => {
        if (pdfExportComponent.current) {
            pdfExportComponent.current.save();
        }
    };
    return (
        <Fragment>
            <MetaData title={`Invoice ${sell && sell._id}`} />
            <div className="content">
                <h2>Invoice Penjualan {sell && sell._id}</h2>
                <div className="invoice-print">
                    <PDFExport
                        ref={pdfExportComponent}
                        paperSize="auto"
                        author='Hidrosistem Jaya Mandiri'
                        scale={0.5}
                        fileName={`Invoice ${seller && seller.namacus} ${String(sell && sell.createAt).substring(0, 10)}`}
                    >
                        <div className="invoice">
                            <div className="header-invoice">
                                <div className="invoice-image">
                                    <img src={logoHJM} alt="logo" />
                                </div>
                                <br />
                                <div className="invoice-number">
                                    <h5>Invoice Number :</h5>
                                    <h5>{sell && sell._id}</h5>
                                    <br />
                                    <h5>Tanggal :</h5>
                                    <h5>{String(sell && sell.createAt).substring(0, 10)}</h5>
                                </div>
                            </div>
                            <hr />
                            <div className="order-sell-invoice">
                                <h5>Pembeli :</h5>
                                <h6>{seller && seller.namacus} ({seller && seller.notlp})</h6>
                                <h6>{seller && seller.labelalamat}</h6>
                                <h6>{seller && seller.kota}</h6>
                                <hr />
                                <h5>Status Barang</h5>
                                <h6>{orderStatus}</h6>
                                <h6>{String(sell && sell.deliveredAt).substring(0, 10)}</h6>
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
                                        <td>{Items && Items.hjual}</td>
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

export default InvoiceSell