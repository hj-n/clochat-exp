import React, { useEffect } from "react";

import styles from "./Interview.module.scss";
import { useParams, useNavigate } from 'react-router-dom';



const Interview = () => {

	const { lang, id } = useParams();
	const metadata = require(`./metadata_${lang}`);
	const navigate = useNavigate();

	useEffect(() => {
		document.body.style.backgroundColor = "#8071FC";
		return () => { document.body.style.backgroundColor = "#F9FAFD"; }
	});

	return (
		<div className={styles.introWrapper}>
			<h1>{metadata.title}</h1>
			<div className={styles.interviewEndWrapper}>
				<h2>{metadata.announcement}</h2>
				<div className={styles.buttonWrapper}>
					<button onClick={() => {navigate(`/${lang}/${id}/explanation/study1`)}}>{metadata.next}</button>
				</div>
			</div>
		</div>
	);
}

export default Interview;