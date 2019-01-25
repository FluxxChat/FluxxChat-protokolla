type MessageType = 'NEW_RULE' | 'TEXT' | 'JOIN_ROOM' | 'CREATE_ROOM' | 'LEAVE_ROOM';

export class Message {
	type: MessageType;

	static fromJSON(json: string): Message {
		const obj = JSON.parse(json);
		switch (obj.type as MessageType) {
			case 'NEW_RULE':
				return Object.assign(new NewRuleMessage(), obj);
			case 'TEXT':
				return Object.assign(new TextMessage(), obj);
			case 'JOIN_ROOM':
				return Object.assign(new JoinRoomMessage(), obj);
			case 'CREATE_ROOM':
				return Object.assign(new CreateRoomMessage(), obj);
			case 'LEAVE_ROOM':
				return Object.assign(new LeaveRoomMessage(), obj);
			default:
				throw new Error("Unknown message type: " + obj.type);
		}
	}
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

export class LeaveRoomMessage extends Message {
	type: 'LEAVE_ROOM';
}
