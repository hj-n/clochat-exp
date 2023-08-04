import React, { useRef, useEffect } from "react";

import styles from "./Explanation.module.scss";
import { useParams, useNavigate } from 'react-router-dom';


const Explanation = () => {

	const { lang, id, step } = useParams();
	const metadata = require(`./metadata_${lang}`);
	const navigate = useNavigate();

	const explanationDescRef = useRef(null);
	const study1DescRef = useRef(null);
	const study2DescRef = useRef(null);
	const announcementRef = useRef(null);

	useEffect(() => {
		explanationDescRef.current.innerHTML = metadata.desc;
		study1DescRef.current.innerHTML = metadata.study1.desc;
		study2DescRef.current.innerHTML = metadata.study2.desc;
		announcementRef.current.innerHTML = step == "study1" ? metadata.announcement.study1 : metadata.announcement.study2;
	})

	return (
		<div>
			<div className={styles.globalRoundedWrapper}>
				<div className={styles.explanationInnerWrapper}>
					<p className={styles.explanationDesc} ref={explanationDescRef}></p>
					<div className={styles.explanationInnerSubWrapper}>
						{[metadata.study1, metadata.study2].map((study, index) => (
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
				<button onClick={() => { navigate(`/${lang}/${id}/chatgptstudy/`) }}>{metadata.start}</button>
			</div>
		</div>
	)

}

export default Explanation;