import { Button, Card, Col, List, Row } from "antd";
import VirtualList from "rc-virtual-list";
import React, { useEffect, useState } from "react";
import deleteIcon from "../../assets/Rectangle 2942.png";
import editIcon from "../../assets/image 7.png";
import { GIONG_CAY, LOAI_CAY, NHOM_CAY } from "../../data";
import ChinhSuaGionCay from "../chinhSuaGiongCay";
import ChinhSuaLoaiCay from "../chinhSuaLoaiCay";
import ConfirmModal from "../confirmModal";
import ThemGionCay from "../themGiongCay";
import ThemLoaiCay from "../themLoaiCay";
import ThemNhomCay from "../themNhomCay";

export default function DanhMucCayTrong() {
  // lưu nhóm cây, loại cây, và giống cây đang được chọn
  const [cayDuocChon, setCayDuocChon] = useState({
    nhomCay: "",
    loaiCay: "",
    giongCay: "",
  });

  // chứa danh sách nhóm cây / loại cây / giống cây khi có sự thay đổi (thêm, sửa, xóa)
  // VD: thêm nhóm cây A1 -> lưu vào state này
  const [danhSachCay, setDanhSachCay] = useState({
    nhomCay: [],
    loaiCay: [],
    giongCay: [],
  });

  // danh sách nhóm cây / loại cây / giống cây được chọn tương ứng
  // VD: Chọn nhóm cây A, có các loại cây tương ứng -> lưu trong state này
  const [danhSachCayDuocChon, setDanhSachCayDuocChon] = useState({
    loaiCay: [],
    giongCay: [],
  });

  // lưu trạng thái có phải edit không để dùng lại component với create
  const [isEdit, setIsEdit] = useState(false);

  // các state lưu trạng thái của ẩn / hiện các modal create / update của nhóm cây, loại cây, giống cây
  // true = hiện / false = ẩn
  const [modalThemNhomCay, setModalThemNhomCay] = useState(false);
  const [modalThemLoaiCay, setModalThemLoaiCay] = useState(false);
  const [modalThemGiongCay, setModalThemGiongCay] = useState(false);
  const [modalChinhSuaLoaiCay, setModalChinhSuaLoaiCay] = useState(false);
  const [modalChinhSuaGiongCay, setModalChinhSuaGiongCay] = useState(false);

  // state lưu trạng thái ẩn / hiện của modal confirrm khi delete
  const [modalConfirm, setModalConfirm] = useState(false);

  // lấy danh sách chứa tất cả nhóm cây, loại cây, giống cây lưu ở local storage trong lần đầu tiên render page
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

  // khi danh sách cây trong local storage thay đổi -> cập nhập lại vào state trong component
  useEffect(() => {
    const danhSachCayLocal = JSON.parse(localStorage.getItem("danhSachCay"));
    setDanhSachCay(danhSachCayLocal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem("danhSachCay")]);

  // function xử lý sự kiện thay đổi nhóm cây
  // set nhóm cây được chọn và danh sách loại cây tương ứng theo nhóm cây
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

  // function xử lý sự kiện thay đổi loại cây
  // set loại cây được chọn và danh sách giống cây tương ứng theo loại cây
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

  // function xử lý sự kiện thay đổi giống cây
  // set giống cây được chọn
  const handleChangeGiongCay = (value) => {
    setCayDuocChon((prev) => {
      return { ...prev, giongCay: value };
    });
  };

  // function xử lý khi đồng ý xóa trong modal confirm xóa
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

  // function xử lý khi chọn quay lại trong modal confirm xóa
  const handleCancel = () => {
    setCayDuocChon({ nhomCay: "", loaiCay: "", giongCay: "" });
    setModalConfirm(false);
  };

  // function xử lý khi chọn quay lại trong modal confirm xóa
  const handleCancleModalNhomCay = () => {
    setModalThemNhomCay(false);
    setCayDuocChon({
      nhomCay: "",
      loaiCay: "",
      giongCay: "",
    });
    setIsEdit(false);
  };

  // function xử lý xóa nhóm cây
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

  // function xử lý xóa loại cây
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
      // update danh sách chứa loại cây đang hiển thị theo nhóm cây
      setDanhSachCayDuocChon((prev) => {
        return {
          ...prev,
          loaiCay: danhSachCayDuocChonMoi,
        };
      });
      // update vào local storage
      localStorage.setItem(
        "danhSachCay",
        JSON.stringify({ ...danhSachCay, loaiCay: danhSachCayMoi })
      );
    }
  };

  // function xử lý xóa giống cây
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
      // update vào local storage
      localStorage.setItem(
        "danhSachCay",
        JSON.stringify({ ...danhSachCay, giongCay: danhSachCayMoi })
      );
    }
  };

  return (
    // sử dụng các component có sẵn của Antd để chia layout trong page: Row (hàng), Col (cột)
    <div>
      <h2 style={{ marginBottom: "32px" }}>Danh mục cây trồng</h2>
      <Row gutter={20}>
        <Col span={8}>
          <Card
            title={
              <Row style={{ justifyContent: "space-between" }}>
                <Col className="card-title">Nhóm cây</Col>
                <Col>
                  <Button
                    type="primary"
                    onClick={() => {
                      setCayDuocChon({
                        nhomCay: "",
                        loaiCay: "",
                        giongCay: "",
                      });
                      setModalThemNhomCay(true);
                    }}
                  >
                    Thêm nhóm cây
                  </Button>
                </Col>
              </Row>
            }
          >
            <List>
              <VirtualList
                height="60vh"
                size="large"
                bordered
                data={danhSachCay.nhomCay}
              >
                {(item) => (
                  <List.Item
                    key={item.value}
                    className={`list-item ${
                      item.value === cayDuocChon.nhomCay ? "active-item" : ""
                    }`}
                    onClick={() => {
                      handleChangeNhomCay(item.value);
                    }}
                  >
                    <div>{item.label}</div>
                    <div>
                      <img
                        className="select-icon"
                        src={deleteIcon}
                        alt=""
                        onClick={() => {
                          setModalConfirm(true);
                          setCayDuocChon({
                            nhomCay: item.value,
                            loaiCay: "",
                            giongCay: "",
                          });
                        }}
                      />
                      <img
                        className="select-icon"
                        src={editIcon}
                        alt=""
                        onClick={() => {
                          setModalThemNhomCay(true);
                          setIsEdit(true);
                        }}
                      />
                    </div>
                  </List.Item>
                )}
              </VirtualList>
            </List>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title={
              <Row style={{ justifyContent: "space-between" }}>
                <Col className="card-title">Loại cây</Col>
                <Col>
                  <Button
                    type="primary"
                    onClick={() => {
                      setModalThemLoaiCay(true);
                    }}
                  >
                    Thêm loại cây
                  </Button>
                </Col>
              </Row>
            }
          >
            <List>
              <VirtualList
                height="60vh"
                size="large"
                bordered
                data={danhSachCayDuocChon.loaiCay}
              >
                {(item) => (
                  <List.Item
                    key={item.value}
                    className={`list-item ${
                      item.value === cayDuocChon.loaiCay ? "active-item" : ""
                    }`}
                    onClick={() => {
                      handleChangeLoaiCay(item.value);
                    }}
                  >
                    <div>{item.label}</div>
                    <div>
                      <img
                        className="select-icon"
                        src={deleteIcon}
                        alt=""
                        onClick={() => {
                          setModalConfirm(true);
                          setCayDuocChon({
                            nhomCay: "",
                            loaiCay: item.value,
                            giongCay: "",
                          });
                        }}
                      />
                      <img
                        className="select-icon"
                        src={editIcon}
                        alt=""
                        onClick={() => {
                          if (cayDuocChon.loaiCay !== "") {
                            setModalChinhSuaLoaiCay(true);
                          }
                        }}
                      />
                    </div>
                  </List.Item>
                )}
              </VirtualList>
            </List>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title={
              <Row style={{ justifyContent: "space-between" }}>
                <Col className="card-title">Giống cây</Col>
                <Col>
                  <Button
                    type="primary"
                    onClick={() => {
                      setModalThemGiongCay(true);
                    }}
                  >
                    Thêm giống cây
                  </Button>
                </Col>
              </Row>
            }
          >
            <List>
              <VirtualList
                height="60vh"
                size="large"
                bordered
                data={danhSachCayDuocChon.giongCay}
              >
                {(item) => (
                  <List.Item
                    key={item.value}
                    className={`list-item ${
                      item.value === cayDuocChon.giongCay ? "active-item" : ""
                    }`}
                    onClick={() => {
                      handleChangeGiongCay(item.value);
                    }}
                  >
                    <div>{item.label}</div>
                    <div>
                      <img
                        className="select-icon"
                        src={deleteIcon}
                        alt=""
                        onClick={() => {
                          setModalConfirm(true);
                          setCayDuocChon({
                            nhomCay: "",
                            loaiCay: "",
                            giongCay: item.value,
                          });
                        }}
                      />
                      <img
                        className="select-icon"
                        src={editIcon}
                        alt=""
                        onClick={() => {
                          setModalChinhSuaGiongCay(true);
                        }}
                      />
                    </div>
                  </List.Item>
                )}
              </VirtualList>
            </List>
          </Card>
        </Col>
      </Row>
      {/* các component thêm, sửa */}

      {/* 
        Nếu isEdit = true -> component update nhóm cây
        Nếu isEdit = false -> component create nhóm cây
      */}
      <ThemNhomCay
        open={modalThemNhomCay}
        onCancel={handleCancleModalNhomCay}
        nhomCayId={cayDuocChon.nhomCay}
        isEdit={isEdit}
      />

      {/* modal thêm loại cây */}
      <ThemLoaiCay
        open={modalThemLoaiCay}
        onCancel={() => setModalThemLoaiCay(false)}
        nhomCay={cayDuocChon.nhomCay}
      />

      {/* modal chỉnh sửa loại cây */}
      <ChinhSuaLoaiCay
        open={modalChinhSuaLoaiCay}
        onCancel={() => {
          setModalChinhSuaLoaiCay(false);
          setCayDuocChon((prev) => ({
            nhomCay: prev.nhomCay,
            loaiCay: "",
            giongCay: "",
          }));
        }}
        nhomCay={cayDuocChon.nhomCay}
        loaiCayId={cayDuocChon.loaiCay}
      />

      {/* modal thêm giống cây */}
      <ThemGionCay
        open={modalThemGiongCay}
        onCancel={() => {
          setModalThemGiongCay(false);
          setCayDuocChon((prev) => ({
            nhomCay: prev.nhomCay,
            loaiCay: prev.loaiCay,
            giongCay: "",
          }));
        }}
        loaiCay={cayDuocChon.loaiCay}
      />

      {/* modal chỉnh sửa giống cây */}
      <ChinhSuaGionCay
        open={modalChinhSuaGiongCay}
        onCancel={() => {
          setModalChinhSuaGiongCay(false);
          setCayDuocChon((prev) => ({
            nhomCay: prev.nhomCay,
            loaiCay: prev.loaiCay,
            giongCay: "",
          }));
        }}
        loaiCay={cayDuocChon.loaiCay}
        giongCayId={cayDuocChon.giongCay}
      />
      {/* modal confirm */}
      <ConfirmModal
        open={modalConfirm}
        onOk={handleConfirm}
        onCancel={handleCancel}
        textContent="BẠN CÓ CHẮC CHẮN MUỐN XÓA"
      />
    </div>
  );
}
