import Mission from "./Mission";
export default function OurMission() {
  return (
    <>
      <h1 className="text-center text-4xl font-bold">Our Mission</h1>
      <p className="text-center opacity-60 w-3/4 mx-auto pt-5 pb-10">
        Our mission is to make the joy of reading accessible to everyone. We
        believe that reading can inspire, educate, and entertain, and we're
        passionate about connecting readers with the perfect books for them.
      </p>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-10 ">
        <Mission
          icon={
            <i className="fa-solid fa-book icon-cell text-5xl text-[#6c5dd4]"></i>
          }
          title="Best Bookstore"
          des="Our store offers an unparalleled selection of books across all genres, from classic literature to the latest bestsellers. All are writen by many famous authors across the world."
        />
        <Mission
          icon={
            <i className="fa-solid fa-medal icon-cell text-5xl text-[#6c5dd4]"></i>
          }
          title="Trusted Seller"
          des="Our store offers an unparalleled selection of books across all genres, from classic literature to the latest bestsellers. All are writen by many famous authors across the world."
        />
        <Mission
          icon={
            <i className="fa-solid fa-store icon-cell text-5xl text-[#6c5dd4]"></i>
          }
          title="Expand Store"
          des="Our store offers an unparalleled selection of books across all genres, from classic literature to the latest bestsellers. All are writen by many famous authors across the world."
        />
      </div>
    </>
  );
}
