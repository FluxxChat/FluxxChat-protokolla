type MessageType =
	'CARD' |
	'EMPTY_HAND' |
	'NEW_RULE' |
	'TEXT' |
	'VALIDATE_TEXT' |
	'VALIDATE_TEXT_RESPONSE' |
	'JOIN_ROOM' |
	'CREATE_ROOM' |
	'LEAVE_ROOM' |
	'ROOM_CREATED' |
	'ROOM_STATE' |
	'ERROR' |
	'SYSTEM';

export type Message =
	CardMessage |
	EmptyHandMessage |
	NewRuleMessage |
	TextMessage |
	ValidateTextMessage |
	ValidateTextMessageResponse |
	JoinRoomMessage |
	CreateRoomMessage |
	LeaveRoomMessage |
	RoomCreatedMessage |
	RoomStateMessage |
	ErrorMessage |
	SystemMessage;

export interface MessageBase {
	type: MessageType;
}

export interface CardMessage extends MessageBase {
	type: 'CARD';
	card: Card;
}

export interface EmptyHandMessage extends MessageBase {
	type: 'EMPTY_HAND';
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

export type RuleParameterType = '' | 'player' | 'number' | string[];

export interface NewRuleMessage extends MessageBase {
	type: 'NEW_RULE';
	ruleName: string;
	ruleParameters: RuleParameters;
}

export interface TextMessage extends MessageBase {
	type: 'TEXT';
	textContent: string;
	markdown?: boolean;
	senderNickname?: string;
}

export interface ValidateTextMessage extends MessageBase {
	type: 'VALIDATE_TEXT';
	textContent: string;
}

export interface ValidateTextMessageResponse extends MessageBase {
	type: 'VALIDATE_TEXT_RESPONSE';
	valid: boolean;
	invalidReason?: string;
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
	turnEndTime: number;
	enabledRules: Card[];
	nickname: string;
}

export interface User {
	id: string;
	nickname: string;
}

export interface ErrorMessage extends MessageBase {
	type: 'ERROR';
	message: string;
}

export interface SystemMessage extends MessageBase {
	type: 'SYSTEM';
	message: string;
	severity: Severity;
}

export type Severity = 'info' | 'warning';