import clientPromise from "@/lib/mongodb"
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function Page({ params }) {
    const handle = (await params).handle
    const client = await clientPromise;
    const db = client.db("bittree")
    const collection = db.collection("links")

    // if the bit link is already created
    const item = await collection.findOne({ handle })

    if (!item) {
        return notFound()
    }


    return <div className="flex min-h-screen bg-purple-400 justify-center items-start py-10">
        {item && <div className="photo flex flex-col justify-center">
            <img
                src={item.pic}
                alt=""
                className="w-[120px] h-[120px] rounded-full object-cover ml-32"
            />

            <span className="font-bold text-xl text-center">@{item.handle}</span>
            <span className="desc w-96 text-center">{item.desc}</span>
            <div className="links">
                {item.links.map((item, index) => {
                    return <Link key={index} href={item.link}><div className="py-4 px-2 shadow-lg bg-purple-100 rounded-md my-3 min-w-96 flex justify-center items-center">
                        {item.linktext} </div></Link>


                })}
            </div>
        </div>}
    </div>
}