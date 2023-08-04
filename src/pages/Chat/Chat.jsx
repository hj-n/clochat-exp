import React from 'react';

import { useParams } from 'react-router-dom';
import ChatGPT from './ChatGPT';
import CloChat from './CloChat';

const Chat = () => {

	const { lang, id, type, step } = useParams();

	const routing = {
		"type1": {
			"study1": (<ChatGPT />), "study2": (<CloChat />)
		},
		"type2": {
			"study1": (<CloChat />), "study2": (<ChatGPT />)
		}
	}

	return (
		<div>
			{routing[type][step]}
		</div>
	)


}

export default Chat;