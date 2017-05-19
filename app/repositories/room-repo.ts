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
}