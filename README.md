# ProjectTracker
A Project tracker system allowing you to track different stages.

In realitoty this is a project I'm doing to help me learn
Node and React. I'm hoping what I build here can also be used 
in a few other projects I've been thinking about but should 
start somewhere. If you find this let me know what you think.  

#Functional Spec  (TODO) 
* Log in system
    * Create new accounts
    * Encrypt password
    * Lock whole system if not allowed
    * New Users must be allowed by Admin User


* Upload Documents
* Kanban and Sprint Boards
* UI interaction of kanban columns
* Sprint planning board
* Todo List to choose from
    * Bugs
    * Features
    * Tasks
* Push Sprint data **somewhere**
* Separate out necessary data with data that should be made
 by each user, so we can blow this out to allow other 
 instances to be made.

#Timeline

#####08/17/20-08/23/19: 
* Log in system
    * REST API for interaction
    * Bootstrap3 for UI
    * MySQL starter design
    
#####08/24/20-08/30/19:
* Todo List to choose from
    * Build out different todo card types 
* Kanban Board designed

#####08/31/20-08/6/19:
* Sprint board
* Push Data Out


# Tech stack
React as the front end with Node/Express for the backend API.
I'll be using MySQL as the Database. 

I haven't given it a lot of thought, but I'm thinking I'll host 
on a tiny EC2 AWS instance. I'll probably put all this into a 
Docker container so easily port it. 