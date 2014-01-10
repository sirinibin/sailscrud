Create a Sails.js (node.js) App with  basic CRUD features using MongoDb
Hi guys,

            Here im gonna give you some working sample codes for performing basic operations(CRUD) in sails.js(node.js).

Step1:Create a new sails.js app

      <code>
       $ sails new myapp1
      </code>
Step2:Connect your app with MongoDb	
      Update /config/adapters.js
      
      <code>
       module.exports.adapters = {

	    // If you leave the adapter config unspecified 
	    // in a model definition, 'default' will be used.
	    'default': 'mongo',
	    mongo: {
	      module   : 'sails-mongo',
	      url      : 'mongodb://localhost:27017/mydb1'
	    }

	  };
      </code>
      
Step3:Create a new data model & its controller
       <code>
       $ sails create model person
       $ sails create controller person
       </code>
       
CREATE:       
Step4:Add a new action "create" inside api/controllers/PersonController.js

       <code>
         module.exports = {
 
   create: function (req, res) {
   
			    if(req.method=="POST"&&req.param("Person",null)!=null)
			    {
			      
			      Person.create(req.param("Person")).done(function(err,model){
				
				  
				  // Error handling
				    if (err) {
				  
					res.send("Error:Sorry!Something went Wrong");

				    }else {
				        res.send("Successfully Created!");
					//res.redirect( 'person/view/'+model.id);
				      
				    }
				
				
			      });
			    
			    }
			    else
			    {
			      
			      res.render( 'person/create');
			    }
 
       
           }
           
      }        
       </code>

Step5:Add a create form under views/person/create.ejs
       <code>
       <a href="/person/index">List</a>
	<h2>Person Create form</h2>
	<form action="/person/create" method="POST">
	<table>
	
	<tr><td>Name<td><input type="text" name="Person[name]"><br/>
	<tr><td>Age<td><input type="text" name="Person[age]">
	<tr ><td><td><input type="submit" value="ADD">
	</form>

       </code>

READ:
Step6:Add an index action in PersonController.js which can be used to list all created documents.

       <code>
          index: function (req, res) {
    
           Person.find().exec(function(err, persons) {
		  
		  res.render( 'person/index',{'persons':persons});
		  return;
		 
		});
	
	  }
       </code>
       
Step7:Add an index.ejs view file for action index
          /views/person/index.ejs
        <code>
           <a href="/person/create">+Create</a>
	    <ol>
	    <% persons.forEach( function( model ){ %>
	      <li><%= model.name %>(<a href="/person/delete/<%= model.id %>">delete</a>|<a href="/person/update/<%= model.id %>">Update</a>|<a href="/person/view/<%=model.id %>">view</a>)</li>
	    <% }); %>
	    </ol>
        </code>
Step8:Add a view action under PersonController.js
         <code>
              view: function (req, res) {

		      var id=req.param("id",null);
		      
		      Person.findOne(id).done(function(err,model){
			
			res.render( 'person/view',{'model':model}); 	
		      
		      });
		      
		 
		  }
		  
         </code>
Step9:Add view file for action "view" under /views/person/view.ejs
         <code>
              <a href="/person/create">+Create</a>|<a href="/person/index">List</a>|<a href="/person/update/<%= model.id %>">Update</a>

	      <h2>View <%=model.name%></h2>
	      <ul>
		<li>Name:<%=model.name %></li>
		<li>Age:<%=model.age %></li>
	      </ul>
         </code>
         
UPDATE:

Step10: Add a new action "update" inside api/controllers/PersonController.js

          <code>
              update: function (req, res) {
    
                       var id=req.param("id",null);
	
		        Person.findOne(id).done(function(err, model) {
			
			      if(req.method=="POST"&&req.param("Person",null)!=null)
				{
				    
				    var p=req.param("Person",null);
				      
				
				  model.name=p.name;
				  model.age=p.age;
				  
				  model.save(function(err){
				    
					if (err) {
				      
					    res.send("Error");

					}else {
					  
					    res.redirect( 'person/view/'+model.id);
					  
					}
				    
				    
				  });
				
				}
				else
				{
				  
				  res.render( 'person/update',{'model':model});
				}
			    

		      });
      
       
                  }
          </code>
              
Step11:Add an update form under views/person/update.ejs
         <code>
           <a href="/person/index">List</a>
	    <h2>Person #<%=model.name %> Update form</h2>
	    <form action="/person/update/<%=model.id %>" method="POST">
	    <table>
	    
	    <tr><td>Name<td><input type="text" name="Person[name]" value="<%=model.name %>"><br/>
	    <tr><td>Age<td><input type="text" name="Person[age]" value="<%=model.age %>">
	    <tr ><td><td><input type="submit" value="SAVE">
	    </form>
         </code>
DELETE

Step12: Add a delete/destroy action under api/controllers/PersonController.js
          <code>
           delete: function (req, res) {
    
		    var id=req.param("id",null);
		      
		    Person.findOne(id).done(function(err, user) {

			user.destroy(function(err) {
			    
			  res.redirect( 'person/index/');
			    
			  // record has been removed
			});

		      });
		
		}
          </code>		
 
   --You are done..Enjoy Coding with Sails.js
  Sirin K
  Nintriva