import { Col, Form, Input, Modal, Row, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useState } from "react";
import ConfirmModal from "../confirmModal";

export default function ThemLoaiCay(props) {
  // state luue trạng thái ẩn hiện của modal confirm
  const [modalConfirm, setModalConfirm] = useState(false);

  // dùng hook useForm của Antd để lấy dữ liệu từ form
  const [form] = useForm();

  const handleSaveModalNhomCay = () => {
    setModalConfirm(true);
  };

  const handleConfirm = () => {
    // thêm vào array chứa list options loại cây
    const danhSachCay = JSON.parse(localStorage.getItem("danhSachCay"));
    const danhSachCayMoi = {
      ...danhSachCay,
      loaiCay: [
        ...danhSachCay.loaiCay,
        {
          label: form.getFieldValue("tenLoaiCay"),
          value: form.getFieldValue("maGiong"),
          type:
            props.nhomCay === ""
              ? form.getFieldValue("loaiCay")
              : props.nhomCay,
        },
      ],
    };
    localStorage.setItem("danhSachCay", JSON.stringify(danhSachCayMoi));

    // thêm thông tin vào array chứa đầy đủ thông tin của loại cây
    const thongTinCayLocal =
      JSON.parse(localStorage.getItem("thongTinLoaiCay")) ?? [];

    // lấy tất cả data trong form lưu vào local storage
    const thongTinLoaiCayMoi = form.getFieldsValue();
    localStorage.setItem(
      "thongTinLoaiCay",
      JSON.stringify([...thongTinCayLocal, thongTinLoaiCayMoi])
    );

    setModalConfirm(false);
    props.onCancel();
  };

  const handleCancel = () => {
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
        title="Thêm loại cây"
        width="800px"
        okText="Lưu thông tin"
        cancelText="Trở về"
        className="modal-custome"
      >
        <div className="content-modal-loai-cay">
          {/* sử dụng Form / Form.Item của Antd để xây dựng form lấy dữ liệu */}
          <Form layout="vertical" form={form}>
            <Row gutter={40}>
              <Col span={12}>
                <div className="input-nhom-cay">
                  <Form.Item label="Tên loại cây" name="tenLoaiCay">
                    <Input placeholder="Tên loại cây" />
                  </Form.Item>
                </div>
              </Col>
              <Col span={12}>
                <div className="input-nhom-cay">
                  <Form.Item label="Mã giống" name="maGiong">
                    <Input placeholder="Mã giống" />
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <Row gutter={40}>
              <Col span={12}>
                <div className="input-nhom-cay">
                  <Form.Item label="Chu kì sinh trưởng" name="chuKiSinhTruong">
                    <Input placeholder="theo tháng" />
                  </Form.Item>
                </div>
              </Col>
              <Col span={12}>
                <div className="input-nhom-cay">
                  <Form.Item label="Tần suất thu hoạch" name="tanSuatThuHoach">
                    <Input type="number" min={1} defaultValue={1} />
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <Row gutter={40}>
              <Col span={12}>
                <div className="input-nhom-cay">
                  <Form.Item label="Giá bán trên thị trường" name="giaBan">
                    <Input type="number" min={1} defaultValue={1} />
                  </Form.Item>
                </div>
              </Col>
              <Col span={12}>
                <div className="input-nhom-cay">
                  <Form.Item
                    label="Loại cây theo thời gian"
                    name="loaiCayTheoThoiGian"
                  >
                    <Select
                      options={[
                        {
                          label: "Ngắn ngày",
                          value: "Ngắn ngày",
                        },
                        {
                          label: "Dài ngày",
                          value: "Dài ngày",
                        },
                      ]}
                      defaultValue={"Ngắn ngày"}
                    />
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <Row gutter={40}>
              <Col span={12}>
                <div className="input-nhom-cay">
                  <Form.Item label="Loại cây trồng" name="loaiCay">
                    <Input placeholder="Tên loại cây" />
                  </Form.Item>
                </div>
              </Col>
            </Row>
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
