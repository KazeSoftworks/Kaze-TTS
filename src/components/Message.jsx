import React from 'react';

const Message = () => {
	const author = 'Author';
	const message = 'Hello World!';
	return (
		<div>
			{author}: {message}
		</div>
	);
};

export default Message;
