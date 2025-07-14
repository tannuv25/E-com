import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import HeroSection from '../../../Components/HeroSection'
import AdminSidebar from '../../../Components/AdminSidebar'

import formValidator from '../../../FormValidators/formValidator'
export default function AdminUpdateUser() {
    let { id } = useParams()
    let [UserStateData, setUserStateData] = useState([])
    let [data, setData] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        role: "Admin",
        active: true
    })
    let [error, setError] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
    })
    let [show, setShow] = useState(false)
    let navigate = useNavigate()

    function getInputData(e) {
        let { name, value } = e.target

        if (name !== "active") {
            setError((old) => {
                return {
                    ...old,
                    [name]: formValidator(e)
                }
            })
        }
        setData((old) => {
            return {
                ...old,
                [name]: name === "active" ? (value === "1" ? true : false) : value
            }
        })
    }
    async function postData(e) {
        e.preventDefault()
        let errorItem = Object.values(error).find(x => x !== "")
        if (errorItem)
            setShow(true)
        else {
            let item = UserStateData.find(x => x.id !== id && (x.username === data.username || x.email === data.email))
            if (item) {
                setShow(true)
                setError((old) => {
                    return {
                        ...old,
                        "username": item.username === data.username ? "Username Already Exist" : "",
                        "email": item.email === data.email ? "Email Address Already Exist" : "",
                    }
                })
            }
            else {
                let item = {
                    name: data.name,
                    username: data.username,
                    email: data.email,
                    phone: data.phone,
                    role: data.role,
                    password: data.password,
                    active: data.active
                }
                // //in case of real backend and form has a file field
                // let formData = new FormData()
                // formData.append("_id",_id)
                // formData.append("name",data.name)
                // formData.append("username",data.username)
                // formData.append("email",data.email)
                // formData.append("phone",data.phone)
                // formData.append("role",data.role)
                // formData.append("password",data.password)
                // formData.append("active",data.active)

                let response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/user/${id}`, {
                    method: "PUT",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(item)
                    // body: item
                })
                response = await response.json()
                if (response)
                    navigate("/admin/user")
                else
                    alert("Something Went Wrong")
            }
        }
    }

    useEffect(() => {
        (async () => {
            let response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/user`, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            })
            response = await response.json()
            setUserStateData(response)
            let item = response.find(x => x.id === id)
            setData({ ...item })
        })()
    }, [])
    return (
        <>
            <HeroSection title="Admin - Update User" />
            <div className="container-fluid py-5 mb-5">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-light text-center p-2'>User <Link to="/admin/user"><i className='fa fa-arrow-left text-light float-end'></i></Link></h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Name*</label>
                                    <input type="text" name="name" value={data.name} onChange={getInputData} placeholder='Full Name' className={`form-control border-3 ${show && error.name ? 'border-danger' : 'border-primary'}`} />
                                    {show && error.name ? <p className='text-danger'>{error.name}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Phone*</label>
                                    <input type="text" name="phone" value={data.phone} onChange={getInputData} placeholder='Phone Number' className={`form-control border-3 ${show && error.phone ? 'border-danger' : 'border-primary'}`} />
                                    {show && error.phone ? <p className='text-danger'>{error.phone}</p> : null}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>User Name*</label>
                                    <input type="text" name="username" value={data.username} onChange={getInputData} placeholder='User Name' className={`form-control border-3 ${show && error.username ? 'border-danger' : 'border-primary'}`} />
                                    {show && error.username ? <p className='text-danger'>{error.username}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Email*</label>
                                    <input type="email" name="email" value={data.email} onChange={getInputData} placeholder='Email Address' className={`form-control border-3 ${show && error.email ? 'border-danger' : 'border-primary'}`} />
                                    {show && error.email ? <p className='text-danger'>{error.email}</p> : null}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <select name="role" onChange={getInputData} value={data.role} className='form-select border-3 border-primary'>
                                        <option value="Admin">Admin</option>
                                        <option value="Super Admin">Super Admin</option>
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <select name="active" onChange={getInputData} value={data.active ? "1" : "0"} className='form-select border-3 border-primary'>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mb-3">
                                <button type="submit" className='btn btn-primary w-100'>Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
