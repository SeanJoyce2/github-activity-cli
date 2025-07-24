const EVENTS = {
    PUSH: "PushEvent"
}

function getRepositories(events) {
    const repositories = new Set()
    for (let event of events) {
        repositories.add(event.repo.name)
    }
    return repositories
}

function getPushCommits(events, repo) {
    const pushEvents = events.filter(repo => repo.type === EVENTS.PUSH)
    console.log(`Pushed ${pushEvents.length} commits to ${repo}`)
}

function getRepoEvents(repository,events) {
    for (let repo of repository) {
        const repoEvents = events.filter(event => event.repo.name === repo)
       getPushCommits(repoEvents, repo)
    }
}

async function main() {
    const [username] = process.argv.splice(2)

    const response = await fetch(`https://api.github.com/users/${username}/events`)
    const events = await response.json()
    const repositories = getRepositories(events)

    getRepoEvents(repositories, events)
}


await main()

