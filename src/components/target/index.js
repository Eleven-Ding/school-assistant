import React, { memo, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { NavBar, NoticeBar } from "antd-mobile";
import { Tabs, Button, Tag, Modal, Form, Input, message, Card } from "antd";
import { addTarget, getTarget } from "../../network/model";
const { TabPane } = Tabs;
const tabs = [
  {
    id: 0,
    value: "全部",
  },
  {
    id: 1,
    value: "技术文章",
  },
  {
    id: 2,
    value: "购物收藏",
  },
  {
    id: 3,
    value: "实用网站",
  },
  {
    id: 4,
    value: "个人文档",
  },
  {
    id: 5,
    value: "购物网站",
  },
  {
    id: 6,
    value: "视频网站",
  },
  {
    id: 7,
    value: "其他",
  },
];
export default memo(
  withRouter(function Target({ history }) {
    const [currentTab, setCurrentTab] = useState(0);
    const [list, setList] = useState([]);
    const [visible, setVisible] = useState(false);
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    function handleOk() {
      const tag = tabs.find((tab) => tab.id === currentTab)?.id;
      console.log(tag);
      const hide = message.loading("加载中....", 0);
      addTarget(url, title, tag).then((res) => {
        getTarget().then((res) => {
          setList(res.data.list);
          hide();
          setVisible(false);
          setUrl("");
          setTitle("");
          message.success("添加成功", 10);
        });
      });
    }
    useEffect(() => {
      getTarget().then((res) => {
        console.log(res);
        setList(res.data.list);
      });
    }, []);
    return (
      <>
        <NavBar
          onBack={() => {
            history.goBack();
          }}
          style={{ backgroundColor: "white" }}
        >
          导航列表
        </NavBar>
        <NoticeBar
          style={{ margin: "0px 0 20px 0" }}
          content="帮助用户记录有用的导航并分类，方便查找."
          color="info"
        />
        <Tabs
          onChange={(e) => {
            setCurrentTab(Number(e));
          }}
          defaultActiveKey="0"
          tabPosition={"left"}
          style={{ height: "100vh" }}
        >
          {tabs.map((i) => (
            <TabPane
              style={{
                height: "100vh",
                overflow: "scroll",
                paddingBottom: "55px",
              }}
              tab={`${i.value}`}
              key={i.id}
            >
              <div
                className="tab-item"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                {currentTab !== 0 && (
                  <>
                    <Tag style={{ transform: "scale(1)" }} color="#f50">
                      {i.value}
                    </Tag>
                    <Button
                      size="small"
                      onClick={() => {
                        setVisible(true);
                      }}
                      type="primary"
                      ghost
                    >
                      +添加导航
                    </Button>
                  </>
                )}
              </div>
              {list
                .filter((ls) => {
                  if (currentTab === 0) return ls;
                  return ls.tag === currentTab;
                })
                .map((item) => {
                  return (
                    <Card
                      key={item.id}
                      title={item.title}
                      extra={<a href={item.url}>跳转</a>}
                      style={{ margin: "10px 10px 0 -15px" }}
                    >
                      <div
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.url}
                      </div>
                    </Card>
                  );
                })}
            </TabPane>
          ))}
        </Tabs>
        <Modal
          title={tabs.find((tab) => tab.id === currentTab)?.value}
          visible={visible}
          onOk={() => {
            handleOk();
          }}
          okText="保存"
          cancelText="取消"
          onCancel={() => {
            setVisible(false);
          }}
        >
          <Form>
            <Form.Item label="title" name="title">
              <Input
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item label="url" name="url">
              <Input
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                }}
              />
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  })
);
