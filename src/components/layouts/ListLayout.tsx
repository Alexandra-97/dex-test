import { FC } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { OptionTypeBase } from "react-select";
import { Controller, UseFormMethods } from "react-hook-form";
import { ReactPaginateProps } from "react-paginate";
import styled from "styled-components";
import { deviceSize } from "../../assets/styles/theme/device";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { SelectOptions, StyledSelect } from "../ui/Select";
import { Pagination } from "../ui/Pagination";
import { Loading } from "../../core/redux/loading";

export const PAGE_SIZE_OPTIONS = [
  { value: "6", label: "6" },
  { value: "12", label: "12" },
  { value: "24", label: "24" },
];

export interface ListLayoutFormData {
  filterName: string;
  pageSize: OptionTypeBase;
  filterOption?: OptionTypeBase;
}

interface Props extends Pick<ReactPaginateProps, "onPageChange" | "pageCount"> {
  form: UseFormMethods<ListLayoutFormData>;
  filterOptions?: SelectOptions;
  addItemLink: string;
  onFilterInputChange?: (value: string) => void;
  filterLoading?: Loading;
}

export const ListLayout: FC<Props> = ({
  children,
  form,
  filterOptions,
  onPageChange,
  pageCount,
  addItemLink,
  onFilterInputChange,
  filterLoading,
}) => {
  const { t } = useTranslation();
  const { register, control } = form;

  return (
    <Container>
      <Header>
        <Filters>
          <Input search={true} name={"filterName"} ref={register} />
          {filterOptions && (
            <Controller
              control={control}
              isLoading={filterLoading === Loading.pending}
              defaultValue={""}
              isMulti={true}
              as={
                <StyledSelect
                  options={filterOptions}
                  onInputChange={onFilterInputChange}
                  isClosable={false}
                />
              }
              name={"filterOptions"}
            />
          )}
        </Filters>
        <StyledLink to={addItemLink}>
          <Button>{t("common.add")}</Button>
        </StyledLink>
      </Header>
      <CardsContainer>{children}</CardsContainer>
      <Footer>
        <Pagination
          pageCount={pageCount}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          onPageChange={onPageChange}
        />
        <Controller
          control={control}
          as={
            <StyledSelect
              options={PAGE_SIZE_OPTIONS}
              size={"small"}
              menuPlacement={"top"}
            />
          }
          name={"pageSize"}
        />
      </Footer>
    </Container>
  );
};

const Container = styled.div`
  padding: 0 12px;
  flex-direction: column;
  display: flex;
  flex: 1;
  @media screen and ${deviceSize.tablet} {
    padding: 0;
  }
`;

const Header = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and ${deviceSize.mobileL} {
    margin-bottom: 32px;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    button {
      max-width: 104px;
    }
  }
`;

const Filters = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0 16px 0;
  & > div:nth-child(2) {
    margin: 16px 0 0 0;
  }
  @media screen and ${deviceSize.mobileL} {
    margin: 0 24px 0 0;
    flex-direction: row;
    align-items: flex-start;
    & > div:nth-child(2) {
      margin: 0 0 0 24px;
    }
  }
`;

const StyledLink = styled(Link)`
  width: 100%;
  max-width: 366px;
  @media screen and ${deviceSize.mobileL} {
    max-width: 104px;
  }
`;

const CardsContainer = styled.div`
  flex: 1;
`;

const Footer = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  @media screen and ${deviceSize.mobileL} {
    margin-top: 32px;
  }
`;
