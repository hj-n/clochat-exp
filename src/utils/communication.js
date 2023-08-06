import axios from "axios";

const server = "http://localhost:8888";

export async function registerParticipant(id) {
	const response = await axios.post(`${server}/register`, null, {
		params: { id: id }
	});
}

export async function updateParticipantDemographic(id, basicDemo, prelimDemo) {
	const params = {
		"id": id,
		"name": basicDemo.name,
		"age": basicDemo.age,
		"phone": basicDemo.phone,
		"gender": basicDemo.gender,
		"edu": basicDemo.edu,
		"job": basicDemo.job,
		"freq": prelimDemo.freq,
		"gen_ai_friendliness": prelimDemo.gen_ai_friendliness,
		"llm_friendliness": prelimDemo.llm_friendliness,
		"prompting_friendliness": prelimDemo.prompting_friendliness,
	}

	const response = await axios.post(`${server}/demographics`, null, {
		params: params
	});
}

export async function getCurrentTaskTrialIndices(id, studyType) {
	const response = await axios.get(`${server}/currenttasktrialindices`, {
		params: {
			id: id,
			studyType: studyType
		}
	});

	return response.data;
}

export async function getTaskInfo(id, index, studyType) {
	const response = await axios.get(`${server}/taskinfo`, {
		params: {
			id: id,
			index: index,
			studyType: studyType
		}
	});
	console.log(response.data)
	return response.data;
}

export async function postConversation(id, taskIndex, trialIndex, content, studyType) {
	const params = {
		id: id,
		taskIndex: taskIndex,
		trialIndex: trialIndex,
		content: content,
		studyType: studyType
	}

	const response = await axios.post(`${server}/postconversation`, null, {
		params: params
	});

	return response.data;
}

export async function getConversations(id, taskIndex, trialIndex,studyType) {
	const response = await axios.get(`${server}/getconversations`, {
		params: {
			id: id,
			taskIndex: taskIndex,
			trialIndex: trialIndex,
			studyType: studyType
		}
	});

	return response.data;
}

export async function postConversationStart(id, taskIndex, trialIndex, studyType) {
	const params = {
		id: id,
		taskIndex: taskIndex,
		trialIndex: trialIndex,
		studyType: studyType
	}
	const response = await axios.post(`${server}/postconversationstart`, null, {
		params: params
	});

	return response.data;
}

export async function postSurveyResult(id, taskIndex, studyType, surveyType, surveyResult) {
	const params = {
		id: id,
		taskIndex: taskIndex,
		studyType: studyType,
		surveyType: surveyType,
		surveyResult: "[" + surveyResult.toString() + "]"
	}

	console.log(params)

	const response = await axios.post(`${server}/postsurveyresult`, null, {
		params: params
	});

	return response.data;
}

export async function checkStudyComplete(id, studyType, taskIndex) {
	const response = await axios.get(`${server}/checkstudycomplete`, {
		params: {
			id: id,
			studyType: studyType,
			taskIndex: taskIndex
		}
	});

	return response.data.isComplete;
}