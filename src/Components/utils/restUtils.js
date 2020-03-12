import HttpStatus from "http-status";
import history from "../../history";
import { toastr } from "react-redux-toastr";

export const tokenName = "auth-token-amplitude";
export const SPOTIFY_API_URL = "https://api.spotify.com/v1";

class Warning extends Error {
  constructor(message, error, status = 0) {
    super(message, status);
    if (Error.captureStackTrace) Error.captureStackTrace(this, Warning);

    this.name = "Warning";
    this.message = message;
    this.status = status;
    this.error = error;
  }
}

class ErrorApp extends Error {
  constructor(message, error, status = 0) {
    super(message, status);
    if (Error.captureStackTrace) Error.captureStackTrace(this, ErrorApp);

    this.name = "Error";
    this.message = message;
    this.status = status;
    this.error = error;
  }
}

export const reqGetJsonToken = () =>
  localStorage.getItem(tokenName)
    ? {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem(tokenName)
        }
      }
    : { method: "GET" };

export const reqPostJsonToken = () =>
  localStorage.getItem(tokenName)
    ? {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem(tokenName)
        }
      }
    : {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        }
      };

export const reqPostLoginJsonToken = () =>
  localStorage.getItem(tokenName)
    ? {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem(tokenName)
        }
      }
    : {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        }
      };

export const reqDeleteJsonToken = () =>
  localStorage.getItem(tokenName)
    ? {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem(tokenName)
        }
      }
    : {
        method: "DELETE",
        headers: {
          "Content-type": "application/json"
        }
      };

export const reqPutJsonToken = () =>
  localStorage.getItem(tokenName)
    ? {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem(tokenName)
        }
      }
    : {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        }
      };

export const reqPutJsonTokenAuth = token =>
  token
    ? {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token
        }
      }
    : {
        method: "PUT",
        headers: {
          "Content-type": "application/json"
        }
      };

export const treatingUnauthorized = resp => {
  if (resp && resp.error && resp.error.status === HttpStatus.UNAUTHORIZED) {
    localStorage.removeItem(tokenName);

    console.log("Erro 403");
    history.push("/login");
    throw new Warning(
      "Sua sessão expirou, para continuar faça novamente o login.",
      resp.message
    );
  }

  return resp;
};

const genericError = resp => {
  if (resp.status === HttpStatus.BAD_REQUEST) {
    return resp.json().then(resp => {
      if (resp.message) throw new ErrorApp(resp.message, resp.httpStatusCode);
      else if (resp.mensagem)
        throw new ErrorApp(resp.mensagem, resp.httpStatusCode);
      else
        throw new ErrorApp(
          "Ocorreu um erro. Por favor, tente novamente.",
          resp.httpStatusCode
        );
    });
  } else if (
    resp.status === HttpStatus.INTERNAL_SERVER_ERROR ||
    resp.status === HttpStatus.BAD_GATEWAY
  ) {
    throw new ErrorApp(
      "Ocorreu um erro. Por favor, tente novamente.",
      resp.status
    );
  }
  return resp;
};

const forbidden = resp => {
  if (resp.status === HttpStatus.FORBIDDEN) {
    console.log("403");
    throw new ErrorApp();
  }
  return resp;
};

const badRequestError = resp => {
  if (resp.status === HttpStatus.BAD_REQUEST) {
    return resp.json().then(resp => {
      if (resp.message) throw new ErrorApp(resp.message, resp.httpStatusCode);
      else if (resp.mensagem)
        throw new ErrorApp(resp.mensagem, resp.httpStatusCode);
      else
        throw new ErrorApp(
          "Ocorreu um erro. Por favor, tente novamente.",
          resp.httpStatusCode
        );
    });
  } else if (
    resp.status === HttpStatus.INTERNAL_SERVER_ERROR ||
    resp.status === HttpStatus.BAD_GATEWAY
  ) {
    throw new ErrorApp(
      "Ocorreu um erro. Por favor, tente novamente.",
      resp.status
    );
  }
  return resp;
};

const notFond = resp => {
  if (
    resp &&
    (resp.errorCode === HttpStatus.NOT_FOUND.toString() ||
      resp.status === HttpStatus.NOT_FOUND)
  ) {
    if (resp.message) {
      throw new Warning(resp.message, HttpStatus.NOT_FOUND);
    } else
      throw new Warning("A busca realizada não encontrou nenhum registro.");
  }
  return resp;
};

const noContent = resp => {
  if (
    resp.status === HttpStatus.NO_CONTENT ||
    resp.status === HttpStatus.CREATED
  ) {
    return resp;
  } else {
    return resp.json();
  }
};

const errorCode = resp => {
  if (resp && resp.errorCode) {
    throw new ErrorApp(resp.message, resp.httpStatusCode);
  } else if (resp && resp.mensagem) {
    throw new ErrorApp(resp.mensagem);
  } else if (resp && resp.errors != null && resp.errors.length > 0) {
    throw new ErrorApp("Campos obrigatórios não preenchidos.");
  }
  return resp;
};

export const catchError = (error, treatment, isErro) => {
  if (treatment) {
    treatment(error);
    isErro = !isErro;
  }

  if (isErro) {
    if (error.message === "Failed to fetch")
      toastr.error("Opss", "Ocorreu um erro. Por favor, tente novamente.");
    else if (error.name === "Warning") toastr.warning("Aviso", error.message);
    else if (error.message) toastr.error("Opss", error.message);
    else toastr.error("Opss", "Ocorreu um erro. Por favor, tente novamente.");
  }
};

export const fetchSecurity = (
  url,
  request,
  resolver = resp => resp,
  treatment,
  isErro = true
) => {
  return fetch(url, request)
    .then(resp => genericError(resp))
    .then(resp => forbidden(resp))
    .then(resp => noContent(resp))
    .then(resp => treatingUnauthorized(resp))
    .then(resp => notFond(resp))
    .then(resp => badRequestError(resp))
    .then(resp => errorCode(resp))
    .then(resp => resolver(resp))
    .catch(error => catchError(error, treatment, isErro));
};

export const fetchFileSecurity = (url, request, resolver, treatment) => {
  return fetch(url, request)
    .then(resp => genericError(resp))
    .then(resp => forbidden(resp))
    .then(resp => treatingUnauthorized(resp))
    .then(resp => notFond(resp))
    .then(resp => badRequestError(resp))
    .then(resp => errorCode(resp))
    .then(resp => resolver(resp))
    .catch(error => catchError(error, treatment));
};

export const fillURL = (location, ...path) => {
  let locationPath = location.pathname;

  path.map(url => {
    locationPath = locationPath.replace(url, "");
    return locationPath;
  });

  return locationPath;
};

export const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

export const fileToB64 = file => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    return reader.result;
  };
  reader.onerror = error => {
    console.log("Error: ", error);
  };
};

export const windowOpenFile = document => {
  let file = b64toBlob(document, "application/pdf");
  const fileURL = URL.createObjectURL(file);
  window.open(fileURL);
};
