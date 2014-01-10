/**
 * PersonController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
  
  /**
   * Action blueprints:
   *    `/person/create`
   */
   create: function (req, res) {
    
    // Send a JSON response
    /*return res.json({
      
      hello: 'world'
    });*/
	
        if(req.method=="POST"&&req.param("Person",null)!=null)
	{
	  // Person.attributes=req.param("Person",null);
	   
	   Person.create(req.param("Person")).done(function(err,model){
	     
	      
	      // Error handling
		if (err) {
		//  return console.log(err);
		    res.send("Error");

		// The User was created successfully!
		}else {
		     res.redirect( 'person/view/'+model.id);
		  
		}
	     
	     
	  });
	 
	}
	else
	{
	  
	  res.render( 'person/create');
	}
 
       
  },


  /**
   * Action blueprints:
   *    `/person/update`
   */
   update: function (req, res) {
    
         var id=req.param("id",null);
	
         Person.findOne(id).done(function(err, model) {
	   
	        // res.send(model);
		  // return;

	        if(req.method=="POST"&&req.param("Person",null)!=null)
		  {
		      
		       var p=req.param("Person",null);
			
		  
		     model.name=p.name;
		     model.age=p.age;
		     
		     model.save(function(err){
		      
			
			// Error handling
			  if (err) {
			  //  return console.log(err);
			      res.send("Error");

			  // The User was created successfully!
			  }else {
			      /*
			     res.send(model);
		               return;
		                */
			      res.redirect( 'person/view/'+model.id);
			    
			  }
		      
		      
		    });
		  
		  }
		  else
		  {
		    
		    res.render( 'person/update',{'model':model});
		  }
	      

	});
      
       
  },


  /**
   * Action blueprints:
   *    `/person/delete`
   */
   delete: function (req, res) {
    
      var id=req.param("id",null);
	
      Person.findOne(id).done(function(err, user) {

	  // we now have a model with instance methods attached

	  // destroy the record
	  user.destroy(function(err) {
	      
	    res.redirect( 'person/index/');
	      
	    // record has been removed
	  });

	});
   
  },


  /**
   * Action blueprints:
   *    `/person/view`
   */
   view: function (req, res) {
    
    // Send a JSON response
    
    
      var id=req.param("id",null);
      
       Person.findOne(id).done(function(err,model){
	 
	       // res.send(model);
	        //return;
	
        res.render( 'person/view',{'model':model}); 	
      });
      
    /*
    return res.json({
      hello: 'world'
    });
    */
  },


  /**
   * Action blueprints:
   *    `/person/index`
   *    `/person`
   */
   index: function (req, res) {
    
        
         Person.find().exec(function(err, persons) {
	  
	   res.render( 'person/index',{'persons':persons});
	   return;
           // user.password doesn't exist
         });
	/*
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
    */
  },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to PersonController)
   */
  _config: {}

  
};
