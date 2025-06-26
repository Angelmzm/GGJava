import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./userPedidosPage.scss";

import Header from "../components/header";
import Footer from "../components/footer";

const UserPedidosPage = () => {
  const [pedidos, setPedidos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("authToken");

    if (!userId || !token) {
      navigate("/loginPage");
      return;
    }

    const fetchPedidos = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/orders/list/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar pedidos");
        }

        const data = await response.json();
        setPedidos(data);
      } catch (error) {
        console.error("Erro ao carregar pedidos:", error);
      }
    };

    fetchPedidos();
  }, [navigate]);

    const abrirDetalhesPedido = (pedidoId) => {
    navigate(`/detalhesPedidosPage/${pedidoId}`);
  };

  return (
    <div className="meusPedidosWrapper">
      <Header />

        <div className="meusPedidosContainer">
          <h1>Meus Pedidos</h1>
          <div className="pedidosLista">
            {pedidos.length > 0 ? (
              pedidos.map((pedido) => (
                <div
                  key={pedido.id}
                  className="pedidoCard"
                  onClick={() => abrirDetalhesPedido(pedido.id)}
                  style={{ cursor: "pointer", border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}
                >
                  <p className="numeroPedido">Pedido: {pedido.id}</p>
                  <p><strong>Total:</strong> R$ {pedido.total?.toFixed(2) || "0.00"}</p>
                </div>
              ))
            ) : (
              <p>Você ainda não fez nenhum pedido.</p>
            )}
          </div>
        </div>

      <Footer />
    </div>
  );
};

export default UserPedidosPage;
