const Todo = require("../models/Todo");

exports.createTodo = async(req,res)=>{
    const todo= await Todo.create({...req.body,user: req.user.userId});
res.status(201).json(todo);
};

exports.getTodo = async(req,res)=>{
    const todo = await Todo.find({user:req.user.userId});
    res.status(201).json(todo);
   
};

exports.updateTodos = async(req,res)=>{
   const {id} =req.params;
   const{ title, description,completed}=req.body;
   const todo = await Todo.findByIdAndUpdate({_id:id, user:req.user.userId},{title,description,completed},{new:true});
   if (!todo) return res.status(404).json({ message: 'Todo not found' });
   res.json(todo);

};
// Delete a specific Todo
exports.deleteTodo = async (req, res) => {
    const { id } = req.params;
    const todo = await Todo.findOneAndDelete({ _id: id, user: req.user.userId });
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json({ message: 'Todo deleted successfully' });
};