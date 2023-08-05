import React, { useEffect, useState, useRef } from "react";

import styles from "./ChatGPT.module.scss";

import { getCurrentTaskIndices, getTaskInfo } from "../../utils/communication";

import inputSvg from "../../assets/input.svg";

const ChatGPT = (props) => {

	const { lang, id, type, step } = props;

	const metadata = require(`./chatgpt_metadata_${lang}`);

	const textAreaRef = useRef(null);

	const [taskIndices, setTaskIndices] = useState([]);
	const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
	const [taskTitle, setTaskTitle] = useState("");
	const [taskDescription, setTaskDescription] = useState("");
	const [inputText, setInputText] = useState("");

	const [conversation, setConversation] = useState([])

	const fetchTaskIndices = async () => {
		const indices = await getCurrentTaskIndices(id, "chatgpt");
		const { title, description } = await getTaskInfo(id, currentTaskIndex, "chatgpt"); 
		setTaskIndices(indices);
		setTaskTitle(title);
		setTaskDescription(description);
	}

	const newInputConversation = () => {
		if (inputText == "") { return; }
		console.log(inputText);
		setConversation([...conversation, { role: "user", content: inputText }]);
		setInputText("");
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
				<div className={styles.chatInteractionWrapper}>
					<div className={styles.chatHistoryWrapper}>
						{conversation.map((item, index) => {
							return (
								<div key={index} className={item.role === "user" ? styles.chatHistoryUserItem : styles.chatHistorySystemItem}>
									<div className={styles.chatHistoryItemContent}>
										<img src={metadata.icon[item.role]} alt={item.role} />
										<p>{item.content}</p>
									</div>
								</div>
							)
						})}
					</div>
					<div className={styles.chatInputWrapper}>
						<div className={styles.chatInputTextAreaWrapper}>
							<textarea placeholder={metadata.placeholder} value={inputText} onChange={(e) => setInputText(e.target.value)} className={styles.chatInput} rows={"5"} cols={"30"}></textarea>
							<button className={styles.chatInputButton} onClick={newInputConversation} ref={textAreaRef}>
								<img src={inputSvg} alt="input" />
							</button>
						</div>
						<button className={styles.chatInputRerunButton}>{metadata.rerun}</button>
						<button className={styles.chatInputEndButton}>{metadata.end}</button>
					</div>
				</div>
				
			</div>
			
		</div>
	);
}

export default ChatGPT;