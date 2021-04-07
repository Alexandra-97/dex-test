import { CustomError, Errors } from "../core/helpers/errors";
import queryString from "query-string";

type HttpMethods = "GET" | "POST" | "PUT" | "DELETE";

export const BASE_URL = "http://dev.trainee.dex-it.ru";

interface Params<P> {
  url: string;
  method: HttpMethods;
  headers?: HeadersInit;
  queryParams?: P;
  body?: BodyInit;
}

export const baseFetch = async <P extends {}, R>({
  url,
  method = "GET",
  headers = {},
  queryParams,
  body,
}: Params<P>): Promise<R> => {
  const addTokenToHeaders = (headers: HeadersInit): HeadersInit => {
    const user = localStorage.getItem("user");
    const userToken = user ? JSON.parse(user)?.token : "";

    return userToken
      ? { ...headers, Authorization: `Bearer ${userToken}` }
      : headers;
  };

  const queryUrl = new URL(BASE_URL + url);
  queryUrl.search =
    (method === "GET" || method === "DELETE") && queryParams
      ? queryString.stringify(queryParams)
      : "";

  const response = await fetch(queryUrl.toString(), {
    headers: addTokenToHeaders(headers),
    method,
    body,
  });

  if (!response.ok) {
    switch (response.status) {
      case 401:
      case 403:
        throw new CustomError(Errors.authError);
      case 409:
        throw new CustomError(Errors.conflictError);
      default:
        throw new CustomError(Errors.badRequest);
    }
  }

  return response.json();
};
