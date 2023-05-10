import { Form, Input, Modal } from "antd";
import React, { useState } from "react";
import ConfirmModal from "../confirmModal";

export default function ThemNhomCay(props) {
  const [modalConfirm, setModalConfirm] = useState(false);

  const handleSaveModalNhomCay = () => {
    setModalConfirm(true);
  };

  const handleConfirm = (value) => {
    setModalConfirm(false);
    console.log(value);
    props.onCancel();
  };

  const handleCancel = () => {
    setModalConfirm(false);
  };
  return (
    <>
      <Modal
        open={props.open}
        onOk={handleSaveModalNhomCay}
        onCancel={props.onCancel}
        title="Chỉnh sửa nhóm cây"
        width="800px"
        okText="Lưu thông tin"
        cancelText="Trở về"
      >
        <div className="content-modal-nhom-cay">
          <h3>Thông tin nhóm</h3>
          <Form layout="horizontal" onFinish={handleConfirm} name="basic">
            <div className="input-nhom-cay">
              <Form.Item label="1. Tên nhóm" name="nhomcay">
                <Input />
              </Form.Item>
            </div>
            <ConfirmModal
              open={modalConfirm}
              onOk={handleConfirm}
              onCancel={handleCancel}
            />
          </Form>
        </div>
      </Modal>
    </>
  );
}
