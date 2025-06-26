import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import "./detalhesPedidoPage.scss";

const DetalhesPedidoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);

  const paymentStatusMap = {
    pending: "Pendente",
    paid: "Pago",
    canceled: "Cancelado",
  };

  const deliveryStatusMap = {
    pending: "Pendente",
    shipped: "Enviado",
    delivered: "Entregue",
  };

  const isAdm = localStorage.getItem("isAdm") === "true";

  const fetchPedido = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/loginPage");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/orders/list/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar pedido");
      }

      const data = await response.json();
      setPedido(data);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar o pedido");
      navigate("/admPedidosPage");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPedido();
  }, [id, navigate]);

  const atualizarStatus = async (campo, valor) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`http://localhost:3001/api/orders/update-status/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ [campo]: valor }),
      });

      if (response.ok) {
        await fetchPedido(); // Recarrega o pedido atualizado
      } else {
        alert("Erro ao atualizar status.");
      }
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  if (loading) {
    return <p>Carregando pedido...</p>;
  }

  if (!pedido) {
    return <p>Pedido não encontrado.</p>;
  }

  const {
    id: pedidoId,
    user,
    address,
    items,
    total,
    payment_status,
    delivery_status,
  } = pedido;

  return (
    <div className="detalhesPedidoWrapper">
      <Header />
      <div className="conteudoFlex">
        <main>
          <div className="detalhesPedidoContainer">
            <h1>Pedido: {pedidoId}</h1>

            <div className="cardClienteEndereco">
              <h2>Cliente: {user?.username || "Usuário não disponível"}</h2>
              <p>
                Endereço: {address?.street || "N/D"}, {address?.number || "N/D"},{" "}
                {address?.district || "N/D"}, {address?.city || "N/D"} -{" "}
                {address?.state || "N/D"}, CEP: {address?.cep || "N/D"}
                {address?.complement ? `, ${address.complement}` : ""}
              </p>
              <p>
                <strong>Total do pedido:</strong> R$ {(Number(total) || 0).toFixed(2)}
              </p>

              <p>
                <strong>Status de Pagamento:</strong>{" "}
                {paymentStatusMap[payment_status] || payment_status}
              </p>
              <p>
                <strong>Status de Entrega:</strong>{" "}
                {deliveryStatusMap[delivery_status] || delivery_status}
              </p>

              {isAdm && (
                <div className="bttStatus">
                  <button onClick={() => atualizarStatus("payment_status", "paid")}>
                    Marcar como Pago
                  </button>
                  <button onClick={() => atualizarStatus("delivery_status", "shipped")}>
                    Marcar como Enviado
                  </button>
                  <button onClick={() => atualizarStatus("delivery_status", "delivered")}>
                    Marcar como Entregue
                  </button>
                </div>
              )}
            </div>

            <h2>Produtos</h2>
            <div className="produtosContainer">
              {items && items.length > 0 ? (
                items.map(({ id, product, quantity }) => (
                  <div className="cardProduto" key={id}>
                    <img
                      src={product.cover_image}
                      alt={product.productname}
                      className="produtoImagem"
                    />
                    <div className="produtoDetalhes">
                      <h3>{product.productname}</h3>
                      <p>Preço: R$ {product.price}</p>
                      <p>Quantidade: {quantity}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>Este pedido não possui produtos.</p>
              )}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DetalhesPedidoPage;
