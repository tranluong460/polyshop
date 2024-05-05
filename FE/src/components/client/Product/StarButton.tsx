import { Rate } from "antd";

type StarButtonProps = {
  star: number | undefined;
  disabled?: boolean;
  setStar?: (star: number) => void;
};

const StarButton = ({ star, disabled, setStar }: StarButtonProps) => {
  return (
    <>
      <Rate
        allowHalf
        disabled={disabled}
        defaultValue={star}
        onChange={setStar}
      />
    </>
  );
};

export default StarButton;
