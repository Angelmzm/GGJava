import React, { useState, useEffect } from "react";
import "./modalDadosPessoais.scss";
import ModalAtlDadosPessoais from "./modalAtlDadosPessoais";
import ModalDltDadosPessoais from "./modalDltDadosPessoais";
import { useNavigate } from 'react-router-dom';

import closeImg from "../../assets/imagens/close.png";

const ModalDadosPessoais = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [userData, setUserData] = useState(null); 
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 
  const [error, setError] = useState(null); 

  const userId = localStorage.getItem("userId"); 
  const isAdm = localStorage.getItem("isAdm") === "true";
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const fetchUserData = async () => {
    if (!userId) {
      setError("Usuário não encontrado. Por favor, faça o login.");
      navigate("/loginPage");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/users/list/${userId}`);
      if (!response.ok) {
        throw new Error(`Erro ao buscar dados do usuário: ${response.statusText}`);
      }
      const data = await response.json();
      setUserData(data); 
      setIsModalOpen(true); 
    } catch (error) {
      setError(`Erro: ${error.message}`); 
    }
  };

  const openEditModal = () => {
    setIsEditModalOpen(true); 
    setIsModalOpen(false); 
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false); 
    fetchUserData(); 
  };

  const closeModal = () => {
    setIsModalOpen(false); 
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true); 
    setIsModalOpen(false); 
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false); 
    setIsModalOpen(true); 
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal")) {
      closeModal(); 
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/loginPage"); 
  };

  const handlePedidosClick = () => {
    navigate(isAdm ? "/admPedidosPage" : "/userPedidosPage");
  };

  // ✅ Formatação de CPF e celular:
  const formatarCPF = (cpf) => {
    if (!cpf) return "";
    return cpf.replace(/\D/g, "").replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
  };

  const formatarCelular = (celular) => {
    if (!celular) return "";
    return celular.replace(/\D/g, "").replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  };

  return (
    <>
      {isModalOpen && (
        <div className="modal" onClick={handleOutsideClick}>
          <div className="modalContainer">
            <div className="headerModal">
              <h1>Dados Pessoais</h1>
              <img
                src={closeImg}
                alt="Fechar"
                onClick={closeModal} 
              />
            </div>

            <div className="dadosContainer">
              {error ? (
                <p>{error}</p> 
              ) : userData ? (
                <div className="dados">
                  <span>Nome</span>
                  <p>{userData.username}</p>

                  <span>CPF</span>
                  <p>{formatarCPF(userData.cpf)}</p>

                  <span>Celular</span>
                  <p>{formatarCelular(userData.cellphone)}</p>

                  <span>Cidade</span>
                  <p>{userData?.address?.city}</p>

                  <span>Estado</span>
                  <p>{userData?.address?.state}</p>

                  <span>CEP</span>
                  <p>{userData?.address?.cep}</p>

                  <span>Rua</span>
                  <p>{userData?.address?.street}</p>

                  <span>Número</span>
                  <p>{userData?.address?.number}</p>

                  <span>Bairro</span>
                  <p>{userData?.address?.district}</p>

                  <span>Complemento</span>
                  <p>{userData?.address?.complement}</p>
                </div>
              ) : (
                <p>Carregando...</p>
              )}

              <div className="bttPedidos">
                <button onClick={handlePedidosClick}>
                  {isAdm ? "Todos os Pedidos" : "Meus Pedidos"}
                </button>
              </div>

              <div className="bttDados">
                <button onClick={openEditModal}>Atualizar</button>
                <button onClick={openDeleteModal}>Deletar</button>
                <button onClick={handleLogout}>Sair</button> 
              </div>
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <ModalAtlDadosPessoais userId={userId} onClose={closeEditModal} />
      )}

      {isDeleteModalOpen && (
        <ModalDltDadosPessoais userId={userId} onClose={closeDeleteModal} />
      )}
    </>
  );
};

export default ModalDadosPessoais;
