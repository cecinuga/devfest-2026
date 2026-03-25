import type { RawSession } from "@/assets/sessionize/sessions.json";
import type { RawSpeaker } from "@/assets/sessionize/speakers.json";

const baseUrl: string = "https://sessionize.com/api/v2/3rrux9hb/view";

export const fetchSessions = async (): Promise<RawSession[]> => {
    const data: RawSession[] = await fetch(`${baseUrl}/Sessions`)
        .then(res => {
            if(!res.ok)
                console.log("error fetching sessionize api");
            return res.json()
        })
        .catch(err => console.log(err));

    return data;
}

export const fetchSpeakers = async (): Promise<RawSpeaker[]> => {
    const data: RawSpeaker[] = await fetch(`${baseUrl}/Speakers`)
        .then(res => {
            if(!res.ok)
                console.log("error fetching sessionize api");
            return res.json()
        })
        .catch(err => console.log(err));

    return data;
}