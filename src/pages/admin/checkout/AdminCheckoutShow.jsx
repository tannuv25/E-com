import React, { useEffect, useState } from 'react'
import HeroSection from '../../../Components/HeroSection'
import AdminSidebar from '../../../Components/AdminSidebar'

import { useDispatch, useSelector } from 'react-redux';

import { getCheckout, updateCheckout } from "../../../Redux/ActionCreators/CheckoutActionCreators"
import { useParams } from 'react-router-dom';
import Cart from '../../../Components/Cart';
export default function AdminCheckoutShow() {
    let { id } = useParams()
    let [data, setData] = useState({})
    let [flag, setFlag] = useState(true)
    let [user, setUser] = useState({})

    let [orderStatus, setOrderStatus] = useState("")
    let [paymentStatus, setPaymentStatus] = useState("")

    let CheckoutStateData = useSelector(state => state.CheckoutStateData)
    let dispatch = useDispatch()

    function updateRecord() {
        if (window.confirm("Are You Sure to Update the Status : ")) {
            data.orderStatus = orderStatus
            data.paymentStatus = paymentStatus
            dispatch(updateCheckout({ ...data }))
            setFlag(!flag)
        }
    }

    useEffect(() => {
        (async () => {
            dispatch(getCheckout())
            if (CheckoutStateData.length) {
                let item = CheckoutStateData.find(x => x.id === id)
                if (item) {
                    setData({ ...item })
                    setOrderStatus(item.orderStatus)
                    setPaymentStatus(item.paymentStatus)
                    console.log(item)

                    let response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/user/${item.user}`, {
                        method: "GET",
                        headers: {
                            "content-type": "application/json"
                        }
                    })
                    response = await response.json()
                    setUser(response)
                }
                else
                    alert("Invalid Checkout Id")
            }
        })()
    }, [CheckoutStateData.length])
    return (
        <>
            <HeroSection title="Admin - Checkout" />
            <div className="container-fluid py-5 mb-5">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-light text-center p-2'>Checkout Query</h5>
                        <table className='table table-bordered'>
                            <tbody>
                                <tr>
                                    <th>Id</th>
                                    <td>{data.id}</td>
                                </tr>
                                <tr>
                                    <th>User</th>
                                    <td>
                                        {user.name}<br />
                                        {user.email},{user.phone}<br />
                                        {user.address}<br />
                                        {user.pin},{user.city},{user.state}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Order Status</th>
                                    <td>{data.orderStatus}
                                        {data.orderStatus !== "Delivered" ?
                                            <>
                                                <select name="orderStatus" value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)} className='mt-3 form-select border-3 border-primary w-50'>
                                                    <option>Order is Placed</option>
                                                    <option>Order is Packed</option>
                                                    <option>Order is Ready to Ship</option>
                                                    <option>Order is Shipped</option>
                                                    <option>Order is in Transit</option>
                                                    <option>Order is Reached to the Final Delivery Station</option>
                                                    <option>Out for Delivery</option>
                                                    <option>Delivered</option>
                                                </select>
                                            </> : null}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Payment Mode</th>
                                    <td>{data.paymentMode}</td>
                                </tr>
                                <tr>
                                    <th>Payment Status</th>
                                    <td>{data.paymentStatus}
                                        {data.paymentStatus !== "Done" ?
                                            <>
                                                <select name="paymentStatus" value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)} className='mt-3 form-select border-3 border-primary w-50'>
                                                    <option>Pending</option>
                                                    <option>Done</option>
                                                </select>
                                            </> : null}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Subtotal</th>
                                    <td>&#8377;{data.subtotal}</td>
                                </tr>
                                <tr>
                                    <th>Shipping</th>
                                    <td>&#8377;{data.shipping}</td>
                                </tr>
                                <tr>
                                    <th>Total</th>
                                    <td>&#8377;{data.total}</td>
                                </tr>
                                <tr>
                                    <th>RPPID</th>
                                    <td>{data.rppid ? data.rppid : "N/A"}</td>
                                </tr>
                                <tr>
                                    <th>Date</th>
                                    <td>{new Date(data.date).toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        {
                                            data.orderStatus !== "Delivered" || data.paymentStatus === "Pending" ?
                                                <button className='btn btn-primary w-100' onClick={updateRecord}>Update</button> : null
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        {data.products ? <Cart title="Checkout" data={data.products} /> : null}
                    </div>
                </div>
            </div>
        </>
    )
}
