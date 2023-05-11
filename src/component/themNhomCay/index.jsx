import { Form, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import ConfirmModal from "../confirmModal";
import { useForm } from "antd/es/form/Form";

export default function ThemNhomCay(props) {
  const [modalConfirm, setModalConfirm] = useState(false);
  const [form] = useForm();

  useEffect(() => {
    if (modalConfirm === false) {
      const danhSachCay = JSON.parse(localStorage.getItem("danhSachCay"));
      const thongTinNhomCay = danhSachCay.nhomCay.find((el) => {
        return el.value === props.nhomCayId;
      });
      form.setFieldValue("nhomCay", thongTinNhomCay?.label);
    }
  });

  const handleSaveModalNhomCay = () => {
    setModalConfirm(true);
  };

  const handleConfirm = () => {
    const danhSachCay = JSON.parse(localStorage.getItem("danhSachCay"));
    if (props.isEdit) {
      const thongTinNhomCay = danhSachCay.nhomCay.map((el) => {
        if (el.value === props.nhomCayId) {
          return {
            label: form.getFieldValue("nhomCay"),
            value: form.getFieldValue("nhomCay"),
          };
        }
        return el;
      });
      const danhSachCayMoi = {
        ...danhSachCay,
        nhomCay: [...thongTinNhomCay],
      };
      localStorage.setItem("danhSachCay", JSON.stringify(danhSachCayMoi));
    } else {
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
    }
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
        title="Thêm nhóm cây"
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
