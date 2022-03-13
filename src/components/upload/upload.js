import React, { memo } from "react";
import { UploadWrapper } from "./style";
import { CameraOutline, CloseOutline } from "antd-mobile-icons";

export default memo(function Upload({ handleChoose, list, handleDelete }) {
  const handleChoose1 = function (e) {
    handleChoose(e.target.files);
  };

  return (
    <UploadWrapper>
      <div className="preview-list">
        {list.map((item, index) => {
          return (
            <div
              className="preview"
              onTouchStart={(e) => {
                const target = e.target;
                if (target.paused) {
                  target.play && target.play();
                } else {
                  target.pause && target.pause();
                }
              }}
              key={index}
            >
              <CloseOutline
                className="close"
                onClick={() => {
                  console.log(index);
                  handleDelete(index);
                }}
              />

              {item.type.includes("video") ? (
                <video
                  onClick={(e) => {
                    console.log(e);
                  }}
                  controls
                  src={URL.createObjectURL(item)}
                />
              ) : (
                <img src={URL.createObjectURL(item)} alt="" />
              )}
            </div>
          );
        })}
      </div>
      <div className="add-src">
        <CameraOutline style={{ marginBottom: "10px" }} />
        <p>视频/图片</p>
        <input
          multiple="multiple"
          type="file"
          accept="image/*,audio/*"
          onChange={handleChoose1}
        />
      </div>
    </UploadWrapper>
  );
});
