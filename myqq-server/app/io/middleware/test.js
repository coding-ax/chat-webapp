
module.exports = app => {
    return async (ctx, next) => {
        console.log("testF")
        await next();
    }
}