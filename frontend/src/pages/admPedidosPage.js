import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./admPedidosPage.scss";

import Header from "../components/header";
import Footer from "../components/footer";

const AdmPedidosPage = () => {
  const [pedidos, setPedidos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch("http://localhost:3001/api/orders/list", {
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
        console.error(error);
        alert("Erro ao carregar pedidos");
      } finally {
        setCarregando(false);
      }
    };

    fetchPedidos();
  }, []);

  const abrirDetalhesPedido = (pedidoId) => {
    navigate(`/detalhesPedidosPage/${pedidoId}`);
  };

  if (carregando) {
    return <p>Carregando pedidos...</p>;
  }

  if (pedidos.length === 0) {
    return <p>Nenhum pedido encontrado.</p>;
  }

  return (
    <div className="pedidosWrapper">
      <Header />

      <div className="admPedidosPage">
        <h1>Pedidos</h1>
        <div className="listaPedidos">
          {pedidos.map((pedido) => (
            <div
              key={pedido.id}
              className="pedidoCard"
              onClick={() => abrirDetalhesPedido(pedido.id)}
              style={{ cursor: "pointer", border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}
            >
              <p className="numeroPedido">Pedido: {pedido.id}</p>
              <p><strong>Total:</strong> R$ {pedido.total !== undefined ? Number(pedido.total).toFixed(2) : "0.00"}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdmPedidosPage;
