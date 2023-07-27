class Gate {
    static can(action, data, request){
        return new Promise((resolve) => {
            resolve();
        })
    }
}

module.exports = Gate;