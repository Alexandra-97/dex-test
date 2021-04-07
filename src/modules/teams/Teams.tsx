import { Card } from "../../components/ui/Card";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../core/redux/store";
import { useEffect, useMemo, useState } from "react";
import { getTeams } from "./teamsActions";
import { teamsSelector } from "./teamsSlice";
import { useTranslation } from "react-i18next";
import {
  ListLayout,
  ListLayoutFormData,
  PAGE_SIZE_OPTIONS,
} from "../../components/layouts/ListLayout";
import { useForm } from "react-hook-form";
import { useDebounce } from "../../core/hooks/useDebounce";
import { urls } from "../../routes/urls";
import { Loading } from "../../core/redux/loading";
import { Spinner } from "../../components/Spinner";
import { EmptyComponent } from "../../components/EmptyComponent";
import teamEmptyImg from "../../assets/images/teamsEmpty.png";
import { CardsContainer } from "../../components/common/Cards";

type FormData = Pick<ListLayoutFormData, "filterName" | "pageSize">;

export const Teams = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { teams, count, size, loading } = useSelector(teamsSelector);
  const [page, setPage] = useState(1);
  const form = useForm<FormData>({
    mode: "onBlur",
    defaultValues: { filterName: "", pageSize: PAGE_SIZE_OPTIONS[0] },
  });
  const { watch } = form;
  const pageSize = watch("pageSize");
  const filterName = watch("filterName");
  const debouncedName = useDebounce({ value: filterName });

  useEffect(() => {
    dispatch(
      getTeams({ name: debouncedName, pageSize: pageSize?.value, page })
    );
  }, [dispatch, debouncedName, pageSize, page]);

  const onPageChange = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1);
  };

  const pageCount = useMemo(() => {
    if (count && size) {
      return Math.ceil(count / size);
    }
    return 1;
  }, [count, size]);

  return (
    <ListLayout
      form={form}
      onPageChange={onPageChange}
      pageCount={pageCount}
      addItemLink={urls.teams.addTeam}
    >
      {loading !== Loading.idle ? (
        <Spinner />
      ) : teams.length ? (
        <CardsContainer>
          {teams.map(({ id, name, foundationYear, imageUrl }, index) => (
            <Card
              key={index}
              to={urls.teams.teams + id}
              name={name}
              description={`${t("teams.foundationYear")}: ${foundationYear}`}
              image={imageUrl as string}
            />
          ))}
        </CardsContainer>
      ) : (
        <EmptyComponent info={t("teams.empty")} image={teamEmptyImg} />
      )}
    </ListLayout>
  );
};
