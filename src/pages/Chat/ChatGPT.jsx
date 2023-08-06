import React, { useEffect, useState, useRef } from "react";

import styles from "./ChatGPT.module.scss";

import { getConversations, getCurrentTaskTrialIndices, getTaskInfo, postConversation, postConversationStart } from "../../utils/communication";

import inputSvg from "../../assets/input.svg";

import { useNavigate } from "react-router-dom";

const ChatGPT = (props) => {

	const { lang, id, type, step } = props;

	const navigate = useNavigate();

	const metadata = require(`./chatgpt_metadata_${lang}`);

	const chatInputButtonRef = useRef(null);
	const chatRerunButtonRef = useRef(null);
	const chatEndButtonRef = useRef(null);
	const chatHistoryRef = useRef(null);

	const [taskIndices, setTaskIndices] = useState([]);
	const [trialIndices, setTrialIndices] = useState([]);
	const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
	const [currentTrialIndex, setCurrentTrialIndex] = useState(0);
	const [taskTitle, setTaskTitle] = useState("");
	const [taskDescription, setTaskDescription] = useState("");
	const [inputText, setInputText] = useState("");

	const [conversation, setConversation] = useState([])

	const fetchTaskIndices = async () => {
		const indices = await getCurrentTaskTrialIndices(id, "chatgpt");
		const { title, description } = await getTaskInfo(id, currentTaskIndex, "chatgpt");
		setTaskIndices(indices["taskIndices"]);
		setTrialIndices(indices["trialIndices"]);

		

		const newTaskIndex = indices["taskIndices"][indices["taskIndices"].length - 1];
		const newTrialIndex = indices["trialIndices"][newTaskIndex][indices["trialIndices"][newTaskIndex].length - 1];


		setCurrentTaskIndex(newTaskIndex);
		setCurrentTrialIndex(newTrialIndex);
		setTaskTitle(title);
		setTaskDescription(description);
	}

	const newInputConversation = () => {
		if (inputText == "") { return; }

		(async () => {
			await postConversation(id, currentTaskIndex, currentTrialIndex, inputText, "chatgpt");
			const newConversations = await getConversations(id, currentTaskIndex, currentTrialIndex, "chatgpt");
			setConversation(newConversations);
			// scrol to bottom
			chatInputButtonRef.current.disabled = false;
			chatRerunButtonRef.current.disabled = false;
			chatEndButtonRef.current.disabled = false;
		})();

		setConversation([...conversation, { role: "user", content: inputText }, { role: "assistant", content: "<loading>"}]);
		setInputText("");

		chatInputButtonRef.current.disabled = true;
		chatRerunButtonRef.current.disabled = true;
		chatEndButtonRef.current.disabled = true;

	}

	const rerunConversation = () => {
		(async () => {
			await postConversationStart(id, currentTaskIndex, currentTrialIndex + 1, "chatgpt");
			setCurrentTrialIndex(currentTrialIndex + 1);
		})();
	}

	const endConversation = () => {
		navigate(`/${lang}/${id}/${type}/survey/${step}/${currentTaskIndex}/system`);
	}

	useEffect(() => { 
		fetchTaskIndices(); 
		(async () => {
			const newConversations = await getConversations(id, currentTaskIndex, currentTrialIndex, "chatgpt");
			setConversation(newConversations);
		})();
	}, [currentTaskIndex, currentTrialIndex])

	useEffect(() =>{
		chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
	}, [conversation])

	return (
		<div className={styles.chatgptWrapper}>
			<div className={styles.chatgptIndexWrapper}>
				<h2>ChatGPT</h2>
				<p>Chat</p>
				<div className={styles.chatgptTaskList}>
					{taskIndices.map((task, index) => {
						return (
							trialIndices[task].map((trial, index2) => {
								return (
									<div 
										key={`${index}_${index2}`} 
										className={
											task === currentTaskIndex && trial === currentTrialIndex ? styles.chatgptCurrentTask : styles.chatgptTask
										}
									>
										{`Task ${parseInt(task) + 1} (Trial ${parseInt(trial) + 1})`}
									</div>
								)
							})
					)})}
						
	
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
					<div className={styles.chatHistoryWrapper} ref={chatHistoryRef}>
						{conversation.map((item, index) => {
							return (
								<div key={index} className={item.role === "user" ? styles.chatHistoryUserItem : styles.chatHistorySystemItem}>
									<div className={styles.chatHistoryItemContent}>
										<img src={metadata.icon[item.role]} alt={item.role} />
										{item.content === "<loading>" ? 
										<img src={metadata.icon["loading"]} alt="loading" /> :
										<p>{`${item.content}`}</p>}
									</div>
								</div>
							)
						})}
					</div>
					<div className={styles.chatInputWrapper}>
						<div className={styles.chatInputTextAreaWrapper}>
							<textarea placeholder={metadata.placeholder} value={inputText} onChange={(e) => setInputText(e.target.value)} className={styles.chatInput} rows={"5"} cols={"30"}></textarea>
							<button className={styles.chatInputButton} onClick={newInputConversation} ref={chatInputButtonRef}>
								<img src={inputSvg} alt="input" />
							</button>
						</div>
						<button className={styles.chatInputRerunButton} ref={chatRerunButtonRef} onClick={() => { rerunConversation(); }}>{metadata.rerun}</button>
						<button className={styles.chatInputEndButton} ref={chatEndButtonRef} onClick={() => { endConversation(); }}>{metadata.end}</button>
					</div>
				</div>
				
			</div>
			
		</div>
	);
}

export default ChatGPT;