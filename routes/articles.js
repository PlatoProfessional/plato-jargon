
/*
 * GET users listing.
 */

exports.list = function(req, res){

  req.getConnection(function(err,connection){
        var category = "Edition";
        var query = connection.query('SELECT * FROM jrg_webpage_subject WHERE category = ? ',[category],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('articles',{page_title:"Academic Articles Database",data:rows});
                
           
         });
         
         console.log(query.sql);
    });
  
};
 
exports.add = function(req, res){
  res.render('add_article',{page_title:"Add Articles - Node.js"});
};

exports.edit = function(req, res){
    
    var gk = req.params.gk;
    
    req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM jrg_webpage_subject WHERE gk = ?',[gk],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('edit_article',{page_title:"Edit Articles - Node.js",data:rows});
                
           
         });
         
         console.log(query.sql);
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
			text		: input.text
        
        };
        
        var query = connection.query("INSERT INTO jrg_webpage_subject set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/articles');
          
        });
        
        console.log(query.sql);
    
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
			text		: input.text
        
        };
        
        var query = connection.query("UPDATE jrg_webpage_subject set ? WHERE gk = ? ",[data,gk], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/articles');
          
        });
		
		console.log(query.sql);  
    });
};


exports.delete_article = function(req,res){
          
     var gk = req.params.gk;

     req.getConnection(function (err, connection) { 
        connection.query("DELETE FROM jrg_webpage_subject  WHERE gk = ? ",[gk], function(err, rows)
        {			
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/articles');             
        });
		
		//console.log(query.sql);
        
     });
};


