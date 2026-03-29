// Types for the static JSON export (CSV-based)
declare module '@/assets/sessionize/sessions.json' {
    export type RawSession = {
        'Session Id': number
        'Title': string
        'Description': string
        'Owner': string
        'Owner Email': string
        'Speakers': string
        'Category': string
        'Session format': string
        'Session duration (workshops)': string | null
        'Level': string
        'Language': string
        'Are you a Google employee or GDE?': string
        'Country': string
        'Owner Informed': string
        'Owner Confirmed': string
        'Room': string
        'Scheduled At': string
        'Scheduled Duration': number
        'Live Link': string | null
        'Recording Link': string | null
        'Speaker Ids': string
    }

    const value: RawSession[]
    export default value
}

declare module '@/assets/sessionize/speakers.json' {
    export type RawSpeaker = {
        'Speaker Id': string
        'FirstName': string
        'LastName': string
        'Email': string
        'TagLine': string
        'Bio': string
        'LinkedIn': string
        'Company Website': string
        'Instagram': string
        'X (Twitter)': string | null
        'Blog': string | null
        'Facebook': string | null
        'Profile Picture': string
    }

    const value: RawSpeaker[]
    export default value
}

// Types for the Sessionize View API responses

export type ApiSessionSpeaker = {
    id: string
    name: string
}

export type ApiCategoryItem = {
    id: number
    name: string
    sort: number
}

export type ApiCategory = {
    id: number
    name: string
    categoryItems: ApiCategoryItem[]
    sort: number
}

export type ApiQuestionAnswer = {
    questionId: number
    answerValue: string
}

export type ApiSession = {
    id: string
    title: string
    description: string | null
    startsAt: string | null
    endsAt: string | null
    isServiceSession: boolean
    isPlenumSession: boolean
    speakers: ApiSessionSpeaker[]
    categories: ApiCategory[]
    roomId: number | null
    room: string | null
    liveUrl: string | null
    recordingUrl: string | null
    status: string
    isInformed: boolean
    isConfirmed: boolean
    questionAnswers: ApiQuestionAnswer[]
}

export type ApiSessionGroup = {
    groupId: number | null
    groupName: string
    sessions: ApiSession[]
    isDefault: boolean
}

export type ApiSpeakerSession = {
    id: number
    name: string
}

export type ApiSpeakerLink = {
    title: string
    url: string
    linkType: string
}

export type ApiSpeaker = {
    id: string
    firstName: string
    lastName: string
    fullName: string
    bio: string | null
    tagLine: string | null
    profilePicture: string | null
    sessions: ApiSpeakerSession[]
    isTopSpeaker: boolean
    links: ApiSpeakerLink[]
    questionAnswers: ApiQuestionAnswer[]
    categories: ApiCategory[]
}
