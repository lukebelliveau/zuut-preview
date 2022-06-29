import ZuutLogo from '../images/zuut-logo.svg';

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
          <h5>Shopping Cart</h5>
          <h4>Coming Soon!</h4>
          <p>Thank you so much for giving ZUUT a try.</p>
          <p>
            Help us grow! Please leave feedback by clicking on the red smiley
            face in the bottom left corner, or send us an email at{' '}
            <a href="mailto: feedback@zuut.co">feedback@zuut.co</a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ShoppingCart;
