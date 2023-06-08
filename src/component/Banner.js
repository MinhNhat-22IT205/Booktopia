import { motion } from "framer-motion";
export default function Banner() {
  return (
    <div className="home-banner">
      <h4 className="font-bold">BACK TO SCHOOL</h4>
      <h1 className="font-bold">Special 50% Off</h1>
      <h3>for our student community</h3>
      <p>
        Get ready for the new school year! We have everything you need to
        succeed. Take advantage of this limited-time offer and stock up on all
        the essentials you need to make this school year your best one.
      </p>
      <div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          className="home-banner-btn-shop"
        >
          Shop now<i className="fa-solid fa-arrow-right-long"></i>
        </motion.button>
        <motion.button className="home-banner-btn-read">About us</motion.button>
      </div>
    </div>
  );
}
