import React, { useState, useEffect } from "react";

import styles from "./Demographic.module.scss";
import { useParams, useNavigate } from 'react-router-dom';
import { updateParticipantDemographic } from "../../utils/communication";

const Demographic = () => {

	const { lang, id, type } = useParams();
	const metadata = require(`./metadata_${lang}`)

	const navigate = useNavigate();


	const basicDemoDict = metadata.basic.collect.reduce((acc, item) => { acc[item.id] = ""; return acc; }, {});
	const [basicDemo, setBasicDemo] = useState(basicDemoDict);

	const prelimDemoDict = metadata.prelim.collect.reduce((acc, item) => { acc[item.id] = ""; return acc; }, {});
	const [prelimDemo, setPrelimDemo] = useState(prelimDemoDict);

	const [finished, setFinished] = useState(false);

	console.log(basicDemo, prelimDemo)

	const updateFinished = () => {
		for (const key in basicDemo) {
			if (basicDemo[key] == "") { setFinished(false); return; }
		}
		for (const key in prelimDemo) {
			if (prelimDemo[key] == "") { setFinished(false); return; }
		}
		setFinished(true);
	}

	useEffect(() => { updateFinished(); }, [basicDemo, prelimDemo])



	return (
		<div>
			<div className={styles.demoParent}>
				<div className={styles.demoOuterWrapper + " " + styles.demoOuterWrapperLeft}>
					<h3 className={styles.demoTitle}>{metadata.basic.title}</h3>
					<div className={styles.globalRoundedWrapper}>
						<div className={styles.demoInnerWrapper}>
							{metadata.basic.collect.map((item, index) =>{
								if (item.type == "text") {
									return (
										<div key={index} className={styles.demoInputWrapper}>
											<label htmlFor={item.id}>{item.title}</label>
											<input 
												type="text" id={item.id} name={item.id} value={basicDemo[item.id]} 
												onChange={(e) => { setBasicDemo({...basicDemo, [item.id]: e.target.value}); }}
											/>
										</div>
									)
								}
								else if (item.type == "radio") {
									return (
										<div key={index} className={styles.demoInputWrapper}>
											<label htmlFor={item.id}>{item.title}</label>
											<div className={styles.demoRadioWrapper}>
												{item.options.map((option, index) => {
													return (
														<div key={index} className={styles.demoRadioOption}>
															<input 
																type="radio" id={option} name={item.id} value={item.values[index]} 
																onChange={(e) => { setBasicDemo({...basicDemo, [item.id]: e.target.value}); }}
															/>
															<label htmlFor={option} className={styles.optionLabel}>{option}</label>
														</div>
													)
												})}
											</div>
										</div>
									)
								}
							})}
							<div className={styles.demoInfoAlarm}>
								<p>{metadata.basic.desc}</p>
							</div>
						</div>

					</div>
				</div>
				<div className={styles.demoOuterWrapper + " " + styles.demoOuterWrapperRight}>
					<h3 className={styles.demoTitle}>{metadata.prelim.title}</h3>	
					<div className={styles.globalRoundedWrapper}>
						<div className={styles.demoInnerWrapper}>
							{metadata.prelim.collect.map((item, index) => {
								return (
									<div key={index} className={styles.demoPrelimQuestionWrapper}>
										<h5>{item.question}</h5>
										<div className={styles.demoPrelimOptionWrapper}>
											{item.options.map((option, index) => {
												return (
													<div key={index} className={styles.demoPrelimOptionWrapper}>
														<input 
															type="radio" id={`${item.id}_${option}`} name={item.id} value={index + 1} 
															onChange={(e) => { setPrelimDemo({...prelimDemo, [item.id]: e.target.value}); }}
														/>
														<label htmlFor={`${item.id}_${option}`} className={styles.optionLabel}>{option}</label>
													</div>
												)
											})}
										</div>
									</div>
								)
							})}
						</div>
					</div>
				</div>
				
			</div>
			<div className={styles.buttonWrapper}>
				<button onClick={() => { 
					updateParticipantDemographic(id, basicDemo, prelimDemo);
					navigate(`/${lang}/${id}/${type}/interview`);
				}} disabled={!finished}>{metadata.submit}</button>
			</div>
		</div>
	)
}

export default Demographic;