import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import { deviceSize } from "../../assets/styles/theme/device";

export const StyledToastContainer = () => {
  return <StyledContainer />;
};

const StyledContainer = styled(ToastContainer)`
  @media screen and ${deviceSize.mobileL} {
    width: 470px;
  }
  .Toastify__toast--default {
    background: var(--light-red);
  }
  .Toastify__toast {
    min-height: 40px;
    box-shadow: none;
    padding: 8px 16px;
  }
  .Toastify__toast-body {
    font-weight: 500;
    font-size: 16px;
    color: var(--white);
    padding: 0;
    word-break: break-word;
  }
  .Toastify__progress-bar {
    visibility: hidden;
  }
`;
