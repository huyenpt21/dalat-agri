import { Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import ConfirmModal from "../confirmModal";

export default function ThemNhomCay(props) {
  const [modalConfirm, setModalConfirm] = useState(false);
  // dùng hook useForm của Antd để lấy dữ liệu từ form
  const [form] = useForm();

  // mỗi lần mở component sẽ lấy thông tin nhóm cây (kể cả khi chọn lại nhóm cây)
  useEffect(() => {
    if (props.nhomCayId) {
      const danhSachCay = JSON.parse(localStorage.getItem("danhSachCay"));
      const thongTinNhomCay = danhSachCay.nhomCay.find((el) => {
        return el.value === props.nhomCayId;
      });
      form.setFieldValue("nhomCay", thongTinNhomCay?.label);
    }
  }, [form, modalConfirm, props.nhomCayId]);

  const handleSaveModalNhomCay = () => {
    setModalConfirm(true);
  };

  const handleConfirm = () => {
    const danhSachCay = JSON.parse(localStorage.getItem("danhSachCay"));
    // isEdit = true -> modal ở trạng thái edit
    if (props.isEdit) {
      // tìm phần tử được chọn trong nhóm cây -> update phần tử đó bằng data lấy từ form, còn lại các phần tử khác giữ nguyên
      const thongTinNhomCay = danhSachCay.nhomCay.map((el) => {
        if (el.value === props.nhomCayId) {
          return {
            label: form.getFieldValue("nhomCay"),
            value: form.getFieldValue("nhomCay"),
          };
        }
        return el;
      });
      // update danh sách cây mới
      const danhSachCayMoi = {
        ...danhSachCay,
        nhomCay: [...thongTinNhomCay],
      };
      localStorage.setItem("danhSachCay", JSON.stringify(danhSachCayMoi));
    } else {
      // isEdit = false -> modal ở trạng thái create
      // thêm cây mới vào danh sách - lấy data từ form
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
    form.resetFields();
    props.onCancel();
  };

  const handleCancel = () => {
    form.resetFields();
    setModalConfirm(false);
  };
  return (
    <>
      {/* sử dụng component có sẵn của Antd: Modal */}
      <Modal
        open={props.open}
        onOk={handleSaveModalNhomCay}
        onCancel={() => {
          props.onCancel();
          form.resetFields();
        }}
        title="Thêm nhóm cây"
        width="600px"
        okText="Lưu thông tin"
        cancelText="Trở về"
        className="modal-custome"
      >
        <div className="content-modal-nhom-cay">
          {/* sử dụng Form / Form.Item của Antd để xây dựng form lấy dữ liệu */}
          <Form layout="vertical" form={form}>
            <div className="input-nhom-cay">
              <Form.Item name="nhomCay">
                <Input placeholder="Tên nhóm cây" size="large" />
              </Form.Item>
            </div>
          </Form>
        </div>
      </Modal>
      {/* modal confirm */}
      <ConfirmModal
        open={modalConfirm}
        onOk={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
}
