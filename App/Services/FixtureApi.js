export default {
  // Functions return fixtures
  getRoot: () => {
    return {
      ok: true,
      data: require('../Fixtures/root.json')
    }
  },
  getRate: () => {
    return {
      ok: true,
      data: require('../Fixtures/rateLimit.json')
    }
  },
  getUser: (username) => {
    // This fixture only supports gantman or else returns skellock
    const gantmanData = require('../Fixtures/gantman.json')
    const skellockData = require('../Fixtures/skellock.json')
    return {
      ok: true,
      data: username.toLowerCase() === 'gantman' ? gantmanData : skellockData
    }
  },
  getStories: () => {
      const storyData = require('../Fixtures/Story.json')
      return {
          data: storyData.list,
      }
  },
  getFriends: () => ({
      data: require('../Fixtures/Friends.json').list
  }),
  getSelf: () => ({
      data: require('../Fixtures/Friends.json').list[0]
  })
}
