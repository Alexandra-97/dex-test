import styled from "styled-components";
import { deviceSize } from "../../../assets/styles/theme/device";
import { Player } from "../../../api/dto/Player";
import { useTranslation } from "react-i18next";
import { getAge } from "../../../core/helpers/getAge";
import { BASE_URL } from "../../../api/baseFetch";

interface Props {
  players: Player[];
}

export const Roster = ({ players }: Props) => {
  const { t } = useTranslation();

  return (
    <Container>
      <Header>{t("teams.roster")}</Header>
      <StyledTable>
        <thead>
          <tr>
            <th>#</th>
            <th>{t("players.player")}</th>
            <th>{t("players.height")}</th>
            <th>{t("players.weight")}</th>
            <th>{t("players.age")}</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td>{player.number || "-"}</td>
              <PlayerTd>
                <Avatar>
                  {player.avatarUrl ? (
                    <img src={BASE_URL + player.avatarUrl} alt={player.name} />
                  ) : null}
                </Avatar>
                <Info>
                  <div>{player.name}</div>
                  <div>{player.position}</div>
                </Info>
              </PlayerTd>
              <td>{player.height} cm</td>
              <td>{player.weight} kg</td>
              <td>{getAge(player.birthday)}</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  background: var(--white);
  border: 0.5px solid var(--light-grey);
  border-radius: 10px;
  margin-top: 16px;
  @media screen and ${deviceSize.laptop} {
    margin-top: 24px;
  }
`;
const Header = styled.div`
  height: 48px;
  padding: 12px 16px;
  font-weight: 500;
  font-size: 15px;
  color: var(--grey);
  border-bottom: 0.5px solid var(--light-grey);
  @media screen and ${deviceSize.laptop} {
    height: 54px;
    padding: 14px 34px;
    font-size: 18px;
  }
`;

const StyledTable = styled.table`
  table-layout: fixed;
  width: 100%;
  color: var(--grey);
  border-spacing: 0;
  thead {
    tr {
      height: 36px;
      th {
        font-weight: 500;
        font-size: 15px;
        padding: 0 10px;
        &:nth-child(n) {
          width: 10%;
        }
        &:nth-child(2) {
          width: auto;
          text-align: left;
        }
        &:nth-child(n + 3) {
          display: none;
        }
        border-bottom: 0.5px solid var(--light-grey);
      }
      @media screen and ${deviceSize.laptop} {
        height: 40px;
        th {
          &:nth-child(n + 3) {
            display: table-cell;
          }
        }
      }
    }
  }
  tbody {
    tr {
      height: 56px;
      td {
        font-weight: 500;
        border-bottom: 0.5px solid var(--light-grey);
        font-size: 13px;
        padding: 0 10px;
        &:nth-child(n) {
          text-align: center;
        }
        &:nth-child(2) {
          text-align: left;
        }
        &:nth-child(n + 3) {
          display: none;
        }
      }
      &:last-child {
        td {
          border-bottom: none;
        }
      }
      @media screen and ${deviceSize.laptop} {
        td {
          font-size: 14px;
          &:nth-child(n + 3) {
            display: table-cell;
          }
        }
      }
    }
  }
`;

const PlayerTd = styled.td`
  display: flex;
  align-items: center;
  height: inherit;
`;

const Avatar = styled.div`
  height: 40px;
  width: 40px;
  min-width: 40px;
  margin-right: 16px;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 90px;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 56px);
  & > div {
    &:first-child {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &:last-child {
      color: var(--light-grey);
      margin-top: 2px;
    }
  }
`;
