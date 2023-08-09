import React, { useState } from "react";

import styles from "./Preview.module.scss";
import { getPersonaPreview } from "../../utils/communication";

import parse from 'html-react-parser';

const Preview = (props) => {

	const { lang, id, personaNum } = props;
	const metadata = require(`./metadata_${lang}`);

	const [previewPrompt, setPreviewPrompt] = useState(metadata.default);
	const [answer, setAnswer] = useState("");

	const getAnswer = () => {
		(async () => {
			const answer = await getPersonaPreview(id, personaNum, previewPrompt);
			setAnswer(answer);
		})();
		setAnswer("<loading>");
	}



	return (

		<div className={styles.previewWrapper}>
			<div className={styles.previewTitleWrapper}>
				<p>{metadata.desc1}</p>
				<p className={styles.previewDescPurple}>{metadata.desc2}</p>
			</div>
			<div className={styles.inputDialogueTextInputCheckboxWrapper}>
				<textarea
					placeholder={metadata.placeholder}
					value={previewPrompt}
					onChange={(e) => { setPreviewPrompt(e.target.value); }}
				/>
				<button onClick={() => { getAnswer(); }}>{metadata.submit}</button>
			</div>
			{answer !== "" && <div className={styles.previewAnswerWrapper}>
			
				<div className={styles.previewAnswerCircle}></div>
				{answer === "<loading>" ? 	
					<img src={metadata.loading}></img> : 
					<p className={styles.previewAnswerText}>{parse(answer)}</p>
				}

			</div>}
		</div>
	
	);

}

export default Preview;