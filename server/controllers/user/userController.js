const { User } = require("../../models/customer/user");
const bcrypt =require("bcryptjs") ;
const jwt=require("jsonwebtoken");

exports.loginUser = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    const secret=process.env.secret;
    if (!user) {
        await req.flash('info', 'Invalid Email !!!');
        console.log("Invalid Email");
        return res.render('index', { messages: req.flash() });
    }
    if (user && bcrypt.compareSync(req.body.password, user.password) && req.body.isAdmin == false) {

        const token=jwt.sign(
            {
                userId:user.id,
                isAdmin:user.isAdmin
            },
            secret,
            {expiresIn:'1w'}
        )

        console.log("Login Successfully");
        console.log("-------------");
        console.log(user.id);
        console.log(token);
        req.flash('info', 'Login Successfully !!!');
        return res.render('index', { messages: req.flash() });
    } else {
        req.flash('info', 'Invalid Password !!!');
        console.log("Invalid Password");
        return res.render('index', { messages: req.flash() });
    }
}

exports.registerUser = async (req, res) => {
    try {
        const { name, username, password, email, phone, street, apartment, city, zip, country, isAdmin } = req.body;

        // Check if user with the same username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.log("User already exists");
            await req.flash('info', 'Customer Already Exists !!!');
            console.log("--------------------");
            return res.render('index', { messages: req.flash() });
        }

        console.log("before creating user");
        const newUser = new User({
            name: name,
            username: username,
            password: bcrypt.hashSync(password, 10),
            email: email,
            phone: phone,
            street: street,
            apartment: apartment,
            city: city,
            zip: zip,
            country: country,
            isAdmin: isAdmin,
        });
        
        await User.create(newUser);
        await req.flash('info', 'New Customer Added Successfully !!!');
        console.log("--------------------");
        return res.render('index', { messages: req.flash() });

    } catch (err) {
        await req.flash('info', 'New Customer Failed !!!, Try Again');
        return res.render('index', { messages: req.flash() });
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
};


