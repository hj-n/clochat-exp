import React from 'react';

import styles from "./Intro.module.scss";
import { useParams } from 'react-router-dom';


const Intro = () => {

	const { lang = "kr" } = useParams();
	

	const metadata = require(`./metadata_${lang}`)


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
			</div>
		</div>
	)
};

export default Intro;