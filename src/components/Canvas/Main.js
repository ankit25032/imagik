import React from 'react';
import { useEffect, useRef, useState } from 'react'
import img_src from "./w.jpg";
export default function Main() {
    const canvas = useRef();
    const [wasm, setwasm] = useState();
    const [img, setimg] = useState("");
    useEffect(() => {
        loadwasm();
        drawoimage();
    }, [])

    //load Wasm
    async function loadwasm() {
        try {
            const photon = await import('@silvia-odwyer/photon');
            await setwasm(photon);

        } finally {
            console.log("loaded wasm successfully");

        }
    }

    //draw original Image
    async function drawoimage() {
        const img = new Image();

        img.onload = () => {
            setimg(img);
            canvas.current.width = img.width;
            canvas.current.height = img.height;
            const ctx = canvas.current.getContext("2d");
            ctx.drawImage(img, 0, 0);
        }
        img.src = img_src;
    }

    async function alterChannel(channel_index) {
        const canvas1 = canvas
        const ctx = canvas1.current.getContext("2d");


        ctx.drawImage(img, 0, 0);
        let photon = wasm;
        let image = photon.open_image(canvas1.current, ctx);
        // // Module has now been imported. 
        // // All image processing logic w/ Photon goes here.
        // // See sample code below.
        photon.alter_channel(image, channel_index, 50);
        photon.putImageData(canvas.current, ctx, image);
    }



    return (
        <div>
            <canvas ref={canvas}></canvas>

            <li id="alter_red" onClick={() => alterChannel(0)}>Increase Red Channel</li>
        </div>
    )
}
