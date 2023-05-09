import { Col, Input, Row, Select } from "antd";
import React from "react";

export default function DanhMucCayTrong() {
  return (
    <div>
      <h2>Danh mục cây trồng</h2>
      <Row gutter={120}>
        <Col span={6}>
          <div>Nhóm cây</div>
          <Select
            style={{ width: "100%" }}
            options={[
              { label: "Cây Dâu Tây", value: "dautay" },
              { label: "Cây Bơ", value: "caybo" },
              { label: "Cà Phê", value: "caphe" },
              { label: "Hoa Cúc", value: "hoacuc" },
              { label: "Hoa Dướng Dương", value: "huongduong" },
              { label: "Bông Đồng Tiền", value: "dongtien" },
              { label: "Hoa Hồng", value: "hoahong" },
              { label: "Cây Chuối", value: "caychuoi" },
            ]}
          />
        </Col>
        <Col span={6}>
          <div>Nhóm cây</div>
          <Input />
        </Col>
        <Col span={6}>
          <div>Nhóm cây</div>
          <Input />
        </Col>
      </Row>
    </div>
  );
}
