const { response } = require("express");
const express = require("express");

const router = express.Router();
const UserTable = require("../../models/User");

router.post("/add", (req, res) => {
  const { id, name, email, gender,imageUrl, status, created_at, updated_at } = req.body;
  add = new UserTable({
    id,
    name,
    imageUrl,
    email,
    gender,
    status,
    created_at,
    updated_at,
  });
  add.save().then((data) => res.send(data));
});
// routes @GET api/user/test
// desc Tests the user routes
// @access Public
router.get("/all", (req, res) => {
  UserTable.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});

router.get('/:userId', async (req, res) => {
  try {
      const item = await UserTable.find({id:req.params.userId});
      res.json(item);
  } catch(err) {
      console.error(err.message);
      res.send(400).send('Server Error');
  }
});

router.put('/update/:userId', async (req, res) => { 
  try {
    const item = await UserTable.find({ id: req.params.userId })
    const {
      name = item[0].name,
      email = item[0].email,
      gender = item[0].gender,
      status = item[0].status,
      created_at = item[0].created_at,
      updated_at = Date.now()
    } = req.body
   let UserDetails = await UserTable.findByIdAndUpdate({ _id: item[0]._id }, { name, email, status, created_at, updated_at },
    {new:true})
     res.json(UserDetails)
;   } catch (err) {
    console.log(err);
    res.send(400).send('Server Error');
  }
});

router.delete('/:userId', async (req, res) => {
  try {
       await UserTable.findOneAndDelete({id:req.params.userId});
      res.json(`User ${req.params.userId} deleted`);

      } catch(err) {
        res.status(400).json('Error: ' + err);
   }
});


module.exports = router;
