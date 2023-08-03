import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Avatar, List, Space, Rate } from "antd";

import { AiFillLike, AiFillMessage } from "react-icons/ai";

import { Button } from "../../..";
import { ICommentsProduct } from "../../../../interface";

type ProductCommentProps = {
  comments: ICommentsProduct[];
};

const ProductComment = ({ comments }: ProductCommentProps) => {
  const [isFeedback, setIsFeedback] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<
    string | undefined
  >("");
  const [comment, setComment] = useState("");
  const [feedBack, setFeedback] = useState("");

  const listComment = comments.map((cmt) => ({
    href: "/profile",
    _id: cmt._id,
    prefer: cmt.prefer,
    feed_back: cmt.feed_back,
    title: cmt.user.name,
    avatar: cmt.user.image,
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

  const IconText = ({ icon, text }: { icon: React.FC; text: number }) => (
    <Space className="hover:text-rose-300 text-base">
      {React.createElement(icon)}
      {text}
    </Space>
  );

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

              <textarea
                id="comment"
                value={comment}
                rows={5}
                required
                placeholder={"Nhập bình luận của bạn ..."}
                onChange={(e) => setComment(e.target.value)}
                className="px-0 w-full text-sm text-gray-900 border-0 pt-3 focus:ring-0 focus:outline-none"
              />
            </div>

            <div className="flex justify-center">
              <div>
                <Button label="Bình luận" onClick={() => alert("Bình luận")} />
              </div>
            </div>
          </>
        }
        renderItem={(item) => (
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
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<Link to={item.href}>{item.title}</Link>}
                description={item.description}
              />
              <p className="text-medium">{item.content}</p>

              {item.feed_back.map((feedback) => (
                <List.Item
                  key={feedback._id}
                  actions={[
                    <IconText
                      icon={AiFillLike}
                      text={feedback.prefer || 0}
                      key="list-vertical-like-o"
                    />,
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
                          <Button
                            label="Phản hồi"
                            onClick={() => alert(item._id)}
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
