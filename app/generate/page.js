"use client"

import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

const Generate = () => {

  // const [link, setlink] = useState("")
  // const [linktext, setlinktext] = useState("")
  const searchParams =useSearchParams()
  const [links, setlinks] = useState([{ link: "", linktext: "" }])
  const [handle, sethandle] = useState(searchParams.get('handle'))
  const [pic, setpic] = useState("")
  const [desc, setdesc] = useState("")

  const handleChange = (index,link,linktext) => {
    setlinks((initialLinks)=>{
      return initialLinks.map((item,i)=>{
        if(i===index){
          return {link,linktext}
        }
        return item
        
      })
    })
  }
  
  const addLink =  () => {
    setlinks(links.concat([{link:"",linktext:""}]))
    
  }
  

  const submitLinks = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "links": links,
      "handle": handle,
      "pic":pic,
      "desc":desc
    });

    console.log(raw);
    

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    const r = await fetch("http://localhost:3000/api/add", requestOptions)
    const result = await r.json()
    if(result.sucess){
    toast.success(result.message)
    setlinks([]);
    sethandle("")
    setpic("")
    }
    else{
      toast.error(result.message)
    }
  }

    return (

      <div className='bg-purple-300 min-h-screen grid grid-cols-2'>

        <div className="col1 flex flex-col justify-center items-center ">
          <h1 className='font-bold text-4xl mt-24'>Create your Bittree</h1>
          <div className="item">
            <div className="flex flex-col gap-5 my-4">
              <h2 className='font-bold text-xl'>Step 1: Claim your handles</h2>
              <div className="mx-auto">
                <input value={handle || ""} onChange={e => { sethandle(e.target.value) }} className='px-4 py-2 rounded-xl' type="text" placeholder='Choose a handle' /></div>
            </div>
            <div className="item my-2">
              <h2 className='font-bold text-xl'>Step 2:Add links</h2>
              {links && links.map((item,index)=>{
                return <div key={index} className="mx-auto my-2">
                <input value={item.linktext||""} onChange={e => { handleChange(index, item.link, e.target.value) }} className='px-4 py-2 mx-2 rounded-xl' type="text" placeholder='Enter link text' />
                <input value={item.link||""} onChange={e => {  handleChange(index, e.target.value, item.linktext) }} className='px-4 py-2 mx-2 rounded-xl' type="text" placeholder='Enter link' />

              </div>
              })}
              
              <button onClick={() => {addLink()}} className="px-5 py-2 rounded-3xl mx-2 text-white font-bold bg-slate-900">+ Add Link</button>
            </div>
            <div className="item my-4">
              <h2 className='font-bold text-xl'>Step 3: Add picture and Description</h2>
              <div className="mx-auto my-2 flex flex-col">
                <input value={pic || ""} onChange={e => { setpic(e.target.value) }} className='px-4 py-2 mx-2 rounded-xl' type="text" placeholder='Enter link to your picture' />
                <input value={desc || ""} onChange={e => { setdesc(e.target.value) }} className='px-4 py-2 mx-2 rounded-xl mt-2' type="text" placeholder='Enter Description' />
                <button disabled={pic=="" || handle=="" || links[0].linktext==""} onClick={()=>{submitLinks()}} className="disabled:bg-slate-500 px-5 py-2 my-5 w-fit rounded-3xl mx-2 text-white font-bold bg-slate-900">Create your BitLink</button>
              </div>
            </div>
          </div>
        </div>
        <div className="col2 w-full h-screen bg-red-50">
          <img className='h-full w-full object-cover' src="generate.png" alt="Generate" />
        </div>
        <ToastContainer />

      </div>
    )
  }

  export default Generate
