export default function Navbar(props) {
  return (
    <nav>
      <h1 className="font-bold text-[2rem] col-start-2 col-span-2">
        Booktopia
      </h1>
      {props.children}
    </nav>
  );
}
