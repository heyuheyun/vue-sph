import {v4 as uuid} from "uuid";

export const getUUID=()=>{
    let uuid_token=localStorage.getItem("UUIDTOKEN");
    if(!uuid_token){
        uuid_token=uuid();
        localStorage.setItem("UUIDTOKEN",uuid_token);
    }
    return uuid_token;
}