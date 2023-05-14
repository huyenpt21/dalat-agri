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
import ConfirmModal from "../confirmModal";

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
  const [modalConfirm, setModalConfirm] = useState(false);

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

  const handleConfirm = () => {
    if (cayDuocChon.nhomCay !== "") {
      handleXoaNhomCay();
    } else if (cayDuocChon.loaiCay !== "") {
      handleXoaLoaiCay();
    } else if (cayDuocChon.giongCay !== "") {
      handleXoaGiongCay();
    }
    setModalConfirm(false);
    setCayDuocChon({ nhomCay: "", loaiCay: "", giongCay: "" });
  };

  const handleCancel = () => {
    setCayDuocChon({ nhomCay: "", loaiCay: "", giongCay: "" });
    setModalConfirm(false);
  };

  const handleCancleModalNhomCay = () => {
    setModalThemNhomCay(false);
    setIsEdit(false);
  };

  const handleXoaNhomCay = () => {
    if (cayDuocChon.nhomCay !== "") {
      const danhSachNhomCayMoi = danhSachCay.nhomCay.filter(
        (el) => el.value !== cayDuocChon.nhomCay
      );
      const newList = { ...danhSachCay, nhomCay: danhSachNhomCayMoi };
      setDanhSachCay(newList);
      localStorage.setItem("danhSachCay", JSON.stringify(newList));
    }
  };

  const handleXoaLoaiCay = () => {
    if (cayDuocChon.loaiCay !== "") {
      const danhSachCayMoi = danhSachCay.loaiCay.filter(
        (e) => e.value !== cayDuocChon.loaiCay
      );
      const danhSachCayDuocChonMoi = danhSachCayDuocChon.loaiCay.filter(
        (e) => e.value !== cayDuocChon.loaiCay
      );
      // update danh sách chứa tất cả loại cây
      setDanhSachCay((prev) => {
        return {
          ...prev,
          loaiCay: danhSachCayMoi,
        };
      });
      // update danh sách chứa loại cây đang hiển thị
      setDanhSachCayDuocChon((prev) => {
        return {
          ...prev,
          loaiCay: danhSachCayDuocChonMoi,
        };
      });
      localStorage.setItem(
        "danhSachCay",
        JSON.stringify({ ...danhSachCay, loaiCay: danhSachCayMoi })
      );
    }
  };

  const handleXoaGiongCay = () => {
    if (cayDuocChon.giongCay !== "") {
      const danhSachCayMoi = danhSachCay.giongCay.filter(
        (e) => e.value !== cayDuocChon.giongCay
      );
      const danhSachCayDuocChonMoi = danhSachCayDuocChon.giongCay.filter(
        (e) => e.value !== cayDuocChon.giongCay
      );
      // update danh sách chứa tất cả giống cây
      setDanhSachCay((prev) => {
        return {
          ...prev,
          giongCay: danhSachCayMoi,
        };
      });
      // update danh sách chứa giống cây đang hiển thị
      setDanhSachCayDuocChon((prev) => {
        return {
          ...prev,
          giongCay: danhSachCayDuocChonMoi,
        };
      });
      localStorage.setItem(
        "danhSachCay",
        JSON.stringify({ ...danhSachCay, giongCay: danhSachCayMoi })
      );
    }
  };

  return (
    <div>
      <h2>Danh mục cây trồng</h2>
      <Row gutter={120}>
        <Col span={8}>
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
                      <img
                        className="select-icon"
                        src={deleteIcon}
                        alt=""
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalConfirm(true);
                          setIsShowOption(false);
                          setCayDuocChon({
                            nhomCay: el.value,
                            loaiCay: "",
                            giongCay: "",
                          });
                        }}
                      />
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
                setIsShowOptionGiongCay(false);
              }}
            />
          </div>
        </Col>
        <Col span={8}>
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
                      <img
                        className="select-icon"
                        src={deleteIcon}
                        alt=""
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalConfirm(true);
                          setIsShowOption(false);
                          setCayDuocChon({
                            nhomCay: "",
                            loaiCay: el.value,
                            giongCay: "",
                          });
                        }}
                      />
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
                setIsShowOptionGiongCay(false);
              }}
            />
          </div>
        </Col>
        <Col span={8}>
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
                      <img
                        className="select-icon"
                        src={deleteIcon}
                        alt=""
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalConfirm(true);
                          setIsShowOption(false);
                          setCayDuocChon({
                            nhomCay: "",
                            loaiCay: "",
                            giongCay: el.value,
                          });
                        }}
                      />
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
      <ConfirmModal
        open={modalConfirm}
        onOk={handleConfirm}
        onCancel={handleCancel}
        textContent="BẠN CÓ CHẮC CHẮN MUỐN XÓA"
      />
    </div>
  );
}
