interface Config {
    server: {
      backendBase: string
    },
    api: {
      player: [string, string]
    },
    app : {
      log: boolean,
      logType: string
    }
}

export default Config;