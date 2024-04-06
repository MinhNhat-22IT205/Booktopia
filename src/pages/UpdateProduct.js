import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBook, updateBook } from "../shared/store/user";
import { motion } from "framer-motion";
import Input from "../component/UI/Input";
import useForm from "../shared/hook/useForm";
import DynamicInput from "../component/UI/DynamicInput";
import useHttp from "../shared/hook/useHttp";
import Spinner from "../component/UI/Spinner";
import MultiDropdownSelect from "../component/UI/MultiDropdownSelect";
import notification, { notificationAction } from "../shared/store/notification";

const genres = [
  "Fiction",
  "Non-fiction",
  "Mystery",
  "Thriller",
  "Romance",
  "Science Fiction",
  "Fantasy",
  "Horror",
  "Historical Fiction",
  "Biography",
  "Autobiography",
  "Self-Help",
  "Business",
  "History",
  "Travel",
  "Cooking",
  "Young Adult",
  "Children",
  "Poetry",
  "Drama",
  "Comedy",
  "Action and Adventure",
  "Science",
  "Religion",
  "Philosophy",
  "Art",
  "Sports",
  "Parenting",
  "Education",
  "Health and Fitness",
  "Psychology",
  "Technology",
  "Reference",
  "Graphic Novels",
  "Comics",
  "Magazines",
  "Short Stories",
  "Essays",
  "Anthology",
  "Classic",
  "Historical",
  "Contemporary",
  "Literary Fiction",
  "Crime",
  "Dystopian",
  "Urban Fantasy",
  "Paranormal",
  "Supernatural",
  "Psychological Thriller",
  "Political",
  "Science",
  "Space Opera",
  "Cyberpunk",
  "Post-Apocalyptic",
  "Steampunk",
  "Western",
  "Magical Realism",
  "Gothic",
  "Time Travel",
  "Chick Lit",
  "Urban Fiction",
  "Satire",
  "Humor",
  "Memoir",
  "True Crime",
  "Travelogue",
  "Artificial Intelligence",
  "Environmental",
  "Sociology",
  "Economics",
  "Anthropology",
  "Philosophy of Mind",
  "Spirituality",
  "Mythology",
  "Fairy Tales",
  "Graphic Design",
  "Crafts and Hobbies",
  "Fashion",
  "Sports Memoir",
  "Fitness",
  "Nutrition",
  "Cognitive Science",
  "Computer Science",
  "Data Science",
  "Software Development",
  "Web Development",
];

const validator = (values) => {
  let errors = {};
  if (!values.title) {
    errors.title = "This field cannot be empty";
  }
  if (!values.author) {
    errors.author = "This field cannot be empty";
  }
  if (!values.description) {
    errors.description = "This field cannot be empty";
  }
  if (!values.language) {
    errors.language = "This field cannot be empty";
  }
  if (!values.ISBN) {
    errors.ISBN = "This field cannot be empty";
  }
  if (!values.genre || values.genre.length === 0) {
    errors.genre = "This field cannot be empty";
  }
  if (!values.bookFormat) {
    errors.bookFormat = "This field cannot be empty";
  }
  if (!values.tag || values.tag.length === 0) {
    errors.tag = "This field cannot be empty";
  }
  if (!values.numberInStock) {
    errors.numberInStock = "This field cannot be empty";
  } else if (!/^\d+$/.test(values.numberInStock)) {
    errors.numberInStock = "This field must be a number";
  } else if (values.numberInStock <= 0) {
    errors.numberInStock = "Stock must be above 0";
  }
  if (!values.price) {
    errors.price = "This field cannot be empty";
  } else if (isNaN(values.price)) {
    errors.price = "Price must be a number";
  } else if (values.price < 0) {
    errors.price = "Price must be from and above 0";
  }
  // if (!values.shipPrice) {
  //   errors.shipPrice = "This field cannot be empty";
  // } else if (isNaN(values.shipPrice)) {
  //   errors.shipPrice = "Price must be a number";
  // } else if (values.shipPrice < 0) {
  //   errors.shipPrice = "Price must be from and above 0";
  // }
  if (!values.discount) {
    errors.discount = "This field cannot be empty";
  } else if (isNaN(values.discount)) {
    errors.discount = "Discount must be a number";
  } else if (values.discount >= 100 || values.discount < 0) {
    errors.discount = "Discount must between 0% and 99%";
  }
  return errors;
};

