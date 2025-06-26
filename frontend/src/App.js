import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdmMainPage from "./pages/admMainPage";
import LoginPage from "./pages/loginPage";
import CadastroPage from "./pages/cadastroPage";
import MaisVendidosPage from "./pages/maisVendidosPage";
import VestidoPage from "./pages/vestidoPage";
import BlusaPage from "./pages/blusaPage";
import CalcaPage from "./pages/calcaPage";
import CasacoPage from "./pages/casacoPage";
import SaiaPage from "./pages/saiaPage";
import ShortsPage from "./pages/shortsPage";
import ProdutoPage from "./pages/produtoPage";
import AdmProdutoPage from "./pages/admProdutoPage";
import MainPage from "./pages/mainPage";
import CarrinhoPage from "./pages/carrinhoPage";
import AdmPedidosPage from "./pages/admPedidosPage";
import UserPedidosPage from "./pages/userPedidosPage";
import DetalhesPedidoPage from "./pages/detalhesPedidoPage";


function App() {
  return (
      <Routes>

        <Route path="/" element={<MainPage />} />
        <Route path="/admMainPage" element={<AdmMainPage />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/cadastroPage" element={<CadastroPage />} />
        <Route path="/maisVendidosPage" element={<MaisVendidosPage />} />
        <Route path="/vestidoPage" element={<VestidoPage />} />
        <Route path="/blusaPage" element={<BlusaPage />} />
        <Route path="/calcaPage" element={<CalcaPage />} />
        <Route path="/saiaPage" element={<SaiaPage />} />
        <Route path="/shortsPage" element={<ShortsPage />} />
        <Route path="/casacoPage" element={<CasacoPage />} />
        <Route path="/produtoPage/:id" element={<ProdutoPage />} />
        <Route path="/admProdutoPage/:id" element={<AdmProdutoPage />} />
        <Route path="/carrinhoPage" element={<CarrinhoPage />} />
        <Route path="/admPedidosPage" element={<AdmPedidosPage />} />
        <Route path="/userPedidosPage" element={<UserPedidosPage />} />
        <Route path="/detalhesPedidosPage/:id" element={<DetalhesPedidoPage />} />
        
      </Routes>
  );
}

export default App;
