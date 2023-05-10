import { Col, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import editIcon from "../../assets/Rectangle 2942.png";
import addIcon from "../../assets/image 4.png";
import deleteIcon from "../../assets/image 7.png";
import ThemNhomCay from "../themNhomCay";
import { GIONG_CAY, LOAI_CAY, NHOM_CAY } from "./data";
import ThemLoaiCay from "../themLoaiCay";
import ThemGionCay from "../themGiongCay";

export default function DanhMucCayTrong() {
  const { Option } = Select;

  const [cayDuocChon, setCayDuocChon] = useState({
    nhomCay: "",
    loaiCay: "",
    giongCay: "",
  });

  const [danhSachCay, setDanhSachCay] = useState({
    nhomCay: [],
    loaiCay: [],
    giongCay: [],
  });

  const [danhSachCayDuocChon, setDanhSachCayDuocChon] = useState({
    loaiCay: [],
    giongCay: [],
  });

  const [modalThemNhomCay, setModalThemNhomCay] = useState(false);
  const [modalThemLoaiCay, setModalThemLoaiCay] = useState(false);
  const [modalThemGiongCay, setModalThemGiongCay] = useState(true);

  useEffect(() => {
    localStorage.setItem(
      "danhSachCay",
      JSON.stringify({
        nhomCay: NHOM_CAY,
        loaiCay: LOAI_CAY,
        giongCay: GIONG_CAY,
      })
    );
  }, []);

  useEffect(() => {
    const danhSachCay = JSON.parse(localStorage.getItem("danhSachCay"));
    setDanhSachCay(danhSachCay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem("danhSachCay")]);

  const handleChangeNhomCay = (value) => {
    const loaiCayTheoNhomCay = danhSachCay.loaiCay.filter((el) => {
      return el.type === value;
    });
    setDanhSachCayDuocChon((prev) => {
      return {
        ...prev,
        loaiCay: [
          {
            label: "Tất cả",
            value: "Tất cả",
          },
          ...loaiCayTheoNhomCay,
        ],
      };
    });
    setCayDuocChon({ nhomCay: value, loaiCay: "", giongCay: "" });
  };

  const handleChangeLoaiCay = (value) => {
    const giongCayTheoLoaiCay = danhSachCay.giongCay.filter((el) => {
      return el.type === value;
    });
    setDanhSachCayDuocChon((prev) => {
      return {
        ...prev,
        giongCay: [
          {
            label: "Tất cả",
            value: "Tất cả",
          },
          ...giongCayTheoLoaiCay,
        ],
      };
    });
    setCayDuocChon((prev) => {
      return { ...prev, loaiCay: value, giongCay: "" };
    });
  };

  const handleChangeGiongCay = (value) => {
    setCayDuocChon((prev) => {
      return { ...prev, giongCay: value };
    });
  };

  const handleCancleModalNhomCay = () => {
    setModalThemNhomCay(false);
  };

  return (
    <div>
      <h2>Danh mục cây trồng</h2>
      <Row gutter={120}>
        <Col span={6}>
          <div>Nhóm cây</div>
          <div className="group-select-add">
            <Select
              style={{ width: "100%" }}
              onChange={handleChangeNhomCay}
              value={cayDuocChon.nhomCay}
              allowClear
            >
              {danhSachCay.nhomCay.map((el) => (
                <Option value={el.value}>
                  <div className="select-label">
                    <span>{el.label}</span>
                    <span>
                      <img className="select-icon" src={editIcon} alt="" />
                      <img className="select-icon" src={deleteIcon} alt="" />
                    </span>
                  </div>
                </Option>
              ))}
            </Select>
            <img
              className="add-icon"
              src={addIcon}
              alt=""
              onClick={() => {
                setModalThemNhomCay(true);
              }}
            />
          </div>
        </Col>
        <Col span={6}>
          <div>Loại cây</div>
          <div className="group-select-add">
            <Select
              style={{ width: "100%" }}
              onChange={handleChangeLoaiCay}
              value={cayDuocChon.loaiCay}
              allowClear
            >
              {danhSachCayDuocChon.loaiCay.map((el) => (
                <Option value={el.value}>
                  <div className="select-label">
                    <span>{el.label}</span>
                    <span>
                      <img className="select-icon" src={editIcon} alt="" />
                      <img className="select-icon" src={deleteIcon} alt="" />
                    </span>
                  </div>
                </Option>
              ))}
            </Select>
            <img
              className="add-icon"
              src={addIcon}
              alt=""
              onClick={() => setModalThemLoaiCay(true)}
            />
          </div>
        </Col>
        <Col span={6}>
          <div>Giống cây</div>
          <div className="group-select-add">
            <Select
              style={{ width: "100%" }}
              onChange={handleChangeGiongCay}
              value={cayDuocChon.giongCay}
              allowClear
            >
              {danhSachCayDuocChon.giongCay.map((el) => (
                <Option value={el.value}>
                  <div className="select-label">
                    <span>{el.label}</span>
                    <span>
                      <img className="select-icon" src={editIcon} alt="" />
                      <img className="select-icon" src={deleteIcon} alt="" />
                    </span>
                  </div>
                </Option>
              ))}
            </Select>
            <img
              className="add-icon"
              src={addIcon}
              alt=""
              onClick={() => setModalThemGiongCay(true)}
            />
          </div>
        </Col>
      </Row>
      <ThemNhomCay
        open={modalThemNhomCay}
        onCancel={handleCancleModalNhomCay}
      />
      <ThemLoaiCay
        open={modalThemLoaiCay}
        onCancel={() => setModalThemLoaiCay(false)}
        nhomCay={cayDuocChon.nhomCay}
      />
      <ThemGionCay
        open={modalThemGiongCay}
        onCancel={() => setModalThemGiongCay(false)}
        loaiCay={cayDuocChon.loaiCay}
      />
    </div>
  );
}
