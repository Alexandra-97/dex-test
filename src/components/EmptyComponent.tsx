import styled from "styled-components";
import { deviceSize } from "../assets/styles/theme/device";
import { useTranslation } from "react-i18next";
import errorImg from "../assets/images/404.png";

interface Props {
  info?: string;
  image?: string;
}

export const EmptyComponent = ({ info, image }: Props) => {
  const { t } = useTranslation();

  return (
    <Container>
      <Wrapper>
        <ImageContainer>
          <img src={image || errorImg} alt={"emptyImg"} />
        </ImageContainer>
        <Text>
          <div>{t("common.empty")}</div>
          <div>{info || t("common.notFound")}</div>
        </Text>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  @media screen and ${deviceSize.tablet} {
    align-items: center;
  }
`;

const Wrapper = styled.div`
  background: var(--white);
  max-width: 556px;
  max-height: 434px;
  width: 100%;
  height: 100%;
  padding: 48px;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  @media screen and ${deviceSize.laptop} {
    max-height: 570px;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  img {
    max-width: 375px;
    max-height: 225px;
    object-fit: contain;
    width: 100%;
    @media screen and ${deviceSize.laptop} {
      max-height: 300px;
    }
  }
`;

const Text = styled.div`
  text-align: center;
  & > div {
    &:first-child {
      font-weight: 800;
      font-size: 17px;
      color: var(--lightest-red);
      margin: 16px 0;
    }
    &:last-child {
      font-size: 15px;
      color: var(--grey);
    }
    @media screen and ${deviceSize.laptop} {
      &:first-child {
        font-size: 36px;
        margin: 48px 0;
      }
      &:last-child {
        font-size: 24px;
      }
    }
  }
`;
