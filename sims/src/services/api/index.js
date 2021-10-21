import axios from "axios";
import { COOKIE, getCookie, deleteCookie, createCookie } from "../cookie";
import * as APIConstants from "./constants";
import moment from "moment";

/**
 * @name fetchApi
 * @description will fet the data based on params supplied
 * @param {string} param
 * @param {string} method
 * @param {object} variables
 */
export const fetchApi = (param = null, method = null, variables = null) => {
  if (getCookie(COOKIE.ID_TOKEN))
    createCookie(
      COOKIE.ID_TOKEN,
      getCookie(COOKIE.ID_TOKEN),
      APIConstants.CTimeOut
    );
  else {
    deleteCookie(COOKIE.ID_TOKEN);
    deleteCookie(COOKIE.NAME);
    deleteCookie(COOKIE.UUID);
    deleteCookie(COOKIE.CHANGE_PASSWORD);
    deleteCookie(COOKIE.COMPANY_NAME);
    deleteCookie(COOKIE.PERMISSION);
    deleteCookie(COOKIE.IS_MASTER);
    deleteCookie(COOKIE.ID_PORTAL);
    deleteCookie(COOKIE.LOGO);
    window.location.assign("/");
  }
  return axios({
    method: method,
    url: `${
      process.env.NODE_ENV === "development"
        ? APIConstants.ApiUrl
        : process.env.NODE_ENV === "test"
        ? APIConstants.TestUrl
        : APIConstants.LiveUrl
      // process.env.NODE_ENV == "development"
      //   ? // : "http://127.0.0.1:8000/"
      //     // : "http://api.stockex.ho.opspl.com/"
      //     "https://api.stockex.opspldev.in/"
      //   : "https://api.stockex.opspldev.in/"
    }${param}`,
    data: variables,
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + getCookie(COOKIE.ID_TOKEN),
      // code: getCookie(COOKIE.CODE),
      //location: getCookie(COOKIE.FARM),
    },
  })
    .then((res) => res.data)
    .catch((err) => {
      if (err.response) {
        let { status } = err.response;
        if (status === 401) {
          deleteCookie(COOKIE.ID_TOKEN);
          deleteCookie(COOKIE.NAME);
          deleteCookie(COOKIE.UUID);
          deleteCookie(COOKIE.CHANGE_PASSWORD);
          deleteCookie(COOKIE.COMPANY_NAME);
          deleteCookie(COOKIE.PERMISSION);
          deleteCookie(COOKIE.IS_MASTER);
          deleteCookie(COOKIE.ID_PORTAL);
          deleteCookie(COOKIE.LOGO);
          window.location.assign("/");
        } else if (status === 400 || status === 404) {
          if (err.response.data) {
            if (err.response.data.response) {
              return err.response.data;
            } else if (
              err.response.data.violations &&
              err.response.data.violations[0] &&
              err.response.data.violations[0].message
            ) {
              return err.response.data;
            } else if (err.response.data) {
              return err.response.data;
            } else {
              return false;
            }
          } else if (err.response.code) {
            return err.response;
          } else {
            return false;
          }
        }
      } else return false;
    });
};
export const fetchApi2 = (param = null, method = null, variables = null) => {
  if (getCookie(COOKIE.ID_TOKEN))
    createCookie(
      COOKIE.ID_TOKEN,
      getCookie(COOKIE.ID_TOKEN),
      APIConstants.CTimeOut
    );
  else {
    deleteCookie(COOKIE.ID_TOKEN);
    deleteCookie(COOKIE.NAME);
    deleteCookie(COOKIE.UUID);
    deleteCookie(COOKIE.CHANGE_PASSWORD);
    deleteCookie(COOKIE.COMPANY_NAME);
    deleteCookie(COOKIE.PERMISSION);
    deleteCookie(COOKIE.IS_MASTER);
    deleteCookie(COOKIE.ID_PORTAL);
    deleteCookie(COOKIE.LOGO);
    window.location.assign("/");
  }
  return axios({
    method: method,
    url: `${
      process.env.NODE_ENV === "development"
        ? APIConstants.ApiUrl
        : process.env.NODE_ENV === "test"
        ? APIConstants.TestUrl
        : APIConstants.LiveUrl
      // process.env.NODE_ENV == "development"
      //   ? // : "http://127.0.0.1:8000/"
      //     // : "http://api.stockex.ho.opspl.com/"
      //     "https://api.stockex.opspldev.in/"
      //   : "https://api.stockex.opspldev.in/"
    }${param}`,
    data: variables,
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + getCookie(COOKIE.ID_TOKEN),
      // code: getCookie(COOKIE.CODE),
      //location: getCookie(COOKIE.FARM),
    },
  })
    .then((res) => res.data)
    .catch((err) => {
      if (err.response) {
        let { status } = err.response;
        if (status === 401) {
          deleteCookie(COOKIE.ID_TOKEN);
          deleteCookie(COOKIE.NAME);
          deleteCookie(COOKIE.UUID);
          deleteCookie(COOKIE.CHANGE_PASSWORD);
          deleteCookie(COOKIE.COMPANY_NAME);
          deleteCookie(COOKIE.PERMISSION);
          deleteCookie(COOKIE.IS_MASTER);
          deleteCookie(COOKIE.ID_PORTAL);
          deleteCookie(COOKIE.LOGO);

          window.location.assign("/");
        } else if (status === 400 || status === 404) {
          if (err.response.data) {
            if (err.response.data.response) {
              return err.response.data;
            } else if (
              err.response.data.violations &&
              err.response.data.violations[0] &&
              err.response.data.violations[0].message
            ) {
              return err.response.data;
            } else {
              return false;
            }
          } else {
            return false;
          }
        }
      } else return false;
    });
};
export const fetchPdfApi = (param = null, method = null, variables = null) => {
  if (getCookie(COOKIE.ID_TOKEN))
    createCookie(
      COOKIE.ID_TOKEN,
      getCookie(COOKIE.ID_TOKEN),
      APIConstants.CTimeOut
    );
  else {
    deleteCookie(COOKIE.ID_TOKEN);
    deleteCookie(COOKIE.NAME);
    deleteCookie(COOKIE.UUID);
    deleteCookie(COOKIE.CHANGE_PASSWORD);
    deleteCookie(COOKIE.COMPANY_NAME);
    deleteCookie(COOKIE.PERMISSION);
    deleteCookie(COOKIE.IS_MASTER);
    deleteCookie(COOKIE.ID_PORTAL);
    deleteCookie(COOKIE.LOGO);
    window.location.assign("/");
  }
  return axios({
    method: method,
    url: `${
      process.env.NODE_ENV === "development"
        ? APIConstants.ApiUrl
        : process.env.NODE_ENV === "test"
        ? APIConstants.TestUrl
        : APIConstants.LiveUrl
    }${param}`,
    data: variables,
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(COOKIE.ID_TOKEN),
    },
    responseType: "arraybuffer",
  })
    .then((res) => {
      const url = window.webkitURL.createObjectURL(new Blob([res.data]), {
        type: res.headers["content-type"],
      });
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        variables && variables[0].returningQuantity
          ? "Return.pdf"
          : variables
          ? variables
          : "download.pdf"
      );

      document.body.appendChild(link);
      link.click();
      return (res.code = "200");
    })
    .catch((err) => {
      if (err.response) {
        let { status } = err.response;
        if (status === 401) {
          deleteCookie(COOKIE.ID_TOKEN);
          deleteCookie(COOKIE.NAME);
          deleteCookie(COOKIE.UUID);
          deleteCookie(COOKIE.CHANGE_PASSWORD);
          deleteCookie(COOKIE.COMPANY_NAME);
          deleteCookie(COOKIE.PERMISSION);
          deleteCookie(COOKIE.IS_MASTER);
          deleteCookie(COOKIE.ID_PORTAL);
          deleteCookie(COOKIE.LOGO);

          window.location.assign("/");
        } else if (status === 400 || status === 404) {
          if (err.response.data) {
            if (err.response.data.response) {
              return err.response.data;
            } else if (
              err.response.data.violations &&
              err.response.data.violations[0] &&
              err.response.data.violations[0].message
            ) {
              return err.response.data;
            } else {
              return false;
            }
          } else {
            return false;
          }
        }
      } else return false;
    });
};

