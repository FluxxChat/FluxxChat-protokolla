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
	'SERVER_STATE' |
	'PROFILE_IMG_CHANGE' |
	'CLIENT_LANGUAGE_CHANGE' |
	'WORD_PREDICTION' |
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
	ServerStateMessage |
	ProfileImgChangeMessage |
	ClientLanguageChangeMessage |
	WordPredictionMessage |
	ErrorMessage |
	SystemMessage |
	LanguageDataMessage |
	KeepAliveMessage;

/**
 * Base class of all messages.
 */
export interface MessageBase {
	/**
	 * The type of the message.
	 */
	type: MessageType;
}

/**
 * A struct that represents a card, ie. an instance of a rule.
 * Cards can both be in player's hand or in the area of enabled rules.
 */
export interface Card {
	/**
	 * A translation code for the visible name of the rule.
	 */
	name: string;
	/**
	 * A translation code for the visible description of the rule.
	 */
	description: string;
	/**
	 * The id of the rule.
	 */
	ruleName: string;
	/**
	 * The types of parameters this rule accepts.
	 * Each key corresponds to one parameter.
	 */
	parameterTypes: RuleParameterTypes;
	/**
	 * Values of parameters.
	 * This should be empty if the card is in players' hand and filled if the card is in the area of enabled rules.
	 */
	parameters: RuleParameters;
	/**
	 * Values that are substituted to the translation strings.
	 */
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

/**
 * Rule parameters can have different types.
 * "player" is an id of a player and "number" is an integer.
 * The type can also be a list of strings in which case the value must be one of the strings in the list.
 */
export type RuleParameterType = '' | 'player' | 'number' | string[];

/**
 * A message that sent by the client when playing a card.
 */
export interface NewRuleMessage extends MessageBase {
	type: 'NEW_RULE';
	/**
	 * The id of the rule. (Same as Card.ruleName)
	 */
	ruleName: string;
	/**
	 * The rule parameter values. (Same as Card.parameters)
	 */
	ruleParameters: RuleParameters;
}

/**
 * A text, image or audio message.
 * Sent initially by the client to the server and then sent to other clients by the server.
 */
export interface TextMessage extends MessageBase {
	type: 'TEXT';
	/**
	 * The text content of the message.
	 */
	textContent: string;
	/**
	 * An url blob that contains the image content.
	 */
	imageContent: string;
	/**
	 * An url blob and length (TODO desc) that describe the audio content.
	 */
	audioContent: {url: string, length: number};
	/**
	 * If true, the message is not delivered to other clients in the room, but is validated instead and the server will reply with VALIDATE_TEXT_RESPONSE
	 */
	validateOnly: boolean;
	/**
	 * If true, textContent contains markdown instead of plain text.
	 * Inserted by the server.
	 */
	markdown?: boolean;
	/**
	 * The nickname of the sender at the time the message was sent (because the nickname can be changed by rules and varies by time).
	 * Inserted by the server.
	 */
	senderNickname?: string;
	/**
	 * The id of the sender.
	 * Inserted by the server.
	 */
	senderId?: string;
	/**
	 * The timestamp of the message.
	 * Inserted by the server.
	 */
	timestamp?: string;
	/**
	 * Indicates this message is a response to a message thread.
	 * Threads are identified by the sender of the first message and the timestamp of the first message.
	 */
	thread?: {senderId: string, timestamp: string};
}

/**
 * This message is sent by the server after validating a message.
 */
export interface ValidateTextMessageResponse extends MessageBase {
	type: 'VALIDATE_TEXT_RESPONSE';
	/**
	 * If true, the validated message is valid.
	 */
	valid: boolean;
	/**
	 * If the message is not valid, this field contains reasons.
	 */
	invalidReason?: string[];
}

/**
 * Sent by the cliend when joining a room.
 */
export interface JoinRoomMessage extends MessageBase {
	type: 'JOIN_ROOM';
	/**
	 * The initial nickname of the player.
	 */
	nickname: string;
	/**
	 * The id of the room the player is joining.
	 */
	roomId: string;
}

/**
 * Sent by the client, asks the server to create a room.
 * The server answers with a ROOM_CREATED message.
 */
export interface CreateRoomMessage extends MessageBase {
	type: 'CREATE_ROOM';
	params?: RoomParameters;
}

/**
 * All of the ways in which a rooms can be configured
 */
export interface RoomParameters {
	turnLength?: number; // in seconds
	nStartingHand?: number; // number of cards a player receives upon joining
	nDraw?: number; // initial number of cards a player draws each turn
	nPlay?: number; // initial number of cards a player can play each turn
	nMaxHand?: number | null; // hand size where you can't draw any more
	deck?: { [key: string]: number }; // numbers of each card in custom deck
	startingRules?: Card[]; // rules in force when room is created
}

/**
 * Sent by the server to communicate facts the client isn't expected to know by default,
 * e.g. full list of availabble cards
 */
export interface ServerStateMessage extends MessageBase {
	type: 'SERVER_STATE';
	defaultRoomParameters?: RoomParameters;
	availableCards?: Card[];
}

/**
 * Sent by the server in response to a CREATE_ROOM message.
 */
export interface RoomCreatedMessage extends MessageBase {
	type: 'ROOM_CREATED';
	/**
	 * The id of the new room that was created.
	 */
	roomId: string;
}

/**
 * Sent by the client before closing the connection.
 * This is NOT sent when changing the room, only JOIN_ROOM is used then.
 */
export interface LeaveRoomMessage extends MessageBase {
	type: 'LEAVE_ROOM';
}

/**
 * Sent by the server in various situations.
 * Contains information about the room the player is in.
 */
export interface RoomStateMessage extends MessageBase {
	type: 'ROOM_STATE';
	/**
	 * The current members of the room, in turn order.
	 */
	users: User[];
	/**
	 * The id of the player that currently has the turn.
	 */
	turnUserId: string;
	/**
	 * The time of the end of the current turn in milliseconds since Unix epoch.
	 */
	turnEndTime: number;
	/**
	 * The length of a turn in seconds.
	 */
	turnLength: number;
	/**
	 * A list of enabled rules ("cards in the enabled rule area").
	 */
	enabledRules: Card[];
	/**
	 * The cards in the hand of the player.
	 */
	hand: Card[];
	/**
	 * The id of the player.
	 */
	userId: string;
	/**
	 * The current nickname of the player.
	 */
	nickname: string;
	/**
	 * The number of cards the current player can still play during this turn.
	 */
	playableCardsLeft: number;
	/**
	 * A list of options that alter the user interface.
	 * The client MUST obey these options.
	 */
	variables: UiVariables;
}

export interface UiVariables {
	/**
	 * The minimum height of the input field in lines.
	 */
	inputMinHeight?: number;
	/**
	 * If true, the client must allow sending image messages, if false, it must not.
	 */
	imageMessages?: boolean;
	/**
	 * If true, the client must allow sending audio messages, if false, it must not.
	 */
	audioMessages?: boolean;
	/**
	 * If true, the client must show an emoji picker, if false, it must not.
	 */
	emojiPicker?: boolean;
	/**
	 * If true, the client must allow replying to threads, if false, it must not.
	 */
	threads?: boolean;
	/**
	 * If true, the client must disallow removing characters from the input field, if false, it must not.
	 * The client should still allow deleting a message that does not follow the rules from the input field.
	 */
	disableBackspace?: boolean;
	/**
	 * If true, the client must show the word suggestions sent by the server, if false, it must not.
	 */
	wordSuggestions?: boolean;
}

/**
 * Information about a player.
 */
export interface User {
	/**
	 * The id of the player.
	 */
	id: string;
	/**
	 * The current nickname of the player.
	 */
	nickname: string;
	/**
	 * An url blob that contains the profile picture of the player.
	 */
	profileImg: string;
}

/**
 * Sent by the client when changing the profile picture.
 */
export interface ProfileImgChangeMessage {
	type: 'PROFILE_IMG_CHANGE';
	/**
	 * An url blob containing the new profile picture.
	 */
	profileImg: string;
}

/**
 * Sent by the client when changing its UI language.
 */
export interface ClientLanguageChangeMessage {
	type: 'CLIENT_LANGUAGE_CHANGE';
	/**
	 * The language code of the new language.
	 */
	language: string;
}

/**
 * Sent by the server in a response to a validation request.
 */
export interface WordPredictionMessage {
	type: 'WORD_PREDICTION';
	/**
	 * A prediction of what the player is going to type next.
	 */
	prediction: string;
}

/**
 * Sent by the server.
 */
export interface ErrorMessage extends MessageBase {
	type: 'ERROR';
	/**
	 * The translation code of the error message.
	 */
	message: string;
	/**
	 * The values that are substituted in the translation string.
	 */
	values?: SubstitutionValues;
}

/**
 * Sent by the server.
 * The client must show these messages in same area as the messages sent by players.
 */
export interface SystemMessage extends MessageBase {
	type: 'SYSTEM';
	/**
	 * The translation code of the message.
	 */
	message: string;
	/**
	 * The severity of the message.
	 * The client may show messages of different severity in different styles.
	 */
	severity: Severity;
	/**
	 * The values that are substituted in the translation string.
	 */
	values?: SubstitutionValues;
}

export type Severity = 'info' | 'warning';

/**
 * Sent by the server after a connection is established.
 */
export interface LanguageDataMessage extends MessageBase {
	type: 'LANGUAGE_DATA';
	/**
	 * Contains a translation string for each translation code for each supported language.
	 */
	messages: {[locale: string]: {[message: string]: string}};
}

export interface KeepAliveMessage extends MessageBase {
	type: 'KEEP_ALIVE';
}
