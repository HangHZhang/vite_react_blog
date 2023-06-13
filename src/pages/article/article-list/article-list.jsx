import React, { useState, useEffect, useCallback } from "react";
import { Table, Avatar, Button } from "@douyinfe/semi-ui";
import { SearchOutlined } from "@ant-design/icons";
import { IconSmallTriangleRight } from "@douyinfe/semi-icons";

import {
  Card,
  message,
  Cascader,
  Select,
  Input,
  Typography,
  Divider,
  Tag,
  Popconfirm,
  Row,
  Col,
  Tooltip,
  Progress,
  Modal,
} from "antd";
import moment from "moment";

import LinkButton from "../../../components/link-button";
import { mockArticleList } from "../../../mock/article";
import {
  reqArticleList,
  reqCategoryList,
  reqDeleteArticle,
  reqUploadFileChunk,
  reqUploadEnd,
  reqVerifyUpload,
  reqDownloadArticle
} from "../../../api";
import { PAGE_SIZE, CHUNK_SIZE } from "../../../utils/constants";
import nestObjArr from "../../../utils/nestObjArr";
import createChunks from "../../../utils/createChunks";

const { Title } = Typography;

const { Option } = Select;

export default function ArticleList() {
  const [articleList, setArticleList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [article, setArticle] = useState({});
  const [categoryList, setCategoryList] = useState([]);
  const [showUploadAndExport, setShowUploadAndExport] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [percentage, setPercentage] = useState(0);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isUploadModalOpen) {
      return;
    }
    const timerId = setInterval(() => {
      setPercentage((percentage) => percentage + 1);
    }, 50);

    return () => {
      clearInterval(timerId);
    }
  }, [isUploadModalOpen]);

  const handleUploadClose =() => {
    setIsUploadModalOpen(false);
    setPercentage(0);
  };

  const downloadAriticle = async () => {
    const {_id} = article;
    const result = await reqDownloadArticle(_id);
    console.log(result);
    if (result.status === 0) {
      message.success(result.msg);
    } else {
      message.error("导出失败，请稍后再试~");
    }
  } 

  const columns = [
    {
      key: "order",
      title: "序号",
      width: 120,
      align: "center",
      render: ({}, {}, index) => (
        <span>{PAGE_SIZE * (currentPage - 1) + (index + 1)}</span>
      ),
    },
    {
      title: "标题",
      key: "article_name",
      dataIndex: "article_name",
      width: 300,
      render: (name) => (
        <>
          <Avatar
            size="small"
            src="https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png"
            style={{ marginRight: 4 }}
          ></Avatar>
          {name}
        </>
      ),
    },
    {
      title: "分类",
      width: 250,
      key: "category_id",
      dataIndex: "category_id",
      render: (tagName) => {
        return (
          <Tag color="#995E40">
            <span style={{ display: "inline-block" }}>{tagName}</span>
          </Tag>
        );
      },
    },
    {
      title: "标签",
      dataIndex: "tagList",
      key: "tagList",
      width: 250,
      render: (tagList) => {
        return tagList.map((tag) => (
          <span style={{ display: "inline-block", margin: "0 4px" }}>
            {tag}
          </span>
        ));
      },
    },
    {
      title: "所有者",
      dataIndex: "owner",
      key: "owner",
      render: (text, record, index) => {
        return (
          <div>
            <Avatar
              size="small"
              color={record.owner === "张行行" ? "red" : "purple"}
              style={{ marginRight: 4 }}
            >
              {typeof text === "string" && text.slice(0, 1)}
            </Avatar>
            {text}
          </div>
        );
      },
    },
    {
      title: "更新日期",
      dataIndex: "updateTime",
      key: "updateTime",
      sorter: (a, b) => (a.updateTime - b.updateTime > 0 ? 1 : -1),
      render: (updateTime) => moment(+updateTime).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "操作",
      width: 200,
      key: "action",
      render: () => {
        return (
          <>
            <LinkButton onClick={() => message.warning("编辑功能待开发")}>
              编辑
            </LinkButton>
            <Popconfirm
              title="确定要删除吗？"
              onConfirm={removeArticle}
              okText="确定"
              cancelText="取消"
            >
              <LinkButton>删除</LinkButton>
            </Popconfirm>
            <Tooltip
              title={
                !showUploadAndExport ? (
                  <span>请选择一项待上传文章项</span>
                ) : (
                  <span>上传选中项文章</span>
                )
              }
            >
              <div style={{ display: "inline-block" }}>
                <LinkButton
                  disabled={!showUploadAndExport}
                  onClick={uploadAriticle}
                >
                  上传
                </LinkButton>
              </div>
            </Tooltip>
            <Tooltip
              title={
                !showUploadAndExport
                  ? "请选择一项待导出文章项"
                  : "导出选中项文章"
              }
            >
              <div style={{ display: "inline-block" }}>
                <LinkButton disabled={!showUploadAndExport} onClick={downloadAriticle}>导出</LinkButton>
              </div>
            </Tooltip>
          </>
        );
      },
    },
  ];

  const removeArticle = async () => {
    const result = await reqDeleteArticle(article._id);
    if (result.status === 0) {
      message.success(`删除~${article.article_name}~文章成功`);
      fetchData();
    } else {
      message.error({
        content: (
          <span>
            {`删除~${article.article_name}~文章失败，请稍后再试`}&#128521;
          </span>
        ),
      });
    }
  };

  const getOptions = () => {
    const option = categoryList.map((category) => ({
      value: category.name,
      label: category.name,
    }));
    return option;
  };

  const fetchData = async () => {
    const result = await reqArticleList();
    if (result.status === 0) {
      /*&#128557;&#128557;&#128557;*/
      const data = nestObjArr(result.data, "article_name");
      setArticleList(data);
    } else {
      message.error(result.msg);
    }
  };

  const getCategoryList = async () => {
    const result = await reqCategoryList();
    result.status === 0
      ? setCategoryList(result.data)
      : message.error(result.msg);
  };

  const handleProgress = () => {
    setIsUploadModalOpen(true);
  };

  const uploadAriticle = () => {
    let input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf, .md";
    input.click();

    input.onchange = async () => {
      setIsUploadModalOpen(true);
      let file = input.files[0];
      if (!file) return;
      const extName = file.name.split(".").splice(-1)[0];
      /* 这一步会很快，因为 File 与 Blog 保存的都是文件基本信息，做分片知识一些简单的基本运算，最终读取文件数据时，需要 FileReader 才能把它们的数据给读出来*/
      const chunks = createChunks(file, CHUNK_SIZE);
      // const filename = await hash(chunks);
      function _calculateHash(chunks) {
        let worker = null;
        return new Promise((res) => {
          worker = new Worker("/public/js/hash.js");
          worker.postMessage({ chunks });
          worker.onmessage = (e) => {
            const { hash } = e.data;
            if (hash) {
              res(hash);
            }
          };
        });
      }

      // const verifyUpload = async (filename, fileHash) => {
      //   const result = await reqVerifyUpload(article._id, filename, fileHash);
      //   if (result.status === 0) {
      //     return result.data;
      //   } else {
      //     message.warning("网络不佳，稍后再试~");
      //   }
      // };

      const filenameHash = await _calculateHash(chunks);
      // handleProgress();

      const {status,data} = await reqVerifyUpload(article._id, file.name, filenameHash);
      if (status === 1) {
        message.warning("网络不佳，稍后再试~");
        return;
      } 

      const {shouldUpload, uploadedChunkList} = data;

      if (!shouldUpload) {
        message.success("文件已上传成功~");
        setIsUploadModalOpen(false);
        setPercentage(0);
        return;
      }
      const uploadChunkList = chunks
        .filter(({ hash }) => !uploadedChunkList.includes(hash))
        .map((item, index) => {
          const formData = new FormData();
          formData.append("_id", article._id);
          formData.append("chunk", item);
          formData.append("filename", filenameHash);
          formData.append("name", filenameHash + "-" + index);
          return reqUploadFileChunk(formData);
        });
      handleProgress();
      // 所有切片上传成功
      Promise.all(uploadChunkList).then(() => {
        reqUploadEnd(article._id, filenameHash, extName).then((data) => {
          if (data.status === 0) {
            message.success(file.name + "文件上传成功");
            console.log(data.data.dataURL);
          }
        });
      });
    };
  };

  useEffect(() => {
    fetchData();
  }, []);

  const title = (
    <div>
      <Cascader
        style={{ width: "200px", marginRight: 25 }}
        options={getOptions()}
        placeholder="请选择分类"
        onClick={getCategoryList}
      />
      <Input
        style={{ width: "220px" }}
        placeholder="请输入关键字"
        prefix={<SearchOutlined />}
      />
    </div>
  );

  const extra = (
    <span>
      <Button
        style={{ height: 34, margin: "0 5px" }}
        onClick={() => message.warning("重置成功")}
        type="tertiary"
      >
        重置
      </Button>
      <Button
        style={{ height: 34 }}
        onClick={() => message.warning("查询成功")}
        type="secondary"
      >
        查询
      </Button>
    </span>
  );

  const onRow = (article) => {
    return {
      onClick: () => {
        setArticle(article);
        setShowUploadAndExport(true);
      },
    };
  };

  const expandRowRender = (article) => {
    return <span style={{ textIndent: "2em" }}>{article.desc}</span>;
  };

  const handleUploadOk = () => {
    setIsUploadModalOpen(false);
  };

  const handleUploadCanle = () => {
    setIsUploadModalOpen(false);
  };

  return (
    <>
      <Card title={title} extra={extra}>
        {/* 差一行 */}
        <Table
          rowKey="_id"
          bordered={false}
          columns={columns}
          dataSource={articleList}
          pagination={{
            pageSize: PAGE_SIZE,
            total: articleList.length,
            hideOnSinglePage: true,
            onPageChange: (currentPage) => setCurrentPage(currentPage),
          }}
          loading={loading}
          onRow={onRow}
          scroll={{
            y: 400,
          }}
          rowSelection={{
            selectedRowKeys: [article._id],
            onSelect: (article) => {
              setArticle(article);
              setShowUploadAndExport(true);
            },
          }}
          expandedRowRender={expandRowRender}
        />
      </Card>
      <Modal
        title="上传进度"
        open={isUploadModalOpen}
        onOk={handleUploadOk}
        onCanle={handleUploadCanle}
        closable={false}
        footer={[
          <LinkButton type="primary" onClick={handleUploadOk}>
            {" "}
            确定
          </LinkButton>,
        ]}
        width={400}
        style={{ display: "flex", justifyContent: "center" }}
        afterClose={handleUploadClose}
      >
        <Progress percent={percentage} size={[300, 20]} />
      </Modal>
    </>
  );
}
