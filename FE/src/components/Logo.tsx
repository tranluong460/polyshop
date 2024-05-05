import { useNavigate } from "react-router-dom";

type LogoProps = {
  large?: boolean;
};

const Logo = ({ large }: LogoProps) => {
  const navigate = useNavigate();

  return (
    <>
      <img
        alt="Logo"
        width={large ? 150 : 100}
        height={100}
        src="/images/logo.webp"
        onClick={() => navigate("/")}
        className="hidden md:block cursor-pointer"
      />
    </>
  );
};

export default Logo;
