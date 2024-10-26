module.exports = {
    apps: [
        {
            name: "feedback",
            script: "npm",
            args: "run dev",
            env: {
                NODE_ENV: "development"
            }
        }
    ]
}