import Brand from "./Brand";
import Menu from "./Menu";

const Header = () => (
  <header className="py-3 mb-4 border-bottom bg-dark">
    <div className="container d-flex flex-wrap justify-content-between align-items-center">
      <Brand />
      <Menu />
    </div>
  </header>
);

export default Header;
