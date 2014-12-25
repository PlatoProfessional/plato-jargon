
/*
 * GET users listing.
 */

exports.list = function(req, res){

  req.getConnection(function(err,connection){
        var category = "Edition";
        var query = connection.query('SELECT gk,title,domain,category,base_url FROM plt_webpage_subject WHERE category = ? ',[category],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('customers',{page_title:"Academic Articles Database",data:rows});
                
           
         });
         
         console.log(query.sql);
    });
  
};
 
exports.add = function(req, res){
  res.render('add_customer',{page_title:"Add Customers - Node.js"});
};

exports.edit = function(req, res){
    
    var gk = req.params.gk;
    
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM plt_webpage_subject WHERE gk = ?',[gk],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('edit_customer',{page_title:"Edit Customers - Node.js",data:rows});
                
           
         });
         
         //console.log(query.sql);
    }); 
};

/*Save the article*/
exports.save = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function (err, connection) {
        
        var data = {
			
			title		: input.title,
			domain		: input.domain,
			category	: input.category,
			baseurl		: input.baseurl
        
        };
        
        var query = connection.query("INSERT INTO plt_webpage_subject set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/customers');
          
        });
        
       // console.log(query.sql); get raw query
    
    });
};

exports.save_edit = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var gk = req.params.gk;
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
			title		: input.title,
			domain		: input.domain,
			category	: input.category,
			baseurl		: input.baseurl
        
        };
        
        connection.query("UPDATE plt_webpage_subject set ? WHERE gk = ? ",[data,gk], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/customers');
          
        });
    
    });
};


exports.delete_customer = function(req,res){
          
     var gk = req.params.gk;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM plt_webpage_subject  WHERE gk = ? ",[gk], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/customers');
             
        });
        
     });
};


