import axios from "axios";
import axiosRetry from 'axios-retry';

const server = "http://147.46.240.50:9109";

export async function registerParticipant(id) {
	axiosRetry(axios, { retries: 3 });

	const response = await axios.post(`${server}/register`, null, {
		params: { id: id }
	});
}

export async function updateParticipantDemographic(id, basicDemo, prelimDemo) {
	axiosRetry(axios, { retries: 3 });

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
	axiosRetry(axios, { retries: 3 });
	const response = await axios.get(`${server}/currenttasktrialindices`, {
		params: {
			id: id,
			studyType: studyType
		}
	});

	return response.data;
}

export async function getTaskInfo(id, index, studyType) {
	axiosRetry(axios, { retries: 3 });
	const response = await axios.get(`${server}/taskinfo`, {
		params: {
			id: id,
			index: index,
			studyType: studyType
		}
	});
	return response.data;
}

export async function postConversation(id, taskIndex, trialIndex, content, studyType, personaNum) {
	axiosRetry(axios, { retries: 3 });
	const params = {
		id: id,
		taskIndex: taskIndex,
		trialIndex: trialIndex,
		content: content,
		studyType: studyType,
		personaNum: personaNum
	}

	const response = await axios.post(`${server}/postconversation`, null, {
		params: params
	});

	return response.data;
}

export async function getConversations(id, taskIndex, trialIndex,studyType) {
	axiosRetry(axios, { retries: 3 });
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

export async function postConversationStart(id, taskIndex, trialIndex, studyType, personaNum) {
	axiosRetry(axios, { retries: 3 });
	const params = {
		id: id,
		taskIndex: taskIndex,
		trialIndex: trialIndex,
		studyType: studyType,
		personaNum: personaNum
	}
	const response = await axios.post(`${server}/postconversationstart`, null, {
		params: params
	});

	return response.data;
}

export async function postSurveyResult(id, taskIndex, studyType, surveyType, surveyResult) {
	axiosRetry(axios, { retries: 3 });
	const params = {
		id: id,
		taskIndex: taskIndex,
		studyType: studyType,
		surveyType: surveyType,
		surveyResult: "[" + surveyResult.toString() + "]"
	}


	const response = await axios.post(`${server}/postsurveyresult`, null, {
		params: params
	});

	return response.data;
}

export async function checkStudyComplete(id, studyType, taskIndex) {
	axiosRetry(axios, { retries: 3 });
	const response = await axios.get(`${server}/checkstudycomplete`, {
		params: {
			id: id,
			studyType: studyType,
			taskIndex: taskIndex
		}
	});

	return response.data.isComplete;
}

export async function postNewPersona(id, personaNum) {
	axiosRetry(axios, { retries: 3 });
	const response = await axios.post(`${server}/postnewpersona`, null, {
		params: {
			id: id,
			personaNum: personaNum
		}
	});

	return response.data;
}

export async function getPersonaDialogue(id, personaNum) {
	axiosRetry(axios, { retries: 3 });
	const response = await axios.get(`${server}/getpersonadialogue`, {
		params: {
			id: id,
			personaNum: personaNum
		}
	});



	return response.data
}

export async function postPersonaDialogue(id, personaNum, dialogue, isCategoryFinished) {
	axiosRetry(axios, { retries: 3 });
	const response = await axios.post(`${server}/postpersonadialogue`, null, {
		params: {
			id: id,
			personaNum: personaNum,
			dialogue: JSON.stringify(dialogue),
			isCategoryFinished: JSON.stringify(isCategoryFinished)
		}
	});


	return response.data;
}

export async function postIsCategoryFinished(id, personaNum, isCategoryFinished) {
	axiosRetry(axios, { retries: 3 });
	const response = await axios.post(`${server}/postiscategoryfinished`, null, {
		params: {
			id: id,
			personaNum: personaNum,
			isCategoryFinished: JSON.stringify(isCategoryFinished)
		}
	});

	return response.data;
}

export async function getGeneratedImageUrls(prompt) {
	axiosRetry(axios, { retries: 3 });
	const response = await axios.get(`${server}/getgeneratedimageurls`, {
		params: {
			prompt: prompt
		}
	});

	return response.data;
}

export async function postPersonaImg(id, personaNum, promptKr, promptEn, urls, urlIndex) {
	axiosRetry(axios, { retries: 3 });
	const response = await axios.post(`${server}/postpersonaimg`, null, {
		params: {
			id: id,
			personaNum: personaNum,
			promptEn: promptEn,
			promptKr: promptKr,
			imgUrls: JSON.stringify(urls),
			imgUrlIndex: urlIndex
		}
	});
	return response.data;
}

export async function getPersonaInfo(id, personaNum) {
	axiosRetry(axios, { retries: 3 });
	const response = await axios.get(`${server}/getpersonainfo`, {
		params: {
			id: id,
			personaNum: personaNum
		}
	});

	return response.data;
}

export async function getPersonaPreview(id, personaNum, previewPrompt) {
	axiosRetry(axios, { retries: 3 });
	const response = await axios.get(`${server}/getpersonapreview`, {
		params: {
			id: id,
			personaNum: personaNum,
			previewPrompt: previewPrompt
		}
	});

	return response.data;
}

export async function getPersonaInfoList(id) {
	axiosRetry(axios, { retries: 3 });
	const response = await axios.get(`${server}/getpersonainfolist`, {
		params: {
			id: id
		}
	});

	return response.data;
}

export async function getNextPersonaNum(id) {
	axiosRetry(axios, { retries: 3 });
	const response = await axios.get(`${server}/getnextpersonanum`, {
		params: {
			id: id
		}
	});

	return response.data;
}

export async function getNextTrialIndex(id, taskIndex, studyType) {
	axiosRetry(axios, { retries: 3 });
	const response = await axios.get(`${server}/getnexttrialindex`, {
		params: {
			id: id,
			taskIndex: taskIndex,
			studyType: studyType
		}
	});

	return response.data;
}

export function img_url_server(url) {
	return server + url;
}