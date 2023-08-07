import React, { useEffect, useRef } from "react";

import styles from "./ExplanationClochat.module.scss";

import { useParams, useNavigate } from "react-router-dom";
import parse from 'html-react-parser';
import Procedure from "../Procedure/Procedure";
import { postNewPersona } from "../../utils/communication";

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

	const handleNext = () => {
		(async () => {
			await postNewPersona(id, 0);
			navigate(`/${lang}/${id}/${type}/customize/${step}/0/0`)
		})();
	}



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
				<button onClick={() => {handleNext();}}>{metadata.next}</button>
			</div>
		</div>
	);
}

export default ExplanationClochat;