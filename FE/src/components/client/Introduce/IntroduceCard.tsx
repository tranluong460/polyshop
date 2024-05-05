import { IIntroduce } from "../../../interface";

type Props = {
  item: IIntroduce;
  order?: boolean;
};

const IntroduceCard = ({ item, order }: Props) => {
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-evenly">
        <div
          className={`w-full lg:w-2/3 ${
            order ? "order-last lg:pl-5 pl-0 lg:mt-0 mt-10" : "order-first"
          } `}
        >
          <h2 className="text-base font-medium text-rose-500 uppercase py-5">
            {item.title}
          </h2>

          <h3 className="text-3xl mb-4 uppercase">{item.label}</h3>

          <p className="mb-4 pr-5 text-base font-normal text-gray-500 text-justify">
            {item.text}
          </p>

          <div className="flex gap-10 pt-2 pr-0 md:pr-10 j">
            {item.description.map((description, i: number) => (
              <div key={i} className="text-center">
                <h4 className="text-rose-500 mb-3 font-bold text-2xl">
                  {description.label}
                </h4>
                <p className="mb-0 text-base font-normal text-gray-500">
                  {description.letter}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`mg:ml-5 mt-4 lg:mt-5 ${
            order ? "lg:order-first order-last" : "order-last"
          }`}
        >
          <img
            src="/images/introduce/introduce-1.jpg"
            alt="Introduce"
            height={100}
            className="rounded-xl lg:w-96"
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
};

export default IntroduceCard;
