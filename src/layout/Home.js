import { motion } from "framer-motion";
import Bookonsale from "../component/Bookonsale";
import CompanyFeature from "../component/ShortInfor";
import FeatureBook from "../component/FeatureBook";
import Testimonials from "../component/Testimonials";
import NumberCounter from "../component/NumberCounter";
import Subcribe from "../component/Subcribe";
import BestSeller from "../component/BestSeller";
import Banner from "../component/Banner";

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
