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

export async function getCurrentTaskIndices(id, studyType) {
	const response = await axios.get(`${server}/currenttaskindices`, {
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