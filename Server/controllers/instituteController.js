const instituteadmins = require("../models/instituteSchema");
const admins = require("../models/adminSchema");

exports.instituteadminregister = async (req, res) => {
    const { name, phone, email, password } = req.body;
    if (!name || !phone || !email || !password) {
        return res.status(401).json({ message: "Fill all fields" })
    }
    try {
        const preinstituteadmin = await instituteadmins.findOne({ phone: phone });

        if (preinstituteadmin) {
            return res.status(200).json("Admin already exist")
        }
        else {
            const newpreinstituteadmin = new instituteadmins({
                name,
                phone,
                email,
                password
            });
            const storeData = await newpreinstituteadmin.save();
            res.status(200).json(storeData);
        }
    } catch (error) {
        res.status(500).json({ error: "Invalid Details", error });
    }
};

exports.subadminregister = async (req, res) => {
    const { name, phone, email, password, birth, gender } = req.body;
    if (!name || !phone || !email || !password || !birth || !gender) {
        return res.status(401).json({ message: "Fill all fields" })
    }

    try {
        const instituteadminId = req.instituteadminId;
        const preadmin = await admins.findOne({ phone: phone });
        console.log(preadmin);
        if (!preadmin) {
            const newadmin = new admins({
                name,
                phone,
                email,
                password,
                birth,
                gender,
                enrolledInstitute: [instituteadminId],
            })
            const storeData = await newadmin.save();
            return res.status(200).json({ message: 'Admin registered in Institute Successfully' });
        }
        else if (preadmin) {
            const enrolledInstitutes = preadmin.enrolledInstitute.includes(instituteadminId);
            if (enrolledInstitutes) {
                console.log('Enrolled institute is true');
                return res.status(201).json({ message: 'Admin already enrolled in the Institute' })
            }
            preadmin.enrolledInstitute.push(instituteadminId);
            const storeData = await preadmin.save();
            return res.status(200).json({ message: ' Institute Enrollment successfull', preadmin: preadmin });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error", error })
    }
}