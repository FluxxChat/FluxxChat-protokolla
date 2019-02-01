type MessageType = 'CARD' | 'NEW_RULE' | 'TEXT' | 'JOIN_ROOM' | 'CREATE_ROOM' | 'LEAVE_ROOM' | 'ROOM_CREATED' | 'ROOM_STATE';

export type Message = CardMessage | NewRuleMessage | TextMessage | JoinRoomMessage | CreateRoomMessage | LeaveRoomMessage | RoomCreatedMessage | RoomStateMessage;

export interface MessageBase {
	type: MessageType;
}

export interface CardMessage extends MessageBase {
	type: 'CARD';
	card: Card;
}

export interface Card {
	name: string;
	description: string;
	ruleName: string;
	parameterTypes: RuleParameterTypes;
	parameters: RuleParameters;
}

export interface RuleParameters {
	[key: string]: any;
}

export interface RuleParameterTypes {
	[key: string]: RuleParameterType;
}

export type RuleParameterType = '' | 'player' | 'number';

export interface NewRuleMessage extends MessageBase {
	type: 'NEW_RULE';
	card: Card;
}

export interface TextMessage extends MessageBase {
	type: 'TEXT';
	textContent: string;
	senderNickname?: string;
}

export interface JoinRoomMessage extends MessageBase {
	type: 'JOIN_ROOM';
	nickname: string;
	roomId: string;
}

export interface CreateRoomMessage extends MessageBase {
	type: 'CREATE_ROOM';
}

export interface RoomCreatedMessage extends MessageBase {
	type: 'ROOM_CREATED';
	roomId: string;
}

export interface LeaveRoomMessage extends MessageBase {
	type: 'LEAVE_ROOM';
}

export interface RoomStateMessage extends MessageBase {
	type: 'ROOM_STATE';
	users: User[];
	turnUserId: string;
	enabledRules: Card[];
}

export interface User {
	id: string;
	nickname: string;
}
