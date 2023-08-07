import React, { useEffect, useState } from 'react';

import styles from "./Customize.module.scss";

import { useParams } from 'react-router-dom';

import { getTaskInfo } from '../../utils/communication';
import Procedure from '../Procedure/Procedure';

const Customize = () => {

	const { lang, id, type, step, taskIndex } = useParams();

	const metadata = require(`./metadata_${lang}`);

	const [currentCategory, setCurrentCategory] = useState({ id: null });
	const [currentCategoryIndex, setCurrentCategoryIndex] = useState(-1);
	const [isCategoryFinished, setIsCategoryFinished] = useState(new Array(metadata.categories.length).fill(false));
	const [taskTitle, setTaskTitle] = useState("");
	const [taskDescription, setTaskDescription] = useState("");
	const [inputDialogue, setInputDialogue] = useState(
		metadata.categories.map((category, index) => { return {}})
	)

	const fetchTask = async () => {
		const { title, description } = await getTaskInfo(id, taskIndex, "clochat");
		setTaskTitle(title);
		setTaskDescription(description);
	}

	const renderTaskDescription = () => {
		return (
			<div className={styles.chatgptTaskDesc}>
				<div className={styles.chatgptTaskDescInnerWrapper}>
					<h4 className={styles.chatgptTaskDescTitle}>{`Task ${taskIndex + 1}`}</h4>
					<div className={styles.chatgptTaskDescContent}>
						<h5>{taskTitle}</h5>
						<p>{taskDescription}</p>
					</div>
				</div>
			</div>
		)
	}

	const findInputFromDialogue = (categoryIndex, property) => {
		return inputDialogue[categoryIndex][property] !== undefined ? inputDialogue[categoryIndex][property] : "";
	}

	const updateInputDialogue = (categoryIndex, property, value) => {
		const newInputDialogue = [...inputDialogue];
		newInputDialogue[categoryIndex][property] = value;
		setInputDialogue(newInputDialogue);
	}

	const finishCategory = (categoryIndex) => {
		const newIsCategoryFinished = [...isCategoryFinished];
		newIsCategoryFinished[categoryIndex] = true;
		setIsCategoryFinished(newIsCategoryFinished);
		if (categoryIndex < metadata.categories.length - 1) {
			setCurrentCategory(metadata.categories[categoryIndex + 1].id);
			setCurrentCategoryIndex(categoryIndex + 1);
		}
	}

	const renderInputDialogue = (categoryIndex) => {
		return (
			<div>
				<div className={styles.inputDialogueWrapper}>
					<div className={styles.inputDialogueTitleWrapper}>
						<h3>{metadata.categories[categoryIndex].key}</h3>
						<button onClick={() => { finishCategory(categoryIndex); }}>
							{metadata.save}
						</button>
					</div>
					<div className={styles.inputDialogueInnerWrapperGrid}>
						{metadata.categories[categoryIndex].inputs.map((input, index) => {
							if (input.type === "text") {
								return (
									<div className={styles.inputDialogueElementWrapper}>
										<h4>{input.property}</h4>
										<div className={styles.inputDialogueTextInputCheckboxWrapper}> 
											<textarea 
												placeholder={metadata.placeholder} 
												value={findInputFromDialogue(categoryIndex, input.property)}
												onChange={(e) => {updateInputDialogue(categoryIndex, input.property, e.target.value)}}
											/>
											<div className={
												findInputFromDialogue(categoryIndex, input.property) !== "" ? 
												styles.inputDialogueCheckboxSelected :
												styles.inputDialogueCheckbox
											}>
												{"✓"}
											</div>
										</div>
									</div>
								)
							}
							else if (input.type === "radio") {
								return (
									<div className={styles.inputDialogueElementWrapper}>
										<h4>{input.property}</h4>
										<div className={styles.inputDialogueRadioWrapper}>
											{input.options.map((option, index) => {
												return (
													<div className={styles.inputDialogueRadioInnerWrapper}>
														<button
															className={
																findInputFromDialogue(categoryIndex, input.property) === option ? 
																styles.circleButtonSelected :
																styles.circleButton
															}
															onClick={() => {
																if (findInputFromDialogue(categoryIndex, input.property) === option) {
																	updateInputDialogue(categoryIndex, input.property, "");
																}
																else {
																	updateInputDialogue(categoryIndex, input.property, option);
																}
															}}
														>{"✓"}</button>
														<p className={styles.circleButtonText}>{option}</p>
													</div>
												)
											})}

										</div>
									</div>
								)
							}
						})}
					</div>
				</div>
			</div>
		)
	}

	const renderSwitch = () => {
		switch(currentCategory) {
			case "basic": 
				return (<div>
					{renderTaskDescription()}
					{renderInputDialogue(currentCategoryIndex)}
				</div>)
			default:
				return (
					<div className={styles.customizeDefaultOuter}>
						<div className={styles.customizeDefaultWrapper}>
							<h1>{`Task ${taskIndex + 1}`}</h1>
							<h3>{taskTitle}</h3>
							<p>{taskDescription}</p>
						</div>
						<div className={styles.customizeProcedureWrapper}>
							<Procedure procedure={metadata.procedure} />
						</div>
					</div>
				)
		}
	}

	useEffect(() => { fetchTask(); }, []);

	return (
		<div>
			<div className={styles.customizeWrapper}>
				<div className={styles.leftBannerWrapper}>
					<h2>{metadata.title}</h2>
					<p className={styles.purpleText}>{metadata.subtitle}</p>
					<div className={styles.customizeToggleWrapper}>
						{metadata.categories.map((category, index) => {
							return (
								<div key={index} className={
									currentCategory === category.id ? styles.customizeToggleSelected + " " + styles.customizeToggle :styles.customizeToggle
								}
								onClick= {() => {setCurrentCategory(category.id); setCurrentCategoryIndex(index);}}
								>
									<label className={styles.switch}>
										<input 
											type="checkbox" 
											checked={isCategoryFinished[index]} 
										 />
										<span className={styles.slider + " " + styles.round}></span>
									</label>
									<h4>{category.key}</h4>
								</div>
							)
						})}
					</div>
				</div>
				<div className={styles.customizeMainPanel}>
					{renderSwitch()}
				</div>
			</div>
		</div>
	)
}

export default Customize;