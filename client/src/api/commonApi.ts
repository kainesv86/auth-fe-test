import { AxiosInstance } from "axios";

import http from "./axiosCommon";

export class CommonApi {
        constructor(private readonly apiCall: AxiosInstance, private readonly prefix: string) {}
}

export const commonAPI = new CommonApi(http, "");

export default commonAPI;
