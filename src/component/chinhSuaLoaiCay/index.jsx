import { Col, Form, Input, Modal, Row, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import ConfirmModal from "../confirmModal";
import {
  LOAI_DAT,
  LOAI_DIA_HINH,
  NGUON_NUOC,
  PHUONG_PHAP_CANH_TAC,
  TEMP,
} from "../../data";

export default function ChinhSuaLoaiCay(props) {
  const [form] = useForm();
  const [modalConfirm, setModalConfirm] = useState(false);

  // mỗi lần mở component sẽ lấy thông tin loại cây (kể cả khi chọn lại loại cây)
  useEffect(() => {
    if (modalConfirm === false) {
      const thongTinLoaiCayLocal = JSON.parse(
        localStorage.getItem("thongTinLoaiCay")
      );

      if (thongTinLoaiCayLocal) {
        const thongTinLoaiCay = thongTinLoaiCayLocal.find((el) => {
          return el.maGiong === props.loaiCayId;
        });
        form.setFieldsValue(thongTinLoaiCay);
      }
    }
  });

  const handleSaveModalNhomCay = () => {
    setModalConfirm(true);
  };
  const handleConfirm = () => {
    const thongTinCayLocal = JSON.parse(
      localStorage.getItem("thongTinLoaiCay")
    );
    const thongTinLoaiCaySua = form.getFieldsValue();
    const thongTinCayMoi = thongTinCayLocal.map((el) => {
      if (el.maGiong === props.loaiCayId) {
        return {
          ...thongTinLoaiCaySua,
        };
      }
      return el;
    });

    localStorage.setItem("thongTinLoaiCay", JSON.stringify(thongTinCayMoi));
    setModalConfirm(false);
    props.onCancel();
  };
  const handleCancel = () => {};
  return (
    <>
      <Modal
        open={props.open}
        onOk={handleSaveModalNhomCay}
        onCancel={() => {
          props.onCancel();
          form.resetFields();
        }}
        title="Chỉnh sửa loại cây"
        width="800px"
        okText="Lưu thông tin"
        cancelText="Trở về"
      >
        <div className="content-modal-loai-cay">
          <Form layout="vertical" form={form}>
            <Row gutter={40}>
              <Col span={12}>
                <div className="input-nhom-cay">
                  <Form.Item label="Tên cây trồng" name="tenLoaiCay">
                    <Input placeholder="Tên cây trồng" />
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
                  <Form.Item label="Vòng đời" name="chuKiSinhTruong">
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
                  <Form.Item label="Giá bán" name="giaBan">
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
                  <Form.Item label="Loại đất" name="loaiCay">
                    <Select options={LOAI_DAT} />
                  </Form.Item>
                </div>
              </Col>
              <Col span={12}>
                <div className="input-nhom-cay">
                  <Form.Item label="Nguồn nước" name="nguonNuoc">
                    <Select options={NGUON_NUOC} />
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <Row gutter={40}>
              <Col span={12}>
                <div className="input-nhom-cay">
                  <Form.Item label="Loại địa hình" name="loaiDiaDinh">
                    <Select options={LOAI_DIA_HINH} />
                  </Form.Item>
                </div>
              </Col>
              <Col span={12}>
                <div className="input-nhom-cay">
                  <Form.Item
                    label="Phương pháp canh tác"
                    name="phuongThucCanhTac"
                  >
                    <Select options={PHUONG_PHAP_CANH_TAC} />
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <Row gutter={40}>
              <Col span={12}>
                <div className="input-nhom-cay">
                  <Form.Item label="Mật độ" name="matDo">
                    <Input type="number" min={0} />
                  </Form.Item>
                </div>
              </Col>
              <Col span={12}>
                <div className="input-nhom-cay">
                  <Form.Item name="acb">
                    <Select options={TEMP} />
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <Row gutter={40}>
              <Col span={12}>
                <div className="input-nhom-cay">
                  <Form.Item
                    label="Sản lượng trung bình"
                    name="sanLuongTrungBinh"
                  >
                    <Input type="number" min={0} />
                  </Form.Item>
                </div>
              </Col>
              <Col span={12}>
                <div className="input-nhom-cay">
                  <Form.Item label="Năng xuất tối đa" name="nangSuatToiDa">
                    <Input type="number" min={0} />
                  </Form.Item>
                </div>
              </Col>
            </Row>
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
