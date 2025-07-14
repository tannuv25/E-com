import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import HeroSection from '../Components/HeroSection'
import Profile from '../Components/Profile'

import { getWishlist, deleteWishlist } from "../Redux/ActionCreators/WishlistActionCreators"
import { getCheckout } from "../Redux/ActionCreators/CheckoutActionCreators"
import Cart from '../Components/Cart'
export default function ProfilePage() {
    let [wishlist, setWishlist] = useState([])
    let [orders, setOrders] = useState([])

    let WishlistStateData = useSelector(state => state.WishlistStateData)
    let CheckoutStateData = useSelector(state => state.CheckoutStateData)
    let dispatch = useDispatch()

    function deleteRecord(id) {
        if (window.confirm("Are You Sure to Remove that Item from Wishlist : ")) {
            dispatch(deleteWishlist({ id: id }))
            getAPIData()
        }
    }

    function getAPIData() {
        dispatch(getWishlist())
        if (WishlistStateData.length)
            setWishlist(WishlistStateData.filter(x => x.user === localStorage.getItem("userid")))
        else
            setWishlist([])
    }
    useEffect(() => {
        getAPIData()
    }, [WishlistStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getCheckout())
            if (CheckoutStateData.length) {
                setOrders(CheckoutStateData.filter(x => x.user === localStorage.getItem("userid")))
            }
        })()
    }, [CheckoutStateData.length])
    return (
        <>
            <HeroSection title="Buyer Profile" />
            <div className="container-fluid mt-3 mb-5">
                <Profile title="Buyer" />

                <h5 className='bg-primary text-light text-center p-2'>Wishlist Section</h5>
                {
                    wishlist.length ?
                        <>
                            <div className="table-responsive">
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Name</th>
                                            <th>Brand</th>
                                            <th>Color</th>
                                            <th>Size</th>
                                            <th>Stock</th>
                                            <th>Price</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {wishlist.map(item => {
                                            return <tr>
                                                <th>
                                                    <Link to={`${process.env.REACT_APP_BACKEND_SERVER}/${item.pic}`} target='_blank' rel='noreferrer'>
                                                        <img src={`${process.env.REACT_APP_BACKEND_SERVER}/${item.pic}`} height={50} width={80} alt="Product Image" />
                                                    </Link>
                                                </th>
                                                <th>{item.name}</th>
                                                <th>{item.brand}</th>
                                                <th>{item.color}</th>
                                                <th>{item.size}</th>
                                                <th>{item.stockQuantity === 0 ? "Out Of Stock" : `${item.stockQuantity} Left In Stock`}</th>
                                                <th>&#8377;{item.price}</th>
                                                <th><Link to={`/product/${item.product}`} className='btn btn-primary'><i className='fa fa-shopping-cart'></i></Link></th>
                                                <th><button className='btn btn-danger' onClick={() => deleteRecord(item.id)}><i className='fa fa-trash'></i></button></th>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </> :
                        <div className='mb-5 text-center mt-3 mb-5'>
                            <h3>No Items in Wishlist</h3>
                            <Link to="/shop" className='btn btn-primary'>Shop Now</Link>
                        </div>
                }

                <h5 className='bg-primary text-light text-center p-2'>Orders History Section</h5>
                {
                    orders.length ?
                        <>
                            {orders.map((item) => {
                                return <div className="row" key={item.id}>
                                    <div className="col-md-4">
                                        <div className="table-responsive">
                                            <table className='table table-bordered'>
                                                <tbody>
                                                    <tr>
                                                        <th>Order ID</th>
                                                        <td>{item.id}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Order Status</th>
                                                        <td>{item.orderStatus}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Payment Mode</th>
                                                        <td>{item.paymentMode}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Payment Status</th>
                                                        <td>{item.paymentStatus}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Subtotal</th>
                                                        <td>&#8377;{item.subtotal}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Shipping</th>
                                                        <td>&#8377;{item.shipping}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Total</th>
                                                        <td>&#8377;{item.total}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Date</th>
                                                        <td>{new Date(item.date).toDateString()}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <Cart title="Checkout" data={item.products} />
                                    </div>
                                </div>
                            })}
                        </> :
                        <div className='mb-5 text-center mt-3 mb-5'>
                            <h3>No Order History Found</h3>
                            <Link to="/shop" className='btn btn-primary'>Shop Now</Link>
                        </div>
                }
            </div>
            <div className="pb-5"></div>
        </>
    )
}
