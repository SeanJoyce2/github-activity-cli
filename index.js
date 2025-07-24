const EVENTS = {
    PUSH: "PushEvent"
}

function getMappedEvents(events) {
    const mappedEvents = new Map();
    for (let event of events) {
        const repoName = event.repo.name
        if (mappedEvents.has(repoName)) {
            mappedEvents.get(repoName).push(event);
        } else {
            mappedEvents.set(repoName, [event]);
        }

    }
    return mappedEvents
}

async function main() {
    const [username] = process.argv.splice(2)

    try {
        const response = await fetch(`https://api.github.com/users/${username}/events`)
        const events = await response.json()
        const mappedEvents = getMappedEvents(events)

        for(const [repository, events] of mappedEvents) {
            const pushEvents = events.filter(repo => repo.type === EVENTS.PUSH)
            console.log(`Pushed ${pushEvents.length} commits to ${repository}`)
        }

    } catch(error) {
        console.error(error)
    }
}


await main()

