import React from 'react';

function ChatForm({text, handleChange, handleSend}) {
    return (
        <form onSubmit={handleSend}>
            <input value={text} onChange={handleChange} />
            <button onClick={handleSend} >Send</button>
        </form>
    )
}

export default ChatForm;