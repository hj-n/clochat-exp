import React, { useEffect, useState } from 'react';

import styles from "./Customize.module.scss";

import { useParams, useNavigate } from 'react-router-dom';

import { getPersonaDialogue, getTaskInfo, postPersonaDialogue } from '../../utils/communication';
import Procedure from '../Procedure/Procedure';
import Appearance from '../Appearance/Appearance';
import Preview from '../Preview/Preview';

const Customize = () => {

	const { lang, id, type, step, taskIndex, personaNum } = useParams();


	const metadata = require(`./metadata_${lang}`);
	const navigate = useNavigate();

	const [currentCategory, setCurrentCategory] = useState({ id: null });
	const [currentCategoryIndex, setCurrentCategoryIndex] = useState(-1);
	const [isCategoryFinished, setIsCategoryFinished] = useState(new Array(metadata.categories.length).fill(false));
	const [taskTitle, setTaskTitle] = useState("");
	const [taskDescription, setTaskDescription] = useState("");
	const [inputDialogue, setInputDialogue] = useState(
		metadata.categories.map((category, index) => { return {}})
	)

	const [saveAppearance, setSaveAppearance] = useState(false);
	const [showPreview, setShowPreview] = useState(false);


	const fetchTask = async () => {
		const { title, description } = await getTaskInfo(id, taskIndex, "clochat");
		setTaskTitle(title);
		setTaskDescription(description);
	}

	const fetchDialogue = async () => {
		const { dialogue, isCategoryFinished }  = await getPersonaDialogue(id, personaNum);
		setInputDialogue(dialogue);
		setIsCategoryFinished(isCategoryFinished);
	}

	const updateDialogue = (categoryIndex) => {
		const newIsCategoryFinished = [...isCategoryFinished];
		newIsCategoryFinished[categoryIndex] = true;
		postPersonaDialogue(id, personaNum, inputDialogue, newIsCategoryFinished);
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
		if (value === "") {
			delete newInputDialogue[categoryIndex][property];
			setInputDialogue(newInputDialogue);
		}
		else if (value === false) {
			delete newInputDialogue[categoryIndex][property];
			setInputDialogue(newInputDialogue);
		}
		else {
			newInputDialogue[categoryIndex][property] = value;
			setInputDialogue(newInputDialogue);
		}
	}

	const checkInputFromDialogueList = (categoryIndex, property, value) => {
		if (inputDialogue[categoryIndex][property] !== undefined) {
			if (inputDialogue[categoryIndex][property].includes(value)) {
				return true;
			}
		}
		return false;
	}

	const updateInputDialogueList = (categoryIndex, property, value, isAdding) => {
		const newInputDialogue = [...inputDialogue];
		if (isAdding) {
			if (newInputDialogue[categoryIndex][property] === undefined) {
				newInputDialogue[categoryIndex][property] = [value];
			}
			else {
				newInputDialogue[categoryIndex][property].push(value);
			}
		}
		else {
			const index = newInputDialogue[categoryIndex][property].indexOf(value);
			if (index > -1) {
				newInputDialogue[categoryIndex][property].splice(index, 1);
			}
			if (newInputDialogue[categoryIndex][property].length === 0) {
				delete newInputDialogue[categoryIndex][property];
			}
		}
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


	const renderTextDialogue = (categoryIndex, input, index, end=false, title=true) => {

		return (
			<div className={
				(!end) ? styles.inputDialogueElementWrapper: styles.inputDialogueElementWrapperEnd + " " + styles.inputDialogueElementWrapper
			} key={index}>
				{title && <h4>{input.property}</h4>}
				<div className={styles.inputDialogueTextInputCheckboxWrapper}>
					<textarea
						placeholder={metadata.placeholder}
						value={findInputFromDialogue(categoryIndex, input.property)}
						onChange={(e) => { updateInputDialogue(categoryIndex, input.property, e.target.value) }}
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

	const renderRadioDialogue = (categoryIndex, input, index, underline=false, title=true, end=false) => {
		return (
			<div className={
				(!end) ? styles.inputDialogueElementWrapper : styles.inputDialogueElementWrapperEnd + " " + styles.inputDialogueElementWrapper
			} key={index}>
				{title && <h4>{input.property}</h4>}
				<div className={styles.inputDialogueRadioWrapper}>
					{input.options.map((option, subIndex) => {
						return (
							<div className={styles.inputDialogueRadioInnerWrapper} key={subIndex}>
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
				{underline && <div className={styles.inputDialogueRadioUnderlineWrapper}></div>}
			</div>
		)
	}

	const renderMultiSelectRadioDialogue = (categoryIndex, input, index, title=false) => {

		return (
			<div className={styles.inputDialogueElementWrapper} key={index}>
				{title && <h4>{input.property}</h4>}
				<div className={styles.inputDialogueMultiSelectRadioWrapper}>
					{input.options.map((option, subIndex) => {
						return (
							<div className={styles.inputDialogueMultiSelectRadioInnerWrapper} key={subIndex}>
								<button 
									className={checkInputFromDialogueList(categoryIndex, input.property, option) ? styles.circleButtonSelected : styles.circleButton}
									onClick= {() => {
										if (!checkInputFromDialogueList(categoryIndex, input.property, option)) {
											updateInputDialogueList(categoryIndex, input.property, option, true);
										}
										else {
											updateInputDialogueList(categoryIndex, input.property, option, false);
										}
									}}
								>{"✓"}</button>
								<p className={styles.circleButtonText}>{option}</p>
							</div>
					)})}

				</div>
			</div>
		)
	}

	const renderCheckboxDialogue = (categoryIndex, input, index) => {
		return (
			<div className={styles.inputDialogueCheckboxWrapper} key={index}>
				<h4>{input.property}</h4>
				<button 
					className={findInputFromDialogue(categoryIndex, input.property) === true ? styles.circleButtonSelected: styles.circleButton}
					onClick={() => {
						if (findInputFromDialogue(categoryIndex, input.property) === "" || 
							findInputFromDialogue(categoryIndex, input.property) === false) {
							updateInputDialogue(categoryIndex, input.property, true);
						}
						else {
							updateInputDialogue(categoryIndex, input.property, false);
						}
					}}
				>{"✓"}</button>

			</div>
		)
	}

	const renderInputDialogueTitle = (categoryIndex, disabler=null, removeButton=false) => {
		return (
			<div className={styles.inputDialogueTitleWrapper}>
				<h3>{metadata.categories[categoryIndex].key}</h3>
				{!removeButton && 
					<button 
						onClick={async () => { 
							finishCategory(categoryIndex); 
							updateDialogue(categoryIndex); 
						}}
						disabled={disabler === null ? false : disabler}
					>
						{metadata.save}
					</button>
				}
			</div>
		)	
	}


	const renderInputDialogue = (categoryIndex) => {
		return (
			<div>
				<div className={styles.inputDialogueWrapper}>
					{renderInputDialogueTitle(categoryIndex)}
					<div className={styles.inputDialogueInnerWrapperGrid}>
						{metadata.categories[categoryIndex].inputs.map((input, index) => {
							if      (input.type === "text") { return renderTextDialogue(categoryIndex, input, index) }
							else if (input.type === "radio") { return  renderRadioDialogue(categoryIndex, input, index) }
							else if (input.type === "multipleRadio") { return renderMultiSelectRadioDialogue(categoryIndex, input, index, true) }
							else if (input.type === "checkbox") { return renderCheckboxDialogue(categoryIndex, input, index) }
						})}
					</div>
					<div className={styles.inputDialogueInnerWrapperFlex}>
						{metadata.categories[categoryIndex].inputs.map((input, index) => {
							if (input.type === "hybrid") {
								return (
									<div key={index}>
										<h2>{input.property}</h2>
										<div className={styles.inputDialogueSubInnerWrapperFlex}>
											{input.input.map((subInput, subIndex) => {
												if (subInput.type === "text") { return renderTextDialogue(categoryIndex, subInput, subIndex, true, false) }
												else if (subInput.type === "radio") {return renderRadioDialogue(categoryIndex, subInput, subIndex, true, false)}
												else if (subInput.type === "multipleRadio") {return renderMultiSelectRadioDialogue(categoryIndex, subInput, subIndex)}
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
			case "conversation":
			case "emoji":
			case "expertise":
			case "else":
				return (<div>
					{renderTaskDescription()}
					{renderInputDialogue(currentCategoryIndex)}
				</div>)
			case "appearance":
				return (
					<div>
						{renderTaskDescription()}
						<div>
							<div className={styles.inputDialogueWrapper}>
								{renderInputDialogueTitle(currentCategoryIndex, !saveAppearance, true)}
								<Appearance 
									lang={lang}
									id={id}
									personaNum={personaNum}
									setSaveAppearance={setSaveAppearance}
									isCategoryFinished={isCategoryFinished}
									setIsCategoryFinished={setIsCategoryFinished}
								/>
							</div>
						</div>
					</div>	
				)
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

	const submitPersona = () => {
		navigate(`/${lang}/${id}/${type}/chat/${step}`)
	}

	useEffect(() => { 
		(async () => {
			await fetchTask(); 
			await fetchDialogue();
		})();
	}, []);

	return (
		<div>
			<div className={styles.customizeWrapper}>
				<div className={styles.leftBannerWrapper}>
					<h2>{metadata.title}</h2>
					<p className={styles.purpleText}>{metadata.subtitle}</p>
					<div className={styles.customizeToggleWrapper}>
						{metadata.categories.map((category, index) => {
							return (
								<div key={index}>
									<div  className={
										currentCategory === category.id ? styles.customizeToggleSelected + " " + styles.customizeToggle :styles.customizeToggle
									}
									onClick= {() => {setCurrentCategory(category.id); setCurrentCategoryIndex(index);}}
									>
										<label className={styles.switch}>
											<input 
												type="checkbox" 
												checked={isCategoryFinished[index]}
												onChange={() => {}} 
											/>
											<span className={styles.slider + " " + styles.round}></span>
										</label>
										<h4>{category.key}</h4>
									</div>
									<div className={styles.customizeToggleSummary}>
										{Object.keys(inputDialogue[index]).map((key, index2) => {
											if (inputDialogue[index][key] === true) {
												return (
													<span key={index2}>{key}</span>
												)
											}
											else if (typeof(inputDialogue[index][key]) === "string") {
												return (
													<span key={index2}>{inputDialogue[index][key]}</span>
												)
											}
											else {
												return inputDialogue[index][key].map((item, index3) => {
													return (
														<span key={index3}>{item}</span>
													)
												})
											}
										})}
									</div>

								</div>
							)
						})}
					</div>
					<div className={styles.customizeFinalButtonWrapper}>
						<button 
							className={styles.customizeSubmitButton}
							disabled={isCategoryFinished.includes(false)}
							onClick={() => { submitPersona(); }}
						>{metadata.submit}</button>
						<button 
							className={showPreview ? styles.customizePreviewButtonShowPreview : styles.customizePreviewButton}
							onClick={() => {setShowPreview(!showPreview);}}
						>{showPreview ? metadata.preview_cancel : metadata.preview}</button>
					</div>
				</div>
				<div className={styles.customizeMainPanel}>
					{renderSwitch()}
				</div>
			</div>
			{showPreview && 
			<div>
				<div className={styles.previewOverlay}>
					<Preview
						lang={lang}
						id={id}
						personaNum={personaNum}
					/>
				</div>
			</div>

			}
		</div>
	)
}

export default Customize;