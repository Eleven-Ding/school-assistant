import React, { memo, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { NavBar } from "antd-mobile";
import {
  Card,
  Toast,
  Button,
  Tag,
  DatePicker,
  TextArea,
  Popup,
  List,
  Divider,
  SwipeAction,
} from "antd-mobile";
import { addTodoList, getTodoList, deleteTodo } from "../../network/model";
import { AddOutline, AntOutline, RightOutline } from "antd-mobile-icons";
export function formatDate(date, fmt = "yyyy-MM-dd hh:mm:ss") {
  let resDate = date;

  if (!resDate) {
    return "";
  }
  resDate = new Date(Number(resDate));
  let result = fmt;
  if (/(y+)/.test(result))
    result = result.replace(
      RegExp.$1,
      `${resDate.getFullYear()}`.substr(4 - RegExp.$1.length)
    );
  const expMap = {
    "M+": resDate.getMonth() + 1,
    "d+": resDate.getDate(),
    "h+": resDate.getHours(),
    "m+": resDate.getMinutes(),
    "s+": resDate.getSeconds(),
    "S+": resDate.getMilliseconds(),
  };
  Object.keys(expMap).forEach((exp) => {
    if (new RegExp(`(${exp})`).test(fmt)) {
      result = result.replace(
        RegExp.$1,
        `${expMap[exp]}`.padStart(RegExp.$1.length, "0")
      );
    }
  });
  return result;
}
export default memo(
  withRouter(function TodoPage({ history }) {
    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);
    const [time, setTime] = useState(Date.now());
    const [content, setContent] = useState("");
    const [list, setList] = useState([]);
    function handleTodo() {
      console.log(Date.parse(time));
      addTodoList({
        time: Date.parse(time),
        content,
      }).then((res) => {
        Toast.show({
          content: "添加成功",
          icon: "success",
        });
        setVisible(false);
      });
    }
    function handleDelete(item) {
      deleteTodo(item).then((_) => {
        getTodoList().then((res) => {
          setList(res.data.todos);
        });
        Toast.show({
          content: "恭喜完成",
          icon: "success",
        });
      });
    }
    useEffect(() => {
      getTodoList().then((res) => {
        setList(res.data.todos);
      });
    }, [visible]);
    return (
      <>
        <NavBar back={null} style={{ backgroundColor: "white" }}>
          我的待办
        </NavBar>
        <Card
          title={"TODO LIST"}
          extra={
            <Tag
              color="primary"
              onClick={() => {
                setVisible(true);
              }}
              fill="outline"
              style={{ fontSize: "15px" }}
            >
              <AddOutline />
              新建Todo
            </Tag>
          }
          onBodyClick={() => {}}
          onHeaderClick={() => {}}
          style={{ borderRadius: "16px" }}
        >
          <List header="列表">
            {list.map((todo) => (
              <SwipeAction
                key={todo.id}
                leftActions={[
                  {
                    key: "delete",
                    text: "完成",
                    color: "success",
                  },
                ]}
                onAction={() => {
                  handleDelete(todo.id);
                }}
              >
                <List.Item
                  description={
                    <Tag color="#61b053" fill="outline">
                      {formatDate(todo.endTime)}
                    </Tag>
                  }
                >
                  {todo.content}
                </List.Item>
              </SwipeAction>
            ))}
          </List>
        </Card>
        <Popup
          visible={visible}
          onMaskClick={() => {
            setVisible(false);
          }}
          bodyStyle={{ height: "40vh", padding: "0 4px" }}
        >
          <Divider contentPosition="left">待做事项</Divider>
          <TextArea
            placeholder="请输入内容"
            value={content}
            showCount
            rows={3}
            onChange={(val) => {
              setContent(val);
            }}
          />
          <Divider contentPosition="left">预计完成时间</Divider>
          <Button
            onClick={() => {
              setVisible1(true);
            }}
            size="small"
            color="primary"
          >
            选择时间
          </Button>
          <Tag style={{ fontSize: "15px" }} color="#ff6430" fill="outline">
            {formatDate(time)}
          </Tag>

          <DatePicker
            visible={visible1}
            onClose={() => {
              setVisible1(false);
            }}
            precision="minute"
            onConfirm={(val) => {
              setTime(val);
            }}
          />
          <Divider contentPosition="left">操作</Divider>
          <Button
            onClick={() => {
              handleTodo();
            }}
            block
            color="primary"
            size="middle"
          >
            提交TODO
          </Button>
        </Popup>
      </>
    );
  })
);
