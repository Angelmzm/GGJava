import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.scss';
import ModalDadosPessoais from './modals/modalDadosPessoais';


import logoRosa from '../assets/imagens/logoRosa.png';
import menuImg from '../assets/imagens/menu.png';
import lupa from '../assets/imagens/Lupa.png';
import carrinhoImg from '../assets/imagens/carrinho.png';
import contaImg from '../assets/imagens/conta.png';


const Menu = ({ isMenuOpen, toggleMenu }) => (

  <nav className={`nav ${isMenuOpen ? "open" : ""}`}>
    <ul>
      <li><Link to="/">Início</Link></li>
      <li><Link to="/maisVendidosPage">Mais Vendidos</Link></li>
      <li className="categoriasMenu">
        <Link className="categoriasLink" to="#">Categorias</Link>
        <ul className="submenu">
          <li><Link to="/vestidoPage">Vestidos</Link></li>
          <li><Link to="/blusaPage">Blusas</Link></li>
          <li><Link to="/casacoPage">Casacos</Link></li>
          <li><Link to="/calcaPage">Calças</Link></li>
          <li><Link to="/saiaPage">Saias</Link></li>
          <li><Link to="/shortsPage">Shorts</Link></li>
        </ul>
      </li>
    </ul>
  </nav>
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(prevState => !prevState);


  const handleAccountClick = () => {
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      setIsModalOpen(true); 
    } else {
      navigate('/loginPage');
    }
  };

  const checkIfAdmin = () => {
    const isAdmin = localStorage.getItem('isAdm');
    console.log("Valor de isAdm no localStorage:", isAdmin); 
    if (isAdmin === 'true') { 
      setIsAdmin(true);
    }
  };

  useEffect(() => {
    checkIfAdmin();
  }, []);  

  return (
    <>
      <header>
        <div className="logoHeader">
          <Link to={isAdmin ? `/admMainPage` : `/`}>
            <img src={logoRosa} alt="Logo" />
          </Link>
        </div>
        <div className="menuToggle" onClick={toggleMenu}>
          <img src={menuImg} alt="Menu" />
        </div>


        <Menu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

        <div className="barraPesquisa">
          <input type="text" placeholder="Buscar..." />
          <button className="bttLupa" type="submit">
            <img className="imgLupa" src={lupa} alt="Buscar" />
          </button>
        </div>

        <div>
          <Link to="/carrinhoPage">
            <img className="imgCarrinho" src={carrinhoImg} alt="Carrinho" />
          </Link>
        </div>
        <div onClick={handleAccountClick}>
          <img className="imgConta" src={contaImg} alt="Dados Pessoais" />
        </div>
      </header>

      {/* Modal de Dados Pessoais */}
      {isModalOpen && <ModalDadosPessoais />}
    </>
  );
};

export default Header;
