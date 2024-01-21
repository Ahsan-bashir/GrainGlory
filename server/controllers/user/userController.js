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
exports.addUser = async (req, res) => {

    try {
        await Customer.insertMany([
            {
                firstName: "Raddy",
                lastName: "NodeJs",
                tel: "1-353-218-4881",
                email: "raddy@outlook.couk",
                details: "Demo details text.",
                createdAt: Date.now(),
                updatedAt: Date.now()
            },
            {
                firstName: "Aphrodite",
                lastName: "Parker",
                tel: "1-857-407-8574",
                email: "quam@protonmail.net",
                details: "Demo details text.",
                createdAt: Date.now(),
                updatedAt: Date.now()
            },
            {
                firstName: "Camden",
                lastName: "Perce",
                tel: "(251) 719-5886",
                email: "aliquam.tincidunt.nunc@icloud.net",
                details: "Demo details text.",
                createdAt: Date.now(),
                updatedAt: Date.now()
            },
            {
                firstName: "Emi",
                lastName: "Hutchinson",
                tel: "1-878-674-6876",
                email: "aenean.egestas@aol.org",
                details: "Demo details text.",
                createdAt: Date.now(),
                updatedAt: Date.now()
            },
            {
                firstName: "Chaim",
                lastName: "Holland",
                tel: "1-776-825-8236",
                email: "a@google.couk",
                details: "Demo details text.",
                createdAt: Date.now(),
                updatedAt: Date.now()
            },
            {
                firstName: "Harding",
                lastName: "Cameron",
                tel: "1-935-750-3637",
                email: "non.nisi@outlook.edu",
                details: "Demo details text.",
                createdAt: Date.now(),
                updatedAt: Date.now()
            },
            {
                firstName: "Dane",
                lastName: "Kelley",
                tel: "(129) 964-3195",
                email: "morbi@aol.org",
                details: "Demo details text.",
                createdAt: Date.now(),
                updatedAt: Date.now()
            },
            {
                firstName: "Emery",
                lastName: "Thornton",
                tel: "(565) 248-4784",
                email: "egestas.blandit.nam@icloud.org",
                details: "Demo details text.",
                createdAt: Date.now(),
                updatedAt: Date.now()
            },
            {
                firstName: "Tarik",
                lastName: "Francis",
                tel: "1-679-436-4746",
                email: "lacus@outlook.ca",
                details: "Demo details text.",
                createdAt: Date.now(),
                updatedAt: Date.now()
            },
            {
                firstName: "Rebecca",
                lastName: "Booth",
                tel: "1-548-944-3232",
                email: "sapien@icloud.couk",
                details: "Demo details text.",
                createdAt: Date.now(),
                updatedAt: Date.now()
            },
            {
                firstName: "Solomon",
                lastName: "Larson",
                tel: "(648) 588-4779",
                email: "accumsan.interdum@icloud.net",
                details: "Demo details text.",
                createdAt: Date.now(),
                updatedAt: Date.now()
            },
            {
                firstName: "Tanner",
                lastName: "Morin",
                tel: "(189) 577-5612",
                email: "nec.diam.duis@google.couk",
                details: "Demo details text.",
                createdAt: Date.now(),
                updatedAt: Date.now()
            },
            {
                firstName: "September",
                lastName: "Walton",
                tel: "1-732-422-2492",
                email: "sed.sapien.nunc@icloud.com",
                details: "Demo details text.",
                createdAt: Date.now(),
                updatedAt: Date.now()
            },
            {
                firstName: "Kermit",
                lastName: "Becker",
                tel: "1-163-757-8638",
                email: "id@yahoo.net",
                details: "Demo details text.",
                createdAt: Date.now(),
                updatedAt: Date.now()
            },
            {
                firstName: "Anish",
                lastName: "Brown",
                tel: "1-163-757-8638",
                email: "Anish@yahoo.net",
                details: "Demo details text.",
                createdAt: Date.now(),
                updatedAt: Date.now()
            },
            {
                firstName: "Duncan",
                lastName: "Woodard",
                tel: "1-163-757-8638",
                email: "Duncan@yahoo.net",
                details: "Demo details text.",
                createdAt: Date.now(),
                updatedAt: Date.now()
            },
            {
                firstName: "Izabella",
                lastName: "Stark",
                tel: "1-163-757-8638",
                email: "Izabella@yahoo.net",
                details: "Demo details text.",
                createdAt: Date.now(),
                updatedAt: Date.now()
            },
            {
                firstName: "Dhruv",
                lastName: "Fields",
                tel: "1-163-757-8638",
                email: "Dhruv@yahoo.net",
                details: "Demo details text.",
                createdAt: Date.now(),
                updatedAt: Date.now()
            },
            {
                firstName: "Harriet",
                lastName: "Gillespie",
                tel: "1-163-757-8638",
                email: "Harriet@yahoo.net",
                details: "Demo details text.",
                createdAt: Date.now(),
                updatedAt: Date.now()
            },
            {
                firstName: "Chad",
                lastName: "Barton",
                tel: "1-163-757-8638",
                email: "Chad@yahoo.net",
                details: "Demo details text.",
                createdAt: Date.now(),
                updatedAt: Date.now()
            },
            {
                firstName: "Esmee",
                lastName: "Trujillo",
                tel: "1-163-757-8638",
                email: "Esmee@yahoo.net",
                details: "Demo details text.",
                createdAt: Date.now(),
                updatedAt: Date.now()
            },
        ]);
    } catch (error) {
        console.log("err : ", + error);
    }
    const locals = {
        title: "Add New User",
        description: "GrainGlory"
    }
    res.render('admin/customer/addUser', locals)
}
exports.viewUser = async (req, res) => {  
   try {
    const user=await User.findById(req.params.id).select("-password");
    const locals = {
        title: "View User",
        description: "GrainGlory"
    }
    console.log("--------------------------in view");
    res.render('admin/customer/viewUser', {locals,user})
   } catch (error) {
     req.flash('error', 'An error occurred while trying to find the user.');
     res.render('admin/customer/allUsers', { messages: req.flash() });
    // console.log("err : ", + error);
   }
}
exports.postUser = async (req, res) => {
    const { name, username, password, email, phone, street, apartment, city, zip, country, isAdmin } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        await req.flash('info', 'Customer Already Exists !!!');
        console.log("--------------------");
        res.redirect('/addUser');
    }

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


    try {
        await User.create(newUser);
        //  connectFlash.info('New Customer Added Successfully.')
         await req.flash('info','New Customer Added Successfully !!!')
        // await req.flash('info','New Customer Added Successfully')
        res.redirect('/adminDashboard');
    } catch (error) {
        console.log(error);

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
exports.getUsers = async (req, res) => {
        const messages =    await req.flash('info')
        const locals = {
            title: "GrainGlory",
            description: "Get All Customers"
        }
    
    const perPage=12;
    const page=req.query.page || 1; 
    
        try {
            
            const users = await User.aggregate([{  $sort:{updatedAt:-1}  }])
            .skip((perPage*page)-perPage)
            .limit(perPage)
            .exec();
    
            // .skip(perPage*(page-perPage))
            // .limit(perPage)
            // .exec();
            const count=await User.countDocuments();    
    
            res.render('admin/customer/allUsers',{
                locals,
                users: users,
                current:page,
                pages:Math.ceil(count/perPage),
                messages
            });
    
        } catch (error) {
            
            console.log(error);
        }
    
};
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


