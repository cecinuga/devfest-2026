//import rawSessions from '@/assets/sessionize/sessions.json'
//import rawSpeakers from '@/assets/sessionize/speakers.json'
import { fetchSessions, fetchSpeakers } from "@/assets/sessionize/sessionize-fetch"

const rawSessions = await fetchSessions()
const rawSpeakers = await fetchSpeakers()

const categoryGDEQuestionId = 117314
const categoryLevelId = 117312
const categoryLanguageId = 117313

export type Speaker = {
    id: string
    firstName: string
    lastName: string
    tagLine: string
    bio: string
    profilePicture: string
    isGDE: boolean
}

export type Talk = {
    id: string
    title: string
    description: string

    room: string
    category: string
    level: string
    language: string

    startTime: string
    duration: number // in minutes

    workshopColor?: string

    speakers: Speaker[]
}

const slugify = (str: string) =>
    str
        .normalize('NFD')
        .replace(/[^a-zA-Z0-9]+/g, '-')
        .toLowerCase()
        .replace(/^-+/, '')
        .replace(/-+$/, '')

const excelCleanup = (str: string) => str.replaceAll('_x000D_', '\n')

// Remove talks with no room assigned
const rawSessionsAssigned = rawSessions.filter(session => {
    const isAccepted = session.room !== null
    if (!isAccepted) {
        console.warn(`Talk "${session.title}" has been hidden for now`)
    }
    return isAccepted
})

const rawSpeakersAssigned = rawSpeakers.filter(speaker => {
    const speakerId = speaker.id

    const isAccepted = rawSessionsAssigned.some(session => session.speakers.map(speaker => speaker.id).includes(speakerId))
    
    if (!isAccepted) {
        console.warn(`Speaker "${speaker.firstName} ${speaker.lastName}" has been hidden for now`)
    }
    return isAccepted
})

const speakersBySessionizeUUID: Record<string, Speaker> = {}

for (const speaker of rawSpeakersAssigned) {
    const id = speaker.id

    // console.log(`Processing speaker "${speaker.firstName} ${speaker.lastName}"...`)

    speakersBySessionizeUUID[id] = {
        id: slugify(`${speaker.firstName} ${speaker.lastName}`),
        firstName: speaker.firstName,
        lastName: speaker.lastName,
        tagLine: speaker.tagLine ?? "",
        bio: excelCleanup(speaker.bio ?? ''),
        profilePicture: speaker.profilePicture ?? "",
        isGDE: false,
    }
}

for (const session of rawSessionsAssigned) {
    // console.log(`Processing talk "${session.title}"...`)

    const isEmployeeOrGDE = session.categories.find(c => c.id == categoryGDEQuestionId)?.categoryItems.some(it => it.name.includes("YES"))

    if (session.categories.length > 0 && isEmployeeOrGDE) {
        const speakerIds = session.speakers.map(speaker => speaker.id)
        for (const speakerId of speakerIds) {
            if (speakersBySessionizeUUID[speakerId]) {
                speakersBySessionizeUUID[speakerId].isGDE = true
            }
        }
    }
}

export const SPEAKERS: Speaker[] = Object.values(speakersBySessionizeUUID)

const WORKSHOPS: Record<string, { color: string }> = {
    'Build a photo restoration app using Genkit Go and Nano Banana Pro': { color: 'red' },
    'Costruiamo agenti con ADK-js': { color: 'green' },
}

export const TALKS: Talk[] = [
    ...rawSessionsAssigned.map<Talk>(session => {
        
        const id = slugify(session.title)
        const title = session.title
        const description = excelCleanup(session.description ?? "")

        const categories = session.categories
        const level = categories.find(c => c.id == categoryLevelId)?.categoryItems[0].name ?? ""
        const language = categories.find(c => c.id == categoryLanguageId)?.categoryItems[0].name ?? ""

        const room = session.room ?? ""
        const startTime = session.startsAt ?? ""
        //const duration = new Date(session.endsAt ?? "") - new Date(startTime ?? "")

        const speakers = session.speakers.map(speaker => speaker.id).map(speakerId => speakersBySessionizeUUID[speakerId])

        return {
            id,
            title,
            description,

            room,
//          category,
            category:"",
            level,
            language,

            startTime,
//          duration,
            duration:0,

            speakers,
        }
    }),
].map(talk => {
    const workshopInfo = WORKSHOPS[talk.title]
    if (workshopInfo) {
        return {
            ...talk,
            workshopColor: workshopInfo.color,
        }
    }

    return talk
})

//
// Debugging
//

console.log('Talks & Speakers:')
for (const talk of TALKS) {
    console.log(`> ${talk.id}:`)
    console.log(`  "${talk.title}"`)
    console.log(`  [${talk.category}] [${talk.language}] [${talk.room}] [${talk.startTime}]`)
    console.log(`  ${talk.description.trim().replace(/\n+/g, '  ').slice(0, 100)}...`)
    for (const speaker of talk.speakers) {
        console.log(`  - ${speaker.firstName} ${speaker.lastName} @${speaker.id}`)
    }
    console.log('')
}

console.log(`Total talks: ${TALKS.length}`)
console.log(`Total speakers: ${SPEAKERS.length}`)

// Rooms

console.log('Rooms:')
const rooms = [...new Set(TALKS.map(talk => talk.room).filter(room => room !== 'unknown'))]
for (const room of rooms) {
    console.log(`> ${room}`)
}

console.log('Talk Durations:')
const durations = new Set(TALKS.map(talk => talk.duration))
for (const duration of durations) {
    console.log(`> ${duration} minutes`)
}

console.log('Errors:')
const errorTalks = TALKS.filter(
    talk => talk.room === null || talk.room === 'unknown' || talk.duration === null || talk.duration === 0,
)
if (errorTalks.length === 0) {
    console.log('No errors found!')
} else {
    console.log(`Found ${errorTalks.length} talks with errors:`)
}
errorTalks.forEach(talk => {
    console.log(`> ${talk.title} (${talk.id})`)
    if (talk.room === null || talk.room === 'unknown') {
        console.log('  - Missing or unknown room')
    }
    if (talk.duration === null || talk.duration === 0) {
        console.log('  - Missing or zero duration')
    }
})

// const speakersById = Object.fromEntries(
//     Object.values(speakersBySessionizeUUID).map<[string, Speaker]>(speaker => [speaker.id, speaker]),
// )

// console.log('Scheduled Talks:')
// for (const [date, talks] of getTalkTimeBlocks(TALKS)) {
//     console.log(`> ${date}`)
//     for (const talk of talks) {
//         console.log(`  - ${talk.title}`)
//     }
// }

// console.log('Speaker Pictures:')
// for (const speaker of SPEAKERS) {
//     console.log(`${speaker.id}: ${speaker.profilePicture}`)
// }
