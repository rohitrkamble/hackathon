let api = require("./apiclient")

api.login("huangjim", "huangjim").then(res => {
    let task = JSON.stringify({
        "description": "CPU Info",
        "category": "Galaxy",
        "environment": "prod",
        "status": "OK",
        "data": JSON.stringify(require('os').cpus()).replace(/"/g, '\"')
    })
    api.post_data(task, '/Tasks', res.id, task_res => {
        console.log("Task result submitted:\n", task_res)
    })
})