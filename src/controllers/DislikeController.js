const Dev = require('../models/Dev');
module.exports = {
    async store(req, res){
        const {devId} = req.params;
        const {user:curr_user} = req.headers;

        const loggedDev = await Dev.findById(curr_user);
        const targetDev = await Dev.findById(devId);

        if(!targetDev){
            return res.status(400).json({error: 'Dev doesn\'t exists!' })
        }

        loggedDev.dislikes.push(targetDev._id);

        await loggedDev.save();

        return res.json(loggedDev);
    }
}