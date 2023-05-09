import { Input, Modal } from "antd";
import React from "react";

export default function ThemNhomCay(props) {
  return (
    <Modal
      open={props.open}
      onOk={props.onOk}
      onCancel={props.onCancel}
      title="Chỉnh sửa nhóm cây"
      width="800px"
      okText="Lưu thông tin"
      cancelText="Trở về"
    >
      <div className="content-modal-nhom-cay">
        <h3>Thông tin nhóm</h3>
        <div className="input-nhom-cay">
          <p>1. Tên nhóm</p>
          <Input className="input" />
        </div>
      </div>
    </Modal>
  );
}
