import { Col, Form, Input, Modal, Row, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import ConfirmModal from "../confirmModal";

export default function ThemLoaiCay(props) {
  const [modalConfirm, setModalConfirm] = useState(false);
  const [form] = useForm();

  useEffect(() => {
    const thongTinLoaiCayLocal = JSON.parse(
      localStorage.getItem("thongTinLoaiCay")
    );
    if (thongTinLoaiCayLocal) {
      const thongTinLoaiCay = thongTinLoaiCayLocal.find((el) => {
        return el.maGiong === props.loaiCayId;
      });
      form.setFieldsValue(thongTinLoaiCay);
    }
  }, [form, props.loaiCayId]);

  const handleSaveModalNhomCay = () => {
    setModalConfirm(true);
  };

  const handleConfirm = () => {
    if (props.isEdit) {
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
    } else {
      // thêm vào array chứ list options loại cây
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

      const thongTinLoaiCayMoi = form.getFieldsValue();
      localStorage.setItem(
        "thongTinLoaiCay",
        JSON.stringify([...thongTinCayLocal, thongTinLoaiCayMoi])
      );
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
        title="Thêm loại cây"
        width="800px"
        okText="Lưu thông tin"
        cancelText="Trở về"
      >
        <div className="content-modal-loai-cay">
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
      <ConfirmModal
        open={modalConfirm}
        onOk={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
}
