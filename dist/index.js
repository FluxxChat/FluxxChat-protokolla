"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Message {
    static fromJSON(json) {
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
exports.Message = Message;
class NewRuleMessage extends Message {
}
exports.NewRuleMessage = NewRuleMessage;
class TextMessage extends Message {
}
exports.TextMessage = TextMessage;
//# sourceMappingURL=index.js.map