import { motion } from "framer-motion";
import Bookonsale from "../component/HomePage/Carousel2/Bookonsale";
import CompanyFeature from "../component/HomePage/ShortInfor";
import FeatureBook from "../component/HomePage/Carousel3/FeatureBook";
import Testimonials from "../component/HomePage/Testimonial/Testimonials";
import NumberCounter from "../component/HomePage/NumberCounter";
import Subcribe from "../component/HomePage/Subcribe";
import BestSeller from "../component/HomePage/Carousel1/BestSeller";
import Banner from "../component/HomePage/Banner";

export default function Home() {
  return (
    <section className="home-page">
      <Banner />
      <BestSeller />
      <CompanyFeature />
      <Bookonsale />
      <FeatureBook />
      <Testimonials />
      <NumberCounter />
      <Subcribe />
    </section>
  );
}
