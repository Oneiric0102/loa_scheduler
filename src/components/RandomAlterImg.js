import styled from "@emotion/styled/macro";
import image1 from "../asset/01_물줘콩.png";
import image2 from "../asset/02_촉촉콩.png";
import image3 from "../asset/03_노래콩.png";
import image4 from "../asset/04_냠냠콩.png";
import image5 from "../asset/05_꺼억콩.png";
import image6 from "../asset/06_잘자콩.png";
import image7 from "../asset/07_도망콩.png";
import image8 from "../asset/08_츄릅콩.png";
import image9 from "../asset/09_씨익콩.png";
import image10 from "../asset/10_더줘콩.png";
import image11 from "../asset/11_뿅콩.png";
import image12 from "../asset/12_감사콩.png";

const AlterImg = styled.img`
  width: 50%;
  margin-top: 3rem;
`;
export default function RandomAlterImg() {
  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
    image11,
    image12,
  ];

  return <AlterImg src={images[Math.floor(Math.random() * images.length)]} />;
}
