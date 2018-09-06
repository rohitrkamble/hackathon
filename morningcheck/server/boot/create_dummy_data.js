var async = require('async');

module.exports = function (app) {
  let db = app.dataSources.db

  let developers = [{
      team: "Algo",
      name: "Jimmy Huang",
      username: "huangjim"
    },
    {
      team: "Algo",
      name: "Rohit Kamble",
      username: "kambleroh"
    },
    {
      team: "Algo",
      name: "Shashi MB",
      username: "mbshashi"
    }
  ]

  let dummyTasks = [{
      category: "Galaxy",
      environment: "prod",
      desc: "Galaxy instanes are ready",
      status: "OK",
      data: `{"startUpAt": "13:45:00", "instanceIds": [1, 2, 3, 4, 5, 6, 7], "info": "No issue found" }`
    },
    {
      category: "CDS",
      environment: "prod",
      desc: "CDS instrument check is done",
      status: "OK",
      data: `{"checkAt": "14:45:00", "ActiveSymbols": 2001, "ProblemSymbols": 20, "info": "No issue found" }`
    },
    {
      category: "QP",
      environment: "prod",
      desc: "QP data check is done",
      status: "Caution",
      data: `{"checkAt": "14:48:00", "ActiveSymbols": 1005, "ProblemSymbols": 500, "info": "Miss data for symbols..." }`
    }
  ]

  function generateDeveloper(detail) {
    return {
      "team": detail.team,
      "name": detail.name,
      "username": detail.username,
      "email": detail.username + "@ubs.com",
      "password": detail.username,
      "emailVerified": true
    }
  }

  function generateTask(developer, taskDetail) {
    return {
      "time": new Date(),
      "submitBy": developer.id,
      "description": taskDetail.desc,
      "category": taskDetail.category,
      "environment": taskDetail.environment,
      "status": taskDetail.status,
      "data": taskDetail.data
    }
  }

  function createTasks(developer) {
    db.autoupdate('Task', function (err) {
      if (err) throw err
      let Task = app.models.Task
      dummyTasks.forEach(task => {
        Task.create(generateTask(developer, task))
      })
    })
  }

  function createDevelopers() {
    db.autoupdate('Developer', function (err) {
      if (err) throw err
      let Developer = app.models.Developer

      developers.forEach(dev => {
        Developer.create(generateDeveloper(dev), (err, developer) => {
          if (err) throw err
          createTasks(developer)
        })
      })
    })
  }

  function createData() {
    createDevelopers()
  }

  function createTable(db, table) {
    return function (callback) {
      db.automigrate(table, function (err) {
        if (err) throw err
        console.log("tables [" + table + "] created.")
        callback(null)
      })
    }
  }

  function createTables() {
    async.series([
      createTable(db, ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role']),
      createTable(db, ['Developer', 'Task']),
    ], (err) => {
      if (err) throw err
      console.log("All tables created!")
      createData()
    })
  }

  createTables()
}
