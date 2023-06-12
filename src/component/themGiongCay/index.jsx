import { Col, Form, Input, Modal, Row, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useState } from "react";
import ConfirmModal from "../confirmModal";

export default function ThemGionCay(props) {
  // state luue trạng thái ẩn hiện của modal confirm
  const [modalConfirm, setModalConfirm] = useState(false);

  // dùng hook useForm của Antd để lấy dữ liệu từ form
  const [form] = useForm();

  const handleSaveModalGiongCay = () => {
    setModalConfirm(true);
  };

  const handleConfirm = () => {
    // thêm vào array chứa list options giống cây
    const danhSachCay = JSON.parse(localStorage.getItem("danhSachCay"));
    const danhSachCayMoi = {
      ...danhSachCay,
      giongCay: [
        ...danhSachCay.loaiCay,
        {
          label: form.getFieldValue("tenGiongCay"),
          value: form.getFieldValue("maGiong"),
          type:
            props.loaiCay === ""
              ? form.getFieldValue("loaiCay")
              : props.loaiCay,
        },
      ],
    };
    localStorage.setItem("danhSachCay", JSON.stringify(danhSachCayMoi));

    // thêm thông tin vào array chứa đầy đủ thông tin của giống cây
    const thongTinCayLocal =
      JSON.parse(localStorage.getItem("thongTinGiongCay")) ?? [];

    const thongTinGiongCayMoi = form.getFieldsValue();
    localStorage.setItem(
      "thongTinGiongCay",
      JSON.stringify([...thongTinCayLocal, thongTinGiongCayMoi])
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
        onOk={handleSaveModalGiongCay}
        onCancel={() => {
          props.onCancel();
          form.resetFields();
        }}
        title="Thêm giống cây"
        width="800px"
        okText="Lưu thông tin"
        cancelText="Trở về"
      >
        <div className="content-modal-loai-cay">
          {/* sử dụng Form / Form.Item của Antd để xây dựng form lấy dữ liệu */}
          <Form layout="vertical" form={form}>
            <Row gutter={40}>
              <Col span={12}>
                <div className="input-nhom-cay">
                  <Form.Item label="Tên giống cây" name="tenGiongCay">
                    <Input placeholder="Tên giống cây" />
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
                  <Form.Item label="Vòng đời" name="vongDoi">
                    <Input type="number" min={1} defaultValue={1} />
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
                    <Input type="number" min={0} defaultValue={0} />
                  </Form.Item>
                </div>
              </Col>
              <Col span={12}>
                <div className="input-nhom-cay">
                  <Form.Item
                    label="Khả năng chống chịu"
                    name="loaiCayTheoThoiGian"
                  >
                    <Select
                      options={[
                        {
                          label: "Yếu",
                          value: "Yếu",
                        },
                        {
                          label: "Trung bình",
                          value: "Trung bình",
                        },
                        {
                          label: "Khỏe",
                          value: "Khỏe",
                        },
                      ]}
                      defaultValue={"Yếu"}
                    />
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <Row gutter={40}>
              <Col span={12}>
                <div className="input-nhom-cay">
                  <Form.Item label="Năng xuất trung bình" name="nangSuat">
                    <Input type="number" min={0} defaultValue={0} />
                  </Form.Item>
                </div>
              </Col>
              <Col span={12}>
                <div className="input-nhom-cay">
                  <Form.Item label="Loại cây trồng" name="loaiCay">
                    <Input placeholder="Tên loại cây" />
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <Row gutter={40}>
              <Col span={12}>
                <div className="input-nhom-cay">
                  <Form.Item label="Đơn vị thu hoạch" name="donViThuHoach">
                    <Input />
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
