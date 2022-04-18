import React, { memo, useState } from "react";
import COS from "cos-js-sdk-v5";
import { COS_SECRETID, COS_SECRETKEY, Bucket, Region } from "@/constant";
import { addArtticle } from "@/network/model";
import {
  NavBar,
  TextArea,
  Toast,
  Button,
  Switch,
  Picker,
  Mask,
  ProgressCircle,
} from "antd-mobile";
import { EnvironmentOutline, StarOutline } from "antd-mobile-icons";
import Upload from "@/components/upload/upload.js";
import { AddWrapper } from "./style";
import { sum } from "@/utils/common";
import { withRouter } from "react-router-dom";
export const column = [
  { label: "普通帖子", value: "0" },
  { label: "日常生活", value: "1" },
  { label: "校园趣事", value: "2" },
  { label: "失物招领", value: "3" },
  { label: "互助", value: "4" },
  { label: "交友互动", value: "5" },
];

export default withRouter(
  memo(function HomePage({ history }) {
    const [content, seContent] = useState("");
    const [list, setList] = useState([]);
    const [value, setValue] = useState(["0"]);
    const [visible, setVisible] = useState(false);
    const [position, showPosition] = useState("");
    const [showMask, setShowMask] = useState(false);
    const [percent, setPercent] = useState(0);
    const handleUpload = function () {
      if (!content && !list.length) {
        Toast.show({
          content: "内容不能为空!",
        });
        return;
      }
      const cos = new COS({
        SecretId: COS_SECRETID,
        SecretKey: COS_SECRETKEY,
      });
      let urls = [];
      setShowMask(true);
      let total = 0;
      list.forEach((item) => {
        total += item.size;
      });
      let currentTotal = [];
      if (list.length) {
        let currentIndex = 0;
        list.forEach((item, index) => {
          cos.putObject(
            {
              Bucket,
              Region,
              Key: `/school/${item.name}` /* 必须 */,
              StorageClass: "STANDARD",
              Body: item, // 上传文件对象
              onProgress: function (progressData) {
                const data = JSON.parse(JSON.stringify(progressData));
                currentTotal[index] = data.loaded;
                setPercent(sum(currentTotal) / total);
              },
            },
            function (err, data) {
              urls[index] = `https://` + data.Location;
              currentIndex++;
              if (currentIndex === list.length) {
                //开始上传
                setShowMask(false);
                addArtticle({
                  urls,
                  content,
                  position,
                  tag: value,
                }).then(({ status }) => {
                  if (status === 200) {
                    history.push("/home");
                  }
                });
              }
            }
          );
        });
      }
    };
    function handleChoose(payload) {
      setList([...list, ...payload]);
    }
    function handleDelete(index) {
      list.splice(index, 1);
      setList([...list]);
    }
    return (
      <AddWrapper>
        <NavBar style={{ backgroundColor: "white" }} back={null}>
          发布
        </NavBar>
        <TextArea
          style={{ padding: "10px" }}
          placeholder="请输入内容"
          value={content}
          autoSize={{ minRows: 5, maxRows: 8 }}
          onChange={(val) => {
            seContent(val);
          }}
        />
        <Upload
          handleChoose={handleChoose}
          list={list}
          handleDelete={handleDelete}
        />

        <div className="extra-info">
          <div className="extra-item" onClick={() => setVisible(!visible)}>
            {Number(value[0]) === 0 ? (
              <>
                <StarOutline />
                选择标签
              </>
            ) : (
              <>
                <StarOutline style={{ color: "#ff7a00" }} />
                <span style={{ color: "#ff7a00" }}>
                  {column.find((item) => item.value === value[0])?.label}
                </span>
              </>
            )}
          </div>
          <div className="extra-item">
            {position ? (
              <>
                <EnvironmentOutline style={{ color: "#ff7a00" }} />
                <span style={{ color: "#ff7a00" }}>{position}</span>
              </>
            ) : (
              <>
                <EnvironmentOutline />
                <span>位置</span>
              </>
            )}
            <Switch
              onChange={(e) => {
                showPosition(e ? localStorage.getItem("location") : null);
              }}
              uncheckedText="关"
              style={{ transform: "scale(0.7)" }}
              checkedText="开"
            />
          </div>
        </div>
        <Button
          style={{ marginTop: "20px" }}
          block
          color="primary"
          onClick={handleUpload}
          size="middle"
        >
          发布
        </Button>
        <Picker
          columns={[column]}
          visible={visible}
          onClose={() => {
            setVisible(false);
          }}
          value={value}
          onConfirm={(v) => {
            setValue(v);
          }}
        />

        <Mask visible={showMask}>
          <div className="overlayContent">
            <ProgressCircle
              percent={percent * 100}
              style={{
                "--fill-color": parseInt(percent) === 1 ? "#00B578" : "blue",
              }}
            >
              <span>
                {parseInt(percent) === 1 ? (
                  <span style={{ fontSize: "14px", color: "#00b578" }}>
                    发布中...
                  </span>
                ) : (
                  <>{(percent * 100).toFixed(0)}%</>
                )}
              </span>
            </ProgressCircle>
          </div>
        </Mask>
      </AddWrapper>
    );
  })
);
