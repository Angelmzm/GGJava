import React from 'react';
import './footer.scss'; 


import logoPreto from '../assets/imagens/logoPreta.png';


const Footer = () => {

  return (
    <footer>
      <div className="footerContainer">
        <div className="footerLogo">
          <img className='logoImg' src={logoPreto} alt="Logo da Empresa" />
        </div>


        <div className="footerInformacoes">

          <div className="footerWhatsapp">
            
            <p> Alguma dúvida? Entre em contato conosco! </p>
             <button
             onClick={() =>
              window.open(
                "https://api.whatsapp.com/send?phone=+5515998345580&text=Ol%C3%A1%21%20Vi%20sua%20loja%20online%20e%20me%20interessei%20pelos%20produtos.%20Poderia%20me%20passar%20mais%20informa%C3%A7%C3%B5es%20sobre%20pre%C3%A7os%20e%20prazos%20de%20entrega%3F",
                "_blank"
              )
            }
            className="buttonWhatsapp" >
              <img src={require("../assets/imagens/whatsapp.png")} alt="WhatsApp" />
               Enviar mensagem no whatsapp
              </button>

          </div>

          <div className='footerFrase'>
            <p>
              Uma loja feita para você que ama roupas, igual a nós!
            </p>

            <p>
              Compre fácil, rápido e com os melhores preços.
            </p>

          </div>


        </div>
      </div>
    </footer>
  );
};

export default Footer;
