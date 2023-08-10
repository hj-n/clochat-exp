import React from 'react';

import { useParams } from 'react-router-dom';
import ChatGPT from './ChatGPT';
import CloChat from './CloChat';

const Chat = () => {

	const { lang, id, type, step, defaultPersonaNum } = useParams();


	const studyType  = {
		"type1": {
			"study1": "chatgpt", "study2": "clochat"
		},
		"type2": {
			"study1": "clochat", "study2": "chatgpt"
		}
	}[type][step];

	return (
		<div>
			{<ChatGPT
				lang={lang}
				id={id}
				type={type}
				step={step}
				defaultPersonaNum={defaultPersonaNum}
				studyType={studyType}
			/>}
		</div>
	)


}

export default Chat;