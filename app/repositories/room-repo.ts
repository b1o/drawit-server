import { Room } from './../models/room';
import { Singleton } from 'typescript-ioc';

@Singleton
export class RoomRepository {
    private rooms: Room[];

    constructor() {
        this.rooms = []
    }

    public addRoom(room:Room) {
        this.rooms.push(room);
    }

    public getRoomByName(name:string) {
       return this.rooms.filter((room) => {
            return room.name == name;
        })[0]
    }
}