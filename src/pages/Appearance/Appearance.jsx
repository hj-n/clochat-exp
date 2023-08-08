import React from "react";

import styles from "./Appearance.module.scss";
import parse from 'html-react-parser';

const Appearance = (props) => {

	const { lang, id, personaNum } = props;

	const metadata = require(`./metadata_${lang}`);

	const [prompt, setPrompt] = React.useState("");

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
				<div className={styles.inputDiaglogueElementOuterWrapper}>
					<div className={styles.inputDialogueElementWrapper}>
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
					</div>
				</div>
				<h4>{metadata.select}</h4>
				<div className={styles.appearanceSelectWrapper}>
					<div>
						<img src={metadata.loading_img} width={"60"}/>
						<p>{metadata.loading}</p> 
					</div>
				</div>

			</div>
		</div>
	);
}

export default Appearance;