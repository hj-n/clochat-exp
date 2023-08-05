import React, { useEffect, useState } from "react";

import styles from "./ChatGPT.module.scss";

import { getCurrentTaskIndices, getTaskInfo } from "../../utils/communication";

const ChatGPT = (props) => {

	const { lang, id, type, step } = props;
	const [taskIndices, setTaskIndices] = useState([]);
	const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
	const [taskTitle, setTaskTitle] = useState("");
	const [taskDescription, setTaskDescription] = useState("");

	const fetchTaskIndices = async () => {
		const indices = await getCurrentTaskIndices(id, "chatgpt");
		const { title, description } = await getTaskInfo(id, currentTaskIndex, "chatgpt"); 
		console.log(title, description);
		setTaskIndices(indices);
		setTaskTitle(title);
		setTaskDescription(description);
		
	}

	useEffect(() => { fetchTaskIndices(); }, [])

	return (
		<div className={styles.chatgptWrapper}>
			<div className={styles.chatgptIndexWrapper}>
				<h2>ChatGPT</h2>
				<p>Chat</p>
				<div className={styles.chatgptTaskList}>
					{taskIndices.map((task, index) => {
						return (
							<div key={index} className={index === currentTaskIndex ? styles.chatgptCurrentTask : styles.chatgptTask}>
								{`Task ${parseInt(task) + 1}`}
							</div>
						)
					})}
				</div>
			</div>
			<div className={styles.chatgptChatWrapper}>
				<div className={styles.chatgptTaskDesc}>
						<div className={styles.chatgptTaskDescInnerWrapper}>
							<h4 className={styles.chatgptTaskDescTitle}>{`Task ${currentTaskIndex + 1}`}</h4>
							<div className={styles.chatgptTaskDescContent}>
								<h5>{taskTitle}</h5>
								<p>{taskDescription}</p>
							</div>

					</div>
				</div>
			</div>
			
		</div>
	);
}

export default ChatGPT;