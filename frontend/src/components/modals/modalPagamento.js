import React from "react";
import QRCode from "react-qr-code"; // ou use o 'QRCodeCanvas' se preferir, desde que o pacote esteja correto
import closeImg from "../../assets/imagens/close.png";
import "./modalPagamento.scss";

const ModalPagamento = ({ isOpen, onClose, qrCodeValue, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div
      className="modal"
      onClick={(e) => {
        if (e.target.classList.contains("modal")) {
          onClose();
        }
      }}
    >
      <div className="modalContainer">
        <div className="headerModal">
          <h1>Pagamento via QR Code</h1>
          <img
            src={closeImg}
            alt="Fechar"
            onClick={onClose}
            style={{ cursor: "pointer" }}
          />
        </div>

        <div className="conteudoModal">
          <p>
            Para concluir seu pedido, por favor, escaneie o QR Code abaixo com seu aplicativo de pagamento.
             <br/>
             <br/>
            O pedido será confirmado somente após a confirmação do pagamento.
          </p>

          <div className="qrCodeContainer" style={{ margin: "1rem auto", width: 200 }}>
            <QRCode value={qrCodeValue} size={200} />
          </div>

          <button className="btnConfirmar" onClick={onConfirm}>
            Confirmar Pedido
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalPagamento;
