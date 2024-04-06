import { motion } from "framer-motion";
export default function ContactForm() {
  return (
    <div className="px-10 py-5">
      <h3 className="font-bold tracking-wider text-[#6c5dd4]">CONTACT US</h3>
      <h1 className="font-bold text-3xl mt-1 mb-3">Get In Touch With Us</h1>
      <input
        className="border-2 focus:outline-none focus:border-[#6c5dd4] py-3 px-5 my-3 w-full  font-poppins text-sm rounded-lg"
        type="text"
        placeholder="Full Name"
      ></input>
      <input
        className="border-2 focus:outline-none focus:border-[#6c5dd4] py-3 px-5 my-3 w-full  font-poppins text-sm rounded-lg"
        type="text"
        placeholder="Email Address"
      ></input>
      <input
        className="border-2 focus:outline-none focus:border-[#6c5dd4] py-3 px-5 my-3 w-full  font-poppins text-sm rounded-lg"
        type="text"
        placeholder="Phone No."
      ></input>
      <textarea
        className="border-2 focus:outline-none focus:border-[#6c5dd4] py-3 px-5 my-3 w-full h-[120px] font-poppins text-sm rounded-lg"
        placeholder="Message"
      ></textarea>

      <motion.button
        whileHover={{ backgroundColor: "#6c5dd4", scale: 1.1, color: "#fff" }}
        whileTap={{ scale: 0.9, backgroundColor: "#f1eeff", color: "#6c5dd4" }}
        className="py-3 px-6 rounded-lg font-bold text-[#6c5dd4] bg-[#f1eeff]"
      >
        SUBMIT
      </motion.button>
    </div>
  );
}
