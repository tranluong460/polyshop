import { ChangeEvent, useState } from "react";

import { FiPhoneCall } from "react-icons/fi";
import { BiMessageRoundedError } from "react-icons/bi";
import { FaRegMoneyBillAlt, FaRegNewspaper } from "react-icons/fa";

import { Breadcrumb, Button, Container, Input } from "../../../components";
import { useAddContactsMutation } from "../../../api/contact";
import { message } from "antd";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [content, setContent] = useState("");

  const [createContact, resultContact] = useAddContactsMutation();

  const sendContact = () => {
    const data = {
      name,
      email,
      phone,
      address,
      content,
    };

    createContact(data)
      .unwrap()
      .then((response) => {
        message.success(response.message);
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
        setContent("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Container>
        <div className="mt-5">
          <Breadcrumb text="Hỗ trợ" />
        </div>

        <div className="border rounded-xl p-5 mt-5 bg-white">
          <div className="flex justify-center">
            <div className="text-center md:max-w-xl lg:max-w-3xl">
              <h2 className="mb-12 px-6 text-3xl font-bold">Liên hệ</h2>
            </div>
          </div>

          <div className="flex flex-wrap">
            <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:w-5/12 lg:px-6">
              <div className="relative mb-6">
                <Input
                  id="name"
                  type="name"
                  value={name}
                  label="Name"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                />
              </div>
              <div className="relative mb-6">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  label="Email"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                />
              </div>
              <div className="relative mb-6">
                <Input
                  id="phone"
                  type="phone"
                  value={phone}
                  label="Phone"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPhone(e.target.value)
                  }
                />
              </div>
              <div className="relative mb-6">
                <Input
                  id="address"
                  type="address"
                  value={address}
                  label="Address"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setAddress(e.target.value)
                  }
                />
              </div>
              <div className="relative mb-6">
                <textarea
                  className="block rounded-md px-6 pt-6 pb-1 w-full text-md text-black bg-white border appearance-none focus:outline-none focus:ring-0 invalid:border-b-1 peer"
                  id="textarea"
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setContent(e.target.value)
                  }
                  placeholder=" "
                  value={content}
                ></textarea>
                <label
                  htmlFor="textarea"
                  className="absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                >
                  Message
                </label>
              </div>

              <Button
                label="Gửi"
                onClick={sendContact}
                disabled={resultContact.isLoading}
              />
            </div>

            <div className="w-full shrink-0 grow-0 basis-auto lg:w-7/12">
              <div className="flex flex-wrap">
                <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6">
                  <div className="flex items-start">
                    <div className="shrink-0">
                      <div className="inline-block rounded-md bg-primary-100 p-4 text-primary">
                        <FiPhoneCall size={30} className="text-rose-400" />
                      </div>
                    </div>
                    <div className="ml-6 grow">
                      <p className="mb-2 font-bold dark:text-white">
                        Hỗ trợ kỹ thuật
                      </p>
                      <p className="text-neutral-500 dark:text-neutral-200">
                        tranluong460@gmail.com
                      </p>
                      <p className="text-neutral-500 dark:text-neutral-200">
                        +84 367-370-371
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6">
                  <div className="flex items-start">
                    <div className="shrink-0">
                      <div className="inline-block rounded-md bg-primary-100 p-4 text-primary">
                        <FaRegMoneyBillAlt
                          size={30}
                          className="text-rose-400"
                        />
                      </div>
                    </div>
                    <div className="ml-6 grow">
                      <p className="mb-2 font-bold dark:text-white">
                        Câu hỏi bán hàng
                      </p>
                      <p className="text-neutral-500 dark:text-neutral-200">
                        tranluong460@gmail.com
                      </p>
                      <p className="text-neutral-500 dark:text-neutral-200">
                        +84 367-370-371
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6">
                  <div className="align-start flex">
                    <div className="shrink-0">
                      <div className="inline-block rounded-md bg-primary-100 p-4 text-primary">
                        <FaRegNewspaper size={30} className="text-rose-400" />
                      </div>
                    </div>
                    <div className="ml-6 grow">
                      <p className="mb-2 font-bold dark:text-white">Press</p>
                      <p className="text-neutral-500 dark:text-neutral-200">
                        tranluong460@gmail.com
                      </p>
                      <p className="text-neutral-500 dark:text-neutral-200">
                        +84 367-370-371
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6">
                  <div className="align-start flex">
                    <div className="shrink-0">
                      <div className="inline-block rounded-md bg-primary-100 p-4 text-primary">
                        <BiMessageRoundedError
                          size={30}
                          className="text-rose-400"
                        />
                      </div>
                    </div>
                    <div className="ml-6 grow">
                      <p className="mb-2 font-bold dark:text-white">
                        Báo cáo lỗi
                      </p>
                      <p className="text-neutral-500 dark:text-neutral-200">
                        tranluong460@gmail.com
                      </p>
                      <p className="text-neutral-500 dark:text-neutral-200">
                        +84 367-370-371
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ContactPage;