export const fetchFileApi = (param = null, method = null, variables = null) => {
  if (getCookie(COOKIE.ID_TOKEN))
    createCookie(
      COOKIE.ID_TOKEN,
      getCookie(COOKIE.ID_TOKEN),
      APIConstants.CTimeOut
    );
  else {
    deleteCookie(COOKIE.ID_TOKEN);
    deleteCookie(COOKIE.NAME);
    deleteCookie(COOKIE.UUID);
    deleteCookie(COOKIE.CHANGE_PASSWORD);
    deleteCookie(COOKIE.COMPANY_NAME);
    deleteCookie(COOKIE.PERMISSION);
    deleteCookie(COOKIE.IS_MASTER);
    deleteCookie(COOKIE.ID_PORTAL);
    deleteCookie(COOKIE.LOGO);
    window.location.assign("/");
  }
  return axios({
    method: method,
    url: `${
      process.env.NODE_ENV === "development"
        ? APIConstants.ApiUrl
        : process.env.NODE_ENV === "test"
        ? APIConstants.TestUrl
        : APIConstants.LiveUrl
    }${param}`,
    data: variables,
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + getCookie(COOKIE.ID_TOKEN),
    },
    responseType: "arraybuffer",
  })
    .then((res) => {
      let contype = res.headers["content-type"];
      if (contype === "application/json") {
        return true;
      } else {
        let header_res = res.headers;
        const url = window.webkitURL.createObjectURL(
          new Blob([res.data], { type: header_res["content-type"] })
        );
        const link = document.createElement("a");
        link.href = url;
        let ctype = res.headers["content-type"];
        if (ctype === "application/zip") {
          link.setAttribute(
            "download",
            "Orders" + moment().format("DD_MM_YYYY") + ".zip"
          );
        } else {
          link.setAttribute("download", "Invoice.pdf");
        }
        document.body.appendChild(link);
        link.click();
        return true;
      }
    })
    .catch((err) => {
      if (err.response) {
        let { status } = err.response;
        if (status === 401) {
          deleteCookie(COOKIE.ID_TOKEN);
          deleteCookie(COOKIE.NAME);
          deleteCookie(COOKIE.UUID);
          deleteCookie(COOKIE.CHANGE_PASSWORD);
          deleteCookie(COOKIE.COMPANY_NAME);
          deleteCookie(COOKIE.PERMISSION);
          deleteCookie(COOKIE.IS_MASTER);
          deleteCookie(COOKIE.ID_PORTAL);
          deleteCookie(COOKIE.LOGO);
          window.location.assign("/");
        } else if (status === 400 || status === 404) {
          if (err.response.data) {
            if (err.response.data.response) {
              return err.response.data;
            } else if (
              err.response.data.violations &&
              err.response.data.violations[0] &&
              err.response.data.violations[0].message
            ) {
              return err.response.data;
            } else if (err.response.data) {
              const text = String.fromCharCode.apply(
                null,
                Array.from(new Uint8Array(err.response.data))
              );
              if (!text) return undefined;
              return JSON.parse(text);
              //return JSON.stringify(err.response);;
            } else {
              return false;
            }
          } else if (err.response.code) {
            return err.response;
          } else {
            return false;
          }
        }
      } else return false;
      //return false;
    });
};

