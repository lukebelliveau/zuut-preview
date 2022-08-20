import ZuutLogo from '../images/zuut-logo.svg';
import ShoppingCartTable from '../components/ShoppingCart/ShoppingCartTable';

export const shopping_cart_path = () => '/cart';

const ShoppingCart = () => {
  return (
    <div className="home-wrapper">
      <header>
        <div id="header-logo">
          <img id="logo" src={ZuutLogo} alt="Zuut Logo" aria-hidden="true" />
        </div>
        <div id="header-auth"></div>
      </header>
      <div id="content">
        <section id="intro">
          <ShoppingCartTable />
        </section>
      </div>
    </div>
  );
};

export default ShoppingCart;
