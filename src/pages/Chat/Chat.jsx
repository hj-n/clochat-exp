import React from 'react';

import { useParams } from 'react-router-dom';
import ChatGPT from './ChatGPT';
import CloChat from './CloChat';

const Chat = () => {

	const { lang, id, type, step } = useParams();

	const ChatGPT_Route = (<ChatGPT lang={lang} id={id} type={type} step={step} />)
	const CloChat_Route = (<CloChat lang={lang} id={id} type={type} step={step} />)
	const Routing = {
		"type1": {
			"study1": ChatGPT_Route, "study2": CloChat_Route
		},
		"type2": {
			"study1": CloChat_Route, "study2": ChatGPT_Route
		}
	}

	return (
		<div>
			{Routing[type][step]}
		</div>
	)


}

export default Chat;