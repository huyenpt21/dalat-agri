import { Col, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import editIcon from "../../assets/Rectangle 2942.png";
import addIcon from "../../assets/image 4.png";
import deleteIcon from "../../assets/image 7.png";
import ThemNhomCay from "../themNhomCay";
import { GIONG_CAY, LOAI_CAY, NHOM_CAY } from "./data";

export default function DanhMucCayTrong() {
  const { Option } = Select;

  const [cayDuocChon, setCayDuocChon] = useState({
    nhomCay: "",
    loaiCay: "",
    giongCay: "",
  });
  const [loaiCay, setLoaiCay] = useState([]);
  const [giongCay, setGiongCay] = useState([]);
  const [modalThemNhomCay, setModalThemNhomCay] = useState(false);

  useEffect(() => {
    if (cayDuocChon.nhomCay !== "") {
      const loaiCayTheoNhomCay = LOAI_CAY.filter((el) => {
        return el.type === cayDuocChon.nhomCay;
      });
      setLoaiCay([
        ...loaiCayTheoNhomCay,
        {
          label: "Tất cả",
          value: "Tất cả",
        },
      ]);
    }
    if (cayDuocChon.loaiCay !== "") {
      const giongCayTheoLoaiCay = GIONG_CAY.filter((el) => {
        return el.type === cayDuocChon.loaiCay;
      });

      setGiongCay([
        ...giongCayTheoLoaiCay,
        {
          label: "Tất cả",
          value: "Tất cả",
        },
      ]);
    }
  }, [cayDuocChon]);

  const handleChangeNhomCay = (value) => {
    setCayDuocChon({ nhomCay: value, loaiCay: "", giongCay: "" });
  };

  const handleChangeLoaiCay = (value) => {
    setCayDuocChon({ nhomCay: "", loaiCay: value, giongCay: "" });
  };

  const handleChangeGiongCay = (value) => {
    setCayDuocChon({ nhomCay: "", loaiCay: "", giongCay: value });
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
            <Select style={{ width: "100%" }} onChange={handleChangeNhomCay}>
              {NHOM_CAY.map((el) => (
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
            <Select style={{ width: "100%" }} onChange={handleChangeLoaiCay}>
              {loaiCay.map((el) => (
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
            <img className="add-icon" src={addIcon} alt="" />
          </div>
        </Col>
        <Col span={6}>
          <div>Giống cây</div>
          <div className="group-select-add">
            <Select style={{ width: "100%" }} onChange={handleChangeGiongCay}>
              {giongCay.map((el) => (
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
            <img className="add-icon" src={addIcon} alt="" />
          </div>
        </Col>
      </Row>
      <ThemNhomCay
        open={modalThemNhomCay}
        onCancel={handleCancleModalNhomCay}
      />
    </div>
  );
}
