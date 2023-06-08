import Navbar from "./layout/Navbar";
import Searchbar from "./layout/SearchBar";
import { NavLink, Route, Routes } from "react-router-dom";
import Authen from "./component/Authen";
import Home from "./layout/Home";
import Footer from "./layout/Footer";
import AboutUs from "./layout/AboutUs";
import Contact from "./layout/Contact";
import Bookspage from "./layout/BooksPage";
import ProductDetail from "./layout/ProductDetail";

function App() {
  return (
    <div>
      <Navbar>
        <Searchbar>
          <NavLink to="/" className="nav-item">
            Home
          </NavLink>
          <NavLink to="/books" className="nav-item">
            Books
          </NavLink>
          <NavLink to="/about" className="nav-item">
            About Us
          </NavLink>
          <NavLink to="/contact" className="nav-item">
            Contact
          </NavLink>
        </Searchbar>
        <Authen />
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Bookspage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/books/:bookId" element={<ProductDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
