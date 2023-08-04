import React, { useState } from 'react';

import styles from "./Consent.module.scss";
import { useParams, useNavigate } from 'react-router-dom';

const Consent = () => {

	const { lang, id, type } = useParams();

	const metadata = require(`./metadata_${lang}`)
	const navigate = useNavigate();


	const [consent, setConsent] = useState(null);
	


	return (
		<div>
			<div className={styles.globalRoundedWrapper}>
				<div className={styles.consentInnerWrapper}>
					<h5 className={styles.helloWrapper}><span>{metadata.hello}</span></h5>
					<div className={styles.protocolWrapper}>
						{metadata.protocol.map((item, index) => {
							return (
								<div key={index} className={styles.protocolInnerWrapper}>
									<h4>{item.title}</h4>
									<p>{item.desc}</p>
									{item.procedure && (<div className={styles.stepWrapper}>
										{item.procedure.map((step, index) => {
											return (
												<div key={index} className={styles.stepInnerWrapper}>
													{item.bold[index] ? <p><b>{step}</b></p> : <p>{step}</p>}
												</div>
											)
										})}
									</div>)}
								</div>
							)
						})}
					</div>
				</div>
			</div>
			
			<div className={styles.globalRoundedWrapper}>
				<div className={styles.consentInnerWrapper}>
					<div className={styles.consentQuestionWrapper}>
						<p>{metadata.consent}</p>
					</div>
					<div className={styles.consentAnswerWrapper}>
							<div className={styles.consentAnswerOption}>
								<input type="radio" id="yes" name="consent" value="yes" onChange={() => setConsent(true)} checked={consent === true}/>
								<label htmlFor="yes">{metadata.answer.yes}</label>
							</div>
							<div className={styles.consentAnswerOption}>
								<input type="radio" id="no" name="consent" value="no" onChange={() => setConsent(false)} checked={consent === false}/>
								<label htmlFor="no">{metadata.answer.no}</label>
							</div>
					</div>
				</div>
			</div>

			<div className={styles.buttonWrapper}>
				<button onClick={() => { navigate(`/${lang}/${id}/${type}/demographic`) }} disabled={!consent}>{metadata.submit}</button>
			</div>
		</div>
	)
}

export default Consent;