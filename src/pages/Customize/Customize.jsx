import React, { useEffect, useState } from 'react';

import styles from "./Customize.module.scss";

import { useParams } from 'react-router-dom';

import { getTaskInfo } from '../../utils/communication';
import Procedure from '../Procedure/Procedure';

const Customize = () => {

	const { lang, id, type, step, taskIndex } = useParams();

	const metadata = require(`./metadata_${lang}`);

	const [currentCategory, setCurrentCategory] = useState({ id: null });
	const [taskTitle, setTaskTitle] = useState("");
	const [taskDescription, setTaskDescription] = useState("");

	const fetchTask = async () => {
		const { title, description } = await getTaskInfo(id, taskIndex, "clochat");
		setTaskTitle(title);
		setTaskDescription(description);
	}

	const renderSwitch = () => {
		switch(currentCategory.id) {
			case "basic": 
				return (<div></div>)
			default:
				return (
					<div>
						<div className={styles.customizeDefaultWrapper}>
							<h1>{`Task ${taskIndex + 1}`}</h1>
							<h3>{taskTitle}</h3>
							<p>{taskDescription}</p>
						</div>
						<div className={styles.customizeProcedureWrapper}>
							<Procedure procedure={metadata.procedure} />
						</div>
					</div>
				)
		}
	}

	useEffect(() => { fetchTask(); }, []);

	return (
		<div>
			<div className={styles.customizeWrapper}>
				<div className={styles.leftBannerWrapper}>
					<h2>{metadata.title}</h2>
					<p className={styles.purpleText}>{metadata.subtitle}</p>
					<div className={styles.customizeToggleWrapper}>
						{metadata.categories.map((category, index) => {
							return (
								<div key={index} className={styles.customizeToggle}>
									<label className={styles.switch}>
										<input type="checkbox" />
										<span className={styles.slider + " " + styles.round}></span>
									</label>
									<h4>{category.key}</h4>
								</div>
							)
						})}
					</div>
				</div>
				<div className={styles.customizeMainPanel}>
					{renderSwitch()}
				</div>
			</div>
		</div>
	)
}

export default Customize;