import { Col, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import deleteIcon from "../../assets/Rectangle 2942.png";
import addIcon from "../../assets/image 4.png";
import editIcon from "../../assets/image 7.png";
import ThemNhomCay from "../themNhomCay";
import ThemLoaiCay from "../themLoaiCay";
import ThemGionCay from "../themGiongCay";
import ChinhSuaLoaiCay from "../chinhSuaLoaiCay";
import { GIONG_CAY, LOAI_CAY, NHOM_CAY } from "../../data";
import ChinhSuaGionCay from "../chinhSuaGiongCay";

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

  const [isEdit, setIsEdit] = useState(false);
  const [modalThemNhomCay, setModalThemNhomCay] = useState(false);
  const [modalThemLoaiCay, setModalThemLoaiCay] = useState(false);
  const [modalThemGiongCay, setModalThemGiongCay] = useState(false);
  const [modalChinhSuaLoaiCay, setModalChinhSuaLoaiCay] = useState(false);
  const [modalChinhSuaGiongCay, setModalChinhSuaGiongCay] = useState(false);
  const [isShowOption, setIsShowOption] = useState(false);
  const [isShowOptionGiongCay, setIsShowOptionGiongCay] = useState(false);

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
    const danhSachCayLocal = JSON.parse(localStorage.getItem("danhSachCay"));
    setDanhSachCay(danhSachCayLocal);
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
    setIsShowOptionGiongCay(true);
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
    setIsEdit(false);
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
              open={isShowOption}
              onClick={() => {
                setIsShowOption(true);
              }}
            >
              {danhSachCay.nhomCay.map((el) => (
                <Option value={el.value}>
                  <div className="select-label">
                    <span>{el.label}</span>
                    <span>
                      <img className="select-icon" src={deleteIcon} alt="" />
                      <img
                        className="select-icon"
                        src={editIcon}
                        alt=""
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsShowOption(false);
                          setModalThemNhomCay(true);
                          setIsEdit(true);
                          setIsShowOptionGiongCay(false);
                        }}
                      />
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
                setIsShowOption(false);
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
              open={isShowOption}
              onClick={() => {
                setIsShowOption(true);
              }}
            >
              {danhSachCayDuocChon.loaiCay.map((el) => (
                <Option value={el.value}>
                  <div className="select-label">
                    <span>{el.label}</span>
                    <span>
                      <img className="select-icon" src={deleteIcon} alt="" />
                      <img
                        className="select-icon"
                        src={editIcon}
                        alt=""
                        onClick={(e) => {
                          e.stopPropagation();
                          if (cayDuocChon.loaiCay !== "") {
                            setModalChinhSuaLoaiCay(true);
                            setIsShowOption(false);
                            setIsShowOptionGiongCay(false);
                          }
                        }}
                      />
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
                setModalThemLoaiCay(true);
                setIsShowOption(false);
              }}
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
              open={isShowOptionGiongCay}
              onClick={() => {
                setIsShowOptionGiongCay(true);
              }}
            >
              {danhSachCayDuocChon.giongCay.map((el) => (
                <Option value={el.value}>
                  <div className="select-label">
                    <span>{el.label}</span>
                    <span>
                      <img className="select-icon" src={deleteIcon} alt="" />
                      <img
                        className="select-icon"
                        src={editIcon}
                        alt=""
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsShowOptionGiongCay(false);
                          setModalChinhSuaGiongCay(true);
                          setIsShowOption(false);
                        }}
                      />
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
                setModalThemGiongCay(true);
                setIsShowOptionGiongCay(false);
                setIsShowOption(false);
              }}
            />
          </div>
        </Col>
      </Row>
      <ThemNhomCay
        open={modalThemNhomCay}
        onCancel={handleCancleModalNhomCay}
        nhomCayId={cayDuocChon.nhomCay}
        isEdit={isEdit}
      />
      <ThemLoaiCay
        open={modalThemLoaiCay}
        onCancel={() => setModalThemLoaiCay(false)}
        nhomCay={cayDuocChon.nhomCay}
      />
      <ChinhSuaLoaiCay
        open={modalChinhSuaLoaiCay}
        onCancel={() => setModalChinhSuaLoaiCay(false)}
        nhomCay={cayDuocChon.nhomCay}
        loaiCayId={cayDuocChon.loaiCay}
      />
      <ThemGionCay
        open={modalThemGiongCay}
        onCancel={() => setModalThemGiongCay(false)}
        loaiCay={cayDuocChon.loaiCay}
      />
      <ChinhSuaGionCay
        open={modalChinhSuaGiongCay}
        onCancel={() => setModalChinhSuaGiongCay(false)}
        giongCayId={cayDuocChon.giongCay}
      />
    </div>
  );
}