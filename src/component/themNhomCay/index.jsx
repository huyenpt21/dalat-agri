import { Form, Input, Modal } from "antd";
import React, { useState } from "react";
import ConfirmModal from "../confirmModal";
import { useForm } from "antd/es/form/Form";

export default function ThemNhomCay(props) {
  const [modalConfirm, setModalConfirm] = useState(false);
  const [form] = useForm();

  const handleSaveModalNhomCay = () => {
    setModalConfirm(true);
  };

  const handleConfirm = () => {
    const danhSachCay = JSON.parse(localStorage.getItem("danhSachCay"));
    const danhSachCayMoi = {
      ...danhSachCay,
      nhomCay: [
        ...danhSachCay.nhomCay,
        {
          label: form.getFieldValue("nhomCay"),
          value: form.getFieldValue("nhomCay"),
        },
      ],
    };
    localStorage.setItem("danhSachCay", JSON.stringify(danhSachCayMoi));
    setModalConfirm(false);
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
        onCancel={() => {
          props.onCancel();
          form.resetFields();
        }}
        title="Chỉnh sửa nhóm cây"
        width="800px"
        okText="Lưu thông tin"
        cancelText="Trở về"
      >
        <div className="content-modal-nhom-cay">
          <h3>Thông tin nhóm</h3>
          <Form layout="horizontal" form={form}>
            <div className="input-nhom-cay">
              <Form.Item label="1. Tên nhóm" name="nhomCay">
                <Input />
              </Form.Item>
            </div>
          </Form>
        </div>
      </Modal>
      <ConfirmModal
        open={modalConfirm}
        onOk={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
}
