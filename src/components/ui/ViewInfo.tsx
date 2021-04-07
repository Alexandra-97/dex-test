import styled, { css } from "styled-components";
import { deviceSize } from "../../assets/styles/theme/device";
import { BASE_URL } from "../../api/baseFetch";
import { Link } from "react-router-dom";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import { BreadCrumbs } from "../Breadcrumbs";

interface Props {
  name: string;
  number?: string;
  description: { value: string | number; label: string }[];
  imageUrl?: string;
  editUrl: string;
  onDelete: () => void;
  imagePlacement?: "center" | "bottom";
  breadCrumbs: { label: string; to: string }[];
}

export const ViewInfo = ({
  name,
  number,
  description,
  imageUrl,
  editUrl,
  onDelete,
  imagePlacement = "center",
  breadCrumbs,
}: Props) => {
  return (
    <>
      <Header>
        <BreadCrumbs items={breadCrumbs} />
        <Settings>
          <Link to={editUrl}>
            <EditIcon />
          </Link>
          <DeleteIcon onClick={onDelete} />
        </Settings>
      </Header>
      <InfoContainer>
        {imageUrl ? (
          <ImageContainer imagePlacement={imagePlacement}>
            <div>
              {imageUrl && <img src={BASE_URL + imageUrl} alt={name} />}
            </div>
          </ImageContainer>
        ) : null}
        <TextInfo>
          <Name>
            {name}
            <span>{number}</span>
          </Name>
          <Description>
            {description.map(({ value, label }, index) => {
              return (
                <Item key={index}>
                  <div>{label}</div>
                  <div>{value}</div>
                </Item>
              );
            })}
          </Description>
        </TextInfo>
      </InfoContainer>
    </>
  );
};

const Header = styled.div`
  min-height: 48px;
  background: var(--white);
  border-radius: 10px 10px 0 0;
  border: 0.5px solid var(--light-grey);
  padding: 0 16px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and ${deviceSize.laptop} {
    height: 69px;
    padding: 24px 32px 24px 0;
  }
`;

const Settings = styled.div`
  display: flex;
  height: 24px;
  svg {
    height: 24px;
    width: 24px;
    &:first-child {
      margin-right: 18px;
    }
    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }
  }
`;

const InfoContainer = styled.div`
  background: linear-gradient(121.57deg, #707070 1.62%, #393939 81.02%);
  display: flex;
  flex-direction: column;
  border-radius: 0 0 10px 10px;
  @media screen and ${deviceSize.laptop} {
    flex-direction: row;
  }
`;

const ImageContainer = styled.div<{ imagePlacement?: "center" | "bottom" }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 48px 0 0;
  & > div {
    height: 90px;
    width: 90px;
  }
  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
  ${({ imagePlacement }) =>
    imagePlacement === "bottom" &&
    css`
      & > div {
        height: 112px;
        width: 143px;
      }
    `}
  @media screen and ${deviceSize.laptop} {
    margin: 0 0 0 48px;
    flex: 1;
    & > div {
      height: 210px;
      width: 210px;
    }
    ${({ imagePlacement }) =>
    imagePlacement === "bottom" &&
    css`
        align-items: flex-end;
        margin: 0;
        & > div {
          position: relative;
          height: 300px;
          width: 300px;
        }
        img {
          position: absolute;
          bottom: 0;
          height: unset;
        }
      `}
  };
  
  @media screen and ${deviceSize.laptopL} {
    ${({ imagePlacement }) =>
      imagePlacement === "bottom" &&
      css`
        & > div {
          height: 400px;
          width: 400px;
        }
      `}
  }
`;

const TextInfo = styled.div`
  flex: 2;
  color: var(--white);
  text-align: center;
  padding: 48px;
  @media screen and ${deviceSize.laptop} {
    text-align: left;
    padding: 65px;
  }
`;

const Name = styled.div`
  font-weight: 800;
  font-size: 17px;
  margin-bottom: 48px;
  word-break: break-word;
  span {
    color: var(--lightest-red);
    font-weight: 800;
    font-size: 17px;
    margin-left: 5px;
  }
  @media screen and ${deviceSize.laptop} {
    font-size: 36px;
    margin-bottom: 40px;
    span {
      font-size: 36px;
    }
  }
`;

const Description = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  @media screen and ${deviceSize.laptop} {
    gap: 54px 84px;
    grid-template-columns: 1fr 1fr;
  }
`;

const Item = styled.div`
  & > div {
    &:first-child {
      font-weight: 800;
      font-size: 17px;
      margin-bottom: 8px;
    }
    &:last-child {
      font-weight: 500;
      font-size: 15px;
    }
  }
  @media screen and ${deviceSize.laptop} {
    & > div {
      &:first-child {
        font-size: 24px;
      }
      &:last-child {
        font-size: 18px;
      }
    }
  }
`;
