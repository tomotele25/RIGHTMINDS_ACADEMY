import React from "react";

const Contact = () => {
  return (
    <div id="contact">
      <div>
        <h1 className="text-3xl text-black bg-white sm:text-4xl pt-10 flex justify-center">
          Get In Touch
        </h1>
      </div>

      <div className=" grid gap-10 w-full bg-white  sm:flex sm:justify-between lg:flex lg:justify-between   text-black p-7 ">
        <form className="grid w-full text-black lg:w-10/12  gap-5  bg-slate-50 shadow-2xl p-3 py-10">
          <span className=" grid  sm:flex sm:gap-10">
            <span className="grid gap-3">
              <label htmlFor="">Full Name</label>
              <input className="border-2 rounded-md border-black" type="text" />
            </span>
            <span className="grid gap-3">
              <label htmlFor="">Email Address</label>
              <input
                className=" border-2 rounded-md border-black"
                type="text"
              />
            </span>
          </span>
          <span className="grid gap-3">
            <label htmlFor="">Phone Number</label>
            <input className="border-2 rounded-md border-black" type="text" />
          </span>
          <span className="grid gap-3">
            <label htmlFor="">Message</label>
            <textarea
              name=""
              className="bg-white border-2 rounded-md border-black"
              draggable
              id=""
            ></textarea>
          </span>
        </form>
        <div className="lg:w-10/12 text-white  p-5 grid gap-2  ">
          <h1 className="text-black">Call Us</h1>
          <p className="text-black">09152580773 </p>
          <p className="text-black">
            we are available 24/7 from monday to sunday
          </p>
          <p className="text-black">chat with us</p>
          <p className="text-black">whatsapp:send us a message</p>
          <p className="text-black">Linkedin:send us a message</p>
          <p className="text-black">instagram:send us a message</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
