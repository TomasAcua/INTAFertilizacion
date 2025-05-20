import footerimg from "../../assets/logos/Logos_INTAFooter.png"

const Footer = () => {
  return (
    <footer className=" mt-8 py-4 font-awesome text-center text-white border-t">
      <img src={footerimg} alt="Footer" className="w-auto"/>
    </footer>
  );
};

export default Footer;