export default function UpdateProduct() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { id } = useParams();
  const token = useSelector((state) => state.user.token);
  const uid = useSelector((state) => state.user.uid);
  const [file, setFile] = useState(null);
  const { isLoading, fetchData } = useHttp();
  const [isUpdating, setIsUpdating] = useState(false);
  const [initialData, setInitialData] = useState({});
  const { data, memoizedSetData, errors, isValid } = useForm(
    {
      title: null,
      author: null,
      description: null,
      language: null,
      ISBN: null,
      genre: [],
      bookFormat: null,
      tag: [],
      numberInStock: null,
      price: null,
      shipPrice: 1,
      discount: null,
    },
    validator
  );

  useEffect(() => {
    (async () => {
      const b = await fetchData(`http://localhost:5000/books/${id}`, "GET");
      setInitialData(b.book);
      console.log(b);
      if (b.book && b.book.creator._id === uid) {
        setFile("http://localhost:5000/" + b.book.image);
      } else {
        nav("/404");
      }
    })();
  }, []);

  useEffect(() => {
    const inputs = document.querySelectorAll("input");
    const button = document.getElementById("button");

    button?.addEventListener("click", () => {
      inputs.forEach((input) => {
        input.reportValidity();
      });
    });
  });

  function submit(event) {
    event.preventDefault();
    if (isValid) {
      let reqData = { ...data };
      if (file && file instanceof File) {
        reqData.image = file;
      }
      dispatch(
        updateBook(initialData.id, reqData, token, setIsUpdating, () => {
          nav("profile");
        })
      );
    } else {
      console.log(errors);
      dispatch(
        notificationAction.notify({
          message: errors[0],
          status: "error",
        })
      );
    }
  }

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <section className="grid grid-cols-12 py-10 bg-[#f5f6f8]">
          <div className="col-start-2 col-span-10">
            <form
              onSubmit={submit}
              action=""
              className="flex justify-center gap-10"
            >
              <div className="basis-2/3">
                <h1 className="font-bold text-3xl mb-10">Update Product</h1>
                <div className="flex flex-col border rounded-xl px-8 py-7  bg-white">
                  <h1 className="font-bold text-xl mb-8 ">Basic Information</h1>
                  <Input
                    label="Title"
                    placeholder="Title of the book"
                    type="input"
                    name="title"
                    required={true}
                    initialValue={initialData.title}
                    setData={memoizedSetData}
                    errors={errors}
                    className="border w-full mt-1.5 mb-3 min-h-[50px] font-poppins !font-medium text-sm !border-[#ebebeb] px-5 py-2 rounded-lg outline-none "
                  />
                  <Input
                    label="Author"
                    placeholder="Book's author"
                    type="input"
                    name="author"
                    required={true}
                    initialValue={initialData.author}
                    setData={memoizedSetData}
                    errors={errors}
                    className="border w-full mt-1.5 mb-3 min-h-[50px] font-poppins !font-medium text-sm !border-[#ebebeb] px-5 py-2 rounded-lg outline-none "
                  />
                  <Input
                    label="Edition Language"
                    placeholder="Book's language"
                    type="input"
                    name="language"
                    required={true}
                    initialValue={initialData.language}
                    setData={memoizedSetData}
                    errors={errors}
                    className="border w-full mt-1.5 mb-3 min-h-[50px] font-poppins !font-medium text-sm !border-[#ebebeb] px-5 py-2 rounded-lg outline-none "
                  />
                  <MultiDropdownSelect
                    label="Genre"
                    type="input"
                    name="genre"
                    required={true}
                    initialValue={initialData.genre}
                    setData={memoizedSetData}
                    errors={errors}
                    chooseData={genres}
                    className="border w-80 mt-1.5 mb-3 min-h-[50px] font-poppins !font-medium text-sm !border-[#ebebeb] px-5 py-2 rounded-lg outline-none "
                  />
                  <br />
                  <Input
                    label="Description"
                    placeholder="A few words about the book..."
                    type="input"
                    tagType="textarea"
                    name="description"
                    required={true}
                    initialValue={initialData.description}
                    setData={memoizedSetData}
                    errors={errors}
                    className="border w-full mt-1.5 mb-3 min-h-[80px] font-poppins !font-medium text-sm !border-[#ebebeb] px-5 py-2 rounded-lg outline-none "
                  />
                </div>
                <div className="flex flex-col border rounded-xl px-8 py-7 mt-8 bg-white">
                  <h1 className="font-bold text-xl mb-8 ">
                    Detail Information
                  </h1>
                  <Input
                    label="Book Format"
                    placeholder="Book feature (paper type, total page number,...)"
                    type="input"
                    name="bookFormat"
                    required={true}
                    initialValue={initialData.bookFormat}
                    setData={memoizedSetData}
                    errors={errors}
                    className="border w-full mt-1.5 mb-3 min-h-[50px] font-poppins !font-medium text-sm !border-[#ebebeb] px-5 py-2 rounded-lg outline-none "
                  />
                  <Input
                    label="ISBN"
                    placeholder="International standard book number"
                    type="input"
                    name="ISBN"
                    required={true}
                    initialValue={initialData.ISBN}
                    setData={memoizedSetData}
                    errors={errors}
                    className="border w-full mt-1.5 mb-3 min-h-[50px] font-poppins !font-medium text-sm !border-[#ebebeb] px-5 py-2 rounded-lg outline-none "
                  />
                  <DynamicInput
                    label="Tag"
                    type="input"
                    name="tag"
                    required={true}
                    initialValue={initialData.tag}
                    setData={memoizedSetData}
                    errors={errors}
                    className="border w-52 mt-1.5 mb-3 min-h-[50px]  font-poppins !font-medium text-sm !border-[#ebebeb] px-5 py-2 rounded-lg outline-none "
                  />
                </div>
                <div className="border rounded-xl px-8 py-4 my-7 bg-white">
                  <h1 className="font-bold text-xl mb-6 mt-2">Images</h1>
                  <div
                    className={`border-2 w-full  border-[#ebebeb] mb-2  outline-none font-bold bg-[#fafafb] border-dashed min-h-36 ${
                      false ? "px-5 py-2" : ""
                    } `}
                  >
                    <div
                      className={` w-full ${
                        file
                          ? "text-center"
                          : "flex flex-col items-center justify-center h-44"
                      }`}
                    >
                      {!file && (
                        <input
                          name="image"
                          type="file"
                          accept="image/png, image/gif, image/jpeg"
                          onChange={(e) => {
                            setFile(e.target.files[0]);
                          }}
                          className="border-none text-[#aaa]"
                        />
                      )}
                    </div>
                    <div className="relative mx-auto gap-2 w-fit">
                      <img
                        src={
                          file && file instanceof File
                            ? URL.createObjectURL(file)
                            : file
                        }
                        alt=""
                      ></img>
                      {file && (
                        <button
                          type="button"
                          onClick={() => {
                            setFile(null);
                          }}
                          className="absolute top-0 right-0 m-3 mx-3 bg-white/80 backdrop-blur-0 rounded-full w-8 h-8 text-center font-bold "
                        >
                          X
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className=" border rounded-xl px-8 py-7 pr-10 bg-white">
                  <h1 className="font-bold text-xl mb-8">Price</h1>
                  <div className="flex justify-start gap-10">
                    <div>
                      <Input
                        label="Stock's number:"
                        type="input"
                        flex={true}
                        gap={1}
                        errorStyle="text-end"
                        name="numberInStock"
                        required={true}
                        initialValue={initialData.numberInStock}
                        setData={memoizedSetData}
                        errors={errors}
                        className="border w-48  !border-[#ebebeb] px-5 py-2  rounded-lg outline-none font-bold"
                      />
                      <br />
                      {/* <Input
                        label="Ship price:"
                        type="input"
                        name="shipPrice"
                        flex={true}
                        gap={11}
                        required={true}
                        initialValue={initialData.shipPrice}
                        errorStyle="text-end"
                        setData={memoizedSetData}
                        errors={errors}
                        className="border w-48  !border-[#ebebeb] px-5 py-2  rounded-lg outline-none font-bold"
                      /> */}
                    </div>
                    <div>
                      <Input
                        label="Price (USD):"
                        type="input"
                        name="price"
                        flex={true}
                        gap={9}
                        required={true}
                        initialValue={initialData.price}
                        errorStyle="text-end"
                        setData={memoizedSetData}
                        errors={errors}
                        className="border w-48  !border-[#ebebeb] px-5 py-2  rounded-lg outline-none font-bold"
                      />
                      <br />
                      <Input
                        label="Discount (%):"
                        type="input"
                        name="discount"
                        flex={true}
                        gap={8}
                        errorStyle="text-end"
                        required={true}
                        initialValue={initialData.discount}
                        setData={memoizedSetData}
                        errors={errors}
                        className="border w-48  !border-[#ebebeb] px-5 py-2  rounded-lg outline-none font-bold"
                      />
                    </div>
                  </div>
                </div>
                <motion.button
                  id="button"
                  whileHover={{ scale: 1.1 }}
                  className={`bg-[#6c5dd4] text-white font-semibold px-6 mt-5 ml-2.5 py-2.5 rounded-lg ${
                    isUpdating && "!bg-[#d4d0fe] !text-[#6c5dd4]"
                  }`}
                >
                  {isUpdating ? "Loading.." : "Update"}
                </motion.button>
              </div>
              {/* <div className="relative basis-1/3 h-[2000px]">
                <div className="sticky top-20">
                  <h1 className="font-bold underline">Note:</h1>
                  <ul className="font-bold text-xl">
                    <li>1. Title should be longer than 5 characters</li>
                    <li>2. Description should be longer than 10 characters</li>
                    <li>3. Price should be a number and bigger than 0</li>
                    <li>4. Image should be a file</li>
                  </ul>
                </div>
              </div> */}
            </form>
          </div>
        </section>
      )}
    </>
  );
}
