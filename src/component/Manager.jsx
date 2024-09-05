import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])


    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }



    const ShowPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("/icon/eyecross.png")) {
            ref.current.src = "/icon/eye.png"
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "/icon/eyecross.png"
            passwordRef.current.type = "text"
        }
    }


    const SavePassword = () => {
if(form.site.length>3 && form.username.length>3 && form.password.length>7){ 

        setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
        console.log([...passwordArray, form])
        toast('Password Saved', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });

    }
    else{
        toast('Error: Password not Saved', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
}



    const deletePassword = (id) => {
        console.log("Deleting password with id ", id)
        let c = confirm("Do you really want to delete this password?")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            toast('Password Deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }

    }


    const editPassword = (id) => {

        console.log("Editing password with id ", id)
        setForm(passwordArray.filter(i => i.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))

    }


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }



    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />
            <div className="p-2 md:p-0 md:container flex justify-center my-16 flex-col min-h-[85vh] ">
                <div className="logo text-black font-bold text-4xl flex-col w-full justify-center text-center ">&lt;Pass<span className='text-green-400'>OP/&gt;</span>
                    <div className="flex justify-center text-xl">Your own Password Manager</div>
                </div>
                <div className="w-full flex flex-col justify-center items-center ">
                    <div className="flex justify-center my-7 w-full items-center ">
                        <input value={form.site} onChange={handleChange} className='w-[80vw] h-10 rounded-full bg-gray-300 px-4 mx-3' type="url" name='site' placeholder='Enter your website' id='site' />

                    </div>
                    <div className="flex flex-col p-4  w-full md:flex-row justify-center items-center">
                        <input value={form.username} onChange={handleChange} className='w-[65vw] h-10 rounded-full bg-gray-300 px-4 ' type="text" name='username' placeholder='User_name' id='username' />
                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} className='w-[15vw] h-10  bg-gray-300 rounded-full mx-1 px-4' type="password" placeholder="Password " name="password" id="password" />
                            <span className=' absolute right-[1px] bottom-[-3px] cursor-pointer' onClick={ShowPassword}>
                                <img ref={ref} className='p-2' width={45} src="/icon/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={SavePassword} className='flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit border border-green-900 my-5'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover" >
                        </lord-icon>
                        Save</button>
                </div>
                <div className="passwords">
                    <h2 className='mx-[10vw] font-bold text-2xl py-3'>Your Password</h2>
                    {passwordArray.length === 0 && <div className='mx-[10vw]'> No passwords to show </div>}
                    {passwordArray.length != 0 && <table className="table-auto text-center mx-[10vw] w-[80vw] rounded-xl overflow-hidden mb-10">
                        <thead className='bg-green-800 text-white '>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Action</th>
                            </tr>
                        </thead >
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-2 w-32 border border-white '>
                                        <div className='flex items-center justify-center '>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div></td>
                                    <td className='py-2 w-32 border border-white '> <div className='flex items-center justify-center '>
                                        <span>{item.username}</span>
                                        <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                            <lord-icon
                                                style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                trigger="hover" >
                                            </lord-icon>
                                        </div>
                                    </div></td>
                                    <td className='py-2 w-32 border border-white '><div className='flex items-center justify-center '>
                                        <span>{item.password}</span>
                                        <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                            <lord-icon
                                                style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                trigger="hover" >
                                            </lord-icon>
                                        </div>
                                    </div></td>
                                    <td className='py-2 w-32 border border-white '>{item.action}
                                        <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}

                </div>

            </div >
        </>
    )

}


export default Manager
