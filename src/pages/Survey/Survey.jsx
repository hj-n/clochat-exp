import React, { useState, useEffect } from "react";

import styles from "./Survey.module.scss";

import { useParams, useNavigate } from 'react-router-dom';
import { getTaskInfo, postSurveyResult, postConversationStart, checkStudyComplete } from "../../utils/communication";

const Survey = () => {

	const { lang, id, type, step, taskIndex, surveyType} = useParams();

	const metadata  = require(`./metadata_${lang}`);
	const navigate = useNavigate();

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

	const submitSurvey = () => {
		(async () => {
			postSurveyResult(id, taskIndex, studyType, surveyType, surveyAnswer);
		})();
		(async () => {
			const isFinished = await checkStudyComplete(id, studyType, taskIndex);
			if (!isFinished) {
				await postConversationStart(id, parseInt(taskIndex) + 1, 0, "chatgpt");
				navigate(`/${lang}/${id}/${type}/chat/${step}`);
				// TODO
			}
			else {
				if (step === "study1" && type === "type1") {
					navigate(`/${lang}/${id}/${type}/explanation/study2`)
				}
			}

		})();
	}

	const checkSurveyOngoing = () => {
		for (let i = 0; i < surveyAnswer.length; i++) {
			if (surveyAnswer[i] == null) {
				return true;
			}
		}
		return false;
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
					<button 
						onClick={() => {submitSurvey();}}
						disabled={checkSurveyOngoing()}
					>{metadata.submit}</button>
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