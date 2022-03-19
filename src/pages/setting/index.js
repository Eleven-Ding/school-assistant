import React, { memo, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { NavBar, Button, Form, Input, Dialog, Image, Toast } from "antd-mobile";
import { AddOutline } from "antd-mobile-icons";
import { updateUser, getUserInfo } from "../../network/model";
import COS from "cos-js-sdk-v5";
import { SettingWrapper } from "./style";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { COS_SECRETID, COS_SECRETKEY, Bucket, Region } from "@/constant";
import { changeUserInfo } from "../../store/creators";
const cos = new COS({
  SecretId: COS_SECRETID,
  SecretKey: COS_SECRETKEY,
});
export default memo(
  withRouter(function TodoPage({ history }) {
    const [edit, setEdit] = useState(false);
    const [renderInfo, setRenderIno] = useState({});
    const dispatch = useDispatch();
    const { userInfo } = useSelector(
      (state) => ({
        userInfo: state.getIn(["main", "userInfo"]),
      }),
      shallowEqual
    );
    useEffect(() => {
      setRenderIno(userInfo || {});
    }, [userInfo]);
    function handleUpload(e) {
      const file = e.target.files[0];
      if (!file) return;
      cos.putObject(
        {
          Bucket,
          Region,
          Key: `/school/${file.name}` /* 必须 */,
          StorageClass: "STANDARD",
          Body: file, // 上传文件对象
        },
        function (err, data) {
          let url = `https://` + data.Location;
          setRenderIno({
            ...renderInfo,
            avator: url,
          });
        }
      );
    }
    return (
      <SettingWrapper>
        <NavBar
          style={{ backgroundColor: "white" }}
          onBack={() => {
            history.goBack();
          }}
          right={
            <span
              style={{ fontSize: "15px" }}
              onClick={() => {
                const { avator, email, username } = renderInfo;
                if (edit) {
                  updateUser(avator, username, email).then((res) => {
                    const token = res.data.token;
                    console.log(res);
                    localStorage.setItem("token", token);
                    if (res.status === 200) {
                      Toast.show({
                        icon: "success",
                        content: "保存成功",
                      });
                      getUserInfo().then((res) => {
                        dispatch(changeUserInfo(res.data.userInfo));
                      });
                    }
                  });
                }
                setEdit(!edit);
              }}
            >
              {edit ? "保存" : "编辑"}
            </span>
          }
        >
          个人设置
        </NavBar>
        <Form layout="horizontal" mode="card">
          <Form.Item
            label="头像"
            extra={
              <div>
                {edit && (
                  <div className="upload">
                    <span style={{ color: "#00a3ff" }}>选择头像</span>
                    <input
                      className="input-file"
                      accept="image/*"
                      type="file"
                      onChange={handleUpload}
                    />
                  </div>
                )}
              </div>
            }
          >
            <Image
              width={100}
              height={100}
              src={renderInfo.avator}
              style={{ borderRadius: "50px" }}
            ></Image>
          </Form.Item>
          <Form.Item label="昵称">
            <Input
              placeholder="请输入"
              value={renderInfo.username}
              onChange={(e) => {
                setRenderIno({
                  ...renderInfo,
                  username: e,
                });
              }}
              disabled
            />
          </Form.Item>
          <Form.Item label="学校">
            <Input
              placeholder="请输入"
              value={renderInfo.school_name}
              disabled
            />
          </Form.Item>
          <Form.Item label="邮箱地址">
            <Input placeholder="请输入" value={renderInfo.email} disabled />
          </Form.Item>
          <Form.Item label="密码">
            <Input placeholder="请输入" value={renderInfo.password} disabled />
          </Form.Item>
          <Form.Header />
        </Form>
        <Button
          style={{ marginTop: "20px" }}
          color="danger"
          onClick={() => {
            Dialog.confirm({
              content: "确定要退出吗?",
              closeOnMaskClick: true,
              confirmText: "退出登录",
              cancelText: "取消",
              onConfirm: () => {
                localStorage.removeItem("token");
                history.push("/login");
              },
            });
          }}
          block
        >
          退出登录
        </Button>
      </SettingWrapper>
    );
  })
);
