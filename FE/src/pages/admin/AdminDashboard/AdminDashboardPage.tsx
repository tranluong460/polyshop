import { useEffect, useState } from "react";
import { Card, Col, Row, Statistic } from "antd";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";

const AdminDashboardPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Tổng đơn hàng" hoverable bordered loading={loading}>
            <div className="flex gap-3">
              <span className="text-2xl">500 đơn</span>

              <Statistic
                value={11.28}
                precision={2}
                valueStyle={{ color: "#3f8600" }}
                prefix={<AiOutlineArrowUp />}
                suffix="%"
              />
            </div>
          </Card>
        </Col>

        <Col span={8}>
          <Card title="Số đơn hôm nay" hoverable bordered loading={loading}>
            <div className="flex gap-3">
              <span className="text-2xl">10 đơn</span>

              <Statistic
                value={6.2}
                precision={2}
                valueStyle={{ color: "#cf1322" }}
                prefix={<AiOutlineArrowDown />}
                suffix="%"
              />
            </div>
          </Card>
        </Col>

        <Col span={8}>
          <Card title="Tổng người dùng" hoverable bordered loading={loading}>
            <span className="text-2xl">100 người</span>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AdminDashboardPage;
