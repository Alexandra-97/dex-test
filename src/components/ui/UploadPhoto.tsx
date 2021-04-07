import styled from "styled-components";
import addPhotoImg from "../../assets/images/addPhoto.png";
import { ChangeEvent, forwardRef, InputHTMLAttributes, useState } from "react";
import { deviceSize } from "../../assets/styles/theme/device";
import { BASE_URL } from "../../api/baseFetch";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  initialPhoto?: string;
}

export const UploadPhoto = forwardRef<HTMLInputElement, Props>(
  ({ initialPhoto, ...rest }, ref) => {
    const [selectedFile, setSelectedFile] = useState<File>();
    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setSelectedFile(event.target.files?.[0]);
    };

    return (
      <Container>
        <SelectedPhoto>
          {(selectedFile || initialPhoto) && (
            <img
              alt={"uploadedImage"}
              src={
                (selectedFile && URL.createObjectURL(selectedFile)) ||
                BASE_URL + initialPhoto
              }
            />
          )}
        </SelectedPhoto>
        <input
          type={"file"}
          title={""}
          onChange={changeHandler}
          {...rest}
          ref={ref}
        />
      </Container>
    );
  }
);

const Container = styled.div`
  max-width: 185px;
  width: 100%;
  aspect-ratio: 336/261;
  position: relative;
  @media screen and ${deviceSize.tablet} {
    max-width: 336px;
  }
  &:hover {
    opacity: 0.8;
  }
  input {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    opacity: 0;
    height: 100%;
    width: 100%;
    &:hover {
      cursor: pointer;
    }
  }
`;

const SelectedPhoto = styled.div`
  height: 100%;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: contain;
    border-radius: 10px;
  }
  &:after {
    content: "";
    position: absolute;
    background: rgba(156, 156, 156, 0.6) url(${addPhotoImg}) no-repeat center;
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
`;
