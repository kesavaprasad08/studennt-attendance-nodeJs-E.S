const Students = require('../models/students');
const Attendance = require('../models/attendance');

exports.addStudent =async(req,res,next)=>{
    try{
const studentName = req.body.name;
const response = await Students.create({
    name:studentName,
    totalNumberOfDays:0,
    numberOfDaysPresent:0,
});
res.status(200).json({message:'Student Added'});
    }
    catch(e){
        console.log(e);
    }
};

exports.addAttendance = async(req,res,next) =>{
    
    try{
        const date = req.body.date;
        const attendanceData = req.body.Presents;
        let newAttendanceDate =await Attendance.create({
            Date:date,
            Presents:attendanceData,
        });
        res.status(200).json({data:newAttendanceDate})
    }
    catch(err){
        console.log(err);
    }
};
console
exports.getAllAttendance = async(req,res,next)=>{
    try{
        const students= await Students.findAll();
        res.status(200).json({students,message:'success'})
    }
    catch(err){
        res.status(500).json({error:err});
    }
};

exports.getAttendance = async(req,res,next)=> {
    try{
        const particularDate = req.params.date; 
        const attendanceReport = await Attendance.findAll({
            attributes:['id','Presents'],
            where:{
                Date:particularDate,
            },
        });
        // console.log('here',attendanceReport)
        if(attendanceReport.length===0){
            return res.json({'status':false})
        }
        const finalRecords = attendanceReport.map(data =>({
            id:data.id,
            Presents:data.Presents
        }));
        return res.json({data:finalRecords,status:true}); 
    }catch(err){
        console.log(err);
        return res.status(500).json({message:err})
    }
};

exports.update=async(req,res,next)=>{
    try{

        const { studentId,status}=req.query;
        const student = await Students.findByPk(studentId);
        student.totalNumberOfDays+=1;
        if(status=='Present'){
            student.numberOfDaysPresent+=1;

        }
        const response = await student.save();
        res.status(200).json({response});
    }
    catch(err){
        console.log(err);
    }
}   