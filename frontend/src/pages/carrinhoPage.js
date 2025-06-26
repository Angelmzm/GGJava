import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./carrinhoPage.scss";

import Header from "../components/header";
import Footer from "../components/footer";
import lixeira from "../assets/imagens/lixeira.png";
import ModalPagamento from "../components/modals/modalPagamento"; // Importe o modal

const CarrinhoPage = () => {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartCorrigido = cart.map((produto) => ({
      ...produto,
      quantity: produto.quantity && produto.quantity > 0 ? produto.quantity : 1,
    }));

    setProdutos(cartCorrigido);
    localStorage.setItem("cart", JSON.stringify(cartCorrigido));

    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      navigate("/loginPage");
    }
  }, [navigate]);

  const atualizarQuantidade = (id, operacao) => {
    const updatedCart = produtos.map((produto) =>
      produto.id === id
        ? {
            ...produto,
            quantity:
              operacao === "increment"
                ? produto.quantity + 1
                : produto.quantity > 1
                ? produto.quantity - 1
                : 1,
          }
        : produto
    );
    setProdutos(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removerProduto = (id) => {
    const updatedCart = produtos.filter((produto) => produto.id !== id);
    setProdutos(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calcularTotal = () => {
    return produtos
      .reduce((total, produto) => total + Number(produto.price) * produto.quantity, 0)
      .toFixed(2);
  };

  // Abre o modal ao clicar no botão comprar
  const abrirModal = () => {
    if (produtos.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
  };

  // Função que cria o pedido no backend, chamada quando usuário confirma no modal
  const confirmarPedido = async () => {
    const userId = localStorage.getItem("userId");
    const addressId = localStorage.getItem("addressId");

    if (!userId || !addressId) {
      alert("Usuário ou endereço não encontrados.");
      setModalAberto(false);
      navigate("/loginPage");
      return;
    }

    const items = produtos
      .filter((produto) => produto.quantity && produto.quantity > 0)
      .map((produto) => ({
        productId: produto.id,
        quantity: produto.quantity,
      }));

    if (items.length === 0) {
      alert("Carrinho vazio ou sem quantidades válidas.");
      setModalAberto(false);
      return;
    }

    const pedido = {
      userId,
      addressId,
      items,
    };

    try {
      setCarregando(true);
      const response = await fetch("http://localhost:3001/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(pedido),
      });

      if (response.ok) {
        alert("Pedido realizado com sucesso! Aguarde a confirmação do pagamento.");
        localStorage.removeItem("cart");
        setProdutos([]);
        setModalAberto(false);
        navigate("/");
      } else {
        alert("Erro ao realizar pedido.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao conectar com o servidor.");
    } finally {
      setCarregando(false);
    }
  };

  // Valor do QR Code (exemplo PIX)
  const qrCodeValue =
    "00020126360014BR.GOV.BCB.PIX0114+5511999999995204000053039865404100.005802BR5909Fulano de Tal6009Sao Paulo61080540900062070503***6304ABCD";

  return (
    <div className="carrinhoWrapper">
      <Header />

      <main>
        <div className="carrinhoContainer">
          <h1>Carrinho</h1>
          <div className="carrinhoContent">
            <div className="carrinhoProdutos">
              {produtos.length > 0 ? (
                produtos.map((produto) => (
                  <div className="carrinhoItens" key={produto.id}>
                    <Link to={`/admProdutoPage/${produto.id}`}>
                      <img src={produto.cover_image} alt={produto.productname} />
                    </Link>
                    <div className="carrinhoItensDetalhes">
                      <h4>{produto.productname}</h4>
                      <p>R$ {produto.price}</p>
                    </div>
                    <div className="carrinhoQuantidade">
                      <button onClick={() => atualizarQuantidade(produto.id, "decrement")}>-</button>
                      <span>{produto.quantity}</span>
                      <button onClick={() => atualizarQuantidade(produto.id, "increment")}>+</button>
                    </div>
                    <div className="carrinhoLixeira">
                      <img src={lixeira} alt="Remover" onClick={() => removerProduto(produto.id)} />
                    </div>
                  </div>
                ))
              ) : (
                <p>Seu carrinho está vazio!</p>
              )}
            </div>

            <div className="totalContainer">
              <div className="total">
                <h2>Total</h2>
                <div className="totalDetalhes">
                  <span className="totalLabel">Total</span>
                  <span className="totalPreco">R$ {calcularTotal()}</span>
                </div>
                <div className="bttComprar">
                  {/* Agora abre modal em vez de criar pedido direto */}
                  <button onClick={abrirModal} disabled={carregando || produtos.length === 0}>
                    {carregando ? "Enviando..." : "Comprar"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Modal do pagamento */}
      <ModalPagamento
        isOpen={modalAberto}
        onClose={fecharModal}
        onConfirm={confirmarPedido}
        qrCodeValue={qrCodeValue}
      />
    </div>
  );
};

export default CarrinhoPage;