export const fetchApiExcel = (
  param = null,
  method = null,
  variables = null
) => {
  if (getCookie(COOKIE.ID_TOKEN))
    createCookie(
      COOKIE.ID_TOKEN,
      getCookie(COOKIE.ID_TOKEN),
      APIConstants.CTimeOut
    );
  else {
    deleteCookie(COOKIE.ID_TOKEN);
    deleteCookie(COOKIE.NAME);
    deleteCookie(COOKIE.UUID);
    deleteCookie(COOKIE.CHANGE_PASSWORD);
    deleteCookie(COOKIE.COMPANY_NAME);
    deleteCookie(COOKIE.PERMISSION);
    deleteCookie(COOKIE.IS_MASTER);
    deleteCookie(COOKIE.ID_PORTAL);
    deleteCookie(COOKIE.LOGO);
    window.location.assign("/");
  }
  return axios({
    method: method,
    url: `${
      process.env.NODE_ENV === "development"
        ? APIConstants.ApiUrl
        : process.env.NODE_ENV === "test"
        ? APIConstants.TestUrl
        : APIConstants.LiveUrl
    }${param}`,
    data: variables,
    headers: {
      Accept: "application/vnd.ms-excel",
      Authorization: "Bearer " + getCookie(COOKIE.ID_TOKEN),
    },
    responseType: "arraybuffer",
  })
    .then((res) => {
      const url = window.webkitURL.createObjectURL(new Blob([res.data]));

      const link = document.createElement("a");
      link.href = url;

      link.setAttribute("download", "Report.xlsx");

      document.body.appendChild(link);
      link.click();
    })
    .catch((err) => {});
};

