import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../core/redux/store";
import { useCallback, useEffect, useMemo, useState } from "react";
import { playersSelector } from "./playersSlice";
import { useForm } from "react-hook-form";
import { useDebounce } from "../../core/hooks/useDebounce";
import { getPlayers, getTeamsFilter } from "./playersActions";
import { Loading } from "../../core/redux/loading";
import { Spinner } from "../../components/Spinner";
import { Card } from "../../components/ui/Card";
import { urls } from "../../routes/urls";
import { EmptyComponent } from "../../components/EmptyComponent";
import playersEmptyImg from "../../assets/images/playersEmpty.png";
import {
  ListLayout,
  ListLayoutFormData,
  PAGE_SIZE_OPTIONS,
} from "../../components/layouts/ListLayout";
import { CardsContainer } from "../../components/common/Cards";
import { OptionTypeBase } from "react-select";

type FormData = Pick<
  ListLayoutFormData,
  "filterName" | "pageSize" | "filterOption"
>;

export const Players = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const {
    players,
    count,
    size,
    loading,
    teamsFilter,
    loadingTeams,
  } = useSelector(playersSelector);
  const [page, setPage] = useState(1);
  const [teamInputValue, setTeamInputValue] = useState("");
  const form = useForm<FormData>({
    mode: "onBlur",
    defaultValues: { filterName: "", pageSize: PAGE_SIZE_OPTIONS[0] },
  });
  const { watch } = form;
  const pageSize = watch("pageSize");
  const filterName = watch("filterName");
  const filterOptions: OptionTypeBase = watch("filterOptions");
  const debouncedName = useDebounce({ value: filterName });
  const debouncedTeamInputValue = useDebounce({ value: teamInputValue });

  useEffect(() => {
    filterOptions?.length
      ? dispatch(
          getPlayers({
            name: debouncedName,
            pageSize: pageSize?.value,
            page,
            teamIds: filterOptions.map((item: OptionTypeBase) => item.value),
          })
        )
      : dispatch(
          getPlayers({
            name: debouncedName,
            pageSize: pageSize?.value,
            page,
          })
        );
  }, [dispatch, debouncedName, pageSize, page, filterOptions]);

  useEffect(() => {
    dispatch(getTeamsFilter({}));
  }, [dispatch]);

  const teamsOptions = useMemo(() => {
    return (
      teamsFilter &&
      teamsFilter.map(({ id, name }) => ({ value: id, label: name }))
    );
  }, [teamsFilter]);

  const onPageChange = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1);
  };

  const pageCount = useMemo(() => {
    if (count && size) {
      return Math.ceil(count / size);
    }
    return 1;
  }, [count, size]);

  const handleFilterInputChange = useCallback((value) => {
    value && setTeamInputValue(value);
  }, []);

  useEffect(() => {
    debouncedTeamInputValue &&
      dispatch(getTeamsFilter({ name: debouncedTeamInputValue, pageSize: 5 }));
  }, [dispatch, debouncedTeamInputValue]);

  return (
    <ListLayout
      form={form}
      filterOptions={teamsOptions}
      onPageChange={onPageChange}
      pageCount={pageCount}
      addItemLink={urls.players.addPlayer}
      filterLoading={loadingTeams}
      onFilterInputChange={handleFilterInputChange}
    >
      {loading !== Loading.idle ? (
        <Spinner />
      ) : players.length ? (
        <CardsContainer>
          {players.map(({ id, name, number, team, avatarUrl }, index) => (
            <Card
              key={index}
              to={urls.players.players + id}
              name={name}
              number={`#${number}`}
              description={team.toString()}
              image={avatarUrl || ""}
              imagePlacement={"bottom"}
            />
          ))}
        </CardsContainer>
      ) : (
        <EmptyComponent info={t("players.empty")} image={playersEmptyImg} />
      )}
    </ListLayout>
  );
};
