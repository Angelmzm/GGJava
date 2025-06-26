import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./admMainPage.scss"; 

import ModalAdcProduto from '../components/modals/modalAdcProduto';  
import MaisVendidos from '../components/maisVendidos';
import Header from '../components/header';
import Footer from '../components/footer'; 

import logoBranca from '../assets/imagens/logoBrancaCapa.png'

const AdmMainPage = () => {

  return (
    <div className="App">
      {/* Header */}
      <Header />

      {/* Seção de Capa */}
      <section className="capa">
        <div className="capaContainer">
          <div className="logoCapa">
            <h1>As melhores roupas, <br />  na melhor loja!</h1>
            <img src={logoBranca} alt="Imagem de produtos" />   
          </div>
        
        <div className="imagemCapa">
          <p>Uma loja feita para você que ama roupas, igual a nós!</p>
          <p>Compre fácil, rápido e com os melhores preços.</p>        </div>
        </div>
      </section>

      {/* Adicionar Produto */}
      <div className="adcProdutoAdm">
      <ModalAdcProduto />
      </div>

      {/* Mais Vendidos */}
      <MaisVendidos />

      {/* Categorias */}
      <div id="categorias" className="categoriaContainer">
        <div>
          <h1>Categorias</h1>
        </div>
        <div className="categoria">
          
          <div className="categoriaOpcoes">
            <div className="gridCategorias">
              <Link to="/vestidoPage" className="opcaoCategoria">Vestidos</Link>
              <Link to="/blusaPage" className="opcaoCategoria">Blusas</Link>
              <Link to="/casacoPage" className="opcaoCategoria">Casacos</Link>
              <Link to="/calcaPage" className="opcaoCategoria">Calças</Link>
              <Link to="/saiaPage" className="opcaoCategoria">Saias</Link>
              <Link to="/shortsPage" className="opcaoCategoria">Shorts</Link>
          </div>   
        </div>
          </div>
      </div>

      {/* Rodapé */}
      <Footer />
    </div>
  );
};

export default AdmMainPage;
