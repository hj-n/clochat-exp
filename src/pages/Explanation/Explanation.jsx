import React, { useRef, useEffect } from "react";

import styles from "./Explanation.module.scss";
import { useParams, useNavigate } from 'react-router-dom';


const Explanation = () => {

	const { lang, id, type, step } = useParams();
	const metadata = require(`./metadata_${lang}`);
	const navigate = useNavigate();

	const explanationDescRef = useRef(null);
	const study1DescRef = useRef(null);
	const study2DescRef = useRef(null);
	const announcementRef = useRef(null);

	useEffect(() => {
		explanationDescRef.current.innerHTML = metadata.desc;
		study1DescRef.current.innerHTML = type === "type1"? metadata.chatgpt.type1_desc : metadata.clochat.type2_desc;
		study2DescRef.current.innerHTML = type === "type1"? metadata.clochat.type1_desc : metadata.chatgpt.type2_desc;
		announcementRef.current.innerHTML = metadata.announcement[type][step]
	})

	const studyList = type == "type1" ? [metadata.chatgpt, metadata.clochat] : [metadata.clochat, metadata.chatgpt];

	const nextLink = {
		"type1": { 
			"study1": `/${lang}/${id}/${type}/chat/${step}/x`,
			"study2": `/${lang}/${id}/${type}/explanation_clochat/${step}`
		},
		"type2": {
			"study1": `/${lang}/${id}/${type}/explanation_clochat/${step}`,
			"study2": `/${lang}/${id}/${type}/chat/${step}/x`
		}
	}[type][step];




	return (
		<div>
			<div className={styles.globalRoundedWrapper}>
				<div className={styles.explanationInnerWrapper}>
					<p className={styles.explanationDesc} ref={explanationDescRef}></p>
					<div className={styles.explanationInnerSubWrapper}>
						{studyList.map((study, index) => (
							<div className={styles.explanationStudyDesc} key={index}>
								{index == 0 ? <p ref={study1DescRef}></p> : <p ref={study2DescRef}></p>}
								<div className={styles.explanationStudyProcedureWrapper}>
									<div className={styles.explanationStudyProcedure}>
										{study.procedure.map((item, index) => {
											return (
												<div key={index} className={styles.explanationStudyStep}>{item}</div>
											)
										})}
									</div>
									<div className={styles.explanationIteration}>
										{study.iteration}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className={styles.announcementWrapper}>
				<h3 ref={announcementRef}></h3>
			</div>
			<div className={styles.buttonWrapper}>
				<button onClick={() => { navigate(nextLink) }}>{metadata.start}</button>
			</div>
		</div>
	)

}

export default Explanation;