import React, { useEffect, useRef } from "react";

import styles from "./Purpose.module.scss";
import { useParams, useNavigate } from 'react-router-dom';



const Purpose = () => {

	const { lang, id, type } = useParams();

	const metadata = require(`./metadata_${lang}`)
	const backgroundDescRef = useRef(null);

	const navigate = useNavigate();

	useEffect(() => {
		backgroundDescRef.current.innerHTML = metadata.background.desc;
	}, [])

	return (
		<div>
			<div className={styles.globalRoundedWrapper}>
				<div className={styles.purposeInnerWrapper}>
					<h5 className={styles.helloWrapper}><span>{metadata.hello}</span></h5>

					<div className={styles.backgroundWrapper}>
						<h4>{metadata.background.title}</h4>
						<p ref={backgroundDescRef}></p>
					</div>

					<div className={styles.personaWrapper}>
						<div>{`• ${metadata.persona.normal}`}</div>
						<div className={styles.personaPurple}>{metadata.persona.purple}</div>
					</div>

					<div className={styles.figureWrapper}>
						<div className={styles.figureInnerWrapper}>
							<img src={metadata.fig1.path}></img>
							<p>{metadata.fig1.desc}</p>
						</div>
						<div className={styles.figureInnerWrapper}>
							<img src={metadata.fig2.path} ></img>
							<p>{metadata.fig2.desc}</p>
						</div>
					</div>
				</div>
				

			</div>
			<div className={styles.buttonWrapper}>
					<button onClick={() => { navigate(`/${lang}/${id}/${type}/consent`) }}>{metadata.next}</button>
			</div>
		</div>
	)
}

export default Purpose;