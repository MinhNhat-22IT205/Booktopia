import { motion } from "framer-motion";
export default function Subcribe() {
  return (
    <div className="shadow-lg shadow-[#000]/30 col-start-2 col-span-10 bg-cover bg-no-repeat mb-10 py-10 rounded-3xl bg-emailing flex flex-col justify-around items-center">
      <div className="text-center">
        <h1 className="mx-auto text-3xl font-semibold text-white w-9/12">
          Subcribe our newsletter for newest books updates
        </h1>
        <div className="w-fit mx-auto rounded-lg bg-white/25 mt-10">
          <input
            className=" py-2 px-5 max-w-[250px] rounded-l-lg border-none bg-transparent text-[#000] focus:border-none placeholder:text-white placeholder:text-sm"
            type="text"
            placeholder="Type your email here"
          ></input>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1 }}
            className="bg-white font-bold rounded-r-lg py-3 px-6 text-sm"
          >
            SUBCRIBE
          </motion.button>
        </div>
      </div>
    </div>
  );
}
