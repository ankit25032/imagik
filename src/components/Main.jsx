import React from "react";
import { useEffect, useRef, useState } from "react";
import { BsFileImage } from "react-icons/bs";
import back from "./back.svg";
import "./Main.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Main() {
  const canvas = useRef();
  const fileimage = useRef();
  const [wasm, setwasm] = useState();
  const [img, setimg] = useState("");
  const [img2, setimg2] = useState("");
  const [isimg, setisimg] = useState(false);
  const nofile = () =>
    toast.warn("No file Selected", {
      position: "bottom-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const wrongfile = () =>
    toast.error("Select An Image File", {
      position: "bottom-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  useEffect(() => {
    loadwasm();
  }, []);

  //load Wasm
  async function loadwasm() {
    try {
      const photon = await import("@silvia-odwyer/photon");
      await setwasm(photon);
    } finally {
      console.log("loaded wasm successfully");
    }
  }

  //draw original Image
  async function drawoimage() {
    console.log(img);
    const imgloc = new Image();

    imgloc.onload = () => {
      setimg2(imgloc);

      var hRatio = canvas.current.width / imgloc.width;
      var vRatio = canvas.current.height / imgloc.height;
      var ratio = Math.min(hRatio, vRatio);

      const ctx = canvas.current.getContext("2d");
      var centerShift_x = (canvas.current.width - imgloc.width * ratio) / 2;
      var centerShift_y = (canvas.current.height - imgloc.height * ratio) / 2;
      ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
      ctx.drawImage(
        imgloc,
        0,
        0,
        imgloc.width,
        imgloc.height,
        centerShift_x,
        centerShift_y,
        imgloc.width * ratio,
        imgloc.height * ratio
      );
    };

    imgloc.src = img;
  }

  async function alterChannel(channel_index) {
    const canvas1 = canvas;
    const ctx = canvas1.current.getContext("2d");

    ctx.drawImage(img, 0, 0);
    let photon = wasm;
    let image = photon.open_image(canvas1.current, ctx);
    photon.filter(image, "oceanic");
    photon.putImageData(canvas.current, ctx, image);
  }

  return (
    <div className="container">
      <div className="box">
        {isimg ? (
          <canvas width="640px" height="360px" ref={canvas}></canvas>
        ) : (
          <div className="filebox">
            <input
              className="image-input"
              ref={fileimage}
              onChange={(e) => {
                var reader = new FileReader();
                var url = reader.readAsDataURL(e.target.files[0]);
                reader.onloadend = function (e) {
                  setimg(reader.result);
                };
              }}
              type="file"
              accept="image/png, image/jpeg"
            ></input>
            <div className="input-box">
              <img
                className="svg"
                width="200px"
                height="200px"
                src={back}
                alt="background"
              />
              <div className="btn">
                <button
                  className="edit-btn"
                  onClick={() => {
                    fileimage.current.click();
                  }}
                  type="submit"
                >
                  Select Image
                </button>
                <button
                  className="edit-btn"
                  onClick={() => {
                    if (fileimage.current.files.length !== 0) {
                      if (!fileimage.current.files[0].type.includes("image")) {
                        wrongfile();
                      } else {
                        setisimg(true);
                        drawoimage();
                      }
                    } else {
                      nofile();
                    }
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer
        theme="dark"
        position="bottom-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* <li id="alter_red" onClick={() => alterChannel(0)}>
        Increase Red Channel
      </li> */}
    </div>
  );
}
