import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable()
export class WebSocketService {
    socket: io.SocketIOClient.Socket;

    constructor() {
        this.socket = io.connect('http://localhost:3005');
    }

    listen(eventname: string) : Observable<any> {
        return new Observable((subscriber) => {
            this.socket.on(eventname, (data) => {
                subscriber.next(data);
            })
        })
    }

    emit(eventname: string, data: any) {
        this.socket.emit(eventname, data);
    }
}
