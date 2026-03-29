
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
