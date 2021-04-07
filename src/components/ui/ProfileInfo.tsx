import avatar from "../../assets/images/avatar.png";
import React from "react";
import styled from "styled-components";
import { deviceSize } from "../../assets/styles/theme/device";

interface Props {
  userName?: string;
}

export const ProfileInfo = ({ userName }: Props) => {
  return (
    <Container>
      <Avatar src={avatar} alt={"avatar"} />
      <Name>{userName}</Name>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  @media screen and ${deviceSize.tablet} {
    max-width: calc(100% - 200px);
    flex-direction: row-reverse;
  }
`;

const Name = styled.div`
  font-weight: 500;
  color: var(--dark-grey);
  margin: 0 0 0 12px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  @media screen and ${deviceSize.tablet} {
    margin: 0 19px 0 0;
    max-width: calc(100% - 46px);
  }
`;

const Avatar = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 90px;
  object-fit: cover;
  @media screen and ${deviceSize.tablet} {
    height: 30px;
    width: 30px;
  }
`;
