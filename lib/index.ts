type MessageType = 'CARD' | 'NEW_RULE' | 'TEXT' | 'JOIN_ROOM' | 'CREATE_ROOM' | 'LEAVE_ROOM' | 'ROOM_CREATED' | 'ROOM_STATE';

export class Message {
	type: MessageType;

	static fromJSON(json: string): Message {
		const obj = JSON.parse(json);
		switch (obj.type as MessageType) {
			case 'NEW_RULE':
				return Object.assign(new NewRuleMessage(), obj);
			case 'CARD':
				return Object.assign(new NewRuleMessage(), obj);
			case 'TEXT':
				return Object.assign(new TextMessage(), obj);
			case 'JOIN_ROOM':
				return Object.assign(new JoinRoomMessage(), obj);
			case 'CREATE_ROOM':
				return Object.assign(new CreateRoomMessage(), obj);
			case 'LEAVE_ROOM':
				return Object.assign(new LeaveRoomMessage(), obj);
			case 'ROOM_CREATED':
				return Object.assign(new RoomCreatedMessage(), obj);
			case 'ROOM_STATE':
				return Object.assign(new RoomStateMessage(), obj);
		}
	}
}

export class CardMessage extends Message {
	type: 'CARD';
	card: Card;
}

export class Card {
	name: string;
	description: string;
	ruleName: string;
	parameters: RuleParameters;
}

export class RuleParameters {
	[key: string]: any;
}

export class NewRuleMessage extends Message {
	type: 'NEW_RULE';
	ruleName: string;
}

export class TextMessage extends Message {
	type: 'TEXT';
	textContent: string;
	senderNickname?: string;
}

export class JoinRoomMessage extends Message {
	type: 'JOIN_ROOM';
	nickname: string;
	roomId: string;
}

export class CreateRoomMessage extends Message {
	type: 'CREATE_ROOM';
}

export class RoomCreatedMessage extends Message {
	type: 'ROOM_CREATED';
	roomId: string;
}

export class LeaveRoomMessage extends Message {
	type: 'LEAVE_ROOM';
}

export class RoomStateMessage extends Message {
	type: 'ROOM_STATE';
	users: User[];
}

export class User {
	id: string;
	nickname: string;
}