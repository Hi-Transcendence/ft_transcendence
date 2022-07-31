import { Param } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameService } from './game.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})

export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {

  constructor(
    private readonly gameService: GameService,
  ) { }

  @WebSocketServer()
  server: Server;

  handleConnection(socket: Socket, token: any) {
    console.log("gateway token", token);
    this.gameService.handleConnection(socket, token);
  }

  handleDisconnect(socket: Socket) {
    this.gameService.handleDisconnect(socket);
  }

  @SubscribeMessage('match-request')
  matchRequest(socket: Socket, data: any): void {
    // console.log("match-request");
    this.gameService.matchRequest(socket, data, this.server);
  }

  @SubscribeMessage('match-cancel')
  matchCancel(socket: Socket): void {
    this.gameService.matchCancel();
  }

  @SubscribeMessage('spectate-request')
  spectateRequest(socket: Socket, data: any): void {
    this.gameService.spectateRequest(socket, data);
  }

  @SubscribeMessage('gamelist-request')
  gamelistRequest(): any {
    return { channelList: this.gameService.gamelistRequest() };
  }

  @SubscribeMessage('change-password')
  changePassword(socket: Socket, data: any): any {
    return this.gameService.changePassword(data);
  }

  @SubscribeMessage('spectate-password')
  submitPassword(socket: Socket, data: any): boolean {
    return this.gameService.spectatePassword(data);
  }

  @SubscribeMessage('get-ping')
  getPing(soket: Socket) {
    return true;
  }

}
