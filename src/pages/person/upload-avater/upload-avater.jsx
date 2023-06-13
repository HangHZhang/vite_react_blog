import React, { useState, createRef } from "react";
import { Avatar, Modal, Row, Col, Button, message, Input } from "antd";
import PropTypes from "prop-types";
import {
  UserOutlined,
  RedoOutlined,
  UndoOutlined,
  AimOutlined,
} from "@ant-design/icons";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./index.css";

const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

UploadAvater.prototype = {
  size: PropTypes.number || PropTypes.string || PropTypes.object,
  previewSize: PropTypes.number || PropTypes.object,
  cropperWidth: PropTypes.number || PropTypes.object,
  cropperHeight: PropTypes.number || PropTypes.object,
  handleSubmitAvater: PropTypes.func,
};

UploadAvater.defaultProps = {
  size: 64,
  previewSize: 200,
  cropperWidth: 380,
  cropperHeight: 350,
};

export default function UploadAvater(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState(() => {
    return props.avatar ? props.avatar : defaultSrc;
  });
  const cropperRef = createRef();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    const cropData = getCropData();
    props.handleSubmitAvater
      ? props.handleSubmitAvater(cropData)
      : message.warning("待传入提交逻辑...");
    setIsModalOpen(false);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      return cropperRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL()
        .split(",")[1];
    }
  };

  const chooseFile = () => {
    let input = document.createElement("input");
    input.type = "file";
    input.accept = ".jpg, .png, .bmp, .webp";
    input.click();
    input.onchange = (e) => {
      e.preventDefault();
      let files;
      /* dataTransfer 是一个 Web API，用于在拖动元素时传输数据。在拖动元素的过程中，可以通过 dataTransfer 对象来访问被拖动元素的数据，也可以将数据传输到另一个元素上。 */
      if (e.dataTransfer) {
        files = e.dataTransfer.files;
      } else if (e.target) {
        files = e.target.files;
      }
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        setImage(reader.result);
      };
    };
  };

  const leftRotate90 = () => {
    cropperRef.current.cropper.rotate(-90);
  }

  const rightRotate90 = () => {
    cropperRef.current.cropper.rotate(90);
  }

  return (
    <div>
      {props.avatar ? (
        <Avatar
          size={props.size}
          src={props.avatar}
          onClick={showModal}
          {...props}
        />
      ) : (
        <Avatar
          size={props.size}
          icon={<UserOutlined />}
          onClick={showModal}
          {...props}
        />
      )}
      <Modal
        title="修改头像"
        footer={null}
        open={isModalOpen}
        onCancel={handleCancel}
        afterClose={() => {
          setImage(props.avatar ? props.avatar : defaultSrc);
        }}
        maskClosable={false}
        width={800}
        destroyOnClose={true}
      >
        <Row gutter={4} align="middle">
          <Col span={12}>
            <Row style={{ width: "100%", marginBottom: 10 }} justify="start">
              <Cropper
                ref={cropperRef}
                style={{
                  height: props.cropperHeight,
                  width: props.cropperWidth,
                }}
                zoomTo={0}
                initialAspectRatio={1}
                dragMode="move"
                preview=".img-preview"
                src={image}
                rotatable={true}
                viewMode={1}
                background={false}
                responsive={true}
                autoCropArea={0.5}
                checkOrientation={false}
                guides={false}
                center={false}
                cropBoxResizable={false}
                {...props}
              />
            </Row>
          </Col>
          <Col span={8}>
            <Row justify="center">
              <div className="box" style={{ width: "50%" }}>
                <div
                  className="img-preview"
                  style={{
                    width: props.previewSize,
                    height: props.previewSize,
                    marginLeft: 25,
                  }}
                />
              </div>
            </Row>
          </Col>
        </Row>
        <Row wrap={false}>
          <Col span={12}>
            <Row>
              <Col span={12}>
                <Button
                  shape="round"
                  icon={<AimOutlined />}
                  onClick={chooseFile}
                >
                  选择文件
                </Button>
              </Col>
              <Col span={6} offset={6}>
                <Button
                  icon={<UndoOutlined />}
                  style={{marginRight: 10 }}
                  type="ghost"
                  shape="circle"
                  onClick={leftRotate90}
                />
                <Button icon={<RedoOutlined />} type="ghost" shape="circle" onClick={rightRotate90}/>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row justify="center" style={{ marginLeft: 33 }}>
              <Button type="primary" onClick={handleSubmit}>
                提交
              </Button>
            </Row>
          </Col>
        </Row>
      </Modal>
    </div>
  );
}
