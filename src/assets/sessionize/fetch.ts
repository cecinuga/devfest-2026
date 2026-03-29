import type { ApiSession, ApiSessionGroup, ApiSpeaker } from "@/env"

const BASE_URL = "https://sessionize.com/api/v2/3rrux9hb/view"

export async function fetchSessions(): Promise<ApiSession[]> {
    const response = await fetch(`${BASE_URL}/Sessions`)
    if (!response.ok) {
        throw new Error(`Failed to fetch sessions: ${response.status} ${response.statusText}`)
    }

    const groups: ApiSessionGroup[] = await response.json()
    return groups.flatMap(group => group.sessions)
}

export async function fetchSpeakers(): Promise<ApiSpeaker[]> {
    const response = await fetch(`${BASE_URL}/Speakers`)
    if (!response.ok) {
        throw new Error(`Failed to fetch speakers: ${response.status} ${response.statusText}`)
    }

    return response.json()
}
