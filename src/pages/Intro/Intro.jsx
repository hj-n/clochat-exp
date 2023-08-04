import React, { useEffect } from 'react';

import styles from "./Intro.module.scss";
import { useParams, useNavigate } from 'react-router-dom';


const Intro = () => {

	const { lang, id, type } = useParams();
	const metadata = require(`./metadata_${lang}`)
	const navigate = useNavigate();

	useEffect(() => {
		document.body.style.backgroundColor = "#8071FC";
		return () => { document.body.style.backgroundColor = "#F9FAFD"; }
	});


	return (
		<div className={styles.introWrapper}>
			<div className={styles.titleWrapper}>
				<h1>{metadata.title}</h1>
				<h2>{metadata.subtitle}</h2>
			</div>
			<div className={styles.contactWrapper}>
				<h4>{metadata.contact.desc}</h4>
				<div className={styles.conactList}>
					{metadata.contact.list.map((item, index) => (
						<p key={index}>{item}</p>
					))}
				</div>
				<div className={styles.buttonWrapper}>
						<button onClick={() => {navigate(`/${lang}/${id}/${type}/purpose`)}}>{metadata.next}</button>
				</div>
			</div>
		</div>
	)
};

export default Intro;