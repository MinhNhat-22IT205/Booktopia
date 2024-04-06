import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import ContactForm from "../component/ContactPage/ContactForm";
import Spinner from "../component/UI/Spinner";
export default function Contact() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDc7PnOq3Hxzq6dxeUVaY8WGLHIePl0swY",
  });
  if (!isLoaded) return <Spinner />;
  return (
    <div className="grid grid-cols-12 ">
      <h3 className="col-start-2 col-span-10 text-[#6c5dd4] font-poppins text-lg font-bold my-8 ">
        Home&nbsp;/&nbsp;
        <span className="text-[#000] font-poppins text-lg font-bold opacity-40">
          &nbsp;Contact
        </span>
      </h3>
      <div className="col-start-2 col-span-10 rounded-3xl  border-[#6c5dd4] overflow-hidden">
        <Map />
      </div>
      <div className="col-start-2 col-span-10 lg:col-start-2 lg:col-span-6 bg-[#6c5dd4] flex flex-col justify-around  rounded-3xl border-4 border-dashed border-[#f1eeff] text-white px-32  h-[400px] mt-5">
        <div className="max-w-[350px]">
          <h1 className="font-bold text-4xl">Get In Touch</h1>
          <p className="opacity-60">
            If you are interested in working with us, let us your contact.
          </p>
          <div className="flex items-center my-8 ">
            <i className="fa-solid fa-location-dot text-5xl text-[#f1eeff] mr-5"></i>
            <div>
              <h3 className="font-bold text-xl">Our Address</h3>
              <p className="font-poppins text-sm">
                1247/Plot No.39, 15th ABC, Hakala, Hueab Colony, Lorem
              </p>
            </div>
          </div>
          <div className="flex items-center my-5">
            <i className="fa-solid fa-envelope text-4xl text-[#f1eeff] mr-5"></i>
            <div>
              <h3 className="font-bold text-xl">Our Email</h3>
              <p className="font-poppins text-sm">booktopia@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row-span-2 max-w-[600px] lg:ml-[-120px] lg:mt-[-150px] mb-20 py-8 px-5 col-start-2 col-span-10 lg:col-start-8 lg:col-span-3 rounded-xl z-15 bg-white scale-110 shadow-lg shadow-[#000]/30">
        <ContactForm />
      </div>
    </div>
  );
}
function Map() {
  const center = useMemo(
    () => ({ lat: 15.975437487543585, lng: 108.25259102995878 }),
    []
  );

  return (
    <GoogleMap
      zoom={16}
      center={center}
      mapContainerClassName="w-full h-screen"
    >
      <Marker position={center} />
    </GoogleMap>
  );
}
