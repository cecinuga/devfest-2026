export interface ISpeaker {
  "Speaker Id": string;
  "FirstName": string;
  "LastName": string;
  "Email": string;
  "TagLine": string;
  "Bio": string;
  "LinkedIn": string | null;
  "Company Website": string | null;
  "Blog": string | null;
  "Instagram": string | null;
  "Facebook": string | null;
  "Profile Picture": string;
}

export interface ISession {
  "Session Id": number;
  "Title": string;
  "Description": string;
  "Owner": string;
  "Owner Email": string;
  "Speakers": string;
  "Category": string;
  "Session format": string;
  "Session duration (workshops)": number | null;
  "Level": string;
  "Language": string;
  "Are you a Google employee or GDE?": string;
  "Country": string;
  "Owner Informed": string;
  "Owner Confirmed": string;
  "Room": string;
  "Scheduled At": string;
  "Scheduled Duration": number;
  "Live Link": string | null;
  "Recording Link": string | null;
  "Favorited Count": number;
  "Speaker Ids": string;
}

const baseUrl: string = "https://sessionize.com/api/v2/3rrux9hb/view";

export const fetchSessions = async (): Promise<ISession[]> => {
    const data: ISession[] = await fetch(`${baseUrl}/Sessions`)
        .then(res => {
            if(!res.ok)
                console.log("error fetching sessionize api");
            return res.json()
        })
        .catch(err => console.log(err));

    return data;
}

export const fetchSpeakers = async (): Promise<ISpeaker[]> => {
    const data: ISpeaker[] = await fetch(`${baseUrl}/Speakers`)
        .then(res => {
            if(!res.ok)
                console.log("error fetching sessionize api");
            return res.json()
        })
        .catch(err => console.log(err));

    return data;
}