"use client"

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const createTree = () => {
   router.push(`/generate?handle=${text}`)

  }

  const [text, settext] = useState("")

  return (
    <main>
      <section className="bg-[#254f1a] min-h-[100vh] grid grid-cols-2">
        <div className=" flex flex-col justify-center ml-[10vw] pt-32 gap-3">
          <p className="text-yellow-300 font-bold text-6xl">Everything you are. </p>
          <p className="text-yellow-300 font-bold text-6xl">In one, simple link in </p>
          <p className="text-yellow-300 font-bold text-6xl">bio.</p>
          <p className="text-yellow-300 text-xl flex flex-col items-center justify-center my-4">
            Join 50M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.
          </p>
          <div className="input">
            <input value={text} onChange={(e) => { settext(e.target.value) }} type="text" placeholder="Enter your handle" className="py-2 px-2 focus:outline-green-800 rounded-md" />
            <button onClick={() => { createTree() }} className="bg-pink-200 rounded-full py-3 px-4 ml-4 font-bold">Claim your BitTree</button>
          </div>
        </div>
        <div className="mr-[10vw] pt-44">
          <img src="home.png" alt="homepage image" />
        </div>
      </section>
      <section className="bg-red-200 min-h-[100vh]">
      </section>
    </main>
  );
}
