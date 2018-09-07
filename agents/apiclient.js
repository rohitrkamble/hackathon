let http = require('http');

function post_data(data, path, token, cb) {
    let post_options = {
        host: 'localhost',
        port: '3000',
        method: 'POST',
        path: `/api${path}` + (token ? "?access_token=" + token : ""),
        headers: {
            'Content-Type': 'application/json',
            'Accept': "application/json"
        }
    }
    let post_req = http.request(post_options, function (res) {
        res.setEncoding('utf8')
        res.on('data', function (chunk) {
            cb(JSON.parse(chunk))
        })
    })
    post_req.write(data)
    post_req.end()
}

function login(username, password) {
    var promise = new Promise(function (resolve, reject) {
        let login_detail = `{"username": "${username}", "password": "${password}"}`
        post_data(login_detail, "/Developers/login", null, res => {
            resolve(res)
        })
    })
    return promise
}

function generateTask(desc, category, env, status, data) {
    return {
        "description": desc,
        "category": category,
        "environment": env,
        "status": status,
        "data": data
    }
}

exports.post_data = post_data
exports.login = login
exports.generateTask = generateTask