export const fetchPublicApi = (
  param = null,
  method = null,
  variables = null
) => {
  if (getCookie(COOKIE.ID_TOKEN))
    createCookie(
      COOKIE.ID_TOKEN,
      getCookie(COOKIE.ID_TOKEN),
      APIConstants.CTimeOut
    );
  else {
    deleteCookie(COOKIE.ID_TOKEN);
    deleteCookie(COOKIE.NAME);
    deleteCookie(COOKIE.UUID);
    deleteCookie(COOKIE.CHANGE_PASSWORD);
    deleteCookie(COOKIE.COMPANY_NAME);
    deleteCookie(COOKIE.PERMISSION);
    deleteCookie(COOKIE.IS_MASTER);
    deleteCookie(COOKIE.ID_PORTAL);
    deleteCookie(COOKIE.LOGO);
    window.location.assign("/");
  }
  return axios({
    method: method,
    url: `${
      process.env.NODE_ENV === "development"
        ? APIConstants.ApiUrl
        : process.env.NODE_ENV === "test"
        ? APIConstants.TestUrl
        : APIConstants.LiveUrl
    }${param}`,
    data: variables,
    headers: {
      accept: "application/json",
    },
  })
    .then((res) => res.data)
    .catch((err) => {
      if (err.response) {
        let { status } = err.response;
        if (status === 401) {
          deleteCookie(COOKIE.ID_TOKEN);
          deleteCookie(COOKIE.NAME);
          deleteCookie(COOKIE.UUID);
          deleteCookie(COOKIE.CHANGE_PASSWORD);
          deleteCookie(COOKIE.COMPANY_NAME);
          deleteCookie(COOKIE.PERMISSION);
          deleteCookie(COOKIE.IS_MASTER);
          deleteCookie(COOKIE.ID_PORTAL);
          deleteCookie(COOKIE.LOGO);

          window.location.assign("/");
        } else if (status === 400 || status === 404) {
          if (err.response.data) {
            if (err.response.data.response) {
              return err.response.data;
            } else if (
              err.response.data.violations &&
              err.response.data.violations[0] &&
              err.response.data.violations[0].message
            ) {
              return err.response.data;
            } else if (err.response.data) {
              return err.response.data;
            } else {
              return false;
            }
          } else if (err.response.code) {
            return err.response;
          } else {
            return false;
          }
        }
      } else return false;
    });
};
