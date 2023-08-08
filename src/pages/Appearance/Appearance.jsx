import React, { useState, useEffect } from "react";

import styles from "./Appearance.module.scss";
import parse from 'html-react-parser';
import { getGeneratedImageUrls, postPersonaImg, getPersonaInfo } from "../../utils/communication";

const Appearance = (props) => {

	const { lang, id, personaNum, setSaveAppearance, isCategoryFinished, setIsCategoryFinished } = props;

	const metadata = require(`./metadata_${lang}`);

	const [prompt, setPrompt] = useState("");
	const [status, setStatus] = useState("idle"); // idle, loading, success
	const [promptEn, setPromptEn] = useState("");
	const [urls, setUrls] = useState([]);
	const [selectedUrlIndex, setSelectedUrlIndex] = useState(-1);

	const [selectingImg, setSelectingImg] = useState(true);



	const restallAppearance = () => {
		(async () => {
			const data = await getPersonaInfo(id, personaNum);
			console.log(data);
			setPrompt(data.promptKr == null ? "" : data.promptKr);
			setPromptEn(data.promptEn);
			setUrls(data.imgUrls);
			setSelectedUrlIndex(data.imgUrlIndex);
			setStatus("success");
		})();
	}


	const updateAppearance = () => {
		const newIsCategoryFinished = [...isCategoryFinished];
		newIsCategoryFinished[5] = true;
		setIsCategoryFinished(newIsCategoryFinished);
		setSelectingImg(true);
		postPersonaImg(id, personaNum, prompt, promptEn, urls, selectedUrlIndex);
	}



	const renderGenerationStatus = () => {
		switch (status) {
			case "idle": 
				return (
					<div></div>
				)
			case "loading":
				return (
					<div className={styles.appearanceSelectWrapper}>
						<div>
							<img src={metadata.loading_img} width={"60"} />
							<p>{metadata.loading}</p>
						</div>
					</div>
				)
			case "success":
				return (<div>
					<div className={styles.appearanceImageWrapper}>
						{urls.map((url, index) => {
							return (
								<img 
									src={url} key={index} 
									onClick={() => {
										setSelectedUrlIndex(index);
										setSaveAppearance(true);
										setSelectingImg(false);
										console.log(selectedUrlIndex, urls);
									}}
									className={index === selectedUrlIndex ? styles.appearanceImgSelected : ""}
								/>
							)
						})}
					</div>
				</div>)
		}
	}

	const generation = () => {
		setStatus("loading");
		setSelectedUrlIndex(-1);
		setSelectingImg(true);
		setUrls([]);
		(async () => {
			const data = await getGeneratedImageUrls(prompt);
			setPromptEn(data.promptEn);
			setUrls(data.imageUrls);
			setStatus("success");
		})();
	}

	useEffect(() => {
		restallAppearance();
	}, [])


	return (
		<div>
			<div className={styles.appearanceWrapper}>
				<h4>{metadata.title}</h4>
				<div className={styles.appearanceDescWrapper}>
					{metadata.contents.map((content, index) => {
						return (
							<li key={index}>{parse(content)}</li>
						)
					})}
				</div>
				<div className={styles.inputDialogueElementOuterWrapper}>
					<div className={styles.inputDialogueElementWrapper}>
						<div className={styles.inputDialogueGenerationWrapper}>
							<div className={styles.inputDialogueTextInputCheckboxWrapper}>
								<textarea
									placeholder={metadata.placeholder}
									value={prompt}
									onChange={(e) => { setPrompt(e.target.value) }}
								/>
								<div className={
									prompt !== "" ?
										styles.inputDialogueCheckboxSelected :
										styles.inputDialogueCheckbox
								}>
									{"✓"}
								</div>
							</div>
							<div className={styles.inputDialogueButtonWrapper}>
								<button onClick={() => { generation(); }}>{metadata.generation}</button>
							</div>
						</div>
					</div>
				</div>
				<h4>{metadata.select}</h4>
				{renderGenerationStatus()}
				<div className={styles.appearanceButtonWrapper}>
					<button 
						onClick={() => { updateAppearance(); }}
						disabled={selectingImg}
					>{metadata.save}</button>
				</div>
			</div>
		</div>
	);
}

export default Appearance;