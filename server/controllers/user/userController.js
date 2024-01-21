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
exports.addUserPage = async (req, res) => {

  
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
exports.editUserPage = async (req, res) => {  
   try {
    const user=await User.findById(req.params.id).select("-password");
    const locals = {
        title: "View User",
        description: "GrainGlory"
    }
    console.log("-- ------------------------in view");
    res.render('admin/customer/editUser', {locals,customer:user})
   } catch (error) {
     req.flash('error', 'An error occurred while trying to find the user.');
     res.render('admin/customer/allUsers', { messages: req.flash() });
    // console.log("err : ", + error);
   }
}
exports.updateUser = async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        street: req.body.street,
        apartment: req.body.apartment,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        isAdmin: req.body.isAdmin,
        }).where({ _id: req.params.id });


        //  connectFlash.info('New Customer Added Successfully.')
          req.flash('info','Customer Updated Successfully !!!')
        // await req.flash('info','New Customer Added Successfully')
        await res.redirect(`/editUserPage/${req.params.id}`);
    } catch (error) {
        console.log(error);

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

exports.deleteUser = async (req, res) => {
try {
    const deletedUser= await User.findByIdAndDelete(req.params.id).where({ _id: req.params.id });
    if(!deletedUser){
        console.log("-----------user not found --------------");
        return res.status(404).json({success:false,message:'user not found!'});
    }
    res.redirect('/adminDashboard');
} catch (error) {
    console.log(error);
}
}