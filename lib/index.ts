
export class Message {
	senderNickname: string;
	type: 'NEW_RULE' | 'TEXT';

	static fromJSON(json: string): Message {
		const obj = JSON.parse(json);
		if (obj.type === 'NEW_RULE') {
			return Object.assign(new NewRuleMessage(), obj);
		}
		else if (obj.type === 'TEXT') {
			return Object.assign(new TextMessage(), obj);
		}
		else {
			throw new Error("Unknown message type: " + obj.type);
		}
	}
}

export class NewRuleMessage extends Message {
	ruleName: string;
}

export class TextMessage extends Message {
	textContent: string;
}