import React from 'react';

import styles from "./Procedure.module.scss";
import parse from 'html-react-parser';

const Procedure = (props) => {

	const procedure = props.procedure;

	return (
		<div className={styles.procedureWrapper}>
			{procedure.steps.map((step, ind) => {
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
		</div>
	)

}

export default Procedure;