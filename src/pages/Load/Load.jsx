import React, { useEffect, useState } from "react";

import styles from "./Load.module.scss";
import { getNextPersonaNum, getPersonaInfoList, postNewPersona, postPersonaDialogue, postPersonaImg } from "../../utils/communication";

import { useParams, useNavigate } from "react-router-dom";

const Load = (props) => {

	const { lang, id, type, step, taskIndex, setShowLoadPersona } = props;

	const metadata = require(`./metadata_${lang}`); 
	const [personaInfoList, setPersonaInfoList] = useState([]);
	const [selectedPersonaIndex, setSelectedPersonaIndex] = useState(-1);

	const navigate = useNavigate();


	const fetchPersonaInfoList = () => {
		(async () => {
			const newPersonaInfoList = await getPersonaInfoList(id);
			newPersonaInfoList.forEach((personaInfo) => {
				const name = personaInfo.imageDialogue[0][metadata.nameKey]
				personaInfo["name"] = name;
			});

			setPersonaInfoList(newPersonaInfoList);

		})();
	}

	console.log(personaInfoList)

	const editPersona = () => {
		(async () => {
			const nextPersonaNum = await getNextPersonaNum(id);
			await postNewPersona(id, nextPersonaNum);
			await postPersonaDialogue(id, nextPersonaNum, personaInfoList[selectedPersonaIndex].imageDialogue, [false, false, false, false, false, false]);
			await postPersonaImg(id, nextPersonaNum, personaInfoList[selectedPersonaIndex].promptKr, personaInfoList[selectedPersonaIndex].promptEn, personaInfoList[selectedPersonaIndex].imgUrls,personaInfoList[selectedPersonaIndex].imgUrlIndex)
			setShowLoadPersona(false);
			navigate(`/${lang}/${id}/${type}/customize/${step}/${taskIndex}/${nextPersonaNum}`)
			navigate(0);

			
		})();
	}

	const startConversation = () => {

	}

	useEffect(() => {
		fetchPersonaInfoList();
	}, []);


	return (
		<div className={styles.loadWrapper}>
			<div className={styles.loadTitle}>
				<h2>{metadata.title}</h2>
				<img src={metadata.off_path} onClick={() => { setShowLoadPersona(false); }}></img>
			</div>
			<p>{metadata.desc}</p>
			<div className={styles.personaListWrapper}>
				{personaInfoList.map((personaInfo, index) => {
					return (
						<div 
							className={selectedPersonaIndex === index ? styles.personaWrapper + " " + styles.personaWrapperSelected :styles.personaWrapper} 
							key={index}
							onClick={() => { setSelectedPersonaIndex(index); }}
						>
							<img src={personaInfo.imgUrls[personaInfo.imgUrlIndex]}></img>
							<h4>{personaInfo.name}</h4>
						</div>
					)
				})}
			</div>
			<div className={styles.loadButtonWrapper}>
				<button 
					className={styles.editStartButton}
					disabled={selectedPersonaIndex === -1}
					onClick={() => { editPersona(); }}
				>{metadata.edit}</button>
				<button 
					className={styles.startConvButton}
					disabled={selectedPersonaIndex === -1}
					onClick={() => { startConversation(); }}
				>{metadata.conversation}</button>

			</div>
		</div>
	)

}

export default Load;