import React, { ReactNode, useCallback, useMemo, useRef } from "react";
import styled, { css } from "styled-components";
import { ProfileInfo } from "./ProfileInfo";
import { deviceSize } from "../../assets/styles/theme/device";
import { urls } from "../../routes/urls";
import { ReactComponent as TeamsIcon } from "../../assets/images/teams.svg";
import { ReactComponent as PlayersIcon } from "../../assets/images/players.svg";
import { ReactComponent as SignOutIcon } from "../../assets/images/signOut.svg";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { useOnClickOutside } from "../../core/hooks/useOnClickOutSide";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../core/redux/store";
import { authActions } from "../../modules/auth/authSlice";

interface MenuItem {
  name: string;
  to: string;
  icon: ReactNode;
  onClick?: () => void;
}

interface Props {
  isMenuOpen: boolean;
  closeMenuHandler: () => void;
}

export const SideMenu = ({ isMenuOpen, closeMenuHandler }: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const ref = useRef(null);

  useOnClickOutside(ref, () => closeMenuHandler(), !isMenuOpen);

  const handleLogout = useCallback(() => {
    dispatch(authActions.logout());
  }, [dispatch]);

  const nav = useMemo<MenuItem[]>(
    () => [
      {
        name: t(`sideMenu.teams`),
        to: urls.teams.teams,
        icon: <TeamsIcon />,
        onClick: closeMenuHandler,
      },
      {
        name: t("sideMenu.players"),
        to: urls.players.players,
        icon: <PlayersIcon />,
        onClick: closeMenuHandler,
      },
      {
        name: t("sideMenu.signOut"),
        to: urls.auth.login,
        icon: <SignOutIcon />,
        onClick: handleLogout,
      },
    ],
    [t, handleLogout, closeMenuHandler]
  );

  return (
    <Container isMenuOpen={isMenuOpen}>
      <Menu isMenuOpen={isMenuOpen} ref={ref}>
        <ProfileInfo userName={"John Smith"} />
        <Divider />
        <NavList>
          {nav.map(({ name, icon, to, onClick }, index) => (
            <NavItem key={index}>
              <NavLink to={to} onClick={onClick}>
                <NavIcon>{icon}</NavIcon>
                <NavName>{name}</NavName>
              </NavLink>
            </NavItem>
          ))}
        </NavList>
      </Menu>
    </Container>
  );
};

const Container = styled.nav<{ isMenuOpen: boolean }>`
  position: absolute;
  top: 62px;
  height: calc(100% - 62px);
  width: 100%;
  background-color: rgba(65, 65, 65, 0.6);
  display: none;
  z-index: 9999;
  ${({ isMenuOpen }) =>
    isMenuOpen &&
    css`
      display: block;
    `}
  @media screen and ${deviceSize.tablet} {
    position: relative;
    top: 0;
    max-width: 140px;
    height: unset;
    flex: 1;
    display: block;
  }
`;

const Menu = styled.div<{ isMenuOpen: boolean }>`
  height: 100%;
  background-color: var(--white);
  width: 200px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow-y: auto;
  position: absolute;
  ${({ isMenuOpen }) =>
    isMenuOpen &&
    css`
      @keyframes mymove {
        from {
          left: -200px;
        }
        to {
          left: 0;
        }
      }
      animation: mymove 0.3s;
    `}
  @media screen and ${deviceSize.tablet} {
    width: 100%;
    padding: 35px;
    & > div {
      display: none;
    }
    ${({ isMenuOpen }) =>
      isMenuOpen &&
      css`
        animation: none;
      `}
  }
`;

const Divider = styled.div`
  min-height: 1px;
  background-color: var(--light-grey);
  width: calc(100% + 40px);
  margin: 20px 0 30px -20px;
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const NavIcon = styled.div`
  margin: 0 8px 0 0;
  width: 24px;
  height: 24px;
  @media screen and ${deviceSize.tablet} {
    margin: 0 0 8px 0;
  }
`;

const NavName = styled.div`
  font-weight: 500;
  font-size: 13px;
  color: var(--light-grey);
  @media screen and ${deviceSize.tablet} {
    font-size: 12px;
  }
`;

const NavItem = styled.li`
  margin-bottom: 33px;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
  &:last-child {
    margin-bottom: 0;
    margin-top: auto;
    div {
      color: var(--lightest-red);
    }
  }
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    &.active {
      ${NavIcon} {
        svg {
          path {
            fill: var(--red);
          }
        }
      }
      ${NavName} {
        color: var(--red);
      }
    }
  }
  @media screen and ${deviceSize.tablet} {
    margin-bottom: 40px;
    a {
      flex-direction: column;
    }
  }
`;
