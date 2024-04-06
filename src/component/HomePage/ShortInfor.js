import CompanyShortInfor from "./CompanyShortInfor";
export default function CompanyFeature() {
  return (
    <div className="home-short-infor-container">
      <CompanyShortInfor
        i={<i className="fa-solid fa-bolt-lightning"></i>}
        feature="Quick Delivery"
        des="Your book will be assured to arrive in minute with secure manner."
      />
      <CompanyShortInfor
        i={<i className="fa-solid fa-shield"></i>}
        feature="Secure Payment"
        des="Our payment gateway is easy to use and accepts a variety of payment methods."
      />
      <CompanyShortInfor
        i={<i className="fa-solid fa-thumbs-up"></i>}
        feature="Best Quality"
        des="Books are from various of high-quality books sources and in excellent condition."
      />
      <CompanyShortInfor
        i={<i className="fa-solid fa-star"></i>}
        feature="Return Guarantee"
        des="Contact us within the specified return period for a refund or exchange."
      />
    </div>
  );
}
