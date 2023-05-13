import { Modal } from "antd";
import React from "react";

export default function ConfirmModal(props) {
  return (
    <Modal
      open={props.open}
      onOk={props.onOk}
      onCancel={props.onCancel}
      okText="Đồng ý"
      cancelText="Quay lại"
      cancelButtonProps={{ danger: true, type: "primary" }}
      closeIcon={<></>}
    >
      <div className="modal-confirm-content">
        <p>
          {props.textContent ? props.textContent : "BẠN CÓ CHẮC CHẮN MUỐN LƯU"}
        </p>
      </div>
    </Modal>
  );
}
