/* FluxxChat-protokolla
 * Copyright (C) 2019 Helsingin yliopisto
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

type MessageType =
	'NEW_RULE' |
	'TEXT' |
	'VALIDATE_TEXT_RESPONSE' |
	'JOIN_ROOM' |
	'CREATE_ROOM' |
	'LEAVE_ROOM' |
	'ROOM_CREATED' |
	'ROOM_STATE' |
	'PROFILE_IMG_CHANGE' |
	'ERROR' |
	'SYSTEM' |
	'LANGUAGE_DATA' |
	'KEEP_ALIVE';

export type Message =
	NewRuleMessage |
	TextMessage |
	ValidateTextMessageResponse |
	JoinRoomMessage |
	CreateRoomMessage |
	LeaveRoomMessage |
	RoomCreatedMessage |
	RoomStateMessage |
	ProfileImgChangeMessage |
	ErrorMessage |
	SystemMessage |
	LanguageDataMessage |
	KeepAliveMessage;

export interface MessageBase {
	type: MessageType;
}

export interface Card {
	name: string;
	description: string;
	ruleName: string;
	parameterTypes: RuleParameterTypes;
	parameters: RuleParameters;
	values?: SubstitutionValues;
}

export interface RuleParameters {
	[key: string]: any;
}

export interface RuleParameterTypes {
	[key: string]: RuleParameterType;
}

export interface SubstitutionValues {
	[key: string]: string;
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
	imageContent: string;
	audioContent: {url: string, length: number};
	validateOnly: boolean;
	markdown?: boolean;
	senderNickname?: string;
	senderId?: string;
	timestamp?: string;
}

export interface ValidateTextMessageResponse extends MessageBase {
	type: 'VALIDATE_TEXT_RESPONSE';
	valid: boolean;
	invalidReason?: string[];
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
	hand: Card[];
	userId: string;
	nickname: string;
	playableCardsLeft: number;
	variables: UiVariables;
}

export interface UiVariables {
	inputMinHeight?: number;
	imageMessages?: boolean;
	audioMessages?: boolean;
	emojiPicker?: boolean;
	disableBackspace?: boolean;
}

export interface User {
	id: string;
	nickname: string;
	profileImg: string;
}

export interface ProfileImgChangeMessage {
	type: 'PROFILE_IMG_CHANGE';
	profileImg: string;
}

export interface ErrorMessage extends MessageBase {
	type: 'ERROR';
	message: string;
	values?: SubstitutionValues;
}

export interface SystemMessage extends MessageBase {
	type: 'SYSTEM';
	message: string;
	severity: Severity;
	values?: SubstitutionValues;
}

export type Severity = 'info' | 'warning';

export interface LanguageDataMessage extends MessageBase {
	type: 'LANGUAGE_DATA';
	messages: {[locale: string]: {[message: string]: string}};
}

export interface KeepAliveMessage extends MessageBase {
	type: 'KEEP_ALIVE';
}
