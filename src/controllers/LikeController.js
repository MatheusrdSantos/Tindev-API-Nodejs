const Dev = require('../models/Dev');
module.exports = {
    async store(req, res){
        console.log(req.io, req.connectedUsers)
        const {devId} = req.params;
        const {user:curr_user} = req.headers;

        const loggedDev = await Dev.findById(curr_user);
        const targetDev = await Dev.findById(devId);

        if(!targetDev){
            return res.status(400).json({error: 'Dev doesn\'t exists!' })
        }

        if(targetDev.likes.includes(loggedDev._id)){
            const loggedSocket = req.connectedUsers[curr_user];
            const targetSocket = req.connectedUsers[devId];

            if(loggedSocket){
                req.io.to(loggedSocket).emit('match', targetDev);
            }
            if(targetSocket){
                req.io.to(targetSocket).emit('match', loggedDev);
            }
        }

        loggedDev.likes.push(targetDev._id);

        await loggedDev.save();

        return res.json(loggedDev);
    }
}