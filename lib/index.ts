
export class Message {
	senderNickname?: string;
	type: 'NEW_RULE' | 'TEXT' | 'LOGIN' | 'LOGOUT';

	static fromJSON(json: string): Message {
		const obj = JSON.parse(json);
		if (obj.type === 'NEW_RULE') {
			return Object.assign(new NewRuleMessage(), obj);
		}
		else if (obj.type === 'TEXT') {
			return Object.assign(new TextMessage(), obj);
		}
		else if (obj.type === 'LOGIN') {
			return Object.assign(new LoginMessage(), obj);
		}
		else if (obj.type === 'LOGOUT') {
			return Object.assign(new LogoutMessage(), obj);
		}
		else {
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
}

export class LoginMessage extends Message {
	type: 'LOGIN';
}

export class LogoutMessage extends Message {
	type: 'LOGOUT';
}