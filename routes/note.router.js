const express = require("express");
const { NoteModel } = require("../model/note.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const noteRouter = express.Router();
const {auth} =require("../middleware/auth.middleware");

noteRouter.post("/create",auth, async(req,res)=>{
    try{
        const note=new NoteModel(req.body);
        await note.save();
        res.json({msg:"New note has been added", note:req.body})
      }catch(err){
          res.json({error:err.message})
      }




})

noteRouter.get("/",auth,async(req,res)=>{
    try{
        const notes=await NoteModel.find({userID:req.body.userID});
        
        res.json(notes);
      }catch(err){
          res.json({error:err.message})
      }
})

noteRouter.patch("/update/:noteID",auth,async(req,res)=>{
    const userIDinUserDoc=req.body.userID
    const {noteID} =req.params;
    try{
        const notes=await NoteModel.findOne({_id:noteID})
        const userIDinNoteDoc=notes.userID
       if(userIDinUserDoc===userIDinNoteDoc){
            await NoteModel.findByIdAndUpdate({_id:noteID}, req.body)
            res.json({msg:`{note.title} has been updated`})
       }else{
        res.json({msg:"Not Authorized"})
       }
    }catch(err){
        res.json({error:err.message})
    }
    
})

noteRouter.delete("/delete/:noteID",auth,async(req,res)=>{
    const userIDinUserDoc=req.body.userID
    const {noteID} =req.params;
    try{
        const notes=await NoteModel.findOne({_id:noteID})
        const userIDinNoteDoc=notes.userID
       if(userIDinUserDoc===userIDinNoteDoc){
            await NoteModel.findByIdAndDelete({_id:noteID})
            res.json({msg:`{note.title} has been deleted`})
       }else{
        res.json({msg:"Not Authorized"})
       }
    }catch(err){
        res.json({error:err.message})
    }
})

module.exports = { noteRouter };