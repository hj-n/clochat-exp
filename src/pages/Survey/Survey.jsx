import React, { useState, useEffect } from "react";

import styles from "./Survey.module.scss";

import { useParams, useNavigate } from 'react-router-dom';
import { getTaskInfo } from "../../utils/communication";

const Survey = () => {

	const { lang, id, type, step, taskIndex, surveyType} = useParams();

	const metadata  = require(`./metadata_${lang}`);

	const questions = require(`./${surveyType}_question_${lang}`); 
	const questions_2d = new Array(0);
	for (let i = 0; i < questions.length / 5; i++) {
		questions_2d.push(questions.slice(i * 5, i * 5 + 5));
	}

	const studyType = {
		"type1": { "study1": "chatgpt", "study2": "clochat" },
		"type2": { "study1": "clochat", "study2": "chatgpt" },
	}[type][step]

	const [taskTitle, setTaskTitle] = useState(null);
	const [taskDescription, setTaskDescription] = useState(null);
	const [surveyAnswer, setSurveyAnswer] = useState(new Array(questions.length).fill(null));

	const fetchTaskInfo = async () =>{
		const { title, description } = await getTaskInfo(id, taskIndex, studyType);
		setTaskTitle(title);
		setTaskDescription(description);
	}

	const updateAnswer = (index, answer) => {
		const newSurveyAnswer = [...surveyAnswer];
		newSurveyAnswer[index] = answer;
		setSurveyAnswer(newSurveyAnswer);
	}

	useEffect(() => { fetchTaskInfo() }, [])
	
	return (
		<div>
			<div className={styles.chatgptTaskDesc}>
				<div className={styles.chatgptTaskDescInnerWrapper}>
					<h3>{metadata.title}</h3>
					<div className={styles.chatgptTaskDescTitleWrapper}>
						<h4 className={styles.chatgptTaskDescTitle}>{`Task ${parseInt(taskIndex) + 1}`}</h4>
						<div className={styles.chatgptTaskDescContent}>
							<h5>{taskTitle}</h5>
							<p>{taskDescription}</p>
						</div>
					</div>
					<button>{metadata.submit}</button>
				</div>
			</div>
			<div className={styles.surveyWrapper}>
				{questions_2d.map((questions, index) => {
					return (
						<div className={styles.surveyInnerWrapper} key={index}>
							{questions.map((question, index2) => {
								return (
									<div className={styles.surveyQuestionWrapper} key={index2}>
										<h4>{`${question.index + 1}. ${question.question}`}</h4>
										<div className={styles.surveyQuestionButtonWrapper}>
											{new Array(7).fill(null).map((_, buttonIndex) => {
												return (
													<button 
														key={buttonIndex}
														className={surveyAnswer[question.index] === buttonIndex ? styles.surveyQuestionButtonSelected : styles.surveyQuestionButton}
														onClick={() =>{ updateAnswer(question.index, buttonIndex)}}
													>{buttonIndex + 1}</button>
												)
											})}
										</div>
									</div>
								)
							})}
						</div>
					)
				})}	
			</div>
		</div>
	);
}

export default Survey;