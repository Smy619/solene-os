import LogoImg from "@assets/img/logo-os.svg";

export default function OSLogo({ size = 72 }) {
  return (
    <div
      className="os-logo-wrapper"
      style={{
        width: size,
        height: size,
      }}
    >
      <img src={LogoImg} alt="Solene Logo" className="os-logo-img" />
    </div>
  );
}

