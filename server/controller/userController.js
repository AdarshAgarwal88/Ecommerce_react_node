const registrationSchama = require("../model/registration");


const saveData = async (req, res) => {
    try {
        let userExist = await registrationSchama.findOne({ email: req.body.email });
        if (userExist) {
            return res.json({ success: false, message: 'Email already registered' });
        }
        else {
            const data = new registrationSchama(req.body);
            await data.save();
            return res.json({ success: true, message: "Registered Successfully" });
        }
    } catch (err) {
        res.send(err);
    }
};

const login = async (req, res) => {
    const user = await registrationSchama.findOne({ email: req.body.email, password: req.body.password });
    if (!user) {
        return res.json({ success: false, message: "invalid credentials" })
    }
    else
        return res.json({ success: true, message: "logged in successfully" })
}
module.exports = { saveData, login }