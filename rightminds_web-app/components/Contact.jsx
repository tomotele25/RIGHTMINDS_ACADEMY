import React from "react";

const Contact = () => {
  return (
    <div id="contact">
      <div>
        <h1 className="text-3xl sm:text-4xl pt-10 flex justify-center">
          Get In Touch
        </h1>
      </div>

      <div className=" grid gap-10 w-full  sm:flex sm:justify-between lg:flex lg:justify-between   text-black p-7 ">
        <form className="grid w-full text-black lg:w-10/12  gap-5  bg-slate-50 shadow-2xl p-3 py-10">
          <span className=" grid  sm:flex sm:gap-10">
            <span className="grid gap-3">
              <label htmlFor="">Full Name</label>
              <input className="border-2 rounded-md border-black" type="text" />
            </span>
            <span className="grid gap-3">
              <label htmlFor="">Email Address</label>
              <input className="border-2 rounded-md border-black" type="text" />
            </span>
          </span>
          <span className="grid gap-3">
            <label htmlFor="">Phone Number</label>
            <input className="border-2 rounded-md border-black" type="text" />
          </span>
          <span className="grid gap-3">
            <label htmlFor="">Message</label>
            <textarea name="" className="bg-white" draggable id=""></textarea>
          </span>
        </form>
        <div className="lg:w-10/12  p-5 grid gap-2  ">
          <h1>Call Us</h1>
          <p>09152580773 </p>
          <p>we are available 24/7 from monday to sunday</p>
          <p>chat with us</p>
          <p>whatsapp:send us a message</p>
          <p>linkedin:send us a message</p>
          <p>instagram:send us a message</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
