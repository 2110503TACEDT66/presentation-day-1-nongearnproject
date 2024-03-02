const CoWorkingSpace = require('../models/CoWorkingSpace');

exports.getCoWorkingSpaces = async (req, res, next) => {
        let query;
        const reqQuery = {...req.query};  
        //Fields to exclude
        const removeFields = ['select', 'sort', 'page', 'limit'];    
        //SORT    
        //Loop over remove fields and delete them from reqQuery
        removeFields.forEach(param => delete reqQuery[param]);
        console.log(reqQuery);
        //Create query string
        let queryStr = JSON.stringify(reqQuery);
        //Create operators (gt gte etc.)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`); 
        //finding resource]
        query = CoWorkingSpace.find(JSON.parse(queryStr)).populate('appointments'); 
        //Select Fields
        if(req.query.select) {
            const fields = req.query.select.split(',').join(' ');
            query = query.select(fields);
        }
        //sort
        if(req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('name');
        } 
        //Pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 25;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;    
    try {
        const total = await CoWorkingSpace.countDocuments();
        query = query.skip(startIndex).limit(limit);
        //EXE query
        const coworkingspace = await query;
        //Pagination result
        const pagination={};
        if(endIndex < total){
            pagination.next={
                page: page + 1,
                limit
            }
        } 
        if(startIndex > 0){
            pagination.prev = {
                page: page - 1,
                limit
            }
        }
    res.status(200).json({
        success: true,
        count: coworkingspace.length,pagination,
        data: coworkingspace
    });
    } catch(err) {
        res.status(400).json({
            success:false,
            message:"catch err"
        });
    }
};

exports.getCoWorkingSpace= async (req,res,next)=>{
    
    try {
        const coworkingspace = await CoWorkingSpace.findById(req.params.id);

        if(!coworkingspace) {
            return res.status(404).json({
                success: false
            })
        }

        res.status(200).json({
            success: true, 
            data: coworkingspace
        });

    } catch (err) {
        res.status(400).json({
            success: false
        });
    }
};
  
exports.createCoWorkingSpace = async (req, res, next) => {
    const coWorkingSpace = await CoWorkingSpace.create(req.body);
    res.status(201).json({
        success: true, 
        data: coWorkingSpace
    });
};
  
exports.updateCoWorkingSpace = async (req, res, next) => {
    try {
        const coworkingspace = await CoWorkingSpace.findByIdAndUpdate(req.params.id,req.body, {
            new: true,
            runValidators: true
        });

        if(!coworkingspace) {
            return res.status(400).json({
                success: false
            });
        }

        res.status(200).json({
            success: true, 
            data: coworkingspace
        });

    } catch (err) {
        res.status(400).json({
            success: false
        });
    }
};
  
exports.deleteCoWorkingSpace = async (req, res, next) => {
    try {
        const coworkingspace = await CoWorkingSpace.findById(req.params.id);

        if(!coworkingspace) {
            return res.status(400).json({
                success: false,
                message: "there's no coworkingspace"
            });
        }
        await coworkingspace.deleteOne();
        res.status(200).json({
            success: true, 
            data: {}
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "catch err"
        });
    }
};