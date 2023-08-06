import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Avatar, List, Space, Rate, Form, Button, Input, message, Popconfirm } from "antd";

import { AiFillLike, AiFillMessage, AiOutlineDelete } from "react-icons/ai";

import { Button as Btn } from "../../..";
import { ICommentsProduct, IUser } from "../../../../interface";
import { useAddCommentByIdProMutation, useDeleteCommentByIdMutation } from "../../../../api/comment";
import { useGetUserByTokenMutation } from "../../../../api/auth";
import { useAddFeedbackMutation, useRemoveFeedbackMutation } from "../../../../api/feedback";

type ProductCommentProps = {
  comments: ICommentsProduct[];
};

const ProductComment = ({ comments }: ProductCommentProps) => {
  // console.log(comments)
  const [isFeedback, setIsFeedback] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<
    string | undefined
  >("");
  // const [comment, setComment] = useState("");
  const [feedBack, setFeedback] = useState("");
  const [addComment] = useAddCommentByIdProMutation()
  const [removeComment] = useDeleteCommentByIdMutation()
  const [verifyToken] = useGetUserByTokenMutation();
  const [addFeeback] = useAddFeedbackMutation()
  const [deleFeeback] = useRemoveFeedbackMutation()

  const token = localStorage.getItem("token");
  const [user, setUser] = useState<IUser | null>()
  useEffect(() => {
    if (token) {
      verifyToken(token)
        .unwrap()
        .then((response) => {
          setUser(response?.data);
        })
        .catch((error) => {
          message.error(error.data.message);
        });;
    }
  }, [token]);
  console.log(user?._id);
  // console.log(token);
  const { id } = useParams<string>()
  console.log();
  const listComment = comments?.map((cmt) => ({
    href: "/profile",
    _id: cmt._id,
    prefer: cmt.prefer,
    feed_back: cmt.feed_back,
    title: cmt.user?.name,
    avatar: cmt.user?.image,
    userId: cmt.user?._id,
    description: (
      <Rate
        allowHalf
        disabled={true}
        defaultValue={cmt.stars}
        className="text-base"
      />
    ),
    content: cmt.comment,
  }));
  console.log(listComment);
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    // console.log(values);
    addComment({ ...values, product: id })
    form.resetFields(['comment']);
  };
  const IconText = ({ icon, text }: { icon: React.FC; text?: number }) => (
    <Space className="hover:text-rose-300 text-base">
      {React.createElement(icon)}
      {text}
    </Space>
  );
  const handleIconClick = (id: any) => {
    // Xử lý khi người dùng nhấp vào icon
    // console.log(id);
    console.log(removeComment({ id }));
  };
  console.log(user);
  return (
    <>
      <List
        size="large"
        itemLayout="vertical"
        pagination={{ pageSize: 2 }}
        dataSource={listComment}
        footer={
          <>
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
              <label
                htmlFor="comment"
                className="text-gray-500 text-ml font-medium"
              >
                Bình luận
              </label>

              <Form
                form={form}
                onFinish={onFinish}
                initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
                className="w-full"
                scrollToFirstError
              >
                <Form.Item
                  name="stars"
                  label="Đánh giá sao"
                  rules={[{ required: true, message: 'Đánh giá sao không được để trống' }]}

                >
                  <Rate />
                </Form.Item>
                <Form.Item
                  name="comment"
                  label="Nội dung bình luận"
                  rules={[{ required: true, message: 'Nội dung bình luận không được để trống' }]}
                >
                  <Input.TextArea showCount maxLength={100} />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" danger htmlType="submit">
                    Bình luận
                  </Button>
                </Form.Item>
              </Form>
            </div>


          </>
        }
        renderItem={(item: any) => (

          <>
            <List.Item
              key={item.title}
              extra={
                <button
                  onClick={() => {
                    setIsFeedback(!isFeedback);
                    setSelectedCommentId(item._id);
                  }}
                  className="hover:text-blue-500"
                >
                  {isFeedback && selectedCommentId === item._id
                    ? "Hủy"
                    : "Phản hồi"}
                </button>
              }
              actions={[
                <IconText
                  icon={AiFillLike}
                  text={item.prefer || 0}
                  key="list-vertical-like-o"
                />,
                <IconText
                  icon={AiFillMessage}
                  text={item.feed_back.length || 0}
                  key="list-vertical-message"
                />,
                user?._id == item?.userId &&

                <Popconfirm
                  className="mt-[-30px]"
                  placement="topLeft"
                  title="Bạn có muốn xóa bình luận không"
                  onConfirm={() => handleIconClick(item?._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <IconText
                    icon={AiOutlineDelete}
                    key="list-vertical-message"
                  />,
                </Popconfirm>
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<Link to={item.href}>{item.title}</Link>}
                description={item.description}
              />
              <p className="text-medium">{item.content}</p>

              {item.feed_back.map((feedback: any) => (
                <List.Item
                  key={feedback._id}
                  actions={[
                    <IconText
                      icon={AiFillLike}
                      text={feedback.prefer || 0}
                      key="list-vertical-like-o"
                    />,
                    user?._id == feedback?.user?._id &&

                    <Popconfirm
                      className="mt-[-30px]"
                      placement="topLeft"
                      title="Bạn có muốn xóa phản hồi không"
                      onConfirm={() => deleFeeback(feedback?._id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <IconText
                        icon={AiOutlineDelete}
                        key="list-vertical-message"
                      />,
                    </Popconfirm>
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={feedback.user.image} />}
                    title={feedback.user.name}
                  />
                  {feedback.comment}
                </List.Item>

              ))}

              <div className="mt-4">
                {isFeedback && selectedCommentId === item._id ? (
                  <>
                    <div className="flex gap-5">
                      <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 w-full">
                        <label
                          htmlFor="feedback"
                          className="text-gray-500 text-ml font-medium"
                        >
                          Phản hồi
                        </label>

                        <textarea
                          id="feedback"
                          value={feedBack}
                          rows={2}
                          required
                          placeholder="Nhập phản hồi của bạn ..."
                          onChange={(e) => setFeedback(e.target.value)}
                          className="px-0 w-full text-sm text-gray-900 border-0 pt-3 focus:ring-0 focus:outline-none"
                        />
                      </div>

                      <div className="flex justify-center">
                        <div>
                          <Btn
                            label="Phản hồi"
                            onClick={() => addFeeback({ comment: feedBack, commentId: item._id })}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            </List.Item>
          </>
        )}
      />
    </>
  );
};

export default ProductComment;
