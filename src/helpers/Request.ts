import axios from "axios";

type Method = "POST" | "GET" | "DELETE" | "PUT"

export function Request(url:string, method:Method , data?:unknown) {
    return axios({
        baseURL:"http://localhost:8010",
        url,
        method,
        data,
    })

}