module.exports = {
    //server config
    port: process.env.PORT | 3002,

    //bcrypt config 
    saltRounds: 12,

    //database config
    db: {
        url: 'mongodb://localhost:27017/ror',
        options: { useNewUrlParser: true, poolSize: 300 }
    },

    //err define
    // TODO: The error defination should be moved out of the project structure, no need to deploy server when the error msg updated.
    err: {
        A01: {
            status: 403,
            msg: 'permission denied'
        },
        B01: {
            status: 401,
            msg: 'Get some error in get book process! Contact to admin for resolve.'
        },
        B02: {
            status: 401,
            msg: 'Get some error in get book process! Contact to admin for resolve.'
        }, 
        B03: {
            status: 403,
            msg: 'Can not get book without quantity'
        }
    }
}