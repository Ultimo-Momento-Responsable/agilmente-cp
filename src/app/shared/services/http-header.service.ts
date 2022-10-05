import { Injectable } from '@angular/core';  
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpHeadersService {
    getHeaders():HttpHeaders {
        return new HttpHeaders({
            "Access-Control-Allow-Origin": "*",
            "Authorization": localStorage.getItem("token"),
        });
    }
}


