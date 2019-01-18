export declare class Message {
    senderNickname: string;
    type: 'NEW_RULE' | 'TEXT';
    static fromJSON(json: string): Message;
}
export declare class NewRuleMessage extends Message {
    ruleName: string;
}
export declare class TextMessage extends Message {
    textContent: string;
}
