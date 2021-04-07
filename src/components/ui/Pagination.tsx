import styled from "styled-components";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";
import { ReactComponent as Previous } from "../../assets/images/previous.svg";
import { ReactComponent as Next } from "../../assets/images/next.svg";

export const Pagination = (props: ReactPaginateProps) => {
  return (
    <StyledReactPaginate>
      <ReactPaginate
        {...props}
        previousLabel={<Previous />}
        nextLabel={<Next />}
      />
    </StyledReactPaginate>
  );
};

const StyledReactPaginate = styled.div`
  ul {
    list-style: none;
    li {
      display: inline-flex;
      a {
        display: flex;
        justify-content: center;
        align-items: center;
        outline: none;
        height: 40px;
        width: 40px;
        font-weight: 500;
        color: var(--grey);
      }
      &.selected {
        a {
          color: var(--white);
          background: var(--red);
          border-radius: 4px;
        }
      }
      &:hover {
        cursor: pointer;
        opacity: 0.8;
      }
    }
  }
`;
