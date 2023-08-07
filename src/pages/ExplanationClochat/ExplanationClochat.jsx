import React, { useEffect, useRef } from "react";

import styles from "./ExplanationClochat.module.scss";

import { useParams, useNavigate } from "react-router-dom";
import parse from 'html-react-parser';
import Procedure from "../Procedure/Procedure";

const ExplanationClochat = () => {

	const {lang, id, type, step} = useParams();

	const metadata = require(`./metadata_${lang}`);
	const navigate = useNavigate();

	const desc1Ref = useRef(null);
	const desc2Ref = useRef(null);
	const procedureDescRef = useRef(null);

	useEffect(() => {
		desc1Ref.current.innerHTML = metadata.desc1;
		desc2Ref.current.innerHTML = metadata.desc2;
		procedureDescRef.current.innerHTML = metadata.procedure.desc;
	}, []);





	return (
		<div>
			<div className={styles.globalRoundedWrapper}>
				<div className={styles.descWrapper}>
					<p ref={desc1Ref}></p>
					<p ref={desc2Ref}></p>
				</div>
			</div>
			<div className={styles.globalRoundedWrapper}>
				<div className={styles.descWrapper}>
					<h4 ref={procedureDescRef}></h4>
					<Procedure procedure={metadata.procedure} />
					{/* <div className={styles.procedureWrapper}>
						{metadata.procedure.steps.map((step, ind) => {
							return (
								<div className={styles.procedureStep} key={ind}>
									<div className={styles.procedureStepTitle}>
										<div className={styles.procedureStepTitleNumber}>{step.index}</div>
										<h4>{step.title}</h4>
									</div>
									<div className={styles.procedureStepDesc}>
										{step.desc.map((singleDesc, ind2) => {
											return (
												<li key={ind2}>{parse(singleDesc)}</li>
											)
										})}
									</div>
								</div>
							)
						})}
					</div> */}
					<div className={styles.procedureAnnouncementWrapper}>
						{metadata.procedure.announcement.map((announce, index) => {
							return (
								<li>{parse(announce)}</li>
							)
						})}
					</div>
				</div>
			</div>
			<div className={styles.buttonWrapper}>
				<button onClick={() => {navigate(`/${lang}/${id}/${type}/customize/${step}/0`)}}>{metadata.next}</button>
			</div>
		</div>
	);
}

export default ExplanationClochat;