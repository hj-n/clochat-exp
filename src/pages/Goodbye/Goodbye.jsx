import React, { useEffect } from "react";

import { useParams } from 'react-router-dom';

import parse from 'html-react-parser';

import styles from "./Goodbye.module.scss";


const Goodbye = () => {

	const { lang } = useParams();

	const metadata = require(`./metadata_${lang}`);

	useEffect(() => {
		document.body.style.backgroundColor = "#8071FC";
		return () => { document.body.style.backgroundColor = "#F9FAFD"; }
	});

	return (
		<div className={styles.goodbyeWrapper}>
			{metadata.goodbye.map((item, index) => {
				return (
					<p key={index}>{parse(item)}</p>
				)
			})}

		</div>
	)

}

export default Goodbye;